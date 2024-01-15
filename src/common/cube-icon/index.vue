<script lang="ts" setup>
import { generateStyleObject } from '../style'
import { CubeIconEnum } from '../../enum'
import Item from './item.vue'
import { CubeIconConfig } from '../default'

withDefaults(
  defineProps<{
    editable?: boolean
    data?: CubeIcon
  }>(),
  {
    data: () => CubeIconConfig,
  },
)

defineEmits<{
  (event: 'click', data: CubeIcon['option'][0]['link']): void
}>()
</script>

<template>
  <div class="cube-icon relative" :style="generateStyleObject(data)">
    <div class="overflow-hidden">
      <!-- <template v-if="data.type == CubeIconEnum['五宫格']">
        <div class="flex justify-center">
          <div class="w-325rpx px-10rpx">
            <div class="h-full cube-item flex-center">
              <Item :data="data.option[0]"></Item>
            </div>
          </div>
          <div class="flex flex-col w-325rpx px-10rpx">
            <template v-for="index in new Array(4).fill(0).map((_, index) => index + 1)" :key="index">
              <div
                class="h-200rpx mb-10rpx cube-item flex-center"
                :style="{
                  marginBottom: index == 4 ? '0' : '',
                }"
              >
                <Item :data="data.option[index]"></Item>
              </div>
            </template>
          </div>
        </div>
      </template> -->
      <template v-if="data.type == CubeIconEnum['六宫格']">
        <div class="flex justify-center">
          <div class="w-325rpx px-10rpx flex flex-col">
            <div class="cube-item flex-center pb-10rpx flex-1">
              <Item :data="data.option[0]"></Item>
            </div>
            <div class="cube-item flex-center flex-1">
              <Item :data="data.option[1]"></Item>
            </div>
          </div>
          <div class="flex flex-col w-325rpx px-10rpx">
            <template v-for="index in new Array(4).fill(0).map((_, index) => index + 2)" :key="index">
              <div
                class="h-200rpx mb-10rpx cube-item flex-center"
                :style="{
                  marginBottom: index == 5 ? '0' : '',
                }"
              >
                <Item :data="data.option[index]"></Item>
              </div>
            </template>
          </div>
        </div>
      </template>
      <template v-if="data.type == CubeIconEnum['七宫格']">
        <div class="h-200rpx flex-center w-630rpx mx-a pb-10rpx">
          <div class="full relative">
            <Item :data="data.option[0]"></Item>
          </div>
        </div>
        <div class="grid grid-cols-[repeat(auto-fill,325rpx)] items-center justify-center">
          <template v-for="index in new Array(6).fill(0).map((_, index) => index + 1)" :key="index">
            <div class="w-325rpx h-200rpx p-10rpx relative">
              <Item :data="data.option[index]"></Item>
            </div>
          </template>
        </div>
      </template>
      <template v-if="data.type == CubeIconEnum['九宫格']">
        <div class="grid grid-cols-[repeat(auto-fill,220rpx)] items-center justify-center">
          <template v-for="(item, index) in new Array(9).fill(0)" :key="index">
            <div class="w-220rpx h-220rpx p-10rpx relative">
              <Item :data="data.option[index]"></Item>
            </div>
          </template>
        </div>
      </template>
      <template v-if="data.type == CubeIconEnum['九宫格2']">
        <div class="flex flex-col items-center">
          <div class="flex justify-center">
            <div class="w-325rpx px-10rpx">
              <div class="h-full cube-item flex-center">
                <Item :data="data.option[0]"></Item>
              </div>
            </div>
            <div class="flex flex-col w-325rpx px-10rpx">
              <template v-for="index in new Array(2).fill(0).map((_, index) => index + 1)" :key="index">
                <div
                  class="h-150rpx mb-10rpx cube-item flex-center"
                  :style="{
                    marginBottom: index == 2 ? '0' : '',
                  }"
                >
                  <Item :data="data.option[index]"></Item>
                </div>
              </template>
            </div>
          </div>
          <div class="flex justify-center mt-10rpx">
            <template v-for="index in new Array(2).fill(0).map((_, index) => index + 3)" :key="index">
              <div class="h-150rpx w-325rpx cube-item flex-center px-10rpx">
                <Item :data="data.option[index]"></Item>
              </div>
            </template>
          </div>
          <div class="flex justify-center mt-10rpx">
            <template v-for="index in new Array(4).fill(0).map((_, index) => index + 5)" :key="index">
              <div class="h-150rpx w-162.5rpx cube-item flex-center px-10rpx">
                <Item :data="data.option[index]"></Item>
              </div>
            </template>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
item {
  width: 100%;
  height: 100%;
}
</style>
