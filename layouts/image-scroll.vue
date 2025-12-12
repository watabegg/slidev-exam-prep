<template>
  <div
    class="slidev-layout image-scroll"
    ref="wrapperRef"
    @wheel="onWheel"
    @mousedown="onMouseDown"
  >
    <div class="image-layer" :class="{ 'is-panning': isPanning }">
      <img
        v-if="imageSrc"
        :src="imageSrc"
        alt="Scrollable background"
        :style="imageStyle"
        draggable="false"
      />
    </div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { useSlideContext } from '@slidev/client'

const { $frontmatter } = useSlideContext()

const imageSrc = computed(() => $frontmatter.image)

const wrapperRef = ref<HTMLElement | null>(null)
const scale = ref(1)
const position = reactive({ x: 0, y: 0 })
const isPanning = ref(false)
const lastPointer = reactive({ x: 0, y: 0 })

const MIN_SCALE = 0.4
const MAX_SCALE = 4
const ZOOM_STEP = 0.12

const clamp = (val: number, min: number, max: number) => Math.min(max, Math.max(min, val))

const resetTransform = () => {
  scale.value = 1
  position.x = 0
  position.y = 0
}

const onWheel = (event: WheelEvent) => {
  if (!imageSrc.value) return

  // Default: wheelで拡大。Shift押下時は縮小方向を優先。
  const direction = event.shiftKey ? -1 : event.deltaY < 0 ? 1 : -1
  const next = clamp(scale.value + direction * ZOOM_STEP, MIN_SCALE, MAX_SCALE)

  if (next === scale.value) return

  event.preventDefault()
  scale.value = next
}

const onMouseDown = (event: MouseEvent) => {
  if (!imageSrc.value || event.button !== 0) return
  isPanning.value = true
  lastPointer.x = event.clientX
  lastPointer.y = event.clientY
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
}

const onMouseMove = (event: MouseEvent) => {
  if (!isPanning.value) return
  const dx = event.clientX - lastPointer.x
  const dy = event.clientY - lastPointer.y
  position.x += dx
  position.y += dy
  lastPointer.x = event.clientX
  lastPointer.y = event.clientY
  event.preventDefault()
}

const onMouseUp = () => {
  isPanning.value = false
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', onMouseUp)
}

const imageStyle = computed(() => ({
  transform: `translate(${position.x}px, ${position.y}px) scale(${scale.value})`,
}))

onMounted(() => {
  resetTransform()
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', onMouseUp)
})

watch(imageSrc, () => {
  resetTransform()
})
</script>

<style scoped>
.slidev-layout.image-scroll {
  position: relative;
  height: 100%;
  overflow: hidden;
}

.image-layer {
  position: absolute;
  inset: 0;
  overflow: hidden;
  cursor: grab;
}

.image-layer.is-panning {
  cursor: grabbing;
}

.image-layer img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  will-change: transform;
  transition: transform 80ms ease-out;
}

.content {
  position: relative;
  z-index: 1;
  height: 100%;
  padding: 2rem;
}
</style>
