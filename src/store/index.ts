import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import { PiniaUndo } from './plugin/undo'
export { useDataStore } from './modules/data'
export { usePageStore } from './modules/page'
export { usePageSizeStore } from './modules/pageSize'

const pinia = createPinia()
pinia.use(piniaPluginPersistedState)
pinia.use(PiniaUndo)

export default pinia
