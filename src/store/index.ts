import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import { PiniaUndo } from './plugin/undo'
import serialize from 'serialize-javascript'
export { useDataStore } from './modules/data'
export { usePageStore } from './modules/page'
export { usePageSizeStore } from './modules/pageSize'

const pinia = createPinia()
pinia.use(piniaPluginPersistedState)
pinia.use((args) =>
  PiniaUndo({
    ...args,
    serializer: {
      serialize: (value, options) => serialize(value, options),
      deserialize: (value: string) => eval('(' + value + ')'),
    },
  }),
)

export default pinia
