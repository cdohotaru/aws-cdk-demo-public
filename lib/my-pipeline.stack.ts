import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { SecretValue } from 'aws-cdk-lib';

export class MyPipelineStack extends Construct {
    constructor(scope: Construct, id: string) {
        super(scope, id);

        const secret = new SecretValue('githubToken2');        
        
        const pipeline = new CodePipeline(this, 'Pipeline', {
            pipelineName: 'MyPipeline',
            synth: new ShellStep('Synth', {
                input: CodePipelineSource.gitHub('git@github.com:cdohotaru/aws-cdk-demo.git', 'main', {
                    authentication: secret,
                }),
                commands: ['npm ci', 'npm run build', 'npx cdk synth'],
            }),
        });
    }
}
