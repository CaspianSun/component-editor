<script lang="ts" setup>
import { createCommonElement } from '@/property/commonElement'
import { listToElement } from '@/property/listToElement'
import { list } from './options'
const props = defineProps<{
  data: Asset
}>()
const { data } = toRefs(props)
const activeTab = ref('1')
const CommonRender = createCommonElement(data.value)
const ListConfigRender = listToElement(data.value, list)
</script>

<template>
  <div class="asset-config">
    <div class="container">
      <CommonTitle title="资产组件" />
      <ElTabs v-model="activeTab" stretch>
        <ElTabPane label="内容设置" name="1">
          <ListConfigRender />
          <CommonCard title="组件内容">
            <div class="list">
              <template v-for="(item, index) in data.itemList" :key="index">
                <div class="list-item">
                  <div class="list-item-right">
                    <CommonCell label="名称" :left-span="4" :right-span="20">
                      <ElInput
                        v-model="item.name"
                        maxlength="6"
                        placeholder="请输入名称"
                        show-word-limit
                        type="text"
                      />
                    </CommonCell>
                    <CommonCell label="跳转地址" :left-span="4" :right-span="20">
                      <CommonSelectLink :link="item" />
                    </CommonCell>
                  </div>
                </div>
              </template>
            </div>
          </CommonCard>
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
.asset-config {
  .container {
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
}
</style>
