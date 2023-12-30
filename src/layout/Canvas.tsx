import { defineComponent, onMounted, ref, watch, nextTick } from 'vue'
import { Draggable } from '../components/Draggable'
import { Tools } from '../components/Tools'
import { useElementSize } from '@vueuse/core'
import { debounce } from 'lodash-es'

export const Canvas = defineComponent({
  setup() {
    const canvasRef = ref<HTMLElement | null>(null)
    const { width: canvasWidth, height: canvasHeight } = useElementSize(canvasRef)
    watch([canvasWidth, canvasHeight], () => {
      debounce(updatePagePosition, 100)()
    })

    const pageRef = ref<HTMLElement | null>(null)
    const left = ref(0)
    const top = ref(0)

    const onDragging = (x: number, y: number) => {
      left.value = x
      top.value = y
    }
    function updatePagePosition() {
      const canvas = canvasRef.value as HTMLElement
      const page = pageRef.value as HTMLElement
      if (!canvas || !page) return
      const canvasRect = canvas.getBoundingClientRect()
      const pageRect = page.getBoundingClientRect()
      const newX = pageRect.left - canvasRect.left
      const newY = pageRect.top - canvasRect.top
      preventOutOfBounds(newX, newY)
    }
    function preventOutOfBounds(x: number, y: number) {
      const canvas = canvasRef.value as HTMLElement
      const page = pageRef.value as HTMLElement
      const canvasWidth = canvas.offsetWidth
      const canvasHeight = canvas.offsetHeight
      const pageWidth = page.offsetWidth
      const pageHeight = page.offsetHeight
      const maxX = canvasWidth - pageWidth
      const maxY = canvasHeight - pageHeight
      x = Math.max(0, Math.min(x, maxX))
      y = Math.max(0, Math.min(y, maxY))
      left.value = x
      top.value = y
    }
    const onDragstop = (x: number, y: number) => {
      preventOutOfBounds(x, y)
    }
    const initPagePosition = () => {
      const canvas = canvasRef.value as HTMLElement
      const page = pageRef.value as HTMLElement
      if (!canvas || !page) return
      const canvasRect = canvas.getBoundingClientRect()
      const pageRect = page.getBoundingClientRect()
      const newX = canvasRect.width / 2 - pageRect.width / 2
      const newY = canvasRect.height / 2 - pageRect.height / 2
      preventOutOfBounds(newX, newY)
    }
    onMounted(() => {
      nextTick(() => {
        initPagePosition()
      })
    })

    return () => {
      return (
        <div ref={canvasRef} id='canvas' class={'full relative overflow-hidden flex'}>
          <Draggable x={left.value} y={top.value} class={'dragging'} draggable={true} onDragging={onDragging} onDragstop={onDragstop}>
            <div ref={pageRef} class={'w-100px h-100px bg-#409eff'}></div>
          </Draggable>
          <Tools onReset={initPagePosition}></Tools>
        </div>
      )
    }
  },
})
export default Canvas
