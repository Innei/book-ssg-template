// COPY FROM hexo-word-counter
interface Config {
  wpm?: number
  suffix?: string
}

let config: Config = {}

export const setConfig = (_config: Config): void => {
  config = _config
}

const getSymbols = (post: string): number => {
  return post.replaceAll(/\s/g, '').length
}

const getFormatTime = (minutes: number, suffix: string): string => {
  const fHours = Math.floor(minutes / 60)
  let fMinutes = Math.floor(minutes - fHours * 60)
  if (fMinutes < 1) {
    fMinutes = 1 // 0 => 1
  }
  return fHours < 1
    ? `${fMinutes} ${suffix}` // < 59 => 59 mins.
    : `${fHours}:${`00${fMinutes}`.slice(-2)}` // = 61 => 1:01
}

export const symbolsCount = (post: string): string => {
  let symbolsResult = getSymbols(post) as string | number

  if (typeof symbolsResult !== 'string') {
    if (symbolsResult > 9999) {
      symbolsResult = `${Math.round(symbolsResult / 1000)}k` // > 9999 => 11k
    } else if (symbolsResult > 999) {
      symbolsResult = `${Math.round(symbolsResult / 100) / 10}k` // > 999 => 1.1k
    } // < 999 => 111
  }
  return `${symbolsResult}`
}

export const symbolsTime = (
  post: string,
  awl: number,
  wpm: number = config.wpm ?? 0,
  suffix: string = config.suffix ?? '',
): string => {
  const minutes = Math.round(getSymbols(post) / wpm)
  return getFormatTime(minutes, suffix)
}
