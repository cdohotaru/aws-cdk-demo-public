import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { RemovalPolicy, SecretValue } from 'aws-cdk-lib';
import { Bucket } from 'aws-cdk-lib/aws-s3';

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
                
        const pipeline = new CodePipeline(this, 'Pipeline', {
            pipelineName: 'MyPipeline',
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
            artifactBucket: artifactBucket
        });

        // const testStage = new RunTestsStage(this, 'Testing');        
        
        // pipeline.addStage(testStage, {
        //     post: [
        //         new ShellStep('Run units tests', {
        //             input: sourceCodeInput,
        //             commands: [                        
        //                 'sh ./lib/scripts/run-unit-tests.sh',                         
        //             ],
        //         }),
        //     ],            
        // });
    }
}
