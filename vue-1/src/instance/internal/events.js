
export default function (Vue) {


  Vue.prototype._callHook = function (hook) {
    this.$emit('pre-hook:' + hook)
    let handlers = this.$options[hook]
    if (handlers) {
      for (let i = 0, j = handlers.length; i < j; i++) {
        handlers[i].call(this)
      }
    }
    this.$emit('hook:' + hook)
  }
}