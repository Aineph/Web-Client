/**
 * Created by Aineph for web-client.
 * Started on 29/07/2023.
 */

import { GatsbyNode } from "gatsby"
import { resolve } from "path"

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
  reporter,
}) => {
  const { createPage } = actions
  const articlesQuery = await graphql<{
    articles: {
      nodes: Array<Queries.STRAPI_ARTICLE>
    }
  }>(`
    query {
      articles: allStrapiArticle(filter: { locale: { eq: "en" } }) {
        nodes {
          slug
        }
      }
    }
  `)

  if (articlesQuery.errors) {
    reporter.panicOnBuild(
      `There was an error loading dynamic pages`,
      articlesQuery.errors,
    )
    return
  }
  const articles = articlesQuery.data?.articles.nodes || []
  articles.forEach(article => {
    createPage({
      component: resolve(__dirname, "./src/templates/article.tsx"),
      context: {
        slug: article.slug,
      },
      defer: false,
      path: `/blog/${article.slug}`,
    })
  })
}
