---
title: "🎄Open UI Advent Calendar: Day 3 / Customizable Select Element Ep.1"
excerpt: "Form Controlの歴史"
date: "2024-12-3"
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
🎄 この記事は[Open UI Advent Calendar](https://adventar.org/calendars/10293)の3日目の記事です。
:::

今日から[Customizable Select Element](https://open-ui.org/components/customizableselect/)についてみていきます🧤

[Customizable Select Element](https://open-ui.org/components/customizableselect/)の仕様がどのような背景から検討され、何が可能となり、これからどのように利用していくべきなのかをシリーズ形式で書いていきます。途中で寄り道したり、深入りしたりするかもしれませんが、その過程も楽しみつつ読んでいただければ幸いです。

※ 本当は[Open UI Working Mode](https://open-ui.org/working-mode/)のことを書こうと思っていたのですが、あまりにも機能していないのでやめました。

## Prologue: Customizable Select Element

`<select>`要素は、スタイル設定や機能の拡張に関しての制限が大きく、これまで多くの開発者を悩ませてきました。

現在、HTMLの`<select>`要素や`<selectedoption>`要素、`::picker(select)`擬似要素などに関連する様々な仕様が策定され、プロトタイプが実装され始めています。

https://developer.chrome.com/blog/rfc-customizable-select?hl=ja

`<select>`要素とそれに付随する様々な新機能を活用することで、今まで実現が難しかった`<select>`というForm Controlに対して、柔軟にスタイリングや機能の追加をすることが可能となります。

どうしてこれまで`<select>`要素のカスタマイズが難しかったのでしょうか？どのような議論の末にCustomizable Select Elementが追加されるのでしょうか？それによって私たちがどのような恩恵を受けることができるのでしょうか？

## HTML Form Controlの歴史

Form Controlとは、`<input>`、`<button>`、`<select>`、`<option>`、`<textarea>`など、Web上のInteractivityの基盤を提供する要素のことを指します。

1990年代初頭にTim Berners-LeeがWWW（WorldWideWeb）という最初のWebブラウザをリリースした後、複数のブラウザが登場しました。
この当時のHTMLは、非常にシンプルなマークアップ言語であり、リンクや画像、テキストのみを表示することができるものでした。

![WorldWideWeb](/www.png)
*出典：[Tim Berners-Lee: WorldWideWeb, the first Web client](https://www.w3.org/History/1994/WWW/Journals/CACM/screensnap2_24c.gif)*

その後、各ブラウザベンダーがブラウザに独自のHTMLタグを実装し始めましたが、当時はHTMLにまだ標準というものがなかったため、ブラウザ間でのHTMLの亀裂が拡大していきました。

### HTML 2.0

1995年にHTML Working Groupが設立され、HTML標準の基礎となる[HTML 2.0](https://datatracker.ietf.org/doc/html/rfc1866)が策定されました。

HTML 2.0には、Form Controlに関する使用も盛り込まれており、具体的には以下のような要素が追加されました。

- [RFC 1866 - Hypertext Markup Language - 2.0  - Forms](https://datatracker.ietf.org/doc/html/rfc1866#section-8)

RFC 1866に目を通すと、HTML2.0のForm Controlの仕様では、以下のことが定義されているとわかります。

- どのようなデータが入力できるのか
- データをどう使ってどのようなアクションを実行するのか

逆に、それ以外のことについては言及されておらず、`<input>`の仕様だけみても、HTML2.0と現在のHTML Living Standardで定義されている内容の差は歴然です。

- [RFC 1866 - Hypertext Markup Language - 2.0 - Input Field: INPUT](https://datatracker.ietf.org/doc/html/rfc1866#section-8.1.2)
- [HTML Standard - The input element](https://html.spec.whatwg.org/multipage/input.html)

## CSSの登場とForm Controlにおけるスタイリングの制限

### CSS

HTML2.0が仕様策定された1995年当時、今日のスタイルシート言語は確立していませんでした。1996年のCSSのリリース後も、'90年代に登場したすべてのブラウザがスタイルシート言語をサポートしていたわけではありませんでした。

- [Cascading Style Sheets, level 1](https://www.w3.org/TR/REC-CSS1-961217)

### Form Controlにおけるスタイリングの制限

ブラウザがスタイル言語をサポートしない中、Form ControlのスタイルとレンダリングはOSに依存していました。

Webが普及して、ブラウザがCSSをサポートしてからも、当時の開発者がCSSを駆使してForm Controlの一貫した見た目を実現できたわけではありません。

Roger Johanssonが、CSS を使用してForm Controlのスタイルをブラウザーやプラットフォーム間でまったく同じにすることは不可能であることを示す実験をしており、同じCSSでもブラウザやOS間で異なる見た目になることがあることがわかります。
<!-- image -->

だからと言って、ブラウザやOS間で見た目を統一できるようにしようという動きがW3C側にあったかというと、それに関しては消極的でした。見慣れたForm Controlの外観を変えることに関しての懸念があり、Form Controlのスタイリングに関しては、[CSS2.1の仕様](https://www.w3.org/TR/CSS21/conform.html#q3.0)においても以下のように述べられています。

> CSS 2.1 does not define which properties apply to form controls and frames, or how CSS can be used to style them. User agents may apply CSS properties to these elements. Authors are recommended to treat such support as experimental. A future level of CSS may specify this further. - [UA Conformance](https://www.w3.org/TR/CSS21/conform.html#q3.0), CSS 2.1 Specification, W3C

つまり、この時点までは、Form Controlのスタイルはスタイルシートから制御することができず、ブラウザやOSに依存していました。

***

それでは、また明日⛄

See you tomorrow!

### Appendix

- [Tim Berners-Lee: WorldWideWeb, the first Web client](https://www.w3.org/People/Berners-Lee/WorldWideWeb.html)
- https://web.sfc.keio.ac.jp/~hagino/dis23/01.pdf
- https://www.w3.org/MarkUp/html-spec/html-spec_toc.html
- https://developer.mozilla.org/ja/docs/Learn/Forms/Styling_web_forms
- [Styling form controls with CSS, revisited | 456 Berea Street](https://www.456bereastreet.com/archive/200701/styling_form_controls_with_css_revisited/)
- [20 Years of CSS](https://www.w3.org/Style/CSS20/)
- [CSS Properties Index · Jens Oliver Meiert](https://meiert.com/en/indices/css-properties/)
