<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import ModalWorkspace from './components/general/ModalWorkspace.vue'
import Sidebar from './components/general/Sidebar.vue'
</script>

<template>
  <div class="main-wrap">
    <Sidebar />
    <ModalWorkspace />
    <RouterView />
  </div>
</template>
<style lang="scss">
.main-wrap {
  display: flex;
}
</style>
