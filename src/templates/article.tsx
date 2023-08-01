/**
 * Created by Aineph for web-client.
 * Started on 19/07/2023.
 */

import { graphql } from "gatsby"
import { generateArticleHead } from "../utils/generateArticleHead"
import ArticleTemplate from "../components/templates/Article"

export const query = graphql`
  query ($language: String!, $slug: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    article: strapiArticle(locale: { eq: $language }, slug: { eq: $slug }) {
      title
      image {
        url
      }
      slug
      publishedAt
      content {
        data {
          content
        }
      }
      author {
        username
      }
      categories {
        name
      }
      tags {
        name
      }
    }
    authors: allStrapiUser {
      nodes {
        username
      }
    }
    backgroundImage: strapiBackgroundImage {
      blog {
        url
      }
    }
    categories: allStrapiArticleCategory(
      filter: { locale: { eq: $language } }
    ) {
      nodes {
        name
      }
    }
    constants: strapiConstant(locale: { eq: $language }) {
      title
    }
    links: allStrapiLink {
      nodes {
        name
        username
        url
        logo {
          url
        }
      }
    }
    tags: allStrapiArticleTag(filter: { locale: { eq: $language } }) {
      nodes {
        name
      }
    }
  }
`

export const Head = generateArticleHead()

export default ArticleTemplate
