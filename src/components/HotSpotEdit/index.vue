<script lang="ts" setup>
import { inject, ref } from 'vue'
import { v4 as uuid } from 'uuid'
import VueDraggableResizable from 'vue3-draggable-resizable'
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'
import { cloneDeep } from 'lodash-es'
import { ElMessage, ElDialog, ElButton } from 'element-plus'
import { CloseOne } from '@icon-park/vue-next'
import { Page, pageNameMap } from '../../enum/page'
import { InjectKey } from '../LinkSelect'

export interface HotSpotListItem {
  id: string
  width: number
  height: number
  left: number
  top: number
  link?: Link
}

const dialogVisible = ref(false)
const activeIndex = ref(0)
const imgLoaded = ref(false)
const addHotSpot = () => {
  if (hotSpot.value.length >= 10) return ElMessage.warning('最多添加10个热区')
  hotSpot.value.push({
    id: uuid(),
    width: 100,
    height: 100,
    left: 0,
    top: 0,
    link: {
      type: 1,
      url: void 0,
      name: '',
    },
  })
  activeIndex.value = hotSpot.value.length - 1
}
const src = ref('')
const hotSpot = ref<HotSpotListItem[]>([])
const originHotSpot = ref<HotSpotListItem[]>([])
const imageWidth = ref(375)
const resolveFn = ref<(data: HotSpotListItem[]) => void>()
const initHotSpotEdit = (url: string, list: HotSpotListItem[], width: number) => {
  return new Promise<HotSpotListItem[]>((resolve, reject) => {
    if (!url) {
      ElMessage.warning('请选择图片')
      return reject()
    }
    resolveFn.value = resolve
    originHotSpot.value = list
    imageWidth.value = width
    src.value = url
    hotSpot.value = cloneDeep(list)
    dialogVisible.value = true
  })
}

const openLinkSelect = inject(InjectKey)
const handleSelectLink = (link?: Link) => {
  openLinkSelect?.().then((page) => {
    if (!page) return
    const newLink = {
      type: 1,
      url: page.type,
      id: `${page.id}`,
      name: pageNameMap[page.type],
    }
    if (link) {
      Object.assign(link, newLink)
    } else {
      hotSpot.value[activeIndex.value].link = newLink
    }
  })
}

const changeHotSpot = (data: { x: number; y: number; w?: number; h?: number }, item: HotSpotListItem) => {
  const newData = {
    left: data.x,
    top: data.y,
    width: data.w ?? item.width,
    height: data.h ?? item.height,
  }
  Object.assign(item, newData)
}

const handleClickSave = () => {
  resolveFn.value?.(hotSpot.value)
  dialogVisible.value = false
}
const handleClickClose = () => {
  dialogVisible.value = false
  resolveFn.value = void 0
  originHotSpot.value = []
  hotSpot.value = []
}

const changeActiveIndex = (index: number) => {
  activeIndex.value = index
}
const wrapperRef = ref<HTMLElement | null>(null)

defineExpose({
  initHotSpotEdit,
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
      ref="wrapperRef"
      class="wrapper"
      :style="{
        width: `${imageWidth}px`,
      }"
    >
      <template v-for="(item, index) in hotSpot" :key="index">
        <VueDraggableResizable
          v-if="imgLoaded && wrapperRef"
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
          @drag-end="changeHotSpot($event, item)"
          @resize-end="changeHotSpot($event, item)"
        >
          <div v-if="activeIndex == index" class="delete">
            <CloseOne theme="filled" size="18" fill="#000000" @click="hotSpot.splice(index, 1)" />
          </div>
          <div class="drag-item">
            <div class="link" @click="handleSelectLink(item.link)">
              <span v-if="item.link?.url">{{ item.link.name }}</span>
              <span v-else>选择链接</span>
            </div>
          </div>
        </VueDraggableResizable>
      </template>
      <img :src="src" class="img-shadow" @load="imgLoaded = true" />
    </div>
    <div class="bottom">
      <ElButton @click="addHotSpot">添加热区({{ hotSpot.length }}/10)</ElButton>
      <ElButton type="primary" @click="handleClickSave">保存</ElButton>
    </div>
  </ElDialog>
</template>

<style lang="scss" scoped>
.wrapper {
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
    background: rgba(70, 131, 237, 0.4);
    border: 1px solid #6a94dc;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: bold;
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
  .img-shadow {
    box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.1);
  }
}
.bottom {
  padding: 20px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
