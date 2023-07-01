<script lang="ts" setup>
import { VueDraggable } from 'vue-draggable-plus'
import { createCommonElement } from '@/property/commonElement'
import { listToElement } from '@/property/listToElement'
import { list } from './options'
import { ElMessage } from 'element-plus'
const props = defineProps<{
  data: Vip
}>()
const { data } = toRefs(props)
const activeTab = ref('1')
const CommonRender = createCommonElement(data.value)
const ListConfigRender = listToElement(data.value, list)

watch(
  data.value.propertyArr,
  (newValue, oldValue) => {
    const newArr = newValue.filter((v) => v.checked)
    if (newArr.length > 2) {
      data.value.propertyArr[data.value.propertyArr.length - 1].checked = false
      ElMessage({
        message: '最多选择两项',
        type: 'warning'
      })
    }
  },
  { deep: true }
)
</script>

<template>
  <div class="vip-config">
    <div class="container">
      <CommonTitle title="资产组件" />
      <ElTabs v-model="activeTab" stretch>
        <ElTabPane label="内容设置" name="1">
          <CommonCard title="资产配置">
            <CommonCell>
              <div class="property">
                <VueDraggable v-model="data.propertyArr" :animation="150">
                  <template v-for="(item, index) in data.propertyArr" :key="index">
                    <div class="item">
                      <div class="mover">
                        <ElIcon :size="30"><IEpOperation /></ElIcon>
                      </div>
                      <ElCheckbox v-model="item.checked" style="margin-right: 10px">
                        <ElInput
                          v-model="item.name"
                          maxlength="4"
                          placeholder="请输入名称"
                          show-word-limit
                        />
                      </ElCheckbox>
                    </div>
                  </template>
                </VueDraggable>
              </div>
            </CommonCell>
            <CommonCell label="文字颜色">
              <ElColorPicker v-model="data.propertyTextColor" />
            </CommonCell>
            <CommonCell label="数值颜色">
              <ElColorPicker v-model="data.propertyNumberColor" />
            </CommonCell>
          </CommonCard>
          <ListConfigRender />
          <CommonCard>
            <div class="list">
              <div class="row">
                <div class="row-left">
                  <ElAvatar
                    :size="50"
                    src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                  />
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
                  <el-button>{{ data.loginBtnText }}</el-button>
                </div>
              </div>
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
.vip-config {
  .container {
    .property {
      .item {
        display: flex;
        margin-left: -80px;
        margin-top: 12px;

        .mover {
          width: 30px;
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
        padding: 10px 20px;
        width: 90%;
        height: 90px;
        border-radius: 10px;
        display: flex;
        background-color: #fff;
        transform: scale(0.9);
        &-left {
          width: 20%;
          display: flex;
          align-items: center;
        }
        &-center {
          width: 55%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          .name {
            font-size: 14px;
            font-weight: 600;
          }
          .text {
            font-size: 12px;
            font-weight: 400;
            margin-top: 6px;
          }
        }
        &-right {
          width: 25%;
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
  }
}
</style>
