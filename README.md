# Welcome to the CDK TypeScript demo project

A demo for the AWS CDK using API Gateway, Lambda, CloudFront, S3 and React

### Please note that the order of the steps is important

### See the before you start section

### 1. Build the React app 

Inside frontEndContent/react-demo folder
- npm install
- npm run build 

### 2 Bootstrap the deployment 

You will need an AWS account, if the AWS account is not configured locally run aws configure

In the root folder 
- npm install
- cdk bootstrap 
or 
- cdk bootstrap aws://YOUR_ACCOUNT_NUMBER/DESIRED_AWS_REGION

### 3 Make the first deployment 

In the root folder 
- cdk deploy
- note the output API endpoint in the console, you will need it in the next step
- note the CloudFront distribution domain name, this is the app's URL 

### 4 Add the API gateway URL

Copy the API endpoint URL either from the terminal output or the AWS Console API Gateway section
Inside frontEndContent/react-demo folder replace "to_be_added_after_the_first_stack_deploy":
REACT_APP_API_URL=to_be_added_after_the_first_stack_deploy
with the actual endpoint; the format is:
https://xxxxxxxxx.execute-api.aws-region.amazonaws.com/prod
note the missing / at the end 

### 5 Make the second deployment 

In the root folder 
- cdk deploy
- go to AWS Console -> CloudFront and copy the distribution domain name which is an URL
it has this format: https://xxxxxxxxxxxx.cloudfront.net
- put that in the browser and use the website




The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template

## Before you start

An AWS account is needed to run this stack. The AWS account should be configured locally. 
See https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html for configuring an account

It also helps if the CDK CLI is installed globally. An AWS Getting started page can be found here: https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html
