import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

import env from '@/config/env'
import Storage from '@/utils/Storage'

export const apiServer = axios.create({
  baseURL: env.reactAppServer || 'https://auditlis-54562174bbc3.herokuapp.com/'
})

const setBearerToken = (instance: AxiosInstance): void => {
  instance.interceptors.request.use(async (config: AxiosRequestConfig): Promise<any> => {
      const isAuthed = document.location.href.includes('/auth')

      const token = Storage.getUserToken()
      const branchId = Storage.getBranchId()

      if (
        token && 
        isAuthed &&
        branchId
      ) {
        config.headers = config.headers || {}
        config.headers.Authorization = 'Bearer ' + token
        config.headers.branch = branchId
      }

      return config
    },
    error => Promise.reject(error)
  )
}

setBearerToken(apiServer)
