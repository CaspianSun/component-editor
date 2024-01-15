<script lang="ts" setup>
import { SlideshowConfig } from '../default'
import { generateStyleObject } from '../style'
import { toRefs, withDefaults } from 'vue'
import { isMpWeixin } from '../../utils/env'

const props = withDefaults(
  defineProps<{
    editable?: boolean
    data: Slideshow
  }>(),
  {
    data: () => SlideshowConfig,
  },
)
const { data } = toRefs(props)

const emit = defineEmits<{
  (event: 'click', data: Slideshow['imgList'][0]['link']): void
}>()
</script>

<template>
  <div class="slideshow" :style="generateStyleObject(data)">
    <nut-swiper
      :width="editable ? 375 - (data.marginL || 0) - (data.marginR || 0) : isMpWeixin ? void 0 : -1"
      :height="data.height"
      :pagination-visible="data.paginationVisible"
      :auto-play="data.delay * 1000"
      :direction="data.direction"
      :loop="true"
      :custom-style="`height: ${data.height}px;`"
      :style="`height: ${data.height}px;`"
    >
      <template v-for="(item, index) in data.imgList" :key="index">
        <nut-swiper-item>
          <div
            :style="{
              height: data.height + 'px',
              borderTopRightRadius: data.radiusT + 'px',
              borderTopLeftRadius: data.radiusT + 'px',
              borderBottomRightRadius: data.radiusB + 'px',
              borderBottomLeftRadius: data.radiusB + 'px',
            }"
            @click="() => emit('click', item.link)"
          >
            <template v-if="item.src">
              <img mode="aspectFill" class="h-full" :src="item.src" />
            </template>
            <template v-else>
              <div class="h-full bg-#f5f7fa flex-center">
                <nut-icon size="50px" custom-color="#c6c6c6" color="#c6c6c6" name="photograph"></nut-icon>
              </div>
            </template>
          </div>
        </nut-swiper-item>
      </template>
    </nut-swiper>
  </div>
</template>

<style lang="scss" scoped>
.slideshow {
  overflow: hidden;
  -webkit-backface-visibility: hidden;
  -webkit-transform: translate3d(0, 0, 0);
}
</style>
