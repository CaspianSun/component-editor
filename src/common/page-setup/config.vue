<script lang="ts" setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { ElTabs, ElTabPane, ElInput, ElRadioGroup, ElRadio, ElColorPicker, ElForm, ElFormItem } from 'element-plus'
import { useDataStore } from '../../store'

const dataStore = useDataStore()
const { pageSetup } = storeToRefs(dataStore)
const activeTab = ref('1')
</script>

<template>
  <div class="page-setup-container">
    <h3>页面设置</h3>
    <ElTabs v-model="activeTab" stretch>
      <ElTabPane label="内容设置" name="1">
        <ElForm>
          <ElFormItem label="页面名称">
            <ElInput v-model="pageSetup.title" maxlength="10" show-word-limit type="text" />
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
      </ElTabPane>
      <!-- <ElTabPane label="选择模版" name="2"></ElTabPane> -->
    </ElTabs>
  </div>
</template>

<style lang="scss" scoped></style>
