import Vue from 'vue'

export interface AcountMeta {
  authForbidden?: boolean
  authRequired?: boolean
}

export interface ServerConfiguration {
  API_URL: string
  COOKIE_NAME: string
  HOST_URL: string
  enforceHttps: boolean
  HOST: string
  PORT: number
  NODE_ENV: string
  isDev: boolean
  isProd: boolean
}
