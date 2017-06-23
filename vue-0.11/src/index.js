let _ = require('./uitl')

console.log(_)
let extend = _.extend

function Vue (options) {
  this._init(options)
}

// mixin global api
extend(Vue, require('./api/global'))

Vue.options = {
  directives: '',
  filters: '',
  partials: {},
  transitions: {},
  components: {}
}

let p = Vue.prototype

Object.defineProperty(p, '$data', {
  get: function () {
    return this._data
  },
  set: function (newData) {
    this._setData(newData)
  }
})

// mixin internal instance methods

extend(p, require('./instance/init'))
extend(p, require('./instance/events'))
extend(p, require('./instance/scope'))
extend(p, require('./instance/compile'))

// mixin public api methods 
extend(p, require('./api/data'))
extend(p, require('./api/dom'))
extend(p, require('./api/events'))
extend(p, require('./api/child'))
extend(p, require('./api/lifecycle'))

console.log(Vue)
console.log(Vue.prototype)

window.Vue = Vue

module.exports = _.Vue = Vue