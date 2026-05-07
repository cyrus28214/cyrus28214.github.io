import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

function blogLoader() {
    return {
        name: "blog-loader",
        load: async ({ }) => { }
    }
}

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