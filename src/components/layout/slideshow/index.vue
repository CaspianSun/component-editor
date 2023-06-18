<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Autoplay } from 'swiper'
import 'swiper/scss'
import 'swiper/scss/pagination'
const modules = [Pagination, Autoplay]
const props = defineProps<{
  data: ComponentType<SlideshowType>
}>()
const { setStyle } = toRefs(props.data)
</script>

<template>
  <div class="slideshow">
    <div
      class="container"
      :style="{
        marginTop: setStyle.marginT + 'px',
        marginBottom: setStyle.marginB + 'px',
        marginLeft: setStyle.marginLR + 'px',
        marginRight: setStyle.marginLR + 'px',
        borderRadius: `${setStyle.radiusT}px ${setStyle.radiusT}px ${setStyle.radiusB}px ${setStyle.radiusB}px`
      }"
    >
      <Swiper
        :allow-touch-move="false"
        :autoplay="{
          delay: setStyle.delay * 1000
        }"
        :modules="modules"
      >
        <template v-for="(item, index) in setStyle.imgList" :key="index">
          <SwiperSlide>
            <div class="item" :style="{ height: setStyle.height + 'px' }">
              <img v-if="item.src" :src="item.src" />
            </div>
          </SwiperSlide>
        </template>
      </Swiper>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.slideshow {
  position: relative;
  z-index: 10;
  .container {
    overflow: hidden;

    .item {
      background: #ebf3ff;
      font-size: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>
