import { computed, defineComponent, onMounted, ref } from 'vue'
import { Tools } from '../components/Tools'
import { Header } from './Header'
import { Footer } from './Footer'
import { useElementSize } from '@vueuse/core'
import Phone from './Phone.vue'
import Panzoom, { PanzoomObject } from '@panzoom/panzoom'

export const Konva = defineComponent({
  setup() {
    const canvasRef = ref<HTMLElement | null>(null)
    const { width: canvasWidth, height: canvasHeight } = useElementSize(canvasRef)
    const child = ref<HTMLElement | null>(null)
    const canvasPanzoom = ref<PanzoomObject | null>(null)
    function zoomWheel(e: WheelEvent) {
      e.preventDefault()
      if (e.deltaY < 0) {
        canvasPanzoom.value?.zoomIn()
      } else {
        canvasPanzoom.value?.zoomOut()
      }
    }

    onMounted(() => {
      canvasPanzoom.value = Panzoom(canvasRef.value!, {
        minScale: 0.5,
        maxScale: 1.5,
        startScale: 0.8,
        setTransform: (elem: any, { x, y, scale }: Record<string, number>) => {
          child.value!.style.transform = `translate(${x * scale}px, ${y * scale}px) scale(${scale})`
        },
      })
    })
    return () => {
      return (
        <div class={'flex full bg-#f7f7f9 flex-col'}>
          <Header></Header>
          <div class={'flex-1 flex-center'}>
            <div ref={canvasRef} id='canvas' class={'full relative flex-center'} onWheel={zoomWheel}>
              <div ref={child} class={'flex'}>
                <Phone></Phone>
              </div>

              <Tools
                onZoomIn={canvasPanzoom.value?.zoomIn}
                onZoomOut={canvasPanzoom.value?.zoomOut}
                onReset={canvasPanzoom.value?.reset}
              ></Tools>
            </div>
          </div>
          <Footer></Footer>
        </div>
      )
    }
  },
})
export default Konva
