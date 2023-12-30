<script lang="ts" setup>
import { computed, defineProps, ref, toRefs } from 'vue'
import { CubePictureEnum } from '@/enum'
import { createCommonElement } from '@/utils/commonElement'
const activeTab = ref('1')
const props = defineProps<{
  data: CubePicture
}>()
const typeLength = Object.keys(CubePictureEnum).length / 2
const { data } = toRefs(props)
const CommonRender = createCommonElement(data.value, ['marginT', 'marginB', 'marginLR'])

const twoItemWidth = computed(() => {
  return ((750 - data.value.itemMargin) / 2 - (data.value.marginLR ?? 0) * 2).toFixed()
})

const activeImgIndex = ref(0)

const handleChangeType = (e: string | number | boolean) => {
  activeImgIndex.value = 0
}

const handleUpdateImgSrc = (src: string) => {
  data.value.imgList[activeImgIndex.value].src = src
}
</script>

<template>
  <div class="cube-picture-config">
    <div class="container">
      <CommonTitle title="图片魔方" />
      <ElTabs v-model="activeTab" stretch>
        <ElTabPane label="内容设置" name="1">
          <CommonCard title="组件设置">
            <ElRadioGroup v-model="data.type" @change="handleChangeType">
              <template v-for="index of typeLength" :key="index">
                <ElRadio :label="index - 1">{{ CubePictureEnum[index - 1] }}</ElRadio>
              </template>
            </ElRadioGroup>
            <div class="wrapper">
              <template v-if="data.type <= CubePictureEnum['一行四个']">
                <VanRow class="row">
                  <template v-for="index of data.type + 2" :key="index">
                    <VanCol :span="24 / (data.type + 2)">
                      <div class="row-item" :class="activeImgIndex === index - 1 ? 'active' : ''" @click="activeImgIndex = index - 1">
                        <div class="empty">
                          <div>
                            宽度:
                            {{ ((750 - data.itemMargin * (data.type + 1)) / (data.type + 2) - (data.marginLR ?? 0) * 2).toFixed() }}px
                          </div>
                          <div>高度: {{ data.itemHeight }}px</div>
                        </div>
                      </div>
                    </VanCol>
                  </template>
                </VanRow>
              </template>
              <template v-else-if="data.type === CubePictureEnum['二左二右']">
                <VanRow class="row">
                  <template v-for="index of 4" :key="index">
                    <VanCol :span="12">
                      <div class="row-item" :class="activeImgIndex === index - 1 ? 'active' : ''" @click="activeImgIndex = index - 1">
                        <div class="empty">
                          <div>
                            宽度:
                            {{ twoItemWidth }}px
                          </div>
                          <div>高度: {{ data.itemHeight }}px</div>
                        </div>
                      </div>
                    </VanCol>
                  </template>
                </VanRow>
              </template>
              <template v-else-if="data.type === CubePictureEnum['一左二右']">
                <VanRow class="row">
                  <VanCol :span="12">
                    <div class="row-item" :class="activeImgIndex === 0 ? 'active' : ''" style="height: 100%" @click="activeImgIndex = 0">
                      <div class="empty">
                        <div>
                          宽度:
                          {{ twoItemWidth }}px
                        </div>
                        <div>高度: {{ data.itemHeight * 2 + data.itemMargin }}px</div>
                      </div>
                    </div>
                  </VanCol>
                  <VanCol :span="12">
                    <template v-for="index of 2" :key="index">
                      <div class="row-item" :class="activeImgIndex === index ? 'active' : ''" @click="activeImgIndex = index">
                        <div class="empty">
                          <div>
                            宽度:
                            {{ twoItemWidth }}px
                          </div>
                          <div>高度: {{ data.itemHeight }}px</div>
                        </div>
                      </div>
                    </template>
                  </VanCol>
                </VanRow>
              </template>
              <template v-else-if="data.type === CubePictureEnum['一上两下']">
                <div class="row">
                  <div class="row-item" :class="activeImgIndex === 0 ? 'active' : ''" @click="activeImgIndex = 0">
                    <div class="empty">
                      <div>
                        宽度:
                        {{ (750 - (data.marginLR ?? 0) * 2).toFixed() }}px
                      </div>
                      <div>高度: {{ data.itemHeight }}px</div>
                    </div>
                  </div>
                  <VanRow>
                    <template v-for="index of 2" :key="index">
                      <VanCol :span="12">
                        <div class="row-item" :class="activeImgIndex === index ? 'active' : ''" @click="activeImgIndex = index">
                          <div class="empty">
                            <div>
                              宽度:
                              {{ twoItemWidth }}px
                            </div>
                            <div>高度: {{ data.itemHeight }}px</div>
                          </div>
                        </div>
                      </VanCol>
                    </template>
                  </VanRow>
                </div>
              </template>
            </div>
            <div class="item">
              <div class="item-left">
                <CommonSelectImg
                  :key="data.imgList[activeImgIndex].uuid"
                  :src="data.imgList[activeImgIndex].src"
                  @update:src="handleUpdateImgSrc"
                />
              </div>
              <div class="item-right">
                <CommonSelectLink :key="data.imgList[activeImgIndex].uuid" :link="data.imgList[activeImgIndex]" />
              </div>
            </div>
          </CommonCard>
          <CommonCard title="元素设置">
            <CommonCell label="上圆角">
              <CommonNumber :number="data.itemRadiusT" @update:number="data.itemRadiusT = $event" />
            </CommonCell>
            <CommonCell label="下圆角">
              <CommonNumber :number="data.itemRadiusB" @update:number="data.itemRadiusB = $event" />
            </CommonCell>
            <CommonCell label="内间距">
              <CommonNumber :max="20" :number="data.itemMargin" @update:number="data.itemMargin = $event" />
            </CommonCell>
            <CommonCell label="最小组件高度">
              <CommonNumber :max="375" :min="120" :number="data.itemHeight" @update:number="data.itemHeight = $event" />
            </CommonCell>
          </CommonCard>
        </ElTabPane>
        <ElTabPane label="样式设置" name="2">
          <CommonCard><CommonRender /></CommonCard>
        </ElTabPane>
      </ElTabs>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cube-picture-config {
  .container {
    .wrapper {
      margin-top: 20px;
      width: 375px;
      .row {
        width: 100%;
        &-item {
          height: 120px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #fff;
          position: relative;
          &::after {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            border: 1px dashed #c2c2c2;
          }
          &.active {
            &::after {
              border: 1px dashed #409eff;
            }
          }
        }
      }
    }
    .item {
      margin-top: 20px;
      background-color: #f5f7fa;
      border-radius: 4px;
      padding: 10px;
      margin-bottom: 15px;
      position: relative;
      display: flex;
      align-items: center;
      &-right {
        flex: 1;
      }
      &:hover {
        .delete {
          display: block;
        }
      }
    }
  }
}
</style>
