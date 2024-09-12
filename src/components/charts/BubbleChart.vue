<template>
  <Bubble
    ref="chart"
    :data="chartData"
    :options="options"
  />
</template>

<script>
import { Chart as ChartJS, Tooltip, Legend, PointElement, LinearScale } from 'chart.js'
import { Bubble } from 'vue-chartjs'
import ChartJsPluginDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend)
ChartJS.register(ChartJsPluginDataLabels)

export default {
  name: 'BubbleChart',

  components: {
    Bubble
  },

  props: {
    chartData: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },

  methods: {
    updateChart() {
      this.$refs.chart.chart.config._config.options = this.options
      this.$refs.chart.chart.config._config.data = this.chartData
      this.$refs.chart.chart.update()
    }
  }
}
</script>
