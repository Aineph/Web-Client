/**
 * Created by Aineph for web-client.
 * Started on 29/07/2023.
 */

import React, { useCallback, useMemo } from "react"
import { PageContext } from "gatsby/internal"
import { PageProps } from "gatsby"
import { Box, Grid } from "@chakra-ui/react"
import { useI18next } from "gatsby-plugin-react-i18next"
import Selection from "../../sections/Blog/ArticleSearch/AuthorSelection"
import ArticleLayout from "../../layouts/ArticleLayout"
import ArticleSEO from "../../sections/Article/ArticleSEO"
import { IoFolderOutline, IoPricetagOutline } from "react-icons/io5"

interface ArticleTemplateProps {
  article: Queries.STRAPI_ARTICLE
  authors: {
    nodes: Array<Queries.STRAPI_USER>
  }
  backgroundImage: Queries.STRAPI_BACKGROUND_IMAGE
  categories: {
    nodes: Array<Queries.STRAPI_ARTICLE_CATEGORY>
  }
  links: {
    nodes: Array<Queries.STRAPI_LINK>
  }
  tags: {
    nodes: Array<Queries.STRAPI_ARTICLE_TAG>
  }
}

const ArticleTemplate: React.FC<
  PageProps<ArticleTemplateProps, PageContext>
> = ({ data, pageContext }) => {
  const { navigate, t } = useI18next()

  const articleCategories = useMemo(
    () => data.article.categories?.map(category => category?.name || "") || [],
    [data.article.categories],
  )

  const articleTags = useMemo(
    () => data.article.tags?.map(tag => tag?.name || "") || [],
    [data.article.tags],
  )

  const onAuthorSelect = useCallback(
    (author: string) =>
      navigate("/blog", {
        state: { author },
      }),
    [navigate],
  )

  const onCategorySelect = useCallback(
    (category: string) =>
      navigate("/blog", {
        state: { category },
      }),
    [navigate],
  )

  const onTagSelect = useCallback(
    (tag: string) =>
      navigate("/blog", {
        state: { tag },
      }),
    [navigate],
  )

  return (
    <ArticleLayout
      article={data.article}
      backgroundImageUrl={data.backgroundImage.blog?.url || ""}
      crumbs={pageContext.breadcrumb.crumbs}
      links={data.links.nodes}
      title={data.article.title || ""}
    >
      <Grid
        alignItems={"flex-start"}
        gap={20}
        templateColumns={{
          base: "1fr",
          xl: "2fr 1fr",
        }}
      >
        <Box display={"flex"} flexDirection={"column"} gap={10}>
          <section>
            <div
              className={"ck-content"}
              dangerouslySetInnerHTML={{
                __html: data.article.content?.data?.content || "",
              }}
            />
          </section>
          <Box display={"flex"} flexDirection={"column"} gap={5}>
            <ArticleSEO
              icon={IoFolderOutline}
              items={articleCategories}
              type={"category"}
            />
            <ArticleSEO
              icon={IoPricetagOutline}
              items={articleTags}
              type={"tag"}
            />
          </Box>
        </Box>
        <Box display={"flex"} flexDirection={"column"} gap={5}>
          <Selection
            items={data.authors.nodes.map(author => author.username || "")}
            onSelect={onAuthorSelect}
            selection={[]}
            title={t("authors")}
          />
          <Selection
            items={data.categories.nodes.map(category => category.name || "")}
            onSelect={onCategorySelect}
            selection={[]}
            title={t("categories")}
          />
          <Selection
            items={data.tags.nodes.map(tag => tag.name || "")}
            onSelect={onTagSelect}
            selection={[]}
            title={t("tags")}
          />
        </Box>
      </Grid>
    </ArticleLayout>
  )
}

export default React.memo(ArticleTemplate)
