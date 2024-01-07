<script lang="ts" setup>
import { toRefs } from 'vue'
import { ElFormItem } from 'element-plus'
import { SliderNumber } from '/@/components/SliderNumber'
import { CommonConfig } from '../../components/CommonConfig'
import { type Schema, ElementRender } from '../../utils/listToElement'

const props = defineProps<{
  data: User
}>()
const { data } = toRefs(props)
const schema: Schema<User>[] = [
  {
    label: '样式设置',
    item: [
      { label: '背景色', type: 'ElColor', prop: 'bgColor' },
      { label: '背景图片', type: 'SelectImage', prop: 'bgImg' },
    ],
  },
  {
    label: '资产设置',
    item: [
      { label: '数值大小', type: 'ElNumber', prop: 'numSize', config: { max: 20, min: 10 } },
      { label: '数值颜色', type: 'ElColor', prop: 'numColor' },
      { label: '文字大小', type: 'ElNumber', prop: 'textSize', config: { max: 20, min: 10 } },
      { label: '文字颜色', type: 'ElColor', prop: 'textColor' },
    ],
  },
]
</script>

<template>
  <CommonConfig title="用户信息" :data="data" :common-list="['marginB', 'marginL', 'marginR', 'radiusT', 'radiusB']">
    <ElementRender :data="data" :schema="schema" />
    <template #common>
      <ElFormItem label="间距">
        <SliderNumber v-model:number="data.spacing" :max="50" :min="0"></SliderNumber>
      </ElFormItem>
    </template>
  </CommonConfig>
</template>

<style lang="scss" scoped></style>
