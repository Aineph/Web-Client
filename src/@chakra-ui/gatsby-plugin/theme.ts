/**
 * Created by Aineph for web-client.
 * Started on 19/07/2023.
 */

import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  colors: {
    primary: "rgb(192, 178, 131)",
    secondary: "rgba(0, 0, 0, 0.3)",
    primaryTransparent: "rgba(192, 178, 131, .6)",
    transparentBackground: "rgba(255, 255, 255, 0.9)",
  },
  styles: {
    global: {
      h1: {
        fontSize: "5xl",
      },
      h2: {
        fontSize: "2xl",
      },
      h3: {
        fontSize: "xl",
      },
      h4: {
        fontSize: "lg",
      },
      h5: {
        fontSize: "md",
      },
      h6: {
        fontSize: "sm",
      },
    },
  },
})

export default extendTheme(theme)
