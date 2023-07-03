<script lang="ts" setup>
import { LinkEnum } from '@/componentProperty'
import { selectLinkKey } from '@/provider/index'
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
  initSelectLink?.((item: import('@/components/select-link/index.vue').CallbackLinkItem) => {
    url.value = item.pagePath
    urlName.value = item.name
    type.value = item.type
  })
}
</script>

<template>
  <slot>
    <div class="container">
      <template v-if="url">{{ LinkEnum[type] }}-{{ urlName }}</template>
      <template v-else><span style="color: #999999">请选择跳转链接</span></template>
    </div>
  </slot>
</template>

<style lang="scss" scoped>
.select-link {
  flex: 1;
  cursor: pointer;
  .container {
    border-radius: 4px;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 10px 15px;
    background-color: #fff;
  }
}
</style>
