<script lang="ts" setup>
import { defineProps, toRefs } from 'vue'
const props = defineProps<{
  data: Divider
}>()
const { data } = toRefs(props)
</script>

<template>
  <div class="wrapper">
    <div
      :style="{
        height: data.height + 'px',
        marginTop: data.marginT + 'px',
        marginBottom: data.marginB + 'px',
        marginLeft: data.marginLR + 'px',
        marginRight: data.marginLR + 'px',
      }"
    >
      <template v-if="data.type == 1">
        <div class="empty" :style="{ backgroundColor: data.bgColor }"></div>
      </template>
      <div class="line">
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
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  z-index: 10;
  .empty {
    width: 100%;
    height: 100%;
  }
  .line {
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
