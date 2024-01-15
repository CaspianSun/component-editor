<script lang="ts" setup>
import { ref, computed } from 'vue'
import { ElDialog, ElMessage } from 'element-plus'
import { pageNameMap, Page } from '../../enum/page'
import { usePageStore, useDataStore } from '../../store'
import { pageList } from '../../store/modules/page'
import { createPageModuleApi } from '../../api'

const visible = ref(false)
const isFirst = ref(false)
const open = (first: boolean = false) => {
  isFirst.value = first
  visible.value = true
}
const pageStore = usePageStore()
const dataStore = useDataStore()
const activePageList = computed(() => {
  return pageStore.pageList.map((item) => {
    return item.type
  })
})

defineExpose({
  open,
})

const optionalList = ref(
  Object.keys(pageNameMap)
    .map((key) => {
      return { type: key, title: pageNameMap[key as keyof typeof pageNameMap] }
    })
    .filter((item) => !!item) as SelectItem[],
)

interface SelectItem {
  type: Page
  title: string
}

const select = ref<SelectItem[]>([])

const handleSelect = (item: SelectItem) => {
  if (activePageList.value.includes(item.type) && !multipleList.includes(item.type)) return
  if (select.value.find((i) => i.type === item.type)) {
    select.value = select.value.filter((i) => i.type !== item.type)
  } else {
    if (select.value.length + activePageList.value.length >= 12) return ElMessage.warning('最多可选九个模块')
    select.value = [...select.value, item]
  }
}

const handleFirstConfirm = async () => {
  const defaultPage = pageList()
  for (const item of defaultPage) {
    const data = await pageStore.getDefaultComponents(item.type, item.options?.defaultComponents)
    const { result } = await createPageModuleApi({
      jsonData: data as unknown as string,
      jsonPage: item as unknown as string,
      type: item.type,
    })
    pageStore.pageList.push({
      ...item,
      id: result.id,
    })
    if (!pageStore.activePageId) {
      pageStore.activePageId = result.id
      dataStore.setComponents(data)
      dataStore.resetStack()
    }
  }
}

const handleConfirm = async () => {
  if (isFirst.value) {
    await handleFirstConfirm()
  } else {
    if (select.value.length == 0) return ElMessage.warning('请选择页面')
  }
  for (const item of select.value) {
    await pageStore.addPage(item)
  }
  select.value = []
  visible.value = false
}
const handleCancel = () => {
  select.value = []
  visible.value = false
}

const multipleList = [Page.Custom]
</script>

<template>
  <ElDialog
    v-model="visible"
    modal-class="add-page-modal"
    class="add-page"
    title="配置功能页面"
    width="860"
    :show-close="!isFirst"
    :close-on-click-modal="false"
  >
    <div class="flex flex-col p-10px">
      <div class="grid grid-cols-[repeat(auto-fill,160px)] justify-center">
        <template v-for="(item, index) in optionalList" :key="index">
          <div
            class="item"
            :class="{
              active: activePageList.includes(item.type) && !multipleList.includes(item.type),
              selected: select.map((item) => item.type).includes(item.type),
            }"
            @click="() => handleSelect(item)"
          >
            {{ item.title }}
          </div>
        </template>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <ElButton v-if="!isFirst" @click="handleCancel">取消</ElButton>
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
<style>
.add-page-modal,
.add-page-modal > el-overlay-dialog {
  position: absolute !important;
}
.add-page {
  --el-dialog-margin-top: 5vh;
}
</style>
