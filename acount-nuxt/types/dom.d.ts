// https://stackoverflow.com/a/47736563
export {}
// https://github.com/Microsoft/TypeScript/issues/16255
declare global {
  interface Window {
    IntersectionObserver: typeof IntersectionObserver
  }
}
