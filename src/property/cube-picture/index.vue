<script lang="ts" setup>
import { CubePictureEnum } from '@/componentProperty'
const props = defineProps<{
  data: CubePicture
}>()
const { data } = toRefs(props)
const itemBorderRadius = computed(() => {
  return `${data.value.itemRadiusT}px ${data.value.itemRadiusT}px ${data.value.itemRadiusB}px ${data.value.itemRadiusB}px`
})
const twoItemWidth = computed(() => {
  return ((750 - data.value.itemMargin) / 2 - (data.value.marginLR ?? 0) * 2).toFixed()
})
</script>

<template>
  <div class="cube-picture">
    <div
      class="container"
      :style="{
        marginTop: data.marginT + 'px',
        marginBottom: data.marginB + 'px',
        marginLeft: data.marginLR + 'px',
        marginRight: data.marginLR + 'px',
        borderRadius: `${data.radiusT}px ${data.radiusT}px ${data.radiusB}px ${data.radiusB}px`
      }"
    >
      <template v-if="data.type <= CubePictureEnum['一行四个']">
        <VanRow class="row" :gutter="data.itemMargin">
          <template v-for="index of data.type + 2" :key="index">
            <VanCol :span="24 / (data.type + 2)">
              <div
                class="row-item"
                :style="{
                  height: data.itemHeight + 'px',
                  borderRadius: itemBorderRadius
                }"
              >
                <template v-if="data.imgList[index - 1].src">
                  <VanImage
                    fit="cover"
                    :src="data.imgList[index - 1].src"
                    style="width: 100%; height: 100%"
                  />
                </template>
                <template v-else>
                  <div class="empty">
                    <div>
                      宽度:
                      {{
                        (
                          (750 - data.itemMargin * (data.type + 1)) / (data.type + 2) -
                          (data.marginLR ?? 0) * 2
                        ).toFixed()
                      }}px
                    </div>
                    <div>高度: {{ data.itemHeight }}px</div>
                  </div>
                </template>
              </div>
            </VanCol>
          </template>
        </VanRow>
      </template>
      <template v-else-if="data.type === CubePictureEnum['二左二右']">
        <VanRow class="row" :gutter="data.itemMargin">
          <template v-for="index of 4" :key="index">
            <VanCol :span="12">
              <div
                class="row-item"
                :style="{
                  height: data.itemHeight + 'px',
                  marginBottom: index < 3 ? data.itemMargin + 'px' : 0,
                  borderRadius: itemBorderRadius
                }"
              >
                <template v-if="data.imgList[index - 1].src">
                  <VanImage
                    fit="cover"
                    :src="data.imgList[index - 1].src"
                    style="width: 100%; height: 100%"
                  />
                </template>
                <template v-else>
                  <div class="empty">
                    <div>
                      宽度:
                      {{ twoItemWidth }}px
                    </div>
                    <div>高度: {{ data.itemHeight }}px</div>
                  </div>
                </template>
              </div>
            </VanCol>
          </template>
        </VanRow>
      </template>
      <template v-else-if="data.type === CubePictureEnum['一左二右']">
        <VanRow class="row" :gutter="data.itemMargin">
          <VanCol :span="12">
            <div
              class="row-item"
              style="height: 100%"
              :style="{
                borderRadius: itemBorderRadius
              }"
            >
              <template v-if="data.imgList[0].src">
                <VanImage
                  fit="cover"
                  :src="data.imgList[0].src"
                  style="width: 100%; height: 100%"
                />
              </template>
              <template v-else>
                <div class="empty">
                  <div>
                    宽度:
                    {{ twoItemWidth }}px
                  </div>
                  <div>高度: {{ data.itemHeight * 2 + data.itemMargin }}px</div>
                </div>
              </template>
            </div>
          </VanCol>
          <VanCol :span="12">
            <template v-for="index of 2" :key="index">
              <div
                class="row-item"
                :style="{
                  height: data.itemHeight + 'px',
                  marginBottom: index == 1 ? data.itemMargin + 'px' : 0,
                  borderRadius: itemBorderRadius
                }"
              >
                <template v-if="data.imgList[index].src">
                  <VanImage
                    fit="cover"
                    :src="data.imgList[0].src"
                    style="width: 100%; height: 100%"
                  />
                </template>
                <template v-else>
                  <div class="empty">
                    <div>
                      宽度:
                      {{ twoItemWidth }}px
                    </div>
                    <div>高度: {{ data.itemHeight }}px</div>
                  </div>
                </template>
              </div>
            </template>
          </VanCol>
        </VanRow>
      </template>
      <template v-else-if="data.type === CubePictureEnum['一上两下']">
        <div class="row">
          <div
            class="row-item"
            :style="{
              height: data.itemHeight + 'px',
              marginBottom: data.itemMargin + 'px',
              borderRadius: itemBorderRadius
            }"
          >
            <template v-if="data.imgList[0].src">
              <VanImage fit="cover" :src="data.imgList[0].src" style="width: 100%; height: 100%" />
            </template>
            <template v-else>
              <div class="empty">
                <div>
                  宽度:
                  {{ (750 - (data.marginLR ?? 0) * 2).toFixed() }}px
                </div>
                <div>高度: {{ data.itemHeight }}px</div>
              </div>
            </template>
          </div>
          <VanRow :gutter="data.itemMargin">
            <template v-for="index of 2" :key="index">
              <VanCol :span="12">
                <div
                  class="row-item"
                  :style="{
                    height: data.itemHeight + 'px',
                    borderRadius: itemBorderRadius
                  }"
                >
                  <template v-if="data.imgList[index].src">
                    <VanImage
                      fit="cover"
                      :src="data.imgList[0].src"
                      style="width: 100%; height: 100%"
                    />
                  </template>
                  <template v-else>
                    <div class="empty">
                      <div>
                        宽度:
                        {{ twoItemWidth }}px
                      </div>
                      <div>高度: {{ data.itemHeight }}px</div>
                    </div>
                  </template>
                </div>
              </VanCol>
            </template>
          </VanRow>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cube-picture {
  .container {
    overflow: hidden;
    .row {
      width: 100%;
      &-item {
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
          border: 1px dashed #efefef;
        }
      }
    }
  }
}
</style>
