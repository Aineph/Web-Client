/**
 * Created by Aineph for web-client.
 * Started on 28/07/2023.
 */

import React, { useCallback, useMemo, useState } from "react"
import { Box, Divider, Grid, Text } from "@chakra-ui/react"
import ArticleView from "../ArticleView"
import { Trans, useTranslation } from "react-i18next"
import BlogPlaylist from "../BlogPlaylist"
import SearchBar from "./SearchBar"
import Selection from "./AuthorSelection"

interface ArticleSearchProps {
  articles: Array<Queries.STRAPI_ARTICLE>
  authors: Array<Queries.STRAPI_USER>
  categories: Array<Queries.STRAPI_ARTICLE_CATEGORY>
  preselectedAuthors: Array<string>
  preselectedCategories: Array<string>
  preselectedTags: Array<string>
  tags: Array<Queries.STRAPI_ARTICLE_TAG>
  tracks: Array<Queries.STRAPI_AUDIO_TRACK>
}

const ArticleSearch: React.FC<ArticleSearchProps> = ({
  articles,
  authors,
  categories,
  preselectedAuthors,
  preselectedCategories,
  preselectedTags,
  tags,
  tracks,
}) => {
  const { t } = useTranslation()

  const [searchCriteria, setSearchCriteria] = useState("")
  const [selectedAuthors, setSelectedAuthors] = useState(preselectedAuthors)
  const [selectedCategories, setSelectedCategories] = useState(
    preselectedCategories,
  )
  const [selectedTags, setSelectedTags] = useState(preselectedTags)

  const onSearchCriteriaChange = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      setSearchCriteria(event.currentTarget.value)
    },
    [],
  )

  const onAuthorSelect = useCallback(
    (author: string) => {
      if (selectedAuthors.includes(author)) {
        setSelectedAuthors(
          selectedAuthors.filter(selectedAuthor => selectedAuthor !== author),
        )
      } else {
        setSelectedAuthors([...selectedAuthors, author])
      }
    },
    [selectedAuthors],
  )

  const onCategorySelect = useCallback(
    (category: string) => {
      if (selectedCategories.includes(category)) {
        setSelectedCategories(
          selectedCategories.filter(
            selectedCategory => selectedCategory !== category,
          ),
        )
      } else {
        setSelectedCategories([...selectedCategories, category])
      }
    },
    [selectedCategories],
  )

  const onTagSelect = useCallback(
    (tag: string) => {
      if (selectedTags.includes(tag)) {
        setSelectedTags(selectedTags.filter(selectedTag => selectedTag !== tag))
      } else {
        setSelectedTags([...selectedTags, tag])
      }
    },
    [selectedTags],
  )

  const filteredArticles = useMemo(() => {
    const processedSearchCriteria = searchCriteria.toLowerCase()
    return articles.filter(article => {
      const articleAuthors = [article.author?.username]
      const articleCategories =
        article.categories?.map(category => category?.name) || []
      const articleTags = article.tags?.map(tag => tag?.name) || []

      const searchMatchesArticle =
        article.title?.toLowerCase().includes(processedSearchCriteria) ||
        article.excerpt?.toLowerCase().includes(processedSearchCriteria)

      return (
        searchMatchesArticle &&
        !selectedAuthors.some(author => !articleAuthors.includes(author)) &&
        !selectedCategories.some(
          category => !articleCategories.includes(category),
        ) &&
        !selectedTags.some(tag => !articleTags.includes(tag))
      )
    })
  }, [
    articles,
    searchCriteria,
    selectedAuthors,
    selectedCategories,
    selectedTags,
  ])

  return (
    <Grid
      alignItems={"flex-start"}
      gap={20}
      templateColumns={{
        base: "1fr",
        xl: "2fr 1fr",
      }}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={5}
        order={{ base: 1, xl: 2 }}
      >
        <SearchBar
          onChange={onSearchCriteriaChange}
          placeholder={t("search")}
          value={searchCriteria}
        />
        <Selection
          items={authors.map(author => author.username || "")}
          onSelect={onAuthorSelect}
          selection={selectedAuthors}
          title={t("authors")}
        />
        <Selection
          items={categories.map(category => category.name || "")}
          onSelect={onCategorySelect}
          selection={selectedCategories}
          title={t("categories")}
        />
        <Selection
          items={tags.map(tag => tag.name || "")}
          onSelect={onTagSelect}
          selection={selectedTags}
          title={t("tags")}
        />
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={10}
        order={{ base: 2, xl: 1 }}
      >
        {filteredArticles.length ? (
          filteredArticles.map(article => (
            <ArticleView
              article={article}
              key={article.slug}
              onAuthorSelect={onAuthorSelect}
              onCategorySelect={onCategorySelect}
            />
          ))
        ) : articles.length ? (
          <Text>
            <Trans>noArticleFound</Trans>
          </Text>
        ) : (
          <Text>
            <Trans>noArticleAvailable</Trans>
          </Text>
        )}
      </Box>
      <Box order={3} />
      <Box display={"flex"} flexDirection={"column"} gap={5} order={4}>
        <Divider
          alignSelf={"center"}
          borderBottomColor={"primary"}
          margin={"20px"}
          width={"200px"}
        />
        <BlogPlaylist tracks={tracks} />
      </Box>
    </Grid>
  )
}

export default React.memo(ArticleSearch)
