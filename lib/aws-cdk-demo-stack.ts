import { Stack, StackProps, Tags } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ApiLambdaCalculatorStack } from './api';
import { FrontEndStack } from './front-end';
import { MyPipelineStack } from './my-pipeline.stack';

export class AwsCdkDemoStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const api = new ApiLambdaCalculatorStack(this, 'CalculatorApi');

        Tags.of(api).add('Module', 'API');

        const frontEnd = new FrontEndStack(this, 'FrontEnd');

        Tags.of(frontEnd).add('Module', 'FrontEnd');

        // const pipeline = new MyPipelineStack(this, 'Pipeline');

        // Tags.of(pipeline).add('Module', 'Pipeline');
    }
}
