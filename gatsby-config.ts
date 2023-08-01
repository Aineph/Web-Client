/**
 * Created by Aineph for web-client.
 * Started on 19/07/2023.
 */

import type { GatsbyConfig } from "gatsby"
import dotenv from "dotenv"

dotenv.config({
  path: ".env",
})

const strapiConfig = {
  apiURL: process.env.GATSBY_STRAPI_API_URL,
  accessToken: process.env.STRAPI_TOKEN,
  collectionTypes: [
    {
      singularName: "article",
      pluginOptions: {
        i18n: {
          locale: "all",
        },
      },
    },
    {
      singularName: "article-category",
      pluginOptions: {
        i18n: {
          locale: "all",
        },
      },
    },
    {
      singularName: "audio-track",
    },
    {
      singularName: "coding-framework",
    },
    {
      singularName: "coding-language",
    },
    {
      singularName: "experience",
      pluginOptions: {
        i18n: {
          locale: "all",
        },
      },
    },
    {
      singularName: "gear",
      pluginOptions: {
        i18n: {
          locale: "all",
        },
      },
    },
    {
      singularName: "link",
    },
    {
      singularName: "project",
    },
    {
      singularName: "service",
      pluginOptions: {
        i18n: {
          locale: "all",
        },
      },
    },
    {
      singularName: "visitor-action",
      pluginOptions: {
        i18n: {
          locale: "all",
        },
      },
    },
  ],
  singleTypes: [
    {
      singularName: "background-image",
    },
    {
      singularName: "constant",
      pluginOptions: {
        i18n: {
          locale: "all",
        },
      },
    },
    {
      singularName: "content",
      pluginOptions: {
        i18n: {
          locale: "all",
        },
      },
    },
  ],
}

const config: GatsbyConfig = {
  graphqlTypegen: true,
  plugins: [
    {
      resolve: "@chakra-ui/gatsby-plugin",
      options: {
        resetCSS: true,
        portalZIndex: undefined,
      },
    },
    {
      resolve: `gatsby-plugin-breadcrumb`,
      options: {
        useAutoGen: true,
        autoGenHomeLabel: "home",
        exclude: [
          `**/dev-404-page/**`,
          `**/404/**`,
          `**/404.html`,
          `**/offline-plugin-app-shell-fallback/**`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [process.env.GA_TRACKING_ID],
        gtagConfig: {
          anonymize_ip: true,
          cookie_expires: 0,
        },
        pluginConfig: {
          head: true,
          origin: "https://www.googletagmanager.com",
          respectDNT: true,
        },
      },
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: process.env.GTM_TRACKING_ID,
        includeInDevelopment: false,
        defaultDataLayer: { platform: "gatsby" },
        enableWebVitalsTracking: true,
      },
    },
    "gatsby-plugin-image",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-netlify",
    {
      resolve: "gatsby-plugin-react-i18next",
      options: {
        localeJsonSourceName: "locale",
        languages: ["en", "fr"],
        defaultLanguage: "en",
        trailingSlash: "always",
        i18nextOptions: {
          interpolation: {
            escapeValue: false,
          },
          keySeparator: false,
          nsSeparator: false,
        },
      },
    },
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        query: `
        {
          strapiConstant {
            url
          }
          allSitePage {
            nodes {
              path
            }
          }
        }
        `,
        resolveSiteUrl: (result: {
          strapiConstant: {
            url: string
          }
        }) => result.strapiConstant.url,
      },
    },
    {
      resolve: "gatsby-source-strapi",
      options: strapiConfig,
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/locales`,
        name: "locale",
      },
    },
    "gatsby-transformer-sharp",
  ],
}

export default config
