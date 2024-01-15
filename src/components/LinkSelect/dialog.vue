<script lang="ts" setup>
import { computed, ref } from 'vue'
import { ElDialog, ElMessage } from 'element-plus'
import { pageNameMap, Page } from '../../enum/page'
import { usePageStore } from '../../store'
import { ResultType } from './index'

const visible = ref(false)
const pageStore = usePageStore()

const activePage = ref<{
  id?: string
  type: Page
  title: string
}>()

const resolveFn = ref<(item: ResultType) => void>()
const rejectFn = ref<(...args: any[]) => void>()
const open = (): Promise<ResultType> => {
  return new Promise((resolve, reject) => {
    visible.value = true
    resolveFn.value = resolve
    rejectFn.value = reject
  })
}

const pageList = computed(() => {
  return new Array(pageStore.pageList.length).fill(0).map((_, index) => {
    const page = pageStore.pageList[index]
    if (!page) return void 0
    return {
      id: page.id,
      type: page.type,
      title: pageNameMap[page.type],
    }
  })
})

const handleSelect = () => {
  if (!activePage.value) return ElMessage.error('请选择页面')
  resolveFn.value?.({
    type: activePage.value.type,
    id: activePage.value.id,
  })
  reset()
}

const handleCancel = () => {
  rejectFn.value?.(false)
  reset()
}

const reset = () => {
  activePage.value = void 0
  visible.value = false
  rejectFn.value = void 0
  resolveFn.value = void 0
}

defineExpose({
  open,
})
</script>

<template>
  <ElDialog v-model="visible" title="选择跳转页面" width="860">
    <div class="flex flex-col p-10px">
      <div class="grid grid-cols-[repeat(auto-fill,160px)] justify-center">
        <template v-for="(item, index) in pageList" :key="index">
          <div
            class="w-146px h-76px bg-#F9F9F9 flex-center mx-a mb-13px b-1px b-solid b-#D3D3D3 hover:(b-#7DA3EF bg-#F0F5FF) c-#33384D cursor-pointer"
            :style="{
              borderColor: item?.type === activePage?.type ? '#7DA3EF' : '#D3D3D3',
              backgroundColor: item?.type === activePage?.type ? '#F0F5FF' : '#F9F9F9',
            }"
            @click="activePage = item"
          >
            {{ item?.title }}
          </div>
        </template>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <ElButton @click="handleCancel">取消</ElButton>
        <ElButton type="primary" @click="handleSelect">确定</ElButton>
      </span>
    </template>
  </ElDialog>
</template>

<style lang="scss" scoped></style>
