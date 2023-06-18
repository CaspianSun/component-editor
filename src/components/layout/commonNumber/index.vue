<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  number: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 50
  },
  min: {
    type: Number,
    default: 0
  },
  leftSpan: {
    type: Number,
    default: 6
  },
  rightSpan: {
    type: Number,
    default: 18
  }
})
const emit = defineEmits(['update'])
const number = ref(props.number)
watch(
  () => props.number,
  () => {
    number.value = props.number
  }
)
watch(
  () => number.value,
  (val) => {
    emit('update', val)
  }
)
</script>

<template>
  <ElRow>
    <div class="row">
      <ElCol :span="props.leftSpan">
        <div class="left">
          {{ props.title }}
        </div>
      </ElCol>
      <ElCol :span="props.rightSpan">
        <div class="right">
          <ElSlider v-model="number" :max="props.max" :min="props.min" size="small" />
          <ElInput
            v-model="number"
            :max="props.max"
            :min="props.min"
            size="small"
            type="number"
            @input="
              (val) => {
                number = Number(val) > props.max ? props.max : Number(val)
                number = Number(val) < props.min ? props.min : Number(val)
              }
            "
          >
            <template #append>px</template>
          </ElInput>
        </div>
      </ElCol>
    </div>
  </ElRow>
</template>

<style lang="scss" scoped>
.row {
  width: 100%;
  height: 32px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.left {
  height: 100%;
  display: flex;
  align-items: center;
}
.right {
  display: flex;
  align-items: center;

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
