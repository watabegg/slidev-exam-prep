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
// Using $frontmatter is a robust way to access slide-specific data
// without relying on props, which can sometimes have naming conflicts.
</script>

<style scoped>
/* Additional scoped styles if needed */
</style>
