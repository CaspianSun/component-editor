<script lang="ts" setup>
import { toRefs } from 'vue'
import { Cell, Icon, Button } from 'vant'
const props = defineProps<{
  data: Integral
}>()
const { data } = toRefs(props)
</script>

<template>
  <div class="wrapper">
    <div
      :style="{
        background: data.bgColor,
        marginTop: data.marginT + 'px',
        marginBottom: data.marginB + 'px',
        marginLeft: data.marginL + 'px',
        marginRight: data.marginR + 'px',
        borderRadius: `${data.radiusT}px ${data.radiusT}px ${data.radiusB}px ${data.radiusB}px`,
      }"
    >
      <Cell :border="false" center :style="{ background: data.bgColor }">
        <template v-if="data.isShowIcon" #icon>
          <template v-if="data.icon">
            <div style="width: 22px; height: 22px; margin-right: 5px">
              <Icon :name="data.icon" size="22" />
            </div>
          </template>
          <template v-else>
            <div style="width: 22px; height: 22px; margin-right: 5px">
              <Icon :color="data.titleColor" name="points" size="22" />
            </div>
          </template>
        </template>
        <template #title>
          <div :style="{ color: data.titleColor }">{{ data.title }}</div>
        </template>
        <template v-if="data.type === 2">
          <div :style="{ color: data.textColor }">
            <text class="left-text">888.88</text>
          </div>
        </template>
        <template #right-icon>
          <Icon :color="data.rightIconColor" name="arrow" />
        </template>
      </Cell>
      <template v-if="data.type === 1">
        <div class="bottom">
          <Cell center :style="{ background: data.bgColor }">
            <template #title>
              <div class="left" :style="{ color: data.textColor }">
                ¥
                <text class="left-text">888.88</text>
              </div>
            </template>
            <Button :color="data.btnBgColor" round size="small">
              <span :style="{ color: data.btnTextColor }">{{ data.buttonText }}</span>
            </Button>
          </Cell>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  z-index: 10;
  overflow: hidden;
  .bottom {
    .left {
      &-text {
        font-size: 25px;
        font-weight: 500;
      }
    }
  }
}
</style>
