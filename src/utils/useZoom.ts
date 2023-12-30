import { computed, onMounted, ref, watch } from 'vue'
import type { Ref } from 'vue'

export const useZoom = (refs: Ref<HTMLElement | undefined | null>, options?: any) => {
  const scale = ref(1)
  watch(scale, (value) => {
    if (refs.value) {
      refs.value.style.transform = `scale(${value})`
      refs.value.style.width = `${100 / value}%`
      refs.value.style.height = `${100 / value}%`
    }
  })
  function zoomWheel(e: WheelEvent) {
    e.preventDefault()
    if (e.deltaY < 0) {
      handleZoom(0.1)
    } else {
      handleZoom(-0.1)
    }
  }
  function handleZoom(zoom: number) {
    const value = Number((Number(scale.value) + zoom).toFixed(1))
    if (zoom > 0) {
      scale.value = Math.min(3, value)
    } else {
      scale.value = Math.max(0.3, value)
    }
  }
  onMounted(() => {
    if (refs.value) {
      refs.value.style.position = 'relative'
      refs.value.style.transformOrigin = 'left top'
      refs.value.addEventListener('wheel', zoomWheel)
    }
  })
  return { scale, zoomWheel, handleZoom }
}
