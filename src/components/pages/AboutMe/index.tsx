/**
 * Created by Aineph for web-client.
 * Started on 19/07/2023.
 */

import * as React from "react"
import { useTranslation } from "react-i18next"
import { PageProps } from "gatsby"
import { PageContext } from "gatsby/internal"
import PageLayout from "../../layouts/PageLayout"

interface AboutMePageProps {
  backgroundImage: Queries.STRAPI_BACKGROUND_IMAGE
  constants: Queries.STRAPI_CONSTANT
  content: Queries.STRAPI_CONTENT
  links: {
    nodes: Array<Queries.STRAPI_LINK>
  }
}

const AboutMePage: React.FC<PageProps<AboutMePageProps, PageContext>> = ({
  data,
  pageContext,
}) => {
  const { t } = useTranslation()

  return (
    <PageLayout
      backgroundImageUrl={data.backgroundImage.aboutMe?.url || ""}
      crumbs={pageContext.breadcrumb.crumbs}
      links={data.links.nodes}
      title={t("aboutMe")}
    >
      <section>
        <div
          className={"ck-content"}
          dangerouslySetInnerHTML={{
            __html: data.content.aboutMe?.data?.aboutMe || "",
          }}
        />
      </section>
    </PageLayout>
  )
}

export default React.memo(AboutMePage)
