/**
 * Created by Aineph for web-client.
 * Started on 19/07/2023.
 */

import { Card, CardBody, CardHeader, Heading, Image } from "@chakra-ui/react"
import * as React from "react"

interface HomeServicesCardProps {
  description: string
  iconUrl: string
  title: string
}

const HomeServicesCard: React.FC<HomeServicesCardProps> = service => (
  <Card>
    <CardHeader display={"flex"} flexDirection={"column"}>
      <Image
        alignSelf={"center"}
        color={"primary"}
        height={"50px"}
        width={"50px"}
        src={service.iconUrl}
      />
      <Heading as={"h3"} textAlign={"center"}>
        {service.title}
      </Heading>
    </CardHeader>
    <CardBody>{service.description}</CardBody>
  </Card>
)

export default React.memo(HomeServicesCard)
