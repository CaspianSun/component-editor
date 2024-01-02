import type { PiniaPluginContext } from 'pinia'

class CreateStack<T> {
  constructor(current: T) {
    this.stack = [current]
  }
  public stack: T[]
  public index = 1
  push(value: T) {
    this.stack.length = this.index
    this.stack[this.index++] = value
    return this.update()
  }
  undo() {
    if (this.index > 1) this.index -= 1
    return this.update()
  }
  redo() {
    if (this.index < this.stack.length) this.index += 1
    return this.update()
  }
  update() {
    return this.stack[this.index - 1]
  }
  get current() {
    return this.stack[this.index - 1]
  }
  get length() {
    return this.stack.length
  }
}

type Store = PiniaPluginContext['store']
type Options = PiniaPluginContext['options']

interface Serializer {
  serialize: (value: any) => string
  deserialize: (value: string) => any
}

/**
 * Removes properties from the store state.
 * @param options The options object defining the store passed to `defineStore()`.
 * @param store The store the plugin is augmenting.
 * @param serializer Custome serializer to serialize state before storing it in the undo stack.
 * @returns {object} State of the store without omitted keys.
 */
function removeOmittedKeys(
  options: Options,
  store: Store,
  serializer: Serializer = { serialize: JSON.stringify, deserialize: JSON.parse },
): Store['$state'] {
  const clone = serializer.deserialize(serializer.serialize(store.$state))
  if (options.undo && options.undo.omit) {
    options.undo.omit.forEach((key) => {
      delete clone[key]
    })
    return clone
  }
  return clone
}

type PluginOptions = PiniaPluginContext & {
  /**
   * Custome serializer to serialize state before storing it in the undo stack.
   */
  serializer?: Serializer
}

/**
 * Adds Undo/Redo properties to your store.
 *
 * @example
 *
 * ```ts
 * import { PiniaUndo } from 'pinia-undo'
 *
 * // Pass the plugin to your application's pinia plugin
 * pinia.use(PiniaUndo)
 * ```
 */
export function PiniaUndo({ store, options, serializer }: PluginOptions) {
  if (!options.undo || !options.undo.enable) return
  let stack = new CreateStack(removeOmittedKeys(options, store, serializer))
  let preventUpdateOnSubscribe = false

  const setIndexLength = () => {
    store.stackIndex = stack.index
    store.stackLength = stack.length
  }
  setIndexLength()
  store.undo = () => {
    preventUpdateOnSubscribe = true
    store.$patch(serializer?.deserialize(serializer.serialize(stack.undo())))
    setIndexLength()
  }
  store.redo = () => {
    preventUpdateOnSubscribe = true
    store.$patch(serializer?.deserialize(serializer.serialize(stack.redo())))
    setIndexLength()
  }
  store.resetStack = () => {
    stack = new CreateStack(removeOmittedKeys(options, store, serializer))
    setIndexLength()
  }
  store.$subscribe(
    () => {
      if (preventUpdateOnSubscribe) return (preventUpdateOnSubscribe = false)
      const data = removeOmittedKeys(options, store, serializer)
      if (serializer?.serialize(data) === serializer?.serialize(stack.current)) return
      stack.push(removeOmittedKeys(options, store, serializer))
      setIndexLength()
    },
    {
      flush: 'sync',
    },
  )
}

declare module 'pinia' {
  export interface PiniaCustomProperties {
    /**
     * Undo/Redo a state.
     *
     * @example
     *
     * ```ts
     * const counterStore = useCounterStore()
     *
     * counterStore.increment();
     * counterStore.undo();
     * counterStore.redo();
     *
     * counterStore.$reset();
     * counterStore.resetStack();
     * ```
     */
    stackIndex: number
    stackLength: number
    undo: () => void
    redo: () => void
    resetStack: () => void
  }

  export interface DefineStoreOptionsBase<S, Store> {
    /**
     * Disable or ignore specific fields.
     *
     * @example
     *
     * ```js
     * defineStore({
     *   id: 'counter',
     *   state: () => ({ count: 0, foo: 'bar' })
     *   undo: {
     *     // An array of fields that the plugin will ignore.
     *     omit: ['name'],
     *     // Disable history tracking of this store.
     *     disable: true
     *   }
     * })
     * ```
     */
    undo?: {
      enable?: boolean
      omit?: Array<keyof S>
    }
  }
}
