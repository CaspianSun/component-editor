<script lang="ts" setup>
import { computed } from 'vue'
import { withDefaults } from 'vue'

const props = withDefaults(
  defineProps<{
    number: number
    max?: number
    min?: number
  }>(),
  {
    number: 0,
    max: 50,
    min: 0,
  },
)
const emit = defineEmits(['update:number'])
const number = computed({
  get: () => props.number,
  set: (val) => {
    emit('update:number', val)
  },
})
</script>

<template>
  <div class="cell">
    <ElSlider v-model="number" :max="props.max" :min="props.min" size="small" />
    <el-input-number v-model="number" :max="props.max" :min="props.min" controls-position="right" />
  </div>
</template>

<style lang="scss" scoped>
.cell {
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0 10px;
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
