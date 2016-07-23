#!/bin/bash
#
# Generates a new package release
#
VERSION=`cat manifest.json | jq '.version' | tr -d '"'`
zip -r releases/clarin-sin-paywal.$VERSION.zip ./ -x *.git* generate-package.sh README.md releases/* *.idea*


