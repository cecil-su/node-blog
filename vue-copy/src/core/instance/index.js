import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin} from './events'
import { lifecycleMixin } from './lifecycle'
// import { warn } from '../util/index'

function Vue (options) {
  console.log(options)
  this._init(options)
}

initMixin(Vue)
stateMixin(Vue)
renderMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)

export default Vue