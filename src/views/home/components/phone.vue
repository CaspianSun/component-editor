<script lang="ts" setup>
import { VueDraggable } from 'vue-draggable-plus'
import { storeToRefs } from 'pinia'
import { useStore } from '@/store'

const { dataStore } = useStore()
const { pageComponents, pageSetup, activeComponentIndex } = storeToRefs(dataStore)

const onUpdate = () => {
  //
}
const handleSelectComponents = (index: number) => {
  dataStore.setActiveComponentIndex(index)
}
</script>

<template>
  <!-- TODO 显示缩放功能 -->
  <div class="phone">
    <section
      class="phone-all"
      :style="{
        'background-color': pageSetup.pageBg
      }"
    >
      <HeaderTop :pageSetup="pageSetup" />
      <section class="phone-container">
        <VueDraggable v-model="pageComponents" animation="150" @update="onUpdate">
          <template v-for="(item, index) in pageComponents" :key="index">
            <div
              class="cursor-move drag-item"
              :class="activeComponentIndex === index ? 'active' : ''"
              @click="handleSelectComponents(index)"
            >
              <component :is="item.component" :data="item" :index="index" />
            </div>
          </template>
        </VueDraggable>
      </section>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.phone {
  margin: 0 auto;
  height: 100%;
  padding: 20px;
  overflow-y: scroll;
  background: #f7f8fa;
  moz-user-select: -moz-none;
  -moz-user-select: none;
  -o-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  &::-webkit-scrollbar {
    width: 1px;
  }
  // &::-webkit-scrollbar-thumb {
  //   background-color: #155bd4;
  // }

  /* 手机样式 */
  .phone-all {
    width: 375px;
    min-height: 760px;
    box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.1);
    margin: 45px 0;
    position: relative;

    /* 状态栏 */
    .status-bar {
      width: 100%;
      display: block;
    }

    /* 主体内容 */
    .phone-container {
      min-height: 603px;
      box-sizing: border-box;
      cursor: pointer;
      width: 100%;
      position: relative;
      background-repeat: no-repeat;
      background-size: 100% 100%;
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
