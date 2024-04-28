---
title: "HonoXを用いたフルスタックなポートフォリオページを作成する"
excerpt: ""
date: "2024-2-28"
beginColor: 'from-purple-300'
middleColor: 'via-yellow-200'
endColor: 'to-green-300'
category: 'dev'
tags: ['react', 'nextjs', 'turborepo', 'vercel']
status: 'preview'
---
## 目次

## はじめに

`x-basic`を選択して`hono-create`する
```bash
npm create hono@latest
```

![alt text](image-1.png)

## ディレクトリの構造と役割

## レンダリングの仕組み
それぞれのrouteでは、Handler | MiddlewareHandlerの配列を返す。
createRouteはそのためのヘルパー関数。
default exportすることによって、GETリクエストのルートを書くことができます。
ContextとはRequestとResponseを操作するためのオブジェクト。

GETの他にも、そのルートに対して`POST`, `PUT`, `DELETE`メソッドを用いることができる。
`POST`, `PUT`, `DELETE`メソッドを用いる場合は、それぞれのメソッド名をexportする。

Honoオブジェクトをdefault exportすることで、APIエンドポイントを`routes`内に作成できる。
![alt text](image.png)

`_renderer.tsx`は`layout.tsx`的な立ち回り。

> The JSX Renderer middleware allows you to create a Renderer as follows

RendererはHono推奨の`@jsx/hono`


インタラクションを必要とするコンポーネントの場合、`app/islands`ディレクトリ配下に作成するまたは`_componentName.island.tsx`と命名する。islandsディレクトリ以下のコンポーネントをアイランドコンポーネントと呼ぶ。
default exportしていなければならない。

アイランドコンポーネントからは、Contextオブジェクトにはアクセスできない。そのため、アイランドコンポーネント外から必要な値を注入またはパスしてあげる必要がある。
```ts
import { useRequestContext } from "hono/jsx-renderer";
import Counter from "../islands/counter";

export default function SomeComponent() {
  const c = useRequestContext();
  return <Counter initVal={parseInt(c.req.query("initCounterVal") ?? "0")} />;
}
```

Cloudflare Pagesにデプロイ
![alt text](image-3.png)
![alt text](image-2.png)


## 参考
https://github.com/honojs/honox
https://azukiazusa.dev/blog/full-stack-web-framework-honox/