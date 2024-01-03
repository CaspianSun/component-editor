<script lang="ts" setup>
import { defineAsyncComponent, onMounted } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { SortableEvent } from 'sortablejs'
import { storeToRefs } from 'pinia'
import { useDataStore } from '../store'

withDefaults(
  defineProps<{
    scale: number
  }>(),
  {
    scale: 1,
  },
)
const dataStore = useDataStore()
const { components, pageSetup, activeComponentIndex } = storeToRefs(dataStore)

const onUpdate = (e: SortableEvent) => {
  if (e.newIndex !== undefined && e.oldIndex !== undefined) {
    if (e.newIndex === e.oldIndex) return
    dataStore.setActiveComponentIndex(e.newIndex)
  }
}
const handleSelectComponents = (index: number) => {
  dataStore.setActiveComponentIndex(index)
}

onMounted(() => {
  const content = document.querySelector('.content')
  if (content) {
    content.addEventListener('wheel', (e) => {
      e.stopPropagation()
    })
  }
})
</script>

<template>
  <div class="phone">
    <div
      class="box rd-30px overflow-hidden"
      :style="{
        'background-color': pageSetup.pageBg,
      }"
    >
      <div class="header">
        <img src="../assets/images/top.png" />
        <div class="header-title relative c-black z-1000">
          {{ pageSetup.title }}
        </div>
      </div>
      <div class="content">
        <VueDraggable v-model="components" class="flex-1" group="components" :animation="150" @update.stop="onUpdate">
          <template v-for="(item, index) in components" :key="item.id">
            <div
              class="cursor-move drag-item"
              :class="activeComponentIndex === index ? 'active' : ''"
              @click="handleSelectComponents(index)"
            >
              <component
                :is="defineAsyncComponent(() => import(`../common/${item.component}/index.vue`))"
                :data="item.setStyle"
                :index="item.id"
              />
            </div>
          </template>
        </VueDraggable>
      </div>
      <div class="absolute bottom-8px left-50% transform-translate-x--50% z-100">
        <img class="h-6px" src="../assets/images/block.png" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.phone {
  flex: 1;
  height: 100%;
  background: #f7f8fa;
  moz-user-select: -moz-none;
  -moz-user-select: none;
  -o-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;

  .box {
    width: 375px;
    height: 812px;
    box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.1);
    margin: 45px 0;
    position: relative;
    overflow-x: visible;
    display: flex;
    flex-direction: column;

    .header {
      width: 100%;
      background: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      img {
        pointer-events: none;
        position: absolute;
        width: 100%;
        height: 88px;
        top: 0;
        z-index: 500;
      }

      .header-title {
        font-weight: 700;
        width: 100%;
        height: 88px;
        padding-top: 44px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .content {
      flex: 1;
      display: flex;
      height: 100%;
      overflow-y: auto;
      overflow-x: visible;
      box-sizing: border-box;
      cursor: pointer;
      position: relative;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      &::-webkit-scrollbar {
        display: none;
      }

      .drag-item {
        position: relative;

        &.active {
          &::after {
            border: 1px solid #155bd4;
          }
          &:hover::after {
            border: 1px solid #155bd4;
          }
        }
        &::after {
          content: '';
          position: absolute;
          z-index: 20;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: block;
          clear: both;
        }
        &:hover::after {
          border: 1px dashed #155bd4;
        }
      }
    }
  }
}
</style>
