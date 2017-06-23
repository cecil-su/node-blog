let mergeOptions = require('../uitl/merge-option')

exports._init = function (options) {
  console.log(options)
  options = options || {}
  this.$el = null
  this.$parent = options._parent
  this.$root = options._root || this
  this.$ = {}
  this.$$ = {}
  this._watcherList = []
  this._watchers = {}
  this._userWatchers = {}
  this._directives = []

  this._isVue = true
  this._events = {}
  this._eventsCount = {}
  this._eventCancelled = false

  this._isBlock = false
  this._blockStart = 
  this._blockEnd = null

  this._isCompiled = 
  this._isDestroyed = 
  this._isReady = 
  this._isAttached = 
  this._isBeginDestroyed = false

  this._children = []
  this._childCtors = {}

  this._containerUnlinkFn = 
  this._contentUnlinkFn = null

  this._transCpnts = []
  this._host = options._host

  if (this.$parent) {
    this.$parent._children.push(this)
  }
  if (this._host) {
    this._host._transCpnts.push(this)
  }

  this._new = true
  this._reused = false

  options = this.$options = mergeOptions(this.constructor.options, options, this)

  this._data = options.data || {}

  this._initScope()

  this._initEvents()

  this._callHook('created')

  if (options.el) {
    this.$mount(options.el)
  }
}