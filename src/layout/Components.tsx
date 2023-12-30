import { defineComponent, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import { ElCollapse, ElCollapseItem, ElMessage } from 'element-plus'
import { cloneDeep } from 'lodash-es'
import { useDataStore } from '../store'
import componentProperty, { GroupEnum } from '../common/index'

interface ComponentItem {
  title: string
  icon: string | undefined
  component: string
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
      title: cur.cName,
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
    newComponent.id = uuidv4()
    components.value.push(newComponent)
  } else {
    ElMessage({
      message: `组件 ${item.title} 不存在`,
      type: 'error',
    })
  }
}

export const Components = defineComponent({
  setup() {
    return () => {
      return (
        <div class={'p-16px bg-#fff'}>
          <div class={'text-18px font-bold mb-15px'}>组件库</div>
          <ElCollapse modelValue={activeNames.value}>
            {data.map((items, index) => {
              return (
                <ElCollapseItem name={index + 1} title={items.title}>
                  {{
                    default: () => {
                      return (
                        <div class={'flex flex-wrap'}>
                          {items.componentsList.map((item) => {
                            return (
                              <div
                                class={
                                  'w-72px h-72px relative mr-15px mt-8px cursor-pointer rd-5px overflow-hidden bg-#fff flex-center flex-col b-1px b-solid b-#ebeef5 hover:b-#409eff'
                                }
                                onClick={() => handleClick(item)}
                              >
                                <p>{item.title}</p>
                              </div>
                            )
                          })}
                        </div>
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