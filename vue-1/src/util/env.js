

export const inBrowser =
  typeof window !== 'undefined' &&
  Object.prototype.toString.call(window) !== '[object Object]'

export const devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__