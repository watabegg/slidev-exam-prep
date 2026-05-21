import { computed } from 'vue'

import {
  defaultThemeColor,
  getThemePalette,
  resolveThemeColor,
  type ThemeColorKey,
  type ThemePalette,
} from './colors'

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
  const colorKey = computed<ThemeColorKey>(() => normalizeColor(source()) ?? defaultThemeColor)
  const palette = computed<ThemePalette>(() => getThemePalette(colorKey.value))

  return { palette, colorKey }
}
