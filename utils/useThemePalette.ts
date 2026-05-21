import { computed } from 'vue'

import {
  defaultThemeColor,
  getThemePalette,
  resolveThemeColor,
  type ThemeColorKey,
  type ThemePalette,
} from './colors'
import { getWatabeggThemeConfig } from './themeConfig'

function normalizeColor(value: unknown): ThemeColorKey | undefined {
  if (value === undefined) return undefined

  if (value === null) return defaultThemeColor

  if (typeof value === 'string') {
    const trimmed = value.trim()
    if (!trimmed) return defaultThemeColor

    return resolveThemeColor(trimmed)
  }

  return defaultThemeColor
}

export function useActiveThemePalette({
  slidevConfigs,
  slideValue,
}: {
  slidevConfigs?: Record<string, unknown>
  slideValue: () => unknown
}) {
  const colorKey = computed<ThemeColorKey>(() => {
    const frontmatterColor = normalizeColor(slideValue())
    if (frontmatterColor !== undefined) return frontmatterColor

    const themeConfigColor = normalizeColor(getWatabeggThemeConfig(slidevConfigs).color)
    return themeConfigColor ?? defaultThemeColor
  })

  const palette = computed<ThemePalette>(() => getThemePalette(colorKey.value))

  return { palette, colorKey }
}
