#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { CertificateStack } from "../lib/certificate-stack";
import { GithubOidcStack } from "../lib/github-oidc-stack";
import { HostingStack } from "../lib/hosting-stack";

const app = new cdk.App();

const domainName = String(app.node.tryGetContext("domainName") ?? "fba.my");
const hostedZoneId = String(app.node.tryGetContext("hostedZoneId") ?? "");
const githubOrg = String(app.node.tryGetContext("githubOrg") ?? "your-org");
const githubRepo = String(app.node.tryGetContext("githubRepo") ?? "fba-site");
const githubSubPatterns = (app.node.tryGetContext("githubSubPatterns") as
  | string[]
  | undefined) ?? [];

const account = process.env.CDK_DEFAULT_ACCOUNT;
const appRegion = process.env.CDK_DEFAULT_REGION ?? "ap-southeast-1";

const certificateStack = new CertificateStack(app, "FbaCertificate", {
  env: { account, region: "us-east-1" },
  crossRegionReferences: true,
  domainName,
  hostedZoneId: hostedZoneId || undefined,
  description: "ACM certificate for CloudFront (must be us-east-1)",
});

const hosting = new HostingStack(app, "FbaHosting", {
  env: { account, region: appRegion },
  crossRegionReferences: true,
  domainName,
  certificate: certificateStack.certificate,
  hostedZoneId: hostedZoneId || undefined,
  description: "FBA static site hosting (S3 + CloudFront)",
});

new GithubOidcStack(app, "FbaGithubOidc", {
  env: { account, region: appRegion },
  githubOrg,
  githubRepo,
  githubSubPatterns,
  siteBucket: hosting.bucket,
  distribution: hosting.distribution,
  description: "GitHub Actions OIDC deploy role for FBA",
});

app.synth();
