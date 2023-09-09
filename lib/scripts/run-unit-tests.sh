#!/bin/bash

echo 'Running front-end units tests'

echo 'Current folder:' "$PWD"

cd frontEndContent/react-demo

npm install 

CI=true npm run test 

echo 'Finished running unit tests. Exit result: ' "$?"

exit $?