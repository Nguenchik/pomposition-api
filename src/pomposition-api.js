export const defineComponent = ({
  name,
  components,
  setup
}) => {
  const filterSetup = () => {
    const setups = setup()

    const methods = {}
    const data = {}

    const values = Object.entries(setups)

    values.forEach(([k, v]) => {
      if (typeof v === 'function') {
        methods[k] = v
      } else {
        data[k] = v
      }
    })

    const handler2 = {
      get (target) {
        return target
      }
    }

    const pr = new Proxy(data, handler2)
    console.log(pr)

    // console.log('values', values)
    // console.log('data', data)

    return {
      data: () => data,
      methods
    }
  }

  return {
    name,
    components,
    ...filterSetup()
  }
}

function RefImpl (val) {
  this.value = val
  // get value () {
  //     return this.value
  // }
}
// RefImpl.prototype.value = 'as'
Object.defineProperty(RefImpl.prototype, 'value', {
// enumerable: true,
  get: function () {
    return this._value
  },
  set: function (val) {
    console.log('set', val)
    this._value = val
  }
})
// class RefImpl {
//     constructor(defaultVal) {
//         this.value = defaultVal
//     }
//
//     get value() {
//         console.log(this._value)
//         return this._value
//     }
//
//     set value (val){
//         this._value = val
//     }
// }
// const testHandler = {
//     get: function (target) {
//         console.log(111, target)
//         return target.value
//     }
// };

// export const ref = (val) => new RefImpl(val)
// export const ref = (val) => new Proxy(new RefImpl(val), testHandler)
export const ref = (val) => (new Proxy(new RefImpl(val), {
  get (target, property, val) {
    // console.log('target : ', target.value);
    console.log('Property : ', property)
    // console.log('asd : ', asd);
    if (property === 'value') {
      console.log('val', val)
      return val
    } else {
      return () => target.value
    }
  }
}))
