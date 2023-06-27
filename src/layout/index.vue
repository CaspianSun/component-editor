<template>
  <div class="layout">
    <section class="subject">
      <router-view v-slot="{ Component }">
        <transition name="layoutFade">
          <component :is="Component" />
        </transition>
      </router-view>
    </section>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  .subject {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
  }
}
</style>
