console.log('mvvm')

let uid = 0
export default class MVVM {
  constructor (options) {
    this.$options = options
    this.$options.delimiters = this.$options.delimiters || ['{{', '}}']
    this._uid = uid++
    this._watchers = []
    callHook(this, 'beforeCreate')
  }

  static use (plugin) {
    plugin && plugin.install && plugin.install.call(this, MVVM)
  }

  static $set () {}

  static $delete () {}

  $mount (el) {}

  $watch () {}

  $forceUpdate () {}

  $destroy () {}

  _render () {}

  _update () {}

  _h () {}

  _createComponent () {}

  _l () {}
}

window.MVVM = MVVM


// 获取data
function mergeOptions (options) {
  let opt = Object.assign({}, options)
  let data = opt.data
  if (isFunction(data)) {
    opt.data = data()
  }
  return opt
}

// 生命周期钩子函数
function callHook (vm, hook) {
  const handlers = vm.$options[hook]
  if (handlers) {
    if (Array.isArray(handlers)) {
      for (let i = 0; i < handlers.length; i++) {
        try {
          handlers[i].call(vm)
        } catch (e) {
          handleError(e, vm, `${hook} hook`)
        }
      }
    } else {
      handlers.call(vm)
    }
  }
}