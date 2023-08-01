/**
 * Created by Aineph for web-client.
 * Started on 19/07/2023.
 */

import { keyframes } from "@emotion/react"

export const scaleUpAnimation = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`

export const growAnimation = keyframes`
  0% {
    transform: scale(1);
    transform-origin: top;
    z-index: 10;
  }
  100% {
    transform: scale(1.1);
    transform-origin: top;
    z-index: 10;
  }
`
