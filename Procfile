release: bash run-backserver.sh --init -rnb
web: uvicorn run:api --host=0.0.0.0 --port=${PORT:-5000}
