---
theme: ./
title: Theme Demo
subtitle: slidevのテーマ exam-prepの紹介
author: watabegg
date: '2025/08/03'
link: 'https://example.com'
color: blue
---

# 基本機能とスタイル

このスライドではテーマの基本スタイルをテストします。

- **太字** / *斜体* / `code`
- 入れ子リスト
  - 第二階層
  - もう一つ
- テーマカラーは frontmatter の `color` で `red | yellow | green | blue | purple` から選択

```ts
function hello(name: string) {
  console.log(`Hello, ${name}`)
}
```

> ヒント: 最初の h1 は固定ヘッダになります。

---
layout: two-cols
title: 2カラムレイアウト
---

::left::
### 左側
- ポイント1
- ポイント2
- ポイント3

固定ヘッダとフッターの余白を意識した構造。

::right::
### 右側
```js
const nums = [1,2,3]
const doubled = nums.map(n=>n*2)
console.log(doubled)
```
図表 / コード / 説明などを分割表示。

---

# QuestionList 基本

<QuestionList
  :items="[
    '最初の項目 **Markdown OK**',
    {
      text: '2番目 (子を含む)',
      items: [
        { label: 'A', text: 'A の内容'},
        { label: 'B', text: 'B の内容'},
        { text: 'さらにネスト', items: ['深い1', '深い2'] }
      ]
    },
    { label: '★', text: 'カスタムラベル' }
  ]"
  :styles="['decimal-circle','katakana-paren','loweralpha-dot']"
/>

---

# QuestionList start 指定

<QuestionList
  :items="[
    { text: '大問1: サブ', items: ['1つ目','2つ目'] },
    { text: '大問2: サブ', items: ['A','B','C'] }
  ]"
  :styles="['decimal-q','hiragana-paren']"
  :start="[1,1]"
/>

---

# KaTeX と QuestionList

<KaTexReveal formula="\\int_0^{2\\pi} \\sin x\\,dx = 0" block class="text-2xl" />

<KaTexReveal
  formula="E = mc^2"
  :block="false"
  class="text-primary font-bold"
  v-click="1"
/>

---
layout: center
---

# KaTeX と Markdown の混在

<QuestionList
  :items="[
    {
      label: '①',
      text: 'Markdownと **KaTeX** を混在',
      items: [
        { formula: 'a^2 + b^2 = c^2', block: true, class: 'text-lg text-center', tex: true },
        { text: '$$\\frac{d}{dx} \\sin x = \\cos x$$' }
      ]
    },
    {
      label: '②',
      formula: '\\sum_{k=1}^n k = \\frac{n(n+1)}{2}',
      block: false,
      class: 'text-xl'
    }
  ]"
  :styles="['decimal-circle','loweralpha-paren']"
  :start="[1]"
/>

---
layout: image
image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=2370&q=80'
---

<TextBox :x="80" :y="140" :width="360" v-click="1">**1番目** に表示される注釈。</TextBox>
<TextBox :x="200" :y="380" :width="340" textBg="green" v-click="2">背景色付き 2番目。</TextBox>
<TextBox :x="500" :y="120" :width="300" color="blue">常時表示 (青文字)。</TextBox>
<TextBox :x="40" :y="20" :width="420" textBg="yellow" v-click="3">最後に表示される黄色背景。</TextBox>

---

# ユーティリティ

普通のテキストと <span class="text-highlight">ハイライト</span>。

<div class="card mt-8" v-click="1">
  <h3>カードスタイル</h3>
  <p>重要事項をまとめるのに便利です。</p>
</div>

---

# フッターとショートカット

このテーマでは Enter / Backspace キーで進行を制御できます。

- Enter: 次のスライド / v-click
- Backspace: 前へ戻る
- フッター: (cover / image 以外) 日付 + ページ番号

---

# まとめ

- レイアウト: cover / two-cols / image
- コンポーネント: QuestionList / TextBox
- 自動フッター & 固定ヘッダ
- ラベルスタイル多彩 & Markdown 埋め込み

ご利用ありがとうございます 🎓

---

# 終了

<div class="text-center mt-16">
  <div class="text-4xl mb-4">🎓</div>
  <div class="text-xl opacity-80">slidev-theme-exam-prep</div>
  <div class="text-lg opacity-60 mt-4">教育現場向け Slidev テーマ</div>
</div>

---
layout: end
---
