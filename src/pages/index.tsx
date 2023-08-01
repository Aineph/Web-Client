/**
 * Created by Aineph for web-client.
 * Started on 19/07/2023.
 */

import { graphql } from "gatsby"
import HomePage from "../components/pages/Home"
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
      home {
        url
      }
    }
    constants: strapiConstant(locale: { eq: $language }) {
      title
      introduction
      quoteUrl
      meetingUrl
    }
    experiences: allStrapiExperience(
      filter: { locale: { eq: $language } }
      sort: { startDate: ASC }
    ) {
      nodes {
        companyLogo {
          url
        }
        companyName
        contractType
        startDate
        endDate
      }
    }
    frameworks: allStrapiCodingFramework {
      nodes {
        name
        experiences {
          startDate
          endDate
        }
      }
    }
    languages: allStrapiCodingLanguage {
      nodes {
        name
        experiences {
          startDate
          endDate
        }
      }
    }
    links: allStrapiLink(sort: { strapi_id: ASC }) {
      nodes {
        name
        username
        url
        logo {
          url
        }
      }
    }
    projects: allStrapiProject(sort: { createdAt: DESC }) {
      nodes {
        name
        description
        createdAt
        url
        imageUrl
      }
    }
    services: allStrapiService(
      filter: { locale: { eq: $language } }
      sort: { strapi_id: ASC }
    ) {
      nodes {
        icon {
          url
        }
        title
        description
      }
    }
  }
`

export const Head = generateHeadWithTitle("home")

export default HomePage
