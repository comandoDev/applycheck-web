import axios from 'axios'

import env from '@/config/env'

export const apiServer = axios.create({
  baseURL: env.reactAppServer || 'http://10.0.12.193:4000'
})
