<script lang="ts" setup>
import { toRefs } from 'vue'
const props = defineProps<{
  data: HotPicture
}>()
const { data } = toRefs(props)
</script>

<template>
  <div class="one-picture">
    <div
      class="container"
      :style="{
        marginTop: data.marginT + 'px',
        marginBottom: data.marginB + 'px',
        marginLeft: data.marginLR + 'px',
        marginRight: data.marginLR + 'px',
        borderRadius: `${data.radiusT}px ${data.radiusT}px ${data.radiusB}px ${data.radiusB}px`,
      }"
    >
      <template v-if="data.src">
        <VanImage fit="contain" :src="data.src" style="width: 100%"></VanImage>
        <div class="hotpots">
          <template v-for="(item, index) in data.hotpots" :key="index">
            <div
              class="hotpot"
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
          <VanIcon class="icon" name="photo" />
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.one-picture {
  position: relative;
  z-index: 10;
  .container {
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    .hotpots {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 20;
      .hotpot {
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
