/**
 * Created by Aineph for web-client.
 * Started on 19/07/2023.
 */

import React, { ReactNode } from "react"
import Layout from "../Layout"

interface HomeLayoutProps {
  children: ReactNode
  links: Array<Queries.STRAPI_LINK>
  title: string
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children, links }) => (
  <div>
    <Layout links={links}>{children}</Layout>
  </div>
)

export default React.memo(HomeLayout)
