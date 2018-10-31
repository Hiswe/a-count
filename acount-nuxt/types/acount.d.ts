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

interface InvoiceConfig {
  creationCount: number
  prefix: string
  mentions: string
}
interface QuotationConfig extends InvoiceConfig {
  tax: number
}
interface ProductConfig {
  quantity: number
  price: number
}
export interface AcountUser {
  id: string
  email: string
  name: string
  address: string
  lang: `en` | `fr`
  currency: `USD` | `EUR` | `THB`
  quotationConfig: QuotationConfig
  invoiceConfig: {}
  productConfig: {}
}

export interface LoginResponse {
  user: AcountUser
  access_token: string
}
