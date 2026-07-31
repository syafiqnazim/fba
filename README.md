# Fishing Buddies Academy (fba.my)

Static company site for **Fishing Buddies Academy**, built as a Next.js static export and hosted on S3 + CloudFront. Dynamic contact submissions go through API Gateway → Lambda → SES. Blog content is MDX in Git, editable via Decap CMS.

## Stack

| Area | Choice |
| --- | --- |
| Framework | Next.js App Router (static export) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Blog | MDX + Zod front matter |
| CMS | Decap (`/admin/`) |
| Default locale | Bahasa Malaysia (`/ms/`), English at `/en/` |
| Infra | AWS CDK (`infra/`) |
| Deploy | GitHub Actions + OIDC |

## Local development

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Root redirects client-side to `/ms/`.

Landing uses a light Jadoo-inspired layout with real FBA photos plus temporary Unsplash stock images in `app/assets/stock/`.

### Useful scripts

```bash
npm run build    # writes static files to out/
npm run lint
```

### Local Decap (optional)

Decap `local_backend: true` is enabled. With the site running, also start the Decap proxy:

```bash
npx decap-server
```

Then open [http://localhost:3000/admin/](http://localhost:3000/admin/).

## Content & routes

- UI strings: `messages/ms.json`, `messages/en.json`
- Blog posts: `content/blog/ms/`, `content/blog/en/`
- Localized paths (examples):
  - `/ms/tentang-kami/` ↔ `/en/about/`
  - `/ms/hubungi/` ↔ `/en/contact/`

## Infrastructure

```bash
cd infra
npm install
npx cdk bootstrap aws://ACCOUNT_ID/ap-southeast-1
npx cdk bootstrap aws://ACCOUNT_ID/us-east-1   # required for ACM + CloudFront
npx cdk deploy --all
```

Context (see `infra/cdk.json`):

| Key | Purpose |
| --- | --- |
| `domainName` | `fba.my` |
| `contactToEmail` | Inbox for form submissions |
| `contactFromEmail` | SES From address |
| `hostedZoneId` | Optional Route 53 zone for auto DNS |
| `githubOrg` / `githubRepo` | OIDC trust for GitHub Actions |

### Stacks

1. **FbaCertificate** (`us-east-1`) — ACM cert for `fba.my` + `www.fba.my`
2. **FbaHosting** — private S3 bucket, CloudFront (OAC), optional Route 53 records
3. **FbaContact** — HTTP API + Lambda + SES domain identity
4. **FbaGithubOidc** — deploy role for site sync / invalidation

After deploy:

1. Complete ACM DNS validation (if no hosted zone was provided).
2. Complete SES domain verification and leave sandbox if needed.
3. Copy `ContactApiUrl` → `NEXT_PUBLIC_CONTACT_API_URL` (local `.env.local` and GitHub Actions variable).
4. Copy `BucketName`, `DistributionId`, and `DeployRoleArn` into GitHub Actions vars/secrets.

## GitHub Actions

### Site deploy (`.github/workflows/deploy.yml`)

**Variables**

- `NEXT_PUBLIC_CONTACT_API_URL`
- `SITE_BUCKET`
- `CLOUDFRONT_DISTRIBUTION_ID`
- `AWS_REGION` (default `ap-southeast-1`)

**Secrets**

- `AWS_DEPLOY_ROLE_ARN` — from `FbaGithubOidc` output `DeployRoleArn`

### Infra deploy (`.github/workflows/deploy-infra.yml`)

Uses a separate admin/CDK role (`AWS_CDK_DEPLOY_ROLE_ARN`) plus `AWS_ACCOUNT_ID`. Create that role manually (or extend CDK) with permissions to deploy the stacks; the site OIDC role is intentionally limited to S3 + CloudFront invalidation.

## Decap CMS (production)

1. Set `backend.repo` in `public/admin/config.yml` to your GitHub `owner/repo`.
2. Host a GitHub OAuth gateway for Decap (static hosts cannot complete OAuth alone). Options:
   - [decap-cms-oauth-server](https://github.com/davidejones/decap-cms-oauth-server) / community Lambda proxies
   - Any small OAuth app that implements Decap’s GitHub backend auth endpoint
3. Point `backend.base_url` at that gateway origin (often `https://fba.my` if the proxy is under `/api/auth`).
4. Create a GitHub OAuth App with callback URL matching the gateway.
5. Open `https://fba.my/admin/` and sign in.

Staff write posts in Decap → commit MDX → GitHub Actions rebuilds → S3/CloudFront.

## Architecture notes

- No Next.js server runtime in production (`output: "export"`).
- Do not put AWS keys in the frontend; the contact form posts only to API Gateway.
- See [OVERVIEW.md](./OVERVIEW.md) for the original architecture rationale.
