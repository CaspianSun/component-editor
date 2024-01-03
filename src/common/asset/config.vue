<script lang="ts" setup>
import { toRefs } from 'vue'
import { ElInput } from 'element-plus'
import { CommonConfig } from '../../components/CommonConfig'
import { listToElement } from '/@/utils/listToElement'
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
            <CommonCell label="名称" :left-span="4" :right-span="20">
              <ElInput v-model="item.name" maxlength="6" placeholder="请输入名称" show-word-limit type="text" />
            </CommonCell>
            <CommonCell label="跳转地址" :left-span="4" :right-span="20">
              <CommonSelectLink :link="item" />
            </CommonCell>
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
