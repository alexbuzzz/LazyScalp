<script lang="ts" setup>
import IconCards from '../icons/IconCards.vue'
import IconChart from '../icons/IconChart.vue'
import IconHome from '../icons/IconHome.vue'
import IconBookmarks from '../icons/IconBookmarks.vue'
import IconSettings from '../icons/IconSettings.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <aside>
    <div class="menu">
      <router-link class="menu-item" to="/">
        <span><IconHome /></span>
      </router-link>

      <router-link class="menu-item" to="/cards">
        <span><IconCards /></span>
      </router-link>

      <router-link class="menu-item" to="/charts">
        <span><IconChart /></span>
      </router-link>

      <router-link class="menu-item" to="/favorites">
        <span><IconBookmarks /></span>
      </router-link>

      <router-link class="menu-item" to="/settings">
        <span><IconSettings /></span>
      </router-link>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
.menu {
  min-width: 60px;
  min-height: 100vh;
  padding: 0.75rem;
}
.menu-item {
  color: var(--text-color);
  display: flex;
  align-items: center;
  text-decoration: none;
  height: 45px;

  span {
    transform: scale(0.8);
  }

  &:hover {
    color: var(--text-hover-color);
  }

  &.router-link-active {
    transition: 0.2s ease-out;
    color: var(--active-color);
  }
}
</style>
