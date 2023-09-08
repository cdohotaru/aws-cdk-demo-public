import { Cors, LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction, NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
import { join } from 'path';
import { Construct } from 'constructs';

export class ApiLambdaCalculatorStack extends Construct {
    constructor(app: Construct, id: string) {
        super(app, id);

        const apiResourcesPath = join(__dirname, '..', 'api/calculator/');    
    
        const packageLockJsonPath = join(apiResourcesPath, 'package-lock.json');
        const entryPath = join(apiResourcesPath, 'index.ts');

        const nodeJsFunctionProps: NodejsFunctionProps = {
            bundling: {
                externalModules: [
                    'aws-sdk', // Use the 'aws-sdk' available in the Lambda runtime
                ],
            },
            depsLockFilePath: packageLockJsonPath,
            runtime: Runtime.NODEJS_18_X,
            handler: 'calculate',
        };
        
        const calculateLambda = new NodejsFunction(this, 'calculate', {
            entry: entryPath,
            ...nodeJsFunctionProps,
        });

        // Integrate the Lambda functions with the API Gateway resource
        const lambdaIntegration = new LambdaIntegration(calculateLambda);                    

        // Create an API Gateway resource for the calculator
        const api = new RestApi(this, 'calculatorApi', {
            restApiName: 'CalculatorService',  
            defaultCorsPreflightOptions: {
                allowOrigins: Cors.ALL_ORIGINS, 
                allowMethods: Cors.ALL_METHODS,
                allowHeaders: ['Content-Type', 'Authorization', 'X-Amz-Date', 'X-Api-Key', 'X-Amz-Security-Token', 'X-Amz-User-Agent, X-Funny-Header'],
            },       
                     
        });

        const items = api.root.addResource('calculate');    

        items.addMethod('POST', lambdaIntegration, {
            methodResponses: [{
                statusCode: '200',
                responseParameters: {
                    'method.response.header.Access-Control-Allow-Headers': true,
                    'method.response.header.Access-Control-Allow-Methods': true,
                    'method.response.header.Access-Control-Allow-Credentials': true,
                    'method.response.header.Access-Control-Allow-Origin': true,
                },
            }],
        } );
    }
}
