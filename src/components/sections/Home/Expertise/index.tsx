/**
 * Created by Aineph for web-client.
 * Started on 19/07/2023.
 */

import { Box, Divider, Heading } from "@chakra-ui/react"
import * as React from "react"
import { useMemo } from "react"
import { Trans } from "react-i18next"
import { differenceInDays } from "date-fns"
import LanguageChart from "./LanguageChart"
import FrameworkChart from "./FrameworkChart"

interface HomeExpertiseProps {
  frameworks: Array<Queries.STRAPI_CODING_FRAMEWORK>
  languages: Array<Queries.STRAPI_CODING_LANGUAGE>
}

const computeExperienceScore = (
  label: string,
  experiences: Queries.Maybe<
    ReadonlyArray<Queries.Maybe<Queries.STRAPI_EXPERIENCE>>
  >,
) => {
  const value =
    experiences?.reduce(
      (score, experience) =>
        score +
        differenceInDays(
          new Date(experience?.endDate || Date.now()),
          new Date(experience?.startDate || Date.now()),
        ),
      0,
    ) || 0

  return {
    label,
    value,
  }
}

const HomeExpertise: React.FC<HomeExpertiseProps> = ({
  frameworks,
  languages,
}) => {
  const frameworkValues = useMemo(
    () =>
      frameworks
        .map(framework =>
          computeExperienceScore(framework.name || "", framework.experiences),
        )
        .sort((first, second) => second.value - first.value),
    [frameworks],
  )
  const languageValues = useMemo(
    () =>
      languages
        .map(language =>
          computeExperienceScore(language.name || "", language.experiences),
        )
        .sort((first, second) => second.value - first.value),
    [languages],
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
        <Trans>expertise</Trans>
      </Heading>
      <Divider
        alignSelf={"center"}
        borderBottomColor={"primary"}
        width={"50px"}
      />
      <Box
        display={"flex"}
        flexDirection={"column"}
        marginX={"25px"}
        marginY={"50px"}
      >
        <Box
          display={"flex"}
          flexDirection={"row"}
          flexWrap={"wrap"}
          justifyContent={"center"}
          marginY={"50px"}
        >
          <Heading
            alignSelf={"center"}
            as={"h3"}
            fontSize={"2em"}
            maxWidth={{ base: "100%", md: "50%" }}
          >
            <Trans>languageChartDescription</Trans>
          </Heading>
          <Box
            alignSelf={"center"}
            marginY={"25px"}
            width={{ base: "100%", md: "40%" }}
          >
            <LanguageChart entries={languageValues} />
          </Box>
        </Box>
        <Box
          display={"flex"}
          flexDirection={"row-reverse"}
          flexWrap={"wrap"}
          justifyContent={"center"}
          marginY={"50px"}
        >
          <Heading
            alignSelf={"center"}
            as={"h3"}
            fontSize={"2em"}
            maxWidth={{ base: "100%", md: "50%" }}
          >
            <Trans>frameworkChartDescription</Trans>
          </Heading>

          <Box
            alignSelf={"center"}
            marginY={"25px"}
            width={{ base: "100%", md: "40%" }}
          >
            <FrameworkChart entries={frameworkValues} />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default React.memo(HomeExpertise)
