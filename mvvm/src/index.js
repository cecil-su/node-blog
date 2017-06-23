import { query, warn, idToTemplate, toString, resolveAsset, hasOwn, isFunction, createElement, remove, bind } from './core/utils'
import { initData, initComputed, initMethods, initWatch } from './core/instance'

let uid = 0
export default class Mvvm {
  constructor (options) {
    this.$options = options
    this.$options.delimiters = this.$options.delimiters || ['{{', '}}']
    this._uid = uid++
    this._watchers = []
    callHook(this, 'beforeCreate')
    if (options.data) {
      initData(this, options.data)
    }
    if (options.computed) {
      initComputed(this, options.computed)
    }
    if (options.watch) {
      initWatch(this, options.watch)
    }
    if (options.methods) {
      initMethods(this, options.methods)
    }

    this.$mount(options.el)
    callHook(this, 'created')
  }
  static use () {}
  static $set () {}
  static $delete () {}
  $mount (el) {
    let options = this.$options
    this.$el = el = el && query(el)
    console.log(this.$el)
    if (!options.render) {
      let template = options.template
      if (template) {

      } else if (el) {
        template = getOuterHTML(el)
      }
      if (template) {
      }
    }
  }
  $wtach () {}
  $forceUpdate () {}
  $destroy () {}
  _render () {}
  _update () {}
  _h () {}
  _l () {}
  _createComponent () {}
}

function callHook(vm, hook) {
  const handles = vm.$options[hook]
  console.log(Array.isArray(handles))
  if (handles) {
    if (Array.isArray(handles)) {
      for (let i = 0; i < handles.length; i++) {
        try {
          handles[i].call(vm)
        } catch (e) {
          handleError(e, vm, `${hook} hook`)
        }
      }
    } else {
      handles.call(vm)
    }
  }
}

console.log(Mvvm.prototype)

window.Mvvm = Mvvm