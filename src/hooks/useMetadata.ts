/**
 * Created by Aineph for web-client.
 * Started on 19/07/2023.
 */

import { graphql, useStaticQuery } from "gatsby"
import { useMemo } from "react"

export const useMetadata = (locale: string): Queries.STRAPI_CONSTANT => {
  const metadata = useStaticQuery(graphql`
    query {
      allStrapiConstant {
        nodes {
          description
          locale
          title
        }
      }
    }
  `)

  return useMemo(
    () =>
      metadata.allStrapiConstant.nodes.filter(
        (node: Queries.STRAPI_CONSTANT) => {
          return locale === node.locale
        },
      )[0],
    [locale, metadata],
  )
}
