<script lang="ts" setup>
import commonConfig from '@/components/layout/commonConfig'
const activeTab = ref('1')
const props = defineProps<{
  data: SetStyleType<NavigationType>
}>()
const { data } = toRefs(props)
const Render = commonConfig(data.value)
</script>

<template>
  <div class="navigation-config">
    <div class="container">
      <CommonTitle title="图文导航" />
      <ElTabs v-model="activeTab" stretch>
        <ElTabPane label="内容设置" name="1"></ElTabPane>
        <ElTabPane label="样式设置" name="2">
          <Render />
        </ElTabPane>
      </ElTabs>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
