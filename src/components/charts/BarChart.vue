<template>
  <Bar
    ref="chart"
    :data="chartData"
    :options="options"
  />
</template>

<script>
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { Bar } from 'vue-chartjs'
import ChartJsPluginDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
ChartJS.register(ChartJsPluginDataLabels)

export default {
  name: 'BarChart',

  components: {
    Bar
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