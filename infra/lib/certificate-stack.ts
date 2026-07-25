import * as cdk from "aws-cdk-lib";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import * as route53 from "aws-cdk-lib/aws-route53";
import { Construct } from "constructs";

export type CertificateStackProps = cdk.StackProps & {
  domainName: string;
  hostedZoneId?: string;
};

/**
 * CloudFront requires ACM certificates in us-east-1.
 * Deploy this stack with env.region = "us-east-1".
 */
export class CertificateStack extends cdk.Stack {
  readonly certificate: acm.ICertificate;

  constructor(scope: Construct, id: string, props: CertificateStackProps) {
    super(scope, id, props);

    const { domainName, hostedZoneId } = props;
    const wwwDomain = `www.${domainName}`;

    let validation = acm.CertificateValidation.fromDns();
    if (hostedZoneId) {
      const zone = route53.HostedZone.fromHostedZoneAttributes(this, "Zone", {
        hostedZoneId,
        zoneName: domainName,
      });
      validation = acm.CertificateValidation.fromDns(zone);
    }

    this.certificate = new acm.Certificate(this, "SiteCertificate", {
      domainName,
      subjectAlternativeNames: [wwwDomain],
      validation,
    });

    new cdk.CfnOutput(this, "CertificateArn", {
      value: this.certificate.certificateArn,
      exportName: "FbaCertificateArn",
    });
  }
}
