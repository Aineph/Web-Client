/**
 * Created by Aineph for web-client.
 * Started on 19/07/2023.
 */

import { Box, Divider, Grid, Heading } from "@chakra-ui/react"
import * as React from "react"
import { Trans } from "react-i18next"
import HomeServicesCard from "./Card"

interface HomeServicesProps {
  services: Array<Queries.STRAPI_SERVICE>
}

const HomeServices: React.FC<HomeServicesProps> = ({ services }) => (
  <Box display={"flex"} flexDirection={"column"}>
    <Heading
      alignSelf={"center"}
      as={"h2"}
      fontSize={"3em"}
      padding={"10px"}
      textAlign={"center"}
    >
      <Trans>services</Trans>
    </Heading>
    <Divider
      alignSelf={"center"}
      borderBottomColor={"primary"}
      width={"50px"}
    />
    <Grid
      gap={10}
      marginX={"25px"}
      marginY={"50px"}
      templateColumns={{
        base: "repeat(1, 1fr)",
        md: "repeat(2, 1fr)",
        xl: "repeat(4, 1fr)",
      }}
    >
      {services.map(service => (
        <HomeServicesCard
          key={service.title}
          description={service.description || ""}
          iconUrl={service.icon?.url || ""}
          title={service.title || ""}
        />
      ))}
    </Grid>
  </Box>
)

export default React.memo(HomeServices)
