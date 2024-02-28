---
title: "Next.jsでmarkdownを使用したSSGのブログを作成する"
excerpt: "Next.jsのApp RouterでSSGをしながら、ブログを作成した過程をまとめます。"
date: "2024-2-28"
beginColor: 'from-purple-300'
middleColor: 'via-blue-200'
endColor: 'to-pink-200'
category: 'dev'
tags: ['react', 'nextjs', 'turborepo', 'vercel']
status: 'published'
---
## 目次

## はじめに
この記事では、ブログを開発するにあたって選定した技術やアプリの構成について軽くまとめます。
技術的な詳細やチャレンジは後日また記事にしたいと考えています。

## 使用技術
今回このブログに使用されているおおまかな技術は以下のようになります。

https://github.com/saku-1101/saku-apps

#### 全体
- Vercel
- Turborepo

#### ブログアプリ：`/apps/blog`
- Next.js (v14)

#### 記事管理：`/articles`
- マークダウンを管理

#### アプリで必要なパッケージ：`/packages`
- サイドバー目次作成のためのHeadings切り出しパッケージ：`headings-extractor`
  - JavaScript
- TailwindCSSのグローバルconfigパッケージ：`tailwind-confing`

- TypeScriptのグローバルconfigパッケージ：`typescript-config`

- 共通uiコンポーネントパッケージ：`ui`
  - React
  - Storybook

## 技術選定理由
簡単に選定した技術とそれらの選定理由を書いていきます。

### Turborepo
モノリポを個人開発でも導入してみたかったという興味がきっかけです。
Turborepoは仕事やOSSでよく見るものの、実際にゼロから自分でプロジェクトを立ち上げるときに使用した経験がなく、モノリポに対するふわっとした理解が深まればいいなという願いを込めて選定しました。

Turborepoでは、各workspaceに定義されたpackage.jsonのscriptsを、workspace間の依存関係を考慮した順番でビルドしてくれます。

また、Turborepoを選定して大きく感じたメリットとして、ローカル・リモートキャッシュの恩恵を受けて効率的に開発できるなと感じています。

ローカルキャッシュに関しては`turbo.json`にキャッシュファイル群を指定する設定を行うことで、キャッシュがある時のビルドが効率化されます。キャッシュを利用して、差分がある箇所のみのビルドを行うことができます。

```json showLineNumbers {7} title="turbo.json"
{
    "$schema": "https://turbo.build/schema.json",
    "globalDependencies": ["**/.env.*local"],
    "pipeline": {
        "build": {
            "dependsOn": ["^build"],
            "outputs": [".next/**", "!.next/cache/**"]
        },
        "test": {
            "dependsOn": ["^build"]
        },
        ...
    }
    ...
}
```
さらに、リモートキャッシュを使用することでCIの高速化を図ることができます。
今回はVercelをPaaSとして使用したので、Vercelのキャッシュサーバをそのまま利用することができ、CIでリモートキャッシュを比較的簡単に使用することができました。

### Next.js
まず、ブログアプリということで、初回レンダリングのパフォーマンス改善とSEOに対する強みが欲しかったので、ページのPre-RenderingができるReactフレームワークを使用したいと考えました。
加えて、ブログアプリのため、SSGができるということも条件に入れたかったです。
Next.jsであれば、Dynamic Routingであっても`generateStaticParams`を使用することでSSGをすることができます。
さらに、Turborepoを使用するということで、Vercelにデプロイすることでキャッシュやその他の面で恩恵を受けやすい一面のあったNext.jsで事をすすめました。
Next.jsのSSGアプリをVercelでホスティングすると、構築済みのHTMLファイルを都度アプリケーションサーバーから取得するのではなく、CDNにHTMLファイルのキャッシュを配置しておくことでパフォーマンスの最大化に近づけるということが比較的簡単に行えます。

## 感想
今回は、ブログを開発するにあたって選定した技術について**狭く浅く**触れました。

VercelとTurborepoを使用すると、キャッシュを活かした開発を比較的簡単に行うことができます。

また、Next.jsを使用することで

Vercelすごい。

## 余談
テストがないとかバグとかまだまだ改善しなければいけない部分があるので、追々やっていきたいです🤸🏻
