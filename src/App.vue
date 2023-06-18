<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script lang="ts" setup>
const isRouterAlive = ref(true)

const reload = () => {
  isRouterAlive.value = false
  nextTick(() => {
    isRouterAlive.value = true
  })
}

provide('reload', reload)
</script>

<style lang="scss">
#app {
  position: absolute;
  left: 0;
  top: 0;
}
</style>
