<template>
  <div
    class="slidev-layout image-scroll"
    ref="wrapperRef"
    @wheel="onWheel"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointercancel="onPointerUp"
  >
    <div class="image-layer" :class="{ 'is-panning': isPanning }">
      <div class="image-translate" :style="translateStyle">
        <img
          v-if="imageSrc"
          ref="imageRef"
          :src="imageSrc"
          alt="Scrollable background"
          :style="imageStyle"
          draggable="false"
          @load="onImageLoad"
        />
      </div>
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
const imageRef = ref<HTMLImageElement | null>(null)

type FitMode = 'contain' | 'cover' | 'width' | 'height'

type ImageScrollFrontmatter = {
  fit?: FitMode | string
  position?: string
  offset?: [number, number] | { x?: number; y?: number }
  offsetX?: number
  offsetY?: number
}

const imageScrollOptions = computed<ImageScrollFrontmatter>(() => {
  const raw = $frontmatter.imageScroll
  if (raw && typeof raw === 'object') return raw as ImageScrollFrontmatter
  return {}
})

const fitMode = computed<FitMode>(() => {
  const value = imageScrollOptions.value.fit
  if (!value) return 'contain'
  const normalized = String(value).toLowerCase()
  if (normalized === 'cover') return 'cover'
  if (normalized === 'width' || normalized === 'fit-width') return 'width'
  if (normalized === 'height' || normalized === 'fit-height') return 'height'
  return 'contain'
})

const positionMode = computed(() => imageScrollOptions.value.position ?? 'center')

const offsetMode = computed(() => {
  const raw = imageScrollOptions.value
  const offset = raw.offset
  let x = Number(raw.offsetX ?? 0)
  let y = Number(raw.offsetY ?? 0)
  if (Array.isArray(offset)) {
    x = Number(offset[0] ?? x)
    y = Number(offset[1] ?? y)
  } else if (offset && typeof offset === 'object') {
    x = Number((offset as { x?: number }).x ?? x)
    y = Number((offset as { y?: number }).y ?? y)
  }
  return { x, y }
})

const baseTransform = reactive({ x: 0, y: 0, scale: 1 })
const userTransform = reactive({ x: 0, y: 0, scale: 1 })

const imageSize = reactive({ width: 0, height: 0 })
const wrapperSize = reactive({ width: 0, height: 0 })

const isPanning = ref(false)
const lastPointer = reactive({ x: 0, y: 0 })
const activePointers = new Map<number, { x: number; y: number }>()
const pinchState = reactive({
  active: false,
  startDistance: 0,
  startUserScale: 1,
  anchorImagePoint: { x: 0, y: 0 },
})

const MIN_SCALE = 0.4
const MAX_SCALE = 4
const ZOOM_STEP = 0.1

const clamp = (val: number, min: number, max: number) => Math.min(max, Math.max(min, val))

const resetTransform = () => {
  baseTransform.scale = 1
  baseTransform.x = 0
  baseTransform.y = 0
  userTransform.scale = 1
  userTransform.x = 0
  userTransform.y = 0
}

const panBy = (dx: number, dy: number) => {
  userTransform.x += dx
  userTransform.y += dy
}

const getWrapperPoint = (event: { clientX: number; clientY: number }) => {
  const rect = wrapperRef.value?.getBoundingClientRect()
  if (!rect) return { x: 0, y: 0 }
  return { x: event.clientX - rect.left, y: event.clientY - rect.top }
}

const getTotalTransform = () => ({
  x: baseTransform.x + userTransform.x,
  y: baseTransform.y + userTransform.y,
  scale: baseTransform.scale * userTransform.scale,
})

const getImagePoint = (anchor: { x: number; y: number }, total: { x: number; y: number; scale: number }) => ({
  x: (anchor.x - total.x) / total.scale,
  y: (anchor.y - total.y) / total.scale,
})

const applyScaleAtPoint = (nextUserScale: number, anchor: { x: number; y: number }, anchorImagePoint?: { x: number; y: number }) => {
  const currentTotal = getTotalTransform()
  const imagePoint = anchorImagePoint ?? getImagePoint(anchor, currentTotal)
  const nextTotalScale = baseTransform.scale * nextUserScale
  const nextTotalX = anchor.x - imagePoint.x * nextTotalScale
  const nextTotalY = anchor.y - imagePoint.y * nextTotalScale
  userTransform.scale = nextUserScale
  userTransform.x = nextTotalX - baseTransform.x
  userTransform.y = nextTotalY - baseTransform.y
}

const normalizeWheel = (event: WheelEvent) => {
  let { deltaX, deltaY } = event
  if (event.deltaMode === 1) {
    deltaX *= 16
    deltaY *= 16
  } else if (event.deltaMode === 2) {
    deltaX *= wrapperSize.height || 1
    deltaY *= wrapperSize.height || 1
  }
  return { deltaX, deltaY }
}

const onWheel = (event: WheelEvent) => {
  if (!imageSrc.value) return

  event.preventDefault()

  if (event.altKey) {
    const anchor = getWrapperPoint(event)
    const zoomFactor = event.deltaY < 0 ? 1 + ZOOM_STEP : 1 - ZOOM_STEP
    const nextScale = clamp(userTransform.scale * zoomFactor, MIN_SCALE, MAX_SCALE)
    if (nextScale === userTransform.scale) return
    applyScaleAtPoint(nextScale, anchor)
    return
  }

  const { deltaX, deltaY } = normalizeWheel(event)
  if (event.shiftKey) {
    panBy(-deltaY, 0)
  } else {
    panBy(0, -deltaY)
  }
}

let resizeObserver: ResizeObserver | null = null

const onPointerDown = (event: PointerEvent) => {
  if (!imageSrc.value) return
  if (event.pointerType === 'mouse' && event.button !== 0) return
  wrapperRef.value?.setPointerCapture(event.pointerId)
  const point = getWrapperPoint(event)
  activePointers.set(event.pointerId, point)
  if (activePointers.size === 1) {
    isPanning.value = true
    lastPointer.x = point.x
    lastPointer.y = point.y
  }
  if (activePointers.size === 2) {
    isPanning.value = false
    const [first, second] = Array.from(activePointers.values())
    const center = { x: (first.x + second.x) / 2, y: (first.y + second.y) / 2 }
    const distance = Math.hypot(first.x - second.x, first.y - second.y)
    const total = getTotalTransform()
    pinchState.active = true
    pinchState.startDistance = distance
    pinchState.startUserScale = userTransform.scale
    pinchState.anchorImagePoint = getImagePoint(center, total)
  }
}

const onPointerMove = (event: PointerEvent) => {
  if (!activePointers.has(event.pointerId)) return
  const point = getWrapperPoint(event)
  activePointers.set(event.pointerId, point)

  if (activePointers.size === 1 && !pinchState.active) {
    const dx = point.x - lastPointer.x
    const dy = point.y - lastPointer.y
    panBy(dx, dy)
    lastPointer.x = point.x
    lastPointer.y = point.y
    event.preventDefault()
    return
  }

  if (activePointers.size >= 2 && pinchState.active) {
    const [first, second] = Array.from(activePointers.values())
    const center = { x: (first.x + second.x) / 2, y: (first.y + second.y) / 2 }
    const distance = Math.hypot(first.x - second.x, first.y - second.y)
    if (pinchState.startDistance > 0) {
      const factor = distance / pinchState.startDistance
      const nextScale = clamp(pinchState.startUserScale * factor, MIN_SCALE, MAX_SCALE)
      applyScaleAtPoint(nextScale, center, pinchState.anchorImagePoint)
      event.preventDefault()
    }
  }
}

const onPointerUp = (event: PointerEvent) => {
  if (activePointers.has(event.pointerId)) {
    activePointers.delete(event.pointerId)
  }
  if (activePointers.size < 2) {
    pinchState.active = false
  }
  if (activePointers.size === 1) {
    const [remaining] = Array.from(activePointers.values())
    lastPointer.x = remaining.x
    lastPointer.y = remaining.y
    isPanning.value = true
  } else {
    isPanning.value = false
  }
}

const computeBaseTransform = () => {
  if (!imageSrc.value) return
  if (!imageSize.width || !imageSize.height) return
  if (!wrapperSize.width || !wrapperSize.height) return

  const scaleX = wrapperSize.width / imageSize.width
  const scaleY = wrapperSize.height / imageSize.height
  let scale = scaleX
  switch (fitMode.value) {
    case 'cover':
      scale = Math.max(scaleX, scaleY)
      break
    case 'height':
      scale = scaleY
      break
    case 'width':
      scale = scaleX
      break
    default:
      scale = Math.min(scaleX, scaleY)
  }

  const scaledWidth = imageSize.width * scale
  const scaledHeight = imageSize.height * scale
  const position = String(positionMode.value).toLowerCase()
  const parts = position.split(/\s+/).filter(Boolean)
  let xAlign: 'left' | 'center' | 'right' = 'center'
  let yAlign: 'top' | 'center' | 'bottom' = 'center'

  for (const part of parts) {
    if (part === 'left' || part === 'center' || part === 'right') xAlign = part
    if (part === 'top' || part === 'center' || part === 'bottom') yAlign = part
  }
  if (parts.length === 1) {
    if (parts[0] === 'top' || parts[0] === 'bottom') {
      yAlign = parts[0] as typeof yAlign
      xAlign = 'center'
    }
    if (parts[0] === 'left' || parts[0] === 'right') {
      xAlign = parts[0] as typeof xAlign
      yAlign = 'center'
    }
  }

  const alignAxis = (container: number, content: number, align: 'left' | 'center' | 'right' | 'top' | 'bottom') => {
    if (align === 'left' || align === 'top') return 0
    if (align === 'right' || align === 'bottom') return container - content
    return (container - content) / 2
  }

  const offset = offsetMode.value
  baseTransform.scale = scale
  baseTransform.x = alignAxis(wrapperSize.width, scaledWidth, xAlign) + offset.x
  baseTransform.y = alignAxis(wrapperSize.height, scaledHeight, yAlign) + offset.y
  userTransform.scale = 1
  userTransform.x = 0
  userTransform.y = 0
}

const onImageLoad = (event: Event) => {
  const target = event.target as HTMLImageElement
  imageSize.width = target.naturalWidth
  imageSize.height = target.naturalHeight
  computeBaseTransform()
}

const updateWrapperSize = () => {
  const rect = wrapperRef.value?.getBoundingClientRect()
  if (!rect) return
  wrapperSize.width = rect.width
  wrapperSize.height = rect.height
}

const imageStyle = computed(() => ({
  width: imageSize.width ? `${imageSize.width}px` : 'auto',
  height: imageSize.height ? `${imageSize.height}px` : 'auto',
  transform: `scale(${baseTransform.scale * userTransform.scale})`,
  transformOrigin: '0 0',
}))

const translateStyle = computed(() => ({
  transform: `translate3d(${baseTransform.x + userTransform.x}px, ${baseTransform.y + userTransform.y}px, 0)`,
}))

onMounted(() => {
  updateWrapperSize()
  if (imageRef.value?.complete && imageRef.value.naturalWidth) {
    imageSize.width = imageRef.value.naturalWidth
    imageSize.height = imageRef.value.naturalHeight
    computeBaseTransform()
  }
  if (wrapperRef.value) {
    resizeObserver = new ResizeObserver(() => {
      updateWrapperSize()
      computeBaseTransform()
    })
    resizeObserver.observe(wrapperRef.value)
  }
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  resizeObserver = null
  activePointers.clear()
})

watch(imageSrc, () => {
  imageSize.width = 0
  imageSize.height = 0
  resetTransform()
})

watch([fitMode, positionMode, offsetMode], () => {
  computeBaseTransform()
})
</script>

<style scoped>
.slidev-layout.image-scroll {
  position: relative;
  height: 100%;
  padding: 0;
  overflow: hidden;
  touch-action: none;
}

.image-layer {
  position: absolute;
  inset: 0;
  overflow: hidden;
  cursor: grab;
  user-select: none;
}

.image-layer.is-panning {
  cursor: grabbing;
}

.image-translate {
  position: absolute;
  top: 0;
  left: 0;
  will-change: transform;
}

.image-layer img {
  display: block;
  max-width: none;
  max-height: none;
  pointer-events: none;
  user-select: none;
  will-change: transform;
}

.content {
  position: relative;
  z-index: 1;
  height: 100%;
  padding: 2rem;
}
</style>
