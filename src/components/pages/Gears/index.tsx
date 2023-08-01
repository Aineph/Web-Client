/**
 * Created by Aineph for web-client.
 * Started on 19/07/2023.
 */

import * as React from "react"
import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { PageProps } from "gatsby"
import { PageContext } from "gatsby/internal"
import PageLayout from "../../layouts/PageLayout"
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"

interface GearsPageProps {
  backgroundImage: Queries.STRAPI_BACKGROUND_IMAGE
  constants: Queries.STRAPI_CONSTANT
  content: Queries.STRAPI_CONTENT
  gears: {
    nodes: Array<Queries.STRAPI_GEAR>
  }
  links: {
    nodes: Array<Queries.STRAPI_LINK>
  }
}

const GearsPage: React.FC<PageProps<GearsPageProps, PageContext>> = ({
  data,
  pageContext,
}) => {
  const { t } = useTranslation()

  const tabs = useMemo(
    () =>
      data.gears.nodes.map(node => (
        <Tab
          key={node.category}
          _selected={{
            borderColor: "inherit",
            borderBottomColor: "white",
            color: "primary",
          }}
        >
          {node.category}
        </Tab>
      )),
    [data.gears],
  )

  const tabPanels = useMemo(
    () =>
      data.gears.nodes.map(node => (
        <TabPanel key={node.category} marginTop={"50px"} padding={0}>
          <section>
            <div
              className={"ck-content"}
              dangerouslySetInnerHTML={{
                __html: node.content?.data?.content || "",
              }}
            />
          </section>
        </TabPanel>
      )),
    [data.gears],
  )

  return (
    <PageLayout
      backgroundImageUrl={data.backgroundImage.gears?.url || ""}
      crumbs={pageContext.breadcrumb.crumbs}
      links={data.links.nodes}
      title={t("gears")}
    >
      <section>
        <div
          className={"ck-content"}
          dangerouslySetInnerHTML={{
            __html: data.content.gears?.data?.gears || "",
          }}
        />
      </section>
      <Tabs isFitted variant={"enclosed"} marginTop={"50px"}>
        <TabList display={"flex"} flexDirection={"row"} flexWrap={"wrap"}>
          {tabs}
        </TabList>
        <TabPanels>{tabPanels}</TabPanels>
      </Tabs>
    </PageLayout>
  )
}

export default React.memo(GearsPage)
