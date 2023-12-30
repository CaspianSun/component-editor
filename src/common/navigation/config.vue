<script lang="ts" setup>
import { toRefs, ref } from 'vue'
import { v4 as uuid } from 'uuid'
import { createCommonElement } from '@/utils/commonElement'
import { listToElement } from '@/utils/listToElement'
import { list } from './options'

const props = defineProps<{
  data: Navigation
}>()
const { data } = toRefs(props)
const activeTab = ref('1')
const CommonRender = createCommonElement(data.value)
const ListConfigRender = listToElement(data.value, list)
const handleDeleteItem = (index: number) => {
  data.value.imgList.splice(index, 1)
}
const handleAddItem = () => {
  data.value.imgList.push({
    src: '',
    type: 1,
    url: '',
    urlName: '',
    name: `导航${data.value.imgList.length + 1}`,
    uuid: uuid(),
  })
}
</script>

<template>
  <div class="navigation-config">
    <div class="container">
      <CommonTitle title="图文导航" />
      <ElTabs v-model="activeTab" stretch>
        <ElTabPane label="内容设置" name="1">
          <ListConfigRender />
          <CommonCard title="设置">
            <div class="list">
              <template v-for="(item, index) in data.imgList" :key="item.uuid">
                <div class="list-item">
                  <CommonCell label="图标">
                    <CommonSelectImg :src="item.src" @update:src="item.src = $event" />
                  </CommonCell>
                  <CommonCell label="导航名称">
                    <ElInput v-model="item.name" maxlength="5" show-word-limit type="text" />
                  </CommonCell>
                  <CommonCell label="跳转链接">
                    <CommonSelectLink :link="item" />
                  </CommonCell>
                  <div class="delete" @click.stop="handleDeleteItem(index)">
                    <ElIcon><IEpCircleCloseFilled /></ElIcon>
                  </div>
                </div>
              </template>
            </div>
            <ElButton plain style="width: 100%" @click="handleAddItem">
              <ElIcon style="margin-right: 5px"><IEpPlus /></ElIcon>
              添加图片
            </ElButton>
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
        &-right {
          flex: 1;
        }
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
