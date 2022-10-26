<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { createChart } from 'lightweight-charts'
import axios from 'axios'
import store from '../../store'
import IconBookmark from '../icons/IconBookmark.vue'

const props = defineProps({
  chartDataParams: {
    type: Object
  },
  chartTicker: {
    type: String
  },
  autosize: {
    default: true,
    type: Boolean
  },
  chartOptions: {
    type: Object
  },
  seriesOptions: {
    type: Object
  },
  volumeOptions: {
    type: Object
  },
  timeScaleOptions: {
    type: Object
  },
  priceScaleOptions: {
    type: Object
  }
})

let series: any
let volume: any
let chart: any
let connection: any = null
let pongInterval: any = null

const chartData: any = ref({
  kline: [],
  vol: []
})

const chartContainer = ref()

const fitContent = () => {
  if (!chart) return
  chart.timeScale().fitContent()
}

const getChart = () => {
  return chart
}

defineExpose({ fitContent, getChart })

// Auto resizes the chart when the browser window is resized.
const resizeHandler = () => {
  if (!chart || !chartContainer.value) return
  const dimensions = chartContainer.value.getBoundingClientRect()
  chart.resize(dimensions.width, dimensions.height)
}

// CREATE =================================================
const handleChart = async (
  mode: string,
  tic?: string,
  int?: string,
  lim?: string
) => {
  // STOP

  if (mode === 'close') {
    connection.close()
    connection = null
    clearInterval(pongInterval)
    chartData.value.kline.length = 0
    chartData.value.vol.length = 0

    chart.removeSeries(series)
    chart.removeSeries(volume)

    if (chart) {
      chart.remove()
      chart = null
    }
    if (series) {
      series = null
    }
    if (volume) {
      volume = null
    }
    window.removeEventListener('resize', resizeHandler)
  }

  // CLEAR
  if (mode === 'update') {
    connection.close()
    connection = null
    clearInterval(pongInterval)
    chartData.value.kline.length = 0
    chartData.value.vol.length = 0

    chart.removeSeries(series)
    chart.removeSeries(volume)
  }

  // START
  if (mode === 'start') {
    chart = createChart(chartContainer.value, props.chartOptions)

    if (props.priceScaleOptions) {
      chart.priceScale().applyOptions(props.priceScaleOptions)
    }

    if (props.timeScaleOptions) {
      chart.timeScale().applyOptions(props.timeScaleOptions)
    }

    if (props.autosize) {
      window.addEventListener('resize', resizeHandler)
    }
  }

  // START OR UPDATE
  if (mode === 'start' || mode === 'update') {
    // Get kline from API

    const res = await axios.get(
      `https://fapi.binance.com/fapi/v1/klines?symbol=${tic?.toUpperCase()}&interval=${int}&limit=${lim}`
    )

    res.data.forEach((element: any, index: number, array: []) => {
      const date = element[0] / 1000

      // remove last candle to prevent duplicate
      if (index !== array.length - 1) {
        const klineFormatted = {
          time: date,
          open: element[1],
          high: element[2],
          low: element[3],
          close: element[4]
        }

        const volFormatted = {
          time: date,
          value: element[7],
          color: 'rgba(255, 255, 255, 0.05)'
        }

        chartData.value.kline.push(klineFormatted)
        chartData.value.vol.push(volFormatted)
      }
    })

    // Draw fresh candles from websocket
    const connectionLink = `wss://fstream.binance.com/stream?streams=${tic?.toLowerCase()}@kline_${int}`

    connection = new WebSocket(connectionLink)

    connection.onopen = () => {
      pongInterval = setInterval(() => {
        connection.send('pong')
      }, 1000 * 60)

      connection.onmessage = (data: any) => {
        const parsedData = JSON.parse(data.data)

        if (parsedData.data !== undefined) {
          const {
            k: {
              T: startTime,
              o: open,
              c: close,
              h: high,
              l: low,
              q: volInCurrency
            }
          } = parsedData.data

          series.update({
            open: parseFloat(open),
            close: parseFloat(close),
            high: parseFloat(high),
            low: parseFloat(low),
            time: startTime / 1000
          })

          volume.update({
            value: parseFloat(volInCurrency),
            color: 'rgba(255, 255, 255, 0.05)',
            time: startTime / 1000
          })
        }
      }
    }

    // Apply data to the chart
    series = chart.addCandlestickSeries(props.seriesOptions)
    series.setData(chartData.value.kline)
    volume = chart.addHistogramSeries(props.volumeOptions)
    volume.setData(chartData.value.vol)
  }
}

onMounted(async () => {
  await handleChart(
    'start',
    props?.chartTicker,
    props?.chartDataParams?.interval,
    props?.chartDataParams?.candlesLimit
  )
  chart.timeScale().fitContent()
})

onUnmounted(() => {
  handleChart('close')
})

// WARCHERS
watch(
  () => props.autosize,
  (enabled) => {
    if (!enabled) {
      window.removeEventListener('resize', resizeHandler)
      return
    }
    window.addEventListener('resize', resizeHandler)
  }
)

watch(
  () => props?.chartDataParams?.interval,
  async () => {
    await handleChart(
      'update',
      props?.chartTicker,
      props?.chartDataParams?.interval,
      props?.chartDataParams?.candlesLimit
    )
  }
)

watch(
  () => props.chartOptions,
  (newOptions) => {
    if (!chart) return
    chart.applyOptions(newOptions)
  }
)

watch(
  () => props.seriesOptions,
  (newOptions) => {
    if (!series) return
    series.applyOptions(newOptions)
  }
)

watch(
  () => props.priceScaleOptions,
  (newOptions) => {
    if (!chart) return
    chart.priceScale().applyOptions(newOptions)
  }
)

watch(
  () => props.timeScaleOptions,
  (newOptions) => {
    if (!chart) return
    chart.timeScale().applyOptions(newOptions)
  }
)
</script>

<template>
  <div class="wrap">
    <div class="head">
      <span
        class="ticker"
        @click="store.commit('openWorkspace', props.chartTicker)"
        >{{ props.chartTicker?.toString().slice(0, -4) }}</span
      >
      <button>Copy</button>
      <button><IconBookmark /></button>
    </div>
    <div class="chart" ref="chartContainer"></div>
  </div>
</template>

<style lang="scss" scoped>
.wrap {
  .head {
    background-color: var(--content);
    display: flex;
    justify-content: right;
    position: relative;

    .ticker {
      position: absolute;
      top: 0.25rem;
      left: 0.25rem;
      font-size: 2vw;
      font-weight: bold;
      opacity: 0.1;
      z-index: 10;
      cursor: pointer;

      @media (max-width: 500px) {
        font-size: 20px;
        opacity: 0.2;
      }

      &:hover {
        opacity: 0.15;
      }
    }

    button {
      color: var(--text-hover-color);
      background: none;
      border: none;
    }
  }

  .chart {
    height: 100%;
  }
}
</style>
