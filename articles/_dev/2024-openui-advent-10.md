---
title: "🎄Open UI Advent Calendar: Day 10 / Customizable Select Element Ep.8"
excerpt: "Customizable Select Element"
date: "2024-12-10"
beginColor: 'from-red-500'
middleColor: 'via-lime-500'
endColor: 'to-green-700'
category: 'dev'
tags: ['openui', 'advent calendar']
status: 'published'
---
## 目次

## はじめに

:::note{.message}
🎄 この記事は[Open UI Advent Calendar](https://adventar.org/calendars/10293)の10日目の記事です。
:::

[Customizable Select Element Ep.8](https://blog.sakupi01.com/dev/articles/2024-openui-advent-8)では、`<selectmenu>`を経て、`<selectlist>`から`<select>`に至るまでの経緯をお話ししました。

端的にまとめると、初期Explainerで使用されていた`<selectmenu>`は、主にUIパターンの観点から混乱を招くことが懸念され、Open UI内での議論を以って`<selectlist>`に変更されました。

その後、`<selectlist>`の実装の方針やProgressive Enhancementの観点から、`<select>`の機能を拡張する形で実装した方が良いのではないかという議論が行われ、2024/9月に`<select>`としてRFCが発表されるに至ります。

https://developer.chrome.com/blog/rfc-customizable-select

## Customizable Select Elementの現時点での挙動

まず、2024/12/4現在、でCSEがどのような見た目、挙動をしているのかを確認してみます。

### 各パーツの定義

![selectの各パーツの定義](/select-anatomy.png)
*selectの各パーツの定義 - 出典: [Request for developer feedback: customizable select  |  Blog  |  Chrome for Developers](https://developer.chrome.com/blog/rfc-customizable-select?hl=en)*

### デモ

CSEは、Chrome Canary 130以上でExperimental Web Platform Featuresを有効化して試すことができるようになりました。

以下のCodepenを上記の環境で開くと、CSEの動作確認をすることができます。

https://codepen.io/sakupi01/pen/YPKyOyP

![Chrome Canary 133でのdemo](/cse-demo.png)
*Chrome Canary 133でのdemo*

---

[Customizable Select Element (Explainer)](https://open-ui.org/components/customizableselect/)をもとに、実際に使用してみてわかったことを色々と書きます。
該当する機能に紐づく意思決定のリンクが探せたものに関しては、メモとして付け足しています。

- Opt-inするには`<select>`,`::picker(select)`に`appearance: base-select;`を指定
  - `<select>`,`::picker(select)`両方に指定する必要がある
    - [Styling form control pickers · Issue #10440 · w3c/csswg-drafts](https://github.com/w3c/csswg-drafts/issues/10440#issuecomment-2332063450)
  - **CSEデフォルトの見た目**になる
    - 選択されたOptionにはチェックマークがつく
      - [selectlist: Should the "checked" option have a checkmark next to it? · Issue #863 · openui/open-ui](https://github.com/openui/open-ui/issues/863)
  - 現状の`<select>`を使用しつつ、段階的に移行できる手段として`appearance: base-select;`を提供している
  - なぜCSSでOpt-inするようにしたのか
    - [Comment1 on Customizable `<select>` element · Issue #9799 · whatwg/html](https://github.com/whatwg/html/issues/9799#issuecomment-1789202391)
    - [Comment2 on Customizable `<select>` element · Issue #9799 · whatwg/html](https://github.com/whatwg/html/issues/9799#issuecomment-1926411811)
- `<select>`にのみ`appearance: base-select;`を指定して、**buttonのみスタイルすることも可能**
  - `::picker(select)`（ドロップダウン部分）のみに適用することはできない
- `<selectedcontent>`には、選択された要素のクローンが作成される
  - [[select] Should the inner HTML & styles of the selected option be copied into selected-value? · Issue #571 · openui/open-ui](https://github.com/openui/open-ui/issues/571)
  ![選択された要素は`<selectedcontent>`内にクローンされる](/cloned-elements.png)
  - [RFC記事](https://developer.chrome.com/blog/rfc-customizable-select?hl=ja#limitations_and_accessibility_notes)時点では、`<selectedoption>`という要素だったが、2024/12/4時点では`<selectedcontent>`で動作を確認している（[Open UIのExpliner](https://open-ui.org/components/customizableselect/#the-selectedcontent-element)も`<selectedcontent>`に[変更](https://github.com/openui/open-ui/pull/1124)されている）
  - 最初は`<selectedvalue>`として考案されていた時期もあったが、`<selectedoption>`に変更され、現在はに`<selectedcontent>`になっている
    - [Naming of the selected value element · Issue #808 · openui/open-ui](https://github.com/openui/open-ui/issues/808)
    - [select: Naming of `<selectedoption>` · Issue #1112 · openui/open-ui](https://github.com/openui/open-ui/issues/1112)
- `<select>`の中で`<button>`を使うと、その外の要素が`::picker(select)`に入る
  - `<button>`が複数あった場合、一番最初の`<button>`以外は`::picker(select)`に入る
- `<select>`のドロップダウン部分は、ネストされた構造にすることができる
- `<option>`にリッチなコンテンツを入れることができる
- [RFC記事](https://developer.chrome.com/blog/rfc-customizable-select?hl=ja#limitations_and_accessibility_notes)によると、`<select>`の中には`<div>`、`<span>`、`<option>`、`<optgroup>`、`<img>`、`<svg>`、`<hr>`などインタラクティブじゃない要素が許可されている
  - `<button>`や`<input>`なども別に許可されてないわけじゃなさそう。レンダリング自体はされる。（2024/12/4時点では、`<button>`や`<input>`をドロップダウン部分に入れることはできる）
    - ただ、Consoleにめちゃくちゃエラーが出る
    ![Content Modelに沿わない要素を入れた時にエラーが出る](/prohibited-content.png)
    *Content Modelに沿わない要素を入れた時にエラーが出る*
    - [[selectmenu] Restricting interactive content in `<selectmenu>` listbox · Issue #540 · openui/open-ui](https://github.com/openui/open-ui/issues/540#issuecomment-1212330487)
- `option:checked`で選択された要素をスタイルすることができる
  - 擬似クラスは`:selected`ではなく、`:checked`。
  - [selectlist: pseudo-class to style the selected option · Issue #827 · openui/open-ui](https://github.com/openui/open-ui/issues/827)
- ドロップダウンはTop Layerにくる
  - Popover APIを使用しているため
  - `::picker(select)`のドロップダウンじゃないとき（Top Layerを使用していないとき）は、`<select>`が存在するHTMLドキュメント内に限らず、ディスプレイの任意の箇所からクリックが外されたらドロップダウンが閉じる
  - `::picker(select)`のドロップダウンのときは、`<select>`が存在するHTMLドキュメント内でフォーカスが外されたときに限ってドロップダウンが閉じる
  ![ドロップダウンはTop Layerにくる](/top-layer-dropdown.png)
*ドロップダウンはTop Layerにくる*
- 現段階では、`<select>`の`multiple`、`size`属性はサポートされていない
  - [stylable select: What should we do about the `multiple` and `size` attributes? · Issue #977 · openui/open-ui](https://github.com/openui/open-ui/issues/977#issuecomment-1910874971)
  - [`<select>` with size > 1 is not specified · Issue #153 · openui/open-ui](https://github.com/openui/open-ui/issues/153)

---

このように、一部機能は実装されていますが、まだまだ策定段階で、今後も変更される可能性が大いにあります。

## 控えている実装

CSEは、非常に多くの技術の集結により実現されており、これから実装される分も含めて以下のIssueにまとまっています。

[Customizable `<select>` element · Issue #9799 · whatwg/html](https://github.com/whatwg/html/issues/9799)

---

このように、従来までの`<select>`と全く違った体験を実現するCSEは、様々な技術を駆使して実装されています。
次回からは、そのようなCSEの実装に関する詳細、その実装に至った背景について、主に以下の点に着眼していきます。

- `appearance: base-select;`を指定することで、CSEのデフォルトの見た目になるOpt-in方法なのか
- `appearance: base-select;`の見た目は、どのようにして決まったのか
- 選択された要素をCloneする`<selectedcontent>`の仕組みと背景
- `<select>`や`<option>`にさまざまな要素をさまざまな構造で入れることができる仕組みと詳細
- `multiple`、`size`属性のつく`<select>`は、どうしてサポートが難しいのか

それでは、また明日⛄

See you tomorrow!

### Appendix
