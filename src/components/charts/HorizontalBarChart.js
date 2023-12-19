import { HorizontalBar, mixins  } from 'vue-chartjs';
import ChartJsPluginDataLabels from 'chartjs-plugin-datalabels';


export default {
  extends: HorizontalBar,
  mixins: [mixins.reactiveProp],
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
  mounted () {
    this.addPlugin(ChartJsPluginDataLabels)
    this.renderChart(this.chartData, this.options)
  },

  methods: {
    updateChart() {
      this.$data._chart.update()
    }
  }
}