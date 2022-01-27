<template>
  <v-container>
    <v-card
      v-if="responsesuccessful"
      elevation="2"
      outlined
      class="pa-7"
    >
      <v-card-title>Auswertung der Umfrage "{{ responsedata.bezeichnung }}"</v-card-title>
      <v-divider />
      <v-container>
        <v-row>
          <v-col>
            <p>Bilanzierungsjahr: {{ responsedata.jahr }}</p>
          </v-col>
          <v-col>
            <p>Mitarbeiteranzahl: {{ responsedata.mitarbeiteranzahl }}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <p>Ausgefüllte Mitarbeiterumfragen: {{ responsedata.umfragenanzahl }}</p>
          </v-col>
          <v-col>
            <v-progress-linear
              height="25"
              color="cyan"
              :value="responsedata.umfragenanteil"
            >
              <strong>{{ responsedata.umfragenanteil }}%</strong>
            </v-progress-linear>
          </v-col>
        </v-row>
        <v-row v-if="displayExtrapolationWarning">
          <v-col>
            <v-alert
              type="warning"
            >
              Die Hochrechnung der Emissionsdaten ist ungenau, weil bisher nur {{ responsedata.umfragenanteil }}% der Mitarbeiter die Umfrage ausgefüllt haben.
            </v-alert>
          </v-col>
        </v-row>
      </v-container>

      <v-card-title>Emissionen</v-card-title>

      <v-divider />
      <v-container>
        <v-row>
          <v-col>
            <p>
              Gesamtemissionen: {{ responsedata.emissionenGesamt }} t CO<sub>2</sub> eq.
            </p>
          </v-col>
          <v-col>
            <p>
              Emissionen pro Mitarbeiter: {{ responsedata.emissionenProMitarbeiter }} t CO<sub>2</sub> eq.
            </p>
          </v-col>
        </v-row>

        <!-- Referenzwerte (Haushalte) -->
        <v-row justify="center">
          <v-card
            outlined
            class="pa-7"
          >
            <v-icon>mdi-thought-bubble-outline</v-icon>
            <b>Did you know?</b>
            : {{ haushalteReferenzText }}
          </v-card>
        </v-row>
        <v-row>
          <v-col class="d-flex justify-center">
            <h4>Aufteilung nach Hauptemissionsfaktoren</h4>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <doughnut-chart
              :chart-data="chartdataGesamtDoughnut"
              :options="optionsGesamtDoughnut"
            />
          </v-col>
          <v-col>
            <bar-chart
              :chart-data="chartdataGesamtPareto"
              :options="optionsGesamtPareto"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex justify-center">
            <h4>
              Aufteilung der Emissionen nach Energieart
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">
                    mdi-alert-circle-outline
                  </v-icon>
                </template>
                Die angezeigten Emissionen für den Energieverbrauch können unvollständig sein. Der Grund dafür ist, dass nicht alle Gebäude der TU mit einem eingenen Zähler ausgestattet sind und keine Zählerdaten vorliegen.
              </v-tooltip>
            </h4>
          </v-col>
        </v-row>
        <v-row v-if="!displayEnergieCharts">
          <v-col>
            <v-alert
              type="warning"
            >
              Es ist kein Auswertung der Emissionen durch den Energieverbrauch möglich. Für das ausgewählte Bilanzierungsjahr fehlen Daten seitens der TU Darmstadt, um die Emissionen berechnen zu können.
            </v-alert>
          </v-col>
        </v-row>
        <v-row v-if="displayEnergieCharts">
          <v-col>
            <doughnut-chart
              :chart-data="chartdataEnergieDoughnut"
              :options="optionsEnergieDoughnut"
            />
          </v-col>
          <v-col>
            <bar-chart
              :chart-data="chartdataEnergiePareto"
              :options="optionsEnergiePareto"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn
              color="primary"
              @click="makeSpreadsheet"
            >
              <v-icon left>
                mdi-file-chart-outline
              </v-icon>Download als Excel
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <v-card
      v-if="responseNotSuccessful"
      elevation="2"
      outlined
    >
      <v-card-title>Error {{ responseerror.code }}: {{ responseerror.message }}</v-card-title>
    </v-card>
  </v-container>
</template>

<script>
import DoughnutChart from "./charts/DoughnutChart.js";
import BarChart from "./charts/BarChart.js";
import XLSX from "xlsx"
import saveAs from 'file-saver';
import Cookies from '../Cookie'

export default {
  name: "Auswertung",

  components: {
    DoughnutChart,
    BarChart,
  },

  props: {
    umfrageid: {
      default: "",
      type: String,
    }
  },

  data() {
    return {
      responsesuccessful: false,
      responseNotSuccessful: false,
      responsedata: {
        id: null,
        bezeichnung: null,
        jahr: null,
        mitarbeiteranzahl: null,
        umfragenanzahl: null,
        umfragenanteil: null,

        emissionenWaerme: null,
        emissionenStrom: null,
        emissionenKaelte: null,
        emissionenEnergie: null,
        emissionenITGeraeteHauptverantwortlicher: null,
        emissionenITGeraeteMitarbeiter: null,
        emissionenITGeraete: null,
        emissionenDienstreisen: null,
        emissionenPendelwege: null,
        emissionenGesamt: null,
        emissionenProMitarbeiter: null,

        vergleich2PersonenHaushalt: null,
        vergleich4PersonenHaushalt: null,
      },
      responseerror: {
        code: null,
        message: null,
      },

      displayEnergieCharts: true,

      chartdataGesamtDoughnut: null,
      optionsGesamtDoughnut: null,

      chartdataGesamtPareto: null,
      optionsGesamtPareto: null,

      chartdataEnergieDoughnut: null,
      optionsEnergieDoughnut: null,

      chartdataEnergiePareto: null,
      optionsEnergiePareto: null,
    }
  },

  computed: {
    haushalteReferenzText: function () {
      let base_text_beginning = "Ihr Gesamtverbrauch entspricht circa ";
      let base_text_middle = " bzw. ";
      let text_zweiPersonenHaushalt = this.responsedata.vergleich2PersonenHaushalt + " Zwei-Personen-Haushalten";
      let text_vierPersonenHaushalt = this.responsedata.vergleich4PersonenHaushalt + " Vier-Personen-Haushalten";
      let base_text_ending = " in einem Jahr."
      return base_text_beginning + text_vierPersonenHaushalt + base_text_middle + text_zweiPersonenHaushalt + base_text_ending;
    },
    displayExtrapolationWarning: function () {
      return this.responsedata.umfragenanteil <= 50.0
    }
  },

  created() {
    this.getData();
  },

  methods: {
    /**
     * Creates XLSX file and makes it downloadable.
     */
    makeSpreadsheet: function () {
      var data = [
        {
          "col1": "Auswertung der Umfrage",
        },
        {
          "col1": "Jahr",
          "col2": this.responsedata.jahr,
        },
        {
          "col1": "Mitarbeiteranzahl",
          "col2": this.responsedata.mitarbeiteranzahl,
        },
        {
          "col1": "ausgefüllte Mitarbeiterumfrage",
          "col2": this.responsedata.umfragenanzahl,
        },
        {
          "col1": "Fortschritt",
          "col2": this.responsedata.umfragenanteil + "%",
        },
        {},
        {
          "col1": "Emissionsüberblick",
          "col2": "t CO2 eq.",
        },
        {
          "col1": "Gesamtemissionen",
          "col2": this.responsedata.emissionenGesamt,
        },
        {
          "col1": "Emissionen pro Mitarbeiter",
          "col2": this.responsedata.emissionenProMitarbeiter,
        },
        {},
        {
          "col1": "Vergleich 4-Personen Haushalt",
          "col2": this.responsedata.vergleich4PersonenHaushalt,
        },
        {
          "col1": "Vergleich 2-Personen Haushalt",
          "col2": this.responsedata.vergleich2PersonenHaushalt,
        },
        {},
        {
          "col1": "Aufteilung nach Hauptemissonsfaktoren",
          "col2": "t CO2 eq.",
          "col3": "%",
        },
        {
          "col1": "Energie",
          "col2": this.responsedata.emissionenEnergie,
          "col3": this.responsedata.emissionenGesamt === 0.0 ? 0 : Math.round(this.responsedata.emissionenEnergie / this.responsedata.emissionenGesamt * 1000) / 10,
        },
        {
          "col1": "Pendelwege",
          "col2": this.responsedata.emissionenPendelwege,
          "col3": this.responsedata.emissionenGesamt === 0.0 ? 0 : Math.round(this.responsedata.emissionenPendelwege / this.responsedata.emissionenGesamt * 1000) / 10,
        },
        {
          "col1": "Dienstreisen",
          "col2": this.responsedata.emissionenDienstreisen,
          "col3": this.responsedata.emissionenGesamt === 0.0 ? 0 : Math.round(this.responsedata.emissionenDienstreisen / this.responsedata.emissionenGesamt * 1000) / 10,
        },
        {
          "col1": "IT-Geräte",
          "col2": this.responsedata.emissionenITGeraete,
          "col3": this.responsedata.emissionenGesamt === 0.0 ? 0 : Math.round(this.responsedata.emissionenITGeraete / this.responsedata.emissionenGesamt * 1000) / 10
        },
        {},
        {
          "col1": "Aufteilung nach Energieart",
          "col2": "t CO2 eq.",
          "col3": "%",
        },
        {
          "col1": "Wärme",
          "col2": this.responsedata.emissionenWaerme,
          "col3": this.responsedata.emissionenEnergie === 0.0 ? 0 : Math.round(this.responsedata.emissionenWaerme / this.responsedata.emissionenEnergie * 1000) / 10,
        },
        {
          "col1": "Kälte",
          "col2": this.responsedata.emissionenKaelte,
          "col3": this.responsedata.emissionenEnergie === 0.0 ? 0 : Math.round(this.responsedata.emissionenKaelte / this.responsedata.emissionenEnergie * 1000) / 10,
        },
        {
          "col1": "Strom",
          "col2": this.responsedata.emissionenStrom,
          "col3": this.responsedata.emissionenEnergie === 0.0 ? 0 : Math.round(this.responsedata.emissionenStrom / this.responsedata.emissionenEnergie * 1000) / 10,
        },
      ];
      var options = {
        header: ["col1", "col2", "col3"],
        skipHeader: true,
      }

      // workbook
      var wb = XLSX.utils.book_new();
      wb.Props = {
        Title: "CO2 Rechner",
        CreatedDate: new Date()
      };
      wb.SheetNames.push("Emissionen");

      // worksheet
      var ws = XLSX.utils.json_to_sheet(data, options);
      wb.Sheets["Emissionen"] = ws;

      var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

      function s2ab(s) {
        var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
        var view = new Uint8Array(buf);  //create uint8array as viewer
        for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
        return buf;
      }

      saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), 'Emissionen_' + this.responsedata.bezeichnung + '.xlsx');
    },

/**
 * Fetches Get request to get survey data and evaluation.
 */
  getData: async function () {
    await fetch(process.env.VUE_APP_BASEURL + "/auswertung", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        authToken: {
          username: Cookies.getCookieAttribut("username"),
          sessiontoken: Cookies.getCookieAttribut("sessiontoken")
        },
        umfrageID: this.$props.umfrageid,
      }),
    }).then((response) => response.json())
      .then((body) => {
        console.log(body)
        if (body.status == "success") {
          this.responsesuccessful = true
          this.responsedata = body.data

          this.checkNegativValue();
          this.roundResponseData();
          this.setChartGesamt();
          this.setChartEnergie();
        }
        else {  // Fehlerbehandlung
          this.responseNotSuccessful = true
          this.responseerror = body.error
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    },

    /**
     * Method checks for negativ values in energy emissions which indecated that the year of the survey has no data in the database.
     * If dedected sets the flag displayEnergieChart to false
     */
    checkNegativValue: function () {
      if (this.responsedata.emissionenWaerme < 0 || this.responsedata.emissionenKaelte < 0 || this.responsedata.emissionenStrom < 0) {
        this.displayEnergieCharts = false;
      }
    },

    /**
     * Method rounds all emission values to unit t with 3 decimal places.
     */
    roundResponseData: function () {
      let roundFactor1 = 10000
      let roundFactor2 = 100

      this.responsedata.emissionenWaerme = Math.round(this.responsedata.emissionenWaerme / roundFactor1) / roundFactor2
      this.responsedata.emissionenStrom = Math.round(this.responsedata.emissionenStrom / roundFactor1) / roundFactor2
      this.responsedata.emissionenKaelte = Math.round(this.responsedata.emissionenKaelte / roundFactor1) / roundFactor2
      this.responsedata.emissionenEnergie = Math.round(this.responsedata.emissionenEnergie / roundFactor1) / roundFactor2

      this.responsedata.emissionenITGeraeteHauptverantwortlicher = Math.round(this.responsedata.emissionenITGeraeteHauptverantwortlicher / roundFactor1) / roundFactor2
      this.responsedata.emissionenITGeraeteMitarbeiter = Math.round(this.responsedata.emissionenITGeraeteMitarbeiter / roundFactor1) / roundFactor2
      this.responsedata.emissionenITGeraete = Math.round(this.responsedata.emissionenITGeraete / roundFactor1) / roundFactor2

      this.responsedata.emissionenDienstreisen = Math.round(this.responsedata.emissionenDienstreisen / roundFactor1) / roundFactor2
      this.responsedata.emissionenPendelwege = Math.round(this.responsedata.emissionenPendelwege / roundFactor1) / roundFactor2

      this.responsedata.emissionenGesamt = Math.round(this.responsedata.emissionenGesamt / roundFactor1) / roundFactor2
      this.responsedata.emissionenProMitarbeiter = Math.round(this.responsedata.emissionenProMitarbeiter / roundFactor1) / roundFactor2

      this.responsedata.umfragenanteil = Math.round(this.responsedata.umfragenanteil * 1000) / 10
      this.responsedata.vergleich2PersonenHaushalt = Math.round(this.responsedata.vergleich2PersonenHaushalt * 100) / 100
      this.responsedata.vergleich4PersonenHaushalt = Math.round(this.responsedata.vergleich4PersonenHaushalt * 100) / 100
    },

    /**
     * Method sets data and options for the Gesamt charts.
     */
    setChartGesamt: function () {
      let data = [
        { label: 'Energie', value: this.responsedata.emissionenEnergie },
        { label: 'Dienstreisen', value: this.responsedata.emissionenDienstreisen },
        { label: 'Pendelweg', value: this.responsedata.emissionenPendelwege },
        { label: 'IT-Geräte', value: this.responsedata.emissionenITGeraete },
      ];

      this.chartdataGesamtDoughnut = {
        labels: data.map(a => a.label),
        datasets: [{
          label: 'Emissionen',
          data: data.map(a => a.value),
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)'
          ],
          hoverOffset: 4
        }]
      }
      this.optionsGesamtDoughnut = {
        responsive: false,
        maintainAspectRatio: false,
        plugins: {
          datalabels: {
            display: true,
            // eslint-disable-next-line no-unused-vars
            formatter: (value, context) => {
              if(this.responsedata.emissionenGesamt === 0){
                return 0
              }
              return (Math.round(value / this.responsedata.emissionenGesamt * 1000) / 10) + '%';
            },
            font: {
              weight: 'bold',
              size: 14,
            },
          },
        },
      }

      data.sort((a, b) => b.value - a.value)

      this.chartdataGesamtPareto = {
        labels: data.map(a => a.label),
        datasets: [{
          type: 'bar',
          label: 'Emissionen',
          yAxisID: 'bar',
          data: data.map(a => a.value),
          backgroundColor: 'rgb(53, 212, 212)',
          borderWidth: 1,
          order: 1,
          datalabels: {
            color: 'black',
            align: 'end',
            anchor: 'start',
          }
        }, {
          type: 'line',
          label: 'kumulierte Emissionen',
          yAxisID: 'line',
          data: data.map((sum => a => sum += a.value)(0)).map(a => this.responsedata.emissionenGesamt === 0.0 ? 0 : Math.round(a / this.responsedata.emissionenGesamt * 1000) / 1000),
          fill: false,
          borderColor: 'rgb(21, 134, 209)',
          lineTension: 0,
          order: 0,
          datalabels: {
            display: false,
          },
        }]
      };
      this.optionsGesamtPareto = {
        responsive: false,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            id: 'bar',
            position: 'left',
            ticks: {
              beginAtZero: true
            },
            scaleLabel: {
              display: true,
              labelString: 't C02 eq.'
            }
          }, {
            id: 'line',
            position: 'right',
            ticks: {
              max: 1,
              min: 0,
            },
            gridLines: {
              display: false
            }
          }]
        },
      };
    },

    /**
     * Method sets data and options for the Energie charts.
     */
    setChartEnergie: function () {
      let data = [
        { label: 'Wärme', value: this.responsedata.emissionenWaerme },
        { label: 'Kälte', value: this.responsedata.emissionenKaelte },
        { label: 'Strom', value: this.responsedata.emissionenStrom },
      ];

      this.chartdataEnergieDoughnut = {
        labels: data.map(a => a.label),
        datasets: [{
          label: 'Emissionen',
          data: data.map(a => a.value),
          backgroundColor: [
            'rgb(240, 128, 128)',
            'rgb(0, 204, 255)',
            'rgb(255, 219, 77)',
          ],
          hoverOffset: 4
        }]
      }
      this.optionsEnergieDoughnut = {
        responsive: false,
        maintainAspectRatio: false,
        plugins: {
          datalabels: {
            display: true,
            // eslint-disable-next-line no-unused-vars
            formatter: (value, context) => {
              if(this.responsedata.emissionenEnergie === 0){
                return 0
              }
              return (Math.round(value / this.responsedata.emissionenEnergie * 1000) / 10) + '%';
            },
            font: {
              weight: 'bold',
              size: 14,
            },
          },
        },
      }

      data.sort((a, b) => b.value - a.value)

      this.chartdataEnergiePareto = {
        labels: data.map(a => a.label),
        datasets: [{
          type: 'bar',
          label: 'Emissionen',
          yAxisID: 'bar',
          data: data.map(a => a.value),
          backgroundColor: 'rgb(0, 220, 220)',
          borderWidth: 1,
          order: 1,
          datalabels: {
            color: 'black',
            align: 'end',
            anchor: 'start',
          },
        }, {
          type: 'line',
          label: 'kumulierte Emissionen',
          yAxisID: 'line',
          data: data.map((sum => a => sum += a.value)(0)).map(a => this.responsedata.emissionenEnergie === 0.0 ? 0 : Math.round(a / this.responsedata.emissionenEnergie * 1000) / 1000),
          fill: false,
          borderColor: 'rgb(54, 162, 235)',
          lineTension: 0,
          order: 0,
          datalabels: {
            display: false,
          },
        }]
      }
      this.optionsEnergiePareto = {
        responsive: false,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            id: 'bar',
            position: 'left',
            ticks: {
              beginAtZero: true
            },
            scaleLabel: {
              display: true,
              labelString: 't C02 eq.'
            }
          }, {
            id: 'line',
            position: 'right',
            ticks: {
              max: 1,
              min: 0,
            },
            gridLines: {
              display: false
            }
          }]
        },
      }
    },
  },
}

</script>