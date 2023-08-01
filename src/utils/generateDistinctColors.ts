/**
 * Created by Aineph for web-client.
 * Started on 19/07/2023.
 */

interface HSL {
  h: number
  s: number
  l: number
}

interface RGB {
  r: number
  g: number
  b: number
}

const hueToRgb = (p: number, q: number, t: number): number => {
  if (t < 0) t += 1
  if (t > 1) t -= 1
  if (t < 1 / 6) return p + (q - p) * 6 * t
  if (t < 1 / 2) return q
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
  return p
}

const hslToRgb = (hsl: HSL): RGB => {
  const h = hsl.h / 360
  const s = hsl.s / 100
  const l = hsl.l / 100

  if (s === 0) {
    const gray = Math.round(l * 255)
    return { r: gray, g: gray, b: gray }
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    const r = Math.round(hueToRgb(p, q, h + 1 / 3) * 255)
    const g = Math.round(hueToRgb(p, q, h) * 255)
    const b = Math.round(hueToRgb(p, q, h - 1 / 3) * 255)
    return { r, g, b }
  }
}

export const generateDistinctColors = (
  count: number,
  opacity: number = 1,
): string[] => {
  const colorPalette: string[] = []

  const hueIncrement = 360 / count
  let hue = 0

  for (let i = 0; i < count; i++) {
    const rgbColor = hslToRgb({ h: hue, s: 100, l: 50 })
    const rgbString = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, ${opacity})`
    colorPalette.push(rgbString)

    hue += hueIncrement
  }

  return colorPalette
}
