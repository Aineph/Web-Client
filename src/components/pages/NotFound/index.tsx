/**
 * Created by Aineph for web-client.
 * Started on 31/07/2023.
 */

import * as React from "react"
import { useTranslation } from "react-i18next"
import { PageProps } from "gatsby"
import { PageContext } from "gatsby/internal"
import PageLayout from "../../layouts/PageLayout"

interface NotFoundPageProps {
  backgroundImage: Queries.STRAPI_BACKGROUND_IMAGE
  constants: Queries.STRAPI_CONSTANT
  content: Queries.STRAPI_CONTENT
  links: {
    nodes: Array<Queries.STRAPI_LINK>
  }
}

const NotFoundPage: React.FC<PageProps<NotFoundPageProps, PageContext>> = ({
  data,
  pageContext,
}) => {
  const { t } = useTranslation()

  return (
    <PageLayout
      backgroundImageUrl={data.backgroundImage.notFound?.url || ""}
      crumbs={[]}
      links={data.links.nodes}
      title={t("notFound")}
    >
      <section>
        <div
          className={"ck-content"}
          dangerouslySetInnerHTML={{
            __html: data.content.notFound?.data?.notFound || "",
          }}
        />
      </section>
    </PageLayout>
  )
}

export default React.memo(NotFoundPage)
