<script lang="ts" setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { ElTabs, ElTabPane, ElInput, ElColorPicker, ElForm, ElFormItem } from 'element-plus'
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
          <ElFormItem label="页面背景色">
            <ElColorPicker v-model="pageSetup.pageBg" />
          </ElFormItem>
        </ElForm>
      </ElTabPane>
    </ElTabs>
  </div>
</template>

<style lang="scss" scoped></style>
