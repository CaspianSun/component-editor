<script lang="ts" setup>
import { toRefs } from 'vue'
import { NoticeBar, Icon, Swipe, SwipeItem } from 'vant'
import { generateStyleObject } from '../style'

const props = defineProps<{
  data: Notice
}>()
const { data } = toRefs(props)
</script>

<template>
  <div :style="generateStyleObject(data)" class="overflow-hidden relative">
    <template v-if="data.type == 1">
      <NoticeBar :background="data.bgColor" :color="data.leftTextColor">
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
                <Icon :name="data.leftIcon" :size="22" />
              </template>
              <template v-else><Icon name="bullhorn-o" :size="22" /></template>
            </template>
          </div>
        </template>
        <Swipe
          :autoplay="data.delay * 1000"
          class="notice-swipe"
          :show-indicators="false"
          :style="{
            color: data.textColor,
          }"
          vertical
        >
          <SwipeItem>公告1</SwipeItem>
          <SwipeItem>公告2</SwipeItem>
        </Swipe>
      </NoticeBar>
    </template>
  </div>
</template>

<style lang="scss" scoped>
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
</style>
