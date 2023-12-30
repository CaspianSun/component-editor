import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'
import Gesto from 'gesto'

export const Index = defineComponent({
  emits: ['change'],
  setup(props, { emit }) {
    const target = ref<HTMLElement | null>(null)
    const getso = ref<Gesto | null>(null)

    onMounted(() => {
      if (!target.value) return
      getso.value = new Gesto(target.value, {
        container: window,
        pinchOutside: true,
      })
        .on('drag', (e) => {
          if (!target.value) return
          emit('change', e)
        })
        .on('dragStart', () => {})
        .on('dragEnd', () => {})
    })

    onBeforeUnmount(() => {
      getso?.value?.unset()
    })

    return () => {
      return (
        <div
          ref={target}
          class={'w-8px  bg-#d8dee8 bg-origin-padding bg-clip-padding cursor-col-resize hover:(b-l-color-#d8dee8! b-r-color-#d8dee8!)'}
          style={{
            borderLeft: '1px solid transparent',
            borderRight: '1px solid transparent',
          }}
        ></div>
      )
    }
  },
})
export default Index
