import { FluentShieldError20Regular } from "~/components/icons/status"

import {
  SimpleIconsC,
  SimpleIconsCplusplus,
  SimpleIconsCss,
  SimpleIconsHtml5,
  SimpleIconsJavascript,
  SimpleIconsJson,
  SimpleIconsMarkdown,
  SimpleIconsReact,
  SimpleIconsSwift,
  SimpleIconsTypescript,
  VscodeIconsFileTypeObjectivec,
  VscodeIconsFileTypeObjectivecpp,
} from "./language-icons"

export const languageToIconMap = {
  jsx: SimpleIconsReact,
  tsx: SimpleIconsReact,
  js: SimpleIconsJavascript,
  ts: SimpleIconsTypescript,
  javascript: SimpleIconsJavascript,
  typescript: SimpleIconsTypescript,
  javascriptreact: SimpleIconsReact,
  typescriptreact: SimpleIconsReact,
  html: SimpleIconsHtml5,
  css: SimpleIconsCss,
  markdown: SimpleIconsMarkdown,
  md: SimpleIconsMarkdown,
  bash: FluentShieldError20Regular,
  sh: FluentShieldError20Regular,
  shell: FluentShieldError20Regular,
  swift: SimpleIconsSwift,
  zsh: FluentShieldError20Regular,
  json: SimpleIconsJson,
  objectivec: VscodeIconsFileTypeObjectivec,
  objc: VscodeIconsFileTypeObjectivec,
  objectivecpp: VscodeIconsFileTypeObjectivecpp,
  objcpp: VscodeIconsFileTypeObjectivecpp,
  c: SimpleIconsC,
  cpp: SimpleIconsCplusplus,
  "c++": SimpleIconsCplusplus,
}
export const languageToColorMap: Record<keyof typeof languageToIconMap, string> = {
  jsx: "#61DAFB",
  tsx: "#3178C6",
  js: "#F7DF1E",
  ts: "#3178C6",
  javascript: "#F7DF1E",
  typescript: "#3178C6",
  javascriptreact: "#61DAFB",
  typescriptreact: "#61DAFB",
  html: "#E34F26",
  css: "#1572B6",
  markdown: "#000000",
  md: "#000000",
  bash: "#4EAA25",
  sh: "#4EAA25",
  shell: "#4EAA25",
  swift: "#FA7343",
  zsh: "#4EAA25",
  json: "#F7DF1E",
  objectivec: "#438EFF",
  objc: "#438EFF",
  objectivecpp: "#438EFF",
  objcpp: "#438EFF",
  c: "#A8B9CC",
  cpp: "#00599C",
  "c++": "#00599C",
}
