<script lang="ts" setup>
import { computed, onMounted, getCurrentInstance, ref } from 'vue'

const parent = ref<{
  editable?: boolean
  data?: CubeIcon
}>()
const parentEmits = ref<{
  (event: 'click', data: CubeIcon['option'][0]['link']): void
}>()
onMounted(() => {
  const instance = getCurrentInstance()
  parent.value = instance!.parent!.props
  parentEmits.value = instance!.parent!.emit
})
const props = defineProps<{
  data?: CubeIcon['option'][0]
}>()

const setStyle = computed(() => {
  if (props.data?.setupType == 1) {
    return Object.assign({}, props.data, {
      radius: parent.value?.data?.itemRadius,
      bgColor: parent.value?.data?.itemBgColor,
      bg: parent.value?.data?.itemBg,
      textColor: parent.value?.data?.itemTextColor,
      textSize: parent.value?.data?.itemTextSize,
      spacing: parent.value?.data?.itemSpacing,
      bgType: parent.value?.data?.itemBgType,
      iconSize: parent.value?.data?.itemIconSize,
    })
  } else {
    return props.data
  }
})

const spacing = computed(() => {
  return parent.value?.editable ? `${setStyle.value?.spacing}px` : `${(setStyle.value?.spacing || 0) * 2}rpx`
})

const titleFontSize = computed(() => {
  return parent.value?.editable ? `${setStyle.value?.textSize}px` : `${(setStyle.value?.textSize || 0) * 2}rpx`
})

const iconSize = computed(() => {
  return parent.value?.editable ? `${setStyle.value?.iconSize}px` : `${(setStyle.value?.iconSize || 0) * 2}rpx`
})
</script>

<template>
  <div
    class="full overflow-hidden relative"
    :class="parent?.editable ? 'editable' : ''"
    :style="{
      borderRadius: setStyle?.radius + 'px',
      backgroundColor: setStyle?.bgType == 1 ? setStyle?.bgColor : '',
    }"
    @click="() => parentEmits?.('click', setStyle?.link)"
  >
    <div class="abs-full text-0">
      <img v-if="setStyle?.bg && setStyle?.bgType == 2" :src="setStyle?.bg" class="full object-cover" draggable="false" />
    </div>
    <div class="full flex-col-center relative">
      <div
        v-if="setStyle?.icon"
        :style="{
          marginTop: spacing,
          marginBottom: spacing,
        }"
      >
        <img
          :src="setStyle?.icon"
          :style="{
            width: iconSize,
            height: iconSize,
          }"
        />
      </div>
      <span
        v-if="setStyle?.text"
        :style="{
          color: setStyle?.textColor,
          fontSize: titleFontSize,
          marginTop: spacing,
          marginBottom: spacing,
        }"
      >
        {{ setStyle?.text || '' }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.editable {
  &::after {
    content: '';
    position: absolute;
    inset: 0;
  }
}
</style>
