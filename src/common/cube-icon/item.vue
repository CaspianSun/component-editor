<script lang="ts" setup>
import {} from 'vue'
const props = defineProps<{
  editable: boolean
  data?: CubeIcon['option'][0]
}>()
</script>

<template>
  <div class="full overflow-hidden relative">
    <div class="abs-full text-0">
      <img v-if="data?.bg" :src="data.bg" class="full object-cover" draggable="false" />
    </div>
    <div class="full flex-col-center relative cube-item" :class="editable ? 'editable' : ''">
      <div
        v-if="data?.icon"
        :style="{
          marginTop: data?.spacing + 'px',
          marginBottom: data?.spacing + 'px',
        }"
      >
        <img :src="data?.icon" class="w-50rpx h-50rpx" />
      </div>
      <span
        v-if="data?.text"
        :style="{
          color: data?.textColor,
          fontSize: data?.textSize + 'px',
          marginTop: data?.spacing + 'px',
          marginBottom: data?.spacing + 'px',
        }"
      >
        {{ data?.text || '' }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.editable {
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border: 1px dashed #000;
  }
}
</style>
