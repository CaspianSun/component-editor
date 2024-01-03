<script lang="ts" setup>
import { toRefs } from 'vue'
import { Row, Col, Button, Icon } from 'vant'
import { generateStyleObject } from '../style'
const props = defineProps<{
  data: Asset
}>()
const { data } = toRefs(props)
</script>

<template>
  <div class="wrapper">
    <div :style="generateStyleObject(data)">
      <Row class="row" gutter="10">
        <template v-for="(item, index) in data.itemList" :key="index">
          <Col :span="12">
            <div
              class="item"
              :style="{
                background: data.bgColor || '#fff',
                borderRadius: `${data.radiusT}px ${data.radiusT}px ${data.radiusB}px ${data.radiusB}px`,
                marginBottom:
                  data.itemList.length % 2 == 0
                    ? index < data.itemList.length - 2
                      ? '10px'
                      : '0'
                    : index < data.itemList.length - 1
                      ? '10px'
                      : '0',
              }"
            >
              <div class="item-top">
                <div class="item-top-num">
                  <span style="font-size: 30px; font-weight: 500">0</span>
                  {{ item.unit }}
                </div>
                <div v-if="item.unit == '元'" class="item-top-btn">
                  <Button
                    round
                    size="small"
                    :style="{
                      height: '28px',
                      backgroundColor: data.btnBgColor,
                      color: data.btnTextColor,
                    }"
                  >
                    <span :style="{ color: data.btnTextColor }">充值</span>
                  </Button>
                </div>
              </div>
              <div class="item-bottom">
                <span
                  :style="{
                    color: '#666666',
                    'font-size': data.fontSize + 'px',
                    fontWeight: '400',
                  }"
                >
                  {{ item.name }}
                </span>
                <Icon color="#666666" name="arrow" style="margin-top: 1px; margin-left: 2px"></Icon>
              </div>
            </div>
          </Col>
        </template>
      </Row>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  overflow: hidden;
  position: relative;
  z-index: 10;
  .row {
    .item {
      padding: 15px 10px 15px 15px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      &-top {
        align-items: center;
        display: flex;
        justify-content: space-between;
      }
      &-bottom {
        margin-top: 5px;
        width: 100%;
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
