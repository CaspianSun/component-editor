<script lang="ts" setup>
import { toRefs } from 'vue'
import { Image, Icon } from 'vant'
const props = defineProps<{
  data: HotPicture
}>()
const { data } = toRefs(props)
</script>

<template>
  <div class="one-picture">
    <div
      class="wrapper"
      :style="{
        marginTop: data.marginT + 'px',
        marginBottom: data.marginB + 'px',
        marginLeft: data.marginL + 'px',
        marginRight: data.marginR + 'px',
        borderRadius: `${data.radiusT}px ${data.radiusT}px ${data.radiusB}px ${data.radiusB}px`,
      }"
    >
      <template v-if="data.src">
        <Image fit="contain" :src="data.src" style="width: 100%" />
        <div class="hot-spot">
          <template v-for="(item, index) in data.hotSpot" :key="index">
            <div
              class="hot-spot-item"
              :style="{
                top: item.top / 2 + 'px',
                left: item.left / 2 + 'px',
                width: item.width / 2 + 'px',
                height: item.height / 2 + 'px',
              }"
            ></div>
          </template>
        </div>
      </template>
      <template v-else>
        <div class="empty">
          <Icon class="icon" name="photo" />
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.one-picture {
  position: relative;
  z-index: 10;
  .wrapper {
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    .hot-spot {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 20;
      .hot-spot-item {
        position: absolute;
        cursor: pointer;
      }
    }
    .empty {
      flex: 1;
      height: 200px;
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
