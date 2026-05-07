import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const blogLoader = () => {
  return {
    name: 'blog-loader',
    load: async ({ store, logger, parseData }) => {
      const baseDir = new URL('./src/content/blog', `file://${process.cwd()}/`);
      const baseDirPath = fileURLToPath(baseDir);
      
      let dirs;
      try {
        dirs = await fs.readdir(baseDirPath, { withFileTypes: true });
      } catch (e) {
        logger.warn(`Failed to read blog directory: ${e.message}`);
        return;
      }

      for (const dir of dirs) {
        if (!dir.isDirectory()) continue;
        
        const dirPath = path.join(baseDirPath, dir.name);
        const jsonPath = path.join(dirPath, 'frontmatter.json');
        
        let jsonFrontmatter = {};
        try {
          const jsonContent = await fs.readFile(jsonPath, 'utf-8');
          jsonFrontmatter = JSON.parse(jsonContent);
        } catch (e) {
          logger.warn(`No valid frontmatter.json found in ${dirPath}`);
        }
        
        coCyrnst files = await fs.readdir(dirPath);
        for (const file of files) {
          if (!file.endsWith('.md') && !file.endsWith('.mdx')) continue;
          
          const filePath = path.join(dirPath, file);
          const lang = file.includes('.zh.md') ? 'zh' : 'en';
          
          let fileContent = '';
          try {
            fileContent = await fs.readFile(filePath, 'utf-8');
          } catch (e) {
            logger.warn(`Failed to read file: ${filePath}`);
            continue;
          }
          
          let mdFrontmatter = {};
          const match = fileContent.match(/^---\n([\s\S]*?)\n---\n/);
          if (match) {
            try {
              mdFrontmatter = yaml.load(match[1]) || {};
            } catch (e) {
              logger.warn(`Failed to parse frontmatter in ${filePath}`);
            }
          }
          
          const mergedData = {
            ...jsonFrontmatter,
            ...mdFrontmatter,
          };
          
          const parsedData = await parseData({
            id: `${dir.name}/${lang}`,
            data: mergedData,
            filePath,
          });

          // remove markdown frontmatter for Astro standard rendering
          // so it won't show up in body
          let body = fileContent;
          if (match) {
            body = body.slice(match[0].length);
          }

          const relativeFilePath = path.relative(process.cwd(), filePath);
          
          store.set({
            id: `${dir.name}-${lang}`,
            data: parsedData,
            filePath: relativeFilePath,
            body,
          });
        }
      }
    }
  }
};

export const collections = {
  blog: defineCollection({
    loader: blogLoader(),
    schema: z.object({
      title: z.string(),
      description: z.string(),
      published_at: z.coerce.date(),
      updated_at: z.coerce.date().optional().nullable(),
      draft: z.boolean().optional().default(false),
      cover: z.string().optional().nullable(),
      slug: z.string().optional(),
    })
  })
};