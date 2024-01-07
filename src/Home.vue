<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, onBeforeMount, provide } from 'vue'
import { storeToRefs } from 'pinia'
import Components from './layout/Components'
import Config from './layout/Config'
import { Canvas } from './layout/Canvas'
import Resize from './components/Resize'
import { useDataStore, usePageSizeStore, usePageStore } from './store'
import { type OnDrag } from 'gesto'
import { LinkSelectDialog } from './components/LinkSelect/'
import { getPageModulesApi } from './api'

const el = ref<HTMLElement>()
const linkSelectDialogRef = ref<InstanceType<typeof LinkSelectDialog>>()
const { min, leftWidth, rightWidth } = storeToRefs(usePageSizeStore())
const pageSizeStore = usePageSizeStore()
const pageStore = usePageStore()
const dataStore = useDataStore()

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

const getPageModules = async () => {
  const { result } = await getPageModulesApi()
  if (result.rows.length > 0) {
    pageStore.setPages(
      result.rows.map((item) => {
        return {
          ...((item.jsonPage as unknown as PageSetup) || {}),
          id: item.id,
        }
      }),
    )
    const components = result.rows.find((item) => item.type === pageStore.activePageType)
    dataStore.setComponents((components?.jsonData as unknown as ComponentConfig<AllProperty>[]) || [])
    dataStore.resetStack()
  } else {
    pageStore.setDefaultComponents()
  }
}
onBeforeMount(() => {
  getPageModules()
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
provide('openLinkSelect', () => linkSelectDialogRef.value?.open())
</script>

<template>
  <div ref="el" class="page-config-container full flex">
    <div
      :style="{
        minWidth: pageSizeStore.min.leftWidth + 'px',
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
        minWidth: pageSizeStore.min.rightWidth + 'px',
        width: pageSizeStore.rightWidth + 'px',
      }"
    >
      <Config />
    </div>
    <LinkSelectDialog ref="linkSelectDialogRef"></LinkSelectDialog>
  </div>
</template>

<style lang="scss" scoped>
.page-config-container {
  padding: 0 !important;
  overflow: hidden;
}
:deep() {
  .el-tabs {
    display: flex;
    flex-direction: column;
    .el-tab-pane {
      height: 100%;
    }
  }
}
</style>
