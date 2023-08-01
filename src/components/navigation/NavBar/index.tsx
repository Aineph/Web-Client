/**
 * Created by Aineph for web-client.
 * Started on 19/07/2023.
 */

import React, { useCallback, useState } from "react"
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Stack,
  useDisclosure,
} from "@chakra-ui/react"
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons"
import { StaticImage } from "gatsby-plugin-image"
import { Link, useI18next } from "gatsby-plugin-react-i18next"
import LanguageMenu from "../LanguageMenu"
import NavigationMenu from "../NavigationMenu"
import useWindowScrollPosition from "../../../hooks/useWindowScrollPosition"
import { useMetadata } from "../../../hooks/useMetadata"

const NavBar = () => {
  const { language } = useI18next()
  const { title } = useMetadata(language)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { scrollTop } = useWindowScrollPosition()
  const [isHovering, setIsHovering] = useState(false)

  const onMouseEnter = useCallback(() => {
    setIsHovering(true)
  }, [])

  const onMouseLeave = useCallback(() => {
    setIsHovering(false)
  }, [])

  return (
    <>
      <Box
        bg={"transparentBackground"}
        left={0}
        position={"fixed"}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        opacity={isHovering || scrollTop === 0 ? 1 : 0}
        px={4}
        transition={"1s"}
        top={0}
        width={"100%"}
        zIndex={100}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            onClick={isOpen ? onClose : onOpen}
            outline={"none"}
            size={"md"}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <Link to={"/"}>
                <StaticImage
                  alt={title || ""}
                  height={50}
                  src={"../../../images/icon.png"}
                />
              </Link>
            </Box>
          </HStack>
          <Flex alignItems={"center"}>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              <NavigationMenu />
              <LanguageMenu />
            </HStack>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <NavigationMenu />
              <LanguageMenu />
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  )
}

export default React.memo(NavBar)
