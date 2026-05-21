const SAFE_PROTOCOLS = new Set(['http:', 'https:', 'mailto:', 'tel:'])

function isRelativeUrl(value: string) {
  return value.startsWith('#')
    || value.startsWith('/')
    || value.startsWith('./')
    || value.startsWith('../')
    || value.startsWith('?')
}

export function toSafeUrl(value: unknown): string | undefined {
  if (typeof value !== 'string')
    return undefined

  const trimmed = value.trim()
  if (!trimmed)
    return undefined

  if (isRelativeUrl(trimmed))
    return trimmed

  try {
    const url = new URL(trimmed)
    return SAFE_PROTOCOLS.has(url.protocol)
      ? url.toString()
      : undefined
  }
  catch {
    return undefined
  }
}
