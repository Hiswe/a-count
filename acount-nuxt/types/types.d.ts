import Vue from 'vue'
import { Route } from 'vue-router'
import { Store } from 'vuex'
import { Dictionary } from 'vue-router/types/router'

export interface AcountMeta {
  authForbidden?: boolean
  authRequired?: boolean
}

export interface NuxtContext {
  app: Vue
  isClient: boolean
  isServer: boolean
  isStatic: boolean
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
