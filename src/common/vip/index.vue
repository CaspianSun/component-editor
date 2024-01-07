<script lang="ts" setup>
import { toRefs } from 'vue'
import { Icon, Progress } from 'vant'
import { generateStyleObject } from '../style'

const props = defineProps<{
  data: Vip
}>()
const { data } = toRefs(props)
</script>

<template>
  <div class="wrapper">
    <div :style="generateStyleObject(data)" style="overflow: hidden">
      <div class="row">
        <div class="row-left">
          <Icon name="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" size="55" />
        </div>
        <div class="row-right">
          <div class="row-right-top">
            <div class="info">
              <div class="name">
                Hi,用户昵称
                <span class="level">lv1</span>
              </div>
              <div class="property">
                <div v-for="(item, index) in data.propertyArr" v-show="item.checked" :key="index" class="property-item">
                  <span
                    :style="{
                      color: data.propertyTextColor,
                    }"
                  >
                    {{ item.name }}：
                  </span>
                  <span
                    :style="{
                      color: data.propertyNumberColor,
                    }"
                  >
                    99
                  </span>
                </div>
              </div>
            </div>
            <div class="qrcode">
              <Icon name="qr" size="35" />
              <div class="text">会员码</div>
            </div>
          </div>
          <div class="row-right-bottom">
            <div class="exp">
              <Progress :percentage="50" :show-pivot="false" style="width: 100px; margin-right: 5px" />
              <span style="display: inline-block">500/1000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  z-index: 10;
  overflow: hidden;
  .row {
    padding: 10px 15px;
    width: 100%;
    height: 100px;
    display: flex;
    background-color: #fff;
    &-left {
      margin-right: 10px;
      width: 60px;
      display: flex;
      align-items: center;
    }
    &-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      &-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .name {
          font-size: 16px;
          font-weight: 600;
          .level {
            padding: 0 6px;
            font-size: 10px;
            margin-left: 10px;
            font-weight: 400;
            background-color: #f1cd60;
            border-radius: 5px 5px 5px 2px;
          }
        }
        .property {
          font-size: 12px;
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          &-item {
            margin-right: 20px;
          }
        }
        .qrcode {
          display: flex;
          flex-direction: column;
          align-items: center;
          .text {
            font-size: 10px;
            color: #666666;
          }
        }
      }
      &-bottom {
        .exp {
          font-size: 10px;
          display: flex;
          align-items: center;
        }
      }
    }
  }
}
</style>
