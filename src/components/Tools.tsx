import { storeToRefs } from 'pinia'
import { defineComponent } from 'vue'
import { Plus, Minus, Copy, Up, DeleteFour, Down } from '@icon-park/vue-next'
import { JSX } from 'vue/jsx-runtime'
import { useDataStore } from '../store'

const renderButton = (icon: JSX.Element, title?: string, click?: () => void) => {
  return (
    <div
      title={title}
      class={'bg-#fff flex-center p-5px relative after:(content-empty abs-inset b-1px b-solid b-#eee) hover:after:b-#409eff cursor-pointer'}
      onClick={click}
    >
      {icon}
    </div>
  )
}

export const Tools = defineComponent({
  emits: ['zoomIn', 'zoomOut', 'reset'],
  setup(props, { emit }) {
    const dataStore = useDataStore()
    const { activeComponentIndex, components } = storeToRefs(dataStore)
    const deleteComponent = () => {
      if (activeComponentIndex.value !== null) dataStore.deleteComponent(activeComponentIndex.value)
    }
    return () => {
      return (
        <div class={'absolute right-20px bottom-20px cursor-default'}>
          {activeComponentIndex.value != null && (
            <div class={'mb-10px'}>
              {activeComponentIndex.value !== 0 &&
                renderButton(<Up size={20}></Up>, '上移组件', () => dataStore.adjustComponentOrder('up'))}
              {activeComponentIndex.value !== dataStore.length - 1 &&
                renderButton(<Down size={20}></Down>, '下移组件', () => dataStore.adjustComponentOrder('down'))}
              {renderButton(<DeleteFour size={20}></DeleteFour>, '删除组件', () => deleteComponent())}
            </div>
          )}

          <div class={'mb-10px'}>
            {renderButton(<Plus size={20}></Plus>, '放大', () => emit('zoomIn'))}
            {renderButton(<Minus size={20}></Minus>, '缩小', () => emit('zoomOut'))}
          </div>
          {renderButton(<Copy size={20}></Copy>, '还原', () => emit('reset'))}
        </div>
      )
    }
  },
})
export default Tools
