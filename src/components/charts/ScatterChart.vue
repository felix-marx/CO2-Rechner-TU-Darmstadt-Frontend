<template>
  <Scatter
    ref="chart"
    :data="chartData"
    :options="options"
  />
</template>

<script>
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js'
import { Scatter } from 'vue-chartjs'
import ChartJsPluginDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend)
ChartJS.register(ChartJsPluginDataLabels)

export default {
  name: 'ScatterChart',

  components: {
    Scatter
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