<script lang="ts" setup>
import { toRefs, ref } from 'vue'
import { v4 as uuid } from 'uuid'
import { Plus, CloseOne } from '@icon-park/vue-next'
import { ElButton, ElIcon } from 'element-plus'
import { listToElement } from '/@/utils/listToElement'
import { CommonConfig } from '../../components/CommonConfig'
import { list } from './options'

const props = defineProps<{
  data: Navigation
}>()
const { data } = toRefs(props)
const activeTab = ref('1')
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
  <CommonConfig title="图文导航" :data="data">
    <ListConfigRender />
    <h4>设置</h4>
    <div class="list">
      <template v-for="(item, index) in data.imgList" :key="item.uuid">
        <div class="list-item">
          <!-- <CommonCell label="图标">
            <CommonSelectImg :src="item.src" @update:src="item.src = $event" />
          </CommonCell>
          <CommonCell label="导航名称">
            <ElInput v-model="item.name" maxlength="5" show-word-limit type="text" />
          </CommonCell>
          <CommonCell label="跳转链接">
            <CommonSelectLink :link="item" />
          </CommonCell> -->
          <div class="delete" @click.stop="handleDeleteItem(index)">
            <ElIcon><CloseOne theme="filled" /></ElIcon>
          </div>
        </div>
      </template>
    </div>
    <ElButton plain style="width: 100%" @click="handleAddItem">
      <ElIcon style="margin-right: 5px"><Plus /></ElIcon>
      添加图片
    </ElButton>
  </CommonConfig>
</template>

<style lang="scss" scoped>
.wrapper {
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
</style>
