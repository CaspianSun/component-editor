<script lang="ts" setup>
import { v4 as uuidv4 } from 'uuid'
import VueDraggableResizable from 'vue3-draggable-resizable'
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'
import { LinkEnum } from '@/componentProperty'
import _ from 'lodash'
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
export type InitHotpotEdit = (url: string, list: HotpotsListItem[]) => void
const initHotpotEdit = (url: string, list: HotpotsListItem[]) => {
  if (!url) return
  src.value = url
  hotpots.value = list
  dialogVisible.value = true
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
    <div class="container">
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
            <CommonSelectLink :link="item.link">
              <span v-if="item.link.url">
                {{ LinkEnum[item.link.type] }}-{{ item.link.urlName }}
              </span>
              <span v-else>选择链接</span>
            </CommonSelectLink>
          </div>
        </VueDraggableResizable>
      </template>

      <img :src="src" @load="imgLoaded = true" />
    </div>
    <div class="bottom">
      <ElButton @click="addHotpot">添加热区({{ hotpots.length }}/10)</ElButton>
      <ElButton type="primary" @click="handleClickClose">保存</ElButton>
    </div>
  </ElDialog>
</template>

<style lang="scss" scoped>
.container {
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
  }
}
.bottom {
  padding: 20px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
