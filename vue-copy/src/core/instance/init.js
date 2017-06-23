import { callHook } from './lifecycle'
import { extend, mergeOptions, formatComponentName } from '../util/index'

let uid = 0
export function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    this._uid = uid++
    let startTag, endTag
    this._isVue = true

    this._self = this
    
    if (options && options._isComponent) {
      initInternalComponent(this, options)
    } else {
      this.$options = mergeOptions(
        resolveConstructorOptions(this.constructor),
        options || {},
        this
      )
    }

    callHook(this, 'beforeCreate')
    callHook(this, 'created')
  }
}

function initInternalComponent () {}

export function resolveConstructorOptions () {}

function resolveModifiedOptions () {}

function dedupe () {}