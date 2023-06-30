<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    number: number
    label?: string
    max?: number
    min?: number
    leftSpan?: number
    rightSpan?: number
  }>(),
  {
    number: 0,
    label: '',
    max: 50,
    min: 0,
    leftSpan: 6,
    rightSpan: 18
  }
)
const emit = defineEmits(['update:number'])
const number = ref(props.number)
watch(
  () => number.value,
  (val) => {
    emit('update:number', val)
  }
)
</script>

<template>
  <CommonCell class="cell" :label="props.label">
    <ElSlider v-model="number" :max="props.max" :min="props.min" size="small" />
    <ElInput
      :max="props.max"
      :min="props.min"
      :model-value="number"
      size="small"
      type="number"
      @input="
        (val: string) => {
          number = Number(val) > props.max ? props.max : Number(val)
          number = Number(val) < props.min ? props.min : Number(val)
        }
      "
    >
      <template #append>px</template>
    </ElInput>
  </CommonCell>
</template>

<style lang="scss" scoped>
.cell {
  :deep(.el-input) {
    margin-left: 20px;
    width: 120px;
    .el-input-group__append {
      padding: 0 10px;
    }
    input[type='number']::-webkit-inner-spin-button,
    input[type='number']::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    input[type='number'] {
      -moz-appearance: textfield;
      appearance: textfield;
    }
  }
}
</style>
