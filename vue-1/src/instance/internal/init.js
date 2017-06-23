import { mergeOptions } from '../../util/index'
let uid = 0

export default function (Vue) {
  Vue.prototype._init = function (options) {
    options = options || {}

    this.$el = null
    this.$parent = options.parent
    this.$root = this.$parent ? this.$parent.$root : this
    this.$children = []
    this.$refs = {}
    this.$els = {}
    this._watchers = []
    this._directives = []

    this._uid = uid++
    this._isVue = true

    this._events = {} // registered callbacks
    this._eventsCount = {}

    this._isFragment = false
    this._fragement = 
    this._fragementStart = 
    this._fragementEnd = null

    this._isCompiled = 
    this._isDestroyed = 
    this._isReady = 
    this._isAttached = 
    this._isBeginDestroyed = 
    this._vForRemoving = false
    this._unlinkFn = null

    this._context = options._context || this.$parent

    this._scope = options._scope

    this._frag = options._frag
    if (this._frag) {
      this._frag.children.push(this)
    }

    if (this.$parent) {
      this.$parent.$children.push(this)
    }

    options = this.$options = mergeOptions(
      this.constructor.options,
      options,
      this
    )
    
    // set ref
    // this._updateRef()

    this._data = {}

    this._callHook('init')
  }
}