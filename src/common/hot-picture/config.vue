<script lang="ts" setup>
import { ref, toRefs, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { CommonConfig } from '../../components/CommonConfig'
import UploadImg from '/@/components/UploadImg/index.vue'
import { HotSpotEdit } from '../../components/HotSpotEdit'

const props = defineProps<{
  data: HotPicture
}>()

const hotSpotEditRef = ref<InstanceType<typeof HotSpotEdit>>()

const { data } = toRefs(props)
const imageWidth = computed(() => {
  return 375 - (data.value.marginL || 0) + (data.value.marginR || 0)
})
const handleShowHotSpotEdit = () => {
  if (!data.value.src) {
    return ElMessage({
      message: '请先上传图片',
      type: 'warning',
    })
  }
  hotSpotEditRef.value?.initHotSpotEdit(data.value.src, data.value.hotSpot, imageWidth.value, (list) => {
    data.value.hotSpot = list
  })
}
</script>

<template>
  <CommonConfig title="图片热区" :data="data">
    <h4>图片设置</h4>
    <div class="tip">
      <div>建议图片尺寸宽度750px，高度不限。</div>
      <div>图片大小不超过500kb。</div>
    </div>
    <UploadImg class="mt-15px" :photo="data.src" @set-picture="data.src = $event" @del-picture="data.src = ''" />
    <ElButton class="mt-15px" @click="handleShowHotSpotEdit">热区编辑</ElButton>
  </CommonConfig>
  <HotSpotEdit ref="hotSpotEditRef"></HotSpotEdit>
</template>

<style lang="scss" scoped>
.one-picture-config {
  .wrapper {
    .tip {
      color: #909399;
      font-size: 12px;
      margin-bottom: 10px;
      > div:not(:last-child) {
        margin-bottom: 3px;
      }
    }
  }
}
</style>
