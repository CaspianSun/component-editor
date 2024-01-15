<script lang="ts" setup>
import { toRefs, ref, computed } from 'vue'
import { CommonConfig } from '../../components/CommonConfig'
import UploadImg from '/@/components/UploadImg/index.vue'
import { HotSpotEdit } from '../../components/HotSpotEdit'
import { ElMessage } from 'element-plus'

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
    ElMessage.warning('请先上传图片')
    return
  }
  hotSpotEditRef.value?.initHotSpotEdit(data.value.src, data.value.hotSpot, imageWidth.value).then((list) => {
    data.value.hotSpot = list
  })
}
</script>

<template>
  <div class="full">
    <CommonConfig title="图片热区" :data="data">
      <h4>图片设置</h4>
      <div class="tip">
        <div>建议图片尺寸宽度750px，高度不限。</div>
        <div>图片大小不超过4Mb。</div>
      </div>
      <UploadImg class="mt-15px" :photo="data.src" @set-picture="data.src = $event" @del-picture="data.src = ''" />
      <ElButton class="mt-15px" @click="handleShowHotSpotEdit">热区编辑</ElButton>
    </CommonConfig>
    <HotSpotEdit ref="hotSpotEditRef"></HotSpotEdit>
  </div>
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
</style>
