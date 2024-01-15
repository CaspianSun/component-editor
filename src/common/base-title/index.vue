<script lang="ts" setup>
import { withDefaults } from 'vue'
import { generateStyleObject } from '../style'
import { BaseTitleConfig } from '../default'

const props = withDefaults(
  defineProps<{
    editable?: boolean
    data: BaseTitle
  }>(),
  {
    data: () => BaseTitleConfig,
  }
)
</script>

<template>
  <div class="flex items-center" :style="generateStyleObject(data)">
    <div
      class="w-24rpx h-40rpx mr-32rpx"
      :style="{
        background: data.titleBlockColor,
      }"
    ></div>
    <div
      class="font-bold"
      :style="{
        color: data.titleColor,
        fontSize: data.titleSize + 'px',
      }"
    >
      {{ data.title }}
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
