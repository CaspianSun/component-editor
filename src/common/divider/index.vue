<script lang="ts" setup>
import { toRefs } from 'vue'
import { generateStyleObject } from '../style'
const props = defineProps<{
  data: Divider
}>()
const { data } = toRefs(props)
</script>

<template>
  <div class="divider">
    <div
      :style="{
        ...generateStyleObject(data),
        height: data.height + 'px',
      }"
    >
      <template v-if="data.type == 1">
        <div class="empty" :style="{ backgroundColor: data.bgColor }"></div>
      </template>
      <template v-if="data.type == 2 || data.type == 3">
        <div class="line-style">
          <template v-if="data.type == 2">
            <div
              class="solid"
              :style="{
                borderColor: data.lineColor,
                borderWidth: data.lineSize + 'px',
              }"
            ></div>
          </template>
          <template v-if="data.type == 3">
            <div
              class="dotted"
              :style="{
                borderColor: data.lineColor,
                borderWidth: data.lineSize + 'px',
              }"
            ></div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.divider {
  position: relative;
  z-index: 10;
  .empty {
    width: 100%;
    height: 100%;
  }
  .line-style {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .solid {
      width: 100%;
      border: 1px solid #000;
    }
    .dotted {
      width: 100%;
      border: 1px dashed #000;
    }
  }
}
</style>
