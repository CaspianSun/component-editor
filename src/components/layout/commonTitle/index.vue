<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    default: ''
  }
})
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
  padding: 15px 0 10px;
}
</style>
