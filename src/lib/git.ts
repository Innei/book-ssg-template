import { exec } from 'child_process'
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

export interface GitHistory {
  time: string
  commit_message: string
  author_name: string
  hash: string
}
