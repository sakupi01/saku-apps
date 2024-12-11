---
title: "🎄Open UI Advent Calendar: Day 12 / Customizable Select Element Ep.10"
excerpt: "Customizable Select Elementの関連仕様"
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
🎄 この記事は[Open UI Advent Calendar](https://adventar.org/calendars/10293)の12日目の記事です。
:::

Customizable Select Element Ep.9から、 appearance: base-select;で提供される、CSEのデフォルトの見た目が決定された背景の議論をお話ししています。

Ep.9では、<option>::checkmarkが現状の見た目となった背景について深掘りました。 今回は、::picker-icon部分について取り上げます。

![2024/12/9時点でのselectの各パーツの定義](/select-anatomy.png)
*2024/12/9時点でのselectの各パーツの定義*

## Customizable Select Elementの関連仕様

### 


***

Issueによると主に以下の項目に着目できそうで、今回はその一部であるチェックマークに関して取り上げました。

- [ ] `appearance: base-select;`の見た目は、どのようにして決まったのか
  - [x] 選択された`<option>`のデフォルトチェックマーク
  - [x] ポップオーバーを開閉するボタン要素右の矢印アイコン
  - [x] ボタン要素や選択肢ポップオーバーの色
  - [ ] その他のスタイル

上記Issueに記されているデフォルトスタイルになった背景について、次回からも引き続き見ていこうと思います。

それでは、また明日⛄

See you tomorrow!

### Appendix

- [5983471: Rename `<selectedoption>` to `<selectedcontent>`](https://chromium-review.googlesource.com/c/chromium/src/+/5983471)
- [6024158: Update customizable select UA styles](https://chromium-review.googlesource.com/c/chromium/src/+/6024158)
- [6065538: Rename ::select-arrow to ::picker-icon](https://chromium-review.googlesource.com/c/chromium/src/+/6065538)
