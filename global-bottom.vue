<template>
  <footer 
    v-if="$nav.currentLayout !== 'cover'"
    class="exam-prep-footer"
  >
    <div class="footer-left">
      <span v-if="$frontmatter.date">{{ $frontmatter.date }}</span>
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
