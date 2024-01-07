<script lang="ts" setup>
import { ref, computed } from 'vue'
import { ElDialog, ElMessage } from 'element-plus'
import { pageNameMap, Page } from '../../enum/page'
import { usePageStore } from '../../store'

const visible = ref(false)
const pageStore = usePageStore()

const activePage = ref<Page>()

const resolveFn = ref<(...args: any[]) => void>()
const rejectFn = ref<(...args: any[]) => void>()
const open = () => {
  console.log('open')
  return new Promise<Page>((resolve, reject) => {
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
      type: page.type,
      title: pageNameMap[page.type],
    }
  })
})

const handleSelect = () => {
  if (!activePage.value) return ElMessage.error('请选择页面')
  resolveFn.value?.(activePage.value)
  visible.value = false
}

const handleCancel = () => {
  rejectFn.value?.(false)
  visible.value = false
}

defineExpose({
  open,
})
</script>

<template>
  <ElDialog v-model="visible" title="选择跳转页面" width="860">
    <div class="flex flex-col p-10px">
      <div class="grid grid-cols-[repeat(auto-fill,160px)] justify-center">
        <template v-for="item in pageList" :key="item.type">
          <div
            class="w-146px h-76px bg-#F9F9F9 flex-center mx-a mb-13px b-1px b-solid b-#D3D3D3 hover:(b-#7DA3EF bg-#F0F5FF) c-#33384D cursor-pointer"
            :style="{
              borderColor: item?.type === activePage ? '#7DA3EF' : '#D3D3D3',
              backgroundColor: item?.type === activePage ? '#F0F5FF' : '#F9F9F9',
            }"
            @click="activePage = item?.type"
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
