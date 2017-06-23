module.exports = {
  prefix: 'v-',
  debug: false,
  silent: false,
  proto: true,
  interpolate: true,
  async: true,
  warnExpressionErrors: true,
  _delimitersChanged: true
}

let delimiters = ['{{', '}}']
Object.defineProperty(module.exports, 'delimiters', {
  get: function () {
    return delimiters
  },
  set: function (val) {
    delimiters = val
    this._delimitersChanged = true
  }
})