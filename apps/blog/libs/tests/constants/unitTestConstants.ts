export const WHICH = {
  life: { name: "life", dir: "_life" },
  dev: { name: "dev", dir: "_dev" },
} as const;

export const ARTICLE = {
  slug: "test1",
  // MEMO: YAMLのインデントが重要なのでこのインデントを変えない
  content: `
---
title: "Life-サンプル"
excerpt: "テスト用の記事"
coverImage: 
    url: "/IMG_0955.jpg"
    alt: 'サンプルのalt'
date: "2024-2-27"
category: 'life'
tags: ['life', 'foreign']
status: 'published'
---
## 目次
## テストタイトル`,
} as const;
