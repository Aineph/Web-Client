/**
 * Created by Aineph for web-client.
 * Started on 19/07/2023.
 */

import * as React from "react"
import { useMemo } from "react"
import { Box, Image, Link as ChakraLink, Text } from "@chakra-ui/react"
import { Link, useI18next } from "gatsby-plugin-react-i18next"
import { navLinks } from "../../navigation/NavigationMenu"
import { Trans } from "react-i18next"
import { useMetadata } from "../../../hooks/useMetadata"

interface FooterProps {
  links: Array<Queries.STRAPI_LINK>
}

const Footer: React.FC<FooterProps> = ({ links }) => {
  const { language } = useI18next()
  const { title } = useMetadata(language)
  const currentYear = useMemo(() => new Date(Date.now()).getFullYear(), [])
  const formattedTitle = useMemo(() => (title || "").toUpperCase(), [title])

  return (
    <footer>
      <Box
        bgColor={"black"}
        color={"white"}
        display={"flex"}
        flexDirection={"row"}
        flexWrap={"wrap"}
        justifyContent={"space-evenly"}
        width={"100%"}
      >
        <Box display={"flex"} flexDirection={"column"} margin={"50px"}>
          <ChakraLink as={Link} marginY={"5px"} to={"/"}>
            <Trans>home</Trans>
          </ChakraLink>
          {navLinks.map(navLink => (
            <ChakraLink
              as={Link}
              key={navLink.label}
              marginY={"5px"}
              to={navLink.url}
            >
              <Trans>{navLink.label}</Trans>
            </ChakraLink>
          ))}
        </Box>
        <Box display={"flex"} flexDirection={"column"} margin={"50px"}>
          <Box
            display={"flex"}
            flexDirection={"row"}
            flexWrap={"wrap"}
            justifyContent={"space-evenly"}
          >
            {links.map(link => (
              <ChakraLink
                display={"flex"}
                flexDirection={"column"}
                href={link.url || ""}
                justifyContent={"center"}
                key={link.name}
                margin={"25px"}
              >
                <Image
                  alignSelf={"center"}
                  alt={link.name || ""}
                  height={"40px"}
                  marginY={"5px"}
                  src={link.logo?.url || ""}
                  width={"40px"}
                />
                <Text alignSelf={"center"} textAlign={"center"}>
                  @{link.username}
                </Text>
              </ChakraLink>
            ))}
          </Box>
          <Text marginTop={"25px"}>
            © {currentYear} {formattedTitle}, <Trans>builtWith</Trans>{" "}
            <a href="https://www.gatsbyjs.com">Gatsby</a>
          </Text>
        </Box>
      </Box>
    </footer>
  )
}

export default React.memo(Footer)
