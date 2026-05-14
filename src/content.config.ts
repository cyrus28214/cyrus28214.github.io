import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import type { Loader } from "astro/loaders";
import { glob, readFile } from "node:fs/promises";
import { basename, dirname, join, relative, resolve } from "node:path";
import { load } from "js-yaml";
import { isLanguage } from "./lib/i18n";
import { pathToFileURL } from "node:url";

const blogSchema = ({ image }: { image: any }) =>
  z.object({
    id: z.string(), // articleId
    lang: z.string(), // unique <id, lang>
    title: z.string(),
    description: z.string().optional(),
    created_at: z.coerce.date(),
    updated_at: z.coerce.date().optional().nullable(),
    draft: z.boolean().optional().default(false),
    cover: image().optional().nullable(),
  });

function blogLoader(basePath: string): Loader {
  return {
    name: "blog-loader",
    load: async ({ store, renderMarkdown, parseData, logger, generateDigest, watcher }) => {
      const sync = async (relPath: string /* relative to basePath */) => {
        const filePath = join(basePath, relPath);
        logger.info(`Sync ${filePath}`);
        const fileName = basename(filePath); // 获取 "index.en.md"
        const langMatch = fileName.match(/index\.([a-z]{2})\.md$/i);
        const lang = langMatch ? langMatch[1] : null;
        if (!isLanguage(lang)) {
          logger.warn(`${filePath} has invalid language: ${lang}, skipped`);
          return;
        }
        const content = await readFile(filePath, "utf-8");
        const fileURL = pathToFileURL(filePath);
        const rendered = await renderMarkdown(content, { fileURL});
        const dirPath = dirname(filePath);
        const metaPath = join(dirPath, "frontmatter.yaml");
        let metaRaw = null;
        try {
          metaRaw = await readFile(metaPath, "utf-8");
        } catch (error: any) {
          if (error.code !== "ENOENT") {
            // if file not exsits, do nothing
            logger.warn(
              `${filePath} failed to read ${metaPath}: ${error.message}, ignored`,
            );
          }
        }
        const meta = metaRaw ? (load(metaRaw) as Record<string, any>) : null;
        const inlineMeta = rendered.metadata?.frontmatter;
        const data = { ...meta, ...inlineMeta, lang } as Record<string, any>;
        let articleId = data.id;
        if (typeof articleId !== "string") {
          logger.warn(`${filePath} has no "id" field, skipped`);
          return;
        }
        const contentId = `${lang}/${articleId}`; // unique
        store.set({
          id: contentId,
          data: await parseData({
            id: contentId,
            data,
          }),
          rendered,
          filePath,
          body: content,
          digest: generateDigest(content),
          assetImports: rendered.metadata?.imagePaths
        });
      };

      store.clear();
      const filePattern = join("**/index.*.md");
      const promises = [];
      for await (const filePath of glob(filePattern, { cwd: basePath })) {
        const p = sync(filePath).catch((e) => {
          logger.error(`Failed to load blog entry at ${filePath}: ${e}`);
        });
        promises.push(p);
      }
      await Promise.all(promises);
      if (!watcher) {
        return
      }

      const onChange = async (changedPath: string) => {
        const resolvedBasePath = resolve(basePath);
        const relPath = relative(resolvedBasePath, changedPath);
        // console.log({ relPath, changedPath, resolve(basePath) });
        await sync(relPath);
      }

      watcher.on('change', onChange);
      watcher.on('add', onChange);
    },
  };
}

export const collections = {
  blog: defineCollection({
    loader: blogLoader("src/content/blog"),
    schema: blogSchema,
  }),
};
