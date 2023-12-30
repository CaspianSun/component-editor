<script lang="ts" setup>
import { toRefs } from 'vue'
const props = defineProps<{
  data: Notice
}>()
const { data } = toRefs(props)
</script>

<template>
  <div class="notice">
    <div
      class="container"
      :style="{
        background: data.bgColor,
        marginTop: data.marginT + 'px',
        marginBottom: data.marginB + 'px',
        marginLeft: data.marginLR + 'px',
        marginRight: data.marginLR + 'px',
        borderRadius: `${data.radiusT}px ${data.radiusT}px ${data.radiusB}px ${data.radiusB}px`,
      }"
    >
      <template v-if="data.type == 1">
        <VanNoticeBar :background="data.bgColor" :color="data.leftTextColor">
          <template #left-icon>
            <div class="left">
              <template v-if="data.leftType === 1">
                <div
                  class="left-text"
                  :style="{
                    color: data.leftTextColor,
                    background: data.leftBgColor,
                  }"
                >
                  {{ data.leftText }}
                </div>
              </template>
              <template v-if="data.leftType === 2">
                <template v-if="data.leftIcon">
                  <VanIcon :name="data.leftIcon" :size="22" />
                </template>
                <template v-else><VanIcon name="bullhorn-o" :size="22" /></template>
              </template>
            </div>
          </template>
          <VanSwipe
            :autoplay="data.delay * 1000"
            class="notice-swipe"
            :show-indicators="false"
            :style="{
              color: data.textColor,
            }"
            vertical
          >
            <VanSwipeItem>公告1</VanSwipeItem>
            <VanSwipeItem>公告2</VanSwipeItem>
          </VanSwipe>
        </VanNoticeBar>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.notice {
  position: relative;
  z-index: 10;
  .container {
    overflow: hidden;
    .left {
      margin-right: 10px;
      display: flex;
      align-items: center;
      .left-text {
        font-weight: bold;
        flex-shrink: 0;
        padding: 0px 3px;
        border-radius: 5px;
        font-size: 14px;
      }
    }

    .notice-swipe {
      height: 40px;
      line-height: 40px;
    }
  }
}
</style>
