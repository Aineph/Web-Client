/**
 * Created by Aineph for web-client.
 * Started on 19/07/2023.
 */

import React from "react"
import NavLink from "../NavLink"
import { Trans } from "react-i18next"

export const navLinks = [
  {
    label: "aboutMe",
    url: "/about-me",
  },
  {
    label: "blog",
    url: "/blog",
  },
  {
    label: "gears",
    url: "/gears",
  },
  {
    label: "contact",
    url: "/#contact",
  },
]

const NavigationMenu = () =>
  navLinks.map(link => (
    <NavLink key={link.label} href={link.url}>
      <Trans>{link.label}</Trans>
    </NavLink>
  ))

export default React.memo(NavigationMenu)
