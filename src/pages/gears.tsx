/**
 * Created by Aineph for web-client.
 * Started on 19/07/2023.
 */

import { graphql } from "gatsby"
import { generateHeadWithTitle } from "../utils/generateHeadWithTitle"
import GearsPage from "../components/pages/Gears"

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
      gears {
        url
      }
    }
    constants: strapiConstant(locale: { eq: $language }) {
      title
    }
    content: strapiContent(locale: { eq: $language }) {
      gears {
        data {
          gears
        }
      }
    }
    gears: allStrapiGear(
      filter: { locale: { eq: $language } }
      sort: { strapi_id: ASC }
    ) {
      nodes {
        category
        content {
          data {
            content
          }
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

export const Head = generateHeadWithTitle("gears")

export default GearsPage
