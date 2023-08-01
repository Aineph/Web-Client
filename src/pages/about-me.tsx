/**
 * Created by Aineph for web-client.
 * Started on 19/07/2023.
 */

import { graphql } from "gatsby"
import AboutMePage from "../components/pages/AboutMe"
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
    backgroundImage: strapiBackgroundImage {
      aboutMe {
        url
      }
    }
    constants: strapiConstant(locale: { eq: $language }) {
      title
    }
    content: strapiContent(locale: { eq: $language }) {
      aboutMe {
        data {
          aboutMe
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

export const Head = generateHeadWithTitle("aboutMe")

export default AboutMePage
