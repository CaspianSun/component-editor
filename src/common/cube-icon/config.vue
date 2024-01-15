<script lang="ts" setup>
import { computed, toRefs } from 'vue'
import { CloseOne, Plus } from '@icon-park/vue-next'
import { ElementRender } from '../../utils/listToElement'
import { schema, itemSchema } from './options'
import { CommonConfig } from '../../components/CommonConfig'
import { CubeIconNumberMap } from '../../enum'

const props = defineProps<{
  data: CubeIcon
}>()
const { data } = toRefs(props)

const handleAddItem = () => {
  data.value.option.push({
    text: '文本',
    icon: '',
    textColor: '#333',
    bgColor: 'rgba(255, 255, 255, 0.5)',
    setupType: 1,
    bgType: 1,
  })
}

const handleDeleteItem = (index: number) => {
  data.value.option.splice(index, 1)
}

const number = computed(() => {
  return CubeIconNumberMap[data.value.type]
})
</script>

<template>
  <CommonConfig title="宫格模块" :data="data" :common-list="['marginT', 'marginB']">
    <ElementRender :data="data" :schema="schema"></ElementRender>
    <h4>选项配置</h4>
    <div class="list">
      <ElForm label-width="70px" label-position="left">
        <template v-for="(item, index) in data.option" :key="item.uuid">
          <div
            class="rd-4px p-10px mb-15px relative option-item"
            :style="{
              backgroundColor: number > index ? 'rgba(245, 247, 250, 1)' : 'rgba(245, 247, 250, 0.6)',
            }"
          >
            <ElementRender :data="item" :schema="itemSchema"></ElementRender>
            <div class="delete" @click.stop="handleDeleteItem(index)">
              <CloseOne theme="filled" />
            </div>
          </div>
          <template v-if="index == number - 1 && data.option.length > number">
            <ElAlert :title="`当前类型只能显示${number}个宫格`" type="warning" show-icon center :closable="false" />
          </template>
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
