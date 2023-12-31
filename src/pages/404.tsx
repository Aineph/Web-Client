/**
 * Created by Aineph for web-client.
 * Started on 19/07/2023.
 */

import * as React from "react"
import { graphql } from "gatsby"
import { generateHeadWithTitle } from "../utils/generateHeadWithTitle"
import NotFoundPage from "../components/pages/NotFound"

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
    backgroundImage: strapiBackgroundImage {
      notFound {
        url
      }
    }
    constants: strapiConstant(locale: { eq: $language }) {
      title
    }
    content: strapiContent(locale: { eq: $language }) {
      notFound {
        data {
          notFound
        }
      }
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
  }
`

export const Head = generateHeadWithTitle("notFound")

export default NotFoundPage
