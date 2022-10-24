<script lang="ts" setup>
import IconCards from '../icons/IconCards.vue'
import IconChart from '../icons/IconChart.vue'
import IconHome from '../icons/IconHome.vue'
import IconBookmarks from '../icons/IconBookmarks.vue'
import IconSettings from '../icons/IconSettings.vue'
</script>

<template>
  <el-menu
    background-color="--bg-color"
    text-color="--text-color"
    active-text-color="#47c173"
    default-active="/"
    class="el-menu-vertical"
    :collapse="true"
    router="true"
  >
    <el-menu-item class="menu-item" index="/">
      <span><IconHome /></span>
      <template #title>Home</template>
    </el-menu-item>

    <el-menu-item index="cards">
      <span><IconCards /></span>
      <template #title>Cards</template>
    </el-menu-item>

    <el-menu-item index="charts">
      <span><IconChart /></span>
      <template #title>Charts</template>
    </el-menu-item>

    <el-menu-item index="bookmarks">
      <span><IconBookmarks /></span>
      <template #title>Bookmarks</template>
    </el-menu-item>

    <el-menu-item index="settings">
      <span><IconSettings /></span>
      <template #title>Settings</template>
    </el-menu-item>
  </el-menu>
</template>

<style lang="scss" scoped>
.el-menu-vertical {
  min-width: 60px;
  min-height: 100vh;
  border: none;
}
.el-menu-item {
  // color: var(--text-color);
  background-color: var(--bg-color);
  height: 45px;

  span {
    margin-left: -8px;
    transform: scale(0.8);
  }

  &:hover {
    color: var(--active-color);
  }
}
</style>
