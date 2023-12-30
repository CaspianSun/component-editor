<script lang="ts" setup>
import { toRefs } from 'vue'
const props = defineProps<{
  data: User
}>()
const { data } = toRefs(props)
const property = [
  {
    text: '优惠卷',
    type: 'coupon',
  },
  {
    text: '余额',
    type: 'balance',
  },
  {
    text: '积分',
    type: 'integral',
  },
]
</script>

<template>
  <div class="user">
    <div
      class="container"
      :style="{
        marginBottom: data.marginB + 'px',
        marginLeft: data.marginLR + 'px',
        marginRight: data.marginLR + 'px',
      }"
    >
      <div
        class="bg"
        :style="{
          backgroundColor: data.bgImg ? '' : data.bgColor,
          marginLeft: '-' + data.marginLR + 'px',
          marginRight: '-' + data.marginLR + 'px',
        }"
      >
        <img v-if="data.bgImg" class="img" :src="data.bgImg" />
      </div>
      <div
        class="box"
        :style="{
          borderRadius: `${data.radiusT}px ${data.radiusT}px ${data.radiusB}px ${data.radiusB}px`,
        }"
      >
        <div class="box-left">
          <VanIcon name="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" size="55" />
        </div>
        <div class="box-right">
          <div class="box-right-top">
            <div class="info">
              <div class="name">用户昵称</div>
              <div class="vip">
                <view>开通会员享受更多权益,点击开通</view>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="property"
        :style="{
          marginTop: data.spacing + 'px',
          borderRadius: `${data.radiusT}px ${data.radiusT}px ${data.radiusB}px ${data.radiusB}px`,
        }"
      >
        <template v-for="item in property" :key="item.type">
          <div class="item">
            <div
              class="number"
              :style="{
                color: data.numColor,
                fontSize: data.numSize + 'px',
              }"
            >
              <template v-if="item.type == 'coupon'">{{ '-' }}</template>
              <template v-if="item.type == 'balance'">{{ '10' }}</template>
              <template v-if="item.type == 'integral'">{{ '20' }}</template>
            </div>
            <div
              class="text"
              :style="{
                color: data.textColor,
                fontSize: data.textSize + 'px',
              }"
            >
              {{ item.text }}
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user {
  position: relative;
  z-index: 10;
  .container {
    .bg {
      height: 200px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      .img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }
    .box {
      position: relative;
      z-index: 100;
      margin-top: -45px;
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
          .vip {
            margin-top: 4px;
            font-size: 12px;
            color: #666666;
          }
          .qr-code {
            display: flex;
            flex-direction: column;
            align-items: center;
            .text {
              font-size: 12px;
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
    .property {
      position: relative;
      z-index: 100;
      padding: 10px 15px;
      width: 100%;
      height: 100px;
      display: flex;
      background-color: #fff;
      .item {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .number {
          font-size: 18px;
          font-weight: 600;
          color: #f1cd60;
        }
        .text {
          font-size: 14px;
          margin-top: 4px;
          color: #666666;
        }
      }
    }
  }
}
</style>
