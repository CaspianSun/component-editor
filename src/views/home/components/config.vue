<script lang="ts" setup>
import { useStore } from '@/store'
const { dataStore } = useStore()
const { pageComponents, activeComponentIndex } = storeToRefs(dataStore)
const activeComponent = computed(() => {
  if (typeof activeComponentIndex.value == 'number') {
    return pageComponents.value[activeComponentIndex.value]
  } else {
    return {
      component: 'pageSetup',
      setStyle: {}
    }
  }
})
</script>

<template>
  <div class="config">
    <component
      :is="activeComponent.component + 'Config'"
      :key="activeComponentIndex"
      :data="activeComponent.setStyle"
    />
  </div>
</template>

<style lang="scss" scoped>
.config {
  width: 450px;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  position: relative;
  padding: 0 15px;
  background: #fff;
  &::-webkit-scrollbar {
    width: 1px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #155bd4;
  }
}
@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
