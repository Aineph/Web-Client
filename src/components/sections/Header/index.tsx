/**
 * Created by Aineph for web-client.
 * Started on 19/07/2023.
 */

import * as React from "react"
import NavBar from "../../navigation/NavBar"

const Header = () => {
  return (
    <header>
      <NavBar />
    </header>
  )
}

export default React.memo(Header)
