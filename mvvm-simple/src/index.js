import Compiler from './compile'
import { Observer, observe } from './observer.js'
import Watcher from './watcher.js'

class Mvvm {
  constructor (options) {
    this.$options = options || {}
    let data = this._data = this.$options.data 

    // 实现vm.xxx => vm._data.xxx
    Object.keys(data).forEach((key) => {
      this._proxyData(key)
    })

    this._initComputed()

    observe(data, this)

    this.$compile = new Compiler(options.el || document.body, this)
  }

  $watch (key, callback, options) {
    new Watcher(this, key, callback)
  }

  _proxyData (key, setter, getter) {
    setter = setter ||
    Object.defineProperty(this, key, {
      configurable: false,
      enumerable: true,
      get: function proxyGetter () {
        // console.log('你访问了' + this._data[key])
        return this._data[key]
      },
      set: function proxySetter (newVal) {
        this._data[key] = newVal
      }
    })
  }

  _initComputed () {
    let computed = this.$options.computed
    if (typeof computed === 'object') {
      Object.keys(computed).forEach((key) => {
        Object.defineProperty(this, key, {
          get: typeof computed[key] === 'function' ? computed[key] : computed[key].get,
          set: function () {}
        })
      })
    }
  }
}

window.Mvvm = Mvvm