import Vue from 'vue'

import { NotificationState } from './acount-notifications'
import { FormErrorState } from './acount-form-error'
import { CustomersState } from './acount-customers'
import { UserState } from './acount-user'
// import { QuotationState } from './acount-quotations'

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

export interface RootState {
  notifications: NotificationState
  user: UserState
  customers: CustomersState
  formErrors: FormErrorState
}
