<template>
  <div class="slidev-layout two-cols">
    <h1 v-if="$frontmatter.title">{{ $frontmatter.title }}</h1>
    <div class="slidev-grid-container">
      <div class="col-left">
        <slot name="left" />
      </div>
      <div class="col-right">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSlideContext } from '@slidev/client'

const { $frontmatter } = useSlideContext()
</script>

<style scoped>
/* Additional scoped styles if needed */
</style>
