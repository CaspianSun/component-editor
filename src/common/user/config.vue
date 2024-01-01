<script lang="ts" setup>
import { toRefs, ref } from 'vue'
import { List, listToElement } from '@/utils/listToElement'
import { createCommonElement } from '@/utils/commonElement'
import CommonCell from '@/components/common/cell/index.vue'
import CommonNumber from '@/components/common/number/index.vue'
const props = defineProps<{
  data: User
}>()
const activeTab = ref('1')
const { data } = toRefs(props)
const CommonRender = createCommonElement(data.value, ['marginB', 'marginLR', 'radiusT', 'radiusB'])
const list: List<User>[] = [
  {
    label: '样式设置',
    item: [
      { label: '背景色', type: 'ElColor', prop: 'bgColor' },
      { label: '背景图片', type: 'CSelectImg', prop: 'bgImg' },
    ],
  },
  {
    label: '资产设置',
    item: [
      { label: '数值大小', type: 'CNumber', prop: 'numSize', config: { max: 20, min: 10 } },
      { label: '数值颜色', type: 'ElColor', prop: 'numColor' },
      { label: '文字大小', type: 'CNumber', prop: 'textSize', config: { max: 20, min: 10 } },
      { label: '文字颜色', type: 'ElColor', prop: 'textColor' },
    ],
  },
]
const ListConfigRender = listToElement(data.value, list)
</script>

<template>
  <div class="wrapper">
    <h3>用户信息</h3>
    <ElTabs v-model="activeTab" stretch>
      <ElTabPane label="内容设置" name="1">
        <ListConfigRender />
      </ElTabPane>
      <ElTabPane label="样式设置" name="2">
        <CommonCard>
          <CommonCell label="间距">
            <CommonNumber v-model:number="data.spacing" :max="50" :min="0"></CommonNumber>
          </CommonCell>
          <CommonRender />
        </CommonCard>
      </ElTabPane>
    </ElTabs>
  </div>
</template>

<style lang="scss" scoped></style>
