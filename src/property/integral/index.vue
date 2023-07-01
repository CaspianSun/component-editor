<script lang="ts" setup>
const props = defineProps<{
  data: Integral
}>()
const { data } = toRefs(props)
</script>

<template>
  <div class="integral">
    <div
      class="container"
      :style="{
        background: data.bgColor,
        marginTop: data.marginT + 'px',
        marginBottom: data.marginB + 'px',
        marginLeft: data.marginLR + 'px',
        marginRight: data.marginLR + 'px',
        borderRadius: `${data.radiusT}px ${data.radiusT}px ${data.radiusB}px ${data.radiusB}px`
      }"
    >
      <VanCell :border="false" center :style="{ background: data.bgColor }">
        <template v-if="data.isShowIcon" #icon>
          <template v-if="data.icon">
            <VanIcon :name="data.icon" size="22" style="margin-right: 5px" />
          </template>
          <template v-else>
            <VanIcon :color="data.titleColor" name="points" size="22" style="margin-right: 5px" />
          </template>
        </template>
        <template #title>
          <div :style="{ color: data.titleColor }">{{ data.title }}</div>
        </template>
        <template v-if="data.type === 2">
          <div :style="{ color: data.textColor }">
            ¥
            <text class="left-text">888.88</text>
          </div>
        </template>
        <template #right-icon>
          <VanIcon :color="data.rightIconColor" name="arrow" />
        </template>
      </VanCell>
      <template v-if="data.type === 1">
        <div class="bottom">
          <VanCell center :style="{ background: data.bgColor }">
            <template #title>
              <div class="left" :style="{ color: data.textColor }">
                ¥
                <text class="left-text">888.88</text>
              </div>
            </template>
            <VanButton :color="data.btnBgColor" round size="small">
              <span :style="{ color: data.btnTextColor }">{{ data.buttonText }}</span>
            </VanButton>
          </VanCell>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.integral {
  position: relative;
  z-index: 10;
  .container {
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
}
</style>
