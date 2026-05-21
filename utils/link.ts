import { toSafeUrl } from './safeUrl'

const getLink = ({
  frontmatter,
  slidevConfigs,
}: {
  frontmatter: Record<string, unknown>
  slidevConfigs: Record<string, unknown> | undefined
}) => {
  const frontmatterLink = toSafeUrl(frontmatter.link)
  if (frontmatterLink)
    return frontmatterLink

  return toSafeUrl(slidevConfigs?.['link'])
}

export default getLink
