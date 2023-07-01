<script lang="ts" setup>
import { LinkEnum } from '@/componentProperty'
const dialogVisible = ref(false)

const baseLink = reactive<{ title: string; item: LinkItem[] }[]>([
  {
    title: '店铺页面',
    item: [
      { name: '门店首页', pagePath: '/pages/index/index' },
      { name: '点单页', pagePath: '/pages/order/index' },
      { name: '自取点单', pagePath: '/pages/order/index' },
      { name: '外卖点单', pagePath: '/pages/order/index?scene=2' },
      { name: '个人中心', pagePath: '/pages/center/index' },
      { name: '我的订单', pagePath: '/pages/orderForm/index' },
      { name: '我的优惠券', pagePath: '/pages/coupon/index' },
      { name: '我的地址', pagePath: '/pages/center/address' },
      { name: '编辑资料', pagePath: '/pages/center/infoEdit' },
      { name: '联系客服', pagePath: '/pages/service/index' },
      { name: '关于我们', pagePath: '/pages/about/index' }
    ]
  },
  {
    title: '营销页面',
    item: [
      { name: '签到中心', pagePath: '/pages/center/sigin' },
      { name: '积分中心', pagePath: '/pages/integral/index' },
      { name: '积分商城', pagePath: '/pages/integral/mall' },
      { name: '余额', pagePath: '/pages/balance/index' },
      { name: '会员中心', pagePath: '/pages/membership/index' },
      { name: '充值中心', pagePath: '/pages/balance/recharge' }
    ]
  }
])
const handleChangeType = (val: string) => {
  activeType.value = +val
}
const activeType = ref<LinkEnum>(1)

export interface LinkItem {
  name: string
  pagePath: string
}

export interface CallbackLinkItem extends LinkItem {
  type: LinkEnum
}

export type callbackType = (item: CallbackLinkItem) => void

let callbackFun: callbackType | null = null

export type initSelectLinkType = (callback: callbackType) => void

const initSelectLink = (callback: callbackType) => {
  callbackFun = callback
  dialogVisible.value = true
}

const handleSelectLink = (item: LinkItem) => {
  if (callbackFun) {
    callbackFun({ ...item, type: activeType.value })
  }
  dialogVisible.value = false
}

const handleClickClose = () => {
  activeType.value = 1
  dialogVisible.value = false
}

defineExpose({
  initSelectLink
})
</script>

<template>
  <ElDialog
    v-model="dialogVisible"
    append-to-body
    :close-on-click-modal="false"
    lock-scroll
    title="选择链接"
    width="1000px"
    @close="handleClickClose"
  >
    <ElRow class="row">
      <ElCol class="left" :span="6">
        <common-card :border-bottom="false" title="分类">
          <ElMenu :default-active="`${activeType}`" @select="handleChangeType">
            <ElMenuItem index="1">基础页面</ElMenuItem>
            <!-- TODO 自定义页面 -->
          </ElMenu>
        </common-card>
      </ElCol>
      <ElCol class="right" :span="18">
        <template v-if="activeType === 1">
          <template v-for="(group, index) in baseLink" :key="index">
            <common-card :border-bottom="false" :title="group.title">
              <div class="base-list">
                <template v-for="link in group.item" :key="link.url">
                  <ElButton plain @click="handleSelectLink(link)">
                    {{ link.name }}
                  </ElButton>
                </template>
              </div>
            </common-card>
          </template>
        </template>
      </ElCol>
    </ElRow>
  </ElDialog>
</template>

<style lang="scss" scoped>
.row {
  min-height: 600px;
  border: 1px solid #eee;
  .left {
    border-right: 1px solid #eee;

    .el-menu {
      height: 100%;
      border-right: none;
      width: 165px;
      .el-menu-item,
      .el-submenu__title {
        margin-bottom: 10px;
        width: 127px;
        height: 36px;
        border-radius: 5px;
        &.is-active {
          color: #409eff !important;
          background: #c3e1fe !important;
        }
      }
    }
  }
  .right {
    .common-card + .common-card {
      margin-top: -20px;
    }
    .base-list {
      display: flex;
      flex-wrap: wrap;
    }
    .el-button {
      height: 40px;
      width: 90px;
      margin-right: 10px;
      margin-bottom: 10px;
      & + .el-button {
        margin-left: 0;
      }
    }
  }
}
</style>
