let delimiters = ['{{', '}}']
let unsafeDelimiters = ['{{{', '}}}']

const config = {
  debug: false,
  silent: false,
  async: true,
  warnExpressionErrors: true,
  devtools: process.env.NODE_ENV !== 'production',
  _delimitersChanged: true,
  _assetTypes: [
    'component',
    'directive',
    'elementDirective',
    'filter',
    'transition',
    'partial'
  ],
  _propBindingModes: {
    ONE_WAY: 0,
    TWO_WAY: 1,
    ONE_TIME: 2
  },
  _maxUpdateCount: 100,
  get delimiters () {
    return delimiters
  },
  set delimiters (val) {
    delimiters = val
  },
  get unsafeDelimiters () {
    return unsafeDelimiters
  },
  set unsafeDelimiters (val) {
    unsafeDelimiters = val
  }
}

export default config