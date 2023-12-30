import { defineComponent, ref } from 'vue'
import { draggableEmits, draggableProps } from './draggable'
import { useDraggable } from './useDraggable'

export const Draggable = defineComponent({
  replace: true,
  props: draggableProps,
  emits: draggableEmits,
  setup(props, ctx) {
    const eleRef = ref<HTMLElement>()
    const draggable = useDraggable(props, ctx, eleRef)

    return () => (
      <div
        ref={eleRef}
        style={draggable.style.value}
        class={[
          {
            [props.classNameActive]: draggable.enabled,
            [props.classNameDragging]: draggable.dragging,
            [props.classNameDraggable]: draggable,
          },
          props.className,
        ]}
        onMousedown={draggable.elementMouseDown}
        onTouchstart={draggable.elementTouchDown}
      >
        {ctx.slots.default?.()}
      </div>
    )
  },
})
export default Draggable
