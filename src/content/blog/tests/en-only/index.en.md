---
title: "English Only Post"
description: "Used to test the fallback behavior when visiting in Chinese."
---

This post **only has an English version**.

When a user visits `/zh/blog/en-only`, the page should:

1. Show a fallback notice at the top
2. Render this English body content
3. Set the `lang` attribute to `en`

## Section

Some paragraphs to verify typography.

> A blockquote to check styling.

```ts
// A code sample
const greet = (name: string) => `Hello, ${name}`;
```
