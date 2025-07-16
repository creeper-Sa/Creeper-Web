<template>
  <transition name="fade" mode="out-in">
    <router-view />
  </transition>
</template>

<script lang="ts" setup>

</script>

<style>
/* 页面淡入淡出动画 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
/* 全局背景色*/
body, html, #app {
  height: 100%;
  margin: 0;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #fff;
}


/* 可选：给背景统一样式 */
body, html, #app {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: #f5f7fa;
}
</style>
