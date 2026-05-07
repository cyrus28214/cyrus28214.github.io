import yaml from 'js-yaml';
const content = `---
title: "Markdown Syntax Test"
description: "A post to test all Markdown syntax rendering."
---

# Markdown Syntax Guide`;

const match = content.match(/^---\n([\s\S]*?)\n---\n/);
if (match) {
  const frontmatter = yaml.load(match[1]);
  console.log(frontmatter);
}
