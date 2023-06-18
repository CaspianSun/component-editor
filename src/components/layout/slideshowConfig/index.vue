<script lang="ts" setup>
import commonConfig from '@/components/layout/commonConfig'
const props = defineProps<{
  data: SetStyleType<SlideshowType>
}>()
const activeTab = ref('1')
const { data } = toRefs(props)
const Render = commonConfig(data.value)
</script>

<template>
  <div class="slideshow-config">
    <div class="container">
      <CommonTitle title="轮播图" />
      <ElTabs v-model="activeTab" stretch>
        <ElTabPane label="内容设置" name="1"></ElTabPane>
        <ElTabPane label="样式设置" name="2">
          <Render />
          <CommonNumber
            :max="500"
            :min="1"
            :number="data.height"
            title="高度"
            @update="data.height = $event"
          />
        </ElTabPane>
      </ElTabs>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
