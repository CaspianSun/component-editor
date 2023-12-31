import { Transition, defineComponent, computed, defineAsyncComponent, h } from 'vue'
import { storeToRefs } from 'pinia'
import { useDataStore } from '../store'

export const Config = defineComponent({
  setup(props, {}) {
    const dataStore = useDataStore()
    const { components, activeComponentIndex } = storeToRefs(dataStore)
    const activeComponent = computed(() => {
      if (typeof activeComponentIndex.value == 'number') {
        return components.value[activeComponentIndex.value]
      } else {
        return {
          component: 'pageSetup',
          setStyle: {},
          configPage: () => import('../common/page-setup/config.vue'),
        }
      }
    })
    return () => {
      return (
        <div class={'flex flex-col p-16px h-full'}>
          <Transition mode='out-in' name='slid e-up'>
            {h(defineAsyncComponent(activeComponent.value.configPage), {
              data: activeComponent.value.setStyle,
            })}
          </Transition>
        </div>
      )
    }
  },
})
export default Config
