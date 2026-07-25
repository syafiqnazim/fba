Next.js is a reasonable choice, especially since you are already comfortable with React and may want to add application features later.

For this project, I would use **Next.js as a statically exported site**, not as a permanently running server application.

## Recommended setup

```text
Next.js
├── Static company pages
├── Markdown or MDX blog
├── English and Bahasa Malaysia routes
├── Static export
└── Contact form through a separate serverless API
```

Deployment:

```text
GitHub
   ↓
GitHub Actions
   ↓
Next.js static export
   ↓
Private S3 bucket
   ↓
CloudFront
   ↓
Custom domain
```

This gives you:

* Very low hosting cost
* No always-running server
* Strong availability through CloudFront
* Full control over AWS resources
* Portable static HTML output
* A familiar React development experience

## Suggested technology stack

| Area               | Recommendation                              |
| ------------------ | ------------------------------------------- |
| Framework          | Next.js with App Router                     |
| Language           | TypeScript                                  |
| Styling            | Tailwind CSS or CSS Modules                 |
| Blog format        | MDX                                         |
| Content management | Git-based CMS or small custom admin         |
| Hosting            | S3 + CloudFront                             |
| Deployment         | GitHub Actions                              |
| Forms              | API Gateway + Lambda + SES                  |
| Infrastructure     | AWS CDK or Terraform                        |
| Languages          | Route-based internationalisation            |
| Analytics          | Cloudflare Web Analytics, Plausible, or GA4 |

## Static export configuration

Your `next.config.ts` would look roughly like this:

```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

When you run:

```bash
npm run build
```

Next.js generates an `out` directory containing static files.

You then upload that directory to S3.

## Suggested route structure

```text
app/
├── [locale]/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── services/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   └── blog/
│       ├── page.tsx
│       └── [slug]/
│           └── page.tsx
```

Your URLs could be:

```text
/en/
/en/about/
/en/blog/first-article/

/ms/
/ms/tentang-kami/
/ms/blog/artikel-pertama/
```

For Malaysia, you could make Bahasa Malaysia or English the default, depending on the company’s audience.

## Blog implementation

I would use MDX files stored in the repository.

```text
content/
└── blog/
    ├── en/
    │   └── company-launch.mdx
    └── ms/
        └── pelancaran-syarikat.mdx
```

Example MDX post:

```mdx
---
title: "Introducing Our New Company"
description: "A brief introduction to our services and direction."
publishedAt: "2026-07-24"
locale: "en"
slug: "introducing-our-company"
image: "/images/blog/company-launch.jpg"
---

We are pleased to introduce our company and the services we provide.
```

You can validate the front matter using Zod:

```ts
import { z } from 'zod';

export const blogPostSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  publishedAt: z.string(),
  locale: z.enum(['en', 'ms']),
  slug: z.string().min(1),
  image: z.string().optional(),
});
```

This prevents malformed blog posts from being deployed.

## The main issue: non-technical publishing

The framework is not the difficult part. The publishing interface is.

Your friend should not need to edit MDX or use GitHub directly.

You have three practical options.

### Option 1: Git-based CMS

Use a CMS that edits files inside the Git repository.

Flow:

```text
Staff opens CMS
   ↓
Writes blog post
   ↓
CMS commits MDX file
   ↓
GitHub Actions builds site
   ↓
Static site deploys to S3
```

Advantages:

* Content remains portable
* No database
* Full version history
* Low cost
* Easy rollback

This is the best match for your current requirements.

### Option 2: Build a small custom admin

You could later create:

```text
admin.company.com
```

The admin could use:

* Amazon Cognito for login
* S3 or DynamoDB for draft content
* Lambda for publishing
* GitHub API to commit MDX files

This gives you more control, but it is significantly more work.

I would not build this for the first version unless you want it as a technical exercise.

### Option 3: Headless CMS

Examples include content platforms that provide a visual editor and API.

The site would retrieve content during the build process, then generate static pages.

Advantages:

* Better editing experience
* Media management
* Drafts and publishing workflows
* Less Git knowledge required

Disadvantages:

* External dependency
* Potential subscription cost
* Greater vendor lock-in
* More moving parts

Because cost and portability are important, I would begin with a Git-based CMS.

## Contact form architecture

The static site cannot securely send email directly from the browser.

Use:

```text
Next.js contact page
   ↓
API Gateway HTTP API
   ↓
Lambda
   ↓
Amazon SES
```

The Lambda should handle:

* Input validation
* Email formatting
* Rate limiting
* Spam prevention
* Logging
* Generic success and error responses

Do not put AWS access keys or SES credentials in the frontend.

## Important Next.js limitations

Using `output: 'export'` means you should avoid features that require a Next.js runtime server.

Avoid depending on:

* Server Actions
* Dynamic API routes inside Next.js
* Request-time server rendering
* Middleware-based authentication
* Server-side cookies
* Runtime image optimisation
* ISR that requires a server platform
* Database calls during page requests

Instead, generate everything at build time.

For dynamic functionality, use separate AWS services:

```text
Static Next.js frontend
+
API Gateway
+
Lambda
+
DynamoDB or SES when needed
```

This separation is clean and scalable.

## Handling new blog posts

Because the site is statically generated, every new article triggers a rebuild.

At one article per week and below 1,000 monthly visits, this is completely reasonable.

The workflow would be:

1. Staff creates an article.
2. The CMS commits the MDX file.
3. GitHub Actions runs the Next.js build.
4. The generated files are uploaded to S3.
5. CloudFront cache is invalidated.
6. The new article becomes available.

A rebuild-based publishing model only becomes inconvenient when content changes extremely frequently.

## Recommended AWS structure

```text
AWS account
├── S3
│   └── Static website files
├── CloudFront
│   └── CDN and HTTPS
├── ACM
│   └── TLS certificate
├── Route 53
│   └── Optional DNS
├── API Gateway
│   └── Contact form endpoint
├── Lambda
│   └── Contact form processing
├── SES
│   └── Email delivery
└── CloudWatch
    └── Logs and monitoring
```

The S3 bucket should remain private. CloudFront should access it through Origin Access Control.

## Error-page handling

Because this is static hosting, create explicit error pages:

```text
app/not-found.tsx
```

You should also configure CloudFront error responses properly for:

* `404`
* `403`
* Unknown routes

Be careful not to configure every missing route to return the homepage unless you are intentionally building a single-page application. For a statically generated company site, proper `404` responses are better.

## My recommendation

Use:

```text
Next.js App Router
TypeScript
MDX
Git-based CMS
GitHub Actions
S3
CloudFront
API Gateway
Lambda
SES
```

Keep the first version completely static except for the contact form.

The key architectural rule is:

> Use Next.js as a static-site generator now, and add AWS serverless services alongside it when real dynamic requirements appear.

That gives you the React and Next.js development experience you prefer without sacrificing your priorities of cost, reliability, serverless infrastructure and portability.
