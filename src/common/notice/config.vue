<script lang="ts" setup>
import { toRefs, ref } from 'vue'
import { createCommonElement } from '@/utils/commonElement'
import { listToElement } from '@/utils/listToElement'
import { list } from './options'
const props = defineProps<{
  data: Notice
}>()
const { data } = toRefs(props)
const activeTab = ref('1')
const CommonRender = createCommonElement(data.value)
const ListConfigRender = listToElement(data.value, list)
</script>

<template>
  <div class="wrapper">
    <h3>图文导航</h3>
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
</template>

<style lang="scss" scoped></style>
