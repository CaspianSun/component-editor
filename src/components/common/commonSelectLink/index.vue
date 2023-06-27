<script lang="ts" setup>
import { LinkTypeEnum } from '@/componentProperty'
import { selectLinkKey } from '@/provider/index'
import { CallbackLinkItem } from '@/components/selectLink/index.vue'
const prop = defineProps<{
  link: Link
}>()

const { url, type, urlName } = toRefs(prop.link)
watch(
  () => prop.link,
  (val) => {
    url.value = val.url
    type.value = val.type
    urlName.value = val.urlName
  }
)
const initSelectLink = inject(selectLinkKey)
const handleChooseLick = () => {
  if (initSelectLink) {
    initSelectLink((item: CallbackLinkItem) => {
      url.value = item.pagePath
      urlName.value = item.name
      type.value = item.type
    })
  }
}
</script>

<template>
  <div class="select-link" @click="handleChooseLick">
    <template v-if="url">{{ LinkTypeEnum[type] }}-{{ urlName }}</template>
    <template v-else><span style="color: #999999">请选择跳转链接</span></template>
  </div>
</template>

<style lang="scss" scoped>
.select-link {
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  flex: 1;
  padding: 10px 15px;
  background-color: #fff;
}
</style>
