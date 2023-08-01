/**
 * Created by Aineph for web-client.
 * Started on 19/07/2023.
 */

import * as React from "react"
import { useMetadata } from "../hooks/useMetadata"
import { useTranslation } from "react-i18next"

interface SeoProps {
  description?: string
  language: string
  meta?: Array<{
    name: string
    content: string
  }>
  title: string
}

const Seo: React.FC<SeoProps> = ({
  description,
  meta = [],
  language,
  title,
}) => {
  const metadata = useMetadata(language)
  const { t } = useTranslation()

  const metaDescription = description || metadata.description || ""
  const defaultTitle = metadata.title
  const translatedTitle = t(title, { lng: language })

  return (
    <>
      <title>{`${title} | ${defaultTitle}`}</title>
      {[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: translatedTitle,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: "og:locale",
          content: language,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: defaultTitle,
        },
        {
          name: `twitter:title`,
          content: translatedTitle,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ]
        .concat(meta)
        .map(meta => (
          <meta
            key={meta.name || meta.property}
            name={meta.name}
            property={meta.property}
            content={meta.content || ""}
          />
        ))}
    </>
  )
}

export default React.memo(Seo)
