<template>
  <div class="slidev-layout cover">
    <div class="content">
      <h1 v-if="$frontmatter.title">{{ $frontmatter.title }}</h1>
      <h2 v-if="$frontmatter.subtitle">{{ $frontmatter.subtitle }}</h2>
    </div>
    <div v-if="$frontmatter.author" class="author">
      {{ $frontmatter.author }}
    </div>
  </div>
</template>

<script setup lang="ts">
// Cover layout for the exam prep theme
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
</style>
