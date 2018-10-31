import Vue from 'vue'
import { Route } from 'vue-router'
import { MetaInfo } from 'vue-meta'
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
  $get: (url: string) => Promise<Object>
  $post: <T>(url: string, params: Object) => Promise<T>
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
  remove: (name: string, opts?: NuxtCookieRemoveOptions) => void
  removeAll: () => void
}

//////
// NUXT
//////

declare module 'vue/types/vue' {
  interface Vue {
    $axios: NuxtAxios
    $cookies: NuxtCookies
  }
  // interface VueConstructor {
  //   $axios: NuxtAxios
  //   $cookies: NuxtCookies
  // }
}

interface Transition {
  name?: string
  mode?: string
  css?: boolean
  duration?: number
  type?: string
  enterClass?: string
  enterToClass?: string
  enterActiveClass?: string
  leaveClass?: string
  leaveToClass?: string
  leaveActiveClass?: string
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    asyncData?: (ctx: NuxtContext) => object
    fetch?: (ctx: NuxtContext) => Promise<void> | void
    head?: MetaInfo | (() => MetaInfo)
    meta?: AcountMeta
    layout?: string | ((ctx: NuxtContext) => string)
    middleware?: string | string[]
    scrollToTop?: boolean
    transition?: string | Transition | ((to: Route, from: Route) => string)
    validate?: (ctx: NuxtContext) => Promise<boolean> | boolean
    watchQuery?: boolean | string[]
  }
}
