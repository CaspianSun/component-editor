<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia'
import Components from './layout/Components'
import Config from './layout/Config'
import { Canvas } from './layout/Canvas'
import Resize from './components/Resize'
import { usePageSizeStore } from './store'
import { type OnDrag } from 'gesto'

const el = ref<HTMLElement>()
const { min, leftWidth, rightWidth } = storeToRefs(usePageSizeStore())
const pageSizeStore = usePageSizeStore()

const getCenterWidth = (clientWidth: number, l = 0, r = 0) => {
  let right = r > 0 ? r : 0
  let left = l > 0 ? l : 0
  let center = clientWidth - left - right
  if (center < min.value.centerWidth) {
    center = min.value.centerWidth
    if (right > center + min.value.rightWidth) {
      right = clientWidth - left - center
    } else {
      right = min.value.rightWidth
      left = clientWidth - right - center
    }
  }
  return {
    center,
    left,
    right,
  }
}

let clientWidth = 0
const center = ref(0)
const resizerObserver = new ResizeObserver((entries) => {
  for (const { contentRect } of entries) {
    clientWidth = contentRect.width
    let left = leftWidth.value
    let right = rightWidth.value
    if (left > clientWidth) left = clientWidth / 3
    if (right > clientWidth) right = clientWidth / 3
    const columnWidth = getCenterWidth(clientWidth, left, right)
    center.value = columnWidth.center
    pageSizeStore.setWidth({
      left: columnWidth.left,
      center: center.value,
      right: columnWidth.right,
    })
  }
})

onMounted(() => {
  if (el.value) resizerObserver.observe(el.value)
})

const changeLeft = ({ deltaX }: OnDrag) => {
  let left = Math.max(leftWidth.value + deltaX, min.value.leftWidth) || 0
  pageSizeStore.setLeftWidth(left)
  if (clientWidth - left - (rightWidth.value || 0) <= 0) left = leftWidth.value
  const columnWidth = getCenterWidth(clientWidth, left, rightWidth.value || 0)
  center.value = columnWidth.center
  pageSizeStore.setWidth({
    left: columnWidth.left,
    center: center.value,
    right: columnWidth.right,
  })
}

const changeRight = ({ deltaX }: OnDrag) => {
  let right = Math.max(rightWidth.value - deltaX, min.value.rightWidth) || 0
  pageSizeStore.setRightWidth(right)
  if (clientWidth - (leftWidth.value || 0) - right <= 0) right = rightWidth.value
  const columnWidth = getCenterWidth(clientWidth, leftWidth.value, right)
  center.value = columnWidth.center
  pageSizeStore.setWidth({
    left: columnWidth.left,
    center: center.value,
    right: columnWidth.right,
  })
}

onBeforeUnmount(() => {
  resizerObserver.disconnect()
})
</script>

<template>
  <div ref="el" class="page-config-container full flex">
    <div
      :style="{
        width: pageSizeStore.leftWidth + 'px',
      }"
    >
      <Components />
    </div>
    <Resize @change="changeLeft" />
    <div
      :style="{
        width: pageSizeStore.centerWidth + 'px',
      }"
    >
      <Canvas />
    </div>
    <Resize @change="changeRight" />
    <div
      :style="{
        width: pageSizeStore.rightWidth + 'px',
      }"
    >
      <Config />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-config-container {
  padding: 0 !important;
  overflow: hidden;
}
</style>
