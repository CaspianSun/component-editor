<script lang="ts" setup>
import { useStore } from '@/store'
import SelectImage from '@/components/select-img/index.vue'
import SelectLink from '@/components/select-link/index.vue'
import { selectImageKey, selectLinkKey } from '@/provider/index'
const { dataStore } = useStore()
const { components, activeComponentIndex } = storeToRefs(dataStore)
const activeComponent = computed(() => {
  if (typeof activeComponentIndex.value == 'number') {
    return components.value[activeComponentIndex.value]
  } else {
    return {
      component: 'pageSetup',
      setStyle: {}
    }
  }
})
const selectImageRef = ref<InstanceType<typeof SelectImage> | null>(null)
const selectLinkRef = ref<InstanceType<typeof SelectLink> | null>(null)
onMounted(() => {
  provide(selectImageKey, selectImageRef?.value?.initSelectImage)
  provide(selectLinkKey, selectLinkRef?.value?.initSelectLink)
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
  <SelectImage ref="selectImageRef" />
  <SelectLink ref="selectLinkRef" />
</template>

<style lang="scss" scoped>
.config {
  width: 450px;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  position: relative;
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
