/**
 * Created by Aineph for web-client.
 * Started on 19/07/2023.
 */

import { Box, Divider, Heading, Image } from "@chakra-ui/react"
import * as React from "react"
import { useMemo } from "react"
import { Trans } from "react-i18next"

const FREELANCE_CONTRACT_TYPE = "freelance"

interface HomeClientsProps {
  experiences: Array<Queries.STRAPI_EXPERIENCE>
}

const HomeClients: React.FC<HomeClientsProps> = ({ experiences }) => {
  const clients = useMemo(
    () =>
      experiences.filter(
        experience => experience.contractType === FREELANCE_CONTRACT_TYPE,
      ),
    [experiences],
  )

  return (
    <Box display={"flex"} flexDirection={"column"}>
      <Heading
        alignSelf={"center"}
        as={"h2"}
        fontSize={"3em"}
        padding={"10px"}
        textAlign={"center"}
      >
        <Trans>clients</Trans>
      </Heading>
      <Divider
        alignSelf={"center"}
        borderBottomColor={"primary"}
        width={"50px"}
      />
      <Box
        alignItems={"center"}
        display={"flex"}
        flexDirection={"row"}
        flexWrap={"wrap"}
        justifyContent={"space-evenly"}
        marginX={"25px"}
        marginY={"50px"}
      >
        {clients.map(client => (
          <Image
            alt={client.companyName || ""}
            height={"auto"}
            key={client.companyName}
            margin={"25px"}
            maxWidth={{
              base: "100%",
              sm: "400px",
            }}
            src={client.companyLogo?.url || ""}
          />
        ))}
      </Box>
    </Box>
  )
}

export default React.memo(HomeClients)
