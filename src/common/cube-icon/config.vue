<script lang="ts" setup>
import { toRefs } from 'vue'
import { CloseOne, Plus } from '@icon-park/vue-next'
import { ElFormItem, ElForm, ElInput, ElColorPicker, ElButton, ElIcon } from 'element-plus'
import { ElementRender } from '../../utils/listToElement'
import { SliderNumber } from '../../components/SliderNumber'
import { CommonConfig } from '../../components/CommonConfig'
import { LinkSelect } from '../../components/LinkSelect'
import UploadImg from '/@/components/UploadImg/index.vue'
import { schema } from './options'

const props = defineProps<{
  data: CubeIcon
}>()
const { data } = toRefs(props)

const handleAddItem = () => {
  data.value.option.push({
    text: '名称',
    icon: '',
    textSize: 12,
    textColor: '#333',
    spacing: 0,
    bg: '',
  })
}

const handleDeleteItem = (index: number) => {
  data.value.option.splice(index, 1)
}
</script>

<template>
  <CommonConfig title="宫格模块" :data="data" :common-list="['marginT', 'marginB']">
    <ElementRender :data="data" :schema="schema"></ElementRender>
    <h4>选项配置</h4>
    <div class="list">
      <ElForm label-width="70px" label-position="left">
        <template v-for="(item, index) in data.option" :key="item.uuid">
          <div class="bg-#f5f7fa rd-4px p-10px mb-15px relative option-item">
            <ElFormItem label="图标">
              <UploadImg
                :width="60"
                :height="60"
                background-color="#fff"
                :photo="item.icon"
                @set-picture="item.icon = $event"
                @del-picture="item.icon = ''"
              />
            </ElFormItem>
            <ElFormItem label="名称">
              <ElInput v-model="item.text" maxlength="5" :show-word-limit="true"></ElInput>
            </ElFormItem>
            <ElFormItem label="名称颜色">
              <ElColorPicker v-model="item.textColor"></ElColorPicker>
            </ElFormItem>
            <ElFormItem label="名称大小">
              <SliderNumber v-model:number="item.textSize" :max="20" :min="12"></SliderNumber>
            </ElFormItem>
            <ElFormItem label="间距">
              <SliderNumber v-model:number="item.spacing" :max="5" :min="0"></SliderNumber>
            </ElFormItem>
            <ElFormItem label="区域背景">
              <UploadImg
                :width="80"
                :height="80"
                background-color="#fff"
                :photo="item.bg"
                @set-picture="item.bg = $event"
                @del-picture="item.bg = ''"
              />
            </ElFormItem>
            <ElFormItem label="跳转链接">
              <LinkSelect v-model="item.link"></LinkSelect>
            </ElFormItem>
            <div class="delete" @click.stop="handleDeleteItem(index)">
              <CloseOne theme="filled" />
            </div>
          </div>
        </template>
      </ElForm>
    </div>
    <ElButton plain style="width: 100%" @click="handleAddItem">
      <ElIcon style="margin-right: 5px"><Plus /></ElIcon>
      添加宫格
    </ElButton>
  </CommonConfig>
</template>

<style lang="scss" scoped>
.option-item {
  &:hover {
    .delete {
      display: block;
    }
  }
  .delete {
    position: absolute;
    top: 0;
    right: 0;
    display: none;
    cursor: pointer;
  }
}
</style>
