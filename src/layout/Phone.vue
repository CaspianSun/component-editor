<script lang="ts" setup>
import { onMounted, computed } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { storeToRefs } from 'pinia'
import { useDataStore, usePageStore } from '../store'
import { componentInstanceMap } from '../common'

const dataStore = useDataStore()
const { components, activeComponentId } = storeToRefs(dataStore)
const pageStore = usePageStore()
const activePage = computed(() => pageStore.activePage)

const handleSelectComponents = (id: string | undefined) => {
  dataStore.setActiveComponentId(id)
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
    <div class="box rd-30px overflow-hidden">
      <div class="header">
        <img src="../assets/images/top.png" />
        <div class="header-title relative c-black z-1000">
          {{ activePage.title }}
        </div>
      </div>
      <div
        class="content"
        :style="{
          backgroundColor: activePage.pageBg,
          backgroundImage: activePage.pageBgImg ? `url(${activePage.pageBgImg})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }"
      >
        <VueDraggable
          v-model="components"
          :disabled="activePage.options?.disableAdd || false"
          :animation="150"
          group="components"
          class="flex-1 w-full h-full"
        >
          <div
            v-for="item in components"
            :id="item.id"
            :key="item.id"
            class="cursor-move drag-item"
            :class="activeComponentId === item.id ? 'active' : ''"
            @click="handleSelectComponents(item.id)"
          >
            <component :is="componentInstanceMap.get(item.component)?.value" :id="item.id" :data="item.setStyle" :editable="true" />
          </div>
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
  position: absolute;
  background: #f7f8fa;
  moz-user-select: -moz-none;
  -moz-user-select: none;
  -o-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width: 0;
  height: 0;

  .box {
    position: absolute;
    top: -431px;
    left: -187px;
    width: 375px;
    height: 812px;
    box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.1);
    margin: 25px 0;
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
