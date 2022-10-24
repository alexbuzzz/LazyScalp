<script setup lang="ts">
import { ref } from 'vue'
import Chart from './Chart.vue'

const incomeTickers = ['ADAUSDT', 'BELUSDT', 'BTCUSDT', 'OPUSDT', 'LINKUSDT']
const columns = 4

// Chart data params
const chartDataParams = ref({
  ticker: 'BTCUSDT',
  interval: '1m',
  candlesLimit: 100
})

// Chart main settings
const chartOptions = ref({
  layout: {
    backgroundColor: '#1a1b21',
    textColor: '#ccc',
    fontFamily: 'Comfortaa',
    fontSize: 12
  },
  grid: {
    vertLines: {
      color: '#1a1b21'
    },
    horzLines: {
      color: '#1a1b21'
    }
  },
  crosshair: {
    mode: 0
  },

  rightPriceScale: {
    borderColor: '#21222a',
    entireTextOnly: true
  },

  timeScale: {
    borderColor: '#21222a',
    rightOffset: 7,
    timeVisible: true,
    secondsVisible: false
  }
})

// Candles colors
const seriesOptions = ref({
  upColor: '#26A69A',
  borderUpColor: '#26A69A',
  wickUpColor: '#26A69A',
  downColor: '#E75654',
  borderDownColor: '#E75654',
  wickDownColor: '#E75654'
})

// Volume settings
const volumeOptions = ref({
  entireTextOnly: true,
  priceFormat: {
    type: 'volume'
  },
  priceLineVisible: false,
  priceScaleId: '',
  scaleMargins: {
    top: 0.95,
    bottom: 0.01
  }
})
</script>

<template>
  <div class="chart-container">
    <!-- <button @click="chartDataParams.interval = '1m'">1m</button>
      <button @click="chartDataParams.interval = '5m'">5m</button> -->
    <Chart
      class="chart"
      :class="{
        width100: columns === 1,
        width50: columns === 2,
        width3333: columns === 3,
        width25: columns === 4
      }"
      v-for="(item, index) in incomeTickers"
      :key="index"
      :chart-ticker="item"
      :chart-data-params="chartDataParams"
      :autosize="true"
      :chart-options="chartOptions"
      :series-options="seriesOptions"
      :volume-options="volumeOptions"
    />
  </div>
</template>

<style lang="scss" scoped>
.chart-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  height: 100%;
  width: 100%;

  .chart {
    margin: 0 0.5rem 0.5rem 0;
    aspect-ratio: 3 / 2;
  }

  .width100 {
    width: calc(100% - 0.5rem);
  }

  .width50 {
    width: calc(50% - 0.5rem);
  }

  .width3333 {
    width: calc(33.33% - 0.5rem);
  }

  .width25 {
    width: calc(25% - 0.5rem);
  }
}
</style>
