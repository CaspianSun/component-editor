import { defineComponent, onMounted, ref, watch } from 'vue'
import { Tools } from '../components/Tools'
import { Header } from './Header'
import { Footer } from './Footer'
import { useElementSize } from '@vueuse/core'
import Phone from './Phone.vue'
import Panzoom, { PanzoomObject } from '@panzoom/panzoom'

export const Canvas = defineComponent({
  setup() {
    const canvasRef = ref<HTMLElement | null>(null)
    const { height: canvasHeight } = useElementSize(canvasRef)
    const isFirst = ref(true)
    watch(canvasHeight, () => {
      setStartScale()
      if (isFirst.value) {
        isFirst.value = false
        canvasPanzoom.value?.reset()
        return
      }
    })
    const child = ref<HTMLElement | null>(null)
    const canvasPanzoom = ref<PanzoomObject | null>(null)
    function zoomWheel(e: WheelEvent) {
      e.preventDefault()
      if (e.deltaY < 0) canvasPanzoom.value?.zoomIn()
      else canvasPanzoom.value?.zoomOut()
    }
    const setStartScale = () => {
      const scaleHeight = canvasHeight.value / 862
      canvasPanzoom.value?.setOptions({
        startScale: scaleHeight > 1 ? 1 : scaleHeight,
      })
    }
    const scaleNumber = ref(1)
    onMounted(() => {
      canvasPanzoom.value = Panzoom(canvasRef.value!, {
        minScale: 0.5,
        maxScale: 1.5,
        step: 0.05,
        setTransform: (elem: any, { x, y, scale }: Record<string, number>) => {
          scaleNumber.value = scale
          child.value!.style.transform = `translate(${x * scale}px, ${y * scale}px) scale(${scale})`
        },
      })
    })
    return () => {
      return (
        <div class={'flex full bg-#f7f7f9 flex-col'}>
          <Header></Header>
          <div
            class={'flex-1 flex-center'}
            style={{
              backgroundSize: '18px 18px',
              backgroundPosition: '0 0, 9px 9px',
              backgroundImage: 'radial-gradient(rgba(9,89,194,.3) 6%,transparent 0),radial-gradient(#faf9f8 6%,transparent 0)',
            }}
          >
            <div ref={canvasRef} id='canvas' class={'full relative flex-center'} onWheel={zoomWheel}>
              <div ref={child} class={'flex panzoom-exclude cursor-default'}>
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
export default Canvas
