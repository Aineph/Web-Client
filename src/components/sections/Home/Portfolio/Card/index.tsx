/**
 * Created by Aineph for web-client.
 * Started on 19/07/2023.
 */

import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Heading,
  Link,
  Text,
} from "@chakra-ui/react"
import { growAnimation } from "../../../../../utils/animations"
import * as React from "react"

interface HomePortfolioCardProps {
  project: Queries.STRAPI_PROJECT
}

const HomePortfolioCard: React.FC<HomePortfolioCardProps> = ({ project }) => {
  const projectYear = new Date(project.createdAt || Date.now()).getFullYear()

  return (
    <Card
      as={Link}
      backgroundImage={`url(${project.imageUrl})`}
      backgroundSize={"cover"}
      href={project.url || ""}
      _after={{
        backgroundColor: "rgba(0, 0, 0, .5)",
        content: '""',
        height: "100%",
        left: 0,
        position: "absolute",
        top: 0,
        width: "100%",
      }}
      _hover={{
        animation: `${growAnimation} .1s linear forwards`,
        textDecoration: "none",
      }}
    >
      <CardHeader
        display={"flex"}
        flexDirection={"column"}
        gap={"5px"}
        zIndex={1}
      >
        <Heading as={"h3"} color={"white"} textAlign={"center"}>
          {project.name}
        </Heading>
        <Divider
          alignSelf={"center"}
          borderBottomColor={"primary"}
          borderBottomWidth={"2px"}
          width={"50px"}
        />
        <Text color={"white"} fontWeight={"bold"} textAlign={"center"}>
          {projectYear}
        </Text>
      </CardHeader>
      <CardBody marginY={"25px"} zIndex={1}>
        <Text color={"white"}>{project.description}</Text>
      </CardBody>
    </Card>
  )
}

export default React.memo(HomePortfolioCard)
