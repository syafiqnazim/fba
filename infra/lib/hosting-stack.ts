import * as cdk from "aws-cdk-lib";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as targets from "aws-cdk-lib/aws-route53-targets";
import * as s3 from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

export type HostingStackProps = cdk.StackProps & {
  domainName: string;
  certificate: acm.ICertificate;
  /** If set, DNS records are created in this hosted zone. */
  hostedZoneId?: string;
};

export class HostingStack extends cdk.Stack {
  readonly bucket: s3.Bucket;
  readonly distribution: cloudfront.Distribution;

  constructor(scope: Construct, id: string, props: HostingStackProps) {
    super(scope, id, props);

    const { domainName, certificate, hostedZoneId } = props;
    const wwwDomain = `www.${domainName}`;

    this.bucket = new s3.Bucket(this, "SiteBucket", {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      versioned: false,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });

    const urlRewrite = new cloudfront.Function(this, "UrlRewrite", {
      code: cloudfront.FunctionCode.fromInline(`
function handler(event) {
  var request = event.request;
  var uri = request.uri;
  if (uri.endsWith('/')) {
    request.uri += 'index.html';
  } else if (!uri.includes('.')) {
    request.uri += '/index.html';
  }
  return request;
}
`),
      comment: "Map /path/ to /path/index.html for Next static export on S3",
    });

    this.distribution = new cloudfront.Distribution(this, "Distribution", {
      defaultBehavior: {
        origin: origins.S3BucketOrigin.withOriginAccessControl(this.bucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
        cachedMethods: cloudfront.CachedMethods.CACHE_GET_HEAD_OPTIONS,
        compress: true,
        functionAssociations: [
          {
            function: urlRewrite,
            eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
          },
        ],
      },
      domainNames: [domainName, wwwDomain],
      certificate,
      defaultRootObject: "index.html",
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 404,
          responsePagePath: "/404.html",
          ttl: cdk.Duration.minutes(5),
        },
        {
          httpStatus: 404,
          responseHttpStatus: 404,
          responsePagePath: "/404.html",
          ttl: cdk.Duration.minutes(5),
        },
      ],
      minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
      comment: `Fishing Buddies Academy (${domainName})`,
    });

    if (hostedZoneId) {
      const zone = route53.HostedZone.fromHostedZoneAttributes(this, "Zone", {
        hostedZoneId,
        zoneName: domainName,
      });

      new route53.ARecord(this, "ApexARecord", {
        zone,
        recordName: domainName,
        target: route53.RecordTarget.fromAlias(
          new targets.CloudFrontTarget(this.distribution),
        ),
      });

      new route53.ARecord(this, "WwwARecord", {
        zone,
        recordName: wwwDomain,
        target: route53.RecordTarget.fromAlias(
          new targets.CloudFrontTarget(this.distribution),
        ),
      });
    }

    new cdk.CfnOutput(this, "BucketName", {
      value: this.bucket.bucketName,
      exportName: "FbaSiteBucketName",
    });

    new cdk.CfnOutput(this, "DistributionId", {
      value: this.distribution.distributionId,
      exportName: "FbaDistributionId",
    });

    new cdk.CfnOutput(this, "DistributionDomainName", {
      value: this.distribution.distributionDomainName,
      exportName: "FbaDistributionDomainName",
    });
  }
}
