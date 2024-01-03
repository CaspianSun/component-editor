<script lang="ts" setup>
import { toRefs } from 'vue'
import { Swipe, SwipeItem, Image, Icon } from 'vant'
import { generateStyleObject } from '../style'

const props = defineProps<{
  data: Slideshow
}>()
const { data } = toRefs(props)
</script>

<template>
  <div class="slideshow">
    <div class="wrapper" :style="generateStyleObject(data)">
      <Swipe :autoplay="data.delay * 1000">
        <template v-for="(item, index) in data.imgList" :key="index">
          <SwipeItem>
            <div class="item" :style="{ height: data.height + 'px' }">
              <template v-if="item.src">
                <Image fit="cover" :src="item.src" style="width: 100%; height: 100%" />
              </template>
              <template v-else>
                <div class="empty">
                  <Icon class="icon" name="photo" />
                </div>
              </template>
            </div>
          </SwipeItem>
        </template>
      </Swipe>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.slideshow {
  position: relative;
  z-index: 5;
  .wrapper {
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
