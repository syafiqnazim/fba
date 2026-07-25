import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import type { Locale } from "./i18n";

export const blogPostSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  publishedAt: z.string().min(1),
  locale: z.enum(["en", "ms"]),
  slug: z.string().min(1),
  image: z.string().optional(),
});

export type BlogPostMeta = z.infer<typeof blogPostSchema>;

export type BlogPost = BlogPostMeta & {
  content: string;
};

const contentRoot = path.join(process.cwd(), "content", "blog");

function postsDir(locale: Locale): string {
  return path.join(contentRoot, locale);
}

export function getPostSlugs(locale: Locale): string[] {
  const dir = postsDir(locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getPostBySlug(locale: Locale, slug: string): BlogPost | null {
  const fullPath = path.join(postsDir(locale), `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;

  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const meta = blogPostSchema.parse({ ...data, locale, slug: data.slug ?? slug });

  return { ...meta, content };
}

export function getAllPosts(locale: Locale): BlogPostMeta[] {
  return getPostSlugs(locale)
    .map((slug) => getPostBySlug(locale, slug))
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .map(({ title, description, publishedAt, locale: postLocale, slug, image }) => ({
      title,
      description,
      publishedAt,
      locale: postLocale,
      slug,
      image,
    }));
}
