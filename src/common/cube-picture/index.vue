<script lang="ts" setup>
import { toRefs, computed } from 'vue'
import { CubePictureEnum } from '../../enum/index'
import { Row, Col, Image } from 'vant'
const props = defineProps<{
  data: CubePicture
}>()
const { data } = toRefs(props)
const itemBorderRadius = computed(() => {
  return `${data.value.itemRadiusT}px ${data.value.itemRadiusT}px ${data.value.itemRadiusB}px ${data.value.itemRadiusB}px`
})
const twoItemWidth = computed(() => {
  return ((750 - data.value.itemMargin) / 2 - (data.value.marginL || 0) + (data.value.marginR || 0)).toFixed()
})
</script>

<template>
  <div class="cube-picture">
    <div
      class="wrapper"
      :style="{
        marginTop: data.marginT + 'px',
        marginBottom: data.marginB + 'px',
        marginLeft: data.marginL + 'px',
        marginRight: data.marginR + 'px',
      }"
    >
      <template v-if="data.type <= CubePictureEnum['一行四个']">
        <Row class="row" :gutter="data.itemMargin">
          <template v-for="index of data.type + 2" :key="index">
            <Col :span="24 / (data.type + 2)">
              <div
                class="row-item"
                :style="{
                  height: data.itemHeight + 'px',
                  borderRadius: itemBorderRadius,
                }"
              >
                <template v-if="data.imgList[index - 1].src">
                  <Image fit="cover" :src="data.imgList[index - 1].src" style="width: 100%; height: 100%" />
                </template>
                <template v-else>
                  <div class="empty">
                    <div>
                      宽度:
                      {{
                        ((750 - data.itemMargin * (data.type + 1)) / (data.type + 2) - (data.marginL || 0) * (data.marginR || 0)).toFixed()
                      }}px
                    </div>
                    <div>高度: {{ data.itemHeight }}px</div>
                  </div>
                </template>
              </div>
            </Col>
          </template>
        </Row>
      </template>
      <template v-else-if="data.type === CubePictureEnum['二左二右']">
        <Row class="row" :gutter="data.itemMargin">
          <template v-for="index of 4" :key="index">
            <Col :span="12">
              <div
                class="row-item"
                :style="{
                  height: data.itemHeight + 'px',
                  marginBottom: index < 3 ? data.itemMargin + 'px' : 0,
                  borderRadius: itemBorderRadius,
                }"
              >
                <template v-if="data.imgList[index - 1].src">
                  <Image fit="cover" :src="data.imgList[index - 1].src" style="width: 100%; height: 100%" />
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
            </Col>
          </template>
        </Row>
      </template>
      <template v-else-if="data.type === CubePictureEnum['一左二右']">
        <Row class="row" :gutter="data.itemMargin">
          <Col :span="12">
            <div
              class="row-item"
              style="height: 100%"
              :style="{
                borderRadius: itemBorderRadius,
              }"
            >
              <template v-if="data.imgList[0].src">
                <Image fit="cover" :src="data.imgList[0].src" style="width: 100%; height: 100%" />
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
          </Col>
          <Col :span="12">
            <template v-for="index of 2" :key="index">
              <div
                class="row-item"
                :style="{
                  height: data.itemHeight + 'px',
                  marginBottom: index == 1 ? data.itemMargin + 'px' : 0,
                  borderRadius: itemBorderRadius,
                }"
              >
                <template v-if="data.imgList[index].src">
                  <Image fit="cover" :src="data.imgList[0].src" style="width: 100%; height: 100%" />
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
          </Col>
        </Row>
      </template>
      <template v-else-if="data.type === CubePictureEnum['一上两下']">
        <div class="row">
          <div
            class="row-item"
            :style="{
              height: data.itemHeight + 'px',
              marginBottom: data.itemMargin + 'px',
              borderRadius: itemBorderRadius,
            }"
          >
            <template v-if="data.imgList[0].src">
              <Image fit="cover" :src="data.imgList[0].src" style="width: 100%; height: 100%" />
            </template>
            <template v-else>
              <div class="empty">
                <div>
                  宽度:
                  {{ (750 - (data.marginL || 0) * (data.marginR || 0)).toFixed() }}px
                </div>
                <div>高度: {{ data.itemHeight }}px</div>
              </div>
            </template>
          </div>
          <Row :gutter="data.itemMargin">
            <template v-for="index of 2" :key="index">
              <Col :span="12">
                <div
                  class="row-item"
                  :style="{
                    height: data.itemHeight + 'px',
                    borderRadius: itemBorderRadius,
                  }"
                >
                  <template v-if="data.imgList[index].src">
                    <Image fit="cover" :src="data.imgList[0].src" style="width: 100%; height: 100%" />
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
              </Col>
            </template>
          </Row>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cube-picture {
  position: relative;
  z-index: 10;
  .wrapper {
    overflow: hidden;
    .row {
      width: 100%;
      &-item {
        overflow: hidden;
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
