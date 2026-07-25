import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from "aws-lambda";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { z } from "zod";

const ses = new SESClient({});

const bodySchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  message: z.string().trim().min(1).max(5000),
  company: z.string().max(200).optional().default(""),
});

function corsHeaders(origin: string | undefined): Record<string, string> {
  const allowed = (process.env.ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  const resolved =
    origin && allowed.includes(origin) ? origin : (allowed[0] ?? "*");

  return {
    "Access-Control-Allow-Origin": resolved,
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Content-Type": "application/json",
  };
}

function response(
  statusCode: number,
  body: Record<string, unknown>,
  origin?: string,
): APIGatewayProxyResultV2 {
  return {
    statusCode,
    headers: corsHeaders(origin),
    body: JSON.stringify(body),
  };
}

export async function handler(
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResultV2> {
  const origin = event.headers.origin ?? event.headers.Origin;

  if (event.requestContext.http.method === "OPTIONS") {
    return response(204, {}, origin);
  }

  if (event.requestContext.http.method !== "POST") {
    return response(405, { ok: false, error: "Method not allowed" }, origin);
  }

  let payload: unknown;
  try {
    payload = JSON.parse(event.body ?? "{}");
  } catch {
    return response(400, { ok: false, error: "Invalid request" }, origin);
  }

  const parsed = bodySchema.safeParse(payload);
  if (!parsed.success) {
    return response(400, { ok: false, error: "Invalid request" }, origin);
  }

  const { name, email, message, company } = parsed.data;

  // Honeypot: silently accept bots without sending mail.
  if (company.trim().length > 0) {
    return response(200, { ok: true }, origin);
  }

  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!to || !from) {
    console.error("Missing CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL");
    return response(500, { ok: false, error: "Unable to send message" }, origin);
  }

  try {
    await ses.send(
      new SendEmailCommand({
        Source: from,
        Destination: { ToAddresses: [to] },
        ReplyToAddresses: [email],
        Message: {
          Subject: {
            Data: `[FBA Contact] Message from ${name}`,
            Charset: "UTF-8",
          },
          Body: {
            Text: {
              Charset: "UTF-8",
              Data: [
                `Name: ${name}`,
                `Email: ${email}`,
                "",
                message,
              ].join("\n"),
            },
          },
        },
      }),
    );
  } catch (error) {
    console.error("SES send failed", error);
    return response(500, { ok: false, error: "Unable to send message" }, origin);
  }

  return response(200, { ok: true }, origin);
}
