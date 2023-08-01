/**
 * Created by Aineph for web-client.
 * Started on 19/07/2023.
 */

import React, { ReactNode, useMemo } from "react"
import PageLayout from "../PageLayout"
import { Box, Icon, Text } from "@chakra-ui/react"
import { IoCalendarOutline, IoPersonOutline } from "react-icons/io5"
import { useI18next } from "gatsby-plugin-react-i18next"

interface ArticleLayoutProps {
  article: Queries.STRAPI_ARTICLE
  backgroundImageUrl: string
  crumbs: Array<{
    crumbLabel: string
    pathname: string
  }>
  children: ReactNode
  links: Array<Queries.STRAPI_LINK>
  subtitleContent?: ReactNode
  title: string
}

const ArticleLayout: React.FC<ArticleLayoutProps> = ({
  article,
  backgroundImageUrl,
  children,
  crumbs,
  links,
  title,
}) => {
  const { language } = useI18next()
  const publicationDate = useMemo(
    () =>
      new Date(article.publishedAt || Date.now()).toLocaleDateString(language),
    [article.publishedAt, language],
  )

  return (
    <PageLayout
      backgroundImageUrl={article.image?.url || backgroundImageUrl}
      crumbs={crumbs}
      links={links}
      subtitleContent={
        <Box
          display={"flex"}
          flexDirection={"row"}
          gap={"20px"}
          justifyContent={"flex-start"}
        >
          <Box display={"flex"} flexDirection={"row"}>
            <Icon alignSelf={"center"} as={IoPersonOutline} />
            <Text alignSelf={"center"} marginX={"5px"}>
              {article.author?.username}
            </Text>
          </Box>
          <Box display={"flex"} flexDirection={"row"}>
            <Icon alignSelf={"center"} as={IoCalendarOutline} />
            <Text alignSelf={"center"} marginX={"5px"}>
              {publicationDate}
            </Text>
          </Box>
        </Box>
      }
      title={title}
    >
      {children}
    </PageLayout>
  )
}

export default React.memo(ArticleLayout)
