/**
 * Created by Aineph for web-client.
 * Started on 31/07/2023.
 */

import React from "react"
import { Box, Icon, Link as ChakraLink } from "@chakra-ui/react"
import { Link } from "gatsby-plugin-react-i18next"

interface ArticleSEOProps {
  icon: React.FC
  items: Array<string>
  type: string
}

const ArticleSEO: React.FC<ArticleSEOProps> = ({ icon, items, type }) => (
  <Box alignItems={"center"} display={"flex"} flexDirection={"row"} gap={"5px"}>
    <Icon as={icon} boxSize={8} />
    {items.map(item => (
      <ChakraLink
        as={Link}
        color={"primary"}
        key={item}
        state={{ [type]: item || "" }}
        to={"/blog"}
      >
        {item}
      </ChakraLink>
    ))}
  </Box>
)

export default React.memo(ArticleSEO)
