# slidev-theme-exam-prep

[![NPM version](https://img.shields.io/npm/v/slidev-theme-exam-prep?color=3AB9D4&label=)](https://www.npmjs.com/package/slidev-theme-exam-prep)

A Slidev theme designed for educational presentations with focus on usability and interactivity in classroom settings.

## Features

- 🎓 **Education-focused design** - Clean, professional appearance suitable for classrooms
- 📱 **Responsive layouts** - Works well on various screen sizes
- 🔤 **Japanese-friendly fonts** - Uses M PLUS 2 for excellent Japanese text rendering
- 📄 **Auto-generated footers** - Date and page numbers on every slide (except cover)
- ⌨️ **Intuitive navigation** - Enter to advance, Backspace to go back
- 🎯 **Multiple specialized layouts** - Cover, two-column, answer, and image layouts
- 🔍 **RevealCard component** - Interactive hidden text for quizzes and memory exercises
- 📍 **TextBox component** - Positioned text boxes for image annotations

## Installation

Add the following frontmatter to your `slides.md`. Start Slidev then it will prompt you to install the theme automatically.

```yaml
---
theme: exam-prep
---
```

Learn more about [how to use a theme](https://sli.dev/guide/theme-addon#use-theme).

## Layouts

### `cover`
- **Purpose:** Title page for presentations
- **Features:** Displays title, subtitle, and author with a green gradient background

### `two-cols`
- **Purpose:** Split content into two columns
- **Usage:**
```markdown
---
layout: two-cols
---

::left::
Left column content

::right::
Right column content
```

### `answer`
- **Purpose:** Display answers in hierarchical lists
- **Features:** Multiple numbering styles (circle, katakana, roman, custom)
- **Usage:**
```yaml
---
layout: answer
answer-style: circle  # or katakana, roman, custom
---
```

### `image`
- **Purpose:** Place text boxes over background images
- **Usage:** Use with TextBox component for positioned overlays

## Components

### `RevealCard`
Interactive component for hiding/revealing text content.

```html
<!-- Basic usage -->
<RevealCard>Hidden content</RevealCard>

<!-- With custom color -->
<RevealCard color="blue-500">Blue hidden text</RevealCard>

<!-- With v-click integration -->
<RevealCard v-click="2">Revealed on second click</RevealCard>

<!-- Disable bold text -->
<RevealCard :bold="false">Normal weight text</RevealCard>
```

**Props:**
- `color` - UnoCSS color class for hidden state
- `bold` - Boolean to control bold styling (default: true)
- `v-click` - Integration with Slidev's click system

### `TextBox`
Positioned text container for image layouts.

```html
<TextBox :x="100" :y="200" :width="400" v-click="1">
  Your content here
</TextBox>

<TextBox :x="200" :y="350" :width="300" textBg="green-500" vClick="2">
  Text with background color
</TextBox>
```

**Props:**
- `x`, `y` - Position in pixels
- `width`, `height` - Dimensions in pixels
- `color` - UnoCSS text color class
- `textBg` - UnoCSS background color class
- `vClick` - Display order for v-click animations

## Theme Configuration

The theme supports the following frontmatter options:

```yaml
---
theme: exam-prep
title: Your Presentation Title
subtitle: Optional subtitle
author: Your Name
date: '2025/08/03'  # Displayed in footer
---
```

## Keyboard Shortcuts

- **Enter** - Next slide/animation
- **Backspace** - Previous slide/animation
- **Click on RevealCard** - Reveal hidden content

## Color Scheme

The theme uses a light color scheme optimized for classroom projection:
- Background: Pure white (#FFFFFF)
- Primary: Green (#4CAF50)
- Text: Dark gray (#333333)
- Accent colors available via UnoCSS classes

## Font Stack

- **Primary:** M PLUS 2 (Google Fonts) - Excellent for Japanese text
- **Monospace:** Fira Code
- **Base size:** 26px with 1.6 line height for optimal readability

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Export as PDF
npm run export

# Generate screenshot
npm run screenshot
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Test with `npm run dev`
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Credits

Built with [Slidev](https://sli.dev/) - presentation slides for developers.

## Install

Add the following frontmatter to your `slides.md`. Start Slidev then it will prompt you to install the theme automatically.

<pre><code>---
theme: <b>slidev-exam-prep</b>
---</code></pre>

Learn more about [how to use a theme](https://sli.dev/guide/theme-addon#use-theme).

## Layouts

This theme provides the following layouts:

> TODO:

## Components

This theme provides the following components:

> TODO:

## Contributing

- `npm install`
- `npm run dev` to start theme preview of `example.md`
- Edit the `example.md` and style to see the changes
- `npm run export` to generate the preview PDF
- `npm run screenshot` to generate the preview PNG
