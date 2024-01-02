import { defineComponent, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { v4 as uuid } from 'uuid'
import { ElCollapse, ElCollapseItem, ElMessage } from 'element-plus'
import { cloneDeep } from 'lodash-es'
import { useDataStore } from '../store'
import componentProperty, { GroupEnum } from '../common/index'
import { VueDraggable } from 'vue-draggable-plus'

export const Components = defineComponent({
  setup(props, ctx) {
    interface ComponentItem extends Pick<ComponentProperty, 'icon' | 'component'> {
      title: string
    }

    interface DataItem {
      title: string
      componentsList: ComponentItem[]
    }
    const dataStore = useDataStore()
    const { components } = storeToRefs(dataStore)
    const activeNames = ref([1, 2, 3])
    const data = Array.from(componentProperty.values())
      .sort((a, b) => {
        return (a.sort ?? 0) - (b.sort ?? 0)
      })
      .reduce((acc, cur) => {
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

    const handleClick = (item: ComponentItem) => {
      const component = componentProperty.get(item.component)
      if (component?.component == 'user' && components.value.findIndex((item) => item.component == 'user') !== -1) {
        ElMessage({
          message: `${item.title}组件只能添加一个`,
          type: 'info',
        })
        return
      }
      if (component) {
        const newComponent = cloneDeep(component)
        newComponent.id = uuid()
        components.value.push(newComponent)
      } else {
        ElMessage({
          message: `组件 ${item.title} 不存在`,
          type: 'error',
        })
      }
    }

    const clone = (original: ComponentItem) => {
      const component = componentProperty.get(original.component)
      if (component?.component == 'user' && components.value.findIndex((item) => item.component == 'user') !== -1) {
        ElMessage({
          message: `${original.title}组件只能添加一个`,
          type: 'info',
        })
        return
      }
      if (component) {
        const newComponent = cloneDeep(component)
        newComponent.id = uuid()
        return newComponent
      } else {
        ElMessage({
          message: `组件 ${original.title} 不存在`,
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
                          clone={clone}
                          class={'grid grid-cols-[repeat(auto-fill,85px)] justify-center w-full'}
                        >
                          {items.componentsList.map((item) => {
                            return (
                              <div
                                class={
                                  'cursor-move w-70px mx-a mt-5px mb-10px h-70px relative cursor-pointer rd-5px bg-#fff flex-center flex-col b-1px b-solid b-#ebeef5 hover:b-#409eff'
                                }
                                onClick={() => handleClick(item)}
                              >
                                <p>{item.title}</p>
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
