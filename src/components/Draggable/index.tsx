import { defineComponent, ref } from 'vue'
import { draggableEmits, draggableProps } from './draggable'
import { useDraggable } from './useDraggable'

export const Draggable = defineComponent({
  props: draggableProps,
  emits: draggableEmits,
  setup(props, ctx) {
    const eleRef = ref<HTMLElement>()
    const { style, enabled, dragging, elementMouseDown, elementTouchDown } = useDraggable(props, ctx, eleRef)
    return () => (
      <div
        ref={eleRef}
        style={style.value}
        class={[
          'absolute touch-none z-100',
          {
            active: enabled.value,
            dragging: dragging.value,
          },
        ]}
        onMousedown={elementMouseDown}
        onTouchstart={elementTouchDown}
      >
        {ctx.slots.default?.()}
      </div>
    )
  },
})
export default Draggable
