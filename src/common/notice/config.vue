<script lang="ts" setup>
import { toRefs, ref } from 'vue'
import { listToElement } from '../../utils/listToElement'
import { CommonConfig } from '../../components/CommonConfig'
import { list } from './options'
const props = defineProps<{
  data: Notice
}>()
const { data } = toRefs(props)
const ListConfigRender = listToElement(data.value, list)
</script>

<template>
  <CommonConfig title="图文导航" :data="data">
    <ListConfigRender />
  </CommonConfig>
</template>

<style lang="scss" scoped></style>
