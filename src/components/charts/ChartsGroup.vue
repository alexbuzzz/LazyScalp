<script setup lang="ts">
import { ref, reactive, watchEffect } from 'vue'
import Chart from './Chart.vue'
import store from '../../store'

const props = defineProps({
  title: {
    type: String
  }
})

interface ChartDataParams {
  interval: string
  candlesLimit: number
}

const incomeTickers = ['ADAUSDT', 'BELUSDT', 'BTCUSDT', 'OPUSDT', 'LINKUSDT']
const columns = store.state.chartColumns

// Chart data params
const chartDataParams: ChartDataParams = reactive({
  interval: store.state.gridTimeframe,
  candlesLimit: 100
})

watchEffect(() => {
  console.log(store.state.gridTimeframe)
  chartDataParams.interval = store.state.gridTimeframe
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
  handleScale: {
    mouseWheel: false
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
  priceFormat: {
    type: 'price',
    precision: 4,
    minMove: 0.0001
  },
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
  <div class="main-wrap">
    <div class="title">{{ title }}</div>
    <div class="chart-wrap">
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
  </div>
</template>

<style lang="scss" scoped>
.main-wrap {
  position: relative;
  height: 100%;
  width: 100%;
  padding-right: 0.5rem;

  .title {
    position: absolute;
    top: 25px;
    color: var(--text-color);
  }

  .chart-wrap {
    margin-top: 55px;
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
}
</style>
