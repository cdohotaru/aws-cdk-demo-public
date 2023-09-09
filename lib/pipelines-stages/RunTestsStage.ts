import { Stack, Stage, StageProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class RunTestStage extends Stage {

    constructor(scope: Construct, id: string, props?: StageProps) {
        super(scope, id, props);

        new Stack(this);
    }
}
