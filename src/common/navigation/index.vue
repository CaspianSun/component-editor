<script lang="ts" setup>
import { toRefs } from 'vue'
const props = defineProps<{
  data: Navigation
}>()
const { data } = toRefs(props)
</script>

<template>
  <div class="navigation">
    <div
      class="container"
      :style="{
        background: data.bgColor,
        marginTop: data.marginT + 'px',
        marginBottom: data.marginB + 'px',
        marginLeft: data.marginLR + 'px',
        marginRight: data.marginLR + 'px',
        borderRadius: `${data.radiusT}px ${data.radiusT}px ${data.radiusB}px ${data.radiusB}px`,
      }"
    >
      <div v-if="data.isShowTitle" class="title" :style="{ fontSize: data.titleSize + 'px', color: data.titleColor }">
        {{ data.title }}
      </div>

      <div>
        <div v-if="data.type == 2" class="column">
          <template v-for="(item, index) in data.imgList" :key="index">
            <div
              class="list"
              :style="{
                borderBottom: data.isShowBorderBottom ? '1px solid #f5f7fa' : 'none',
              }"
            >
              <div class="left">
                <template v-if="data.isShowIcon">
                  <VanImage
                    :height="data.iconSize"
                    :show-error="false"
                    :show-loading="false"
                    :src="item.src"
                    :style="{
                      backgroundColor: '#f5f7fa',
                      marginRight: '10px',
                      borderRadius: data.iconRadius + 'px',
                      overflow: 'hidden',
                    }"
                    :width="data.iconSize"
                  />
                </template>
                <span
                  :style="{
                    color: data.fontColor,
                    'font-size': data.fontSize + 'px',
                    fontWeight: data.isFontBold ? '600' : 'normal',
                  }"
                >
                  {{ item.name }}
                </span>
              </div>
              <div class="right">
                <i class="iconfont iconright1"></i>
              </div>
            </div>
          </template>
        </div>
        <div v-else class="row">
          <template v-for="(item, index) in data.imgList" :key="index">
            <div
              class="list"
              :style="{
                width: (data.colNum == 3 ? '33.33' : data.colNum == 4 ? '25' : '20') + '%',
              }"
            >
              <VanImage
                :height="data.iconSize"
                :show-error="false"
                :show-loading="false"
                :src="item.src"
                :style="{
                  backgroundColor: '#f5f7fa',
                  borderRadius: data.iconRadius + 'px',
                  overflow: 'hidden',
                }"
                :width="data.iconSize"
              />
              <span
                :style="{
                  color: data.fontColor,
                  'font-size': data.fontSize + 'px',
                  fontWeight: data.isFontBold ? '600' : 'normal',
                }"
              >
                {{ item.name }}
              </span>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navigation {
  position: relative;
  z-index: 10;
  .container {
    .title {
      padding: 10px 15px 0;
      font-size: 15px;
      font-weight: 600;
      color: #333;
      font-family:
        PingFangSC-Medium,
        PingFang SC;
    }
    .column {
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 10px 15px;

      .list {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
        .left {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .right {
          color: #999;
        }
        &:last-child {
          border-bottom: none !important;
        }
      }
    }
    .row {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      padding: 0 0 15px 0;
      van-icon {
        margin-bottom: 5px;
      }
      .list {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 15px 0 0;
        p {
          font-size: 12px;
          margin-top: 5px;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: center;
          box-sizing: border-box;
        }
      }
    }
  }
}
</style>
