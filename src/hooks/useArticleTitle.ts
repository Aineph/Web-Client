/**
 * Created by Aineph for web-client.
 * Started on 29/07/2023.
 */

import { graphql, useStaticQuery } from "gatsby"
import { useMemo } from "react"

export const useArticleTitle = (locale: string, slug: string): string => {
  const articles = useStaticQuery(graphql`
    query {
      allStrapiArticle {
        nodes {
          locale
          slug
          title
        }
      }
    }
  `)

  return useMemo(
    () =>
      articles.allStrapiArticle.nodes.filter((node: Queries.STRAPI_ARTICLE) => {
        return locale === node.locale && slug === node.slug
      })[0].title,
    [articles, locale, slug],
  )
}
