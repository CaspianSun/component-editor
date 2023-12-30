<script lang="ts" setup>
import { defineProps, toRefs, ref } from 'vue'
import { createCommonElement } from '@/utils/commonElement'
import { listToElement } from '@/utils/listToElement'
import { list } from './options'
const activeTab = ref('1')
const props = defineProps<{
  data: Integral
}>()
const { data } = toRefs(props)
const CommonRender = createCommonElement(data.value)
const ListConfigRender = listToElement(data.value, list)
</script>

<template>
  <div class="integral-config">
    <div class="container">
      <h3>我的积分</h3>
      <ElTabs v-model="activeTab" stretch>
        <ElTabPane label="内容设置" name="1">
          <ListConfigRender />
        </ElTabPane>
        <ElTabPane label="样式设置" name="2">
          <CommonCard>
            <CommonRender />
          </CommonCard>
        </ElTabPane>
      </ElTabs>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
