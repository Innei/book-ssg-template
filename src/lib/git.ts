import { exec, execSync } from 'child_process'
import path from 'path'
import { promisify } from 'util'

export const getFileGitHistory = async (filePath: string) => {
  const execAsync = promisify(exec)
  try {
    const { stdout } = await execAsync(
      `git log --pretty=format:"%H %an %ad %s" --date=short ${path.resolve(
        process.cwd(),
        filePath,
      )}`,
    )
    return stdout
  } catch (e) {
    console.error(e)
    return ''
  }
}

export interface TGitHistory {
  time: string
  commit_message: string
  author_name: string
  hash: string
}

/**
 * 获取指定文件在 Git 历史中的最后更新时间。
 * @param filePath 文件相对于 Git 仓库根目录的路径。
 * @returns 文件的最后更新时间（Date 对象），如果没有记录，则为 null。
 */
export function getLastGitUpdateTime(filePath: string): Date | null {
  try {
    // 执行 git log 命令获取最后一次提交的日期
    const command = `git log -1 --format="%ai" -- "${filePath}"`
    const stdout = execSync(command).toString().trim()
    // 如果没有获取到日期，则返回 null
    if (!stdout) {
      return null
    }
    // 将获取到的日期字符串转换为 Date 对象
    return new Date(stdout)
  } catch (error) {
    // 如果执行命令时出错（例如，文件未被跟踪或路径无效），返回 null
    console.error('Error fetching git commit time:', error)
    return null
  }
}
