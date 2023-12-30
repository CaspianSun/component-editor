import { defineComponent, onMounted, ref, watch, nextTick } from 'vue'
import { Draggable } from '../components/Draggable'
import { Tools } from '../components/Tools'
import { useElementSize } from '@vueuse/core'
import { useZoom } from '@/utils/useZoom'
import { usePageSizeStore } from '@/store'

export const Canvas = defineComponent({
  setup() {
    const pageSizeStore = usePageSizeStore()
    const canvasRef = ref<HTMLElement | null>(null)
    const zoomRef = ref<HTMLElement | null>(null)
    const { scale, handleZoom } = useZoom(zoomRef)
    watch(scale, (newScale) => {
      initPagePosition()
    })
    const { width: canvasWidth, height: canvasHeight } = useElementSize(canvasRef)
    watch([canvasWidth, canvasHeight], () => {
      initPagePosition()
    })
    const left = ref(0)
    const top = ref(0)
    const pageRef = ref<HTMLElement | null>(null)
    const setPos = (x: number, y: number) => {
      left.value = x
      top.value = y
    }
    function preventOutOfBounds(x: number, y: number) {
      console.log('preventOutOfBounds')
      const canvas = canvasRef.value as HTMLElement
      const page = pageRef.value as HTMLElement
      const canvasRect = canvas.getBoundingClientRect()
      const pageRect = page.getBoundingClientRect()
      const maxX = canvasRect.width - pageRect.width
      const maxY = canvasRect.height - pageRect.height
      x = Math.max(0, Math.min(x, maxX))
      y = Math.max(0, Math.min(y, maxY))
      setPos(x, y)
    }
    const onDragStop = (x: number, y: number) => {
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
      setPos(newX, newY)
    }

    return () => {
      return (
        <div ref={canvasRef} id='canvas' class={'full relative'}>
          <div ref={zoomRef} class={'full relative overflow-hidden flex'}>
            <Draggable
              draggable={false}
              x={left.value}
              y={top.value}
              grid={[2, 2]}
              scale={scale.value}
              class={'dragging'}
              onDragging={setPos}
              onDragStop={onDragStop}
            >
              <div ref={pageRef} class={'w-100px h-100px bg-#409eff'}></div>
            </Draggable>
          </div>
          <Tools onReset={initPagePosition}></Tools>
        </div>
      )
    }
  },
})
export default Canvas
