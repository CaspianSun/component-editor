<script lang="ts" setup>
import { toRefs } from 'vue'
import { ElForm, ElFormItem, ElRadioGroup, ElRadioButton, ElColorPicker } from 'element-plus'
import { CommonConfig } from '../../components/CommonConfig'
import { SliderNumber } from '../../components/SliderNumber'
const props = defineProps<{
  data: Divider
}>()
const { data } = toRefs(props)
</script>

<template>
  <CommonConfig :data="data" title="分割线设置" :common-list="['marginT', 'marginB', 'marginL', 'marginR']">
    <ElForm>
      <ElFormItem label="组件设置">
        <ElRadioGroup v-model="data.type">
          <ElRadioButton :label="1">空白</ElRadioButton>
          <ElRadioButton :label="2">实线</ElRadioButton>
          <ElRadioButton :label="3">虚线</ElRadioButton>
        </ElRadioGroup>
      </ElFormItem>
      <template v-if="data.type === 1">
        <ElFormItem label="背景颜色">
          <ElColorPicker v-model="data.bgColor" show-alpha color-format="rgb" />
        </ElFormItem>
      </template>
      <template v-else>
        <ElFormItem label="分割线颜色">
          <ElColorPicker v-model="data.lineColor" />
        </ElFormItem>
        <ElFormItem label="分割线大小">
          <SliderNumber :max="10" :min="1" :number="data.lineSize" @update:number="data.lineSize = $event" />
        </ElFormItem>
      </template>
      <ElFormItem label="高度">
        <SliderNumber :max="20" :min="1" :number="data.height" @update:number="data.height = $event" />
      </ElFormItem>
    </ElForm>
  </CommonConfig>
</template>

<style lang="scss" scoped></style>
