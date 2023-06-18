<script lang="ts" setup>
import { useStore } from '@/store'
const { dataStore } = useStore()
const { pageSetup } = storeToRefs(dataStore)
const activeTab = ref('1')
</script>

<template>
  <div class="page-setup">
    <div class="container">
      <ElTabs v-model="activeTab" stretch>
        <ElTabPane label="页面设置" name="1">
          <div class="wrapper">
            <ElForm>
              <ElFormItem label="页面名称">
                <ElInput v-model="pageSetup.title" />
              </ElFormItem>
              <ElFormItem label="导航栏样式">
                <ElRadioGroup v-model="pageSetup.tabbarStyle">
                  <ElRadio :label="1">标准模式</ElRadio>
                  <ElRadio :label="2">沉浸式</ElRadio>
                </ElRadioGroup>
              </ElFormItem>
              <ElFormItem label="页面背景色">
                <ElColorPicker v-model="pageSetup.pageBg" />
              </ElFormItem>
              <ElFormItem label="导航栏背景色">
                <ElColorPicker v-model="pageSetup.tabbarBg" />
              </ElFormItem>
            </ElForm>
          </div>
        </ElTabPane>
        <ElTabPane label="选择模版" name="2"></ElTabPane>
      </ElTabs>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-setup {
  .container {
    width: 100%;
    height: 100%;
    background-color: #fff;
    .wrapper {
      padding: 20px 0;
    }
  }
}
</style>
