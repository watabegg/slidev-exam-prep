# slidev-theme-exam-prep (日本語ドキュメント)

[![NPM version](https://img.shields.io/npm/v/slidev-theme-exam-prep?color=3AB9D4&label=)](https://www.npmjs.com/package/slidev-theme-exam-prep)

教育現場（集団授業・試験対策）向けに視認性と操作性を重視した Slidev テーマです。普通に自分用に開発しました。

## 特徴
- 教育特化のミニマルデザイン
- 日本語表示最適化 (M PLUS 2) / 等幅 Fira Code
- 自動フッター（`cover` / `image` 以外で日付 + ページ番号）
- ショートカット: Enter (次) / Backspace (前)
- レイアウト: `cover`, `two-cols`, `image`
- コンポーネント: `QuestionList`, `TextBox`
- 多段ラベル: 丸番号 / カタカナ / ひらがな / 漢数字(1–19) / 英字 / カスタム
- ユーティリティ: `.text-highlight`, `.card`
- Shiki テーマ: vitesse-light / vitesse-dark

## インストール
```yaml
---
theme: slidev-theme-exam-prep
---
```
ローカル開発（クローンしたリポジトリで）:
```yaml
---
theme: ./
---
```

## フロントマター例
```yaml
title: 授業タイトル
subtitle: サブタイトル
author: 講師名
date: '2025/08/03'
```

![フロントマター例](https://raw.githubusercontent.com/watabegg/slidev-exam-prep/refs/heads/main/example/1.png)

## レイアウト
| 名称 | 用途 | 特徴 |
|------|------|------|
| cover | 表紙 | グラデーション波 + title/subtitle/author |
| two-cols | 2カラム | `::left::` / `::right::` スロット |
| image | 背景画像 | `image:` 指定 + `TextBox` で自由配置 |

### two-cols 例
```markdown
---
layout: two-cols
---
::left::
左
::right::
右
```

![two-cols 例](https://raw.githubusercontent.com/watabegg/slidev-exam-prep/refs/heads/main/example/3.png)

### image 例
```markdown
---
layout: image
image: /path/to/bg.jpg
---
<TextBox :x="120" :y="160" :width="360">注釈</TextBox>
```

## コンポーネント
### QuestionList
入れ子質問/解答・Markdown 埋め込み・階層別スタイル。
```vue
<QuestionList
  :items="['最初 **OK**', { text: '2番目', items: ['子A','子B'] }]"
  :styles="['decimal-circle','katakana-paren','loweralpha-dot']"
  :start="[1,1,'c']"
/>
```
カウンター種別: `decimal | hiragana | katakana | kanji | upperalpha | loweralpha | none`  
デコレータ: `circle | square | paren | dot | q | big-q | none`  
アイテム内 `label` があればそれを優先表示。

![QuestionList 例](https://raw.githubusercontent.com/watabegg/slidev-exam-prep/refs/heads/main/example/4.png)

### TextBox
背景画像上などに絶対配置。
```vue
<TextBox :x="100" :y="220" :width="400" textBg="green" v-click="1">メモ</TextBox>
```
Props: `x`, `y`, `width`, `height`, `textBg`, `color`, `vClick`

## フッター & ショートカット
- フッター: (cover/image 以外) `date` + 現在ページ/総ページ
- Enter: 次のフラグメント/スライド
- Backspace: 前へ

## ユーティリティクラス
- `.text-highlight` 行マーカ風ハイライト
- `.card` 角丸ボックス + 余白 + 枠線

![ユーティリティ例](https://raw.githubusercontent.com/watabegg/slidev-exam-prep/refs/heads/main/example/7.png)

## 開発
```bash
pnpm install
pnpm dev
pnpm build
pnpm export
pnpm screenshot
```

## FAQ
**Q. フォント設定は必要？** → いいえ、テーマ内で Google Fonts を読み込みます。

**Q. フッターを消したい** → 自作テーマで `global-bottom.vue` を上書きしてください。

**Q. 番号開始位置を変えたい** → `:start="[1,'c']"` のように配列で指定。

良い授業を！ 🎓
