import type { PiniaPluginContext } from 'pinia'

function createStack<T>(current: T) {
  const stack = [current]
  let index = stack.length
  function update() {
    current = stack[index - 1]
    return current
  }
  return {
    push: (value: T) => {
      stack.length = index
      stack[index++] = value
      return update()
    },
    undo: () => {
      if (index > 1) index -= 1
      return update()
    },
    redo: () => {
      if (index < stack.length) index += 1
      return update()
    },
    index: () => index,
    length: () => stack.length,
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
  let stack = createStack(removeOmittedKeys(options, store, serializer))
  let preventUpdateOnSubscribe = false
  const setIndexLength = () => {
    store.stackIndex = stack.index()
    store.stackLength = stack.length()
  }
  setIndexLength()
  store.undo = () => {
    preventUpdateOnSubscribe = true
    store.$patch(stack.undo())
    setIndexLength()
  }
  store.redo = () => {
    preventUpdateOnSubscribe = true
    store.$patch(stack.redo())
    setIndexLength()
  }
  store.resetStack = () => {
    stack = createStack(removeOmittedKeys(options, store, serializer))
    setIndexLength()
  }
  store.$subscribe(
    () => {
      if (preventUpdateOnSubscribe) {
        preventUpdateOnSubscribe = false
        return
      }
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
