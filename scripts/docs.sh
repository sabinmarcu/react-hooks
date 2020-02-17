#!/bin/bash

SCRIPTS_PATH=$(cd $(dirname $0); pwd)
ROOT_PATH=$(cd $SCRIPTS_PATH; cd ..; pwd)
PACKAGES_PATH=$(cd $ROOT_PATH; cd packages; pwd)
DOCS_PATH=$(cd $ROOT_PATH; mkdir -p docs; cd docs; pwd)

echo "Rebuilding Docs"
cd $DOCS_PATH
for package in `ls $PACKAGES_PATH`; do
  path="${PACKAGES_PATH}/${package}"
  if [ -d $path ]; then
    if [ -e "${path}/docs" ]; then
      echo "Building docs for '$package' (${path}/docs)"
      rm -rf "${DOCS_PATH}/${package}"
      cp -R "${path}/docs" "${DOCS_PATH}/${package}"
    fi
  fi
done
