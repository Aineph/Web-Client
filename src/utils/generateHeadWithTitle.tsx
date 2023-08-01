/**
 * Created by Aineph for web-client.
 * Started on 19/07/2023.
 */

import React from "react"
import { HeadFC } from "gatsby"
import { PageContext } from "gatsby/internal"
import Seo from "../components/Seo"

interface HeadData {
  locales: {
    edges: Array<{
      node: {
        data: string
      }
    }>
  }
}

export const generateHeadWithTitle = (title: string) => {
  const component: HeadFC<HeadData, PageContext> = props => (
    <Seo
      language={props.pageContext.language}
      title={JSON.parse(props.data.locales.edges[0].node.data)[title]}
    />
  )
  return component
}
