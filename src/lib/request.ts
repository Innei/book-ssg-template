import { isDev } from './env'

const endpoint = isDev
  ? 'http://localhost:10010'
  : 'https://api.innei.ren/book/v1'
