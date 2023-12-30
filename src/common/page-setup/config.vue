<script lang="ts" setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useDataStore } from '@/store/modules/data'
const dataStore = useDataStore()
const { pageSetup } = storeToRefs(dataStore)
const activeTab = ref('1')
</script>

<template>
  <div class="page-setup-config">
    <div class="container">
      <CommonTitle title="页面设置" />
      <ElTabs v-model="activeTab" stretch>
        <ElTabPane label="内容设置" name="1">
          <CommonCard>
            <CommonCell label="页面名称">
              <ElInput v-model="pageSetup.title" maxlength="10" show-word-limit type="text" />
            </CommonCell>
            <CommonCell label="导航栏样式">
              <ElRadioGroup v-model="pageSetup.tabbarStyle">
                <ElRadio :label="1">标准模式</ElRadio>
                <ElRadio :label="2">沉浸式</ElRadio>
              </ElRadioGroup>
            </CommonCell>
            <CommonCell label="页面背景色">
              <ElColorPicker v-model="pageSetup.pageBg" />
            </CommonCell>
            <CommonCell label="导航栏背景色">
              <ElColorPicker v-model="pageSetup.tabbarBg" />
            </CommonCell>
          </CommonCard>
        </ElTabPane>
        <ElTabPane label="选择模版" name="2"></ElTabPane>
      </ElTabs>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-setup-config {
  .container {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
}
</style>
