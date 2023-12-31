import { computed, defineComponent, watch } from 'vue'
import { CornerDownLeft, CornerDownRight, Refresh } from '@icon-park/vue-next'
import { useDataStore } from '../store'

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
      onClick={() => item.click()}
      style={{
        color: item.disabled.value ? '#c0c4cc' : '#606266',
      }}
    >
      <div>{item.icon}</div>
      <span class={'text-12px'}>{item.title}</span>
    </div>
  )
}

export const Header = defineComponent({
  setup() {
    return () => {
      return (
        <div class={'h-50px b-b-1px b-b-solid b-b-#ebeef5 flex-center bg-#fff select-none'}>
          {buttonList.map((item) => {
            return renderButton(item)
          })}
        </div>
      )
    }
  },
})
export default Header
