import { Doughnut, mixins } from 'vue-chartjs'
// const { reactiveProp } = mixins

export default {
  extends: Doughnut,

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
  // props: ['chartData', 'options'],

  mounted () {
    // this.renderDoughnutChart()
    this.renderChart(this.chartData, this.options)
  },
}
