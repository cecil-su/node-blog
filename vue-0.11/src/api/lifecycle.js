let _ = require('../uitl')

exports.$mount = function () {}

function ready () {
  this._isAttached = true
  this._isReady = true
  this._callHook('ready')
}

exports.$destroy = function () {}

exports.$compile = function () {}