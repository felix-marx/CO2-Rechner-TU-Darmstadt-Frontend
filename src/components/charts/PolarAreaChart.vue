<template>
  <PolarArea
    ref="chart"
    :data="chartData"
    :options="options"
  />
</template>

<script>
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js'
import { PolarArea } from 'vue-chartjs'
import ChartJsPluginDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend)
ChartJS.register(ChartJsPluginDataLabels)

export default {
  name: 'PolarAreaChart',

  components: {
    PolarArea
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