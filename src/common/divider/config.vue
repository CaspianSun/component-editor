<script lang="ts" setup>
import { defineProps, toRefs, ref } from 'vue'
import { createCommonElement } from '@/utils/commonElement'
const activeTab = ref('1')
const props = defineProps<{
  data: Divider
}>()
const { data } = toRefs(props)
const CommonRender = createCommonElement(data.value, ['marginT', 'marginB', 'marginLR'])
</script>

<template>
  <div class="wrapper">
    <h3>辅助分割</h3>
    <ElTabs v-model="activeTab" stretch>
      <ElTabPane label="内容设置" name="1">
        <CommonCard title="组件设置">
          <ElRadioGroup v-model="data.type">
            <ElRadioButton :label="1">空白</ElRadioButton>
            <ElRadioButton :label="2">实线</ElRadioButton>
            <ElRadioButton :label="3">虚线</ElRadioButton>
          </ElRadioGroup>
        </CommonCard>
        <CommonCard title="样式设置">
          <template v-if="data.type === 1">
            <CommonCell label="背景颜色">
              <ElColorPicker v-model="data.bgColor" />
            </CommonCell>
          </template>
          <template v-else>
            <CommonCell label="分割线颜色">
              <ElColorPicker v-model="data.lineColor" />
            </CommonCell>
            <CommonNumber label="分割线大小" :max="10" :min="1" :number="data.lineSize" @update:number="data.lineSize = $event" />
          </template>
          <CommonNumber label="高度" :max="20" :min="1" :number="data.height" @update:number="data.height = $event" />
        </CommonCard>
      </ElTabPane>
      <ElTabPane label="样式设置" name="2">
        <CommonCard>
          <CommonRender />
        </CommonCard>
      </ElTabPane>
    </ElTabs>
  </div>
</template>

<style lang="scss" scoped></style>
