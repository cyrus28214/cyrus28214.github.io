import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import type { Loader } from "astro/loaders";
import { glob, readFile } from "node:fs/promises";
import { basename, dirname, join } from "node:path";
import { parse } from "smol-toml";

const tomlSchema = z.object({
  slug: z.string(),
  common: z.record(z.string(), z.any()).default({}),
  locales: z.record(z.string(), z.record(z.string(), z.any())),
});

const blogSchema = z.object({
  slug: z.string(),
  locales: z.map(
    z.string(),
    z.object({
      title: z.string(),
      description: z.string(),
      created_at: z.coerce.date(),
      updated_at: z.coerce.date().optional().nullable(),
      draft: z.boolean().optional().default(false),
      cover: z.string().optional().nullable(),
      content: z.string(),
    }),
  ),
});

function blogLoader(basePath: string) {
  return {
    name: "blog-loader",
    load: async ({ store }) => {
      store.clear();
      const metaPattern = join(basePath, "**/blog.toml");
      for await (const metaPath of glob(metaPattern)) {
        const metaContent = await readFile(metaPath, "utf-8");
        const metaRaw = parse(metaContent);
        const meta = tomlSchema.parse(metaRaw);
        const slug = meta.slug;
        const common = meta.common;
        const locales = Object.entries(meta.locales).map(([lang, locale]) => ({
          ...common,
          ...locale,
        }));
        store.set({
          id: slug,
          data: {
            locales,
            slug,
          },
        });
      }
    },
  } satisfies Loader;
}

export const collections = {
  blog: defineCollection({
    loader: blogLoader("src/content/blog"),
    schema: blogSchema,
  }),
};
