import { Transition, defineComponent, computed, defineAsyncComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { useDataStore } from '../store'
import { configInstanceMap } from '../common'

export const Config = defineComponent({
  setup() {
    const dataStore = useDataStore()
    const { components, activeComponentIndex, activeComponentId } = storeToRefs(dataStore)
    const activeComponent = computed(() => {
      const item = components.value.find((item, index) => item.id == activeComponentId.value)
      if (typeof activeComponentIndex.value == 'number' && item) return item
      else dataStore.setActiveComponentIndex(null)
      return {
        component: 'page-setup',
        setStyle: {},
      }
    })
    const Config = computed(() => {
      return configInstanceMap.get(activeComponent.value.component)?.value
    })
    return () => {
      return (
        <div class={'p-16px h-full overflow-hidden'}>
          <Transition mode='out-in' name='slid e-up'>
            <Config.value data={activeComponent.value.setStyle}></Config.value>
          </Transition>
        </div>
      )
    }
  },
})
export default Config
