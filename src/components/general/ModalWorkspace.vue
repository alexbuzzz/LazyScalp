<script lang="ts" setup>
import Chart from '../charts/Chart.vue'
import store from '../../store'
</script>

<template>
  <teleport to="#app">
    <div
      class="modal-workspace"
      v-if="store.state.isWorkspaceOpen"
      @keydown.esc="store.state.isWorkspaceOpen = false"
      tabindex="0"
    >
      <!-- Main container -->
      <div class="content-container">
        <!-- Top bar -->
        <div class="top-bar">
          <!-- Close button -->
          <button
            class="close-button"
            @click="store.state.isWorkspaceOpen = false"
          >
            <span class="material-icons">close</span>
            Close
          </button>
        </div>

        <div class="charts-container">
          <!-- Chart 1 -->
          <div class="chart">1</div>
          <!-- Chart 2 -->
          <div class="chart">2</div>

          <!-- Chart 3 -->
          <div class="chart">3</div>

          <!-- Chart 4 -->
          <div class="chart">4</div>
        </div>
      </div>
      <!-- Sidebar -->
      <div class="sidebar">{{ store.state.workspaceTicker }}</div>
    </div>
  </teleport>
</template>

<style lang="scss" scoped>
.modal-workspace {
  margin: 0;
  padding: 0;
  position: fixed;
  background-color: var(--bg-color);
  width: 100%;
  height: 100%;
  z-index: 100;
  margin: 0 auto;
  overflow: scroll;

  display: flex;
  justify-content: space-between;

  // Sidebar
  .sidebar {
    border-left: 2px solid gray;
    margin-left: -2px;
    // background-color: var(--dark);
    justify-self: end;
    width: 350px;
    // height: 98vh;
  }

  .content-container {
    width: 100%;
    .top-bar {
      // border: 1px solid grey;
      width: 100%;

      .close-button {
        background: none;

        padding: 1rem;

        &:hover {
          background-color: var(--text-color);
        }
      }
    }
    // Charts
    .charts-container {
      width: 100%;
      height: calc(100% - 100px);
      display: flex;
      flex-wrap: wrap;

      .chart {
        // border: 1px solid gray;
        width: 50%;
        height: 50%;
        padding: 0 2px 2px 0;
        border: 1px solid grey;
      }
    }
  }
}
</style>
