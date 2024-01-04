<script lang="ts" setup>
import { toRefs } from 'vue'
import { listToElement } from '../../utils/listToElement'
import { CommonConfig } from '../../components/CommonConfig'
import { list } from './options'
const props = defineProps<{
  data: Balance
}>()
const { data } = toRefs(props)
const ListConfigRender = listToElement(data.value, list)
</script>

<template>
  <CommonConfig title="我的积分" :data="data">
    <ListConfigRender />
  </CommonConfig>
</template>

<style lang="scss" scoped></style>
