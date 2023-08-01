/**
 * Created by Aineph for web-client.
 * Started on 31/07/2023.
 */

import React, { useMemo } from "react"
import { Box, Heading, Tag } from "@chakra-ui/react"

interface SelectionProps {
  items: Array<string>
  onSelect: (value: string) => void
  selection: Array<string>
  title: string
}

const Selection: React.FC<SelectionProps> = ({
  items,
  onSelect,
  selection,
  title,
}) => {
  const formatedItems = useMemo(
    () =>
      items.map(item => {
        const isSelected = selection.includes(item)

        return (
          <Tag
            bgColor={isSelected ? "primary" : "white"}
            borderWidth={"1px"}
            color={isSelected ? "white" : "primary"}
            cursor={"pointer"}
            key={item}
            onClick={() => onSelect(item)}
            size={"lg"}
          >
            {item}
          </Tag>
        )
      }),
    [items, onSelect, selection],
  )

  return (
    <Box display={"flex"} flexDirection={"column"} gap={"10px"}>
      <Heading as={"h3"}>{title}</Heading>
      <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"} gap={"5px"}>
        {formatedItems}
      </Box>
    </Box>
  )
}

export default React.memo(Selection)
