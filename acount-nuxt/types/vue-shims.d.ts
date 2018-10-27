import Vue from 'vue'
import { Route } from 'vue-router'
import { MetaInfo } from 'vue-meta'

// import Process = NodeJS.Process
// import EventEmitter = NodeJS.EventEmitter

import { NuxtContext, AcountMeta } from './types'

// declare module 'vue/types/vue' {
//   // Global properties can be declared
//   // on the `VueConstructor` interface
//   interface VueConstructor {
//     $myGlobal: string
//   }
// }

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

declare module '*.vue' {
  export default Vue
}
