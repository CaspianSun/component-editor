<script lang="ts" setup>
import { ElMessage, ElAvatar, ElButton, ElForm, ElFormItem, ElColorPicker, ElIcon, ElCheckbox, ElInput } from 'element-plus'
import { Drag } from '@icon-park/vue-next'
import { toRefs, watch } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { CommonConfig } from '../../components/CommonConfig'
import { ElementRender } from '../../utils/listToElement'
import { schema } from './options'

const props = defineProps<{
  data: Vip
}>()
const { data } = toRefs(props)
watch(
  data.value.propertyArr,
  (newValue) => {
    const newArr = newValue.filter((v) => v.checked)
    if (newArr.length > 2) {
      data.value.propertyArr[data.value.propertyArr.length - 1].checked = false
      ElMessage({
        message: '最多选择两项',
        type: 'warning',
      })
    }
  },
  { deep: true },
)
</script>

<template>
  <CommonConfig title="资产组件" :data="data">
    <h4>资产配置</h4>
    <div class="property">
      <VueDraggable v-model="data.propertyArr" :animation="150" handle=".mover">
        <template v-for="(item, index) in data.propertyArr" :key="index">
          <div class="item">
            <Drag class="mover"></Drag>
            <ElCheckbox v-model="item.checked" style="margin-right: 10px">
              <ElInput v-model="item.name" maxlength="4" placeholder="请输入名称" show-word-limit />
            </ElCheckbox>
          </div>
        </template>
      </VueDraggable>
    </div>
    <ElForm>
      <ElFormItem label="文字颜色">
        <ElColorPicker v-model="data.propertyTextColor" />
      </ElFormItem>
      <ElFormItem label="文字大小">
        <ElColorPicker v-model="data.propertyNumberColor" />
      </ElFormItem>
    </ElForm>
    <ElementRender :schema="schema" :data="data" />
    <div class="list">
      <div class="row">
        <div class="row-left">
          <ElAvatar :size="50" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
        </div>
        <div class="row-center">
          <div class="name" :style="`color:${data.welcomeColor}`">
            {{ data.welcomeText }}
          </div>
          <div class="text" :style="`color:${data.subTitleColor}`">
            {{ data.subTitleText }}
          </div>
        </div>
        <div class="row-right">
          <ElButton>{{ data.loginBtnText }}</ElButton>
        </div>
      </div>
    </div>
  </CommonConfig>
</template>

<style lang="scss" scoped>
.property {
  .item {
    display: flex;
    margin-bottom: 12px;
    align-items: center;
    .mover {
      cursor: move;
      margin-right: 10px;
    }
    .box-item {
      display: flex;
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 1px 11px;
      margin-left: -80px;
      :deep(.el-input__wrapper) {
        box-shadow: 0 0 0 0px !important;
        width: 180px;
      }
    }
  }
}
.list {
  background-color: #f7f8fa;
  height: 120px;
  display: flex;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  .row {
    padding: 10px 15px;
    height: 90px;
    border-radius: 10px;
    display: flex;
    background-color: #fff;
    transform: scale(0.9);
    &-left {
      width: 50px;
      margin-right: 10px;
      display: flex;
      align-items: center;
    }
    &-center {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .name {
        font-size: 14px;
        font-weight: 600;
      }
      .text {
        font-size: 12px;
        color: #999;
        font-weight: 400;
        margin-top: 4px;
      }
    }
    &-right {
      display: flex;
      justify-content: center;
      align-items: center;
      :deep(.el-button) {
        background-color: rgb(51, 51, 51);
        color: #fff;
        border-radius: 20px;
        font-size: 12px;
      }
    }
  }
}
</style>
