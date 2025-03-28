import yaml from "js-yaml"
import remarkParse from "remark-parse"
import { unified } from "unified"
import { EXIT, visit } from "unist-util-visit"

// 定义函数以提取第一个一级标题的纯文字内容
export function extractFirstHeadingText(markdown: string): string | null {
  const processor = unified().use(remarkParse)
  const file = processor.parse(markdown)

  let headingText: string | null = null

  // 遍历 AST，寻找第一个一级标题
  visit(file, "heading", (node) => {
    if (node.depth === 1 && headingText === null) {
      // 提取纯文字内容
      headingText = node.children.map((child) => ("value" in child ? child.value : "")).join("")
      return EXIT
    }
  })

  return headingText
}
// 定义函数以同步解析 Markdown 文件顶部的 YAML Front Matter
const yamlFrontMatterRegex = /^---\s*\n([\s\S]+?)\n?---\s*/m
export function parseYamlFrontMatterSync(markdown: string): Record<string, any> {
  // 尝试查找 Markdown 中的第一个 YAML Front Matter 区块
  const match = yamlFrontMatterRegex.exec(markdown)

  if (match) {
    // 尝试解析找到的 YAML 内容
    try {
      const yamlContent = yaml.load(match[1].replaceAll("---", "")) as object

      return yamlContent
    } catch (error) {
      console.error("YAML parsing error:", error, match)
      return {}
    }
  }

  return {}
}

export function removeYamlFrontMatter(markdown: string): string {
  // 使用正则表达式匹配并移除 Markdown 文本顶部的 YAML Front Matter
  const newYamlRemovedMarkdown = markdown.replace(yamlFrontMatterRegex, "")

  return newYamlRemovedMarkdown
}
