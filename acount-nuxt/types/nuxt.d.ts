import Vue from 'vue'
import { Route } from 'vue-router'
import { Store } from 'vuex'
import { Dictionary } from 'vue-router/types/router'
import { CookieSerializeOptions } from 'cookie'

import { AcountMeta } from './acount'

export interface NuxtContext {
  app: Vue
  isDev: boolean
  isHMR: boolean
  route: Route
  store: Store<any>
  env: Object
  params: Dictionary<string>
  query: Dictionary<string>
  req: Request
  res: Response
  redirect: Function
  error: Function
  nuxtState: Object
  beforeNuxtRender: Function
}

//////
// AXIOS
//////

type NuxtAxiosSetToken = (
  token?: string | boolean,
  type?: string,
  scopes?: string | string[],
) => void
type NuxtAxiosSetHeader = (
  name: string,
  value: string | boolean,
  scopes?: string | string[],
) => void
type NuxtAxiosRequestCallback = (config: Object) => void
type NuxtAxiosErrorCallback = (error: Object) => void
type NuxtAxiosResponseCallback = (response: Object) => void

export interface NuxtAxios {
  setToken: NuxtAxiosSetToken
  onRequest: NuxtAxiosRequestCallback
  onRequestError: NuxtAxiosErrorCallback
  onResponseError: NuxtAxiosErrorCallback
  onResponse: NuxtAxiosResponseCallback
  onError: NuxtAxiosErrorCallback
}

//////
// COOKIES
//////

type NuxtCookieValue = any

interface NuxtCookieGetOptions {
  fromRes?: boolean
  parseJSON?: boolean
}

interface NuxtCookieRemoveOptions {
  path: string
}

interface NuxtCookieGetParams {
  name: string
  value: any
  opts?: CookieSerializeOptions
}

export interface NuxtCookies {
  set: (
    name: string,
    value: string | Object,
    opts?: CookieSerializeOptions,
  ) => void
  setAll: (cookieArray: NuxtCookieGetParams[]) => void
  get: (name: string, opts?: NuxtCookieGetOptions) => NuxtCookieValue
  getAll: (opts?: NuxtCookieGetOptions) => NuxtCookieValue[]
  remove: (name: string, opts: NuxtCookieRemoveOptions) => void
  removeAll: () => void
}
