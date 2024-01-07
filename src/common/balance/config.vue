<script lang="ts" setup>
import { toRefs } from 'vue'
import { ElementRender } from '../../utils/listToElement'
import { CommonConfig } from '../../components/CommonConfig'
import { schema } from './options'

const props = defineProps<{
  data: Balance
}>()
const { data } = toRefs(props)
</script>

<template>
  <CommonConfig title="我的积分" :data="data">
    <ElementRender :schema="schema" :data="data" />
  </CommonConfig>
</template>

<style lang="scss" scoped></style>
