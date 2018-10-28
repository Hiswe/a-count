import Vue from 'vue'
import { Route } from 'vue-router'
import { Store } from 'vuex'
import { Dictionary } from 'vue-router/types/router'
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
