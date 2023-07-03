<script lang="ts" setup>
import { v4 as uuidv4 } from 'uuid'
import { createCommonElement } from '@/property/commonElement'
const props = defineProps<{
  data: Slideshow
}>()
const activeTab = ref('1')
const { data } = toRefs(props)
const CommonRender = createCommonElement(data.value)
const handleDeleteItem = (index: number) => {
  data.value.imgList.splice(index, 1)
}
const handleAddItem = () => {
  data.value.imgList.push({
    src: '',
    type: 1,
    url: '',
    urlName: '',
    uuid: uuidv4()
  })
}
</script>

<template>
  <div class="slideshow-config">
    <div class="container">
      <CommonTitle title="轮播图" />
      <ElTabs v-model="activeTab" stretch>
        <ElTabPane label="内容设置" name="1">
          <CommonCard title="轮播设置">
            <CommonCell label="轮播间隔(秒)">
              <ElInputNumber v-model="data.delay" style="width: 150px" />
            </CommonCell>
          </CommonCard>
          <CommonCard title="图片设置">
            <div class="tip">
              <div>建议图片尺寸宽度750px，高度不限。</div>
              <div>图片大小不超过500kb。</div>
            </div>
            <div class="list">
              <template v-for="(item, index) in data.imgList" :key="item.uuid">
                <div class="list-item">
                  <div class="list-item-left">
                    <CommonSelectImg :src="item.src" @update:src="item.src = $event" />
                  </div>
                  <div class="list-item-right">
                    <CommonSelectLink :link="item" />
                  </div>
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
            <CommonCell label="高度">
              <CommonNumber
                :max="500"
                :min="1"
                :number="data.height"
                @update:number="data.height = $event"
              />
            </CommonCell>
          </CommonCard>
        </ElTabPane>
      </ElTabs>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.slideshow-config {
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
        display: flex;
        align-items: center;
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
