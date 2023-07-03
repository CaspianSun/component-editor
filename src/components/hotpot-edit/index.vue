<script lang="ts" setup>
import { v4 as uuidv4 } from 'uuid'
import VueDraggableResizable from 'vue3-draggable-resizable'
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'
import { LinkEnum } from '@/componentProperty'
import _ from 'lodash'
import { ElMessage } from 'element-plus'
import SelectLink from '@/components/select-link/index.vue'

const selectLinkRef = ref<InstanceType<typeof SelectLink> | null>(null)

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
      urlName: ''
    }
  })
  activeIndex.value = hotpots.value.length - 1
}
const src = ref('')
const hotpots = ref<HotpotsListItem[]>([])
const imageWidth = ref(375)
export type InitHotpotEdit = (url: string, list: HotpotsListItem[], width: number) => void
const initHotpotEdit = (url: string, list: HotpotsListItem[], width: number) => {
  if (!url) return ElMessage.warning('请选择图片')
  imageWidth.value = width
  src.value = url
  hotpots.value = list
  dialogVisible.value = true
}

const handleSelectLink = (link: Link) => {
  selectLinkRef.value?.initSelectLink?.(
    (item: import('@/components/select-link/index.vue').CallbackLinkItem) => {
      link.url = item.pagePath
      link.urlName = item.name
      link.type = item.type
    }
  )
}

defineExpose({
  initHotpotEdit
})
</script>

<template>
  <ElDialog
    v-model="dialogVisible"
    append-to-body
    :close-on-click-modal="false"
    lock-scroll
    title="热区编辑"
    width="800px"
    @close="handleClickClose"
  >
    <div class="top"></div>
    <div
      class="container"
      :style="{
        width: `${imageWidth * 2}px`
      }"
    >
      <template v-for="(item, index) in hotpots" :key="index">
        <VueDraggableResizable
          v-if="imgLoaded"
          v-model:h="item.height"
          v-model:w="item.width"
          v-model:x="item.left"
          v-model:y="item.top"
          :active="activeIndex == index"
          classNameDraggable="item"
          :draggable="true"
          :initH="item.width"
          :initW="item.height"
          :min-h="50"
          :min-w="50"
          :parent="true"
          :resizable="true"
        >
          <div class="drag-item">
            <div class="link" @click="handleSelectLink(item.link)">
              <span v-if="item.link.url">
                {{ LinkEnum[item.link.type] }}-{{ item.link.urlName }}
              </span>
              <span v-else>选择链接</span>
            </div>
          </div>
        </VueDraggableResizable>
      </template>

      <img :src="src" @load="imgLoaded = true" />
    </div>
    <div class="bottom">
      <ElButton @click="addHotpot">添加热区({{ hotpots.length }}/10)</ElButton>
      <ElButton type="primary" @click="handleClickClose">保存</ElButton>
    </div>
    <SelectLink ref="selectLinkRef" />
  </ElDialog>
</template>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  width: 750px;
  min-height: 500px;
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
