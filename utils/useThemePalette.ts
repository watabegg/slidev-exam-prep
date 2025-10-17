import { computed, ref, watchEffect } from 'vue'

import {
  defaultThemeColor,
  resolveThemeColor,
  themePalettes,
  type ThemeColorKey,
  type ThemePalette,
} from './colors'

const activeColorKey = ref<ThemeColorKey>(defaultThemeColor)

function normalizeColor(value: unknown): ThemeColorKey | undefined {
  if (value === undefined)
    return undefined

  if (value === null)
    return defaultThemeColor

  if (typeof value === 'string') {
    const trimmed = value.trim()
    if (!trimmed)
      return defaultThemeColor

    return resolveThemeColor(trimmed)
  }

  return defaultThemeColor
}

export function useActiveThemePalette(source: () => unknown) {
  watchEffect(() => {
    const normalized = normalizeColor(source())
    if (normalized !== undefined)
      activeColorKey.value = normalized
  })

  const palette = computed<ThemePalette>(() => themePalettes[activeColorKey.value])

  return {
    palette,
    colorKey: computed(() => activeColorKey.value),
  }
}

export function getActiveThemePalette(): ThemePalette {
  return themePalettes[activeColorKey.value]
}

