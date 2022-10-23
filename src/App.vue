<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

// Change theme theme
// document.documentElement.setAttribute('data-theme', 'white')
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/charts">Charts</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
