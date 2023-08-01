/**
 * Created by Aineph for web-client.
 * Started on 19/07/2023.
 */

import { Box, Button, Divider, Heading, Link, Text } from "@chakra-ui/react"
import * as React from "react"
import { scaleUpAnimation } from "../../../../utils/animations"
import { Trans } from "react-i18next"

interface HomeHeadProps {
  backgroundImageUrl: string
  introduction: string
  title: string
  quoteUrl: string
  meetingUrl: string
}

const HomeHead: React.FC<HomeHeadProps> = ({
  backgroundImageUrl,
  introduction,
  title,
  quoteUrl,
  meetingUrl,
}) => (
  <Box
    backgroundAttachment={"fixed"}
    backgroundImage={backgroundImageUrl}
    backgroundRepeat={"no-repeat"}
    backgroundSize={"cover"}
    display={"flex"}
    flexDirection={"column"}
    justifyContent={"center"}
    sx={{
      "@supports (-webkit-touch-callout: inherit)": {
        backgroundAttachment: "scroll",
      },
    }}
  >
    <Box
      display={"flex"}
      flexDirection={"column"}
      marginTop={"10%"}
      marginX={"10%"}
      maxWidth={"80%"}
    >
      <Heading
        alignSelf={"center"}
        as={"h1"}
        color={"white"}
        fontSize={"4em"}
        fontWeight={"extrabold"}
        lineHeight={"1em"}
        margin={"20px"}
      >
        {title}
      </Heading>
      <Divider
        alignSelf={"center"}
        animation={`${scaleUpAnimation} 2s linear forwards`}
        borderBottomWidth={"2px"}
        borderColor={"white"}
        maxWidth={"40%"}
      />
      <Text
        alignSelf={"center"}
        color={"white"}
        fontSize={"2em"}
        fontWeight={"semibold"}
        lineHeight={"1em"}
        margin={"20px"}
        textAlign={"center"}
      >
        {introduction}
      </Text>
    </Box>
    <Box
      display={"flex"}
      flexDirection={"row"}
      flexWrap={"wrap"}
      justifyContent={"space-evenly"}
      marginBottom={"5%"}
      marginX={"5%"}
    >
      <Button
        as={Link}
        variant={"outline"}
        color={"white"}
        href={quoteUrl}
        margin={"10px"}
        textAlign={"center"}
        _hover={{
          bgColor: "white",
          color: "black",
          textDecoration: "none",
        }}
      >
        <Trans>requestQuote</Trans>
      </Button>
      <Button
        as={Link}
        variant={"outline"}
        color={"white"}
        href={meetingUrl}
        margin={"10px"}
        textAlign={"center"}
        _hover={{
          bgColor: "white",
          color: "black",
          textDecoration: "none",
        }}
      >
        <Trans>requestMeeting</Trans>
      </Button>
    </Box>
  </Box>
)

export default React.memo(HomeHead)
