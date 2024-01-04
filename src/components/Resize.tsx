import { defineComponent, ref, onMounted, onBeforeUnmount, computed } from 'vue'
import Gesto from 'gesto'

export const Index = defineComponent({
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
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
          if (props.disabled) return
          if (!target.value) return
          emit('change', e)
        })
        .on('dragStart', () => {})
        .on('dragEnd', () => {})
    })

    const dragStyle = computed(() => {
      return {
        borderLeft: props.disabled ? '1px solid #d8dee8' : '1px solid transparent',
        borderRight: props.disabled ? '1px solid #d8dee8' : '1px solid transparent',
        cursor: props.disabled ? 'default' : 'col-resize',
      }
    })

    onBeforeUnmount(() => {
      getso?.value?.unset()
    })

    return () => {
      return (
        <div
          ref={target}
          class={'w-6px  bg-#d8dee8 bg-origin-padding bg-clip-padding hover:(b-l-color-#d8dee8! b-r-color-#d8dee8!)'}
          style={{
            ...dragStyle.value,
          }}
        ></div>
      )
    }
  },
})
export default Index
