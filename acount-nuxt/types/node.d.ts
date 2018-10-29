// Nuxt is augmenting Node's process
// we need to declare that also

declare namespace NodeJS {
  interface Process {
    client: boolean
    server: boolean
    static: boolean
  }
  interface ProcessEnv {
    COOKIE_NAME: string
  }
}
