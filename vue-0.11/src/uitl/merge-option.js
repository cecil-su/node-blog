let _ = require('./index')
let extend = _.extend

let strats = Object.create(null)

function mergeData (to, from) {
  let key, toVal, fromVal
  for (key in from) {
    toVal = to[key]
    fromVal = from[key]
    if (!to.hasOwnProperty(key)) {
      to.$add(key, fromVal)
    } else if (_.isObject(toVal) && _.isObject(fromVal)) {
      mergeData(toVal, fromVal)
    }
  }
  return to
}


// data 
strats.data = function (parentVal, childVal, vm) {
  if (!vm) {
    if (!childVal) {
      return parentVal
    }
    if (typeof childVal !== 'function') {
      _.warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.'
      )
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    return function mergeDataFn () {
      return mergeData(childVal.call(this), parentVal.call(this))
    }
  } else {
    let instanceData = typeof childVal === 'function' ? childVal.call(vm) : childVal
    let defaultData = typeof parentVal === 'function' ? parentVal.call(vm) : undefined
    if (instanceData) {
      return mergeData(instanceData, defaultData)
    } else {
      return defaultData
    }
  }
}

strats.el = function (parentVal, childVal, vm) {
  if (!vm && childVal && typeof childVal !== 'function') {
    _.warn(
      'The "el" option should be a function ' +
      'that returns a per-instance value in component ' +
      'definitions.'
    )

    return
  }

  let ret = childVal || parentVal
  return vm && typeof ret === 'function' ? ret.call(vm) : ret
}

strats.created = 
strats.ready = 
strats.attached = 
strats.detached = 
strats.beforeCompile = 
strats.compiled = 
strats.beforeDestroy = 
strats.destroyed = 
strats.paramAttributes = function (parentVal, childVal) {
  return childVal 
    ? parentVal 
      ? parentVal.concat(childVal)
      : _.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

strats.directives = 
strats.filters = 
strats.partials = 
strats.transitions = 
strats.components = function (parentVal, childVal, vm, key) {
  var ret = Object.create(
    vm && vm.$parent
      ? vm.$parent.$options[key]
      : _.Vue.options[key]
  )
  if (parentVal) {
    let keys = Object.keys(parentVal)
    let i = keys.length
    let field
    while (i--) {
      field = keys[i]
      ret[field] = parentVal[field]
    }
  }
  if (childVal) {
    extend(ret, childVal)
  }
  return ret
}

strats.watch =
strats.events = function (parentVal, childVal) {
  if (!childVal) return parentVal
  if (!parentVal) return childVal
  let ret = {}
  extend(ret, parentVal)
  for (let key in childVal) {
    let parent = ret[key]
    let child = childVal[key]
    if (parent && _.isArray(parent)) {
      parent = [parent]
    }
    ret[key] = parent ? parent.concat(child) : [child]
  }
  return ret
}

strats.methods = 
strats.computed = function (parentVal, childVal) {
  if (!childVal) return parentVal
  if (!parentVal) return childVal
  let ret = Object.create(parentVal)
  extend(ret, childVal)
  return ret
}

let defaultStrat = function (parentVal, childVal) {
  return childVal === undefined ? parentVal : childVal
}

function guardComponents (components) {
  if (components) {
    let def 
    for (let key in components) {
      def = components[key]
      if (_.isPlainObject(def)) {
        def.name = key 
        components[key] = _.Vue.extend(def)
      }
    }
  }
}

module.exports = function mergeOptions (parent, child, vm) {
  guardComponents(child.components)
  let options = {}, key 
  if (child.mixins) {
    for (let i = 0; i < child.mixins.length; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm)
    }
  }
  for (key in parent) {
    merge(key)
  }
  for (key in child) {
    if (!parent.hasOwnProperty(key)) {
      merge(key)
    }
  }
  function merge (key) {
    var strat = strats[key] || defaultStrat
    options[key] = strat(parent[key], child[key], vm, key)
  }
  return options
}