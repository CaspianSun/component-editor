// store/index.ts
import { createPinia } from 'pinia'
import DataStore from './modules/data'

export function useStore() {
  return {
    dataStore: DataStore(),
  }
}

const pinia = createPinia()
export default pinia
