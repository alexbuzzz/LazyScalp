<script lang="ts" setup>
import { ref, watch } from 'vue'
import store from '../../store'

const gridTimeframe = ref(store.state.gridTimeframe)
</script>

<template>
  <div class="radio_container">
    <input
      type="radio"
      name="radio"
      id="m1"
      value="1m"
      v-model="gridTimeframe"
      @change="store.commit('changeGridTimeframe', '1m')"
    />
    <label for="m1">1m</label>
    <input
      type="radio"
      name="radio"
      id="m5"
      value="5m"
      v-model="gridTimeframe"
      @change="store.commit('changeGridTimeframe', '5m')"
    />
    <label for="m5">5m</label>
    <input
      type="radio"
      name="radio"
      id="m15"
      value="15m"
      v-model="gridTimeframe"
      @change="store.commit('changeGridTimeframe', '15m')"
    />
    <label for="m15">15m</label>
    <input
      type="radio"
      name="radio"
      id="h1"
      value="1h"
      v-model="gridTimeframe"
      @change="store.commit('changeGridTimeframe', '1h')"
    />
    <label for="h1">1h</label>
    <input
      type="radio"
      name="radio"
      id="h4"
      value="4h"
      v-model="gridTimeframe"
      @change="store.commit('changeGridTimeframe', '4h')"
    />
    <label for="h4">4h</label>
    <input
      type="radio"
      name="radio"
      id="d1"
      value="1d"
      v-model="gridTimeframe"
      @change="store.commit('changeGridTimeframe', '1d')"
    />
    <label for="d1">1d</label>
  </div>
</template>

<style lang="scss" scoped>
.radio_container {
  position: absolute;
  top: 25px;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 50;

  input[type='radio'] {
    appearance: none;
    display: none;
  }

  label {
    color: var(--text-disabled-color);
    margin: 7px;
    cursor: pointer;
  }

  input[type='radio']:checked + label {
    color: var(--text-color);
    font-weight: bold;
  }
}
</style>
