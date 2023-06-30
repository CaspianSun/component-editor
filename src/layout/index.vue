<template>
  <div class="layout">
    <section class="container">
      <RouterView></RouterView>
    </section>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  .container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
  }
}
</style>
