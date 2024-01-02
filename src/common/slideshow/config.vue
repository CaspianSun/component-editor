<script lang="ts" setup>
import { toRefs } from 'vue'
import { v4 as uuid } from 'uuid'
import { CloseOne, Plus } from '@icon-park/vue-next'
import { ElInputNumber, ElForm, ElButton, ElIcon } from 'element-plus'
import { CommonConfig } from '../../components/CommonConfig'
import { SliderNumber } from '../../components/SliderNumber'
import UploadImg from '/@/components/UploadImg/index.vue'

const props = defineProps<{
  data: Slideshow
}>()
const { data } = toRefs(props)
const handleDeleteItem = (index: number) => {
  data.value.imgList.splice(index, 1)
}
const handleAddItem = () => {
  data.value.imgList.push({
    src: '',
    type: 1,
    url: '',
    urlName: '',
    uuid: uuid(),
  })
}
</script>

<template>
  <CommonConfig title="轮播图" :data="data">
    <ElForm>
      <ElFormItem label="轮播间隔(秒)">
        <ElInputNumber v-model="data.delay" style="width: 150px" />
      </ElFormItem>
    </ElForm>
    <h4>图片列表</h4>
    <div class="flex flex-col w-full">
      <div class="tip">
        <div>建议图片尺寸宽度750px，高度不限。</div>
        <div>图片大小不超过500kb。</div>
      </div>
      <div class="list">
        <template v-for="(item, index) in data.imgList" :key="item.uuid">
          <div class="list-item">
            <div class="list-item-left">
              <UploadImg
                :width="100"
                :height="100"
                background-color="#fff"
                :photo="item.src"
                @set-picture="item.src = $event"
                @del-picture="item.src = ''"
              />
            </div>
            <div class="list-item-right">
              <!-- <CommonSelectLink :link="item" /> -->
            </div>
            <div class="delete" @click.stop="handleDeleteItem(index)">
              <ElIcon><CloseOne theme="filled" /></ElIcon>
            </div>
          </div>
        </template>
      </div>
    </div>
    <ElButton plain style="width: 100%" @click="handleAddItem">
      <ElIcon style="margin-right: 5px"><Plus /></ElIcon>
      添加图片
    </ElButton>
    <template #common>
      <ElFormItem label="高度">
        <SliderNumber :max="500" :min="1" :number="data.height" @update:number="data.height = $event" />
      </ElFormItem>
    </template>
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
      top: 0;
      right: 0;
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
