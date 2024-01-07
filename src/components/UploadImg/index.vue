<script setup lang="ts">
import { CircleCloseFilled, Plus } from '@element-plus/icons-vue'
import { ElUpload, ElIcon, ElButton, ElImage, ElDialog, UploadFile, UploadProps, ElMessage } from 'element-plus'
import { inject, ref } from 'vue'
const props = withDefaults(
  defineProps<{
    photo: string | null
    fileMaxSize?: number
    ossAddress?: string
    width?: number
    height?: number
    backgroundColor?: string
  }>(),
  {
    photo: '',
    fileMaxSize: 2,
    ossAddress: 'admin',
    width: 135,
    height: 135,
    backgroundColor: '#fff',
  },
)

const loading = ref(false)
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const previewImg = ref<any>('')
const emit = defineEmits(['setPicture', 'delPicture'])

const handleSucImg = (uploadFile: UploadFile) => {
  emit('setPicture', uploadFile.url)
}
const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}
const changeLoading = () => {
  loading.value = false
}
const beforeUpload = (file: any) => {
  loading.value = true
  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
  const isLt = file.size / 1024 / 1024 < props.fileMaxSize
  if (!isJPG) {
    ElMessage.error('上传图片文件只能是 JPG或PNG 格式!')
    loading.value = false
  }
  if (!isLt) {
    ElMessage.error(`上传图片文件大小不能超过 ${props.fileMaxSize}MB!`)
    loading.value = false
    return isJPG && isLt
  }
}
const delPhoto = () => {
  emit('delPicture')
}
const imgView = () => {
  previewImg.value = []
  dialogVisible.value = true
  previewImg.value.push(props.photo!)
}
</script>

<template>
  <div
    class="photo"
    :style="{
      width: props.width + 'px',
      height: props.height + 'px',
      backgroundColor: props.backgroundColor,
      borderRadius: '5px',
    }"
  >
    <div v-if="photo" class="block">
      <div class="img">
        <div style="width: 100%; height: 100%" @click="imgView">
          <ElImage fit="cover" :src="photo" style="width: 100%; height: 100%" />
        </div>
        <div class="position">
          <ElButton link plain text @click="delPhoto">
            <ElIcon><CircleCloseFilled /></ElIcon>
          </ElButton>
        </div>
      </div>
    </div>
    <ElUpload
      v-else
      v-loading="loading"
      accept=".jpg,.png"
      :action="''"
      :before-upload="beforeUpload"
      class="avatar-uploader"
      list-type="picture"
      :on-change="changeLoading"
      :on-preview="handlePictureCardPreview"
      :on-success="handleSucImg"
      :show-file-list="false"
    >
      <ElIcon class="avatar-uploader-icon"><Plus /></ElIcon>
    </ElUpload>
    <ElDialog v-model="dialogVisible">
      <div class="dialogImg">
        <img alt="Preview Image" :src="previewImg" w-full />
      </div>
    </ElDialog>
  </div>
</template>

<style lang="scss" scoped>
.photo {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  cursor: pointer;
  .disabled {
    cursor: no-drop;
    background-color: #f5f7fa;
    i:hover {
      color: #737579;
      cursor: no-drop;
    }
    div {
      cursor: no-drop !important;
    }
  }
  .avatar-uploader {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100% !important;
    height: 100% !important;
    overflow: hidden;
    cursor: pointer;
    border: 1px solid #dfe4ee;
    border-radius: 5px;
    -webkit-transition: border-color 0.4s ease;
    transition: border-color 0.4s ease;
    :deep(.el-upload) {
      width: 100%;
      height: 100%;
    }
  }
  .upload-img {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    font-size: 12px;
    color: #808080;
    text-align: center;
    cursor: pointer;
  }

  .block {
    display: inline-block;
    width: 100%;
    height: 100%;

    .img {
      position: relative;
      width: 100%;
      height: 100%;
      padding: 2px;
      margin-bottom: 10px;
      border: 1px solid #dfe4ee;
      border-radius: 5px;

      .cover {
        position: absolute;
        top: 6px;
        right: -13px;
        width: 50px;
        line-height: 14px;
        color: #ffffff;
        text-align: center;
        background-color: red;
        transform: rotate(45deg);
      }

      .position {
        position: absolute;
        top: -6px;
        right: -6px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 15px !important;
        height: 15px !important;
        line-height: 0;
        background: #fff;
        border-radius: 50%;
        .el-button--text {
          padding: 0;
          color: red;
        }
      }
    }
  }
}
</style>
