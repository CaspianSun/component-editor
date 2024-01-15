import { computed, defineComponent } from 'vue'
import { CornerDownLeft, CornerDownRight, Refresh, Save, SettingWeb } from '@icon-park/vue-next'
import { useDataStore } from '../store'
import { ElButton, ElMessage } from 'element-plus'
import { createPageModuleApi, updatePageModuleApi } from '../api'
import { usePageStore } from '../store'

const pageStore = usePageStore()
const dataStore = useDataStore()
const buttonList = [
  {
    title: '撤销',
    icon: <CornerDownLeft size={18} />,
    click: () => dataStore.undo(),
    disabled: computed(() => dataStore.stackIndex === 1),
  },
  {
    title: '重做',
    icon: <CornerDownRight size={18} />,
    click: () => dataStore.redo(),
    disabled: computed(() => dataStore.stackIndex === dataStore.stackLength),
  },
  {
    title: '重置',
    icon: <Refresh size={18} />,
    click: () => dataStore.reset(),
    disabled: computed(() => dataStore.stackLength === 1),
  },
]

const renderButton = (item: (typeof buttonList)[0]) => {
  return (
    <div
      class={'flex-center flex-col px-10px mx-10px cursor-pointer hover:c-#409eff'}
      onClick={() => {
        if (!item.disabled.value) item.click()
      }}
      style={{
        color: item.disabled.value ? '#c0c4cc' : '#606266',
      }}
    >
      <div>{item.icon}</div>
      <span class={'text-12px text-nowrap'}>{item.title}</span>
    </div>
  )
}

export const handleSave = async () => {
  const activePage = pageStore.activePage
  if (activePage?.id) {
    const { result, code } = await updatePageModuleApi(activePage.id, {
      jsonData: dataStore.components as unknown as string,
      jsonPage: pageStore.activePage as unknown as string,
      type: activePage.type,
    })
    if (result[0] > 0) {
      ElMessage.success('保存成功')
      dataStore.resetStack()
      Promise.resolve()
    } else {
      Promise.reject()
      ElMessage.error('保存失败')
    }
  } else {
    const { result, code } = await createPageModuleApi({
      jsonData: dataStore.components as unknown as string,
      jsonPage: pageStore.activePage as unknown as string,
      type: activePage?.type,
    })
    if (code != -1 && result?.id) {
      ElMessage.success('保存成功')
      dataStore.resetStack()
      Promise.resolve()
    } else {
      Promise.reject()
      ElMessage.error('保存失败')
    }
  }
}

export const Header = defineComponent({
  setup() {
    return () => {
      return (
        <div class={'h-50px flex bg-#fff px-15px b-b-1px b-b-solid b-b-#ebeef5 select-none'}>
          <div class={'w-170px min-w-0'}></div>
          <div class={'h-full  flex-center flex-1'}>
            {buttonList.map((item) => {
              return renderButton(item)
            })}
          </div>
          <div class={'flex flex-row-reverse items-center'}>
            <ElButton size='small' icon={<Save></Save>} type='primary' onClick={handleSave}>
              保存
            </ElButton>
            <ElButton
              size='small'
              type='default'
              class={'mr-10px'}
              icon={<SettingWeb></SettingWeb>}
              onClick={() => dataStore.setActiveComponentId(null)}
            >
              页面设置
            </ElButton>
          </div>
        </div>
      )
    }
  },
})
export default Header
