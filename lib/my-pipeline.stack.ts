import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { RemovalPolicy, SecretValue } from 'aws-cdk-lib';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Pipeline } from 'aws-cdk-lib/aws-codepipeline';

export class MyPipelineStack extends Construct {
    constructor(scope: Construct, id: string) {
        super(scope, id);

        const secret = SecretValue.secretsManager('aws-cdk-demo-public');

        const sourceCodeInput = CodePipelineSource.gitHub('cdohotaru/aws-cdk-demo-public', 'main', {
            authentication: secret,
        });

        const artifactBucket = new Bucket(this, 'artifactBucket', {
            removalPolicy: RemovalPolicy.DESTROY, // NOT recommended for production code
            autoDeleteObjects: true, // NOT recommended for production code
        });

        const underlyingPipeline = new Pipeline(this, 'MyPipeline', { 
            artifactBucket: artifactBucket,
            pipelineName: 'MyPipeline', 
        });
                
        const pipeline = new CodePipeline(this, 'Pipeline', {           
            dockerEnabledForSynth: true,
            dockerEnabledForSelfMutation: true,            
            synth: new ShellStep('Synth', {
                input: sourceCodeInput,
                commands: [
                    'npm ci', 
                    'sh ./lib/scripts/install-deps.sh', 
                    'sh ./lib/scripts/run-unit-tests.sh',      
                    'npm run synth',
                ],
            }),
            codePipeline: underlyingPipeline,
        });        
    }
}
