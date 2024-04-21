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

今回実際にLost PixelでVRTを運用してみて個人的に感じたこととしては、

⭐️メリット
- OSSモードだと、Githubをフル活用することで、無料でVRTできる基盤が作れる
- StorybookやLadle, Histoire, ページ単位のスクリーンショット、CypressやPlaywrightを用いたスクリーンショットなど様々な撮影方法が可能
- PRレビューの際に自然に見た目の差分チェックが行える仕組みが作れる
- マスキング機能があり便利


⭐️デメリット
- CIを組むのが苦手だと、思い通りの運用が難しく、辛い

## プロジェクトに適用
まず、今回のシナリオとして、デフォルトブランチ: `main`, Lost Pixelを取り入れるためのブランチ: `feat/lost-pixel`があるとしましょう。

また、今回はモノリポの`apps/blog`で実装されているブログアプリマイクロサービスに対して、**ページ単位のスクリーンショット**を撮ることでUI差分比較していきます。

### セットアップ

ページ単位のスクリーンショットのため、以下のドキュメントのPage shots部分を参照します。
https://docs.lost-pixel.com/user-docs/setup/project-configuration/modes#page-shots

ベースはこれですが、今回はモノリポかつCIで使用することを加味して、以下のように変更を加えています。

<details>

```ts showLineNumbers {7} title="lostpixel.config.ts"
import { CustomProjectConfig } from "lost-pixel";

export const config: CustomProjectConfig = {
  pageShots: {
    pages: [
      { path: "/", name: "home" },
      { path: "/about", name: "about" },
      { path: "/dev", name: "dev" },
      { path: "/dev/articles/blog-tech-stack", name: "blog-tech-stack" },
      { path: "/dev/tag/react", name: "tag-react" },
      {
        path: "/life", // 🟢スクリーンショットを撮るページのpath
        name: "life", // 🟢スクリーンショットの名前
        threshold: 0.004, // 🟢閾値。どのくらいのズレまで許容するか
        mask: [{ selector: ".eye-catch" }], // 🟢マスクをかけるセレクタ
      },
      {
        path: "/life/articles/intern-completed-aritcle",
        name: "intern-completed-article",
        mask: [{ selector: ".thumbnail" }],
      },
      {
        path: "/life/tag/poem",
        name: "poem",
        threshold: 0.006,
        mask: [{ selector: ".eye-catch" }],
      },
    ],
    // 🟢ローカルで実行するときのIPはlocalhostで、Github Actionで実行するときのIPは172.17.0.1に設定する
    baseUrl: process.env.LOCAL
      ? "http://localhost:3000"
      : "http://172.17.0.1:3000",
  },
  waitBeforeScreenshot: 5000,// 🟢
  timeouts: {
    loadState: 50000, // 🟢
    networkRequests: 50000, // 🟢
  },
  
  // OSS mode
  // 🟢モノリポの場合、Github Actionで実行するときのパスはプロジェクトのrootからのパスを設定する
  imagePathBaseline: process.env.LOCAL // 🟢baselineイメージの格納先。ここに格納されているスクリーンショットが比較基準
    ? "./tests/vrt/baseline-images"
    : "./apps/blog/tests/vrt/baseline-images",
  imagePathCurrent: process.env.LOCAL // 🟢currentイメージの格納先。現状のスクリーンのキャプチャで、baselineと比較される
    ? "./tests/vrt/current-images"
    : "./apps/blog/tests/vrt/current-images",
  imagePathDifference: process.env.LOCAL // 🟢differenceイメージの格納先。currentImageとbaselineImageの差分画像
    ? "./tests/vrt/difference-images"
    : "./apps/blog/tests/vrt/difference-images",
  generateOnly: true,

  // 🟢baselineとcurrentに差分がある時は実行結果をfailとしてマーク
  failOnDifference: true,
};
```
</details>

#### 0. ローカルで差分確認する
それでは、早速手元の環境で差分を確認してみましょう！


#### 1. baselineをupdateする

#### 2. もう一度差分確認をする

base-images
current-images 
diff-images 0

#### 3. Workflowを作成する
このCI workflowを作成するのに多くの時間を消費しました。私はCIにとても弱いです。

CIスパスパ作れる人々かっこいい。。。

##### 3.1 差分確認のためのWorkflow(vis-reg-test.yml)
<details>

```yaml showLineNumbers {7} title="vis-reg-test.yml"
name: Visual Regression Test

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    env:
      TURBO_TOKEN: ${{ secrets.TURBO_TOKEN }}
      TURBO_TEAM: ${{ vars.TURBO_TEAM }}
    steps:
      - name: Checkout Commit
        uses: actions/checkout@v4
        with:
          fetch-depth: 2

      - name: Setup Bun
        uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest
      - name: Install dependencies
        run: bun install
      - name: Cache bun dependencies
        uses: actions/cache@v3
        id: bun-cache
        with:
          path: node_modules
          key: ${{ runner.os }}-bun-${{ hashFiles('**/bun.lockb') }}
          restore-keys: ${{ runner.os }}-bun
  lost-pixel:
    needs: build
    runs-on: ubuntu-latest
    strategy:
        matrix:
          config:
            - {
                package: "apps/blog",
                name: "Lost Pixel for blog page",
                command: "bun run start",
              }
    defaults:
        run:
            working-directory: ${{ matrix.config.package }}
    env:
      TURBO_TOKEN: ${{ secrets.TURBO_TOKEN }}
      TURBO_TEAM: ${{ vars.TURBO_TEAM }}
    steps:
      - name: Checkout Commit
        uses: actions/checkout@v4
        with:
          fetch-depth: 2
          
      - name: Create .env file
        run: |
            touch .env
            echo "ZENN_URL=${{ secrets.ZENN_URL }}" >> .env
            echo "ZENN_BASE_URL=${{ secrets.ZENN_BASE_URL }}" >> .env

      - name: Setup Bun
        uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest

      - name: Restore bun dependencies
        id: bun-cache
        uses: actions/cache@v3
        with:
          path: node_modules
          key: ${{ runner.os }}-bun-${{ hashFiles('**/bun.lockb') }}
          restore-keys: ${{ runner.os }}-bun

      - name: Build UI
        working-directory: ./packages/ui
        run: bun run build 

      - name: Build App
        run: cd ../../ && bun run build 

      - name: Start App
        run: cd . && ${{ matrix.config.command }} &
    
      - name: Lost Pixel
        id: lostpixel
        uses: lost-pixel/lost-pixel@v3.16.0
        env:
            LOST_PIXEL_DISABLE_TELEMETRY: 1
            LOST_PIXEL_CONFIG_DIR: ${{ matrix.config.package }}
```
</details>

##### 3.2 baseline更新のためのWorkflow(update-vrt.yml)
<details>

```yaml showLineNumbers {7} title="update-vrt.yml"
# https://zenn.dev/aiji42/articles/6656072a954a9b
name: Visual Regression Testing Update By PR Comment

on:
  issue_comment:
    types: [created, edited]

jobs:

  lost-pixel:
    if: contains(github.event.comment.html_url, '/pull/') && startsWith(github.event.comment.body, '/update-vrt')
    name: 📸 Lost Pixel Baseline Update By PR Comment
    runs-on: ubuntu-latest
    env:
      TURBO_TOKEN: ${{ secrets.TURBO_TOKEN }}
      TURBO_TEAM: ${{ vars.TURBO_TEAM }}
    permissions:
      contents: write
      pull-requests: write

    strategy:
      matrix:
        config:
          - { package: "apps/blog", name: "Lost Pixel for blog page", command: "bun run start" }

    defaults:
      run:
        working-directory: ${{ matrix.config.package }}

    steps:
      - name: Get branch name
        uses: xt0rted/pull-request-comment-branch@v2
        id: comment-branch
        with:
          repo_token: ${{ secrets.GITHUB_TOKEN }}

      - name: Checkout Commit
        uses: actions/checkout@v3
        with:
          ref: ${{ steps.comment-branch.outputs.head_ref }}
          fetch-depth: 0

          
      - name: Create .env file
        run: |
              touch .env
              echo "ZENN_URL=${{ secrets.ZENN_URL }}" >> .env
              echo "ZENN_BASE_URL=${{ secrets.ZENN_BASE_URL }}" >> .env

      - name: Setup Git User
        run: |
          git config --global user.name 'GitHub Actions'
          git config --global user.email 'github-actions@github.com'

      - name: Setup Bun
        uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest

      - name: Install dependencies
        run: cd ../../ && bun install

      - name: Build UI
        working-directory: ./packages/ui
        run: bun run build

      - name: Build App
        run: cd ../../ && bun run build

      - name: Start App
        run: cd . && ${{ matrix.config.command }} &

      - name: Lost Pixel Update
        id: lostpixel
        uses: lost-pixel/lost-pixel@v3.16.0
        env:
          LOST_PIXEL_MODE: update
          LOST_PIXEL_DISABLE_TELEMETRY: 1
          LOST_PIXEL_CONFIG_DIR: ${{ matrix.config.package }}

      - name: Lost Pixel
        if: ${{ failure() && steps.lostpixel.conclusion == 'failure' }}
        uses: lost-pixel/lost-pixel@v3.16.0
        env:
          LOST_PIXEL_DISABLE_TELEMETRY: 1
          LOST_PIXEL_CONFIG_DIR: ${{ matrix.config.package }}

      - name: Give Permission to untracked files
        if: ${{ failure() && steps.lostpixel.conclusion == 'failure' }}
        run: sudo chown -R $USER:$USER .
      
      - name: Check existing Lost Pixel PR
        id: check-pr
        run: |
          existing_pr=$(gh pr list --base ${{ steps.comment-branch.outputs.head_ref }} --label update-lost-pixel --json number,head.ref --jq '.[] | select(.head.ref | startswith("lost-pixel-update/")) | .number')
          echo "::set-output name=pr_number::$existing_pr"

      - name: Create new branch
        if: ${{ failure() && steps.lostpixel.conclusion == 'failure' && steps.check-pr.outputs.pr_number == '' }}
        run: |
          git checkout -b lost-pixel-update/${{ steps.comment-branch.outputs.head_ref }}

      - name: Checkout existing PR branch
        if: ${{ failure() && steps.lostpixel.conclusion == 'failure' && steps.check-pr.outputs.pr_number != '' }}
        run: |
          git checkout lost-pixel-update/${{ steps.comment-branch.outputs.head_ref }}

      - name: Add untracked files
        if: ${{ failure() && steps.lostpixel.conclusion == 'failure' }}
        run: |
          git add .

      - name: Create commit
        if: ${{ failure() && steps.lostpixel.conclusion == 'failure' }}
        run: |
          git commit -m "Update VRT baseline images" || echo "No changes to commit"

      - name: Push changes
        if: ${{ failure() && steps.lostpixel.conclusion == 'failure' }}
        run: |
          git push origin HEAD:lost-pixel-update/${{ steps.comment-branch.outputs.head_ref }} --force

      - name: Create Pull Request
        if: ${{ failure() && steps.lostpixel.conclusion == 'failure' && steps.check-pr.outputs.pr_number == '' }}
        run: |
          gh pr create --base ${{ steps.comment-branch.outputs.head_ref }} \
                       --head lost-pixel-update/${{ steps.comment-branch.outputs.head_ref }} \
                       --label update-lost-pixel \
                       --title 'Lost Pixel Update - ${{ steps.comment-branch.outputs.head_ref }}' \
                       --body 'Automated baseline update created by Lost Pixel'
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
</details>

#### 4. update-vrt.ymlをmainブランチに取り込む


#### 5. `feat/lost-pixel`のPRを作成する

### 運用する

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

👇微々たる変化。この場合、キャプチャタイミングや実行環境の差異が原因であると思われる。

→[ステップ6.1.1へ]()


👇見た目の大きな変化。この場合、コードベースに何らかの問題があると思われる。

→[ステップ6.1.2へ]()

<br />

###### 6.1.1 許容可能な見た目の変化のとき
PRの差分を確認した結果、許容可能な見た目の変化の時は、コメント元のブランチ(`feat/lost-pixel`)のbaselineをアップデートしたいです。
そうすることで、コメント元のブランチ(`feat/lost-pixel`)でもう一度`vis-reg-test.yml`のワークフローを回してテストをpassすることができるからです。

なので、`lost-pixel-update/[base-pr-name]`ブランチの「Lost Pixel Update - [base-branch-name]」PRをマージしましょう！

すると、コメント元のブランチ(`feat/lost-pixel`)でもう一度`vis-reg-test.yml`のワークフローが周り、今度はupdateされたbaselineとの比較が行われるため、テストをpassすることができます。

→[ステップ6.2へ]()

<br />

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
