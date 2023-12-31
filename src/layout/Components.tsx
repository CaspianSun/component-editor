import { defineComponent, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { v4 as uuid } from 'uuid'
import { ElCollapse, ElCollapseItem, ElMessage } from 'element-plus'
import { cloneDeep } from 'lodash-es'
import { useDataStore, usePageStore } from '../store'
import { GroupEnum, componentConfigMap } from '../common/index'
import { VueDraggable } from 'vue-draggable-plus'

export const Components = defineComponent({
  setup() {
    interface ComponentItem extends Pick<ComponentConfig, 'icon' | 'component'> {
      title: string
    }

    interface DataItem {
      title: string
      componentsList: ComponentItem[]
    }
    const dataStore = useDataStore()
    const pageStore = usePageStore()
    const { components } = storeToRefs(dataStore)
    const activeNames = ref([1, 2, 3])
    const data = Array.from(componentConfigMap.values())
      .sort((a, b) => {
        return (a.sort ?? 0) - (b.sort ?? 0)
      })
      .reduce((acc, cur) => {
        if (cur.group === GroupEnum['隐藏']) return acc
        const groupName = GroupEnum[cur.group]
        const groupIndex = acc.findIndex((item) => item.title === groupName)
        if (groupIndex === -1) {
          acc.push({
            title: groupName,
            componentsList: [],
          })
        }
        acc[groupIndex !== -1 ? groupIndex : acc.length - 1].componentsList.push({
          title: cur.title,
          icon: cur.icon,
          component: cur.component,
        })
        return acc
      }, [] as DataItem[])

    const handleAdd = (item: ComponentItem, type: 'click' | 'drag' = 'click') => {
      if (pageStore.activePage?.options?.disableAdd) return false
      const component = componentConfigMap.get(item.component)
      if (component?.component == 'user' && components.value.findIndex((item) => item.component == 'user') !== -1) {
        return ElMessage({
          message: `${item.title}组件只能添加一个`,
          type: 'info',
        })
      }
      if (component) {
        const newComponent = cloneDeep(component)
        newComponent.id = uuid()
        if (type === 'click') {
          components.value.push(newComponent)
        } else {
          return newComponent
        }
      } else {
        ElMessage({
          message: `组件 ${item.title} 不存在`,
          type: 'error',
        })
      }
    }

    return () => {
      return (
        <div class={'p-16px bg-#fff'}>
          <h3>组件库</h3>
          <ElCollapse modelValue={activeNames.value}>
            {data.map((items, index) => {
              return (
                <ElCollapseItem name={index + 1} title={items.title}>
                  {{
                    default: () => {
                      return (
                        <VueDraggable
                          modelValue={items.componentsList}
                          animation={150}
                          group={{ name: 'components', pull: 'clone', put: false }}
                          sort={false}
                          clone={(e) => handleAdd(e, 'drag')}
                          class={'grid grid-cols-[repeat(auto-fill,85px)] justify-center w-full'}
                        >
                          {items.componentsList.map((item) => {
                            return (
                              <div
                                class={
                                  'cursor-move w-70px mx-a mt-5px mb-10px h-70px relative cursor-pointer rd-5px bg-#fff flex-center flex-col b-1px b-solid b-#ebeef5 hover:b-#409eff'
                                }
                                onClick={() => handleAdd(item)}
                              >
                                <span>{item.title}</span>
                              </div>
                            )
                          })}
                        </VueDraggable>
                      )
                    },
                  }}
                </ElCollapseItem>
              )
            })}
          </ElCollapse>
        </div>
      )
    }
  },
})
export default Components
