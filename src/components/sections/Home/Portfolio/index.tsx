/**
 * Created by Aineph for web-client.
 * Started on 19/07/2023.
 */

import { Box, Divider, Grid, Heading } from "@chakra-ui/react"
import * as React from "react"
import HomePortfolioCard from "./Card"
import { Trans } from "react-i18next"

interface HomePortfolioProps {
  projects: Array<Queries.STRAPI_PROJECT>
}

const HomePortfolio: React.FC<HomePortfolioProps> = ({ projects }) => (
  <Box display={"flex"} flexDirection={"column"}>
    <Heading
      alignSelf={"center"}
      as={"h2"}
      fontSize={"3em"}
      padding={"10px"}
      textAlign={"center"}
    >
      <Trans>portfolio</Trans>
    </Heading>
    <Divider
      alignSelf={"center"}
      borderBottomColor={"primary"}
      width={"50px"}
    />
    <Grid
      marginY={"50px"}
      templateColumns={{
        base: "repeat(1, 1fr)",
        sm: "repeat(2, 1fr)",
        xl: "repeat(3, 1fr)",
      }}
    >
      {projects.map(project => (
        <HomePortfolioCard key={project.name} project={project} />
      ))}
    </Grid>
  </Box>
)

export default React.memo(HomePortfolio)
