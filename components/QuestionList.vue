<template>
  <div class="question-list" :style="{ '--level': currentLevel }">
    <div v-for="(item, index) in items" :key="index" class="question-item">
      <div class="item-content">
        <span class="item-label" v-html="getLabel(index)"></span>
        <span v-if="hasRenderableContent(item)" class="item-text">
          <KaTexReveal
            v-if="isKatexItem(item)"
            :formula="getFormula(item)"
            :block="isBlockFormula(item)"
            v-bind="getKatexAttrs(item)"
          />
          <component v-else :is="renderMarkdown(getItemText(item))" />
        </span>
      </div>
      <div v-if="hasSubItems(item)" class="sub-list" :style="{ marginTop: getItemText(item) ? '1rem' : '0' }">
        <QuestionList
          :items="getSubItems(item)"
          :styles="styles"
          :level="currentLevel + 1"
          :start="Array.isArray(start) ? start : []"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import KaTexReveal from './KaTexReveal.vue';
import { renderMarkdown } from '../utils/render';

const props = withDefaults(defineProps<{
  items: (string | Record<string, any>)[];
  styles?: string[];
  level?: number;
  start?: (number | string)[];
}>(), {
  styles: () => ['decimal-circle', 'katakana-paren', 'lower-alpha-paren', 'decimal-dot'],
  level: 0,
  start: () => [],
});

const currentLevel = computed(() => props.level ?? 0);

const TEX_WRAPPERS = [
  { start: '$$', end: '$$' },
  { start: '\\[', end: '\\]' },
  { start: '\\(', end: '\\)' },
];

const stripTexDelimiters = (value: string): string => {
  const trimmed = value.trim();
  for (const { start, end } of TEX_WRAPPERS) {
    if (trimmed.startsWith(start) && trimmed.endsWith(end)) {
      return trimmed.slice(start.length, trimmed.length - end.length).trim();
    }
  }
  return trimmed;
};

const extractFormulaFromText = (value?: string): string => {
  if (!value) return '';
  const trimmed = value.trim();
  for (const { start, end } of TEX_WRAPPERS) {
    if (trimmed.startsWith(start) && trimmed.endsWith(end)) {
      return stripTexDelimiters(trimmed);
    }
  }
  return '';
};

const hasRenderableContent = (item: string | Record<string, any>): boolean => {
  if (isKatexItem(item)) return true;
  return Boolean(getItemText(item).trim());
};

const normalizedItemType = (item: Record<string, any>): string => {
  if (typeof item.type !== 'string') return '';
  return item.type.toLowerCase();
};

const getFormula = (item: string | Record<string, any>): string => {
  if (typeof item === 'object') {
    if (typeof item.formula === 'string' && item.formula.trim()) {
      return stripTexDelimiters(item.formula);
    }
    const hint = item.tex === true || ['katex', 'tex', 'math'].includes(normalizedItemType(item));
    if (hint && typeof item.text === 'string') {
      return stripTexDelimiters(item.text);
    }
    const extracted = extractFormulaFromText(item.text);
    return extracted;
  }
  return extractFormulaFromText(item) || '';
};

const isKatexItem = (item: string | Record<string, any>): boolean => {
  return Boolean(getFormula(item));
};

const isBlockFormula = (item: string | Record<string, any>): boolean => {
  if (typeof item === 'object' && typeof item.block === 'boolean') {
    return item.block;
  }

  const source = typeof item === 'string'
    ? item
    : typeof item.formula === 'string'
      ? item.formula
      : typeof item.text === 'string'
        ? item.text
        : '';
  const trimmed = source.trim();
  if (!trimmed) return true;
  if (trimmed.startsWith('\\(') && trimmed.endsWith('\\)')) return false;
  if (trimmed.startsWith('$') && trimmed.endsWith('$') && !trimmed.startsWith('$$')) return false;
  if (trimmed.startsWith('$$') && trimmed.endsWith('$$')) return true;
  if (trimmed.startsWith('\\[') && trimmed.endsWith('\\]')) return true;
  return true;
};

const reservedItemKeys = new Set(['text', 'items', 'label', 'block', 'type', 'tex', 'formula', 'attrs']);

const getKatexAttrs = (item: string | Record<string, any>): Record<string, any> => {
  if (typeof item !== 'object') {
    return {};
  }
  if (item.attrs && typeof item.attrs === 'object') {
    return item.attrs;
  }
  const attrs: Record<string, any> = {};
  Object.keys(item).forEach((key) => {
    if (!reservedItemKeys.has(key)) {
      attrs[key] = item[key];
    }
  });
  return attrs;
};

const getItemText = (item: string | Record<string, any>): string => 
  (typeof item === 'string' ? item : item.text) || '';

const hasSubItems = (item: string | Record<string, any>): boolean => 
  typeof item === 'object' && Array.isArray(item.items);

const getSubItems = (item: string | Record<string, any>): any[] => 
  (typeof item === 'object' && Array.isArray(item.items)) ? item.items : [];

const getLabel = (index: number): string => {
  const item = props.items[index];
  // 1. Custom item-specific labels override everything
  if (typeof item === 'object' && typeof item.label === 'string') {
    return item.label;
  }

  const style = props.styles[currentLevel.value] || 'decimal-dot';
  const [counterType, decoratorType] = style.split('-');

  // 2. Calculate the counter
  const startIndex = props.start[currentLevel.value] ? (typeof props.start[currentLevel.value] === 'number' ? (props.start[currentLevel.value] as number) - 1 : String(props.start[currentLevel.value]).charCodeAt(0) - 'a'.charCodeAt(0)) : 0;
  const currentIndex = startIndex + index;
  
  let counter = '';
  switch (counterType) {
    case 'hiragana':
      counter = toHiragana(currentIndex); break;
    case 'katakana':
      counter = toKatakana(currentIndex); break;
    case 'kanji':
      counter = toKanji(currentIndex + 1); break;
    case 'upperalpha':
      counter = String.fromCharCode('A'.charCodeAt(0) + currentIndex); break;
    case 'loweralpha':
      counter = String.fromCharCode('a'.charCodeAt(0) + currentIndex); break;
    case 'decimal':
      counter = (currentIndex + 1).toString(); break;
    case 'none':
      return ''; // No label
    default:
      counter = (currentIndex + 1).toString();
  }

  // 3. Apply decorator
  switch (decoratorType) {
    case 'circle':
      return `&#x${(9311 + currentIndex + 1).toString(16)};`; // ①, ②, ...
    case 'square':
      return `[${counter}]`;
    case 'paren':
      return `(${counter})`;
    case 'dot':
      return `${counter}.`;
    case 'q':
      return `問${counter}`;
    case 'big-q':
      return `大問${counter}`;
    case 'none':
      return '';
    default:
      return counter;
  }
};

// --- Helper functions for counters ---
const toKatakana = (n: number) => {
  const katakana = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
  return katakana[n % katakana.length];
};
const toHiragana = (n: number) => {
  const hiragana = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん';
  return hiragana[n % hiragana.length];
};
const toKanji = (n: number) => {
  const kanji = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
  if (n <= 10) return kanji[n - 1];
  // Basic support for > 10
  if (n <= 19) return '十' + kanji[n - 11];
  return n.toString(); // Fallback
};

</script>

<style scoped>
.question-list {
  padding-left: calc(var(--level, 0) * 2.5rem);
}
.question-item {
  margin-bottom: 0.6rem;
}
.item-content {
  display: flex;
  align-items: baseline;
  line-height: 1.6;
}
.item-label {
  font-weight: bold;
  color: var(--slidev-theme-primary);
  margin-right: 0.75em;
  min-width: 2em; /* Allocate space for label */
  text-align: right;
}
.item-text {
  flex: 1;
}
.item-text :deep(p) {
  margin: 0;
}
.sub-list {
  margin-top: 1rem;
}
</style>
