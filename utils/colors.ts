export type ThemeColorKey = 'red' | 'yellow' | 'green' | 'blue' | 'purple'

export interface ThemePalette {
  primary: string
  gradientStart: string
  gradientEnd: string
  accent: string
}

export const defaultThemeColor: ThemeColorKey = 'green'

export const themePalettes: Record<ThemeColorKey, ThemePalette> = {
  red: {
    primary: '#E53935',
    gradientStart: '#EF9A9A',
    gradientEnd: '#B71C1C',
    accent: '#B71C1C',
  },
  yellow: {
    primary: '#FBC02D',
    gradientStart: '#FFF59D',
    gradientEnd: '#F57F17',
    accent: '#F57F17',
  },
  green: {
    primary: '#4CAF50',
    gradientStart: '#A5D6A7',
    gradientEnd: '#2E7D32',
    accent: '#2E7D32',
  },
  blue: {
    primary: '#1E88E5',
    gradientStart: '#90CAF9',
    gradientEnd: '#0D47A1',
    accent: '#0D47A1',
  },
  purple: {
    primary: '#8E24AA',
    gradientStart: '#CE93D8',
    gradientEnd: '#4A148C',
    accent: '#4A148C',
  },
}

export function resolveThemeColor(rawValue: unknown): ThemeColorKey {
  if (typeof rawValue !== 'string')
    return defaultThemeColor

  const normalized = rawValue.trim().toLowerCase() as ThemeColorKey
  return normalized in themePalettes ? normalized : defaultThemeColor
}

export function getThemePalette(rawValue: unknown): ThemePalette {
  const key = resolveThemeColor(rawValue)
  return themePalettes[key]
}

