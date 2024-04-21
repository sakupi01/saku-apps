---
title: "Lost PixelとGithub Actionsを用いたVRTの具体例"
excerpt: "撮影したスナップショットをGithub上で管理し、PR上で差分検知を行うことで、意図せぬビジュアルのデグレを防いでくれるLost Pixelの具体的な運用方法についてです"
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

普段は専ら[Chromatic](https://www.chromatic.com/)ユーザなのですが、個人開発の際無料枠の上限にヒットして痛い目にあった過去があるので、今回個人ブログではLost PixelでVRTを行うことにしてみました。

[#vrt4選](https://twitter.com/hashtag/VRT4%E9%81%B8)では詳細な実装やVRTの一連の流れまで述べられていなかったかつ、まだ国内であまり普及しておらず、発表者の方のスライド以外で日本語文献が見つからなかったため、今回はLost Pixelを用いた具体的なVRTの運用方法をまとめてみました。

## 前提
前提として、このブログは`/apps/blog`にNext.js製のブログアプリを含むモノリポ構成でできています。

https://www.skr-blog.com/dev/articles/blog-tech-stack


今回はこの`apps/blog`(ブログアプリ部分)にLost Pixelを用いたVRTを施していきます。

## Lost Pixelとは
Lost Pixelとは、VRT(Visual Regression Test, ビジュアル回帰テスト)を行うためのツールです。

https://www.lost-pixel.com/

重複した説明が発生するため、ここでは簡単な説明に止めて詳細は[スライド](https://speakerdeck.com/aiji42/vrtturunodakuhosu-lost-pixelwoshao-jie-sitai)や[Zennの記事](https://zenn.dev/aiji42/articles/6656072a954a9b)に譲りたいと思います。

## 運用までの流れ
main, feat/lost-pixelがあるとする

### セットアップ

#### 0. ローカルで差分確認する

#### 1. baselineをupdateする

#### 2. もう一度差分確認をする

base-images
current-images 
diff-images 0

#### 3. Workflowを作成する
このCI workflowを作成するのに多くの時間を消費しました。私はCIにとても弱いです。

CIスパスパ作れる人々かっこいい。。。

##### 3.1 差分確認のためのWorkflow(vis-reg-test.yml)

##### 3.2 baseline更新のためのWorkflow(update-vrt.yml)


#### 4. update-vrt.ymlをmainブランチに取り込む


#### 5. `feat/lost-pixel`のPRを作成する

#### 6. vis-reg-test.ymlを回す

##### 6.1 Failのとき 
`/update-vrt`とPRにコメントします。すると、先ほど定義した`update-vrt.yml`のワークフローがトリガーされます。

:::note{.warning}
❗ Warning
<br/>
issue_commentはメインブランちーーー
:::

これにより、baselineのupdateをするためのブランチ`lost-pixel-update/[base-pr-name]`がコメントを入れたPR(ここでは`feat/lost-pixel`)から生える形で作成され、タイトルが「Lost Pixel Update - [base-branch-name]」PRも作成されます。

ここで、作成されたPRのChanges部分を確認することで、Github上で視覚的に見た目の変化を捉えることができます。

👇微々たる変化。この場合、キャプチャタイミングや環境の差異が原因であると思われる。

→[ステップ6.1.1へ]()


👇見た目の大きな変化。この場合、コードベースに何らかの問題があると思われる。

→[ステップ6.1.2へ]()

###### 6.1.1 許容可能な見た目の変化のとき
PRの差分を確認した結果、許容可能な見た目の変化の時は、コメント元のブランチ(`feat/lost-pixel`)のbaselineをアップデートしたいです。
そうすることで、コメント元のブランチ(`feat/lost-pixel`)でもう一度`vis-reg-test.yml`のワークフローを回してテストをpassすることができるからです。

なので、`lost-pixel-update/[base-pr-name]`ブランチの「Lost Pixel Update - [base-branch-name]」PRをマージしましょう！

すると、コメント元のブランチ(`feat/lost-pixel`)でもう一度`vis-reg-test.yml`のワークフローが周り、今度はupdateされたbaselineとの比較が行われるため、テストをpassすることができます。

→[ステップ6.2へ]()

###### 6.1.2 許容不可能な見た目の変化のとき
コメント元のブランチ(`feat/lost-pixel`)に戻って、見た目を揃えるための修正コミットを加え、再度pushします。

→[ステップ6へ]()

##### 6.2 Successのとき
おめでとうございます！これで見た目が確認された変更をマージできます💯

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
