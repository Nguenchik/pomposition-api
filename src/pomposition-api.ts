export const defineComponent = ({
  name,
  components,
  setup
}: {
  name: string,
  components: unknown,
  setup: () => Record<string, unknown>
}): {
  name: string
  components: unknown,
} => {
  const filterSetup = () => {
    const setups = setup()

    const methods: Record<string, unknown> = {}
    const data: Record<string, unknown> = {}

    const values = Object.entries(setups)

    values.forEach(([k, v]) => {
      if (typeof v === 'function') {
        methods[k] = v
      } else {
        data[k] = v
      }
    })

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

function RefImpl (this: { value: unknown }, val: unknown) {
  this.value = val
}

Object.defineProperty(RefImpl.prototype, 'value', {
// enumerable: true,
  get: function () {
    return this._value
  },
  set: function (val) {
    this._value = val
  }
})

// export const ref = (val: unknown) => new (RefImpl as any)(val)

export const ref = (value: unknown): Record<string, unknown> => {
  return new Proxy(
    {
      value
    },
    {
      get (target: Record<string, unknown>, key: string) {
        if (key === 'value') {
          return target.value
        }
        return target[key]
      },
      set (target, key: string, newValue) {
        if (key === 'value') {
          target.value = newValue
        } else {
          target[key] = newValue
        }
        return true
      }
    }
  )
}
