<script lang="ts" setup>
import { CommonConfig } from '../../components/CommonConfig'
import { Schema, ElementRender } from '../../utils/listToElement'

const props = defineProps<{
  data: BaseTitle
}>()

const schema: Schema<BaseTitle>[] = [
  {
    item: [
      {
        label: '表单标题',
        type: 'ElInput',
        prop: 'title',
        config: {
          maxLength: 10,
        },
      },

      {
        label: '标题大小',
        type: 'SliderNumber',
        prop: 'titleSize',
        config: {
          max: 20,
          min: 14,
        },
      },
      {
        label: '标题颜色',
        type: 'ColorPicker',
        prop: 'titleColor',
      },
      {
        label: '标题块颜色',
        type: 'ColorPicker',
        prop: 'titleBlockColor',
      },
    ],
  },
]
</script>

<template>
  <CommonConfig title="基础标题" :data="data" :common-list="['marginB', 'marginL', 'marginR', 'marginT']">
    <ElementRender :schema="schema" :data="data" />
  </CommonConfig>
</template>

<style lang="scss" scoped></style>
