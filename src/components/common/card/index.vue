<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    title?: string
    borderBottom?: boolean
  }>(),
  {
    title: '',
    borderBottom: true,
  },
)
</script>

<template>
  <div
    class="wrapper"
    :style="{
      borderBottom: props.borderBottom ? '5px solid #f5f7fa' : 'none',
    }"
  >
    <div v-if="props.title" class="title">{{ props.title }}</div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  padding: 20px 20px;
  .title {
    color: #62747c;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 15px;
  }
}
</style>
