<script lang="ts" setup>
import { createCommonElement } from '@/components/layout/commonElement'
const props = defineProps<{
  data: OnePictureType
}>()
const activeTab = ref('1')
const { data } = toRefs(props)
const CommonRender = createCommonElement(data.value)
</script>

<template>
  <div class="one-picture-config">
    <div class="container">
      <CommonTitle title="轮播图" />
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
                <div class="list-item-right">
                  <CommonSelectLink :link="data.link" />
                </div>
              </div>
            </div>
          </CommonCard>
        </ElTabPane>
        <ElTabPane label="样式设置" name="2">
          <CommonCard>
            <CommonRender />
            <CommonNumber
              label="高度"
              :max="500"
              :min="1"
              :number="data.height"
              @update:number="data.height = $event"
            />
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
