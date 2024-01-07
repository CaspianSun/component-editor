<script lang="ts" setup>
import { generateStyleObject } from '../style'
import { CubeIconEnum } from '../../enum'
import Item from './item.vue'

const props = defineProps<{
  editable: boolean
  data: CubeIcon
}>()
</script>

<template>
  <div class="cube-icon" :style="generateStyleObject(data)">
    <div class="overflow-hidden">
      <template v-if="data.type == CubeIconEnum['九宫格']">
        <div class="grid grid-cols-[repeat(auto-fill,220rpx)] items-center justify-center">
          <template v-for="(item, index) in new Array(9).fill(0)" :key="index">
            <div class="w-220rpx h-220rpx p-10rpx relative">
              <Item :editable="editable" :data="data.option[index]"></Item>
            </div>
          </template>
        </div>
      </template>
      <template v-if="data.type == CubeIconEnum['七宫格']">
        <div class="h-200rpx flex-center w-630rpx mx-a pb-10rpx">
          <div class="full relative">
            <Item :editable="editable" :data="data.option[0]"></Item>
          </div>
        </div>
        <div class="grid grid-cols-[repeat(auto-fill,325rpx)] items-center justify-center">
          <template v-for="index in new Array(6).fill(0).map((_, index) => index + 1)" :key="index">
            <div class="w-325rpx h-200rpx p-10rpx relative">
              <Item :editable="editable" :data="data.option[index]"></Item>
            </div>
          </template>
        </div>
      </template>
      <template v-if="data.type == CubeIconEnum['五宫格']">
        <div class="flex justify-center">
          <div class="w-325rpx px-10rpx">
            <div class="h-full cube-item flex-center">
              <Item :editable="editable" :data="data.option[0]"></Item>
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
                <Item :editable="editable" :data="data.option[index]"></Item>
              </div>
            </template>
          </div>
        </div>
      </template>
      <template v-if="data.type == CubeIconEnum['十宫格']">
        <div class="flex flex-col items-center">
          <div class="flex justify-center">
            <div class="w-325rpx px-10rpx">
              <div class="h-full cube-item flex-center">
                <Item :editable="editable" :data="data.option[0]"></Item>
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
                  <Item :editable="editable" :data="data.option[index]"></Item>
                </div>
              </template>
            </div>
          </div>
          <div class="flex justify-center mt-10rpx">
            <template v-for="index in new Array(2).fill(0).map((_, index) => index + 3)" :key="index">
              <div class="h-150rpx w-325rpx cube-item flex-center px-10rpx">
                <Item :editable="editable" :data="data.option[index]"></Item>
              </div>
            </template>
          </div>
          <div class="flex justify-center mt-10rpx">
            <template v-for="index in new Array(4).fill(0).map((_, index) => index + 5)" :key="index">
              <div class="h-150rpx w-162.5rpx cube-item flex-center px-10rpx">
                <Item :editable="editable" :data="data.option[index]"></Item>
              </div>
            </template>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
