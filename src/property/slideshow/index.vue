<script lang="ts" setup>
const props = defineProps<{
  data: Slideshow
}>()
const { data } = toRefs(props)
</script>

<template>
  <div class="slideshow">
    <div
      class="container"
      :style="{
        marginTop: data.marginT + 'px',
        marginBottom: data.marginB + 'px',
        marginLeft: data.marginLR + 'px',
        marginRight: data.marginLR + 'px',
        borderRadius: `${data.radiusT}px ${data.radiusT}px ${data.radiusB}px ${data.radiusB}px`
      }"
    >
      <VanSwipe :autoplay="data.delay * 1000">
        <template v-for="(item, index) in data.imgList" :key="index">
          <VanSwipeItem>
            <div class="item" :style="{ height: data.height + 'px' }">
              <template v-if="item.src">
                <VanImage fit="cover" :src="item.src" style="width: 100%; height: 100%"></VanImage>
              </template>
              <template v-else>
                <div class="empty">
                  <VanIcon class="icon" name="photo" />
                </div>
              </template>
            </div>
          </VanSwipeItem>
        </template>
      </VanSwipe>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.slideshow {
  position: relative;
  z-index: 5;
  .container {
    overflow: hidden;

    .item {
      background-color: #f5f7fa;
      font-size: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .empty {
      flex: 1;
      height: 100%;
      background-color: #f5f7fa;
      display: flex;
      align-items: center;
      justify-content: center;
      .icon {
        font-size: 60px;
        color: #c6c6c6;
      }
    }
  }
}
</style>
