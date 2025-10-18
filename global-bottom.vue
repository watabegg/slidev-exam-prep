<script setup lang="ts">
import { watchEffect } from 'vue'
import { useSlideContext } from '@slidev/client'

import { useActiveThemePalette } from './utils/useThemePalette'

const { $frontmatter, $nav } = useSlideContext()

const { palette: currentPalette } = useActiveThemePalette(() => $frontmatter.color)

watchEffect(() => {
  if (typeof document === 'undefined')
    return

  const palette = currentPalette.value
  const root = document.documentElement

  root.style.setProperty('--slidev-theme-primary', palette.primary)
  root.style.setProperty('--cover-gradient-start', palette.gradientStart)
  root.style.setProperty('--cover-gradient-end', palette.gradientEnd)
  root.style.setProperty('--cover-accent', palette.accent)
})
</script>

<template>
  <footer 
    v-if="$nav.currentLayout !== 'cover' && $nav.currentLayout !== 'image'"
    class="exam-prep-footer"
  >
    <div class="footer-left">
      <a :href="$frontmatter.link">ホームに戻る</a>
    </div>
    <div class="footer-right">
      <span>{{ $nav.currentPage }} / {{ $nav.total }}</span>
    </div>
  </footer>
</template>

<style scoped>
.exam-prep-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  background: var(--slidev-theme-background);
  border-top: 1px solid var(--slidev-theme-border);
  font-size: 0.9rem;
  color: var(--slidev-theme-text-secondary);
  z-index: 20;
}

.footer-left,
.footer-right {
  display: flex;
  align-items: center;
}
</style>
