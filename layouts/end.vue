<template>
  <div class="slidev-layout end">
    <div class="content">
      <h1>ご清聴ありがとうございました</h1>
      <a :href="link">戻る</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSlideContext } from '@slidev/client'
const { $frontmatter, $slidev } = useSlideContext()
import getLink from '../utils/link'

const link = getLink({
  frontmatter: $frontmatter,
  slidevConfigs: $slidev?.configs as Record<string, unknown> | undefined,
})

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
