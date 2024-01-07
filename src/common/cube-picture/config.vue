<script lang="ts" setup>
import { toRefs, computed, ref } from 'vue'
import { CubePictureEnum } from '../../enum/index'
import { CommonConfig } from '../../components/CommonConfig'
import { SliderNumber } from '../../components/SliderNumber'
import UploadImg from '/@/components/UploadImg/index.vue'
import { Row, Col } from 'vant'
import { LinkSelect } from '../../components/LinkSelect'
import { ElRadioGroup, ElRadio, ElForm, ElFormItem } from 'element-plus'

const props = defineProps<{
  data: CubePicture
}>()
const typeLength = Object.keys(CubePictureEnum).length / 2
const { data } = toRefs(props)

const twoItemWidth = computed(() => {
  return ((750 - data.value.itemMargin) / 2 - ((data.value.marginL || 0) + (data.value.marginR || 0))).toFixed()
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
  <CommonConfig title="图片魔方" :data="data" :common-list="['marginT', 'marginB', 'marginL', 'marginR']">
    <h4>组件设置</h4>
    <ElRadioGroup v-model="data.type" @change="handleChangeType">
      <template v-for="index of typeLength" :key="index">
        <ElRadio :label="index - 1">{{ CubePictureEnum[index - 1] }}</ElRadio>
      </template>
    </ElRadioGroup>
    <div class="wrapper">
      <template v-if="data.type <= CubePictureEnum['一行四个']">
        <Row class="row">
          <template v-for="index of data.type + 2" :key="index">
            <Col :span="24 / (data.type + 2)">
              <div class="row-item" :class="activeImgIndex === index - 1 ? 'active' : ''" @click="activeImgIndex = index - 1">
                <div class="empty">
                  <div>
                    宽度:
                    {{
                      ((750 - data.itemMargin * (data.type + 1)) / (data.type + 2) - ((data.marginL || 0) + (data.marginR || 0))).toFixed()
                    }}px
                  </div>
                  <div>高度: {{ data.itemHeight }}px</div>
                </div>
              </div>
            </Col>
          </template>
        </Row>
      </template>
      <template v-else-if="data.type === CubePictureEnum['二左二右']">
        <Row class="row">
          <template v-for="index of 4" :key="index">
            <Col :span="12">
              <div class="row-item" :class="activeImgIndex === index - 1 ? 'active' : ''" @click="activeImgIndex = index - 1">
                <div class="empty">
                  <div>
                    宽度:
                    {{ twoItemWidth }}px
                  </div>
                  <div>高度: {{ data.itemHeight }}px</div>
                </div>
              </div>
            </Col>
          </template>
        </Row>
      </template>
      <template v-else-if="data.type === CubePictureEnum['一左二右']">
        <Row class="row">
          <Col :span="12">
            <div class="row-item" :class="activeImgIndex === 0 ? 'active' : ''" style="height: 100%" @click="activeImgIndex = 0">
              <div class="empty">
                <div>
                  宽度:
                  {{ twoItemWidth }}px
                </div>
                <div>高度: {{ data.itemHeight * 2 + data.itemMargin }}px</div>
              </div>
            </div>
          </Col>
          <Col :span="12">
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
          </Col>
        </Row>
      </template>
      <template v-else-if="data.type === CubePictureEnum['一上两下']">
        <div class="row">
          <div class="row-item" :class="activeImgIndex === 0 ? 'active' : ''" @click="activeImgIndex = 0">
            <div class="empty">
              <div>
                宽度:
                {{ (750 - (data.marginL || 0) + (data.marginR || 0)).toFixed() }}px
              </div>
              <div>高度: {{ data.itemHeight }}px</div>
            </div>
          </div>
          <Row>
            <template v-for="index of 2" :key="index">
              <Col :span="12">
                <div class="row-item" :class="activeImgIndex === index ? 'active' : ''" @click="activeImgIndex = index">
                  <div class="empty">
                    <div>
                      宽度:
                      {{ twoItemWidth }}px
                    </div>
                    <div>高度: {{ data.itemHeight }}px</div>
                  </div>
                </div>
              </Col>
            </template>
          </Row>
        </div>
      </template>
    </div>
    <div class="item">
      <div class="item-left">
        <UploadImg
          :width="100"
          :height="100"
          background-color="#fff"
          :photo="data.imgList[activeImgIndex].src"
          @set-picture="handleUpdateImgSrc"
          @del-picture="data.imgList[activeImgIndex].src = ''"
        />
      </div>
      <div class="item-right">
        <LinkSelect v-model="data.imgList[activeImgIndex].link" />
      </div>
    </div>
    <h4>元素设置</h4>
    <ElForm>
      <ElFormItem label="上圆角">
        <SliderNumber :max="20" :number="data.itemRadiusT" @update:number="data.itemRadiusT = $event" />
      </ElFormItem>
      <ElFormItem label="下圆角">
        <SliderNumber :max="20" :number="data.itemRadiusB" @update:number="data.itemRadiusB = $event" />
      </ElFormItem>
      <ElFormItem label="内间距">
        <SliderNumber :max="20" :number="data.itemMargin" @update:number="data.itemMargin = $event" />
      </ElFormItem>
      <ElFormItem label="最小组件高度">
        <SliderNumber :max="375" :min="120" :number="data.itemHeight" @update:number="data.itemHeight = $event" />
      </ElFormItem>
    </ElForm>
  </CommonConfig>
</template>

<style lang="scss" scoped>
.wrapper {
  .row {
    width: 100%;
    .row-item {
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
  .item-right {
    flex: 1;
    margin-left: 10px;
  }
  &:hover {
    .delete {
      display: block;
    }
  }
}
</style>
