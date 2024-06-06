---
title: "HonoXでReactベースのUIライブラリYamadaUIを使用する"
excerpt: "HonoのフルスタックメタフレームワークであるHonoXにreact-rendererを使用して、React依存のUIライブラリであるYamadaUIやReact Flowを使用してアプリを作成した方法をまとめました"
date: "2024-5-5"
beginColor: 'from-red-500'
middleColor: 'via-orange-300'
endColor: 'to-yellow-400'
category: 'dev'
tags: ['honox', 'react', 'yamadaui', 'cloudflare']
status: 'preview'
---
## 目次

## はじめに

Bring Your Own Server.デフォルトではremix-serveがでサーバを立てるが、お好みのサーバでも動く。
チュートリアルでは素のexpressサーバで起動する方法が紹介されている。

vite middleware modeを使用することでHMRとRemix Hot Data Revalidationが効くようになる。

RemixはSPA Reactで辛いstateの管理を、stateを常にサーバと同期させる思想で解決する

1. viewをReactで作成する
2. Loader/Actionの定義
これらはclient, server間でやり取りを行うための関数

- loader関数（取得系）
   1. loader関数では、サーバのデータをviewに渡すためのデータstateを定義し
   2. loader関数の返り値をviewで受け取れる
   3. loader関数は、RESTfullでいうGETに相当する関数であり、app/route/*のファイルでexport const loaderをすることで、そのURLパスにGETAPIエンドポイントを定義
- action関数（更新系）
   1. クライアントからのActionを受け取り、Stateの変更などを行うサーバーサイドの関数
   2. クライアントのPOSTリクエストを受け取り、Bodyのデータを読み取ることが可能
   3. Remixでサーバーサイドにリクエストを行うのに、<form />に<input />などのフィールドを用意して、<Button type="submit" />を行うだけで、クライアントのデータをサーバーに送ることができます

Remixは、ViewをReact、Controllerをloader/action関数を用いて構築ができます

Remixで取り扱うStateのほとんどは、サーバーサイドから供給されるため、Reactは受け取ったStateをコンポーネントに流す込むだけ

useRouteLoaderData関数を使うことで、簡単に任意の親RouteのStateにアクセス可能で、実質的にグローバルなState管理を代替することができる

→アプリケーション全体で使うデータをあらかじめ親Routeのloaderで読み込んでおくだけで、全ての子Routeからアクセス可能

client-presetでdocument node作って、以下のcustom fetcher使った
https://the-guild.dev/graphql/codegen/docs/guides/react-vue#appendix-i-react-query-with-a-custom-fetcher-setup

githubリポにstarつけるボタンつけてactionの練習したい

/usernameでシェアしてメタデータとかも合わせて、snsみたいにできそう

自由なデータ取得方法(=>ssrでもcsrでも)で
githubの草を→頑張って作る。shadcnのコンポーネントダウンロード形式的な
カスタマイズしたい→カスタマイズのための
データに依らないView部分だけを提供したい

JSXコンポーネントをcliでプロジェクトに作らせるコマンド
ライブラリで使用しているライブラリをインストールさせる
tailwind configを合わせさせる
global.cssを合わせさせる
コンポーネントインストールコマンドを叩かせる
コンポーネントがプロジェクトに配置される（node_modulesから読み込む形ではない）

bun link
bun link git-contribution-react-heatmap-cli

zod.parseを使用して返り値のかたを型安全にする

```ts
export async function fetchTree(
  style: string,
  tree: z.infer<typeof registryIndexSchema>
) {
  try {
    const paths = tree.map((item) => `styles/${style}/${item.name}.json`)
    const result = await fetchRegistry(paths)

    return registryWithContentSchema.parse(result)
  } catch (error) {
    throw new Error(`Failed to fetch tree from registry.`)
  }
}
```
