<template>
  <div class="slidev-layout image">
    <img 
      v-if="$frontmatter.image" 
      :src="$frontmatter.image" 
      class="background-image"
      alt="Background"
    />
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
// Image layout for the exam prep theme
</script>

<style scoped>
/* Image layout styles are in the main layout.css */
</style>
