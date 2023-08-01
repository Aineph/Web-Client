/**
 * Created by Aineph for web-client.
 * Started on 19/07/2023.
 */

import * as React from "react"
import { ReactNode } from "react"
import "mediaelement/build/mediaelementplayer.min.css"
import Header from "../../sections/Header"
import Footer from "../../sections/Footer"
import { Box } from "@chakra-ui/react"

interface LayoutProps {
  children: ReactNode
  links: Array<Queries.STRAPI_LINK>
}

const Layout: React.FC<LayoutProps> = ({ children, links }) => (
  <Box>
    <Header />
    {children}
    <Footer links={links} />
  </Box>
)

export default React.memo(Layout)
