<script lang="ts" setup>
import { useStore } from '@/store'
import SelectImage from '@/components/select-img/index.vue'
import SelectLink from '@/components/select-link/index.vue'
import HotpotsEdit from '@/components/hotpot-edit/index.vue'
import { selectImageKey, selectLinkKey, hotpotsEditKey } from '@/provider/index'
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
const hotpotsEditRef = ref<InstanceType<typeof HotpotsEdit> | null>(null)
onMounted(() => {
  provide(selectImageKey, selectImageRef?.value?.initSelectImage)
  provide(selectLinkKey, selectLinkRef?.value?.initSelectLink)
  provide(hotpotsEditKey, hotpotsEditRef?.value?.initHotpotEdit)
})
</script>

<template>
  <SelectImage ref="selectImageRef" />
  <SelectLink ref="selectLinkRef" />
  <HotpotsEdit ref="hotpotsEditRef" />
  <div class="config">
    <template v-if="selectImageRef && selectLinkRef && HotpotsEdit">
      <Transition mode="out-in" name="slide-up">
        <component
          :is="activeComponent.component + 'Config'"
          :key="activeComponentIndex"
          :data="activeComponent.setStyle"
        />
      </Transition>
    </template>
  </div>
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
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
