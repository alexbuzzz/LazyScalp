<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Sidebar from './components/general/Sidebar.vue'
</script>

<template>
  <div class="main-wrap">
    <Sidebar />
    <RouterView class="router-wrap" />
  </div>
</template>
<style lang="scss">
.main-wrap {
  display: flex;
}

// .router-wrap {
//   width: 100%;
//   padding: 0.5rem 0.5rem 0.5rem 0;
// }
</style>
