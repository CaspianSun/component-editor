<script lang="ts" setup>
import { toRefs } from 'vue'
import { Plus, CloseOne } from '@icon-park/vue-next'
import { ElButton, ElIcon, ElForm, ElInput, ElFormItem } from 'element-plus'
import { ElementRender } from '../../utils/listToElement'
import { CommonConfig } from '../../components/CommonConfig'
import { schema } from './options'
import { UploadImg } from '../../components/UploadImg'
import { LinkSelect } from '../../components/LinkSelect'

const props = defineProps<{
  data: Navigation
}>()
const { data } = toRefs(props)
const handleDeleteItem = (index: number) => {
  data.value.imgList.splice(index, 1)
}
const handleAddItem = () => {
  data.value.imgList.push({
    src: '',
    name: `导航${data.value.imgList.length + 1}`,
    link: {
      name: '',
      type: 1,
      url: '',
    },
  })
}
</script>

<template>
  <CommonConfig title="图文导航" :data="data">
    <ElementRender :schema="schema" :data="data" />
    <h4>设置</h4>
    <div class="list">
      <template v-for="(item, index) in data.imgList" :key="item.uuid">
        <div class="list-item">
          <ElForm>
            <ElFormItem label="图标">
              <UploadImg :photo="item.src" :width="50" :height="50" @set-picture="item.src = $event" @del-picture="item.src = ''" />
            </ElFormItem>
            <ElFormItem label="导航名称">
              <ElInput v-model="item.name" maxlength="5" show-word-limit type="text" />
            </ElFormItem>
            <ElFormItem label="跳转链接">
              <LinkSelect v-model="item.link"></LinkSelect>
            </ElFormItem>
          </ElForm>
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
</style>
