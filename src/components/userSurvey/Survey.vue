<!-- eslint-disable vue/no-v-html -->
<template>
  <v-container>
    <!-- Umfrage Card -->
    <v-card
      elevation="2"
      outlined
    > 
      <!-- Introduction Text -->
      <v-card class="pa-7">
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

      <v-card class="pa-7 mt-2">
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
                v-model="bezeichnung"
                :min="0"
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
            <v-col cols="5">
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
            <v-row>
              <v-col cols="5">
                <v-autocomplete
                  v-if="gebaeudeIDs"
                  v-model="objekt[0]"
                  :items="gebaeudeIDs"
                  :label="$t('common.Gebäudenummer')"
                  prepend-icon="mdi-domain"
                  class="pr-5"
                  :disabled="blockInput"
                />
              </v-col>
              <v-col cols="5">
                <v-text-field
                  v-model="objekt[1]"
                  :rules="absolutpositivRules"
                  :min="0"
                  :label="$t('userSurvey.Survey.GebaeudeAbteilung_3')"
                  prepend-icon="mdi-domain"
                  suffix="qm"
                  :disabled="blockInput"
                />
              </v-col>
              <v-col>
                <v-btn
                  class="add_text--text"
                  color="add"
                  :disabled="blockInput"
                  @click="newGebaeude()"
                >
                  {{ $t('common.Hinzufuegen') }}
                </v-btn>
              </v-col>
              <v-col>
                <v-btn
                  class="delete_text--text"
                  color="delete"
                  :disabled="blockInput"
                  @click="removeGebaeude(index)"
                >
                  {{ $t('common.Loeschen') }}
                </v-btn>
              </v-col>
            </v-row>
          </div>
          <v-alert
            v-if="duplicateBuilding"
            type="warning"
            dense
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
                v-model="geraeteAnzahl[0][1]"
                :rules="geraeteRules"
                :disabled="!geraeteAnzahl[0][2] || blockInput"
                :min="0"
                :label="$t('userSurvey.Survey.ITGeraeteMFP')"
                class="pr-5"
                :suffix="$t('userSurvey.Survey.ITGeraeteMFP_Suffix')"
              />
              <v-text-field
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
                v-model="geraeteAnzahl[2][1]"
                :rules="geraeteRules"
                :disabled="!geraeteAnzahl[2][2] || blockInput"
                :min="0"
                :label="$t('userSurvey.Survey.DruckerLabel')"
                :suffix="$t('userSurvey.Survey.Drucker_Suffix')"
                class="pr-5"
              />
              <v-text-field
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
            >
              <!-- Mit diesem Button soll die Umfrage abgesendet werden. -->
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="mr-4"
                  color="primary"
                  :disabled="blockInput"
                  v-bind="attrs"
                  v-on="on"
                  @click="problemeInUmfrage()"
                >
                  {{ $t('userSurvey.Survey.SpeicherButton') }}
                </v-btn>
              </template>

              <v-card>
                <v-toolbar
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
                      <v-list
                        flat
                      >
                        <v-list-item
                          v-for="(problem, index) in errorTextArray.required"
                          :key="index"
                        >
                          <v-list-item-content>
                            <v-list-item-title
                              class="text-sm-body-2 delete--text font-weight-black"
                              v-text="problem"
                            />
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </div>
                    <div
                      v-if="errorTextArray.nonRequired.length != 0"
                    >
                      {{ $t('userSurvey.Survey.UmfrageHatProbleme') }} <br>
                      <v-list
                        flat
                      >
                        <v-list-item
                          v-for="(problem, index) in errorTextArray.nonRequired"
                          :key="index"
                        >
                          <v-list-item-content>
                            <v-list-item-title
                              class="text-sm-body-2"
                              v-text="problem"
                            />
                          </v-list-item-content>
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
                    text
                    @click="errorDialog = false"
                  >
                    {{ $t('userSurvey.Survey.WeiterBearbeiten') }}
                  </v-btn>
                  <v-btn
                    v-if="errorTextArray.required.length == 0"
                    color="primary"
                    text
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
    </v-card>

    <!-- Component for showing Link for employees after sending formular data. -->
    <v-card
      v-if="displaySurveyLink || displayLoadingAnimation"
      class="mt-2"
      elevation="2"
      outlined
    >
      <LoadingAnimation v-if="displayLoadingAnimation" />
      <LinkSharingComponent
        v-if="displaySurveyLink"
        :mitarbeiter-link="mitarbeiterumfrageBaseURL + responseData.umfrageID"
        :link-ziel="$t('userSurvey.Survey.Umfrage')"
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
        type="error"
      >
        {{ errorMessage }}
      </v-alert>
    </v-card>
  </v-container>
</template>

<script>
import Tooltip from "@/components/componentParts/Tooltip.vue";
import LinkSharingComponent from "../componentParts/LinkSharingComponent";
import MailTemplate from "./MailTemplate";
import LoadingAnimation from "../componentParts/LoadingAnimation";
import i18n from "@/i18n";
import DataGapVisualization from '../componentParts/DataGapVisualization.vue';

export default {
  components: {
    LinkSharingComponent,
    MailTemplate,
    LoadingAnimation,
    Tooltip,
    DataGapVisualization
  },

  data: () => ({
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
    mitarbeiterumfrageBaseURL: process.env.VUE_APP_URL + '/survey/',

    // Error Nachricht von Server bei Fehler
    errorMessage: null,
    
    //Rules for input validation

    geraeteRules: [
      (v) =>
        !!v ||  i18n.t('userSurvey.Survey.geraeteRules_1'),
      (v) =>
        parseInt(v) != 0 ||
          i18n.t('userSurvey.Survey.geraeteRules_1'),
      (v) => parseInt(v) > 0 ||  i18n.t('userSurvey.Survey.geraeteRules_3'),
    ],
    nichtnegativRules: [
      (v) => !!v || i18n.t('userSurvey.Survey.nichtnegativRules_0'),
      (v) => parseInt(v) >= 0 || i18n.t('userSurvey.Survey.nichtnegativRules_1'),
    ],
    absolutpositivRules: [
      (v) => !!v || i18n.t('userSurvey.Survey.absolutpositivRules_0'),
      (v) => parseInt(v) > 0 || i18n.t('userSurvey.Survey.absolutpositivRules_1'),
    ],

    // has Absenden Button been clicked
    displayLoadingAnimation: false,
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

  created() {
    // get all possible gebaeude IDs on creation of the component
    //this.fetchGebaeudeData();
    this.fetchGebaeudeUndZaehlerData();
  },

  methods: {
    /**
     * Returns an array containing a list with every required field missing
     */
    requiredFieldsMissingArray: function() {
      var fieldsarray = []
      if(this.bezeichnung == "" || this.bezeichnung == null) {
        fieldsarray.push(i18n.t('userSurvey.Survey.requiredFieldsMissing_0'))
      }
      if(!this.possibleYears.includes(parseInt(this.bilanzierungsjahr))) {
        fieldsarray.push(i18n.t('userSurvey.Survey.requiredFieldsMissing_1'))
      }
      if(this.anzahlMitarbeiter == null || this.anzahlMitarbeiter <= 0) {
        fieldsarray.push(i18n.t('userSurvey.Survey.requiredFieldsMissing_2'))
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
        nonRequiredArray.push(i18n.t('userSurvey.Survey.problemeInUmfrage_0'))
      } 
      for(const gebaeude of this.gebaeude) {
        if(gebaeude[0] != null && gebaeude[1] <=0) {
          nonRequiredArray.push(i18n.t('userSurvey.Survey.problemeInUmfrage_1') + gebaeude[0] + i18n.t('userSurvey.Survey.problemeInUmfrage_2'))
        }
      }
      // IT Geraete
      for(const it of this.geraeteAnzahl) {
        if(it[2] && it[1] <= 0) { 
          if((it[0] != 8 && it[0] != 10)) {
            nonRequiredArray.push(i18n.t("userSurvey.Survey.problemeInUmfrage_3") + resolveITGeraetID(it[0]) + i18n.t("userSurvey.Survey.problemeInUmfrage_4"))
          } else { // Toner
            nonRequiredArray.push(i18n.t("userSurvey.Survey.problemeInUmfrage_5"))
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

      await fetch(process.env.VUE_APP_BASEURL + "/umfrage/insert", {
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
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          this.errorMessage = i18n.t("common.ServerNichtErreichbar");
        });

      this.displayLoadingAnimation = false;
    },

    // /**
    //  * Fetches all possible gebaeudeIDs from the server to display in the dropdown menu of the formular.
    //  */
    // fetchGebaeudeData: async function () {
    //   await fetch(process.env.VUE_APP_BASEURL + "/umfrage/gebaeude",{
    //     method: "GET",
    //     headers: {
    //       "Authorization": "Bearer " + this.$keycloak.token,
    //     },
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       this.gebaeudeIDs = data.data.gebaeude.map(gebInt => translateGebaeudeIDToSymbolic(gebInt));
    //     })
    //     .catch((error) => {
    //       console.error("Error:", error);
    //     });
    // },

    /**
     * Fetches all possible gebaeudeIDs and the Zaehler References from the database.
     */
    fetchGebaeudeUndZaehlerData: async function () {
    await fetch(process.env.VUE_APP_BASEURL + "/umfrage/gebaeudeUndZaehler", {
      method: "GET",
      headers: {
          "Authorization": "Bearer " + this.$keycloak.token,
        }
    })
      .then((response) => response.json())
      .then((data) => {
        this.gebaeudeIDsUndZaehler = data.data.gebaeude
        this.zaehler = data.data.zaehler

        //console.log(data)
      
        this.gebaeudeIDs = data.data.gebaeude.map(obj => translateGebaeudeIDToSymbolic(obj.nr));

        this.mapGebauedeZaehlerRefs = new Map(
          data.data.gebaeude.map((obj) => [translateGebaeudeIDToSymbolic(obj.nr), {kaelteRef: obj.kaelteRef, stromRef: obj.stromRef, waermeRef: obj.waermeRef}])
        )
        //console.log(this.mapGebauedeZaehlerRefs)

        this.mapZaehlerWerte = new Map(
          data.data.zaehler.map((obj) => [obj.pkEnergie, new Map(obj.zaehlerdatenVorhanden.map((obj2) => [obj2.jahr, obj2.vorhanden]))])
        )
        //console.log(this.mapZaehlerWerte)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    },
  },
};

/**
 * Translates a given gebaeudeID to its numerical equivalent.
 * E.g. S101 is translated to 1101, L312 to 3312 and so on.
 */
function translateGebaeudeIDToNumeric(gebaeudeID) {
  if (!gebaeudeID) return null;

  let gebaeudeDict = {
    "S": 1,
    "B": 2,
    "L": 3,
    "H": 4,
    "W": 5,
  };
  let translatedID =
    gebaeudeDict[gebaeudeID.substring(0, 1)] + gebaeudeID.substring(1);
  return parseInt(translatedID);
}

/**
 * Translates a given numeric gebaeudeID to its symbolic equivalent (string).
 * E.g. 1101 is translated to S101, 3312 to L312 and so on.
 */
function translateGebaeudeIDToSymbolic(gebaeudeID) {
  let gebaeudeDict = {
    1: "S",
    2: "B",
    3: "L",
    4: "H",
    5: "W",
  };

  gebaeudeID = gebaeudeID.toString()
  let translatedID =
    gebaeudeDict[gebaeudeID.substring(0, 1)] + gebaeudeID.substring(1);
  return translatedID;
}

function resolveITGeraetID(geraetID) {    // TODO: map does not work for some reason
  let ITGeraetIDDict = {
    7: i18n.t("usersurvey.survey.ITGeraetIDDic_7"),
    8: i18n.t("usersurvey.survey.ITGeraetIDDic_8"),
    9: i18n.t("usersurvey.survey.ITGeraetIDDic_9"),
    10: i18n.t("usersurvey.survey.ITGeraetIDDic_10"),
    4: i18n.t("usersurvey.survey.ITGeraetIDDic_4"),
    6: i18n.t("usersurvey.survey.ITGeraetIDDic_6"),
  };
  return ITGeraetIDDict[geraetID]
}

</script>
