<script lang="ts" setup>
import { toRefs } from 'vue'
import { CloseOne, Plus } from '@icon-park/vue-next'
import { ElButton, ElIcon } from 'element-plus'
import { CommonConfig } from '../../components/CommonConfig'
import UploadImg from '/@/components/UploadImg/index.vue'
import { LinkSelect } from '../../components/LinkSelect'
import { Schema, ElementRender } from '../../utils/listToElement'

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
  })
}

const schema: Schema<Slideshow>[] = [
  {
    item: [
      {
        prop: 'direction',
        type: 'ElRadio',
        label: '滚动方向',
        config: [
          {
            label: '横向',
            value: 'horizontal',
          },
          {
            label: '纵向',
            value: 'vertical',
          },
        ],
      },
      {
        prop: 'delay',
        type: 'ElInputNumber',
        label: '轮播间隔(秒)',
      },
      {
        prop: 'paginationVisible',
        type: 'ElSwitch',
        label: '显示分页器',
      },
      {
        prop: 'height',
        type: 'SliderNumber',
        label: '高度',
        config: {
          max: 500,
          min: 100,
        },
      },
    ],
  },
]
</script>

<template>
  <CommonConfig title="轮播图" :data="data">
    <ElementRender :schema="schema" :data="data" />
    <h4>图片列表</h4>
    <div class="flex flex-col w-full">
      <div class="tip">
        <div>建议图片尺寸 {{ 375 - (data.marginL || 0) - (data.marginR || 0) }} * {{ data.height }}。</div>
        <div>因不同机型尺寸不一致,真机尺寸有所差异</div>
        <div>图片大小不超过2Mb。</div>
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
              <LinkSelect v-model="item.link" />
            </div>
            <div class="delete" @click.stop="handleDeleteItem(index)">
              <CloseOne theme="filled" />
            </div>
          </div>
        </template>
      </div>
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
  .list-item {
    display: flex;
    align-items: center;
    background-color: #f5f7fa;
    border-radius: 4px;
    padding: 10px;
    margin-bottom: 15px;
    position: relative;
    .list-item-right {
      flex: 1;
      margin-left: 10px;
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
      cursor: pointer;
    }
  }
}
</style>
