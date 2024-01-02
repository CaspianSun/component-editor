import { Transition, defineComponent, computed, defineAsyncComponent, h } from 'vue'
import { storeToRefs } from 'pinia'
import { useDataStore } from '../store'

export const Config = defineComponent({
  setup(props, {}) {
    const dataStore = useDataStore()
    const { components, activeComponentIndex, activeId } = storeToRefs(dataStore)
    const activeComponent = computed(() => {
      const item = components.value.find((item, index) => item.id == activeId.value)
      if (typeof activeComponentIndex.value == 'number' && item) {
        return item
      } else {
        dataStore.setActiveComponentIndex(null)
      }
      return {
        component: 'pageSetup',
        setStyle: {},
        configPage: () => import('../common/page-setup/config.vue'),
      }
    })
    return () => {
      return (
        <div class={'flex flex-col p-16px h-full'}>
          <Transition mode='out-in' name='slid e-up'>
            {activeComponent?.value?.configPage &&
              h(defineAsyncComponent(activeComponent.value.configPage), {
                data: activeComponent.value.setStyle,
              })}
          </Transition>
        </div>
      )
    }
  },
})
export default Config
