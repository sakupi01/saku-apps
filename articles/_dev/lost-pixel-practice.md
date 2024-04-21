---
title: "Lost PixelとGithub Actionsを用いたVRTの具体例"
excerpt: "撮影したスナップショットをGithub上で管理し、PR上で差分検知を行うことで、意図せぬビジュアルのデグレを防いでくれるLost Pixelの具体的な使用例の話です"
date: "2024-4-21"
beginColor: 'from-cyan-200'
middleColor: 'via-emerald-300'
endColor: 'to-amber-200'
category: 'dev'
tags: ['lost-pixel', 'vrt', 'testing', 'monorepo']
status: 'published'
---
## 目次

## はじめに
2月に開催された[#vrt4選](https://twitter.com/hashtag/VRT4%E9%81%B8)という勉強会に参加した際、その中で紹介されていたLost Pixelに興味を持ちました。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">Lost Pixcel、OSSモード前提だとUIの差分が見た目で検知しにくい以外めちゃくちゃ魅力的かも<br>個人開発でTryしてみたみがある<a href="https://twitter.com/hashtag/VRT4%E9%81%B8?src=hash&amp;ref_src=twsrc%5Etfw">#VRT4選</a></p>&mdash; saku (@SakuOnTheWeb) <a href="https://twitter.com/SakuOnTheWeb/status/1760260787078357477?ref_src=twsrc%5Etfw">February 21, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

👇該当のスライド

https://speakerdeck.com/aiji42/vrtturunodakuhosu-lost-pixelwoshao-jie-sitai

普段は専らChromaticユーザなのですが、個人開発の際無料枠の上限にヒットして痛い目にあった過去があるので、今回個人ブログではLost PixelでVRTを行うことにしてみました。

[#vrt4選](https://twitter.com/hashtag/VRT4%E9%81%B8)では詳細な実装やVRTの一連の流れまで述べられていなかったので、現在私が実践している具体的なVRTの流れをまとめてみました。

## 前提
今回このブログに使用されているおおまかな技術は以下のようになります。

https://www.skr-blog.com/dev/articles/blog-tech-stack

`/apps/blog`にNext.js製のブログアプリを含むモノリポ構成です。

今回はこのブログアプリ部分にLost Pixelを用いたVRTを施していきます。

## Lost Pixelとは
重複した説明になってしまいそうなため、ここでは簡単な説明に止めて、詳細はスライドやZennの記事に譲りたいと思います。




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
今回はVercelをPaaSとして使用したので、Vercelのキャッシュサーバーをそのまま利用でき、CIでリモートキャッシュを比較的簡単に使用できました。

https://vercel.com/docs/monorepos/turborepo

### Next.js
まず、ブログアプリということで、初回レンダリングのパフォーマンス改善とSEOに対する強みが欲しかったので、ページのPre-RenderingができるReactフレームワークを使用したいと考えました。
加えて、ブログアプリのため、リクエスト時ではなく、ビルド時に生成されたファイルを提供する、SSGができるということも条件に入れたかったです。
<br/>
<br/>
各記事は`/dev/articles/[slug]/*.tsx`|`/life/articles/[slug]/*.tsx`で管理しているのですが、Next.jsであれば、こうしたDynamic Routesであっても`generateStaticParams`を使用することでSSGをできます。

https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#generating-static-params

さらに、Turborepoを使用するという背景も加わり、Vercelにデプロイすることでキャッシュやその他の面で恩恵を受けやすい一面のあったNext.jsで事を進めました。
Next.jsのSSGアプリをVercelでホスティングすると、構築済みのHTMLファイルを都度アプリケーションサーバーから取得するのではなく、CDNにHTMLファイルのキャッシュを配置しておくことでパフォーマンスの最大化に近づけるということが比較的簡単に行なえます。
<br/>
<br/>
これでNext.jsを使用するということは決まったのですが、正直前述の条件であればPages Routerで十分な気がしてきました。
<br/>
<br/>
しかし、App Routerを使用することでReact Server ComponentsやSuspenseがデフォルトで使用できたり、それによるさらなるパフォーマンス改善が期待できたりしました。そこで、一旦App Routerでやってみて、不具合などで見切りがつきそうならPagesにしようという気持ちでApp Routerに舵を切りました。

### 記事管理と提供
記事の管理は`[root]/articles/**/*.md`でマークダウンとして管理しています。
`*.md`ファイルの頭にfront matterというYAML形式でメタデータを記述できる手法を用いて、[gray-matter](https://www.npmjs.com/package/gray-matter)でYAMLを解析し、jsonデータとして取り出しています。
<br/>
<br/>
markdown自体の解析・DOM構築、目次の生成には[remark](https://github.com/remarkjs/remark)、remarkの諸プラグイン、[remark-rehype](https://github.com/remarkjs/remark-rehype)、rehypeの諸プラグイン、rehype-stringifyを使用して、markdownをHTML stringで返却する関数を使用しています。
<br/>
<br/>
<!-- textlint-disable -->
少しまとめると、[remark](https://github.com/remarkjs/remark)でmarkdown→AST(mdast)に変換し、mdastのカスタマイズが可能な諸プラグインの処理を通し、[remark-rehype](https://github.com/remarkjs/remark-rehype)でAST(mdast)→AST(hast)に変換し、hastのカスタマイズが可能な諸プラグインの処理を通し、[rehype-stringify](https://www.npmjs.com/package/rehype-stringify)でHTML形式のテキストを出力しています。
stringに変換されたHTMLは、最終的にはサニタイズしたのちに`dangerouslySetInnerHTML`を使用してブラウザDOMとしてレンダリングしています。
<!-- textlint-enable -->

## 感想
今回は、ブログを開発するにあたって選定した技術について狭く浅く触れました。
<br/>
<br/>
CMS使おうと思ってやっぱやめたってなった話とか、TailwindCSSと仲違いしそうになった話とか、技術的なチャレンジとか、色々書ききれてないことはまたまとめていきたいです🌸
<br/>
<br/>
Vercelってすごい。

## 余談
<!-- textlint-disable -->
テストがないとかリファクタできるとかまだまだ改善しなければいけない部分があるので、追々やっていきたいです🤸🏻
<!-- textlint-enable -->
