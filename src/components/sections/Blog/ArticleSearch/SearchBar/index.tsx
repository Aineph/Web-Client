/**
 * Created by Aineph for web-client.
 * Started on 31/07/2023.
 */

import { Icon, Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
import { IoSearchOutline } from "react-icons/io5"
import React from "react"

interface SearchBarProps {
  onChange: (event: React.FormEvent<HTMLInputElement>) => void
  placeholder: string
  value: string
}

const SearchBar: React.FC<SearchBarProps> = ({
  onChange,
  placeholder,
  value,
}) => (
  <InputGroup>
    <InputLeftElement pointerEvents={"none"}>
      <Icon as={IoSearchOutline} />
    </InputLeftElement>
    <Input
      onChange={onChange}
      placeholder={placeholder}
      type={"text"}
      value={value}
    />
  </InputGroup>
)

export default React.memo(SearchBar)
