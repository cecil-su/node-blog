

export default function (Vue) {
  Vue.use = function (plugin) {
    if (plugin.installed) {
      return
    }
    plugin.installed = true
    return this
  }
}