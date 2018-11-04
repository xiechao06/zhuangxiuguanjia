#!/bin/bash
eval $(egrep -v '^#' .env.production | xargs) && aws s3 cp --recursive ./build s3://$AWS_BUCKET