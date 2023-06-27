<script lang="ts" setup>
const props = defineProps<{
  data: OnePictureType
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
        height: data.height + 'px'
      }"
    >
      <template v-if="data.link.src">
        <VanImage fit="cover" :src="data.link.src" style="width: 100%; height: 100%"></VanImage>
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
