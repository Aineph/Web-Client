/**
 * Created by Aineph for web-client.
 * Started on 19/07/2023.
 */

import * as React from "react"
import HomeLayout from "../../layouts/HomeLayout"
import { PageProps } from "gatsby"
import HomeHead from "../../sections/Home/Head"
import HomeServices from "../../sections/Home/Services"
import HomeExpertise from "../../sections/Home/Expertise"
import HomeClients from "../../sections/Home/Clients"
import HomePortfolio from "../../sections/Home/Portfolio"
import HomeContact from "../../sections/Home/Contact"

interface HomePageProps {
  backgroundImage: Queries.STRAPI_BACKGROUND_IMAGE
  constants: Queries.STRAPI_CONSTANT
  experiences: {
    nodes: Array<Queries.STRAPI_EXPERIENCE>
  }
  frameworks: {
    nodes: Array<Queries.STRAPI_CODING_FRAMEWORK>
  }
  languages: {
    nodes: Array<Queries.STRAPI_CODING_LANGUAGE>
  }
  links: {
    nodes: Array<Queries.STRAPI_LINK>
  }
  projects: {
    nodes: Array<Queries.STRAPI_PROJECT>
  }
  services: {
    nodes: Array<Queries.STRAPI_SERVICE>
  }
}

const HomePage: React.FC<PageProps<HomePageProps>> = ({ data }) => (
  <HomeLayout links={data.links.nodes} title={data.constants.title || ""}>
    <section>
      <HomeHead
        backgroundImageUrl={data.backgroundImage.home?.url || ""}
        introduction={data.constants.introduction || ""}
        title={data.constants.title || ""}
        quoteUrl={data.constants.quoteUrl || ""}
        meetingUrl={data.constants.meetingUrl || ""}
      />
    </section>
    <section>
      <HomeServices services={data.services.nodes} />
    </section>
    <section>
      <HomeExpertise
        frameworks={data.frameworks.nodes}
        languages={data.languages.nodes}
      />
    </section>
    <section>
      <HomeClients experiences={data.experiences.nodes} />
    </section>
    <section>
      <HomePortfolio projects={data.projects.nodes} />
    </section>
    <section id={"contact"}>
      <HomeContact />
    </section>
  </HomeLayout>
)

export default React.memo(HomePage)
