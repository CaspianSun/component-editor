<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    title?: string
  }>(),
  {
    title: '',
  },
)
</script>

<template>
  <div class="title">
    {{ props.title }}
  </div>
</template>

<style lang="scss" scoped>
.title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  padding: 15px 15px 10px;
}
</style>
