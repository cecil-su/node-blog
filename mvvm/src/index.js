console.log('mvvm')

class Mvvm {
  constructor (options) {
    this.$options = options || {}
    let data = this._data = this.$options.data 

    // 实现vm.xxx => vm._data.xxx
    Object.keys(data).forEach((key) => {
      this._proxyData(key)
    })

    this._initComputed()

    this.$compile = new Compiler(options.el || document.body, this)
  }

  $watch (key, callback, options) {
    new Watcher(this, key, callback)
  }

  _proxyData () {}

  _initComputed () {}
}

class Observer {}

class Compiler {}

class Watcher {}

window.Mvvm = Mvvm