<script lang="ts" setup>
const props = defineProps<{
  data: ComponentType<NavigationType>
}>()
const { setStyle } = toRefs(props.data)
</script>

<template>
  <div class="navigation">
    <div
      :style="{
        background: setStyle.bgColor,
        marginTop: setStyle.marginT + 'px',
        marginBottom: setStyle.marginB + 'px',
        marginLeft: setStyle.marginLR + 'px',
        marginRight: setStyle.marginLR + 'px',
        borderRadius: `${setStyle.radiusT}px ${setStyle.radiusT}px ${setStyle.radiusB}px ${setStyle.radiusB}px`
      }"
    >
      <h3 v-if="setStyle.isShowTitle" class="title">
        {{ setStyle.title }}
      </h3>

      <section class="container">
        <div v-if="setStyle.type == 2" class="column">
          <template v-for="(item, index) in setStyle.imageList" :key="index">
            <div class="list">
              <div class="left">
                <VanImage
                  :height="setStyle.iconSize"
                  :round="setStyle.shape == 1"
                  :show-error="false"
                  :show-loading="false"
                  :src="item.src"
                  :style="{
                    backgroundColor: '#f5f7fa',
                    marginRight: '10px'
                  }"
                  :width="setStyle.iconSize"
                />
                <p
                  :style="{
                    color: setStyle.fontColor,
                    'font-size': setStyle.fontSize + 'px',
                    fontWeight: setStyle.isFontBold ? '600' : 'normal'
                  }"
                >
                  {{ item.name }}
                </p>
              </div>
              <div class="right">
                <i class="iconfont iconright1"></i>
              </div>
            </div>
          </template>
        </div>
        <div v-else class="row">
          <template v-for="(item, index) in setStyle.imageList" :key="index">
            <div
              class="list"
              :style="{
                width: (setStyle.colNum == 3 ? '33.33' : setStyle.colNum == 4 ? '25' : '20') + '%'
              }"
            >
              <VanImage
                :height="setStyle.iconSize"
                :round="setStyle.shape == 1"
                :show-error="false"
                :show-loading="false"
                :src="item.src"
                :style="{
                  backgroundColor: '#f5f7fa'
                }"
                :width="setStyle.iconSize"
              />
              <p
                :style="{
                  color: setStyle.fontColor,
                  'font-size': setStyle.fontSize + 'px',
                  fontWeight: setStyle.isFontBold ? '600' : 'normal'
                }"
              >
                {{ item.name }}
              </p>
            </div>
          </template>
        </div>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navigation {
  position: relative;
  z-index: 20;
  .title {
    padding: 10px 0 15px 15px;
    font-size: 15px;
    font-weight: 600;
    color: #333;
    font-family: PingFangSC-Medium, PingFang SC;
  }
  .container {
    .column {
      display: flex;
      flex-direction: column;
      width: 100%;
      .list {
        padding: 10px 15px;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .left {
          display: flex;
          flex-direction: row;
          align-items: center;
          img {
            font-size: 0;
            margin-right: 10px;
          }
        }
        .right {
          color: #999;
        }
      }
    }
    .row {
      padding-bottom: 10px;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      .list {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 9px 0;
        img {
          margin-top: 5px;
        }
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
