import { defineComponent, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useDataStore } from '../store'
import { configInstanceMap } from '../common'
import { v4 as uuid } from 'uuid'

export const Config = defineComponent({
  setup() {
    const dataStore = useDataStore()
    const { activeComponentId } = storeToRefs(dataStore)
    const activeComponent = computed(() => {
      const item = dataStore.activeComponent
      if (typeof activeComponentId.value == 'string' && item) return item
      else dataStore.setActiveComponentId(null)
      return {
        component: 'page-setup',
        setStyle: {},
        id: uuid(),
      }
    })
    const Config = computed(() => {
      return configInstanceMap.get(activeComponent.value.component)?.value
    })
    return () => {
      return (
        <div class={`h-full`}>
          <Config.value key={activeComponent.value.id} data={activeComponent.value.setStyle}></Config.value>
        </div>
      )
    }
  },
})
export default Config
