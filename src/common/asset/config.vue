<script lang="ts" setup>
import { toRefs } from 'vue'
import { ElInput } from 'element-plus'
import { CommonConfig } from '../../components/CommonConfig'
import { listToElement } from '../../utils/listToElement'
import { ElForm, ElFormItem } from 'element-plus'
import { list } from './options'

const props = defineProps<{
  data: Asset
}>()
const { data } = toRefs(props)
const ListConfigRender = listToElement(data.value, list)
</script>

<template>
  <CommonConfig title="资产组件" :data="data">
    <ListConfigRender />
    <h4>组件内容</h4>
    <div class="list">
      <template v-for="(item, index) in data.itemList" :key="index">
        <div class="list-item">
          <div class="list-item-right">
            <ElForm>
              <ElFormItem label="名称">
                <ElInput v-model="item.name" maxlength="6" placeholder="请输入名称" show-word-limit type="text" />
              </ElFormItem>
              <ElFormItem label="跳转地址"> </ElFormItem>
            </ElForm>
          </div>
        </div>
      </template>
    </div>
  </CommonConfig>
</template>

<style lang="scss" scoped>
.wrapper {
  .list {
    &-item {
      background-color: #f5f7fa;
      border-radius: 4px;
      padding: 10px;
      margin-bottom: 15px;
      position: relative;
    }
  }
}
</style>
