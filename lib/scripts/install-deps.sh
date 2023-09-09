#!/bin/bash

echo 'Starting installing dependencies'

echo 'Current folder:' "$PWD"

cd frontEndContent/react-demo

npm install 

npm run build 

cd -

echo 'Current folder:' "$PWD"
