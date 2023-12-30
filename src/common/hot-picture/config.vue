<script lang="ts" setup>
import { defineProps, toRefs, ref, computed, inject } from 'vue'
import { createCommonElement } from '@/utils/commonElement'
const props = defineProps<{
  data: HotPicture
}>()
const activeTab = ref('1')
const { data } = toRefs(props)
const CommonRender = createCommonElement(data.value)
const imageWidth = computed(() => {
  return 375 - (data.value.marginLR || 0) * 2
})
const initHotpotsEdit = inject('initHotpotsEdit')
const handleShowHotpotEdit = () => {}
</script>

<template>
  <div class="one-picture-config">
    <div class="container">
      <h3>轮播图</h3>
      <ElTabs v-model="activeTab" stretch>
        <ElTabPane label="内容设置" name="1">
          <CommonCard title="图片设置">
            <div class="tip">
              <div>建议图片尺寸宽度750px，高度不限。</div>
              <div>图片大小不超过500kb。</div>
            </div>
            <div class="list">
              <div class="list-item">
                <div class="list-item-left">
                  <CommonSelectImg :src="data.src" @update:src="data.src = $event" />
                </div>
                <div class="lis-item-right">
                  <ElButton @click="handleShowHotpotEdit">热区编辑</ElButton>
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
.one-picture-config {
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
        display: flex;
        align-items: center;
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
