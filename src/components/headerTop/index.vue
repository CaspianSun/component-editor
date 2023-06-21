<script lang="ts" setup>
import type { PageSetup } from '@/store/modules/data'
const props = defineProps<{
  pageSetup: PageSetup
}>()
const { pageSetup } = toRefs(props)
</script>

<template>
  <div class="header-top">
    <img src="@/assets/images/phoneTop.png" />
    <template v-if="pageSetup.tabbarStyle == 1">
      <div class="container">
        <div class="header-title">
          {{ pageSetup.title }}
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.header-top {
  width: 100%;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  position: relative;
  img {
    position: absolute;
    width: 100%;
    height: 88px;
    top: 0;
    z-index: 500;
  }
  .container {
    width: 100%;
    height: 88px;
    padding-top: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    .header-title {
      font-weight: 700;
    }
  }
}
</style>
