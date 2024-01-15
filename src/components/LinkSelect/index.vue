<script lang="ts" setup>
import { inject, defineModel } from 'vue'
import { ElInput, ElButton } from 'element-plus'
import { LinkEnum } from '../../enum'
import { Page, pageNameMap } from '../../enum/page'
import { InjectKey } from '.'

const props = defineProps<{
  modelValue?: Link
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: Link): void
}>()

const openLinkSelect = inject(InjectKey)
const handleClick = () => {
  openLinkSelect?.()
    .then((res) => {
      emit('update:modelValue', {
        type: LinkEnum['基础页面'],
        url: res.type,
        id: `${res.id}`,
        name: pageNameMap[res.type],
      })
      console.log(res)
    })
    .catch(() => {})
}
</script>

<template>
  <div class="relative">
    <div class="abs-full cursor-pointer z-100" @click="handleClick"></div>
    <ElInput :model-value="modelValue?.name" :placeholder="'请选择链接'" class="input-with-select" :disabled="true">
      <template #append>
        <ElButton class="c-#7DA3EF!">
          {{ modelValue?.name ? '更改链接' : '选择链接' }}
        </ElButton>
      </template>
    </ElInput>
  </div>
</template>

<style lang="scss" scoped>
.el-input {
  &.is-disabled {
    :deep() {
      .el-input__wrapper {
        background-color: #fff;

        .el-input__inner {
          color: #333 !important;
          -webkit-text-fill-color: #333 !important;
        }
      }

      .el-input-group__append {
        background-color: #fff;
      }
    }
  }
}
</style>
