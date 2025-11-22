<template>
  <component
    :is="resolvedTag"
    ref="root"
    v-bind="forwardedAttrs"
    :class="['katex-reveal', attrs.class]"
  />
</template>

<script setup lang="ts">
import { computed, onMounted, onUpdated, ref, useAttrs } from 'vue';
import katex from 'katex';
import 'katex/dist/katex.min.css';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<{
  formula: string;
  block?: boolean;
  tag?: string;
}>(), {
  block: false,
  tag: undefined,
});

const attrs = useAttrs();
const root = ref<HTMLElement | null>(null);

const forwardedAttrs = computed(() => {
  const { class: _class, ...rest } = attrs as Record<string, any>;
  return rest;
});

const resolvedTag = computed(() => props.tag ?? (props.block ? 'div' : 'span'));

const renderFormula = () => {
  const target = root.value;
  if (!target) return;

  if (!props.formula) {
    target.innerHTML = '';
    return;
  }

  try {
    katex.render(props.formula, target, {
      displayMode: props.block,
      throwOnError: false,
    });
  } catch (error) {
    console.warn('[KaTexReveal] failed to render formula', error);
    target.textContent = props.formula;
  }
};

onMounted(renderFormula);
onUpdated(renderFormula);
</script>

<style scoped>
.katex-reveal {
  vertical-align: middle;
}
</style>
