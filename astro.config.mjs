// @ts-check
import { defineConfig } from "astro/config";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import simplePlantUML from "@mstroppel/remark-local-plantuml";

// https://astro.build/config
export default defineConfig({
  i18n: {
    defaultLocale: "zh",
    locales: ["en", "zh"],
    fallback: {
      en: "zh",
    },
    routing: {
      prefixDefaultLocale: true,
      fallbackType: "rewrite",
    },
  },
  markdown: {
    remarkPlugins: [remarkMath, simplePlantUML],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
    },
  },
});
