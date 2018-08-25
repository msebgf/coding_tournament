#!/usr/bin/env sh

DIR="$(dirname "$0")"
currentDir=$(pwd)
cd $DIR

if [ "${DO_NOT_TEAR_DOWN_TEST_ENVIRONMENT}" != "true" ]; then
  echo "Tearing down test environment"
  docker-compose down -v
else
  echo "[WARNING] test environment was not tore down"
fi

cd $currentDir
