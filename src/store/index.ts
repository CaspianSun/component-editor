import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { PiniaUndo } from './plugin/undo'
export { useDataStore } from './modules/data'
export { usePageSizeStore } from './modules/pageSize'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
pinia.use(PiniaUndo)

export default pinia
