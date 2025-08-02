<template>
  <div class="question-list" :style="{ '--level': currentLevel }">
    <div v-for="(item, index) in items" :key="index" class="question-item">
      <div class="item-content">
        <span class="item-label" v-html="getLabel(index)"></span>
        <span class="item-text">
          <component :is="renderMarkdown(getItemText(item))" />
        </span>
      </div>
      <div v-if="hasSubItems(item)" class="sub-list">
        <QuestionList
          :items="getSubItems(item)"
          :styles="styles"
          :level="currentLevel + 1"
          :start="Array.isArray(start) ? start : []"
          :labels="Array.isArray(labels) ? labels : []"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { marked } from 'marked';

const props = withDefaults(defineProps<{
  items: (string | Record<string, any>)[];
  styles?: string[];
  level?: number;
  start?: (number | string)[];
  labels?: string[];
}>(), {
  styles: () => ['decimal-circle', 'katakana-paren', 'lower-alpha-paren', 'decimal-dot'],
  level: 0,
  start: () => [],
  labels: () => [],
});

const currentLevel = computed(() => props.level ?? 0);

const getItemText = (item: string | Record<string, any>): string => 
  typeof item === 'string' ? item : item.text;

const hasSubItems = (item: string | Record<string, any>): boolean => 
  typeof item === 'object' && Array.isArray(item.items);

const getSubItems = (item: string | Record<string, any>): any[] => 
  (typeof item === 'object' && Array.isArray(item.items)) ? item.items : [];

const renderMarkdown = (text: string) => ({
  template: `<div class="inline-block">${marked.parse(text)}</div>`
});

const getLabel = (index: number): string => {
  // 1. Custom labels override everything
  if (props.labels && props.labels[index]) {
    return props.labels[index];
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
