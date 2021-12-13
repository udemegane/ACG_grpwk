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
        info 'Go to the following page and follow the instructions.'
        info 'https://grpc.io/docs/protoc-installation/'
        exit
    fi
    # install packages to compile protobuf for js/ts
    if [[ x"$backonly" != xtrue ]] && [ ! -f ./node_modules/.bin/pbjs ]; then
        warning 'You do not have `pbjs` (protobuf compiler for js/ts) installed.'
        checkinstall 'npm install protobufjs'
    fi
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
    # Compile protobuf
    info 'Compiling protobuf for python'
    if [ `find ./protobuf -name '*pb2*' | wc -l` -gt 0 ]; then
        rm protobuf/*pb2*
    fi
    protoc --python_out=. --mypy_out=. protobuf/*.proto
    info 'Compiling protobuf for js/ts'
    if [[ x"$backonly" != xtrue ]]; then
        npx pbjs -t static-module -o protobuf/compiled_pb2.js protobuf/*.proto
        npx pbts -o protobuf/compiled_pb2.d.ts protobuf/compiled_pb2.js
    fi
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

