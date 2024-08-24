<template>
  <v-container>
    <v-card
      elevation="2"
      border
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
              density="compact"
              variant="tonal"
            >
              {{ $t('userSurveyManagement.editSurvey.ErfolgreichGeändert') }}
            </v-alert>
            <v-alert
              v-if="displayError"
              type="error"
              density="compact"
              variant="tonal"
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
              <template #activator="{ props }">
                <v-btn
                  color="blue"
                  class="text-white"
                  :disabled="blockInput"
                 
                  v-bind="props"
                  @click="problemeInUmfrage()"
                >
                  <v-icon start>
                    mdi-content-save
                  </v-icon>
                  {{ $t('userSurveyManagement.editSurvey.AenderungSpeichern') }}
                </v-btn>
              </template>

              <v-card>
                <v-toolbar
                  class="px-4"
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
                      {{ $t('userSurveyManagement.editSurvey.UmfrageHatProbleme') }}<br>
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
                    {{ $t('userSurveyManagement.editSurvey.UmfrageWirklichSpeichern_1') }}
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
                    {{ $t('userSurveyManagement.editSurvey.WeiterBearbeiten') }}
                  </v-btn>
                  <v-btn
                    v-if="errorTextArray.required.length == 0"
                    color="primary"
                    variant="text"
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
              <v-icon start>
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
                ref="bezeichnung"
                v-model="umfrage.bezeichnung"
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
          <h3>
            {{ $t('userSurveyManagement.editSurvey.WelchesBilanzierungsjahr') }}
          </h3>
          <v-divider />
          <br>

          <v-row>
            <v-col :cols="$vuetify.display.smAndUp ? 5 : 8">
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
                ref="anzahlMitarbeiter"
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
                class="text-center"
              >
                <v-btn
                  class="delete_text--text mx-auto mt-1"
                  color="delete"
                  icon="mdi-delete-outline"
                  :disabled="blockInput"
                  @click="removeGebaeude(index)"
                />
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
            <!-- Desktop -->
            <template v-if="!$vuetify.display.mobile">
              <!-- Multifunktionsgeräte -->
              <v-row>
                <v-col class="py-0">
                  <number-input
                    ref="multifunktionsgeraete"
                    v-model="umfrage.geraeteAnzahl[0][1]"
                    :disabled="blockInput"
                    :min="0"
                    :rules="geraeteRules"
                    :label="$t('userSurvey.Survey.ITGeraeteMFP')"
                    :suffix="$t('userSurvey.Survey.ITGeraeteMFP_Suffix')"
                  />
                </v-col>
                <v-col class="py-0">
                  <number-input
                    ref="multifunktionsgeraeteToner"
                    v-model="umfrage.geraeteAnzahl[1][1]"
                    :disabled="blockInput"
                    :min="0"
                    :rules="geraeteRules"
                    :label="$t('userSurvey.Survey.ITGeraeteBenutzteToner')"
                    :suffix="$t('userSurvey.Survey.ITGeraeteBenutzteToner_Suffix')"
                  />
                </v-col>
              </v-row>

              <!-- Drucker -->
              <v-row>
                <v-col class="py-0">
                  <number-input 
                    ref="drucker"
                    v-model="umfrage.geraeteAnzahl[2][1]"
                    :disabled="blockInput"
                    :min="0"
                    :rules="geraeteRules"
                    :label="$t('userSurvey.Survey.DruckerLabel')"
                    :suffix="$t('userSurvey.Survey.Drucker_Suffix')"
                  />
                </v-col>
                <v-col class="py-0">
                  <number-input  
                    ref="druckerToner"
                    v-model="umfrage.geraeteAnzahl[3][1]"
                    :disabled="blockInput"
                    :min="0"
                    :rules="geraeteRules"
                    :label="$t('userSurvey.Survey.ITGeraeteBenutzteToner')"
                    :suffix="$t('userSurvey.Survey.ITGeraeteBenutzteToner_Suffix')"
                  />
                </v-col>
              </v-row>
            </template>
            <!-- Mobile -->
            <template v-else>
              <!-- Multifunktionsgeräte -->
              <v-row>
                <v-col class="py-0">
                  <number-input 
                    ref="multifunktionsgeraete"
                    v-model="umfrage.geraeteAnzahl[0][1]"
                    :disabled="blockInput"
                    :min="0"
                    :rules="geraeteRules"
                    :label="$t('userSurvey.Survey.ITGeraeteMFP')"
                    :suffix="$t('userSurvey.Survey.ITGeraeteMFP_Suffix')"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col class="py-0">
                  <number-input  
                    ref="multifunktionsgeraeteToner"
                    v-model="umfrage.geraeteAnzahl[1][1]"
                    :disabled="blockInput"
                    :min="0"
                    :rules="geraeteRules"
                    :label="$t('userSurvey.Survey.ITGeraeteBenutzteToner')"
                    :suffix="$t('userSurvey.Survey.ITGeraeteBenutzteToner_Suffix')"
                  />
                </v-col>
              </v-row>

              <!-- Drucker -->
              <v-row>
                <v-col class="py-0">
                  <number-input 
                    ref="drucker"
                    v-model="umfrage.geraeteAnzahl[2][1]"
                    :disabled="blockInput"
                    :min="0"
                    :rules="geraeteRules"
                    :label="$t('userSurvey.Survey.DruckerLabel')"
                    :suffix="$t('userSurvey.Survey.Drucker_Suffix')"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col class="py-0">
                  <number-input  
                    ref="druckerToner"
                    v-model="umfrage.geraeteAnzahl[3][1]"
                    :disabled="blockInput"
                    :min="0"
                    :rules="geraeteRules"
                    :label="$t('userSurvey.Survey.ITGeraeteBenutzteToner')"
                    :suffix="$t('userSurvey.Survey.ITGeraeteBenutzteToner_Suffix')"
                  />
                </v-col>
              </v-row>
            </template>

            <!-- Beamer -->
            <v-row>
              <v-col class="py-0">
                <number-input 
                  ref="beamer"
                  v-model="umfrage.geraeteAnzahl[4][1]"
                  :disabled="blockInput"
                  :min="0"
                  :rules="geraeteRules"
                  :label="$t('userSurvey.Survey.Beamer')"
                  :suffix="$t('userSurvey.Survey.Beamer')"
                />
              </v-col>
            </v-row>

            <!-- Server -->
            <v-row>
              <v-col class="py-0">
                <number-input 
                  ref="server"
                  v-model="umfrage.geraeteAnzahl[5][1]"
                  :disabled="blockInput"
                  :min="0"
                  :rules="geraeteRules"
                  :label="$t('userSurvey.Survey.interneServer')"
                  :suffix="$t('userSurvey.Survey.Server')"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import Tooltip from "@/components/componentParts/Tooltip.vue";
import LoadingAnimation from "@/components/componentParts/LoadingAnimation.vue";
import DataGapVisualization from "@/components/componentParts/DataGapVisualization.vue";
import NumberInput from "@/components/componentParts/NumberInput.vue";
import { translateGebaeudeIDToSymbolic, translateGebaeudeIDToNumeric, resolveITGeraetID } from "@/utils.js";
import constants from "@/const.js";

export default {
  name: "EditSurvey",
  
  components: {
    LoadingAnimation,
    Tooltip,
    DataGapVisualization,
    NumberInput
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
      geraeteAnzahl: [
        [constants.it_geraet_multifunktionsgeraet, null],
        [constants.it_geraet_multifunktionsgeraet_toner, null],
        [constants.it_geraet_drucker, null],
        [constants.it_geraet_drucker_toner, null],
        [constants.it_geraet_beamer, null],
        [constants.it_geraet_server, null],
      ],
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

      // revalidate textfields to change language of error messages
      this.$refs.bezeichnung.validate();
      this.$refs.anzahlMitarbeiter.validate();
      for (var i = 0; i < this.gebaeude.length; i++) {
        this.$refs["flaeche" + i][0].validate();
      }
      this.$refs.multifunktionsgeraete.validate();
      this.$refs.multifunktionsgeraeteToner.validate();
      this.$refs.drucker.validate();
      this.$refs.druckerToner.validate();
      this.$refs.beamer.validate();
      this.$refs.server.validate();
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
      this.universalRules = [
        (v) => !!v || this.$t('userSurvey.Survey.universalRules_0'),
      ],

      this.geraeteRules = [
        (v) => !!v || this.$t('userSurvey.Survey.geraeteRules_3'),
        (v) => parseInt(v) >= 0 || this.$t('userSurvey.Survey.geraeteRules_3'),
      ],

      this.nichtnegativRules = [
        (v) => !!v || this.$t('userSurvey.Survey.nichtnegativRules_0'),
        (v) => parseInt(v) >= 0 || this.$t('userSurvey.Survey.nichtnegativRules_1'),
      ]

      this.absolutpositivRules = [
        (v) => !!v || this.$t('userSurvey.Survey.absolutpositivRules_0'),
        (v) => parseInt(v) > 0 || this.$t('userSurvey.Survey.absolutpositivRules_1'),
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
        fieldsarray.push(this.$t('userSurvey.Survey.requiredFieldsMissing_0'))
      }
      if(!this.possibleYears.includes(parseInt(this.umfrage.jahr))) {
        fieldsarray.push(this.$t('userSurvey.Survey.requiredFieldsMissing_1'))
      }
      if(this.umfrage.mitarbeiteranzahl == null || this.umfrage.mitarbeiteranzahl <= 0) {
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
      var nonRequiredArray = []
      
      // Gebaeude
      if(this.duplicateBuilding) {
        nonRequiredArray.push(this.$t('userSurvey.Survey.problemeInUmfrage_0'))
      } 
      for(const gebaeude of this.umfrage.gebaeude) {
        if(gebaeude[0] != null && gebaeude[1] <=0) {
          nonRequiredArray.push(this.$t('userSurvey.Survey.problemeInUmfrage_1') + gebaeude[0] + this.$t('userSurvey.Survey.problemeInUmfrage_2'))
        }
      }
      // IT Geraete
      for(const it of this.geraeteAnzahl) {
        if(it[1] < 0) { 
          nonRequiredArray.push(this.$t("userSurvey.Survey.problemeInUmfrage_3") + resolveITGeraetID(it[0]) + this.$t("userSurvey.Survey.problemeInUmfrage_4"))
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

      for (var geraet of this.geraeteAnzahl) {
        if (geraet[1] > 0) {
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

      await fetch(import.meta.env.VITE_BASEURL + "/umfrage/update", {
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
       await fetch(import.meta.env.VITE_BASEURL + "/umfrage?id=" + this.umfrage.umfrageID, {
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
            this.umfrage.jahr = data.data.jahr
            // Gebaeude
            this.umfrage.gebaeude = this.parseGebaeude(data.data.gebaeude)
            if(this.umfrage.gebaeude.length == 0) {
              this.umfrage.gebaeude = [[null, null]]
            }
            // IT Geraete
            this.umfrage.geraeteAnzahl = this.parseITGeraete(data.data.itGeraete)
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
     * parseITGeraete traegt die IT Geraete aus itGeraete in das Array geraeteAnzahl an den korrekten Stellen ein.
     */
    parseITGeraete: function(itGeraete) {
    var map = new Map([
      [constants.it_geraet_multifunktionsgeraet, 0], 
      [this.constants.it_geraet_multifunktionsgeraet_toner, 1], 
      [this.constants.it_geraet_drucker, 2], 
      [this.constants.it_geraet_drucker_toner, 3], 
      [this.constants.it_geraet_beamer, 4], 
      [this.constants.it_geraet_server, 5]
    ])
    this.geraeteAnzahl = [
      [this.constants.it_geraet_multifunktionsgeraet, '0'],
      [this.constants.it_geraet_multifunktionsgeraet_toner, '0'],
      [this.constants.it_geraet_drucker, '0'],
      [this.constants.it_geraet_drucker_toner, '0'],
      [this.constants.it_geraet_beamer, '0'],
      [this.constants.it_geraet_server, '0'],
    ]

    for(var i = 0; i < itGeraete.length; i++) {
      var index = map.get(itGeraete[i].idITGeraete)
      this.geraeteAnzahl[index] = [itGeraete[i].idITGeraete, itGeraete[i].anzahl.toString()]
    }
    return this.geraeteAnzahl
  }
  },

};

</script>