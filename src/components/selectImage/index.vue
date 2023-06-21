<script lang="ts" setup>
import config from '@/config'
import {
  getImgListApi,
  getGroupListApi,
  addImgGroupApi,
  deleteImgApi,
  deleteImgGroupListApi,
  GetImgListParams,
  ImgListItem,
  GroupListItem
} from '@/api'
import type { UploadProps } from 'element-plus'
const dialogVisible = ref(false)
const groupList = ref<GroupListItem[]>([])
const total = ref(0)
const addGroupVisible = ref(false)
const addGroupName = ref('')
const imgList = ref<ImgListItem[]>([])
const uploadLoading = ref(false)
const header = {
  Authorization: 'test'
}
const selectImg = ref('')
const activeImgIndex = ref<null | number>(null)
const defaultQueryForm = {
  page: 1,
  limit: 10,
  groupId: 0,
  name: ''
}
let queryForm = reactive<GetImgListParams>({ ...defaultQueryForm })

const getImgList = async () => {
  const { data } = await getImgListApi(queryForm)
  imgList.value = data.rows
  total.value = data.count
}

const getGroupList = async () => {
  const { data } = await getGroupListApi()
  groupList.value = data.rows
}

const fetchAll = () => {
  queryForm.groupId = 0
  getImgList()
}

const fetchGroupImg = (id: number) => {
  queryForm.groupId = id
  getImgList()
}

const deleteImg = async (id: number) => {
  ElMessageBox.confirm('你确定要删除该图片吗', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    const { status, message } = await deleteImgApi(id)
    if (status == 200) {
      ElMessage.success('删除成功！')
    } else {
      ElMessage.error(message)
    }
    getImgList()
  })
}

const deleteGroup = async (id: number) => {
  ElMessageBox.confirm('你确定要删除该分组吗', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    const { status, message } = await deleteImgGroupListApi(id)
    if (status == 200) {
      ElMessage.success('删除成功！')
      fetchAll()
    } else {
      ElMessage.error(message)
    }
    getGroupList()
  })
}

const handleClickClose = () => {
  activeImgIndex.value = null
  queryForm = reactive<GetImgListParams>({ ...defaultQueryForm })
  selectImg.value = ''
  dialogVisible.value = false
}
const beforeUpload: UploadProps['beforeUpload'] = (file) => {
  uploadLoading.value = true
  const isImg = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isImg) {
    ElMessage.error('上传图片只能是 JPG/PNG 格式!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    ElMessage.error('上传图片大小不能超过 2MB!')
  }
  uploadLoading.value = false
  return isImg && isLt2M
}
const handleUploadSuccess: UploadProps['onSuccess'] = async (response: UploadResponse) => {
  if (response.status == 200) {
    ElMessage.success('模拟上传成功')
  } else {
    ElMessage.error('模拟上传失败')
  }
  uploadLoading.value = false
}
const createGroup = async () => {
  const { status, message } = await addImgGroupApi({
    name: addGroupName.value
  })
  if (status == 200) {
    ElMessage.success('创建成功')
    addGroupVisible.value = false
    getGroupList()
  } else {
    ElMessage.error(message)
  }
}

const handleClickChoose = (url: string, index: number) => {
  activeImgIndex.value = index
  selectImg.value = url
}
const handleClickConfirm = async () => {
  if (callbackFun && selectImg.value && activeImgIndex.value !== null) {
    callbackFun(selectImg.value)
    handleClickClose()
  }
}
export type callbackType = (imgUrl: string) => void

let callbackFun: callbackType | null = null

export type initSelectImageType = (callback: callbackType) => void

const initSelectImage = async (callback: callbackType) => {
  callbackFun = callback
  await getGroupList()
  await getImgList()
  dialogVisible.value = true
}

defineExpose({
  initSelectImage
})
</script>

<template>
  <ElDialog
    v-model="dialogVisible"
    append-to-body
    :close-on-click-modal="false"
    lock-scroll
    title="选择图片"
    width="1000px"
    @close="handleClickClose"
  >
    <div class="container">
      <div class="container-left">
        <ElMenu default-active="0">
          <ElScrollbar style="height: 523px; width: 100%">
            <div class="group-list">
              <ElMenuItem index="0" @click="fetchAll()">
                <template v-slot:title>
                  <span>全部</span>
                </template>
              </ElMenuItem>
              <template v-for="(item, index) in groupList" :key="index">
                <ElMenuItem class="menu-item" :index="`${item.id}`" @click="fetchGroupImg(item.id)">
                  <template v-slot:title>
                    <span>
                      {{ item.name }}
                    </span>
                  </template>
                  <ElIcon class="delete" @click.stop="deleteGroup(item.id)">
                    <IEpCircleCloseFilled />
                  </ElIcon>
                </ElMenuItem>
              </template>
            </div>
          </ElScrollbar>
          <ElPopover v-model="addGroupVisible" placement="top" width="160">
            <ElInput v-model="addGroupName" placeholder="请输入分组名称" />
            <div style="text-align: right; margin: 10px 0 0 0">
              <ElButton size="small" type="primary" @click="createGroup()">确定</ElButton>
            </div>
            <template v-slot:reference>
              <ElButton style="width: 127px">
                <ElIcon style="margin-right: 5px">
                  <IEpFolderAdd />
                </ElIcon>
                新建分组
              </ElButton>
            </template>
          </ElPopover>
        </ElMenu>
      </div>
      <div class="container-right">
        <div class="top">
          <ElInput v-model="queryForm.name" placeholder="搜索图片名称" @input="getImgList" />
          <ElUpload
            v-loading="uploadLoading"
            accept=".jpg,.png"
            :action="config.baseUrl + '/api/ossPut'"
            :before-upload="beforeUpload"
            :headers="header"
            :on-success="handleUploadSuccess"
            :show-file-list="false"
          >
            <ElButton type="primary">上传图片</ElButton>
          </ElUpload>
        </div>
        <ElScrollbar style="height: 460px">
          <div class="image-list">
            <template v-for="(item, index) in imgList" :key="index">
              <div class="image-list-item">
                <ElTooltip :content="item.name" placement="top">
                  <div class="image-list-item-box" @click="handleClickChoose(item.path, index)">
                    <ElImage
                      fit="cover"
                      :src="item.path"
                      style="width: 100%; height: 140px"
                    ></ElImage>
                    <div class="name">{{ item.name }}</div>
                    <ElIcon class="delete" @click.stop="deleteImg(item.id)">
                      <IEpCircleCloseFilled />
                    </ElIcon>
                    <div
                      class="mask"
                      :style="{
                        display: activeImgIndex == index ? 'flex' : 'none'
                      }"
                    >
                      <ElIcon>
                        <IEpCheck />
                      </ElIcon>
                    </div>
                  </div>
                </ElTooltip>
              </div>
            </template>
          </div>
        </ElScrollbar>
        <ElPagination
          v-model:current-page="queryForm.page"
          background
          layout="prev, pager, next"
          :page-size="queryForm.limit"
          small
          style="justify-content: flex-end"
          :total="total"
          @update:current-page="getImgList"
        />
      </div>
    </div>
    <template v-slot:footer>
      <span class="dialog-footer">
        <ElButton size="default" @click="handleClickClose">取消</ElButton>
        <ElButton size="default" type="primary" @click="handleClickConfirm">确定</ElButton>
      </span>
    </template>
  </ElDialog>
</template>

<style lang="scss" scoped>
:deep(.el-dialog) {
  .el-dialog__header {
    padding: 10px 20px;
    line-height: 1;
    border-bottom: 1px solid #f2f2f2;
    span {
      line-height: 28px;
      font-size: 14px;
      color: #333;
    }
    .el-dialog__close {
      color: #909399;
    }
  }
}

.el-dialog__body {
  color: #909399;
  .container {
    display: flex;
    min-height: 300px;
    border-bottom: 1px solid #f2f2f2;
    .container-left {
      border-right: 1px solid #f2f2f2;
      padding-bottom: 20px;
      .el-menu {
        height: 100%;
        border-right: none;
        width: 165px;
        .group-list {
          .menu-item {
            position: relative;
            .delete {
              position: absolute;
              right: -12px;
              top: -6px;
              display: none;
              color: #333;
            }
            &:hover .delete {
              display: block;
            }
          }
          .el-menu-item,
          .el-submenu__title {
            margin-bottom: 10px;
            justify-content: center;
            width: 127px;
            height: 36px;
            border-radius: 5px;
            &.is-active {
              color: #409eff !important;
              background: #c3e1fe !important;
            }
          }
        }
      }
    }
    .container-right {
      padding-bottom: 20px;
      margin-left: 15px;
      flex: 1;
      .top {
        padding: 10px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .el-input {
          width: 240px;
        }
      }
      .image-list {
        margin-right: 5px;
        &-item {
          display: inline-block;
          cursor: pointer;
          position: relative;
          width: 20%;
          text-align: center;
          &-box {
            font-size: 0;
            margin: 10px;
            position: relative;
            &:hover {
              .delete {
                display: block;
              }
            }
            .el-image {
              height: 143px;
              border-radius: 5px;
            }
            .mask {
              display: none;
              top: 0;
              left: 0;
              right: 0;
              bottom: 20px;
              overflow: hidden;
              border-radius: 5px;
              position: absolute;
              background: rgba(199, 194, 194, 0.7);
              justify-content: center;
              align-items: center;
              .el-icon {
                font-size: 40px;
                color: #fff;
              }
            }
            .name {
              height: 20px;
              font-size: 14px;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .delete {
              position: absolute;
              top: -5px;
              right: -5px;
              font-size: 16px;
              display: none;
              z-index: 100;
              color: #333;
              background: #fff;
              border-radius: 50%;
            }
          }
        }
      }
    }
  }
}
.el-dialog__footer {
  padding-top: 0 !important;
  border-top: 1px solid #f2f2f2;
}

.disabled {
  background-color: #f5f7fa;
  i:hover {
    color: #737579;
    cursor: no-drop;
  }
  div {
    cursor: no-drop !important;
  }
  cursor: no-drop;
}
</style>
