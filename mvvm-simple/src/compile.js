// https://github.com/DMQ/mvvm/blob/master/js/compile.js
import Watcher from './watcher.js'

export default class Compile {
  constructor (el, vm) {
    this.$vm = vm 
    this.$el = this.isElementNode(el) ? el : document.querySelector(el)

    if (this.$el) {
      this.$fragment = this.node2Fragment(this.$el)
      this.init()
      this.$el.appendChild(this.$fragment)
    }
  }

  node2Fragment (el) {
    let fragment = document.createDocumentFragment(), child 
    while (child = el.firstChild) {
      fragment.appendChild(child)
    }
    return fragment
  }

  init () {
    this.compileElement(this.$fragment)
  }

  compileElement (el) {
    // console.log(el)
    // #document-fragment
    let childNodes = el.childNodes
    // array-like 对象，需要转换成数组
    // console.log(Array.prototype.slice.call(childNodes))
    Array.prototype.slice.call(childNodes).forEach((node, index) => {
      // console.log(node, index)
      // nodeType
      // 1: 元素名 2：属性名称
      let text = node.textContent
      let reg = /\{\{(.*)\}\}/
      // console.log(node)
      if (this.isElementNode(node)) {
        this.compile(node)
      } else if (this.isTextNode(node) && reg.test(text)) {
        // console.log('text' + RegExp.$1)
        this.compileText(node, RegExp.$1)
      }
      if (node.childNodes && node.childNodes.length) {
        this.compileElement(node)
      }
    })
  }

  compile (node) {
    let nodeAttrs = node.attributes
    Array.prototype.slice.call(nodeAttrs).forEach((attr) => {
      let attrName = attr.name 
      if (this.isDirective(attrName)) {
        let exp = attr.value
        let dir = attrName.substring(2)
        // console.log(dir)
        // 事件指令
        if (this.isEventDirective(dir)) {
          compileUtil.eventHanlder(node, this.$vm, exp, dir)
        } else {
          compileUtil[dir] && compileUtil[dir](node, this.$vm, exp)
        }

        node.removeAttribute(attrName)
      }
    })
  }

  compileText (node, exp) {
    compileUtil.text(node, this.$vm, exp)
  }

  isDirective (attr) {
    return attr.indexOf('v-') == 0
  }

  isEventDirective (dir) {
    return dir.indexOf('on') === 0
  }

  isElementNode (node) {
    return node.nodeType == 1
  }

  isTextNode (node) {
    return node.nodeType == 3
  }
}

const compileUtil = {
  text (node, vm, exp) {
    this.bind(node, vm, exp, 'text')
  },
  html (node, vm, exp) {
    this.bind(node, vm, exp, 'html')
  },
  model (node, vm, exp) {
    this.bind(node, vm, exp, 'model')
    let val = this._getVMVal(vm, exp)
    node.addEventListener('input', (e) => {
      let newVal = e.target.value
      if (val === newVal) {
        retuprn
      }
      this._setVMVal(vm, exp, newVal)
      val = newVal
    })
  },
  class (node, vm, exp) {
    this.bind(node, vm, exp, 'class')
  },
  bind (node, vm, exp, dir) {
    let updaterFn = updater[dir + 'Updater']
    // console.log(updaterFn)
    updaterFn && updaterFn(node, this._getVMVal(vm, exp))

    new Watcher(vm, exp, (value, oldVal) => {
      updaterFn && updaterFn(node, value, oldVal)
    })
  },
  eventHanlder (node, vm, exp, dir) {
    let eventType = dir.split(':')[1]
    let fn = vm.$options.methods && vm.$options.methods[exp]

    if (eventType && fn) {
      node.addEventListener(eventType, fn.bind(vm), false)
    }
  },
  _getVMVal (vm, exp) {
    let val = vm
    exp = exp.split('.')
    exp.forEach((k) => {
      val = val[k]
    })
    return val
  },
  _setVMVal (vm, exp, value) {
    let val = vm 
    exp = exp.split('.')
    exp.forEach((k, i) => {
      if (i < exp.length - 1) {
        val = val[k]
      } else {
        val[k] = value
      }
    })
  }
}

const updater = {
  textUpdater (node, value) {
    node.textContent = typeof value == 'undefined' ? '' : value
  },
  htmlUpdater (node, value) {
    node.innerHTML = typeof value == 'undefined' ? '' : value
  },
  classUpdater (node, value, oldVal) {
    let className = node.className
    className = className.replace(oldVal, '').replace(/\s$/, '')

    let space = className && String(value) ? ' ' : ''

    node.className = className + space + value
  },
  modelUpdater (node, value, oldVal) {
    node.value = typeof value == 'undefined' ? '' : value
  }
}