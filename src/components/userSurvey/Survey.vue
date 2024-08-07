<!-- eslint-disable vue/no-v-html -->
<template>
  <v-container>
    <!-- Introduction Text -->
    <v-card
      class="pa-7 mx-auto"
      :max-width="constants.v_card_max_width"
    >
      <p>
        {{ $t('userSurvey.Survey.UmfrageErklaerung_0') }}
      </p>
      <p v-html="$t('userSurvey.Survey.UmfrageErklaerung_1')" />

      <p>
        {{ $t('userSurvey.Survey.UmfrageErklaerung_2') }}
      </p>
      <p v-html="$t('userSurvey.Survey.UmfrageErklaerung_3')" />
      <p v-html="$t('userSurvey.Survey.UmfrageErklaerung_4')" />
      <p v-html="$t('userSurvey.Survey.UmfrageErklaerung_5')" />
      <p>
        {{ $t('userSurvey.Survey.UmfrageErklaerung_6') }} <a
          href="mailto:co2-rechner@zv.tu-darmstadt.de"
        >co2-rechner@zv.tu-darmstadt.de</a>.
      </p>
      <p v-html="$t('userSurvey.Survey.UmfrageErklaerung_7')" />
    </v-card>

    <v-card
      class="pa-7 mt-2 mx-auto"
      :max-width="constants.v_card_max_width"
    >
      <!-- Umfrage -->
      <v-form lazy-validation>
        <!-- Bezeichnung -->
        <br>
        <h3>
          {{ $t('userSurvey.Survey.UmfrageBezeichungUeberschrift') }}
        </h3>
        <v-divider />
        <br>

        <v-row>
          <v-col>
            <v-text-field
              ref="bezeichnung"
              v-model="bezeichnung"
              :rules="universalRules"
              :label="$t('common.Bezeichung')"
              type="string"
              prepend-icon="mdi-form-textbox"
              :disabled="blockInput"
            />
          </v-col>
        </v-row>

        <!-- Bilanzierungsjahr -->
        <br>
        <h3>{{ $t('userSurvey.Survey.BilanzierungsUeberschrift') }}</h3>
        <v-divider />
        <br>

        <v-row>
          <v-col :cols="$vuetify.display.smAndUp ? 5 : 8">
            <v-autocomplete
              v-model="bilanzierungsjahr"
              :items="possibleYears"
              :label="$t('common.Bilanzierungsjahr')"
              prepend-icon="mdi-calendar-question"
              class="pr-5"
              :disabled="blockInput"
            />
          </v-col>
        </v-row>

        <!-- Mitarbeitende in Abteilung -->

        <br>
        <h3>{{ $t('userSurvey.Survey.MitarbeiterInAbteilung') }}</h3>
        <v-divider />
        <br>

        <v-container>
          <v-row>
            <v-text-field
              ref="anzahlMitarbeiter"
              v-model="anzahlMitarbeiter"
              :rules="absolutpositivRules"
              :min="0"
              :label="$t('common.Mitarbeitendenzahl')"
              prepend-icon="mdi-account"
              :disabled="blockInput"
            />
          </v-row>
        </v-container>

        <!-- Genutzte Gebäude -->

        <br>

        <h3>
          {{ $t('userSurvey.Survey.GebaeudeAbteilung_0') }} (<a
            href="https://www.tu-darmstadt.de/universitaet/campus/index.de.jsp"
            target="_blank"
          >{{ $t('userSurvey.Survey.GebaeudeAbteilung_1') }}</a>)?
          <Tooltip
            :tooltip-text="$t('userSurvey.Survey.GebaeudeAbteilung_2')"
          />
        </h3>

        <v-divider />
        <br>
          
        <div
          v-for="(objekt, index) in gebaeude"
          :key="index"
        >
          <v-row justify="center">
            <v-col :cols="$vuetify.display.smAndUp ? 6 : 5">
              <v-autocomplete
                v-if="gebaeudeIDs"
                v-model="objekt[0]"
                :items="gebaeudeIDs"
                :label="$t('common.Gebäudenummer')"
                prepend-icon="mdi-domain"
                :disabled="blockInput"
              />
            </v-col>
            <v-col cols="5">
              <v-text-field
                :ref="'flaeche' + index"
                v-model="objekt[1]"
                :rules="absolutpositivRules"
                :min="0"
                :label="$t('userSurvey.Survey.GebaeudeAbteilung_3')"
                prepend-icon="mdi-domain"
                suffix="qm"
                :disabled="blockInput"
              />
            </v-col>
            <v-col
              :cols="$vuetify.display.smAndUp ? 1 : 2"
              class="mt-3 text-center"
            >
              <v-btn
                class="delete_text--text mx-auto"
                color="delete"
                size="default"
                rounded
                :disabled="blockInput"
                @click="removeGebaeude(index)"
              >
                <v-icon>
                  mdi-delete-outline
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </div>

        <v-container>
          <v-row justify="start">
            <v-col
              class="pr-0"
            >
              <v-btn
                class="add_text--text pl-2"
                color="add"
                :disabled="blockInput"
                @click="newGebaeude()"
              >
                <v-icon>
                  mdi-plus
                </v-icon>
                {{ $t('userSurvey.Survey.gebaeudeHinzufuegen') }}
              </v-btn>
            </v-col> 
          </v-row>
        </v-container>

        <v-alert
          v-if="duplicateBuilding"
          type="warning"
          density="compact"
          variant="tonal"
        >
          {{ $t('userSurvey.Survey.GebaeudeWarnung') }}
        </v-alert>

        <DataGapVisualization 
          :gebaeude-i-ds-und-zaehler="gebaeudeIDsUndZaehler"
          :zaehler="zaehler"
          :gebaeude="gebaeude"
          :bilanzierungsjahr="bilanzierungsjahr"
        />

        <!-- Umfrage für IT Geräte: Multifunktionsgeräte + Toner, Drucker + Toner, Beamer, Server -->
        <br>
        <h3>{{ $t('userSurvey.Survey.ITGeraete_0') }}</h3>
        <v-divider />
        <br>

        <v-container>
          <!-- Multifunktionsgeräte -->
          <v-row>
            <v-checkbox
              v-model="geraeteAnzahl[0][2]"
              hide-details
              :disabled="blockInput"
            />
            <v-text-field
              ref="multifunktionsgeraete"
              v-model="geraeteAnzahl[0][1]"
              :rules="geraeteRules"
              :disabled="!geraeteAnzahl[0][2] || blockInput"
              :min="0"
              :label="$t('userSurvey.Survey.ITGeraeteMFP')"
              class="pr-5"
              :suffix="$t('userSurvey.Survey.ITGeraeteMFP_Suffix')"
            />
            <v-text-field
              ref="multifunktionsgeraeteToner"
              v-model="geraeteAnzahl[1][1]"
              :rules="nichtnegativRules"
              :disabled="!geraeteAnzahl[0][2] || blockInput"
              :min="0"
              :label="$t('userSurvey.Survey.ITGeraeteBenutzteToner')"
              :suffix="$t('userSurvey.Survey.ITGeraeteBenutzteToner_Suffix')"
            />
          </v-row>
          <!-- Drucker -->
          <v-row>
            <v-checkbox
              v-model="geraeteAnzahl[2][2]"
              hide-details
              :disabled="blockInput"
            />
            <v-text-field
              ref="drucker"
              v-model="geraeteAnzahl[2][1]"
              :rules="geraeteRules"
              :disabled="!geraeteAnzahl[2][2] || blockInput"
              :min="0"
              :label="$t('userSurvey.Survey.DruckerLabel')"
              :suffix="$t('userSurvey.Survey.Drucker_Suffix')"
              class="pr-5"
            />
            <v-text-field
              ref="druckerToner"
              v-model="geraeteAnzahl[3][1]"
              :rules="nichtnegativRules"
              :disabled="!geraeteAnzahl[2][2] || blockInput"
              :min="0"
              :label="$t('userSurvey.Survey.ITGeraeteBenutzteToner')"
              :suffix="$t('userSurvey.Survey.ITGeraeteBenutzteToner_Suffix')"
            />
          </v-row>
          <!-- Beamer -->
          <v-row>
            <v-checkbox
              v-model="geraeteAnzahl[4][2]"
              hide-details 
              :disabled="blockInput"
            />
            <v-text-field
              ref="beamer"
              v-model="geraeteAnzahl[4][1]"
              :rules="geraeteRules"
              :disabled="!geraeteAnzahl[4][2] || blockInput"
              :min="0"
              :label="$t('userSurvey.Survey.Beamer')"
              :suffix="$t('userSurvey.Survey.Beamer')"
            />
          </v-row>
          <!-- Server -->
          <v-row>
            <v-checkbox
              v-model="geraeteAnzahl[5][2]"
              hide-details
              :disabled="blockInput"
            />
            <v-text-field
              ref="server"
              v-model="geraeteAnzahl[5][1]"
              :rules="geraeteRules"
              :disabled="!geraeteAnzahl[5][2] || blockInput"
              :min="0"
              :label="$t('userSurvey.Survey.interneServer')"
              :suffix="$t('userSurvey.Survey.Server')"
            />
          </v-row>
        </v-container>
        <v-row class="mt-1 text-center">
          <v-dialog
            v-model="errorDialog"
            transition="dialog-bottom-transition"
            :max-width="constants.v_dialog_max_width"
          >
            <!-- Mit diesem Button soll die Umfrage abgesendet werden. -->
            <template #activator="{ props }">
              <v-btn
                class="mr-4"
                color="primary"
                :disabled="blockInput"
               
                v-bind="props"
                @click="problemeInUmfrage()"
              >
                {{ $t('userSurvey.Survey.SpeicherButton') }}
              </v-btn>
            </template>

            <v-card>
              <v-toolbar
                class="px-4"
                color="primary"
                dark
              >
                {{ (errorTextArray.required.length != 0 || errorTextArray.nonRequired.length != 0) ? $t('userSurvey.Survey.ProblemeEingabe') : $t('userSurvey.Survey.UmfrageVervollstaendigen') }}
              </v-toolbar>
              <v-card-text>
                <div
                  v-if="errorTextArray.nonRequired.length != 0 || errorTextArray.required.length != 0"
                  class="pt-6"
                >
                  <div
                    v-if="errorTextArray.required.length != 0"
                  >
                    {{ $t('userSurvey.Survey.FehlendePflichtfelder') }} <br>
                    <v-list>
                      <v-list-item
                        v-for="(problem, index) in errorTextArray.required"
                        :key="index"
                      >
                        <label class="text-sm-body-2 delete--text font-weight-black mb-2">
                          {{ problem }}
                        </label>
                      </v-list-item>
                    </v-list>
                  </div>
                  <div
                    v-if="errorTextArray.nonRequired.length != 0"
                  >
                    {{ $t('userSurvey.Survey.UmfrageHatProbleme') }} <br>
                    <v-list>
                      <v-list-item
                        v-for="(problem, index) in errorTextArray.nonRequired"
                        :key="index"
                      >
                        <label class="text-sm-body-2 mb-2">
                          {{ problem }}
                        </label>
                      </v-list-item>
                    </v-list>
                  </div>
                </div>
                <div 
                  v-if="errorTextArray.required.length == 0 && errorTextArray.nonRequired.length == 0"
                  class="pt-6"
                >
                  {{ $t('userSurvey.Survey.UmfrageWirklichSpeichern_1') }}<br>
                  {{ $t('userSurvey.Survey.UmfrageWirklichSpeichern_2') }}
                </div>
              </v-card-text>

              <v-divider />

              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="primary"
                  variant="text"
                  @click="errorDialog = false"
                >
                  {{ $t('userSurvey.Survey.WeiterBearbeiten') }}
                </v-btn>
                <v-btn
                  v-if="errorTextArray.required.length == 0"
                  color="primary"
                  variant="text"
                  @click="sendData(), errorDialog = false"
                >
                  {{ (errorTextArray.nonRequired.length == 0) ? $t('userSurvey.Survey.UmfrageSpeichern') : $t('userSurvey.Survey.UmfrageTzdSpeichern') }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- Ende des Absende Dialogs -->
          <v-btn
            v-if="displaySurveyLink"
            class="mr-4"
            color="primary"
            @click="resetPage()"
          >
            {{ $t('userSurvey.Survey.WeitereUmfrageErstellen') }}
          </v-btn>
          <LoadingAnimation v-if="dataRequestSent" />
        </v-row>
      </v-form>
    </v-card>

    <!-- Component for showing Link for employees after sending formular data. -->
    <v-card
      v-if="displaySurveyLink || displayLoadingAnimation"
      class="mx-auto mt-2 px-4 pt-4"
      elevation="2"
      border
      :max-width="constants.v_card_max_width"
    >
      <LoadingAnimation v-if="displayLoadingAnimation" />
      <LinkSharingComponent
        v-if="displaySurveyLink"
        ref="linkSharing"
        :mitarbeiter-link="mitarbeiterumfrageBaseURL + responseData.umfrageID"
        :text="$t('componentParts.LinkSharingComponent.Share_Mitarbeiterumfrage')"
      />
    </v-card>

    <MailTemplate
      v-if="displaySurveyLink"
      :umfrage-jahr="String(bilanzierungsjahr)"
      :umfrage-link="mitarbeiterumfrageBaseURL+ responseData.umfrageID"
    />
    <v-card
      v-if="!displaySurveyLink && errorMessage"
    >
      <v-alert
        ref="errorMessage"
        type="error"
        variant="tonal"
      >
        {{ errorMessage }}
      </v-alert>
    </v-card>
  </v-container>
</template>

<script>
import Tooltip from "@/components/componentParts/Tooltip.vue";
import LinkSharingComponent from "@/components/componentParts/LinkSharingComponent.vue";
import MailTemplate from "@/components/userSurvey/MailTemplate.vue";
import LoadingAnimation from "@/components/componentParts/LoadingAnimation.vue";
import DataGapVisualization from '@/components/componentParts/DataGapVisualization.vue';
import { translateGebaeudeIDToSymbolic, translateGebaeudeIDToNumeric, resolveITGeraetID } from "@/utils.js";
import constants from "@/const.js";

export default {
  name: "Survey",

  components: {
    LinkSharingComponent,
    MailTemplate,
    LoadingAnimation,
    Tooltip,
    DataGapVisualization
  },

  data: () => ({
    constants: constants,

    // Bezeichnung
    bezeichnung: null,

    // Bilanzierungsjahr
    bilanzierungsjahr: null,

    //Mitarbeiter
    anzahlMitarbeiter: null,

    // genutzte Gebäude
    // Format: [gebaeudeID, flaechenanteil]
    gebaeude: [[null, null]],
    moreInfo: false,

    // mögliche gebäudeIDs
    gebaeudeIDs: [],
    gebaeudeIDsUndZaehler: [],
    zaehler: [],

    //IT Geräte
    /* Geraet an Array Position format [intern Geraete ID, Anzahl, enabled]
     * [0] Multigeraete
     * [1] MultigeraetToner
     * [2] Laserdrucker
     * [3] LaserdruckerToner
     * [4] Beamer
     * [5] Server
     */
    geraeteAnzahl: [
      [7, null, false],
      [8, null, false],
      [9, null, false],
      [10, null, false],
      [4, null, false],
      [6, null, false],
    ],

    // Blockiere Inputfelder nach Absenden der Umfrage
    blockInput: false,

    // has Absenden Button been clicked
    dataRequestSent: false,
    responseData: null,

    // Dialogvariable + Array mit fehlerhaften Eingaben {fehler: "", pflicht: 0}
    errorDialog: false,
    errorTextArray: {
      required: [],
      nonRequired: []
    },

    // base url for Mitarbeiterumfragen
    mitarbeiterumfrageBaseURL: import.meta.env.VITE_URL + '/survey/',

    // Error Nachricht von Server bei Fehler
    errorMessage: null,
    
    //Rules for input validation
    universalRules: [],
    geraeteRules: [],
    nichtnegativRules: [],
    absolutpositivRules: [],

    // after survey has been sent, display loading animation and scrollToLinkSharing
    displayLoadingAnimation: false,
    scrollToLinkScharing: false,
    scrollToErrorMessage: false,
  }),

  computed: {
    /**
     * Returns a list beginning with the current year until 2018.
     */
    possibleYears: function () {
      const beginningYear = 2018;
      let currentYear = new Date().getFullYear() - 1;
      return Array.from(new Array(currentYear - beginningYear + 1), (x, i) => i + beginningYear).reverse();
    },

    /**
     * True, if a valid survey link was received and should be shown. False otherwise.
     */
    displaySurveyLink: function () {
      return this.responseData && this.responseData.umfrageID !== "";
    },

    /**
     * Vergleicht ob das selbe Gebaeude zweimal ausgewaehlt wurde
     */
    duplicateBuilding: function() {
      for(var i = 0; i < this.gebaeude.length; i++) {
        for(var j = 0; j < i; j++) {
          if(this.gebaeude[i][0] == this.gebaeude[j][0] && this.gebaeude[i][0] != null) {
            return true
          }
        }
      }
      return false
    },
  },

  watch: {
    '$i18n.locale': function() {
      this.setRules();
      this.revalidateAllFields();
    },
  },

  updated: function () {
    this.$nextTick(function () {
      if(this.scrollToLinkScharing){  // scroll to link sharing component when it appears
        this.scrollToLinkScharing = false;
        this.$refs.linkSharing.$el.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest" });
      }

      if(this.scrollToErrorMessage){  // scroll to error message when it appears
        this.scrollToErrorMessage = false;
        this.$refs.errorMessage.$el.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest" });
      }
    })
  },

  created() {
    this.setRules();
    // get all possible gebaeude IDs on creation of the component
    this.fetchGebaeudeUndZaehlerData();
  },

  methods: {
    /**
     * This Method is needed bc of i18n. Otherwise after changing the language the rules would not change.
     */
    setRules: function(){
      this.universalRules = [
        (v) => !!v || this.$t('userSurvey.Survey.universalRules_0'),
      ],

      this.geraeteRules = [
        (v) =>
          !!v ||  this.$t('userSurvey.Survey.geraeteRules_1'),
        (v) =>
          parseInt(v) != 0 ||
            this.$t('userSurvey.Survey.geraeteRules_1'),
        (v) => parseInt(v) > 0 ||  this.$t('userSurvey.Survey.geraeteRules_3'),
      ],

      this.nichtnegativRules = [
        (v) => !!v || this.$t('userSurvey.Survey.nichtnegativRules_0'),
        (v) => parseInt(v) >= 0 || this.$t('userSurvey.Survey.nichtnegativRules_1'),
      ],

      this.absolutpositivRules = [
        (v) => !!v || this.$t('userSurvey.Survey.absolutpositivRules_0'),
        (v) => parseInt(v) > 0 || this.$t('userSurvey.Survey.absolutpositivRules_1'),
      ]
    },

    /**
     * Revalidates all fields in the survey if they are not null. Otherwise, the fields are reset.
     */
    revalidateAllFields: function() {
      if (this.bezeichnung) {
        this.$refs.bezeichnung.validate();
      }
      else {
        this.$refs.bezeichnung.resetValidation();
      }

      if (this.anzahlMitarbeiter) {
        this.$refs.anzahlMitarbeiter.validate();
      }
      else {
        this.$refs.anzahlMitarbeiter.resetValidation();
      }

      for (var i = 0; i < this.gebaeude.length; i++) {
        if (this.gebaeude[i][1]) {
          this.$refs["flaeche" + i][0].validate();
        }
        else {
          this.$refs["flaeche" + i][0].resetValidation();
          
        }
      }

      if (this.geraeteAnzahl[0][1]) {
        this.$refs.multifunktionsgeraete.validate();
      }
      else {
        this.$refs.multifunktionsgeraete.resetValidation();
      }
      if (this.geraeteAnzahl[1][1]) {
        this.$refs.multifunktionsgeraeteToner.validate();
      }
      else {
        this.$refs.multifunktionsgeraeteToner.resetValidation();
      }
      if (this.geraeteAnzahl[2][1]) {
        this.$refs.drucker.validate();
      }
      else {
        this.$refs.drucker.resetValidation();
      }
      if (this.geraeteAnzahl[3][1]) {
        this.$refs.druckerToner.validate();
      }
      else {
        this.$refs.druckerToner.resetValidation();
      }
      if (this.geraeteAnzahl[4][1]) {
        this.$refs.beamer.validate();
      }
      else {
        this.$refs.beamer.resetValidation();
      }
      if (this.geraeteAnzahl[5][1]) {
        this.$refs.server.validate();
      }
      else {
        this.$refs.server.resetValidation();
      }


      //this.$refs.bezeichnung.validate();
      //this.$refs.anzahlMitarbeiter.validate();
      // for (var i = 0; i < this.gebaeude.length; i++) {
      //   this.$refs["flaeche" + i][0].validate();
      // }
      // this.$refs.multifunktionsgeraete.validate();
      // this.$refs.multifunktionsgeraeteToner.validate();
      // this.$refs.drucker.validate();
      // this.$refs.druckerToner.validate();
      // this.$refs.beamer.validate();
      // this.$refs.server.validate();
    },

    /**
     * Returns an array containing a list with every required field missing
     */
    requiredFieldsMissingArray: function() {
      var fieldsarray = []
      if(this.bezeichnung == "" || this.bezeichnung == null) {
        fieldsarray.push(this.$t('userSurvey.Survey.requiredFieldsMissing_0'))
      }
      if(!this.possibleYears.includes(parseInt(this.bilanzierungsjahr))) {
        fieldsarray.push(this.$t('userSurvey.Survey.requiredFieldsMissing_1'))
      }
      if(this.anzahlMitarbeiter == null || this.anzahlMitarbeiter <= 0) {
        fieldsarray.push(this.$t('userSurvey.Survey.requiredFieldsMissing_2'))
      }
      return fieldsarray
    },

    /**
     * Determines errors in Umfrage and writes Error message and if the field is requiered to the errorTextArray variable
     * {
     *  nonRequired: []
     *  required:    []
     * }
     */
    problemeInUmfrage: function() {
      this.geraeteAnzahl[1][2] = this.geraeteAnzahl[0][2];
      this.geraeteAnzahl[3][2] = this.geraeteAnzahl[2][2];
      var nonRequiredArray = []
      
      // Gebaeude
      if(this.duplicateBuilding) {
        nonRequiredArray.push(this.$t('userSurvey.Survey.problemeInUmfrage_0'))
      } 
      for(const gebaeude of this.gebaeude) {
        if(gebaeude[0] != null && gebaeude[1] <=0) {
          nonRequiredArray.push(this.$t('userSurvey.Survey.problemeInUmfrage_1') + gebaeude[0] + this.$t('userSurvey.Survey.problemeInUmfrage_2'))
        }
      }
      // IT Geraete
      for(const it of this.geraeteAnzahl) {
        if(it[2] && it[1] <= 0) { 
          if((it[0] != 8 && it[0] != 10)) {
            nonRequiredArray.push(this.$t("userSurvey.Survey.problemeInUmfrage_3") + resolveITGeraetID(it[0]) + this.$t("userSurvey.Survey.problemeInUmfrage_4"))
          } else { // Toner
            nonRequiredArray.push(this.$t("userSurvey.Survey.problemeInUmfrage_5"))
          }
        }
      }
      this.errorTextArray.nonRequired = nonRequiredArray
      this.errorTextArray.required = this.requiredFieldsMissingArray()
    },

    /**
     * Adds a new Gebäude to the array, so that it can be selected
     */
    newGebaeude: function () {
      this.gebaeude.push([null, null]);
    },

    /**
     * Setzt alle Felder auf den Default zurueck und schaltet den 
     */
    resetPage: function () {
      this.bezeichnung =  null
      this.bilanzierungsjahr = null
      this.anzahlMitarbeiter = null
      this.gebaeude = [[null, null]]
      this.geraeteAnzahl = [
        [7, null, false],
        [8, null, false],
        [9, null, false],
        [10, null, false],
        [4, null, false],
        [6, null, false],
      ]
      this.blockInput = false
      this.dataRequestSent = false
      this.responseData = null

      // reset valdiation on all fields
      this.$refs.bezeichnung.resetValidation();
      this.$refs.anzahlMitarbeiter.resetValidation();
      for (var i = 0; i < this.gebaeude.length; i++) {
        this.$refs["flaeche" + i][0].resetValidation();
      }
      this.$refs.multifunktionsgeraete.resetValidation();
      this.$refs.multifunktionsgeraeteToner.resetValidation();
      this.$refs.drucker.resetValidation();
      this.$refs.druckerToner.resetValidation();
      this.$refs.beamer.resetValidation();
      this.$refs.server.resetValidation();
    },

    /**
     * Removes the Gebäude at position index so that it won't show
     */
    removeGebaeude: function (index) {
      if (index >= 0 && this.gebaeude.length > index) {
        this.gebaeude.splice(index, 1);
        //When the only element is removed add a new, thereby clearing the values of the fields on the webpage
        if (this.gebaeude.length === 0) {
          this.newGebaeude();
        }
      } else {
        console.error("Negative or out of bounds array index supplied");
      }
    },

    /**
     * Returns an array of the Geräte data as specified in the API Documentation
     * If negative amounts of a certain Gerät is supplied it is ignored
     *  [{
     *    idITGeraete: Integer
     *    anzahl: Integer
     *  }]
     */
    itGeraeteJSON: function () {
      //Build IT Geräte Array of non-null gerate
      var usedITGeraete = [];
      //Special case were we set the Toner enabled value to the matchig geraete value
      this.geraeteAnzahl[1][2] = this.geraeteAnzahl[0][2];
      this.geraeteAnzahl[3][2] = this.geraeteAnzahl[2][2];

      for (var geraet of this.geraeteAnzahl) {
        if (geraet[1] > 0 && geraet[2]) {
          usedITGeraete.push({
            idITGeraete: parseInt(geraet[0]),
            anzahl: parseInt(geraet[1]),
          });
        }
      }
      return usedITGeraete;
    },

    /**
     * Returns an array of the Gebäude data as specified in the API Documentation
     * [{
     *   gebaeudeNr: Integer
     *   flaechenanteil: Integer
     * }]
     */
    gebaeudeJSON: function () {
      var gebaeudeJSON = [];
      for (var objekt of this.gebaeude) {
        if (!!objekt[0] && !!objekt[1]) {
          gebaeudeJSON.push({
            gebaeudeNr: parseInt(translateGebaeudeIDToNumeric(objekt[0])),
            nutzflaeche: parseInt(objekt[1]),
          });
        }
      }
      return gebaeudeJSON;
    },

    /**
     * Sends all formular data to the server.
     */
    sendData: async function () {
      // Disable Inputfields
      this.blockInput = true
      this.displayLoadingAnimation = true;
      this.errorMessage = null;

      await fetch(import.meta.env.VITE_BASEURL + "/umfrage/insert", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + this.$keycloak.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bezeichnung: this.bezeichnung,
          jahr: parseInt(this.bilanzierungsjahr),
          gebaeude: this.gebaeudeJSON(),
          mitarbeiteranzahl: parseInt(this.anzahlMitarbeiter),
          itGeraete: this.itGeraeteJSON(),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          this.responseData = data.data;
          if(data.status == "error") {
            this.errorMessage = data.error.message
            this.blockInput = false
            this.scrollToErrorMessage = true
          }
          else if(data.status == "success") {
            this.scrollToLinkScharing = true
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          this.errorMessage = this.$t("common.ServerNichtErreichbar");
          this.scrollToErrorMessage = true
        });

      this.displayLoadingAnimation = false;
    },

    /**
     * Fetches all possible gebaeudeIDs and the Zaehler References from the database.
     */
    fetchGebaeudeUndZaehlerData: async function () {
    await fetch(import.meta.env.VITE_BASEURL + "/umfrage/gebaeudeUndZaehler", {
      method: "GET",
      headers: {
          "Authorization": "Bearer " + this.$keycloak.token,
        }
    })
      .then((response) => response.json())
      .then((data) => {
        this.gebaeudeIDsUndZaehler = data.data.gebaeude
        this.zaehler = data.data.zaehler
        this.gebaeudeIDs = data.data.gebaeude.map(obj => translateGebaeudeIDToSymbolic(obj.nr));

        this.mapGebauedeZaehlerRefs = new Map(
          data.data.gebaeude.map((obj) => [translateGebaeudeIDToSymbolic(obj.nr), {kaelteRef: obj.kaelteRef, stromRef: obj.stromRef, waermeRef: obj.waermeRef}])
        )

        this.mapZaehlerWerte = new Map(
          data.data.zaehler.map((obj) => [obj.pkEnergie, new Map(obj.zaehlerdatenVorhanden.map((obj2) => [obj2.jahr, obj2.vorhanden]))])
        )
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    },
  },
};

</script>
