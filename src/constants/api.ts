import { isDev } from '~/lib/env'

export const endpoint = isDev
  ? 'http://localhost:10010'
  : 'https://api.innei.ren/book/v1'

// export const endpoint = 'https://api.innei.ren/book/v1'
