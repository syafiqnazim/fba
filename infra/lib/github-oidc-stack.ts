import * as cdk from "aws-cdk-lib";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as iam from "aws-cdk-lib/aws-iam";
import * as s3 from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

export type GithubOidcStackProps = cdk.StackProps & {
  githubOrg: string;
  githubRepo: string;
  /** Extra OIDC `sub` patterns (e.g. immutable GitHub subject claims). */
  githubSubPatterns?: string[];
  siteBucket: s3.IBucket;
  distribution: cloudfront.IDistribution;
};

export class GithubOidcStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: GithubOidcStackProps) {
    super(scope, id, props);

    const { githubOrg, githubRepo, githubSubPatterns, siteBucket, distribution } =
      props;

    const provider = new iam.OpenIdConnectProvider(this, "GithubProvider", {
      url: "https://token.actions.githubusercontent.com",
      clientIds: ["sts.amazonaws.com"],
    });

    const subPatterns = [
      `repo:${githubOrg}/${githubRepo}:*`,
      ...(githubSubPatterns ?? []),
    ];

    const deployRole = new iam.Role(this, "GithubDeployRole", {
      roleName: "fba-github-deploy",
      assumedBy: new iam.FederatedPrincipal(
        provider.openIdConnectProviderArn,
        {
          StringEquals: {
            "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
          },
          StringLike: {
            "token.actions.githubusercontent.com:sub": subPatterns,
          },
        },
        "sts:AssumeRoleWithWebIdentity",
      ),
      description: "Deploy role assumed by GitHub Actions via OIDC",
    });

    siteBucket.grantReadWrite(deployRole);
    siteBucket.grantDelete(deployRole);

    deployRole.addToPolicy(
      new iam.PolicyStatement({
        actions: [
          "cloudfront:CreateInvalidation",
          "cloudfront:GetInvalidation",
          "cloudfront:ListInvalidations",
        ],
        resources: [
          `arn:aws:cloudfront::${this.account}:distribution/${distribution.distributionId}`,
        ],
      }),
    );

    new cdk.CfnOutput(this, "DeployRoleArn", {
      value: deployRole.roleArn,
      exportName: "FbaGithubDeployRoleArn",
      description: "Set as AWS_DEPLOY_ROLE_ARN in GitHub Actions secrets/vars",
    });
  }
}
