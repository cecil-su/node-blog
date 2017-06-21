import { Dep } from './observer.js'

export default class Watcher {
  constructor (vm, expOrFn, cb) {
    this.cb = cb
    this.vm = vm
    this.expOrFn = expOrFn
    this.depIds = {}

    if (typeof expOrFn === 'function') {
      this.getter = expOrFn
    } else {
      console.log(expOrFn)
      this.getter = this.parseGetter(expOrFn)
    }

    this.value = this.get()
  }

  update () {
    this.run()
  }

  run () {
    let value = this.get()
    let oldVal = this.value
    if (value !== oldVal) {
      this.value = value
      this.cb.call(this.vm, value, oldVal)
    }
  }

  addDep (dep) {
    if (!this.depIds.hasOwnProperty(dep.id)) {
      dep.addSub(this)
      this.depIds[dep.id] = dep
    }
  }

  get () {
    Dep.target = this
    let value = this.getter.call(this.vm, this.vm)
    Dep.target = null
    return value
  }

  parseGetter (exp) {
    if (/[^\w.$]/.test(exp)) return
    let exps = exp.split('.')
    return function (obj) {
      for (let i = 0; i < exps.length; i++) {
        if (!obj) return
        obj = obj[exps[i]]
      }
      return obj
    }
  }
}