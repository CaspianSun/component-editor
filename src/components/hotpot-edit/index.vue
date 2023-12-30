<script lang="ts" setup>
import { defineExpose, ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import VueDraggableResizable from 'vue3-draggable-resizable'
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'
import { LinkEnum } from '@/common'
import { cloneDeep } from 'lodash-es'
import { ElMessage } from 'element-plus'

const dialogVisible = ref(false)

const handleClickClose = () => {
  dialogVisible.value = false
}
export interface HotpotsListItem {
  id: string
  width: number
  height: number
  left: number
  top: number
  link: Link
}

const activeIndex = ref(0)
const imgLoaded = ref(false)
const addHotpot = () => {
  if (hotpots.value.length >= 10) return
  hotpots.value.push({
    id: uuidv4(),
    width: 100,
    height: 100,
    left: 0,
    top: 0,
    link: {
      uuid: uuidv4(),
      type: 1,
      url: '',
      urlName: '',
    },
  })
  activeIndex.value = hotpots.value.length - 1
}
const src = ref('')
const hotpots = ref<HotpotsListItem[]>([])
const originHotpots = ref<HotpotsListItem[]>([])
const imageWidth = ref(375)
export type Callback = (list: HotpotsListItem[]) => void
let callbackFun: Callback | null = null
const initHotpotEdit = (url: string, list: HotpotsListItem[], width: number, callback: Callback) => {
  if (!url) return ElMessage.warning('请选择图片')
  callbackFun = callback
  originHotpots.value = list
  imageWidth.value = width
  src.value = url
  hotpots.value = cloneDeep(list)
  dialogVisible.value = true
}
export type InitHotpotEdit = typeof initHotpotEdit

const handleSelectLink = (link: Link) => {}

const changeHotpot = (data: { x: number; y: number; w?: number; h?: number }, item: HotpotsListItem) => {
  const newData = {
    left: data.x,
    top: data.y,
    width: data.w ?? item.width,
    height: data.h ?? item.height,
  }
  Object.assign(item, newData)
}

const handleClickSave = () => {
  callbackFun?.(hotpots.value)
  dialogVisible.value = false
}

const changeActiveIndex = (index: number) => {
  activeIndex.value = index
}
const containerRef = ref<HTMLElement | null>(null)

defineExpose({
  initHotpotEdit,
})
</script>

<template>
  <ElDialog
    v-model="dialogVisible"
    append-to-body
    :close-on-click-modal="false"
    destroy-on-close
    lock-scroll
    title="热区编辑"
    width="800px"
    @close="handleClickClose"
  >
    <div
      ref="containerRef"
      class="container"
      :style="{
        width: `${imageWidth * 2}px`,
      }"
    >
      <template v-for="(item, index) in hotpots" :key="index">
        <VueDraggableResizable
          v-if="imgLoaded && containerRef"
          :active="activeIndex == index"
          class-name-draggable="item"
          :draggable="true"
          :h="item.height"
          :handles="['tl', 'tm', 'mr', 'br', 'bm', 'bl', 'ml']"
          :index="item.id"
          :min-h="50"
          :min-w="50"
          :parent="true"
          :resizable="true"
          :w="item.width"
          :x="item.left"
          :y="item.top"
          @activated="changeActiveIndex(index)"
          @drag-end="changeHotpot($event, item)"
          @resize-end="changeHotpot($event, item)"
        >
          <div v-if="activeIndex == index" class="delete">
            <IEpCircleCloseFilled @click="hotpots.splice(index, 1)" />
          </div>
          <div class="drag-item">
            <div class="link" @click="handleSelectLink(item.link)">
              <span v-if="item.link.url"> {{ LinkEnum[item.link.type] }}-{{ item.link.urlName }} </span>
              <span v-else>选择链接</span>
            </div>
          </div>
        </VueDraggableResizable>
      </template>

      <img :src="src" @load="imgLoaded = true" />
    </div>
    <div class="bottom">
      <ElButton @click="addHotpot">添加热区({{ hotpots.length }}/10)</ElButton>
      <ElButton type="primary" @click="handleClickSave">保存</ElButton>
    </div>
    <SelectLink ref="selectLinkRef" />
  </ElDialog>
</template>

<style lang="scss" scoped>
.container {
  width: 750px;
  margin: 0 auto;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  img {
    -webkit-user-drag: none;
    width: 100%;
    height: auto;
    object-fit: cover;
  }
  .item {
    background: rgba(70, 131, 237, 0.2);
    border: 1px solid #6a94dc;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    cursor: move;
  }
  .delete {
    color: #000;
    position: absolute;
    right: -5px;
    top: -5px;
    z-index: 1;
  }
  .drag-item {
    text-align: center;
    .link {
      cursor: pointer;
    }
  }
}
.bottom {
  padding: 20px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
