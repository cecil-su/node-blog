import { extend, mergeOptions, formatComponentName } from '../util/index'

export function lifecycleMixin (Vue) {}

export function callHook (vm, hook) {
  const handlers = vm.$options[hook]
  console.log(handlers)
  if (handlers) {
    console.log(handlers.length)
    for (let i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm)
      } catch (e) {
        console.log('error')
      }
    }
  }
  if (vm._hadHookEvent) {
    vm.$emit('hook:' + hook)
  }
}