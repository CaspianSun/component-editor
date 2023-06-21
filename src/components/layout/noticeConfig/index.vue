<script lang="ts" setup>
import { createCommonElement } from '@/components/layout/commonElement'
import { listToElement } from '@/components/layout/listToElement'
import { list } from './options'
const props = defineProps<{
  data: NoticeType
}>()
const { data } = toRefs(props)
const activeTab = ref('1')
const CommonRender = createCommonElement(data.value)
const ListConfigRender = listToElement(data.value, list)
</script>

<template>
  <div class="navigation-config">
    <div class="container">
      <CommonTitle title="图文导航" />
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

<style lang="scss" scoped>
.navigation-config {
  .container {
    .tip {
      color: #909399;
      font-size: 12px;
      margin-bottom: 10px;
      > div:not(:last-child) {
        margin-bottom: 3px;
      }
    }
    .list {
      &-item {
        background-color: #f5f7fa;
        border-radius: 4px;
        padding: 10px;
        margin-bottom: 15px;
        position: relative;
        &:hover {
          .delete {
            display: block;
          }
        }
        .delete {
          position: absolute;
          top: -7px;
          right: -7px;
          display: none;
          .el-icon {
            font-size: 18px;
            border-radius: 50%;
            padding: 2px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
