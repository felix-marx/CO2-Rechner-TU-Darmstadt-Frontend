<template>
  <v-container>
    <v-card
      v-if="responseSuccessful"
      elevation="2"
      outlined
      class="pa-7"
    >
      <v-card-title>{{ $t('evaluation.surveyEvaluation.AuswertungDerUmfrage') }} "{{ responsedata.bezeichnung }}"</v-card-title>
      <v-divider />
      <v-container>
        <v-row>
          <v-col>
            <v-icon>
              mdi-calendar
            </v-icon>
            {{ $t('common.Bilanzierungsjahr') }} {{ responsedata.jahr }}
          </v-col>
          <v-col>
            <v-icon>
              mdi-account
            </v-icon>
            {{ $t('common.Mitarbeitendenzahl') }} {{ $n(responsedata.mitarbeiteranzahl, 'integer') }}
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
            : {{ haushalteReferenzText }}
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
              :chart-data="chartdataGesamtDoughnut"
              :options="optionsGesamtDoughnut"
            />
          </v-col>
          <v-col>
            <bar-chart
              ref="half-chart"
              :chart-data="chartdataGesamtPareto"
              :options="optionsGesamtPareto"
            />
          </v-col>
        </v-row>

        <!-- Aufteilung Dienstreisen -->
        <v-row>
          <v-col class="d-flex justify-center">
            <h4>{{ $t('evaluation.surveyEvaluation.AufteilungDienstreisen') }}</h4>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <bar-chart
              ref="chart"
              :chart-data="chartdataDienstreisenBar"
              :options="optionsDienstreisenBar"
            />
          </v-col>
        </v-row>

        <!-- Aufteilung Pendelwege -->
        <v-row>
          <v-col class="d-flex justify-center">
            <h4>{{ $t('evaluation.surveyEvaluation.AufteilungPendelwege') }}</h4>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <bar-chart
              :chart-data="chartdataPendelwegeBar"
              :options="optionsPendelwegeBar"
            />
          </v-col>
        </v-row>

        <!-- Aufteilung ITGeraete -->
        <v-row>
          <v-col class="d-flex justify-center">
            <h4>{{ $t('evaluation.surveyEvaluation.AufteilungITGeraete') }}</h4>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <bar-chart
              :chart-data="chartdataITGeraeteBar"
              :options="optionsITGeraeteBar"
            />
          </v-col>
        </v-row>

        <!-- Aufteilung Energieart -->
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
              :chart-data="chartdataEnergieDoughnut"
              :options="optionsEnergieDoughnut"
            />
          </v-col>
          <v-col>
            <bar-chart
              :chart-data="chartdataEnergieBar"
              :options="optionsEnergieBar"
            />
          </v-col>
        </v-row>

        <!-- Aufteilung Energieverbrauch -->
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
              :chart-data="chartdataVerbrauchDoughnut"
              :options="optionsVerbrauchDoughnut"
            />
          </v-col>
          <v-col>
            <bar-chart
              :chart-data="chartdataVerbrauchBar"
              :options="optionsVerbrauchBar"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-alert 
              text
              type="info"
            >
              {{ $t('evaluation.surveyEvaluation.NachhaltigkeitTipps_0') }}<a
                href="https://www.tu-darmstadt.de/nachhaltigkeit/buero_fuer_nachhaltigkeit/projekte_buero/news_projekte_buero_details_348992.de.jsp"
                target="_blank"
                style="color:hsl(229, 100%, 50%);"
              >{{ $t('evaluation.surveyEvaluation.NachhaltigkeitTipps_1') }}</a>{{ $t('evaluation.surveyEvaluation.NachhaltigkeitTipps_2') }}
            </v-alert>
          </v-col>
        </v-row>
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
            :label="`Linksharing ${(responsedata.auswertungFreigegeben ? $t('evaluation.surveyEvaluation.aktivieren') : $t('evaluation.surveyEvaluation.deaktivieren'))}`"
            @click="updateFlipLinkShare"
          />
        </v-row>
      </v-container>
    </v-card>

    <v-card
      v-if="showLoading || responsedata.auswertungFreigegeben"
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
import { translateGebaeudeIDToSymbolic } from "../../utils";


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
      responseSuccessful: false,
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
      // Wenn Link Sharing korrekt geflipped wurde
      displaySuccess: false,
      showLoading: false,

      // base url for Mitarbeiterumfragen
      linkshareBaseURL: process.env.VUE_APP_URL + '/survey/results/',

      displayEnergieCharts: true,

      chartdataGesamtDoughnut: null,
      optionsGesamtDoughnut: null,

      chartdataGesamtPareto: null,
      optionsGesamtPareto: null,

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

      // for data gap visualization
      umfrageGebaeude: [],
      gebaeudeIDsUndZaehler: [],
      zaehler: [],

      // for dynamic calculation of bar width
      maxBars: null,
      chartWidth: null,
      halfChartWidth: null,
      barWidth: null,
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
    itGeraeteLabelMap: function(){
      return  new Map([
        ["1", i18n.t('colleagueSurvey.colleagueSurvey.IT_Geraete_Notebooks')],
        ["2", i18n.t('colleagueSurvey.colleagueSurvey.IT_Geraete_Desktops')],
        ["3", i18n.t('colleagueSurvey.colleagueSurvey.IT_Geraete_Bildschirme')],
        ["4", i18n.t('userSurvey.Survey.ITGeraetIDDic_4')],
        ["5", i18n.t('colleagueSurvey.colleagueSurvey.IT_Geraete_Mobiltelefone')],
        ["6", i18n.t('userSurvey.Survey.ITGeraetIDDic_6')],
        ["7", i18n.t('userSurvey.Survey.ITGeraetIDDic_7')],
        ["8", i18n.t('userSurvey.Survey.ITGeraetIDDic_8')],
        ["9", i18n.t('userSurvey.Survey.ITGeraetIDDic_9')],
        ["10", i18n.t('userSurvey.Survey.ITGeraetIDDic_10')],
      ]) 
    },
    dienstreisenLabelMap: function(){
      return new Map([
        ["1", i18n.t("colleagueSurvey.colleagueSurvey.dienstreiseMediumListe_2")],
        ["2", i18n.t("colleagueSurvey.colleagueSurvey.dienstreiseMedium_Auto")],
        ["3", i18n.t("colleagueSurvey.colleagueSurvey.dienstreiseMediumListe_3")],
        ["Benzin", i18n.t("colleagueSurvey.colleagueSurvey.dienstreiseMedium_Benzin")],
        ["Diesel", i18n.t("colleagueSurvey.colleagueSurvey.dienstreiseMedium_Diesel")],
        ["Kurzstrecke", i18n.t("colleagueSurvey.colleagueSurvey.flugstreckeListe_1")],
        ["Langstrecke", i18n.t("colleagueSurvey.colleagueSurvey.flugstreckeListe_0")],
      ])
    },
    pendelwegeLabelMap: function(){
      return new Map([
        ["1", i18n.t('colleagueSurvey.colleagueSurvey.fahrmediumListe_2')],
        ["2", i18n.t('colleagueSurvey.colleagueSurvey.fahrmediumListe_3')],
        ["3", i18n.t('colleagueSurvey.colleagueSurvey.fahrmediumListe_4')],
        ["4", i18n.t('colleagueSurvey.colleagueSurvey.dienstreiseMediumListe_0')],
        ["5", i18n.t('colleagueSurvey.colleagueSurvey.dienstreiseMediumListe_1')],
        ["6", i18n.t('colleagueSurvey.colleagueSurvey.fahrtmediumOEPNVListe_1')],
        ["7", i18n.t('colleagueSurvey.colleagueSurvey.fahrtmediumOEPNVListe_0')],
        ["8", i18n.t('colleagueSurvey.colleagueSurvey.fahrtmediumOEPNVListe_2')],
        ["9", i18n.t('colleagueSurvey.colleagueSurvey.fahrtmediumOEPNVListe_3')],
        ["10", i18n.t('colleagueSurvey.colleagueSurvey.fahrtmediumOEPNVListe_4')],
        ["11", i18n.t('colleagueSurvey.colleagueSurvey.fahrtmediumOEPNVListe_5')],
        ["12", i18n.t('colleagueSurvey.colleagueSurvey.fahrmediumListe_6')]
      ]);
    }
  },

  watch: {
    '$i18n.locale': function() {  // reload charts when language changes to update labels
      this.barWidthComp();    // TODO: remove later // for now used to test resizing of bars
      this.setChartData();
    },
  },

  async mounted() { 
    await this.getData();
    this.barWidthComp();
    this.setChartData();
  },

  created() {
    //this.getData();
    //this.responseSuccessful = true
  },

  methods: {
    onResize: async function () {
      await Sleep(500)
      if(this.oldWindowWidth != window.innerWidth) {
        this.oldWindowWidth = window.innerWidth
        console.log(this.barWidth)

        this.barWidth = window.innerWidth / this.maxBars * 0.4
        this.resizeBars()
      }
    },

    resizeBars: function () {
      console.log(this.maxBars)
      console.log(this.chartWidth)
      console.log(this.barWidth)

      this.chartdataDienstreisenBar.datasets[0].maxBarThickness = this.barWidth
      this.chartdataPendelwegeBar.datasets[0].maxBarThickness = this.barWidth
      this.chartdataITGeraeteBar.datasets[0].maxBarThickness = this.barWidth
    },

    barWidthComp: function() {
      this.maxBars = Math.max(Object.keys(this.responsedata.emissionenDienstreisenAufgeteilt).length, Object.keys(this.responsedata.emissionenPendelwegeAufgeteilt).length, Object.keys(this.responsedata.emissionenITGeraeteAufgeteilt).length)
      this.chartWidth = this.$refs["chart"].$refs.canvas.width
      this.halfChartWidth = this.$refs["half-chart"].$refs.canvas.width
      this.barWidth = Math.min(this.chartWidth / this.maxBars * 0.75, this.halfChartWidth / 4 * 0.75)
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
          "col2": "t CO2 eq.",
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
          "col2": "t CO2 eq.",
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
          "col2": "t CO2 eq.",
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
          "col2": "kWh",
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
          "col2": "t CO2 eq.",
          "col3": "%",
        },
      ])
      let dienstreisenAufgeteilt = this.responsedata.emissionenDienstreisenAufgeteilt
      let labelMap = this.dienstreisenLabelMap
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
          "col2": "t CO2 eq.",
          "col3": "%",
        },
      ])
      let pendelwegeAufgeteilt = this.responsedata.emissionenPendelwegeAufgeteilt
      labelMap = this.pendelwegeLabelMap
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
          "col2": "t CO2 eq.",
          "col3": "%",
        },
      ])
      let itGeraeteAufgeteilt = this.responsedata.emissionenITGeraeteAufgeteilt
      labelMap = this.itGeraeteLabelMap
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
            this.checkNegativValue();
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

    setChartData: function() {
      this.setChartGesamt();
      this.setChartEnergie();
      this.setChartVerbrauch();
      this.setChartDienstreisen();
      this.setChartPendelwege();
      this.setChartITGeraete();
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
     * Method checks for negativ values in energy emissions which indecated that the year of the survey has no data in the database.
     * If dedected sets the flag displayEnergieChart to false
     */
    checkNegativValue: function () {
      if (this.responsedata.emissionenWaerme < 0 || this.responsedata.emissionenKaelte < 0 || this.responsedata.emissionenStrom < 0) {
        this.displayEnergieCharts = false;
      }
      if (this.responsedata.verbrauchWaerme < 0 || this.responsedata.verbrauchKaelte < 0 || this.responsedata.verbrauchStrom < 0) {
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
     * Method sets data and options for the Gesamt charts.
     */
    setChartGesamt: function () {
      let data = [
        { label: i18n.t('common.Energie'), value: this.responsedata.emissionenEnergie, color: 'rgb(255, 99, 132)'},
        { label: i18n.t('common.Dienstreisen'), value: this.responsedata.emissionenDienstreisen, color: 'rgb(54,162,235)'},
        { label: i18n.t('common.Pendelwege'), value: this.responsedata.emissionenPendelwege, color: 'rgb(255, 205, 86)' },
        { label: i18n.t('common.ITGeraete'), value: this.responsedata.emissionenITGeraete, color: 'rgb(75, 192, 192)' },
      ];
      data.sort((a, b) => b.value - a.value)

      this.chartdataGesamtDoughnut = {
        labels: data.map(a => a.label),
        datasets: [{
          label: i18n.t('common.Emissionen'),
          data: data.map(a => a.value),
          backgroundColor: data.map(a => a.color),
          hoverOffset: 4,
        }]
      }

      this.optionsGesamtDoughnut = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          datalabels: {
            display: true,
            // eslint-disable-next-line no-unused-vars
            formatter: (value, context) => {
              if(this.responsedata.emissionenGesamt === 0){
                return 0
              }
              return i18n.n((Math.round(value / this.responsedata.emissionenGesamt * 1000) / 10), "decimal") + '%';
            },
            font: {
              weight: 'bold',
              size: 14,
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
      }

      this.chartdataGesamtPareto = {
        labels: data.map(a => a.label),
        datasets: [{
          type: 'bar',
          label: i18n.t('common.Emissionen'),
          yAxisID: 'bar',
          data: data.map(a => a.value),
          backgroundColor: data.map(a => a.color),
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
      };
      this.optionsGesamtPareto = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        plugins: {
          datalabels: {
            display: true,
            // eslint-disable-next-line no-unused-vars
            formatter: (value, context) => {
              return i18n.n(value, "decimal");
            },
          },
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
      };
    },
    /**
     * Method sets data and options for the Energie charts.
     */
    setChartEnergie: function () {
      let data = [
        { label: i18n.t('common.Waerme'), value: this.responsedata.emissionenWaerme, color: 'rgb(240, 128, 128)'},
        { label: i18n.t('common.Kaelte'), value: this.responsedata.emissionenKaelte, color:  'rgb(0, 204, 255)'},
        { label: i18n.t('common.Strom'), value: this.responsedata.emissionenStrom, color: 'rgb(255, 219, 77)' },
      ];

      data.sort((a, b) => b.value - a.value)

      this.chartdataEnergieDoughnut = {
        labels: data.map(a => a.label),
        datasets: [{
          label: i18n.t('common.Emissionen'),
          data: data.map(a => a.value),
          backgroundColor: data.map(a => a.color),
          hoverOffset: 4,
        }]
      }
      this.optionsEnergieDoughnut = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          datalabels: {
            display: true,
            // eslint-disable-next-line no-unused-vars
            formatter: (value, context) => {
              if(this.responsedata.emissionenEnergie === 0){
                return 0
              }
              return i18n.n((Math.round(value / this.responsedata.emissionenEnergie * 1000) / 10), "decimal") + '%';
            },
            font: {
              weight: 'bold',
              size: 14,
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
      }

      this.chartdataEnergieBar = {
        labels: data.map(a => a.label),
        datasets: [{
          type: 'bar',
          label: i18n.t('common.Emissionen'),
          yAxisID: 'bar',
          data: data.map(a => a.value),
          backgroundColor: data.map(a => a.color),
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
      }
      this.optionsEnergieBar = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        plugins: {
          datalabels: {
            display: true,
            // eslint-disable-next-line no-unused-vars
            formatter: (value, context) => {
              return i18n.n(value, "decimal");
            },
          },
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
      }
    },
    /**
     * Method sets data and options for the Energie charts.
     */
    setChartVerbrauch: function () {
      let data = [
        { label: i18n.t('common.Waerme'), value: this.responsedata.verbrauchWaerme, color: 'rgb(240, 128, 128)'},
        { label: i18n.t('common.Kaelte'), value: this.responsedata.verbrauchKaelte, color:  'rgb(0, 204, 255)'},
        { label: i18n.t('common.Strom'), value: this.responsedata.verbrauchStrom, color: 'rgb(255, 219, 77)' },
      ];

      data.sort((a, b) => b.value - a.value)

      this.chartdataVerbrauchDoughnut = {
        labels: data.map(a => a.label),
        datasets: [{
          label: i18n.t('common.Emissionen'),
          data: data.map(a => a.value),
          backgroundColor: data.map(a => a.color),
          hoverOffset: 4,
        }]
      }
      this.optionsVerbrauchDoughnut = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          datalabels: {
            display: true,
            // eslint-disable-next-line no-unused-vars
            formatter: (value, context) => {
              if(this.responsedata.emissionenEnergie === 0){
                return 0
              }
              return i18n.n((Math.round(value / this.responsedata.verbrauchEnergie * 1000) / 10), "decimal") + '%';
            },
            font: {
              weight: 'bold',
              size: 14,
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
      }

      this.chartdataVerbrauchBar = {
        labels: data.map(a => a.label),
        datasets: [{
          type: 'bar',
          label: 'kWh',
          yAxisID: 'bar',
          data: data.map(a => a.value),
          backgroundColor: data.map(a => a.color),
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
      }
      this.optionsVerbrauchBar = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        plugins: {
          datalabels: {
            display: true,
            // eslint-disable-next-line no-unused-vars
            formatter: (value, context) => {
              return i18n.n(value, "decimal");
            },
          },
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
              labelString: 'kWh'
            }
          }]
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              let idx = tooltipItem.index;
              return i18n.t('common.Verbrauch') + ": " + i18n.n(data.datasets[0].data[idx], "decimal")
            }
          }
        }
      }
    },

    setChartDienstreisen: function () {
      let data = []

      let dienstreisenAufgeteilt = this.responsedata.emissionenDienstreisenAufgeteilt
      let labelMap = this.dienstreisenLabelMap

      Object.keys(dienstreisenAufgeteilt).forEach(function(key) {
        let labelParts = key.split("-")
        let label = labelMap.get(labelParts[0]) + (labelParts[1] ? " - " + labelMap.get(labelParts[1]) : "")
        data.push({label: label, value: dienstreisenAufgeteilt[key], color: 'rgb(54,162,235)'})
      })

      data.sort((a, b) => b.value - a.value)

      this.chartdataDienstreisenBar = {
        labels: data.map(a => a.label),
        datasets: [{
          type: 'bar',
          label: i18n.t('common.Emissionen'),
          yAxisID: 'bar',
          data: data.map(a => a.value),
          backgroundColor: data.map(a => a.color),
          borderWidth: 1,
          order: 1,
          datalabels: {
            color: 'black',
            align: 'end',
            anchor: 'start',
          },
          barTickness: 'flex',
          maxBarThickness: this.barWidth,
        }]
      }
      this.optionsDienstreisenBar = {
        responsive: true,
        maintainAspectRatio: false,
        // responsive: false,
        // maintainAspectRatio: false,
        legend: {
          display: false
        },
        plugins: {
          datalabels: {
            display: true,
            // eslint-disable-next-line no-unused-vars
            formatter: (value, context) => {
              return i18n.n(value, "decimal");
            },
          },
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
      }
    },

    setChartPendelwege: function () {
      let data = []

      let pendelwegeAufgeteilt = this.responsedata.emissionenPendelwegeAufgeteilt
      let labelMap = this.pendelwegeLabelMap
      Object.keys(pendelwegeAufgeteilt).forEach(function(key) {
        data.push({label: labelMap.get(key), value: pendelwegeAufgeteilt[key], color: 'rgb(255, 205, 86)'})
      })

      data.sort((a, b) => b.value - a.value)

      this.chartdataPendelwegeBar= {
        labels: data.map(a => a.label),
        datasets: [{
          type: 'bar',
          label: i18n.t('common.Emissionen'),
          yAxisID: 'bar',
          data: data.map(a => a.value),
          backgroundColor: data.map(a => a.color),
          borderWidth: 1,
          order: 1,
          datalabels: {
            color: 'black',
            align: 'end',
            anchor: 'start',
          },
          barTickness: 80,
          maxBarThickness: this.barWidth,
        }]
      }
      this.optionsPendelwegeBar = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        plugins: {
          datalabels: {
            display: true,
            // eslint-disable-next-line no-unused-vars
            formatter: (value, context) => {
              return i18n.n(value, "decimal");
            },
          },
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
      }
    },

    setChartITGeraete: function () {
      let data = []

      let itGeraeteAufgeteilt = this.responsedata.emissionenITGeraeteAufgeteilt
      let labelMap = this.itGeraeteLabelMap
      Object.keys(itGeraeteAufgeteilt).forEach(function(key) {
        data.push({label: labelMap.get(key), value: itGeraeteAufgeteilt[key], color: 'rgb(75, 192, 192)'})
      })

      data.sort((a, b) => b.value - a.value)

      this.chartdataITGeraeteBar= {
        labels: data.map(a => a.label),
        datasets: [{
          type: 'bar',
          label: i18n.t('common.Emissionen'),
          yAxisID: 'bar',
          data: data.map(a => a.value),
          backgroundColor: data.map(a => a.color),
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
      }
      this.optionsITGeraeteBar = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        plugins: {
          datalabels: {
            display: true,
            // eslint-disable-next-line no-unused-vars
            formatter: (value, context) => {
              return i18n.n(value, "decimal");
            },
          },
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
      }
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