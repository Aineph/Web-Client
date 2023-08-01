/**
 * Created by Aineph for web-client.
 * Started on 28/07/2023.
 */

import React, { useMemo } from "react"
import {
  Box,
  Grid,
  Heading,
  Icon,
  Image,
  Link as ChakraLink,
  Tag,
  Text,
} from "@chakra-ui/react"
import { IoCalendarOutline, IoPersonOutline } from "react-icons/io5"
import { Link, useI18next } from "gatsby-plugin-react-i18next"

interface ArticleViewProps {
  article: Queries.STRAPI_ARTICLE
  onAuthorSelect: (author: string) => void
  onCategorySelect: (author: string) => void
}

const ArticleView: React.FC<ArticleViewProps> = ({
  article,
  onAuthorSelect,
  onCategorySelect,
}) => {
  const { language } = useI18next()
  const publicationDate = useMemo(
    () =>
      new Date(article.publishedAt || Date.now()).toLocaleDateString(language),
    [article.publishedAt, language],
  )

  return (
    <Box display={"flex"} flexDirection={"column"} gap={"5px"}>
      <ChakraLink
        as={Link}
        to={`/blog/${article.slug}`}
        _hover={{ textDecoration: "none" }}
      >
        <Heading as={"h2"} color={"primary"}>
          {article.title}
        </Heading>
      </ChakraLink>
      <Box
        display={"flex"}
        flexDirection={"row"}
        gap={"20px"}
        justifyContent={"flex-start"}
      >
        <Box
          cursor={"pointer"}
          display={"flex"}
          flexDirection={"row"}
          onClick={() => onAuthorSelect(article.author?.username || "")}
          _hover={{ textDecoration: "underline" }}
        >
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
      <Box
        display={"flex"}
        flexDirection={"row"}
        gap={"10px"}
        justifyContent={"flex-start"}
      >
        {article.categories?.map(category => (
          <Tag
            bgColor={"primary"}
            color={"white"}
            cursor={"pointer"}
            key={category?.name || ""}
            onClick={() => onCategorySelect(category?.name || "")}
          >
            {category?.name || ""}
          </Tag>
        ))}
      </Box>
      <ChakraLink
        as={Link}
        to={`/blog/${article.slug}`}
        _hover={{ textDecoration: "none" }}
      >
        <Grid
          gap={5}
          templateColumns={{
            base: "1fr",
            md: "1fr 2fr",
          }}
        >
          <Box>
            {article.image ? (
              <Image
                alt={article.title || ""}
                height={"auto"}
                src={article.image.url || ""}
                width={"100%"}
              />
            ) : null}
          </Box>
          <Text>{article.excerpt}</Text>
        </Grid>
      </ChakraLink>
    </Box>
  )
}

export default React.memo(ArticleView)
