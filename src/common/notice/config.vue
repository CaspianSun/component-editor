<script lang="ts" setup>
import { toRefs, ref } from 'vue'
import { ElementRender } from '../../utils/listToElement'
import { CommonConfig } from '../../components/CommonConfig'
import { schema } from './options'
const props = defineProps<{
  data: Notice
}>()
const { data } = toRefs(props)
</script>

<template>
  <CommonConfig title="图文导航" :data="data">
    <ElementRender :schema="schema" :data="data" />
  </CommonConfig>
</template>

<style lang="scss" scoped></style>
