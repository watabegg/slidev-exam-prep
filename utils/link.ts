import { toSafeUrl } from './safeUrl'
import { getWatabeggThemeConfig } from './themeConfig'

const getLink = ({
  frontmatter,
  slidevConfigs,
}: {
  frontmatter: Record<string, unknown>
  slidevConfigs: Record<string, unknown> | undefined
}) => {
  const frontmatterLink = toSafeUrl(frontmatter.link)
  if (frontmatterLink) return frontmatterLink

  const themeConfigLink = toSafeUrl(getWatabeggThemeConfig(slidevConfigs).link)
  if (themeConfigLink) return themeConfigLink

  return toSafeUrl(slidevConfigs?.link)
}

export default getLink
