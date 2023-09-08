import { CfnOutput, Duration, RemovalPolicy } from 'aws-cdk-lib';
import { AllowedMethods, CloudFrontWebDistribution, Distribution, OriginAccessIdentity, ViewerProtocolPolicy } from 'aws-cdk-lib/aws-cloudfront';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { CanonicalUserPrincipal, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';

export class FrontEndStack extends Construct {
    public readonly bucket: Bucket;
    public readonly distribution: CloudFrontWebDistribution;
    public readonly cloudfrontDomainName: CfnOutput;
    public readonly s3BucketUrl: CfnOutput;

    constructor(app: Construct, id: string) {
        super(app, id);

        const distributionResult = this.createDistribution();
        this.deploySiteContent(distributionResult.bucket, distributionResult.distribution);
    }

    private createDistribution = (): { distribution: Distribution; bucket: Bucket; } => {
        const myBucket = new Bucket(this, 'myBucket', {
            removalPolicy: RemovalPolicy.DESTROY, // NOT recommended for production code
            autoDeleteObjects: true, // NOT recommended for production code
        });

        const cloudfrontOAI = new OriginAccessIdentity(this, 'cloudfront-OAI');
        
        // Grant access to cloudfront
        myBucket.addToResourcePolicy(new PolicyStatement({
            actions: ['s3:GetObject'],
            resources: [myBucket.arnForObjects('*')],
            principals: [new CanonicalUserPrincipal(cloudfrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId)],
        }));

        const s3Origin = new S3Origin(myBucket);        

        const distribution = new Distribution(this, 'myDist', {
            defaultBehavior: { 
                origin: s3Origin,    
                viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,       
                allowedMethods: AllowedMethods.ALLOW_ALL,    
            },        
            defaultRootObject: 'index.html',
            errorResponses:[
                {
                    httpStatus: 403,
                    responseHttpStatus: 403,
                    responsePagePath: '/error.html',
                    ttl: Duration.minutes(1),
                },
            ],
        });

        return {
            distribution,
            bucket: myBucket,
        };
    };

    private deploySiteContent = (bucket: Bucket, distribution: Distribution): void => {
        new BucketDeployment(this, 'DeployWithInvalidation', {
            sources: [Source.asset('./frontEndContent/react-demo/build')],
            destinationBucket: bucket,
            distribution,
            distributionPaths: ['/*'],
        });
    };
}
