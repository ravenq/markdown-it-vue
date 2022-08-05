#!/usr/bin/env bash
set -e

if [ -z $CI ]; then
  echo "Non CI should not run deploy"
  exit 1
fi

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

NPM_CONFIG_REGISTRY=$NPM_PUSH_REGISTRY
PACKAGE_NAME=$(jq -r .name $SCRIPT_DIR/../package.json)
PACKAGE_VERSION=$(jq -r .version $SCRIPT_DIR/../package.json)

function exit_if_existing_version() {
  local topver=$(npm show --registry $NPM_CONFIG_REGISTRY $PACKAGE_NAME version || true)
  local thisver=''

  if [[ $topver == '' ]]; then
    #some error connecting to the registry - try again but look for a 404.
    err=$(npm show --registry=$NPM_CONFIG_REGISTRY $PACKAGE_NAME version 2>&1 | grep "code E404")
    if [[ $err == *"code E404"* ]]; then
      #assume this is a new package and continue
      echo "**NOTE: new package to the registry"
    else
      #error is already shown, just exit with error
      exit 1
    fi
  else
    #pull in if we have seen this version yet
    thisver=$(npm show --registry $NPM_CONFIG_REGISTRY $PACKAGE_NAME@$PACKAGE_VERSION version)
  fi

  if [[ $thisver != '' ]]; then
    echo "This version of $PACKAGE_NAME ($thisver) already exists! Not publishing."
    exit 1
  fi
}

function build() {
  rm -fr dist
  npm run build
  cp -rf package.json dist
}

function publish_new_version() {
  echo "Publishing $PACKAGE_NAME verison $PACKAGE_VERSION"
  cd $SCRIPT_DIR/../dist
  npm publish --registry $NPM_CONFIG_REGISTRY
}

exit_if_existing_version
build
publish_new_version