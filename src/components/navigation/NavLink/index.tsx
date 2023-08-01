/**
 * Created by Aineph for web-client.
 * Started on 19/07/2023.
 */

import React, { ReactNode } from "react"
import { Link as ChakraLink } from "@chakra-ui/react"
import { Link } from "gatsby-plugin-react-i18next"

interface NavLinkProps {
  children: ReactNode
  href: string
}

const NavLink: React.FC<NavLinkProps> = ({ children, href }) => (
  <ChakraLink
    as={Link}
    px={2}
    py={1}
    color={"secondary"}
    textTransform={"uppercase"}
    to={href}
    _hover={{
      color: "primary",
    }}
  >
    {children}
  </ChakraLink>
)

export default React.memo(NavLink)
