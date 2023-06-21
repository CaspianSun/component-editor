<script lang="ts" setup>
import { selectImageKey } from '@/provider/index'
const prop = defineProps<{
  src: string
}>()
const emit = defineEmits(['update:src'])
const src = ref(prop.src)
const selectImage = inject(selectImageKey)
const handleClickChooseImage = () => {
  if (selectImage) {
    selectImage((imgUrl: string) => {
      src.value = imgUrl
      emit('update:src', src.value)
    })
  }
}
const handleDeleteImg = () => {
  src.value = ''
  emit('update:src', '')
}
</script>

<template>
  <div class="select-img">
    <template v-if="src">
      <ElImage class="avatar" fit="cover" :preview-src-list="[src]" :src="src" />
      <div class="delete" @click.stop="handleDeleteImg">
        <ElIcon><IEpCircleCloseFilled /></ElIcon>
      </div>
    </template>
    <ElIcon v-else class="select-img-icon" @click="handleClickChooseImage"><IEpPlus /></ElIcon>
  </div>
</template>

<style lang="scss" scoped>
.select-img {
  margin-right: 10px;
  width: 80px;
  height: 80px;
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  transition: var(--el-transition-duration-fast);
  .avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &:hover {
    border-color: var(--el-color-primary);
    .delete {
      display: block;
    }
  }
  .el-image {
    border-radius: 6px;
    width: 100%;
    height: 100%;
  }
  .select-img-icon {
    border-radius: 6px;
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    text-align: center;
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
</style>
