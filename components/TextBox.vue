<template>
  <div 
    class="textbox"
    :class="computedClasses"
    :style="computedStyles"
    v-click="vClick"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  x?: number
  y?: number
  width?: number
  height?: number
  color?: string
  textBg?: string
  vClick?: number
}

const props = withDefaults(defineProps<Props>(), {
  x: 0,
  y: 0,
  width: 300,
  height: undefined,
  color: undefined,
  textBg: undefined,
  vClick: undefined
})

const computedStyles = computed(() => ({
  left: `${props.x}px`,
  top: `${props.y}px`,
  width: `${props.width}px`,
  ...(props.height && { height: `${props.height}px` })
}))

const computedClasses = computed(() => {
  const classes = []
  
  if (props.textBg) {
    classes.push(`bg-${props.textBg}`)
  }
  
  if (props.color) {
    classes.push(`text-${props.color}`)
  }
  
  return classes
})
</script>

<style scoped>
  .textbox {
    position: absolute;
    background-color: rgba(255, 255, 255, 0);
    padding: 0.6rem;
    border-radius: 0.5rem;
  }
  
  .bg-green-500 {
    background: rgba(76, 175, 80);
    color: white;
  }

  .bg-blue-500 {
    background: rgba(33, 150, 243);
    color: white;
  }

  .bg-red-500 {
    background: rgba(244, 67, 54);
    color: white;
  }

  .bg-yellow-500 {
    background: rgba(255, 193, 7);
    color: #333;
  }

/* Text color variants */
.text-blue-500 {
  color: #3b82f6 !important;
}

.text-green-500 {
  color: #10b981 !important;
}

.text-red-500 {
  color: #ef4444 !important;
}

.text-purple-500 {
  color: #8b5cf6 !important;
}

.text-orange-500 {
  color: #f97316 !important;
}
</style>
