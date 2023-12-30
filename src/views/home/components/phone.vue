<script lang="ts" setup>
import { VueDraggable } from 'vue-draggable-plus'
import { SortableEvent } from 'sortablejs'
import { storeToRefs } from 'pinia'
import { useDataStore } from '@/store/modules/data'
const { dataStore } = useStore()
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
const deleteComponent = () => {
  if (activeComponentIndex.value !== null) {
    dataStore.deleteComponent(activeComponentIndex.value)
  }
}
</script>

<template>
  <!-- TODO 显示缩放功能 -->
  <div class="phone">
    <ElScrollbar max-height="100%">
      <div
        class="container"
        :style="{
          'background-color': pageSetup.pageBg,
        }"
      >
        <div class="header">
          <img src="@/assets/images/phoneTop.png" />
          <template v-if="pageSetup.tabbarStyle == 1">
            <div class="header-title">
              {{ pageSetup.title }}
            </div>
          </template>
        </div>
        <section class="content">
          <VueDraggable v-model="components" :animation="150" @update.stop="onUpdate">
            <template v-for="(item, index) in components" :key="item.id">
              <div
                class="cursor-move drag-item"
                :class="activeComponentIndex === index ? 'active' : ''"
                @click="handleSelectComponents(index)"
              >
                <component :is="item.component" :data="item.setStyle" :index="item.id" />
                <template v-if="activeComponentIndex === index">
                  <div class="controls">
                    <div v-if="activeComponentIndex !== 0" class="controls-item" @click.stop="dataStore.adjustComponentOrder('up')">
                      <ElIcon><IEpArrowUp /></ElIcon>
                    </div>
                    <div class="controls-item" @click.stop="deleteComponent">
                      <ElIcon><IEpDelete /></ElIcon>
                    </div>
                    <div
                      v-if="activeComponentIndex !== components.length - 1"
                      class="controls-item"
                      @click.stop="dataStore.adjustComponentOrder('down')"
                    >
                      <ElIcon><IEpArrowDown /></ElIcon>
                    </div>
                  </div>
                </template>
              </div>
            </template>
          </VueDraggable>
        </section>
      </div>
    </ElScrollbar>
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

  .container {
    width: 375px;
    min-height: 760px;
    box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.1);
    margin: 45px auto;
    position: relative;
    overflow-x: visible;

    .header {
      width: 100%;
      background: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
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
      box-sizing: border-box;
      cursor: pointer;
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
        .controls {
          position: absolute;
          right: -60px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          background-color: #fff;
          border-radius: 4px;
          &-item {
            padding: 10px 15px;
          }
        }
      }
    }
  }
}
</style>
