export function createElement (tagName) {
  return document.createElement(tagName)
}

export function toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

const camelizeRE = /-(\w)/g

export const camelize = ''

export function resolveAsset (options, type, id) {
  if (typeof id !== 'string') {
    return 
  }
  let assets = options[type]
  if (!assets) {
    return
  }
}

export const idToTemplate = cached((id) => {
  let el = query(id)

  return el && el.innerHTML
})

export function query (el) {
  if (typeof el === 'string') {
    const selector = el
    el = document.querySelector(el)
    if (!el) {
      return document.createElement('div')
    }
  }
  return el
}

export function isFunction (obj) {
  return typeof obj === 'function'
}

export function cached (fn) {
  const cache = Object.create(null)
  return function cachedFn (str) {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }
}

function copyProperties (target, source) {
}

export const no = () => false

export function isPlainObject (obj) {
  return toString.call(obj) === '[object Object]'
}

export const isNative = function (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

export const _Set = (function () {
})()

const bailRE = /[^\w.$]/
export function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  const segments = path.split('.')
  return function (obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return
      obj = obj[segments[i]]
    }
    return obj
  }
}

export function remove (arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

export const nextTick = ''

export function warn (msg, vm) {
  console.error(`[MVVM warn]: ${msg}`)
}

export const hasProto = '__proto__' in {}

export function domTostr (dom) {
  let div = document.createElement('div')
  div.appendChild(dom)
  return div.innerHTML
}

export function strTodom (str) {
  let div = document.createElement('div')
  div.innerHTML = str 
  return div.firstChild
}

export function isDom (dom) {
  return dom instanceof HTMLElment
}

export function bind (fn, ctx) {
  function bindFn (a) {
    const l = arguments.length 
    return l
      ? l > 1
       ? fn.apply(ctx, arguments)
       : fn.call(ctx, a)
      : fn.call(ctx)
  }
  bindFn._length = fn.length
  return bindFn
}

export function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

export function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

export function noop () {}

export function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  })
}