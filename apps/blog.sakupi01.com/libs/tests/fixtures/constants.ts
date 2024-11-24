export const CATEGORIES = {
  life: { name: "life", dir: "_life" },
  dev: { name: "dev", dir: "_dev" },
} as const;

export const ARTICLE = {
  slug: "hoge",
  data: `---
title: "test1"
excerpt: "test1"
date: "2024-11-28"
category: 'dev'
tags: ['test1']
status: 'published'
---
## 目次

## はじめに
`,
} as const;
