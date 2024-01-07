<script lang="ts" setup>
import { ref, computed } from 'vue'
import { ElDialog } from 'element-plus'
import { pageNameMap, Page } from '../../enum/page'
import { usePageStore } from '../../store'

const visible = ref(false)
const open = () => {
  visible.value = true
}
const pageStore = usePageStore()
const activePageList = computed(() => {
  return pageStore.pageList.map((item) => {
    return item.type
  })
})

defineExpose({
  open,
})
console.log()

const defaultList = ref([
  {
    type: Page.Login,
    title: '登录',
  },
])

const optionalList = ref(
  Object.keys(pageNameMap)
    .map((key) => {
      if (defaultList.value.find((item) => item.type === key)) return void 0
      return { type: key, title: pageNameMap[key as keyof typeof pageNameMap] }
    })
    .filter((item) => !!item) as SelectItem[],
)

interface SelectItem {
  type: Page
  title: string
}

const select = ref<SelectItem>()

const handleSelect = (item: SelectItem) => {
  if (activePageList.value.length >= 9) return
  if (activePageList.value.includes(item.type)) return
  select.value = item
}
const handleConfirm = () => {
  if (!select.value) return
  const pageObject: PageSetup = {
    ...select.value,
    pageBg: '#F9F9F9',
  }
  switch (select.value.type) {
    default:
      break
  }
  pageStore.addPage(pageObject)
  select.value = void 0
  visible.value = false
}
const handleCancel = () => {
  select.value = void 0
  visible.value = false
}
</script>

<template>
  <ElDialog v-model="visible" title="配置功能页面" width="860">
    <div class="flex flex-col p-10px">
      <div class="grid grid-cols-[repeat(auto-fill,160px)] justify-center">
        <template v-for="item in defaultList" :key="item.type">
          <div class="w-146px h-76px bg-#7DA3EF flex-center c-#fff mb-13px mx-a">
            {{ item.title }}
          </div>
        </template>
      </div>
      <h5>最多可选九个模块</h5>
      <div class="grid grid-cols-[repeat(auto-fill,160px)] justify-center">
        <template v-for="item in optionalList" :key="item.type">
          <div
            class="item"
            :class="{ active: activePageList.includes(item.type), selected: select?.type === item.type }"
            @click="() => handleSelect(item)"
          >
            {{ item.title }}
          </div>
        </template>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <ElButton @click="handleCancel">取消</ElButton>
        <ElButton type="primary" @click="handleConfirm">确定</ElButton>
      </span>
    </template>
  </ElDialog>
</template>

<style lang="scss" scoped>
.item {
  width: 146px;
  height: 76px;
  background-color: #f9f9f9;
  border: 1px solid #d3d3d3;
  color: #333;
  margin: 0 auto 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  @mixin select {
    border: 1px solid #7da3ef;
    background-color: #f0f5ff;
    color: #7da3ef;
  }
  &.active,
  &.active:hover {
    border: 1px solid #d3d3d3;
    background-color: #f9f9f9;
    color: #d3d3d3;
  }
  &.selected {
    @include select;
  }
  &:hover {
    @include select;
  }
}
</style>
