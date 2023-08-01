/**
 * Created by Aineph for web-client.
 * Started on 19/07/2023.
 */

import React, { useCallback } from "react"
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react"
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons"
import { useI18next } from "gatsby-plugin-react-i18next"
import { Trans } from "react-i18next"

const LanguageMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { changeLanguage, language, languages } = useI18next()

  const onLocaleChange = useCallback(
    async (locale: string) => {
      await changeLanguage(locale)
    },
    [changeLanguage],
  )

  return (
    <Menu isOpen={isOpen}>
      <MenuButton
        px={2}
        py={1}
        alignSelf={"start"}
        color={"primary"}
        textTransform={"uppercase"}
        onClick={isOpen ? onClose : onOpen}
        onMouseEnter={onOpen}
      >
        <Trans>{language}</Trans>{" "}
        {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </MenuButton>
      <MenuList onMouseLeave={onClose}>
        {languages.map(language => (
          <MenuItem
            key={language}
            color={"secondary"}
            textTransform={"uppercase"}
            _hover={{
              color: "primary",
            }}
            onClick={() => onLocaleChange(language)}
          >
            <Trans>{language}</Trans>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default React.memo(LanguageMenu)
