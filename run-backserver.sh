#!/bin/bash -i

# set -x # log all commands

function error () {
  tput setaf 1; echo "ERROR; $@" 1>&2; tput sgr0
}

function warning () {
  tput setaf 3; echo "WARNING; $@" 1>&2; tput sgr0
}

function info () {
  tput setaf 2; echo -n "INFO; "; tput sgr0; echo "$@"
}

info "Working in dir: `pwd`"

whichsh=bash
selectyes='false'
selectno='false'
backonly='false'
function checkyes() {
  result=1
  if [[ x"$selectyes" = xtrue ]]; then
    echo "$@ <- yes"
    result=0
  elif [[ x"$selectno" = xtrue ]]; then
    echo "$@ <- no"
    result=1
  elif [[ x"$whichsh" = x'bash' ]]; then
    read -p "$@ [y/N]: " yn; case "$yn" in [yY]*) result=0;; *) result=1;; esac
  elif [[ x"$whichsh" = x'zsh' ]]; then
    printf "$@ [y/N]: "; if read -q; then result=0; else result=1; fi
    echo
  fi
  return $result
}

function checkinstall() {
  info 'This script will run the following command to install.'
  info "$@"
  checkyes 'continue?'
  if [ $? -eq 0 ]; then
    eval "$@"
  fi
}

usage_exit() {
  echo -e "
  Usage:  $0 [OPTIONS]

  Options:
  --init          Install all Requirements and Setup Environment for Python Development
  -b, --backonly  Install Only Dependencies for Backend
  -s, --startup   Start Up Backend Server
  -r, --rebuild   Delete All Auto-Generated Files -> Create All Requirements and Initialize
  -t, --test      Run All Tests
  -d, --db        Show Data Inside Database
  -y, --yes       Say yes to all questions
  -n, --no        Say no to all questions
  -h, --help      Show help
  " 1>&2
}

while getopts sbrtdynh-: opt; do
  optarg="${!OPTIND}"
  [[ x"$opt" = x- ]] && opt="-$OPTARG"

  case "-$opt" in
    -s|--startup)
      startup=true
      ;;
    -b|--backonly)
      backonly=true
      ;;
    -r|--rebuild)
      rebuild=true
      ;;
    -t|--test)
      runtest=true
      ;;
    --init)
      initialize=true
      rebuild=true
      ;;
    # -l|--logs)
      #   logs=true
      #   if [[ x$optarg -ne x ]]; then
      #     service+=" $optarg"
      #     shift
      #   fi
      #   ;;
    --protoc)
      protoc=true
      ;;
    -d|--db)
      db=true
      ;;
    -y|--yes)
      selectyes=true
      ;;
    -n|--no)
      selectno=true
      ;;
    -h|--help)
      usage_exit
      exit 0
      ;;
    --)
      break
      ;;
    -\?)
      usage_exit
      exit 1
      ;;
    --*)
      echo "$0 illegal option -- ${opt##-}" >&2
      usage_exit
      exit 1
      ;;
  esac
done
shift $((OPTIND - 1))

if ! command -v python &>/dev/null; then
  error 'Command `python` not found. (Required for following execution)'
  checkyes 'Automatically alias `python3` to `python`? (for this script)'
  if [ $? -eq 0 ]; then
    alias python=python3
  fi
fi

if [[ x$initialize = xtrue ]]; then
  # install poetry if not exists
  if ! command -v poetry &>/dev/null; then
    warning 'You do not have `poetry` (python package manager) installed.'
    info 'More documents: https://python-poetry.org/docs/master/#installation'
    checkinstall 'curl -sSL https://install.python-poetry.org | python -'
  fi
  # create venv with poetry
  poetry config virtualenvs.in-project true
  poetry install
  # check if protoc is installed
  if ! command -v protoc &>/dev/null; then
    warning 'You do not have `protoc` (protobuf compiler) installed.'
    if [[ x"$ACG_PRODUCTION_STAGE" != x'production' ]]; then
      info 'Go to the following page and follow the instructions.'
      info 'https://grpc.io/docs/protoc-installation/'
      exit
    else
      PB_REL="https://github.com/protocolbuffers/protobuf/releases"
      curl -LO $PB_REL/download/v3.15.8/protoc-3.15.8-linux-x86_64.zip
      unzip protoc-3.15.8-linux-x86_64.zip -d $HOME/.local
      export PATH="$PATH:$HOME/.local/bin"
    fi
  fi
  # install packages to compile protobuf for js/ts
  # if [[ x"$backonly" != xtrue ]] && [ ! -f ./node_modules/.bin/pbjs ]; then
  #   warning 'You do not have `pbjs` (protobuf compiler for js/ts) installed.'
  #   checkinstall 'npm install protobufjs'
  # fi
  if [[ x"$backonly" != xtrue ]] && [ ! -f ./node_modules/.bin/protoc-gen-ts_proto ]; then
    warning 'Please install dependencies of protobuf for ts.'
    checkinstall 'npm install ts-proto'
  fi
  # if [[ x"$backonly" != xtrue ]]; then
  #   warning 'Please install dependencies of protobuf for ts.'
  #   checkinstall 'npm install @protobuf-ts/plugin'
  # fi
fi

if [[ x"$ACG_PRODUCTION_STAGE" != x'production' ]]; then
  if [ ! -f ./.venv/bin/activate ]; then
    error 'Python virtual environment not found.'
    info 'You may want to run `./run-backserver.sh --init` first.'
    error 'Failed to execute. Abort'
    exit
  fi
  source ./.venv/bin/activate
fi

function build_protobuf() {
  CWD=$(pwd)
  PROTO_DIR="$CWD"/protobuf
  pb2=compiled_pb2
  cd "$PROTO_DIR"
  protofiles=$(command ls -a | grep '.proto')
  # Compile protobuf (python)
  AUTOGEN_PY=../protobuf
  info 'Compiling protobuf for python to' "$PROTO_DIR/$AUTOGEN_PY/$pb2.py"
  mkdir -p "$AUTOGEN_PY"
  [ $(command find "$AUTOGEN_PY" -name '*_pb2*' | wc -l) -gt 0 ] && rm "$AUTOGEN_PY"/*_pb2*
  protoc --python_out="$AUTOGEN_PY" --mypy_out="$AUTOGEN_PY" *.proto
  echo '# pylint: skip-file' > "$AUTOGEN_PY"/$pb2.py
  for f in $protofiles; do
    F="${f%.*}" && echo "from .${F}_pb2 import * # noqa" >> "$AUTOGEN_PY"/$pb2.py
  done

  # Compile protobuf (typescript)
  if [[ x"$backonly" != xtrue ]]; then
    cd "$PROTO_DIR"
    AUTOGEN_TS=../src/scenes/GameScripts/protobuf
    mkdir -p "$AUTOGEN_TS"
    [ $(command find "$AUTOGEN_TS" -name '*_pb2*' | wc -l) -gt 0 ] && rm "$AUTOGEN_TS"/*_pb2*
    info 'Compiling protobuf for js/ts to' "$PROTO_DIR/$AUTOGEN_TS/$pb2.ts"
    protoc \
      --plugin=$CWD/node_modules/.bin/protoc-gen-ts_proto \
      --ts_proto_opt=exportCommonSymbols=false,unrecognizedEnum=false,fileSuffix=_pb2,esModuleInterop=true,oneof=unions \
      --ts_proto_out="$AUTOGEN_TS" *.proto
    echo '/* eslint-disable */' > "$AUTOGEN_TS"/$pb2.ts
    for f in $protofiles; do
      F="${f%.*}" && echo "export * from './${F}_pb2';" >> "$AUTOGEN_TS"/$pb2.ts
    done
  fi
  cd "$CWD"
  # Create a documentation of protobuf defined APIs
  # docker run --rm \
  #     -v $PWD/docs:/out \
  #     -v $PWD/protobuf:/protos/protobuf \
  #     pseudomuto/protoc-gen-doc --doc_opt=markdown,protobuf.md protobuf/*.proto
}

if [[ x$rebuild = xtrue ]]; then
  build_protobuf

  # Generate sample database
  info 'Generating database for local development'
  if [ -f sample_db.sqlite3 ]; then
    warning 'sample_db.sqlite3 already exists'
    checkyes 'Delete and Initialize?'
    if [ $? -eq 0 ]; then
      rm sample_db.sqlite3
    fi
  fi
  alembic upgrade head
fi

if [[ x$protoc = xtrue ]]; then
  build_protobuf
fi

if [[ x$runtest = xtrue ]]; then
  python -m pytest --capture=no
fi

if [[ x"$db" != x ]]; then
  python -m app.manage
fi

if [[ x$startup = xtrue ]]; then
  python run.py
fi

exit 0
