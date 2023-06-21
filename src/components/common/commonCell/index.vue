<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    label?: string
    leftSpan?: number
    rightSpan?: number
  }>(),
  {
    label: '',
    leftSpan: 6,
    rightSpan: 18
  }
)
</script>

<template>
  <ElRow>
    <div class="row">
      <ElCol :span="props.leftSpan">
        <div class="row-left">
          {{ props.label }}
        </div>
      </ElCol>
      <ElCol :span="props.rightSpan">
        <div class="row-right">
          <slot></slot>
        </div>
      </ElCol>
    </div>
  </ElRow>
</template>

<style lang="scss" scoped>
.row {
  width: 100%;
  min-height: 32px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-bottom: 20px;
  &-left {
    height: 100%;
    display: flex;
    align-items: center;
  }
  &-right {
    display: flex;
    align-items: center;
    width: 100%;

    > :deep(.el-input) {
      width: 100%;
    }
  }
}
</style>
