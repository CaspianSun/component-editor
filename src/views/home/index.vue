<script lang="ts" setup>
import { useStore } from '@/store'
import FileSaver from 'file-saver'
import { ArrowLeftBold } from '@element-plus/icons-vue'
import Phone from './components/phone.vue'
import Config from './components/config.vue'

const id = ref(null)
const { dataStore } = useStore()
const { components, pageSetup } = storeToRefs(dataStore)

const exportJSON = () => {
  const data = JSON.stringify({
    id: id,
    name: pageSetup.value.title,
    templateJson: JSON.stringify(pageSetup),
    component: JSON.stringify(components)
  })
  const blob = new Blob([data], { type: '' })
  FileSaver.saveAs(blob, `${pageSetup.value.title}.json`)
}

const handleBack = () => {
  //
}
const handleClickPageSetup = () => {
  //
  dataStore.setActiveComponentIndex(null)
}
</script>

<template>
  <div class="home">
    <section class="top">
      <div class="left">
        <ElPageHeader @back="handleBack">
          <template #icon>
            <ElIcon :size="13" style="margin-right: -6px; color: #999999">
              <ArrowLeftBold />
            </ElIcon>
          </template>
          <template #title>
            <span style="color: #999999">返回系统</span>
          </template>
          <template #content>
            <span>编辑页面</span>
          </template>
        </ElPageHeader>
      </div>
      <div class="right">
        <ElButton @click="handleClickPageSetup">页面设置</ElButton>
        <!-- <el-button @click="">保存</el-button> -->
        <ElButton plain type="primary" @click="exportJSON">保存并发布</ElButton>
      </div>
    </section>

    <section class="content">
      <SliderAssembly />
      <Phone />
      <Config />
    </section>
  </div>
</template>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;

  .top {
    border-bottom: 1px solid #ebedf0;
    display: flex;
    height: 64px;
    justify-content: space-between;
    box-sizing: border-box;
    padding-right: 15px;
    align-items: center;
    .left {
      margin-left: 30px;
    }
    .el-button {
      font-size: 14px;
      padding: 0 16px;
      height: 30px;
    }
  }

  .content {
    width: 100%;
    height: calc(100% - 64px);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: #f7f8fa;
  }
}
</style>
