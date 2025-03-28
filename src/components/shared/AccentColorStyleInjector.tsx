import Color from "colorjs.io"

const hexToOklchString = (hex: string) => {
  return new Color(hex).oklch
}

const accentColorLight = [
  // 浅葱
  "#33A6B8",

  "#FF6666",
  "#26A69A",
  "#fb7287",
  "#69a6cc",
]
const accentColorDark = [
  // 桃
  "#F596AA",

  "#A0A7D4",
  "#ff7b7b",
  "#99D8CF",
  "#838BC6",
]
const defaultAccentColor = { light: accentColorLight, dark: accentColorDark }
export function AccentColorStyleInjector() {
  const { light, dark } = defaultAccentColor

  const lightColors = light ?? accentColorLight
  const darkColors = dark ?? accentColorDark

  const Length = Math.max(lightColors.length ?? 0, darkColors.length ?? 0)
  const randomSeedRef = (Math.random() * Length) | 0
  const currentAccentColorLRef = lightColors[randomSeedRef]
  const currentAccentColorDRef = darkColors[randomSeedRef]

  const lightOklch = hexToOklchString(currentAccentColorLRef)
  const darkOklch = hexToOklchString(currentAccentColorDRef)

  const [hl, sl, ll] = lightOklch
  const [hd, sd, ld] = darkOklch

  return (
    <style
      id="accent-color-style"
      data-light={currentAccentColorLRef}
      data-dark={currentAccentColorDRef}
      dangerouslySetInnerHTML={{
        __html: `
        html[data-theme='light'] {
          --a: ${`${hl} ${sl} ${ll}`};
        }
        html[data-theme='dark'] {
          --a: ${`${hd} ${sd} ${ld}`};
        }
        `,
      }}
    />
  )
}
