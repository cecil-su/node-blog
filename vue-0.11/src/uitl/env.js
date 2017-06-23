exports.hasProto = '__proto__' in {}

var toString = Object.prototype.toString
var inBrowser = exports.inBrowser = 
  typeof window !== 'undefined' &&
  toString.call(window) !== '[object Object]'

exports.nextTick = (function () {})()

exports.isIE9 = inBrowser && navigator.userAgent.indexOf('MSIE 9.0') > 0

if (inBrowser && !exports.isIE9) {
  var isWebkitTrans =
    window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  var isWebkitAnim =
    window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  exports.transitionProp = isWebkitTrans
    ? 'WebkitTransition'
    : 'transition'
  exports.transitionEndEvent = isWebkitTrans
    ? 'webkitTransitionEnd'
    : 'transitionend'
  exports.animationProp = isWebkitAnim
    ? 'WebkitAnimation'
    : 'animation'
  exports.animationEndEvent = isWebkitAnim
    ? 'webkitAnimationEnd'
    : 'animationend'
}