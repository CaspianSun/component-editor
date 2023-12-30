import { defineComponent } from 'vue'
import { Plus, Minus, Copy } from '@icon-park/vue-next'

const renderButton = (icon: JSX.Element, title?: string, click?: () => void) => {
  return (
    <div
      title={title}
      class={'bg-#fff flex-center p-5px relative after:(content-empty abs-inset b-1px b-solid b-#eee) hover:after:b-#409eff'}
      onClick={click}
    >
      <div>{icon}</div>
    </div>
  )
}

export const Tools = defineComponent({
  emits: ['zoomIn', 'zoomOut', 'reset'],
  setup(props, { emit }) {
    return () => {
      return (
        <div class={'absolute right-20px bottom-20px '}>
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
