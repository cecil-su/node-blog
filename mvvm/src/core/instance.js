import { noop, warn, isPlainObject, isFunction, bind } from './utils'


export function initData (vm, data) {
  if (isFunction(data)) {
    data = data()
  }

  vm.$data = data
  const keys = Object.keys(data)
  let i = keys.length
  while (i--) {
    proxy(vm, '$data', keys[i])
  }
}

export function initComputed () {}

export function initMethods () {}

export function initWatch () {}

const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
}

// 代理 在vm上直接访问$data上面的data
function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  }
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}