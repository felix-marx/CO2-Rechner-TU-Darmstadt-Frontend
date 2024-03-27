<template>
  <v-container>
    <v-card
      v-if="responseSuccessful"
      elevation="2"
      outlined
      class="pa-7 mx-auto"
      :max-width="constants.v_card_max_width"
    >
      <v-card-title>{{ $t('evaluation.surveyEvaluation.AuswertungDerUmfrage') }} "{{ responsedata.bezeichnung }}"</v-card-title>
      <v-divider />
      <v-container>
        <v-row>
          <v-col>
            <v-icon>
              mdi-calendar
            </v-icon>
            {{ $t('common.Bilanzierungsjahr') }}: {{ responsedata.jahr }}
          </v-col>
          <v-col>
            <v-icon>
              mdi-account
            </v-icon>
            {{ $t('common.Mitarbeitendenzahl') }}: {{ $n(responsedata.mitarbeiteranzahl, 'integer') }}
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-icon>
              mdi-account-edit
            </v-icon>
            {{ $t('evaluation.surveyEvaluation.AusgefuellteMitarbeiterumfragen') }} {{ $n(responsedata.umfragenanzahl, 'integer') }}
          </v-col>
          <v-col>
            <v-progress-linear
              height="25"
              color="cyan"
              :value="responsedata.umfragenanteil"
            >
              <strong>{{ $n(responsedata.umfragenanteil, 'decimal') }}%</strong>
            </v-progress-linear>
          </v-col>
        </v-row>
        <v-row v-if="displayExtrapolationWarning">
          <v-col>
            <v-alert
              type="warning"
            >
              {{ $t('evaluation.surveyEvaluation.HochrechnungUngenau_0') }} {{ $n(responsedata.umfragenanteil, 'decimal') }}{{ $t('evaluation.surveyEvaluation.HochrechnungUngenau_1') }}
            </v-alert>
          </v-col>
        </v-row>

        <DataGapVisualization 
          :gebaeude-i-ds-und-zaehler="gebaeudeIDsUndZaehler"
          :zaehler="zaehler"
          :gebaeude="umfrageGebaeude"
          :bilanzierungsjahr="responsedata.jahr"
        />
      </v-container>

      <v-card-title>{{ $t('common.Emissionen') }}</v-card-title>

      <v-divider />
      <v-container>
        <v-row>
          <v-col>
            <v-icon>
              mdi-thought-bubble
            </v-icon>
            {{ $t('evaluation.surveyEvaluation.Gesamtemissionen') }} {{ $n(responsedata.emissionenGesamt, 'decimal') }} {{ $t('evaluation.surveyEvaluation.tCO2eq') }}
          </v-col>
          <v-col>
            <v-icon>
              mdi-human-male-board-poll
            </v-icon>
            {{ $t('evaluation.surveyEvaluation.EmissionProMitarbeitende') }} {{ $n(responsedata.emissionenProMitarbeiter, 'decimal') }} {{ $t('evaluation.surveyEvaluation.tCO2eq') }}
          </v-col>
        </v-row>

        <!-- Referenzwerte (Haushalte) -->
        <v-row justify="center">
          <v-card
            outlined
            class="pa-7"
          >
            <v-icon>mdi-thought-bubble-outline</v-icon>
            <b>{{ $t('evaluation.surveyEvaluation.DidYouKnow') }}</b>
            {{ haushalteReferenzText }}
          </v-card>
        </v-row>

        <!-- Gesamt Charts -->
        <v-row>
          <v-col class="d-flex justify-center">
            <h4>{{ $t('evaluation.surveyEvaluation.AufteilungHauptemissionsfaktoren') }}</h4>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <doughnut-chart
              ref="doughnut-gesamt"
              :chart-data="chartdataGesamtDoughnut"
              :options="optionsGesamtDoughnut"
            />
          </v-col>
          <v-col>
            <bar-chart
              ref="bar-gesamt"
              :chart-data="chartdataGesamtBar"
              :options="optionsGesamtBar"
            />
          </v-col>
        </v-row>

        <div
          v-for="chart in chartList"
          :key="chart.ref"
        >
          <!-- Aufteilung Dienstreisen -->
          <div v-if="chart.ref == 'bar-dienstreisen'">
            <v-row v-if="displayAufteilungDienstreisen">
              <v-col class="d-flex justify-center">
                <h4>{{ $t('evaluation.surveyEvaluation.AufteilungDienstreisen') }}</h4>
              </v-col>
            </v-row>
            <v-row v-if="displayAufteilungDienstreisen">
              <v-col>
                <bar-chart
                  ref="bar-dienstreisen"
                  :chart-data="chartdataDienstreisenBar"
                  :options="optionsDienstreisenBar"
                />
              </v-col>
            </v-row>
          </div>

          <!-- Aufteilung Pendelwege -->
          <div v-if="chart.ref == 'bar-pendelwege'">
            <v-row v-if="displayAufteilungPendelwege">
              <v-col class="d-flex justify-center">
                <h4>{{ $t('evaluation.surveyEvaluation.AufteilungPendelwege') }}</h4>
              </v-col>
            </v-row>
            <v-row v-if="displayAufteilungPendelwege">
              <v-col>
                <bar-chart
                  ref="bar-pendelwege"
                  :chart-data="chartdataPendelwegeBar"
                  :options="optionsPendelwegeBar"
                />
              </v-col>
            </v-row>
          </div>

          <!-- Aufteilung ITGeraete -->
          <div v-if="chart.ref == 'bar-itgeraete'">
            <v-row v-if="displayAufteilungITGeraete">
              <v-col class="d-flex justify-center">
                <h4>{{ $t('evaluation.surveyEvaluation.AufteilungITGeraete') }}</h4>
              </v-col>
            </v-row>
            <v-row v-if="displayAufteilungITGeraete">
              <v-col>
                <bar-chart
                  ref="bar-itgeraete"
                  :chart-data="chartdataITGeraeteBar"
                  :options="optionsITGeraeteBar"
                />
              </v-col>
            </v-row>
          </div>
        </div>

        <!-- Aufteilung Energie -->
        <v-row>
          <v-col class="d-flex justify-center">
            <h4>
              {{ $t('evaluation.surveyEvaluation.AufteilungNachEnergieart') }}
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">
                    mdi-alert-circle-outline
                  </v-icon>
                </template>
                {{ $t('evaluation.surveyEvaluation.AufteilungNachEnergieart_tooltip') }}
              </v-tooltip>
            </h4>
          </v-col>
        </v-row>
        <v-row v-if="!displayEnergieCharts">
          <v-col>
            <v-alert
              type="warning"
            >
              {{ $t('evaluation.surveyEvaluation.KeineEmissionenAuswertung') }}
            </v-alert>
          </v-col>
        </v-row>
        <v-row v-if="displayEnergieCharts">
          <v-col>
            <doughnut-chart
              ref="doughnut-energie"
              :chart-data="chartdataEnergieDoughnut"
              :options="optionsEnergieDoughnut"
            />
          </v-col>
          <v-col>
            <bar-chart
              ref="bar-energie"
              :chart-data="chartdataEnergieBar"
              :options="optionsEnergieBar"
            />
          </v-col>
        </v-row>

        <!-- Aufteilung Verbrauch -->
        <v-row>
          <v-col class="d-flex justify-center">
            <h4>
              {{ $t('evaluation.surveyEvaluation.DarstellungEnergieverbrauch') }}
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">
                    mdi-alert-circle-outline
                  </v-icon>
                </template>
                {{ $t('evaluation.surveyEvaluation.DarstellungEnergieverbrauch_tooltip') }}
              </v-tooltip>
            </h4>
          </v-col>
        </v-row>
        <v-row v-if="!displayEnergieCharts">
          <v-col>
            <v-alert
              type="warning"
            >
              {{ $t('evaluation.surveyEvaluation.DarstellungEnergieverbrauchWarning') }}
            </v-alert>
          </v-col>
        </v-row>
        <v-row v-if="displayEnergieCharts">
          <v-col>
            <doughnut-chart
              ref="doughnut-verbrauch"
              :chart-data="chartdataVerbrauchDoughnut"
              :options="optionsVerbrauchDoughnut"
            />
          </v-col>
          <v-col>
            <bar-chart
              ref="bar-verbrauch"
              :chart-data="chartdataVerbrauchBar"
              :options="optionsVerbrauchBar"
            />
          </v-col>
        </v-row>

        <!-- Nachhaltigkeitstipps -->
        <v-row>
          <v-col>
            <v-alert 
              text
              type="info"
            >
              {{ $t('evaluation.surveyEvaluation.NachhaltigkeitTipps_0') }}<a
                :href="$t('evaluation.surveyEvaluation.NachhaltigkeitTipps_Link')"
                target="_blank"
                style="color:hsl(229, 100%, 50%);"
              >{{ $t('evaluation.surveyEvaluation.NachhaltigkeitTipps_1') }}</a>{{ $t('evaluation.surveyEvaluation.NachhaltigkeitTipps_2') }}
            </v-alert>
          </v-col>
        </v-row>

        <!-- Spreadsheet and Link Sharing -->
        <v-row>
          <v-btn
            class="ml-8 align-self-center"
            color="primary"
            @click="makeSpreadsheet"
          >
            <v-icon left>
              mdi-file-chart-outline
            </v-icon>{{ $t('evaluation.surveyEvaluation.DownloadAlsExcel') }}
          </v-btn>

          <v-switch
            v-if="!this.$props.shared"
            v-model="responsedata.auswertungFreigegeben"
            class="ml-8"
            inset
            :label="`${$t('evaluation.surveyEvaluation.Linksharing_0') + ' ' + (responsedata.auswertungFreigegeben ? $t('evaluation.surveyEvaluation.aktiviert') : $t('evaluation.surveyEvaluation.deaktiviert'))}`"
            @click="updateFlipLinkShare"
          />
        </v-row>
      </v-container>
    </v-card>

    <v-card
      v-if="showLoading || responsedata.auswertungFreigegeben"
      class="mx-auto"
      :max-width="constants.v_card_max_width"
    >
      <LoadingAnimation v-if="showLoading" />
      <LinkSharingComponent
        v-if="!this.$props.shared && responsedata.auswertungFreigegeben && !showLoading"
        :mitarbeiter-link="linkshareBaseURL + responsedata.id"
        :link-ziel="$t('evaluation.surveyEvaluation.Auswertung')"
      />
    </v-card>

    <v-card
      v-if="responseNotSuccessful"
      elevation="2"
      outlined
      class="mx-auto"
      :max-width="constants.v_card_max_width"
    >
      <v-card-title>Error {{ responseerror.code }}: {{ responseerror.message }}</v-card-title>
    </v-card>
  </v-container>
</template>

<script>
import DoughnutChart from "../charts/DoughnutChart.js";
import BarChart from "../charts/BarChart.js";
import XLSX from "xlsx";
import saveAs from 'file-saver';
import LoadingAnimation from "../componentParts/LoadingAnimation.vue";
import LinkSharingComponent from "../componentParts/LinkSharingComponent.vue";
import DataGapVisualization from '../componentParts/DataGapVisualization.vue';
import i18n from "@/i18n";
import { translateGebaeudeIDToSymbolic, getITGeraeteLabelMap, getDienstreisenLabelMap, getPendelwegeLabelMap } from "../../utils";
import constants from "../../const.js";


export default {
  name: "SurveyEvaluation",

  components: {
    DoughnutChart,
    BarChart,
    LoadingAnimation,
    LinkSharingComponent,
    DataGapVisualization,
  },

  props: {
    umfrageid: {
      default: "",
      type: String,
    },
    shared: {
      default: false,
      type: Boolean,
    },
  },

  data() {
    return {
      constants: constants,
      responsesuccessful: false,
      responseNotSuccessful: false,
      responsedata: {
        id: null,
        bezeichnung: null,
        jahr: null,
        mitarbeiteranzahl: null,
        umfragenanzahl: null,
        umfragenanteil: null,
        auswertungFreigegeben: null,

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
        emissionenDienstreisenAufgeteilt: null,
        emissionenPendelwegeAufgeteilt: null,
        emissionenITGeraeteAufgeteilt: null,

        verbrauchWaerme: null,
        verbrauchStrom: null,
        verbrauchKaelte: null,
        verbrauchEnergie: null,

        vergleich2PersonenHaushalt: null,
        vergleich4PersonenHaushalt: null,
      },
      responseerror: {
        code: null,
        message: null,
      },
      // for link sharing
      displaySuccess: false,
      showLoading: false,

      // base url for Mitarbeiterumfragen
      linkshareBaseURL: process.env.VUE_APP_URL + '/survey/results/',

      // display charts
      displayEnergieCharts: true,
      displayAufteilungDienstreisen: true,
      displayAufteilungPendelwege: true,
      displayAufteilungITGeraete: true,

      // specific chart options and data
      chartdataGesamtDoughnut: null,
      optionsGesamtDoughnut: null,

      chartdataGesamtBar: null,
      optionsGesamtBar: null,

      chartdataEnergieDoughnut: null,
      optionsEnergieDoughnut: null,

      chartdataEnergieBar: null,
      optionsEnergieBar: null,

      chartdataVerbrauchDoughnut: null,
      optionsVerbrauchDoughnut: null,

      chartdataVerbrauchBar: null,
      optionsVerbrauchBar: null,

      chartdataDienstreisenBar: null,
      optionsDienstreisenBar: null,

      chartdataPendelwegeBar: null,
      optionsPendelwegeBar: null,

      chartdataITGeraeteBar: null,
      optionsITGeraeteBar: null,

      // general options for all charts
      generalChartdataBar: {
        labels: [],
        datasets: [{
          type: 'bar',
          label: i18n.t('common.Emissionen'),
          yAxisID: 'bar',
          data: [],
          backgroundColor: [],
          borderWidth: 1,
          order: 1,
          datalabels: {
            color: 'black',
            align: 'end',
            anchor: 'start',
          },
          barTickness: "flex",
          maxBarThickness: this.barWidth,
        }]
      },
      generalOptionsBar: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        plugins: {
          datalabels: {
            display: true,
            font: {   // font for numbers on bars
              size: 14,
              // weight: 'bold',
            },
          },
        },
        scales: {
          yAxes: [{
            id: 'bar',
            position: 'left',
            ticks: {          // font for numbers on y-axis
              fontColor: "black",
              fontSize: 13,   // default is 12
              // fontStyle: "bold",
              beginAtZero: true
            },
            scaleLabel: {     // font for label on y-axis
              display: true,
              labelString: i18n.t('evaluation.surveyEvaluation.tCO2eq'),
              fontColor: "black",
              fontSize: 13,
            }
          }],
          xAxes: [{ // font for labels on x-axis
            ticks: {
              fontColor: "black",
            },
          }]
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              let idx = tooltipItem.index;
              return i18n.t('common.Emissionen') + ": " + i18n.n(data.datasets[0].data[idx], "decimal")
            }
          }
        }
      },

      generalChartdataDoughnut: {
        labels: [],
        datasets: [{
          label: i18n.t('common.Emissionen'),
          data: [],
          backgroundColor: [],
          hoverOffset: 4,
        }]
      },
      generalOptionsDoghnut: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          labels: {
            fontColor: 'black',
            fontSize: 13,
          }
        },
        plugins: {
          datalabels: {   // formatter is set individually for each chart
            display: true,
            font: {
              weight: 'bold',
              size: 14,
              color: 'black',
            },
          },
        },
        tooltips: {
          callbacks: {
              label: function(tooltipItem, data) {
                  let idx = tooltipItem.index;
                  return data.labels[idx] + ": " + i18n.n(data.datasets[0].data[idx], "decimal")
              }
          }
        }
      },

      // for data gap visualization
      umfrageGebaeude: [],
      gebaeudeIDsUndZaehler: [],
      zaehler: [],

      // for dynamic bar resizing
      barWidth: null,
      resizeTimout: null,

      chartList: [  // emission needs to be correct variable name
        {
          "emission": "this.responsedata.emissionenDienstreisen",
          "ref": "bar-dienstreisen",
        },
        {
          "emission": "this.responsedata.emissionenPendelwege",
          "ref": "bar-pendelwege",
        },
        {
          "emission": "this.responsedata.emissionenITGeraete",
          "ref": "bar-itgeraete",
        },
      ]
    }
  },

  computed: {
    haushalteReferenzText: function () {
      let base_text_beginning = i18n.t('evaluation.surveyEvaluation.HaushaltReferenzText_0');
      let base_text_middle = i18n.t('evaluation.surveyEvaluation.HaushaltReferenzText_1');
      let text_zweiPersonenHaushalt = i18n.n(this.responsedata.vergleich2PersonenHaushalt, 'decimal') + i18n.t('evaluation.surveyEvaluation.HaushaltReferenzText_3');
      let text_vierPersonenHaushalt = i18n.n(this.responsedata.vergleich4PersonenHaushalt, 'decimal') + i18n.t('evaluation.surveyEvaluation.HaushaltReferenzText_4');
      let base_text_ending = i18n.t('evaluation.surveyEvaluation.HaushaltReferenzText_2')
      return base_text_beginning + text_vierPersonenHaushalt + base_text_middle + text_zweiPersonenHaushalt + base_text_ending;
    },
    displayExtrapolationWarning: function () {
      return this.responsedata.umfragenanteil <= 50.0
    },
  },

  watch: {
    '$i18n.locale': function() {  // reload charts when language changes to update labels
      this.setChartData();
    },
  },

  async mounted() { 
    await this.getData();
    this.initializeCharts();
    this.setChartData();
  },

  created() {
    window.addEventListener("resize", this.resizeEventHandler);
  },

  destroyed() {
    window.removeEventListener("resize", this.resizeEventHandler);
  },

  methods: {
    /**
     * Eventhandler for window resizing events
     */
    resizeEventHandler() {
      if (this.resizeTimout != null) {  // uses timeouts for debouncing
        clearTimeout(this.resizeTimout)
      }
      this.resizeTimout = setTimeout(() => {
        this.setChartData();
      }, 250)
    },

    /**
     * Helper function to access a variable by its name.
     */
    accessVariable: function (variable) {
      return eval(variable)
    },

    /**
     * Fetches Get request to get survey data and evaluation.
     */
    getData: async function () {
      await fetch(process.env.VUE_APP_BASEURL + "/auswertung?id=" + this.$props.umfrageid, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + this.$keycloak.token,
        },
      }).then((response) => response.json())
        .then((body) => {
          if (body.status == "success") {
            this.responseSuccessful = true
            this.responsedata = body.data
            this.responsedata.auswertungFreigegeben = (body.data.auswertungFreigegeben == 1) ? true : false
            this.displayCharts();
            this.roundResponseData();

            this.gebaeudeIDsUndZaehler = this.responsedata.gebaeudeIDsUndZaehler
            this.umfrageGebaeude = this.responsedata.umfrageGebaeude.map(x => [translateGebaeudeIDToSymbolic(x["gebaeudeNr"]), x["nutzflaeche"]])
            this.zaehler = this.responsedata.zaehler
          }
          else {  // Fehlerbehandlung
            this.responseNotSuccessful = true
            this.responseerror = body.error
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        }
      );
    },

    /**
     * Method checks which charts should be displayed based on the response data.
     */
    displayCharts: function () {
      // negative values indicate that no data is available
      if (this.responsedata.emissionenWaerme < 0 || this.responsedata.emissionenKaelte < 0 || this.responsedata.emissionenStrom < 0) {
        this.displayEnergieCharts = false;
      }
      if (this.responsedata.verbrauchWaerme < 0 || this.responsedata.verbrauchKaelte < 0 || this.responsedata.verbrauchStrom < 0) {
        this.displayEnergieCharts = false;
      }

      // checks length of object to determine if there is data available
      this.displayAufteilungDienstreisen = Object.keys(this.responsedata.emissionenDienstreisenAufgeteilt).length > 0
      this.displayAufteilungPendelwege = Object.keys(this.responsedata.emissionenPendelwegeAufgeteilt).length > 0
      this.displayAufteilungITGeraete = Object.keys(this.responsedata.emissionenITGeraeteAufgeteilt).length > 0

      // sort charts based on emission values
      this.chartList.sort((a, b) => {
        return eval(b.emission) - eval(a.emission)
      })
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

      Object.keys(this.responsedata.emissionenDienstreisenAufgeteilt).forEach(key => {
        this.responsedata.emissionenDienstreisenAufgeteilt[key] = Math.round(this.responsedata.emissionenDienstreisenAufgeteilt[key] / roundFactor1) / roundFactor2
      })
      Object.keys(this.responsedata.emissionenITGeraeteAufgeteilt).forEach(key => {
        this.responsedata.emissionenITGeraeteAufgeteilt[key] = Math.round(this.responsedata.emissionenITGeraeteAufgeteilt[key] / roundFactor1) / roundFactor2
      })
      Object.keys(this.responsedata.emissionenPendelwegeAufgeteilt).forEach(key => {
        this.responsedata.emissionenPendelwegeAufgeteilt[key] = Math.round(this.responsedata.emissionenPendelwegeAufgeteilt[key] / roundFactor1) / roundFactor2
      })

      this.responsedata.umfragenanteil = Math.round(this.responsedata.umfragenanteil * 1000) / 10
      this.responsedata.vergleich2PersonenHaushalt = Math.round(this.responsedata.vergleich2PersonenHaushalt * 100) / 100
      this.responsedata.vergleich4PersonenHaushalt = Math.round(this.responsedata.vergleich4PersonenHaushalt * 100) / 100
    },

    /**
     * Method initializes chartdata and options for all charts by deep copying the general chartdata and options.
     */
    initializeCharts: function () {
      this.chartdataGesamtDoughnut = JSON.parse(JSON.stringify(this.generalChartdataDoughnut));
      this.optionsGesamtDoughnut = JSON.parse(JSON.stringify(this.generalOptionsDoghnut));
      this.chartdataGesamtBar = JSON.parse(JSON.stringify(this.generalChartdataBar));
      this.optionsGesamtBar = JSON.parse(JSON.stringify(this.generalOptionsBar));

      this.chartdataEnergieDoughnut = JSON.parse(JSON.stringify(this.generalChartdataDoughnut));
      this.optionsEnergieDoughnut = JSON.parse(JSON.stringify(this.generalOptionsDoghnut));
      this.chartdataEnergieBar = JSON.parse(JSON.stringify(this.generalChartdataBar));
      this.optionsEnergieBar = JSON.parse(JSON.stringify(this.generalOptionsBar));

      this.chartdataVerbrauchDoughnut = JSON.parse(JSON.stringify(this.generalChartdataDoughnut));
      this.optionsVerbrauchDoughnut = JSON.parse(JSON.stringify(this.generalOptionsDoghnut));
      this.chartdataVerbrauchBar = JSON.parse(JSON.stringify(this.generalChartdataBar));
      this.optionsVerbrauchBar = JSON.parse(JSON.stringify(this.generalOptionsBar)); 

      this.chartdataDienstreisenBar = JSON.parse(JSON.stringify(this.generalChartdataBar));
      this.optionsDienstreisenBar = JSON.parse(JSON.stringify(this.generalOptionsBar));

      this.chartdataPendelwegeBar = JSON.parse(JSON.stringify(this.generalChartdataBar));
      this.optionsPendelwegeBar = JSON.parse(JSON.stringify(this.generalOptionsBar));

      this.chartdataITGeraeteBar = JSON.parse(JSON.stringify(this.generalChartdataBar));
      this.optionsITGeraeteBar = JSON.parse(JSON.stringify(this.generalOptionsBar));
    },

    /**
     * Helper function to call all setChart functions and compute the current bar width.
     */
    setChartData: function() {
      this.computeBarWidth();
      
      this.generalChartdataBar.datasets[0].maxBarThickness = this.barWidth
      this.chartdataDienstreisenBar.datasets[0].maxBarThickness = this.barWidth
      this.chartdataPendelwegeBar.datasets[0].maxBarThickness = this.barWidth
      this.chartdataITGeraeteBar.datasets[0].maxBarThickness = this.barWidth
      this.chartdataEnergieBar.datasets[0].maxBarThickness = this.barWidth
      this.chartdataVerbrauchBar.datasets[0].maxBarThickness = this.barWidth
      this.chartdataGesamtBar.datasets[0].maxBarThickness = this.barWidth

      this.setChartGesamt();
      if (this.displayEnergieCharts){
        this.setChartEnergie();
        this.setChartVerbrauch();
      }
      if (this.displayAufteilungDienstreisen){
        this.setChartDienstreisen();
      }
      if (this.displayAufteilungPendelwege){
        this.setChartPendelwege();
      }
      if (this.displayAufteilungITGeraete){
        this.setChartITGeraete();
      }
    },

    /**
     * Computes the bar width for the bar charts based on the current canvas with and number of bars to display.
     */
    computeBarWidth: function() {
      let maxBars = Math.max(Object.keys(this.responsedata.emissionenDienstreisenAufgeteilt).length, Object.keys(this.responsedata.emissionenPendelwegeAufgeteilt).length, Object.keys(this.responsedata.emissionenITGeraeteAufgeteilt).length)

      let chartWidths = ["bar-dienstreisen", "bar-pendelwege", "bar-itgeraete"].map(x => this.$refs[x] ? this.$refs[x][0].$refs.canvas.width : 0)
      let chartWidth = Math.max(...chartWidths)

      let halfChartWidth = this.$refs["bar-gesamt"].$refs.canvas.width

      if (chartWidth == 0) {
        this.barWidth = halfChartWidth / 4 * 0.75
      } else {
        this.barWidth = Math.min(chartWidth / maxBars * 0.75, halfChartWidth / 4 * 0.75)
      }
    },

    /**
     * Method sets data and options for the Gesamt charts.
     */
    setChartGesamt: function () {
      let data = [
        { label: i18n.t('common.Energie'), value: this.responsedata.emissionenEnergie, color: 'rgb(255, 99, 132)' },
        { label: i18n.t('common.Dienstreisen'), value: this.responsedata.emissionenDienstreisen, color: 'rgb(54, 162, 235)' },
        { label: i18n.t('common.Pendelwege'), value: this.responsedata.emissionenPendelwege, color: 'rgb(255, 205, 86)' },
        { label: i18n.t('common.ITGeraete'), value: this.responsedata.emissionenITGeraete, color: 'rgb(75, 192, 192)' },
      ];
      data.sort((a, b) => b.value - a.value)

      this.chartdataGesamtDoughnut.labels = data.map(a => a.label);
      this.chartdataGesamtDoughnut.datasets[0].data = data.map(a => a.value);
      this.chartdataGesamtDoughnut.datasets[0].backgroundColor = data.map(a => a.color);
      
      this.optionsGesamtDoughnut.plugins.datalabels.formatter = (value) => {
        if(this.responsedata.emissionenGesamt === 0){
          return 0
        }
        return i18n.n((Math.round(value / this.responsedata.emissionenGesamt * 1000) / 10), "decimal") + '%';
      }

      this.chartdataGesamtBar.labels = data.map(a => a.label);
      this.chartdataGesamtBar.datasets[0].data = data.map(a => a.value);
      this.chartdataGesamtBar.datasets[0].backgroundColor = data.map(a => a.color);

      this.optionsGesamtBar.plugins.datalabels.formatter = (value) => {
        return i18n.n(value, "decimal");
      }

      this.$refs["doughnut-gesamt"].updateChart()
      this.$refs["bar-gesamt"].updateChart()
    },

    /**
     * Method sets data and options for the Energie charts.
     */
    setChartEnergie: function () {
      let data = [
        { label: i18n.t('common.Waerme'), value: this.responsedata.emissionenWaerme, color: 'rgb(240, 128, 128)' },
        { label: i18n.t('common.Kaelte'), value: this.responsedata.emissionenKaelte, color: 'rgb(0, 204, 255)' },
        { label: i18n.t('common.Strom'), value: this.responsedata.emissionenStrom, color: 'rgb(255, 219, 77)' },
      ];

      data.sort((a, b) => b.value - a.value)

      this.chartdataEnergieDoughnut.labels = data.map(a => a.label);
      this.chartdataEnergieDoughnut.datasets[0].data = data.map(a => a.value);
      this.chartdataEnergieDoughnut.datasets[0].backgroundColor = data.map(a => a.color);

      this.optionsEnergieDoughnut.plugins.datalabels.formatter = (value) => {
        if(this.responsedata.emissionenEnergie === 0){
          return 0
        }
        return i18n.n((Math.round(value / this.responsedata.emissionenEnergie * 1000) / 10), "decimal") + '%';
      }

      this.chartdataEnergieBar.labels = data.map(a => a.label);
      this.chartdataEnergieBar.datasets[0].data = data.map(a => a.value);
      this.chartdataEnergieBar.datasets[0].backgroundColor = data.map(a => a.color);

      this.optionsEnergieBar.plugins.datalabels.formatter = (value) => {
        return i18n.n(value, "decimal");
      }

      this.$refs["doughnut-energie"].updateChart()
      this.$refs["bar-energie"].updateChart()
    },

    /**
     * Method sets data and options for the Energieverbrauch charts.
     */
    setChartVerbrauch: function () {
      let data = [
        { label: i18n.t('common.Waerme'), value: this.responsedata.verbrauchWaerme, color: 'rgb(240, 128, 128)'},
        { label: i18n.t('common.Kaelte'), value: this.responsedata.verbrauchKaelte, color:  'rgb(0, 204, 255)'},
        { label: i18n.t('common.Strom'), value: this.responsedata.verbrauchStrom, color: 'rgb(255, 219, 77)' },
      ];

      data.sort((a, b) => b.value - a.value)

      this.chartdataVerbrauchDoughnut.labels = data.map(a => a.label);
      this.chartdataVerbrauchDoughnut.datasets[0].label = i18n.t('evaluation.surveyEvaluation.kWh')
      this.chartdataVerbrauchDoughnut.datasets[0].data = data.map(a => a.value);
      this.chartdataVerbrauchDoughnut.datasets[0].backgroundColor = data.map(a => a.color);

      this.optionsVerbrauchDoughnut.plugins.datalabels.formatter = (value) => {
        if(this.responsedata.verbrauchEnergie === 0){
          return 0
        }
        return i18n.n((Math.round(value / this.responsedata.verbrauchEnergie * 1000) / 10), "decimal") + '%';
      }

      this.chartdataVerbrauchBar.labels = data.map(a => a.label);
      this.chartdataVerbrauchBar.datasets[0].label = i18n.t('evaluation.surveyEvaluation.kWh')
      this.chartdataVerbrauchBar.datasets[0].data = data.map(a => a.value);
      this.chartdataVerbrauchBar.datasets[0].backgroundColor = data.map(a => a.color);

      this.optionsVerbrauchBar.scales.yAxes[0].scaleLabel.labelString = i18n.t('evaluation.surveyEvaluation.kWh')
      this.optionsVerbrauchBar.tooltips.callbacks.label = function(tooltipItem, data) {
        let idx = tooltipItem.index;
        return i18n.t('common.Verbrauch') + ": " + i18n.n(data.datasets[0].data[idx], "decimal")
      }
      this.optionsVerbrauchBar.plugins.datalabels.formatter = (value) => {
        return i18n.n(value, "decimal");
      }

      this.$refs["doughnut-verbrauch"].updateChart()
      this.$refs["bar-verbrauch"].updateChart()
    },

    /**
     * Method sets data and options for the Dienstreisen charts.
     */
    setChartDienstreisen: function () {
      let data = []

      let dienstreisenAufgeteilt = this.responsedata.emissionenDienstreisenAufgeteilt
      let labelMap = getDienstreisenLabelMap()

      Object.keys(dienstreisenAufgeteilt).forEach(function(key) {
        let labelParts = key.split("-")
        let label = labelMap.get(labelParts[0]) + (labelParts[1] ? " - " + labelMap.get(labelParts[1]) : "")
        data.push({label: label, value: dienstreisenAufgeteilt[key], color: 'rgb(54,162,235)'})
      })

      data.sort((a, b) => b.value - a.value)

      this.chartdataDienstreisenBar.labels = data.map(a => a.label);
      this.chartdataDienstreisenBar.datasets[0].data = data.map(a => a.value);
      this.chartdataDienstreisenBar.datasets[0].backgroundColor = data.map(a => a.color);

      this.optionsDienstreisenBar.plugins.datalabels.formatter = (value) => {
        return i18n.n(value, "decimal");
      }

      this.$refs["bar-dienstreisen"][0].updateChart()
    },

    /**
     * Method sets data and options for the Pendelwege charts.
     */
    setChartPendelwege: function () {
      let data = []

      let pendelwegeAufgeteilt = this.responsedata.emissionenPendelwegeAufgeteilt
      let labelMap = getPendelwegeLabelMap()
      Object.keys(pendelwegeAufgeteilt).forEach(function(key) {
        data.push({label: labelMap.get(key), value: pendelwegeAufgeteilt[key], color: 'rgb(255, 205, 86)'})
      })

      data.sort((a, b) => b.value - a.value)

      this.chartdataPendelwegeBar.labels = data.map(a => a.label);
      this.chartdataPendelwegeBar.datasets[0].data = data.map(a => a.value);
      this.chartdataPendelwegeBar.datasets[0].backgroundColor = data.map(a => a.color);

      this.optionsPendelwegeBar.plugins.datalabels.formatter = (value) => {
        return i18n.n(value, "decimal");
      }

      this.$refs["bar-pendelwege"][0].updateChart()
    },

    /**
     * Method sets data and options for the ITGeraete charts.
     */
    setChartITGeraete: function () {
      let data = []

      let itGeraeteAufgeteilt = this.responsedata.emissionenITGeraeteAufgeteilt
      let labelMap = getITGeraeteLabelMap()
      Object.keys(itGeraeteAufgeteilt).forEach(function(key) {
        data.push({label: labelMap.get(key), value: itGeraeteAufgeteilt[key], color: 'rgb(75, 192, 192)'})
      })

      data.sort((a, b) => b.value - a.value)

      this.chartdataITGeraeteBar.labels = data.map(a => a.label);
      this.chartdataITGeraeteBar.datasets[0].data = data.map(a => a.value);
      this.chartdataITGeraeteBar.datasets[0].backgroundColor = data.map(a => a.color);

      this.optionsITGeraeteBar.plugins.datalabels.formatter = (value) => {
        return i18n.n(value, "decimal");
      }

      this.$refs["bar-itgeraete"][0].updateChart()
    },

    /**
     * updateFlipLinkShare sendet eine POST update Request ans Backend, wodurch das Link Sharing für diese Umfrage aktiviert wird, wenn es aktuell deaktiviert ist
     * bzw. deaktiviert wenn es gerade aktiviert ist.
     * Im Erfolgsfall wird eine Erfolgsnachricht angezeigt und sonst eine Fehlermeldung.
     * Der lokal gespeicherte LinkShare Wert wird angepasst.
     */
    updateFlipLinkShare: async function() {
      this.showLoading = true;
      this.displaySuccess = false;

      await fetch(process.env.VUE_APP_BASEURL + "/auswertung/updateLinkShare", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + this.$keycloak.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          umfrageID: this.$props.umfrageid,
          // freigabewert 0 ist teilen deaktiviert, 1 aktiviert und wir flippen hier
          freigabewert: ((this.responsedata.auswertungFreigegeben) ? 1 : 0),
        }),
      }).then((response) => response.json())
        .then((body) => {
          this.showLoading = false
          if (body.status == "success") {
            this.displaySuccess = true
        }
        else {  // Fehlerbehandlung
          this.showLoading = false
          this.responseNotSuccessful = true
          this.responseerror = body.error
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    },

    /**
     * Creates XLSX file and makes it downloadable.
     */
    makeSpreadsheet: function () {
      var data = [
        {
          "col1": i18n.t('evaluation.surveyEvaluation.MakeSpreadsheet_0'),
        },
        {
          "col1": i18n.t('common.Jahr'),
          "col2": this.responsedata.jahr,
        },
        {
          "col1": i18n.t('common.Mitarbeitendenzahl'),
          "col2": this.responsedata.mitarbeiteranzahl,
        },
        {
          "col1":  i18n.t('evaluation.surveyEvaluation.AusgefuellteMitarbeiterumfragen'),
          "col2": this.responsedata.umfragenanzahl,
        },
        {
          "col1": i18n.t('evaluation.surveyEvaluation.MakeSpreadsheet_1'),
          "col2": this.responsedata.umfragenanteil + "%",
        },
        {},
        {
          "col1": i18n.t('evaluation.surveyEvaluation.MakeSpreadsheet_2'),
          "col2": i18n.t('evaluation.surveyEvaluation.tCO2eq'),
        },
        {
          "col1": i18n.t('evaluation.surveyEvaluation.MakeSpreadsheet_3'),
          "col2": this.responsedata.emissionenGesamt,
        },
        {
          "col1": i18n.t('evaluation.surveyEvaluation.MakeSpreadsheet_4'),
          "col2": this.responsedata.emissionenProMitarbeiter,
        },
        {},
        {
          "col1": i18n.t('evaluation.surveyEvaluation.MakeSpreadsheet_5'),
          "col2": this.responsedata.vergleich4PersonenHaushalt,
        },
        {
          "col1": i18n.t('evaluation.surveyEvaluation.MakeSpreadsheet_6'),
          "col2": this.responsedata.vergleich2PersonenHaushalt,
        },
        {},
        {
          "col1": i18n.t('evaluation.surveyEvaluation.MakeSpreadsheet_7'),
          "col2": i18n.t('evaluation.surveyEvaluation.tCO2eq'),
          "col3": "%",
        },
        {
          "col1": i18n.t('common.Energie'),
          "col2": this.responsedata.emissionenEnergie,
          "col3": this.responsedata.emissionenGesamt === 0.0 ? 0 : Math.round(this.responsedata.emissionenEnergie / this.responsedata.emissionenGesamt * 1000) / 10,
        },
        {
          "col1": i18n.t('common.Pendelwege'),
          "col2": this.responsedata.emissionenPendelwege,
          "col3": this.responsedata.emissionenGesamt === 0.0 ? 0 : Math.round(this.responsedata.emissionenPendelwege / this.responsedata.emissionenGesamt * 1000) / 10,
        },
        {
          "col1": i18n.t('common.Dienstreise'),
          "col2": this.responsedata.emissionenDienstreisen,
          "col3": this.responsedata.emissionenGesamt === 0.0 ? 0 : Math.round(this.responsedata.emissionenDienstreisen / this.responsedata.emissionenGesamt * 1000) / 10,
        },
        {
          "col1": i18n.t('common.ITGeraete'),
          "col2": this.responsedata.emissionenITGeraete,
          "col3": this.responsedata.emissionenGesamt === 0.0 ? 0 : Math.round(this.responsedata.emissionenITGeraete / this.responsedata.emissionenGesamt * 1000) / 10
        },
        {},
        {
          "col1": i18n.t('evaluation.surveyEvaluation.MakeSpreadsheet_8'),
          "col2": i18n.t('evaluation.surveyEvaluation.tCO2eq'),
          "col3": "%",
        },
        {
          "col1": i18n.t('common.Waerme'),
          "col2": this.responsedata.emissionenWaerme,
          "col3": this.responsedata.emissionenEnergie === 0.0 ? 0 : Math.round(this.responsedata.emissionenWaerme / this.responsedata.emissionenEnergie * 1000) / 10,
        },
        {
          "col1": i18n.t('common.Kaelte'),
          "col2": this.responsedata.emissionenKaelte,
          "col3": this.responsedata.emissionenEnergie === 0.0 ? 0 : Math.round(this.responsedata.emissionenKaelte / this.responsedata.emissionenEnergie * 1000) / 10,
        },
        {
          "col1": i18n.t('common.Strom'),
          "col2": this.responsedata.emissionenStrom,
          "col3": this.responsedata.emissionenEnergie === 0.0 ? 0 : Math.round(this.responsedata.emissionenStrom / this.responsedata.emissionenEnergie * 1000) / 10,
        },
        {},
        {
          "col1": i18n.t('evaluation.surveyEvaluation.MakeSpreadsheet_9'),
          "col2": i18n.t('evaluation.surveyEvaluation.kWh'),
          "col3": "%",
        },
        {
          "col1": i18n.t('common.Waerme'),
          "col2": this.responsedata.verbrauchWaerme,
          "col3": this.responsedata.verbrauchEnergie === 0.0 ? 0 : Math.round(this.responsedata.verbrauchWaerme / this.responsedata.verbrauchEnergie * 1000) / 10,
        },
        {
          "col1": i18n.t('common.Kaelte'),
          "col2": this.responsedata.verbrauchKaelte,
          "col3": this.responsedata.verbrauchEnergie === 0.0 ? 0 : Math.round(this.responsedata.verbrauchKaelte / this.responsedata.verbrauchEnergie * 1000) / 10,
        },
        {
          "col1": i18n.t('common.Strom'),
          "col2": this.responsedata.verbrauchStrom,
          "col3": this.responsedata.verbrauchEnergie === 0.0 ? 0 : Math.round(this.responsedata.verbrauchStrom / this.responsedata.verbrauchEnergie * 1000) / 10,
        },
      ];

      data = data.concat([
        {},
        {
          "col1": i18n.t('evaluation.surveyEvaluation.MakeSpreadsheet_11'),
          "col2": i18n.t('evaluation.surveyEvaluation.tCO2eq'),
          "col3": "%",
        },
      ])
      let dienstreisenAufgeteilt = this.responsedata.emissionenDienstreisenAufgeteilt
      let labelMap = getDienstreisenLabelMap()
      let emissionen = this.responsedata.emissionenDienstreisen
      Object.keys(dienstreisenAufgeteilt).forEach(function(key) {
        let labelParts = key.split("-")
        let label = labelMap.get(labelParts[0]) + (labelParts[1] ? " - " + labelMap.get(labelParts[1]) : "")
        data.push({
          "col1": label, 
          "col2": dienstreisenAufgeteilt[key],
          "col3": emissionen === 0.0 ? 0 : Math.round(dienstreisenAufgeteilt[key] / emissionen * 1000) / 10
        })
      })

      data = data.concat([
        {},
        {
          "col1": i18n.t('evaluation.surveyEvaluation.MakeSpreadsheet_12'),
          "col2": i18n.t('evaluation.surveyEvaluation.tCO2eq'),
          "col3": "%",
        },
      ])
      let pendelwegeAufgeteilt = this.responsedata.emissionenPendelwegeAufgeteilt
      labelMap = getPendelwegeLabelMap()
      emissionen = this.responsedata.emissionenPendelwege
      Object.keys(pendelwegeAufgeteilt).forEach(function(key) {
        data.push({
          "col1": labelMap.get(key), 
          "col2": pendelwegeAufgeteilt[key],
          "col3": emissionen === 0.0 ? 0 : Math.round(pendelwegeAufgeteilt[key] / emissionen * 1000) / 10
        })
      })

      data = data.concat([
        {},
        {
          "col1": i18n.t('evaluation.surveyEvaluation.MakeSpreadsheet_13'),
          "col2": i18n.t('evaluation.surveyEvaluation.tCO2eq'),
          "col3": "%",
        },
      ])
      let itGeraeteAufgeteilt = this.responsedata.emissionenITGeraeteAufgeteilt
      labelMap = getITGeraeteLabelMap()
      emissionen = this.responsedata.emissionenITGeraete
      Object.keys(itGeraeteAufgeteilt).forEach(function(key) {
        data.push({
          "col1": labelMap.get(key), 
          "col2": pendelwegeAufgeteilt[key],
          "col3": emissionen === 0.0 ? 0 : Math.round(itGeraeteAufgeteilt[key] / emissionen * 1000) / 10
        })
      })

      var options = {
        header: ["col1", "col2", "col3"],
        skipHeader: true,
      }

      // workbook
      var wb = XLSX.utils.book_new();
      wb.Props = {
        Title: i18n.t('evaluation.surveyEvaluation.MakeSpreadsheet_10'),
        CreatedDate: new Date()
      };
      wb.SheetNames.push(i18n.t('common.Emissionen'));

      // worksheet
      var ws = XLSX.utils.json_to_sheet(data, options);
      wb.Sheets[i18n.t('common.Emissionen')] = ws;

      var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

      function s2ab(s) {
        var buf = new ArrayBuffer(s.length);  //convert s to arrayBuffer
        var view = new Uint8Array(buf);       //create uint8array as viewer
        for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;  //convert to octet
        return buf;
      }

      saveAs(
        new Blob(
          [s2ab(wbout)], 
          { type: "application/octet-stream" }
        ), 
        i18n.t('common.Emissionen') + '_' + this.responsedata.bezeichnung + '.xlsx'
      );
    },
  },
}

</script>

<style>
.p{
  overflow: hidden; 
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>