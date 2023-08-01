/**
 * Created by Aineph for web-client.
 * Started on 29/07/2023.
 */

import React from "react"
import { HeadFC } from "gatsby"
import { PageContext } from "gatsby/internal"
import Seo from "../components/Seo"
import { useArticleTitle } from "../hooks/useArticleTitle"

interface HeadData {
  locales: {
    edges: Array<{
      node: {
        data: string
      }
    }>
  }
}

export const generateArticleHead = () => {
  const component: HeadFC<HeadData, PageContext> = props => {
    const title = useArticleTitle(
      props.pageContext.language,
      props.pageContext.slug,
    )

    return <Seo language={props.pageContext.language} title={title} />
  }
  return component
}
