<template>
  <v-container>
    <v-card
      elevation="2"
      outlined
    >
      <v-card-title>Auswertung</v-card-title>
      <v-container>
        <doughnut-chart
          :chart-data="chartdataDoughnut"
          :options="optionsDoughnut"
        />
        <v-btn @click="changeData">Change</v-btn>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import DoughnutChart from "./charts/DoughnutChart.js";

export default{
  name: "Auswertung" , 

  components: {
    DoughnutChart,
  },

  props: {
    umfrageid: {
      default: "",
      type: String,
    }  
  },

  data() {
    return {
      chartdataTemplate: {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [{
          label: 'My First Dataset',
          data: null,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]},
      chartdataDoughnut: null,
      optionsDoughnut: {
        responsive: true,
        maintainAspectRatio: false
      },
    }
  },
  
  created(){
    this.getData();
  },

  methods: {
    getData: async function(){
      await fetch(process.env.VUE_APP_BASEURL + "/auswertung?id=" + this.$props.umfrageid, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          console.log(this.chartdataDoughnut)
          this.chartdataTemplate.datasets[0].data = [30, 50, 10];
          this.chartdataDoughnut = this.chartdataTemplate;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },

    changeData: function(){
      this.chartdataDoughnut = {
            labels: ['Red', 'Blue', 'Yellow'],
            datasets: [{
              label: 'My First Dataset',
              data: [1, 2, 3],
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
              ],
              hoverOffset: 4
            }]};

      console.log(this.chartdataDoughnut)
    }
  },
}

</script>