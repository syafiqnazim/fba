import * as cdk from "aws-cdk-lib";
import * as apigatewayv2 from "aws-cdk-lib/aws-apigatewayv2";
import * as integrations from "aws-cdk-lib/aws-apigatewayv2-integrations";
import * as iam from "aws-cdk-lib/aws-iam";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as nodejs from "aws-cdk-lib/aws-lambda-nodejs";
import * as ses from "aws-cdk-lib/aws-ses";
import { Construct } from "constructs";
import * as path from "node:path";

export type ContactStackProps = cdk.StackProps & {
  domainName: string;
  contactToEmail: string;
  contactFromEmail: string;
};

export class ContactStack extends cdk.Stack {
  readonly apiUrl: string;

  constructor(scope: Construct, id: string, props: ContactStackProps) {
    super(scope, id, props);

    const { domainName, contactToEmail, contactFromEmail } = props;

    // Domain identity — complete DNS verification in SES after first deploy.
    new ses.EmailIdentity(this, "DomainIdentity", {
      identity: ses.Identity.domain(domainName),
    });

    const fn = new nodejs.NodejsFunction(this, "ContactFn", {
      entry: path.join(__dirname, "../lambda/contact/handler.ts"),
      handler: "handler",
      runtime: lambda.Runtime.NODEJS_22_X,
      timeout: cdk.Duration.seconds(10),
      memorySize: 256,
      environment: {
        CONTACT_TO_EMAIL: contactToEmail,
        CONTACT_FROM_EMAIL: contactFromEmail,
        ALLOWED_ORIGINS: [
          `https://${domainName}`,
          `https://www.${domainName}`,
          "http://localhost:3000",
        ].join(","),
      },
      bundling: {
        minify: true,
        sourceMap: true,
        target: "node22",
        format: nodejs.OutputFormat.CJS,
      },
    });

    fn.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ["ses:SendEmail", "ses:SendRawEmail"],
        resources: ["*"],
      }),
    );

    const api = new apigatewayv2.HttpApi(this, "ContactApi", {
      apiName: "fba-contact",
      corsPreflight: {
        allowHeaders: ["Content-Type"],
        allowMethods: [apigatewayv2.CorsHttpMethod.POST, apigatewayv2.CorsHttpMethod.OPTIONS],
        allowOrigins: [
          `https://${domainName}`,
          `https://www.${domainName}`,
          "http://localhost:3000",
        ],
        maxAge: cdk.Duration.days(1),
      },
    });

    const integration = new integrations.HttpLambdaIntegration(
      "ContactIntegration",
      fn,
    );

    api.addRoutes({
      path: "/contact",
      methods: [apigatewayv2.HttpMethod.POST],
      integration,
    });

    // Basic abuse protection at the stage level.
    const cfnStage = api.defaultStage?.node
      .defaultChild as apigatewayv2.CfnStage | undefined;
    if (cfnStage) {
      cfnStage.defaultRouteSettings = {
        throttlingBurstLimit: 10,
        throttlingRateLimit: 5,
      };
    }

    this.apiUrl = `${api.apiEndpoint}/contact`;

    new cdk.CfnOutput(this, "ContactApiUrl", {
      value: this.apiUrl,
      exportName: "FbaContactApiUrl",
      description: "Set as NEXT_PUBLIC_CONTACT_API_URL for the site build",
    });
  }
}
