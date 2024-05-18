<template>
  <v-container>
    <v-card
      elevation="2"
      outlined
      class="mx-auto"
      :max-width="constants.v_card_max_width"
    >
      <v-form lazy-validation>
        <v-card
          class="pa-7"
        >
          <v-row
            class="mt-1"
            dense
          >
            <v-spacer />

            <LoadingAnimation
              v-if="displayLoadingAnimation"
            />
            <v-alert
              v-if="displaySuccess"
              type="success"
              dense
            >
              {{ $t('userSurveyManagement.editSurvey.ErfolgreichGeändert') }}
            </v-alert>
            <v-alert
              v-if="displayError"
              type="error"
              dense
            >
              {{ errorMessage }}
            </v-alert>

            <!-- <v-spacer /> -->
                    
            <v-dialog
              v-if="!blockInput"
              v-model="errorDialog"
              :max-width="constants.v_dialog_max_width"
              transition="dialog-bottom-transition"
            >
              <!-- Mit diesem Button soll die Umfrage abgesendet werden. -->
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="blue"
                  class="white--text"
                  :disabled="blockInput"
                  v-bind="attrs"
                  v-on="on"
                  @click="problemeInUmfrage()"
                >
                  <v-icon left>
                    mdi-content-save
                  </v-icon>
                  {{ $t('userSurveyManagement.editSurvey.AenderungSpeichern') }}
                </v-btn>
              </template>

              <v-card>
                <v-toolbar
                  color="primary"
                  dark
                >
                  {{ (errorTextArray.required.length != 0 || errorTextArray.nonRequired.length != 0) ? $t('userSurveyManagement.editSurvey.SpeicherDialog_1') : $t('userSurveyManagement.editSurvey.SpeicherDialog_2') }}
                </v-toolbar>
                <v-card-text>
                  <div
                    v-if="errorTextArray.nonRequired.length != 0 || errorTextArray.required.length != 0"
                    class="pt-6"
                  >
                    <div
                      v-if="errorTextArray.required.length != 0"
                    >
                      {{ $t('userSurveyManagement.editSurvey.PflichtFelderNichtAngegeben') }} <br>
                      <v-list
                        flat
                      >
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
                      {{ $t('userSurveyManagement.editSurvey.UmfrageHatProbleme') }}<br>
                      <v-list
                        flat
                      >
                        <v-list-item
                          v-for="(problem, index) in errorTextArray.nonRequired"
                          :key="index"
                        >
                          <v-list-item-content>
                            <label class="text-sm-body-2 mb-2">
                              {{ problem }}
                            </label>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </div>
                  </div>
                  <div 
                    v-if="errorTextArray.required.length == 0 && errorTextArray.nonRequired.length == 0"
                    class="pt-6"
                  >
                    {{ $t('userSurveyManagement.editSurvey.UmfrageWirklichSpeichern_1') }}
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
                    {{ $t('userSurveyManagement.editSurvey.WeiterBearbeiten') }}
                  </v-btn>
                  <v-btn
                    v-if="errorTextArray.required.length == 0"
                    color="primary"
                    text
                    @click="sendEdit(), errorDialog = false"
                  >
                    {{ (errorTextArray.nonRequired.length == 0) ? $t('userSurveyManagement.editSurvey.AenderungSpeichern') : $t('userSurveyManagement.editSurvey.AenderungTrotzdemSpeichern') }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-btn
              class="ml-4"
              color="primary"
              @click="flipBearbeiten()"
            >
              <v-icon left>
                mdi-pencil
              </v-icon>
              {{ ( blockInput ? $t('userSurveyManagement.editSurvey.BearbeitenAktivieren') : $t('userSurveyManagement.editSurvey.BearbeitenDeaktivieren') ) }}
            </v-btn>
          </v-row>
          
          <!-- Bezeichnung -->
          <br>
          <h3>
            {{ $t('userSurveyManagement.editSurvey.UmfrageBezeichnung') }}
          </h3>
          <v-divider />
          <br>

          <v-row>
            <v-col>
              <v-text-field
                v-model="umfrage.bezeichnung"
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
          <h3>
            {{ $t('userSurveyManagement.editSurvey.WelchesBilanzierungsjahr') }}
          </h3>
          <v-divider />
          <br>

          <v-row>
            <v-col :cols="$vuetify.breakpoint.smAndUp ? 5 : 8">
              <v-autocomplete
                v-model="umfrage.jahr"
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
          <h3> {{ $t('userSurveyManagement.editSurvey.MitarbeiterInAbteilung') }}</h3>
          <v-divider />
          <br>

          <v-container>
            <v-row>
              <v-text-field
                v-model="umfrage.mitarbeiteranzahl"
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
            v-for="(objekt, index) in umfrage.gebaeude"
            :key="index"
          >
            <v-row>
              <v-col :cols="$vuetify.breakpoint.smAndUp ? 6 : 5">
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
                :cols="$vuetify.breakpoint.smAndUp ? 1 : 2"
                class="mt-3 text-center"
              >
                <v-btn
                  class="delete_text--text mx-auto"
                  color="delete"
                  fab
                  small
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
            dense
          >
            {{ $t('userSurvey.Survey.GebaeudeWarnung') }}
          </v-alert>

          <DataGapVisualization 
            v-if="displayDataGapVisualization"
            :gebaeude-i-ds-und-zaehler="gebaeudeIDsUndZaehler"
            :zaehler="zaehler"
            :gebaeude="umfrage.gebaeude"
            :bilanzierungsjahr="umfrage.jahr"
          />

          <!-- Umfrage für IT Geräte: Multifunktionsgeräte + Toner, Drucker + Toner, Beamer, Server -->
          <br>
          <h3>
            {{ $t('userSurveyManagement.editSurvey.gemeinschaftlicheITGeraete') }}
          </h3>
          <v-divider />
          <br>

          <v-container>
            <!-- Multifunktionsgeräte -->
            <v-row>
              <v-checkbox
                v-model="umfrage.geraeteanzahl[0][2]"
                hide-details
                :disabled="blockInput"
              />
              <v-text-field
                v-model="umfrage.geraeteanzahl[0][1]"
                :rules="geraeteRules"
                :disabled="!umfrage.geraeteanzahl[0][2] || blockInput"
                :min="0"
                :label="$t('userSurvey.Survey.ITGeraeteMFP')"
                class="pr-5"
                :suffix="$t('userSurvey.Survey.ITGeraeteMFP_Suffix')"
              />
              <v-text-field
                v-model="umfrage.geraeteanzahl[1][1]"
                :rules="nichtnegativRules"
                :disabled="!umfrage.geraeteanzahl[0][2] || blockInput"
                :min="0"
                :label="$t('userSurvey.Survey.ITGeraeteBenutzteToner')"
                :suffix="$t('userSurvey.Survey.ITGeraeteBenutzteToner_Suffix')"
              />
            </v-row>
            <!-- Drucker -->
            <v-row>
              <v-checkbox
                v-model="umfrage.geraeteanzahl[2][2]"
                hide-details
                :disabled="blockInput"
              />
              <v-text-field
                v-model="umfrage.geraeteanzahl[2][1]"
                :rules="geraeteRules"
                :disabled="!umfrage.geraeteanzahl[2][2] || blockInput"
                :min="0"
                :label="$t('userSurvey.Survey.DruckerLabel')"
                :suffix="$t('userSurvey.Survey.Drucker_Suffix')"
                class="pr-5"
              />
              <v-text-field
                v-model="umfrage.geraeteanzahl[3][1]"
                :rules="nichtnegativRules"
                :disabled="!umfrage.geraeteanzahl[2][2] || blockInput"
                :min="0"
                :label="$t('userSurvey.Survey.ITGeraeteBenutzteToner')"
                :suffix="$t('userSurvey.Survey.ITGeraeteBenutzteToner_Suffix')"
              />
            </v-row>
            <!-- Beamer -->
            <v-row>
              <v-checkbox
                v-model="umfrage.geraeteanzahl[4][2]"
                hide-details
                :disabled="blockInput"
              />
              <v-text-field
                v-model="umfrage.geraeteanzahl[4][1]"
                :rules="geraeteRules"
                :disabled="!umfrage.geraeteanzahl[4][2] || blockInput"
                :min="0"
                :label="$t('userSurvey.Survey.Beamer')"
                :suffix="$t('userSurvey.Survey.Beamer')"
              />
            </v-row>
            <!-- Server -->
            <v-row>
              <v-checkbox
                v-model="umfrage.geraeteanzahl[5][2]"
                hide-details
                :disabled="blockInput"
              />
              <v-text-field
                v-model="umfrage.geraeteanzahl[5][1]"
                :rules="geraeteRules"
                :disabled="!umfrage.geraeteanzahl[5][2] || blockInput"
                :min="0"
                :label="$t('userSurvey.Survey.interneServer')"
                :suffix="$t('userSurvey.Survey.Server')"
              />
            </v-row>
          </v-container>
        </v-card>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import Tooltip from "@/components/componentParts/Tooltip.vue";
import LoadingAnimation from "../componentParts/LoadingAnimation";
import DataGapVisualization from "../componentParts/DataGapVisualization";
import i18n from "@/i18n";
import { translateGebaeudeIDToSymbolic, translateGebaeudeIDToNumeric, resolveITGeraetID } from "../../utils";
import constants from "../../const.js";


export default {
  name: "EditSurvey",
  
  components: {
    LoadingAnimation,
    Tooltip,
    DataGapVisualization
  },

  props: {
    //UmfrageId
    umfrageidprop: {
      type: String,
      default: "",
    }
  },

  data: () => ({
    constants: constants,
    umfrage: {
      bezeichnung: null,
      mitarbeiteranzahl: null,
      jahr: null,
      gebaeude: [[null, null]],
      geraeteanzahl: [[7, null, false], [8, null, false], [9, null, false], [10, null, false], [4, null, false], [6, null, false]],
      umfrageID: "",
    },

    // Fehlermeldung bei Fehler mit Server
    errorMessage: null,

    // mögliche gebäudeIDs
    gebaeudeIDs: [],
    gebaeudeIDsUndZaehler: [],
    zaehler: [],

    // Blockiere Inputfelder bevor bearbeiten geklickt
    blockInput: true,

    // has Absenden Button been clicked
    dataRequestSent: false,

    // for user feedback after updating survey
    displayLoadingAnimation: false,
    displayError: false,
    displaySuccess: false,

    // for DataGapVisualization
    displayDataGapVisualization: false,

    // Dialogvariable + Array mit fehlerhaften Eingaben {fehler: "", pflicht: 0}
    errorDialog: false,
    errorTextArray: {
      required: [],
      nonRequired: []
    },

    //Rules for input validation
    geraeteRules: [],
    nichtnegativRules: [],
    absolutpositivRules: [],
  }),
  computed: {
    /**
     * Returns a list beginning with the current year until 2018.
     */
    possibleYears: function() {
      const beginningYear = 2018;
      let currentYear = new Date().getFullYear() - 1;
      return Array.from(new Array(currentYear - beginningYear + 1), (x, i) => i + beginningYear).reverse();
    },

    /**
     * Vergleicht ob das selbe Gebaeude zweimal ausgewaehlt wurde
     */
    duplicateBuilding: function() {
      for(var i = 0; i < this.umfrage.gebaeude.length; i++) {
        for(var j = 0; j < i; j++) {
          if(this.umfrage.gebaeude[i][0] == this.umfrage.gebaeude[j][0] && this.umfrage.gebaeude[i][0] != null) {
            return true
          }
        }
      }
      return false
    }
  },

  watch: {
    '$i18n.locale': function() {
      this.setRules();
    },
  },

  created() {
      this.setRules();
      this.fetchGebaeudeUndZaehlerData();
      this.umfrage.umfrageID = JSON.parse(JSON.stringify(this.umfrageidprop));
      this.fetchUmfrageData();
  },

  methods: {
    /**
     * This Method is needed bc of i18n. Otherwise after changing the language the rules would not change.
     */
    setRules: function(){
      this.geraeteRules = [
        (v) =>
          !!v || i18n.t('userSurvey.Survey.geraeteRules_1'),
        (v) =>
          parseInt(v) != 0 ||
          i18n.t('userSurvey.Survey.geraeteRules_1'),
        (v) => parseInt(v) > 0 || i18n.t('userSurvey.Survey.geraeteRules_3'),
      ]

      this.nichtnegativRules = [
        (v) => !!v || i18n.t('userSurvey.Survey.nichtnegativRules_0'),
        (v) => parseInt(v) >= 0 || i18n.t('userSurvey.Survey.nichtnegativRules_1'),
      ]

      this.absolutpositivRules = [
        (v) => !!v || i18n.t('userSurvey.Survey.absolutpositivRules_0'),
        (v) => parseInt(v) > 0 || i18n.t('userSurvey.Survey.absolutpositivRules_1'),
      ]
    },

    flipBearbeiten: function() {
        this.blockInput = !this.blockInput
        this.displaySuccess = false
        this.displayError = false
        this.displayLoadingAnimation = false
    },

    /**
     * Returns an array containing a list with every required field missing
     */
    requiredFieldsMissingArray: function() {
      var fieldsarray = []
      if(this.umfrage.bezeichnung == "" || this.umfrage.bezeichnung == null) {
        fieldsarray.push(i18n.t('userSurvey.Survey.requiredFieldsMissing_0'))
      }
      if(!this.possibleYears.includes(parseInt(this.umfrage.jahr))) {
        fieldsarray.push(i18n.t('userSurvey.Survey.requiredFieldsMissing_1'))
      }
      if(this.umfrage.mitarbeiteranzahl == null || this.umfrage.mitarbeiteranzahl <= 0) {
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
      this.umfrage.geraeteanzahl[1][2] = this.umfrage.geraeteanzahl[0][2];
      this.umfrage.geraeteanzahl[3][2] = this.umfrage.geraeteanzahl[2][2];
      var nonRequiredArray = []
      
      // Gebaeude
      if(this.duplicateBuilding) {
        nonRequiredArray.push(i18n.t('userSurvey.Survey.problemeInUmfrage_0'))
      } 
      for(const gebaeude of this.umfrage.gebaeude) {
        if(gebaeude[0] != null && gebaeude[1] <=0) {
          nonRequiredArray.push(i18n.t('userSurvey.Survey.problemeInUmfrage_1') + gebaeude[0] + i18n.t('userSurvey.Survey.problemeInUmfrage_2'))
        }
      }
      // IT Geraete
      for(const it of this.umfrage.geraeteanzahl) {
        if(it[2] && it[1] <= 0) { 
          if((it[0] != 8 && it[0] != 10)) {
            nonRequiredArray.push(i18n.t('userSurvey.Survey.problemeInUmfrage_3') + resolveITGeraetID(it[0]) + i18n.t('userSurvey.Survey.problemeInUmfrage_4'))
          } else { // Toner
            nonRequiredArray.push(i18n.t('userSurvey.Survey.problemeInUmfrage_5'))
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
      this.umfrage.gebaeude.push([null, null]);
    },

    /**
     * Removes the Gebäude at position index so that it won't show
     */
    removeGebaeude: function (index) {
      if (index >= 0 && this.umfrage.gebaeude.length > index) {
        this.umfrage.gebaeude.splice(index, 1);
        //When the only element is removed add a new, thereby clearing the values of the fields on the webpage
        if (this.umfrage.gebaeude.length === 0) {
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
      this.umfrage.geraeteanzahl[1][2] = this.umfrage.geraeteanzahl[0][2];
      this.umfrage.geraeteanzahl[3][2] = this.umfrage.geraeteanzahl[2][2];

      for (var geraet of this.umfrage.geraeteanzahl) {
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

      for (var objekt of this.umfrage.gebaeude) {
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
     * sendEdit sendet eine POST Request ans Backend, wodurch die Werte der Umfrage mit ID umfrageID aktualisiert werden
     */
    sendEdit: async function () {
      this.displayLoadingAnimation = true
      this.blockInput = true
      this.displayError = false

      await fetch(process.env.VUE_APP_BASEURL + "/umfrage/update", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + this.$keycloak.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          umfrageID: this.umfrage.umfrageID,
          bezeichnung: this.umfrage.bezeichnung,
          jahr: parseInt(this.umfrage.jahr),
          gebaeude: this.gebaeudeJSON(),
          mitarbeiteranzahl: parseInt(this.umfrage.mitarbeiteranzahl),
          itGeraete: this.itGeraeteJSON(),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if(data.status == "success") {
            this.displaySuccess = true
            this.displayLoadingAnimation = false
          }
          if(data.status == "error") {
            this.errorMessage = data.error.message
            this.displayError = true
            this.displayLoadingAnimation = false

            this.blockInput = false
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          this.errorMessage = "Server nicht erreichbar."
        });
      this.dataRequestSent = false;
    },

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
        
          this.gebaeudeIDs = data.data.gebaeude.map(obj => translateGebaeudeIDToSymbolic(obj.nr));

          this.mapGebauedeZaehlerRefs = new Map(
            data.data.gebaeude.map((obj) => [translateGebaeudeIDToSymbolic(obj.nr), {kaelteRef: obj.kaelteRef, stromRef: obj.stromRef, waermeRef: obj.waermeRef}])
          )

          this.mapZaehlerWerte = new Map(
            data.data.zaehler.map((obj) => [obj.pkEnergie, new Map(obj.zaehlerdatenVorhanden.map((obj2) => [obj2.jahr, obj2.vorhanden]))])
          )

          this.displayDataGapVisualization = true;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },

    /**
     * fetchUmfrageData sendet eine POST Request ans Backend. 
     * Liefert die aktuell in der Datenbank liegenden Umfragewerte der Umfrage mit ID umfrageID zurueck.
     */
    fetchUmfrageData: async function() {
       await fetch(process.env.VUE_APP_BASEURL + "/umfrage?id=" + this.umfrage.umfrageID, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + this.$keycloak.token,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if(data.status == "error") {
            this.errorMessage = data.error.message
          }
          else {
            // Bezeichner
            this.umfrage.bezeichnung = data.data.bezeichnung
            // Mitarbeiter
            this.umfrage.mitarbeiteranzahl = data.data.mitarbeiteranzahl
            // Bilanzjahr
            this.umfrage.jahr =  data.data.jahr
            // Gebaeude
            this.umfrage.gebaeude = this.parseGebaeude(data.data.gebaeude)
            if(this.umfrage.gebaeude.length == 0) {
              this.umfrage.gebaeude = [[null, null]]
            }
            // IT Geraete
            this.umfrage.geraeteanzahl = this.parseITGeraete(data.data.itGeraete)
          }
          
        })
        .catch((error) => {
          console.error("Error:", error);
          this.errorMessage = "Server nicht erreichbar."
        });
    },

    /**
     * parseGebaeude uebersetzt die numerische Gebaeudekennung (1101) in symbolische (S101) fuer alle Gebaeude in umfrage.gebaeude 
     */
    parseGebaeude: function(gebaeude) {
      this.umfrage.gebaeude = []
      for(var i = 0; i < gebaeude.length; i++) {
        this.umfrage.gebaeude.push([translateGebaeudeIDToSymbolic(gebaeude[i].gebaeudeNr), gebaeude[i].nutzflaeche]);
      }
      return this.umfrage.gebaeude
    },

    /**
     * parseITGeraete traegt die IT Geraete aus itGeraete in das Array geraeteanzahl an den korrekten Stellen ein.
     */
    parseITGeraete: function(itGeraete) {
    var map = new Map([[7,0], [8,1], [9,2], [10,3], [4,4], [6,5]])
    this.geraeteanzahl = [[7, null, false], [8, null, false], [9, null, false], [10, null, false], [4, null, false], [6, null, false]]
    for(var i = 0; i < itGeraete.length; i++) {
      var index = map.get(itGeraete[i].idITGeraete)
      this.geraeteanzahl[index] = [itGeraete[i].idITGeraete, itGeraete[i].anzahl, true]
    }
    return this.geraeteanzahl
  }
  },

};

</script>