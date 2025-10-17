<template>
  <div class="slidev-layout cover" :style="cssVars">
    <div class="content">
      <h1 v-if="$frontmatter.title">{{ $frontmatter.title }}</h1>
      <h2 v-if="$frontmatter.subtitle">{{ $frontmatter.subtitle }}</h2>
    </div>
    <div v-if="$frontmatter.date" class="date">
      {{ $frontmatter.date }}
    </div>
    <div v-if="$frontmatter.author" class="author">
      {{ $frontmatter.author }}
    </div>
    <div class="wave">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 700" width="100%" height="100%" preserveAspectRatio="none">
        <defs>
          <linearGradient id="wave-1754178473929" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="700" y2="700" gradientTransform="scale(1.83, 1)">
            <stop offset="0%" :stop-color="currentPalette.gradientStart"/>
            <stop offset="100%" :stop-color="currentPalette.gradientEnd"/>
          </linearGradient>
        </defs>
        <path d="M -1049.6 400 Q -729.6 400 -409.6 550 Q 230.4 850 870.4 550 Q 1190.4 400 1510.4 400 Q 1830.4 400 2150.4 550 Q 2790.4 850 3430.4 550 Q 3750.4 400 4070.4 400 L 1280 0 L 0 0 Z" fill="url(#wave-1754178473929)"></path>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

import { useActiveThemePalette } from '../utils/useThemePalette'

const { $frontmatter } = useSlideContext()

const { palette: currentPalette } = useActiveThemePalette(() => $frontmatter.color)

const cssVars = computed(() => ({
  '--slidev-theme-primary': currentPalette.value.primary,
  '--cover-gradient-start': currentPalette.value.gradientStart,
  '--cover-gradient-end': currentPalette.value.gradientEnd,
  '--cover-accent': currentPalette.value.accent,
}))
</script>

<style scoped>
.content {
  z-index: 10;
  position: relative;
}

.default {
  margin-top: 2rem;
  color: white;
}

.wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
