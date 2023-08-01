/**
 * Created by Aineph for web-client.
 * Started on 20/07/2023.
 */

import React, { useMemo } from "react"
import { Link, useI18next } from "gatsby-plugin-react-i18next"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
} from "@chakra-ui/react"
import { ChevronRightIcon } from "@chakra-ui/icons"

interface BreadCrumbProps {
  crumbLabel: string
  crumbs: Array<{
    crumbLabel: string
    pathname: string
  }>
}

const BreadCrumb: React.FC<BreadCrumbProps> = ({ crumbLabel, crumbs }) => {
  const { languages, t, language } = useI18next()

  const intlCrumbs = useMemo(
    () =>
      crumbs
        .filter(
          crumb =>
            !languages.includes(crumb.crumbLabel) &&
            !languages.includes(crumb.pathname.slice(1)),
        )
        .map(crumb => ({
          pathname: crumb.pathname.replace(`/${language}/`, "/"),
          crumbLabel: t(crumb.crumbLabel),
        })),
    [crumbs, language, languages],
  )

  return (
    <Breadcrumb separator={<ChevronRightIcon />} spacing={"5px"}>
      {intlCrumbs.map(
        (crumb: { crumbLabel: string; pathname: string }, index) => (
          <BreadcrumbItem key={crumb.pathname}>
            {index === intlCrumbs.length - 1 ? (
              <Text color={"primary"} fontWeight={"bold"}>
                {crumbLabel}
              </Text>
            ) : (
              <BreadcrumbLink as={Link} to={crumb.pathname}>
                {crumb.crumbLabel}
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
        ),
      )}
    </Breadcrumb>
  )
}

export default React.memo(BreadCrumb)
