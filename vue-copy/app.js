class Observer {
  constructor (data) {
    this.data = data
    this.walk(data)
  }

  walk (obj) {
    let val 
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        val = obj[key]
        if (typeof val === 'object') {
          new Observer(val)
        }

        this.convert(key, val)
      }
    }
  }

  convert (key, val) {
    Object.defineProperty(this.data, key, {
      enumerable: true,
      configurable: true,
      get: function () {
        console.log('你访问了' + key)
        return val
      },
      set: function (newVal) {
        console.log('你设置了' + key)
        console.log('新的' + key + ' = ' + newVal)
        if (newVal === val) return
        val = newVal
      }
    })
  }
}

var data = {
  user: {
    name: 'shuxingxing',
    age: 25
  },
  address: {
    city: 'suzhou'
  }
}

// new Observer(data)

const op = Object.prototype

class Jsonob {
  constructor (obj, callback) {
    console.log(op.toString.call(obj))
    if (op.toString.call(obj) !== '[object Object]') {
      console.log('This parameter must be an object: ' + obj)
    }
    this.$callback = callback
    this.observe(obj)
  }

  observe (obj) {
    Object.keys(obj).forEach(function (key, index, keyArray) {
      console.log(key, index, keyArray)
      var val = obj[key]
      Object.defineProperty(obj, key, {
        get: function () {
          console.log('你访问了' + key)
          return val
        },
        set: (function (newVal) {
          this.$callback(newVal)
        }).bind(this)
      })

      if (op.toString.call(obj[key]) === '[object Object]') {
        this.observe(obj[key])
      }
    }, this)
  } 
}

var callback = function (newVal) {
  console.log(newVal)
}

new Jsonob(data, callback)