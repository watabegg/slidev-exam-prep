---
theme: ./
title: 試験対策テーマ デモ
subtitle: slidev-theme-exam-prep
author: author
date: '2025/08/03'
---

---

# 基本機能のテスト

このスライドでは基本的な機能をテストします。

- **太字テキスト** と *斜体テキスト*
- リスト項目1
- リスト項目2
  - ネストされたリスト
  - もう一つのアイテム

## コードブロック

```typescript
function hello(name: string) {
  console.log(`Hello, ${name}!`);
}
```

---
layout: two-cols
title: 2カラムレイアウト
---

::left::

## 左側のコンテンツ

- ポイント1
- ポイント2
- ポイント3

重要な情報をここに配置できます。

::right::

## 右側のコンテンツ

```javascript
// サンプルコード
const data = [1, 2, 3, 4, 5];
const result = data.map(x => x * 2);
console.log(result);
```

図表や追加説明をここに。

---

# 新しいQuestionListのテスト

<QuestionList
  :items="[
    'これは最初の質問です。Markdownで**太字**も使えます。',
    {
      text: 'これは2番目の質問で、子要素を持っています。',
      items: [
        {label: 'A', text: 'aaaa'},
        {label: 'B', text: 'サブ項目B'},
        {
          text: 'さらにネストした項目',
          items: [
            '詳細その1',
            '詳細その2',
          ]
        }
      ]
    },
    'これは3番目の質問です。'
  ]"
  :styles="['decimal-circle', 'katakana-paren', 'loweralpha-dot']"
/>

---

# 機能修正のテスト

<QuestionList
  :items="[
    {
      label: '問1',
      items: [
        '最初のサブ項目です。',
        { text: 'ラベルをカスタマイズした項目', label: '★' },
        '3つ目のサブ項目。'
      ]
    },
    {
      text: 'これは2番目の質問で、子要素を持っています。',
      items: [
        'サブ項目A',
        'サブ項目B',
      ]
    },
    {
      label: '問3',
      text: 'ラベルとテキストが両方ある場合'
    }
  ]"
  :styles="['decimal-q', 'katakana-paren']"
/>

---

# 解答レイアウト（カタカナ）

<QuestionList
  :items="[
    'アの解答',
    'イの解答',
    'ウの解答',
    'エの解答'
  ]"
  :styles="['katakana']"
/>
---

# 解答レイアウト（カスタム）

<QuestionList
  :items="[
    'アの解答',
    'イの解答',
    'ウの解答',
    'エの解答'
  ]"
  :styles="['custom']"
/>

---

# RevealCardのテスト

## v-clickとの組み合わせ

<span v-click="1">1回目のEnterで表示</span>から始まります。

<span v-click="2">2回目のEnterで表示</span>

<span v-click="3" color="green-500">3回目のEnterで表示（緑）</span>

---
layout: image
image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80'
---

<TextBox :x="100" :y="200" :width="400" v-click="1">
これが **1番目** にEnterで表示されるテキストです。
背景画像の上に配置されています。
</TextBox>

<TextBox :x="200" :y="400" :width="350" textBg="green-500" v-click="2">
これが **2番目**。背景色付きです。
</TextBox>

<TextBox :x="500" :y="150" :width="300" color="blue-500">
これは最初から表示されています。
青い文字色です。
</TextBox>

<TextBox :x="50" :y="20" :width="400" textBg="yellow-500" v-click="3">
最後に表示される黄色い背景のテキストボックスです。
</TextBox>

---

# ハイライト機能

普通のテキストと<span class="text-highlight">ハイライトされたテキスト</span>があります。

## カード風スタイル

<div class="card mt-8">
  <h3>重要なお知らせ</h3>
  <p>このカードスタイルは重要な情報を目立たせるのに使えます。</p>
  <p><span v-click="1">隠された情報もカード内で使用可能</span></p>
</div>

---

# テーマの特徴まとめ

## ✅ 実装済み機能

- 🎨 教育に特化したデザイン
- 📱 レスポンシブレイアウト
- 🔤 M PLUS 2フォント
- 📄 自動フッター（日付・ページ番号）
- ⌨️ Enter/Backspaceキー操作
- 🎯 複数のレイアウト（cover, two-cols, answer, image）
- 📍 TextBoxコンポーネント

## 🚀 今後の展開

このテーマを使って効果的な授業資料を作成してください！

---

# ありがとうございました

<div class="text-center mt-16">
  <div class="text-4xl mb-4">🎓</div>
  <div class="text-xl opacity-80">
    slidev-theme-exam-prep
  </div>
  <div class="text-lg opacity-60 mt-4">
    教育現場での使いやすさを追求したSlidevテーマ
  </div>
</div>
