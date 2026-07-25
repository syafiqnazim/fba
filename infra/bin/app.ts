#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { CertificateStack } from "../lib/certificate-stack";
import { ContactStack } from "../lib/contact-stack";
import { GithubOidcStack } from "../lib/github-oidc-stack";
import { HostingStack } from "../lib/hosting-stack";

const app = new cdk.App();

const domainName = String(app.node.tryGetContext("domainName") ?? "fba.my");
const contactToEmail = String(
  app.node.tryGetContext("contactToEmail") ?? `hello@${domainName}`,
);
const contactFromEmail = String(
  app.node.tryGetContext("contactFromEmail") ?? `noreply@${domainName}`,
);
const hostedZoneId = String(app.node.tryGetContext("hostedZoneId") ?? "");
const githubOrg = String(app.node.tryGetContext("githubOrg") ?? "your-org");
const githubRepo = String(app.node.tryGetContext("githubRepo") ?? "fba-site");

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

new ContactStack(app, "FbaContact", {
  env: { account, region: appRegion },
  domainName,
  contactToEmail,
  contactFromEmail,
  description: "FBA contact form API (API Gateway + Lambda + SES)",
});

new GithubOidcStack(app, "FbaGithubOidc", {
  env: { account, region: appRegion },
  githubOrg,
  githubRepo,
  siteBucket: hosting.bucket,
  distribution: hosting.distribution,
  description: "GitHub Actions OIDC deploy role for FBA",
});

app.synth();
