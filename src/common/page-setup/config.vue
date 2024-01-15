<script lang="ts" setup>
import { usePageStore } from '../../store'
import { CommonConfig } from '../../components/CommonConfig'
import { Schema, ElementRender } from '../../utils/listToElement'
import { storeToRefs } from 'pinia'

const pageStore = usePageStore()
const { activePage } = storeToRefs(pageStore)

const schema: Schema<PageSetup>[] = [
  {
    item: [
      {
        label: '页面名称',
        prop: 'title',
        type: 'ElInput',
        config: {
          maxLength: 10,
        },
      },
      {
        label: '页面背景色',
        prop: 'pageBg',
        type: 'ColorPicker',
        config: {
          useType: 'both',
        },
      },
      {
        label: '页面背景图',
        prop: 'pageBgImg',
        type: 'SelectImage',
      },
    ],
  },
]
</script>

<template>
  <CommonConfig title="页面设置" :show-common="false">
    <ElementRender v-if="activePage" :data="activePage" :schema="schema"></ElementRender>
  </CommonConfig>
</template>

<style lang="scss" scoped></style>
