/**
 * Created by Aineph for web-client.
 * Started on 19/07/2023.
 */

import * as React from "react"
import { useTranslation } from "react-i18next"
import { PageProps } from "gatsby"
import { PageContext } from "gatsby/internal"
import PageLayout from "../../layouts/PageLayout"
import ArticleSearch from "../../sections/Blog/ArticleSearch"

interface BlogPageProps {
  articles: {
    nodes: Array<Queries.STRAPI_ARTICLE>
  }
  authors: {
    nodes: Array<Queries.STRAPI_USER>
  }
  backgroundImage: Queries.STRAPI_BACKGROUND_IMAGE
  constants: Queries.STRAPI_CONSTANT
  links: {
    nodes: Array<Queries.STRAPI_LINK>
  }
  categories: {
    nodes: Array<Queries.STRAPI_ARTICLE_CATEGORY>
  }
  tags: {
    nodes: Array<Queries.STRAPI_ARTICLE_TAG>
  }
  tracks: {
    nodes: Array<Queries.STRAPI_AUDIO_TRACK>
  }
}

interface BlogPageLocation {
  author?: string
  category?: string
  tag?: string
}

const BlogPage: React.FC<
  PageProps<BlogPageProps, PageContext, BlogPageLocation>
> = ({ data, location, pageContext }) => {
  const { t } = useTranslation()

  return (
    <PageLayout
      backgroundImageUrl={data.backgroundImage.blog?.url || ""}
      crumbs={pageContext.breadcrumb.crumbs}
      links={data.links.nodes}
      title={t("blog")}
    >
      <ArticleSearch
        articles={data.articles.nodes}
        authors={data.authors.nodes}
        categories={data.categories.nodes}
        preselectedAuthors={
          location.state?.author ? [location.state.author] : []
        }
        preselectedCategories={
          location.state?.category ? [location.state.category] : []
        }
        preselectedTags={location.state?.tag ? [location.state.tag] : []}
        tags={data.tags.nodes}
        tracks={data.tracks.nodes}
      />
    </PageLayout>
  )
}

export default React.memo(BlogPage)
