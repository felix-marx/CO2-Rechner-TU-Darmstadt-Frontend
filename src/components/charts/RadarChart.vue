<template>
  <Radar
    ref="chart"
    :data="chartData"
    :options="options"
  />
</template>

<script>
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js'
import { Radar } from 'vue-chartjs'
import ChartJsPluginDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register( RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)
ChartJS.register(ChartJsPluginDataLabels)

export default {
  name: 'RadarChart',

  components: {
    Radar
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
