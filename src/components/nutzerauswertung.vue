<template>
  <v-container>
    <v-card
      v-if="responsesuccessful"
      elevation="2"
      outlined
    >
      <v-card-title>Auswertung der Umfrage {{ responsedata.id }}</v-card-title>
      <v-container>
        <v-row>
          <p>Bilanzierungsjahr: {{ responsedata.jahr }}</p>
        </v-row>
        <v-row>
          <p>Mitarbeiteranzahl: {{ responsedata.mitarbeiteranzahl }}</p>
        </v-row>

        <doughnut-chart
          :chart-data="chartdataDoughnut"
          :options="optionsDoughnut"
        />
        <v-btn @click="changeData">
          Change
        </v-btn>
      </v-container>
    </v-card>

    <v-card
      v-if="!responsesuccessful"
      elevation="2"
      outlined
    >
      <v-card-title>Error {{ responseerror.code }}: {{ responseerror.message }}</v-card-title>
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
      responsesuccessful: null,
      responsedata: {
        id: null,
        jahr: null,
        mitarbeiteranzahl: null
      },
      responseerror: {
        code: null,
        message: null,
      },

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
        maintainAspectRatio: false,
        title: {
          display: true,
          text: 'Emissionen durch Energieverbrauch'
        }
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
        .then((body) => {
          console.log("Success:", body);

          if (body.status == "success"){
            this.responsesuccessful = true
            this.responsedata = body.data
            console.log(this.responsedata)
          }
          else {  // Fehlerbehandlung
            this.responsesuccessful = false
            this.responseerror = body.error
            console.log(this.responseerror)
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },

    changeData: function(){
      this.chartdataDoughnut = {
            labels: ['Wärme', 'Kälte', 'Strom'],
            datasets: [{
              label: 'Emissionen',
              data: [this.responsedata.emissionenWaerme, this.responsedata.emissionenKaelte, this.responsedata.emissionenStrom],
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