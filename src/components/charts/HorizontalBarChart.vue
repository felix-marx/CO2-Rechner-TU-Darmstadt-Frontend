<script>
import { HorizontalBar } from 'vue-chartjs'

export default {
  extends: HorizontalBar,
  props: {
    chartdata: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
</script>