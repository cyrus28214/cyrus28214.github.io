import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import type { Loader } from "astro/loaders";
import { glob, readFile } from "node:fs/promises";
import { basename, dirname, join } from "node:path";
import { parse } from "smol-toml";

const tomlSchema = z.object({
  id: z.string(),
  base: z.record(z.string(), z.any()).default({}),
  versions: z.record(z.string(), z.record(z.string(), z.any())),
});

const blogSchema = z.object({
  id: z.string(),
  versions: z.record(
    z.string(),
    z.object({
      title: z.string(),
      lang: z.string(),
      description: z.string(),
      created_at: z.coerce.date(),
      updated_at: z.coerce.date().optional().nullable(),
      draft: z.boolean().optional().default(false),
      cover: z.string().optional().nullable(),
      content: z.string(),
      html: z.string(),
    }),
  ),
});

function blogLoader(basePath: string) {
  return {
    name: "blog-loader",
    load: async ({ store, renderMarkdown }) => {
      store.clear();
      const metaPattern = join(basePath, "**/meta.toml");
      for await (const metaPath of glob(metaPattern)) {
        const metaContent = await readFile(metaPath, "utf-8");
        const metaRaw = parse(metaContent);
        const meta = tomlSchema.parse(metaRaw);
        const id = meta.id;
        const base = meta.base;
        const versions = Object.entries(meta.versions).map(
          async ([lang, version]) => {
            const content = await readFile(
              join(dirname(metaPath), `index.${lang}.md`),
              "utf-8",
            );
            const rendered = await renderMarkdown(content);
            return [
              lang,
              {
                ...base,
                ...version,
                id,
                lang,
                content,
                html: rendered.html,
              },
            ] as const;
          },
        );
        const data = blogSchema.parse({
          id,
          versions: Object.fromEntries(await Promise.all(versions)),
        });
        store.set({
          id,
          data,
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
