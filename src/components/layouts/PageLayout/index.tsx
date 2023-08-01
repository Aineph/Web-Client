/**
 * Created by Aineph for web-client.
 * Started on 19/07/2023.
 */

import React, { ReactNode } from "react"
import Layout from "../Layout"
import { Box, Divider, Heading } from "@chakra-ui/react"
import BreadCrumb from "../../navigation/BreadCrumb"
import { scaleUpAnimation } from "../../../utils/animations"

interface PageLayoutProps {
  backgroundImageUrl: string
  crumbs: Array<{
    crumbLabel: string
    pathname: string
  }>
  children: ReactNode
  links: Array<Queries.STRAPI_LINK>
  subtitleContent?: ReactNode
  title: string
}

const PageLayout: React.FC<PageLayoutProps> = ({
  backgroundImageUrl,
  children,
  crumbs,
  links,
  subtitleContent,
  title,
}) => (
  <div>
    <Layout links={links}>
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"center"}
        marginBottom={"25px"}
        paddingTop={"100px"}
        position={"relative"}
      >
        <BreadCrumb crumbLabel={title} crumbs={crumbs} />
      </Box>
      <Box
        backgroundAttachment={"fixed"}
        backgroundImage={backgroundImageUrl}
        backgroundRepeat={"no-repeat"}
        backgroundSize={"cover"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        position={"relative"}
        sx={{
          "@supports (-webkit-touch-callout: inherit)": {
            backgroundAttachment: "scroll",
          },
        }}
        _after={{
          backgroundColor: "rgba(0, 0, 0, .5)",
          content: '""',
          height: "100%",
          left: 0,
          position: "absolute",
          top: 0,
          width: "100%",
        }}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          marginY={"150px"}
          marginX={"150px"}
          maxWidth={"80%"}
        >
          <Heading
            alignSelf={"center"}
            as={"h1"}
            color={"white"}
            fontSize={"2em"}
            fontWeight={"extrabold"}
            lineHeight={"1em"}
            margin={"20px"}
            textAlign={"center"}
            zIndex={1}
          >
            {title}
          </Heading>
          <Divider
            alignSelf={"center"}
            animation={`${scaleUpAnimation} 1s linear forwards`}
            borderBottomWidth={"2px"}
            borderColor={"primary"}
            width={"50px"}
            zIndex={1}
          />
          <Box alignSelf={"center"} color={"white"} margin={"20px"} zIndex={1}>
            {subtitleContent}
          </Box>
        </Box>
      </Box>
      <Box
        marginX={{
          base: "10px",
          sm: "15%",
        }}
        marginY={"50px"}
      >
        {children}
      </Box>
    </Layout>
  </div>
)

export default React.memo(PageLayout)
