<template>
  <div class="slidev-layout image">
    <img
      v-if="imageSrc"
      :src="imageSrc"
      class="background-image"
      alt="Background"
    />
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

const { $frontmatter } = useSlideContext()

const imageSrc = computed(() => typeof $frontmatter.image === 'string'
  ? $frontmatter.image
  : '')
</script>

<style scoped>
/* Image layout styles are in the main layout.css */
</style>
