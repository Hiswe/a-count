import Vue from 'vue'
import { Route } from 'vue-router'
import { Dictionary } from 'vue-router/types/router'
import { Store } from 'vuex'
import { MetaInfo } from 'vue-meta'

// declare module 'vue/types/vue' {
//   // Global properties can be declared
//   // on the `VueConstructor` interface
//   interface VueConstructor {
//     $myGlobal: string
//   }
// }

interface AcountMeta {
  authForbidden?: boolean
  authRequired?: boolean
}

interface Context {
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

// ComponentOptions is declared in types/options.d.ts
declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    asyncData?: (ctx: Context) => object
    fetch?: (ctx: Context) => Promise<void> | void
    head?: MetaInfo | (() => MetaInfo)
    meta?: AcountMeta
    layout?: string | ((ctx: Context) => string)
    middleware?: string | string[]
    scrollToTop?: boolean
    transition?: string | Transition | ((to: Route, from: Route) => string)
    validate?: (ctx: Context) => Promise<boolean> | boolean
    watchQuery?: boolean | string[]
  }
}

declare module '*.vue' {
  export default Vue
}
