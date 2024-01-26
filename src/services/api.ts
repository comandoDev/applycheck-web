import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

import env from '@/config/env'
import Storage from '@/utils/Storage'

export const apiServer = axios.create({
  baseURL: env.reactAppServer || 'https://auditlis-54562174bbc3.herokuapp.com/'
})

const setBearerToken = (instance: AxiosInstance): void => {
  instance.interceptors.request.use(async (config: AxiosRequestConfig): Promise<any> => {
      const isAuthed = document.location.href.includes('/auth');

      const token = Storage.getUserToken();

      if (token && isAuthed) {
        config.headers = config.headers || {};
        config.headers.Authorization = 'Bearer ' + token;
      }

      return config;
    },
    error => Promise.reject(error)
  );
};

setBearerToken(apiServer)
