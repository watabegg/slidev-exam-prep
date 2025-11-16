const getLink = ({
  frontmatter,
  slidevConfigs,
}: {
  frontmatter: Record<string, unknown>
  slidevConfigs: Record<string, unknown> | undefined
}) => {
  if (typeof frontmatter.link === 'string' && frontmatter.link.length > 0)
    return frontmatter.link
  
  const globalLink = slidevConfigs?.['link']
  return typeof globalLink === 'string' && globalLink.length > 0
    ? globalLink
    : undefined
}

export default getLink