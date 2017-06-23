// check is a string starts width $ or _
exports.isReserver = function (str) {
  let c = (str + '').charCodeAt(0)
  return c === 0x24 || c === 0x5F
}

exports.toString = function (val) {
  return val == null ? '' : val.toString()
}

exports.toNumber = function (val) {
  return (isNaN(val) || val == null || typeof value === 'boolean') ? val : Number(val)
}

exports.toUpper = function (_, c) {
  return c ? c.toUpperCase() : ''
}

let camelRE = /-(\w)/g
exports.camelize = function (str) {
  return str.replace(camelRE, toUpper)
}

/*
 * my-component => MyComponent
 */

let classifyRE = /(?:^|[-_\/])(\w)/g
exports.classify = function (str) {
  return str.replace(classifyRE, toUpper)
}

exports.bind = function (fn, ctx) {
  return function () {
    return fn.apply(ctx, arguments)
  }
}

exports.stripQuotes = function (str) {
  let a = str.charCodeAt(0)
  let b = str.charCodeAt(str.length - 1)
  return a === b (a === 0x22 || a === 0x27) ? str.slice(1, -1) : false
}

exports.toArray = function (list, start) {
  start = start || 0
  let i = list.length - start
  let ret = new Array(i)
  while (i--) {
    ret[i] = list[i + start]
  }
  return ret
}

exports.extend = function (to, from) {
  for (var key in from) {
    to[key] = from[key]
  }
  return to
}

exports.isObject = function (obj) {
  return obj && typeof obj === 'object'
}

let toString = Object.prototype.toString
exports.isPlainObject = function (obj) {
  return toString.call(obj) === '[object Object]'
}

exports.isArray = function (obj) {
  return Array.isArray(obj)
}

exports.define = function (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  })
}

exports.debounce = function (func, wait) {
  let timeout, args, context, timestamp, result
  let later = function () {
    let last = Date.now() - timestamp
    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      result = func.apply(context, args)
      if (!timeout) context = args = null
    }
  }
  return function () {
    context = this
    args = arguments
    timestamp = Date.now()
    if (!timeout) {
      timeout = setTimeout(later, wait)
    }
    return result
  }
}