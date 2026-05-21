import { Marked } from 'marked'

import { toSafeUrl } from './safeUrl'

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

const inlineMarkdown = new Marked({
  async: false,
  gfm: true,
  renderer: {
    image(token) {
      const src = toSafeUrl(token.href)
      const alt = escapeHtml(token.text)
      const title =
        typeof token.title === 'string' && token.title ? ` title="${escapeHtml(token.title)}"` : ''

      if (!src) return alt

      return `<img src="${escapeHtml(src)}" alt="${alt}"${title}>`
    },
    link(token) {
      const href = toSafeUrl(token.href)
      const text = this.parser.parseInline(token.tokens)
      const title =
        typeof token.title === 'string' && token.title ? ` title="${escapeHtml(token.title)}"` : ''

      if (!href) return text

      return `<a href="${escapeHtml(href)}"${title} rel="noopener noreferrer">${text}</a>`
    },
  },
})

export function renderInlineMarkdown(text: string) {
  return inlineMarkdown.parseInline(escapeHtml(text))
}
