# slidev-theme-watabegg

[![NPM version](https://img.shields.io/npm/v/slidev-theme-watabegg?color=3AB9D4&label=)](https://www.npmjs.com/package/slidev-theme-watabegg)

English README (Japanese version: see `README.ja.md`).

## Overview
Education-focused Slidev theme for exam prep & classroom lessons, optimized for Japanese typography, high readability, structured question hierarchies, and keyboard-centric navigation. Originally built for personal teaching use.

## Features
- Minimal design specialized for teaching
- Japanese typography (M PLUS 2) + monospace Fira Code
- Automatic footer (date + current/total page) on all layouts except `cover` / `image` / `image-scroll`
- Shortcuts: Enter (next) / Backspace (previous)
- Layouts: `cover`, `two-cols`, `image`, `image-scroll`, `end`
- Frontmatter `color` switch: `red | yellow | green | blue | purple`
- Components: `QuestionList`, `TextBox`, `KaTexReveal`
- Multi-level labels: circled numbers / Katakana / Hiragana / kanji numerals (1–19) / alphabet / custom
- Utility classes: `.text-highlight`, `.card`
- Shiki themes: `vitesse-light` / `vitesse-dark`

## Install
Add to your slide frontmatter:
```yaml
---
theme: slidev-theme-watabegg
---
```
Local development (cloned repository):
```yaml
---
theme: ./
---
```

## Frontmatter Example
```yaml
title: Theme Demo
subtitle: Subtitle
author: Instructor Name
date: '2025/08/03'
color: green # red | yellow | green | blue | purple
link: 'https://example.com' # optional footer link
transition: fade
```

If `color` is omitted, the default `green` palette is used.

Below: `color: blue` example.

![Frontmatter Example](https://raw.githubusercontent.com/watabegg/slidev-theme-watabegg/refs/heads/main/example/0.png)

## Layouts
| Name | Purpose | Notes |
|------|---------|-------|
| cover | Title slide | Gradient wave + title/subtitle/author |
| two-cols | Two columns | Slots: `::left::` / `::right::` |
| image | Background image | Use `image:` + absolutely placed `TextBox` |
| image-scroll | Background image (pan & zoom) | Use `image:` with tall background + `TextBox` |
| end | Ending slide | Simple finish screen |

### two-cols Example
```markdown
---
layout: two-cols
---
::left::
Left
::right::
Right
```

![two-cols Example](https://raw.githubusercontent.com/watabegg/slidev-theme-watabegg/refs/heads/main/example/1.png)

### image Example
```markdown
---
layout: image
image: /path/to/bg.jpg
---
<TextBox :x="120" :y="160" :width="360">Note</TextBox>
```

### image-scroll Example
```markdown
---
layout: image-scroll
image: /path/to/long-bg.jpg
---
```

![image-scroll Example](https://raw.githubusercontent.com/watabegg/slidev-theme-watabegg/refs/heads/main/example/7.png)

## Components
### QuestionList
Nested questions/answers with per-level styles and Markdown rendering.
```vue
<QuestionList
  :items="['First **OK**', { text: 'Second', items: ['Child A','Child B'] }]"
  :styles="['decimal-circle','katakana-paren','loweralpha-dot']"
  :start="[1,1,'c']"
/>
```
Counter types: `decimal | hiragana | katakana | kanji | upperalpha | loweralpha | none`  
Decorators: `circle | square | paren | dot | q | big-q | none`  
If an item includes a `label`, it overrides the computed label.

![QuestionList Example](https://raw.githubusercontent.com/watabegg/slidev-exam-prep/refs/heads/main/example/3.png)

### TextBox
Absolutely positioned overlay (useful on `image` / `image-scroll` or for callouts).
```vue
<TextBox :x="100" :y="220" :width="400" textBg="green" v-click="1">Memo</TextBox>
```
Props: `x`, `y`, `width`, `height`, `textBg`, `color`, `vClick`

### KaTexReveal
KaTeX renderer to ensure math always draws. Slidev auto-registers `components/*.vue`, so drop it directly into Markdown or `QuestionList` items that contain TeX.
```vue
<KaTexReveal formula="\\int_0^{2\\pi} \\sin x\\,dx = 0" block class="text-2xl" />
<KaTexReveal formula="E = mc^2" :block="false" v-click="1" />
```
Props: `formula` (required), `block` (default `false`), `tag` (auto `div`/`span`), other attrs (`class`, `v-click`, etc.) are forwarded.

![KaTeX Example](https://raw.githubusercontent.com/watabegg/slidev-theme-watabegg/refs/heads/main/example/4.png)

## Footer & Shortcuts
- Footer (except on `cover` / `image` / `image-scroll`): shows `date` + current/total pages.
- Enter: next fragment or slide.
- Backspace: previous fragment or slide.

## Utility Classes
- `.text-highlight` line-marker style highlight
- `.card` rounded box with padding and border

![Utility Example](https://raw.githubusercontent.com/watabegg/slidev-theme-watabegg/refs/heads/main/example/7.png)

## Development
```bash
pnpm install
pnpm dev
pnpm build
pnpm export
pnpm screenshot
```

## FAQ
**Q. Do I need to configure fonts manually?**  
No. Google Fonts are loaded inside the theme.

**Q. How can I remove the footer?**  
Override `global-bottom.vue` in your own custom theme.

**Q. How do I change the numbering start?**  
Use `:start="[1,'c']"` (array per hierarchy level).

## See Also
Japanese documentation: `README.ja.md`

Happy teaching! 🎓
