<script lang="ts" setup>
import { toRefs } from 'vue'
import { CommonConfig } from '../../components/CommonConfig'
import { CompareMethod, ElementRender, Schema } from '../../utils/listToElement'
const props = defineProps<{
  data: Divider
}>()
const { data } = toRefs(props)

const schema: Schema<Divider>[] = [
  {
    item: [
      {
        prop: 'type',
        label: '组件设置',
        type: 'ElRadioButton',
        config: [
          { label: '空白', value: 1 },
          { label: '实线', value: 2 },
          { label: '虚线', value: 3 },
        ],
      },
      {
        prop: 'bgColor',
        label: '背景颜色',
        type: 'ColorPicker',
        control: {
          method: CompareMethod.equality,
          value: ['type', 1],
        },
      },
      {
        prop: 'lineColor',
        label: '分割线颜色',
        type: 'ColorPicker',
        control: {
          method: CompareMethod.inequality,
          value: ['type', 1],
        },
      },
      {
        prop: 'lineSize',
        label: '分割线大小',
        type: 'SliderNumber',
        control: {
          method: CompareMethod.inequality,
          value: ['type', 1],
        },
      },
      {
        prop: 'height',
        label: '高度',
        type: 'SliderNumber',
      },
    ],
  },
]
</script>

<template>
  <CommonConfig :data="data" title="分割线设置" :common-list="['marginT', 'marginB', 'marginL', 'marginR']">
    <ElementRender :schema="schema" :data="data" />
  </CommonConfig>
</template>

<style lang="scss" scoped></style>
