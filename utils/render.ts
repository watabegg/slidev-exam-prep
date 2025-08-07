import { marked } from 'marked';

export const renderMarkdown = (text: string) => ({
  template: `<div class="inline-block">${marked.parse(text)}</div>`
});