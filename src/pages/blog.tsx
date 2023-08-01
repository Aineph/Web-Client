/**
 * Created by Aineph for web-client.
 * Started on 19/07/2023.
 */

import { graphql } from "gatsby"
import BlogPage from "../components/pages/Blog"
import { generateHeadWithTitle } from "../utils/generateHeadWithTitle"

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    articles: allStrapiArticle(
      filter: { locale: { eq: $language } }
      sort: { publishedAt: DESC }
    ) {
      nodes {
        title
        image {
          url
        }
        slug
        publishedAt
        excerpt
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
    categories: allStrapiArticleCategory(
      filter: { locale: { eq: $language } }
    ) {
      nodes {
        name
      }
    }
    tags: allStrapiArticleTag(filter: { locale: { eq: $language } }) {
      nodes {
        name
      }
    }
    tracks: allStrapiAudioTrack {
      nodes {
        title
        author {
          username
        }
        file {
          url
        }
      }
    }
  }
`

export const Head = generateHeadWithTitle("blog")

export default BlogPage
