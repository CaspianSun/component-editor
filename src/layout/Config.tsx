import { Transition, defineComponent, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useDataStore } from '../store'
import { kebabCase } from 'lodash-es'
import PageSetupConfig from '../common/page-setup/config.vue'

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
        }
      }
    })
    return () => {
      return (
        <div class={'flex flex-col p-16px h-full'}>
          <Transition mode='out-in' name='slide-up'>
            {() => {
              switch (activeComponent.value.component) {
                case 'pageSetup':
                  return <PageSetupConfig />
                default:
                  return <div>暂无配置</div>
              }
            }}
          </Transition>
        </div>
      )
    }
  },
})
export default Config
