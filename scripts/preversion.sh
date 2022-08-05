#!/usr/bin/env bash

# Real release versions (as determined by the lack of alpha in the version name)
#  should only allow versioning on the main branch.
if [[ "$npm_package_version" != *"alpha"* ]]; then
  git checkout main && git pull origin main
fi