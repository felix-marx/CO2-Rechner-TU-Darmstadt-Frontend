<!-- eslint-disable vue/no-v-html -->
<template>
  <v-container>
    <v-card class="pa-7 mt-2">
      <!-- Introduction Text -->
      <p> {{ ($t('colleagueSurvey.colleagueSurvey.UmfrageErklaerung_0')) }} </p>
      <p v-html="$t('colleagueSurvey.colleagueSurvey.UmfrageErklaerung_1')" />
      <p>{{ ($t('colleagueSurvey.colleagueSurvey.UmfrageErklaerung_2')) }} <b>{{ umfrageYear }}</b> {{ ($t('colleagueSurvey.colleagueSurvey.UmfrageErklaerung_3')) }} </p>
      <p>{{ ($t('colleagueSurvey.colleagueSurvey.UmfrageErklaerung_4')) }}</p>
      <p> {{ ($t('colleagueSurvey.colleagueSurvey.UmfrageErklaerung_5')) }}</p>
      <p> {{ ($t('colleagueSurvey.colleagueSurvey.UmfrageErklaerung_6')) }}</p>
    </v-card>
    <v-card
      elevation="2"
      class="pa-7 mt-2"
      outlined
    >
      <v-card-title>
        {{ bezeichnung }}
      </v-card-title>

      <!-- Umfrage -->
      <v-form>
        <!-- Pendelwege -->

        <h3>
          {{ ($t('colleagueSurvey.colleagueSurvey.WieInsBuero')) }}
          <Tooltip
            :tooltip-text="$t('colleagueSurvey.colleagueSurvey.WieInsBuero_tooltip')"
          />
        </h3>
        <v-divider />
        <br>

        <div
          v-for="(medium, index) in verkehrsmittel"
          :key="'pendelweg-' + index"
        >
          <v-row>
            <!-- The length of the column is calculated based on the selection, so that the button to add new elements in this line -->
            <v-col :cols="medium[0] === $t('colleagueSurvey.colleagueSurvey.fahrmediumListe_5') ? 4 : 6">
              <v-select
                v-model="medium[0]"
                :items="fahrtmediumListe"
                :disabled="submittedDataSuccessfully"
                :label="$t('colleagueSurvey.colleagueSurvey.WieInsBuero_verkehrsmedium')"
              />
            </v-col>
            <v-col
              v-if="medium[0] === $t('colleagueSurvey.colleagueSurvey.fahrmediumListe_5')"
              :cols="medium[0] === $t('colleagueSurvey.colleagueSurvey.fahrmediumListe_5') ? 3 : 0"
            >
              <v-select
                v-model="medium[1]"
                :disabled="submittedDataSuccessfully"
                :items="fahrtmediumÖPNVListe"
                :label="$t('colleagueSurvey.colleagueSurvey.fahrtmediumOEPNV')"
              />
            </v-col>
            <v-col
              v-if="medium[0] === $t('colleagueSurvey.colleagueSurvey.fahrmediumListe_0')"
            >
              <v-select
                v-model="medium[5]"
                :items="pkwListe"
                :disabled="submittedDataSuccessfully"
                :label="$t('colleagueSurvey.colleagueSurvey.Pkw_Motortyp')"
              >
              </v-select>
            </v-col>
            <v-col :cols="medium[0] === $t('colleagueSurvey.colleagueSurvey.fahrmediumListe_5') ? 3 : 4">
              <v-text-field
                v-model="medium[4]"
                :rules="streckeRules"
                :disabled="medium[0] === null || (medium[0] === $t('colleagueSurvey.colleagueSurvey.fahrmediumListe_5') && medium[1] === null) || submittedDataSuccessfully"
                :min="0"
                :label="$t('colleagueSurvey.colleagueSurvey.WieInsBuero_pendelweg')"
                suffix="km"
              />
            </v-col>
            <v-col>
              <v-btn
                class="add_text--text"
                color="add"
                :disabled="submittedDataSuccessfully"
                @click="newVerkehrsmittel()"
              >
                {{ ($t('common.Hinzufuegen')) }}
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                class="delete_text--text"
                color="delete"
                :disabled="submittedDataSuccessfully"
                @click="removeVerkehrsmittel(index)"
              >
                {{ ($t('common.Loeschen')) }}
              </v-btn>
            </v-col>
          </v-row>
          <!-- Weitere Reihe für PKWs mit Fahrgemeinschaft -->
          <h4
            v-show="
              medium[0] === $t('colleagueSurvey.colleagueSurvey.fahrmediumListe_0')
            "
            class="my-3"
          >
            {{ $t('colleagueSurvey.colleagueSurvey.WieInsBuero_fahrgemeinschaft') }}
          </h4>
          <v-row>
            <v-col :cols="1">
              <v-checkbox
                v-show="
                  medium[0] === $t('colleagueSurvey.colleagueSurvey.fahrmediumListe_0')
                "
                v-model="medium[2]"
                :disabled="submittedDataSuccessfully"
                :label="$t('common.Ja')"
                class="pr-4"
              />
            </v-col>
            <v-col :cols="9">
              <v-text-field
                v-show="
                  medium[2] &&
                    (medium[0] === $t('colleagueSurvey.colleagueSurvey.fahrmediumListe_0'))
                "
                v-model="medium[3]"
                :rules="mitfahrerRules"
                :disabled="submittedDataSuccessfully"
                :min="0"
                :label="$t('colleagueSurvey.colleagueSurvey.WieInsBuero_anzahlMitfahrende')"
                class="pr-5"
              />
            </v-col>
          </v-row>
        </div>

        <!-- Arbeitstage im Büro -->

        <br>
        <h3>{{ $t('colleagueSurvey.colleagueSurvey.TageBuero') }}</h3>
        <v-divider />
        <br>

        <v-container>
          <v-row>
            <v-text-field
              v-model="arbeitstageBuero"
              :rules="tageImBueroRules"
              :disabled="submittedDataSuccessfully"
              :min="0"
              :max="7"
              :label="$t('colleagueSurvey.colleagueSurvey.TageBuero_label')"
            />
          </v-row>
        </v-container>

        <!-- Dienstreisen Abfrage Option mehrere anzugeben -->

        <br>
        <h3>
          {{ $t('colleagueSurvey.colleagueSurvey.Dienstreise_0') }} {{ umfrageYear }} 
          {{ $t('colleagueSurvey.colleagueSurvey.Dienstreise_1') }}
          <Tooltip
            :tooltip-text="$t('colleagueSurvey.colleagueSurvey.Dienstreise_tooltip')"
          />
        </h3>
        <v-divider />
        <br>

        <div
          v-for="(reise, index) in dienstreisen"
          :key="'dienstreisen-' + index"
        >
          <v-row>
            <v-col :cols="reise[0] === $t('colleagueSurvey.colleagueSurvey.dienstreiseMediumListe_3') ? 2 : 5">
              <v-select
                v-model="reise[0]"
                :disabled="submittedDataSuccessfully"
                :label="$t('colleagueSurvey.colleagueSurvey.WieInsBuero_verkehrsmedium')"
                :items="dienstreiseMediumListe"
                class="pr-5"
              />

            </v-col>
            <v-col
              v-if="reise[0] === $t('colleagueSurvey.colleagueSurvey.dienstreiseMediumListe_0')"
              :cols="reise[0] === $t('colleagueSurvey.colleagueSurvey.dienstreiseMediumListe_0') ? 3 : 0"
            >
              <!-- PKW Diesel / Benzin auswahl -->
              <v-select
                v-model="reise[1]"
                :v-show="reise[0] === $t('colleagueSurvey.colleagueSurvey.dienstreiseMediumListe_0')"
                :label="$t('colleagueSurvey.colleagueSurvey.Pkw_Motortyp')"
                :items="pkwListe"
                :disabled="submittedDataSuccessfully"
                class="pr-5"
              />
            </v-col>
            <!-- Flugstreckentyp auswahl-->
            <v-col 
              v-if="reise[0] === $t('colleagueSurvey.colleagueSurvey.dienstreiseMediumListe_3')"
              :cols="reise[0] === $t('colleagueSurvey.colleagueSurvey.dienstreiseMediumListe_3') ? 2 : 0"
            >
              <v-select 
                v-model="reise[1]" 
                :label="$t('colleagueSurvey.colleagueSurvey.flugstreckentyp')" 
                v-show="reise[0] === $t('colleagueSurvey.colleagueSurvey.dienstreiseMediumListe_3')" 
                :items="flugstreckeListe"
                class="pr-5"
              />
            </v-col>
            <!-- Flugklasse auswahl-->
            <v-col
              v-if="reise[0] === $t('colleagueSurvey.colleagueSurvey.dienstreiseMediumListe_3')"
              :cols="reise[0] === $t('colleagueSurvey.colleagueSurvey.dienstreiseMediumListe_3') ? 2 : 0"
            >
              <v-select
                v-model="reise[3]"
                :disabled="submittedDataSuccessfully"
                :label="$t('colleagueSurvey.colleagueSurvey.Flugklasse')"
                :items="mapDienstreiseFlugklasse(reise[1])"
                class="pr-5"/>
            </v-col>
            <v-col :cols="reise[0] === $t('colleagueSurvey.colleagueSurvey.dienstreiseMediumListe_3') ? 3 : 5">
              <v-text-field
                v-model="reise[2]"
                :rules="streckeRules"
                :disabled="reise[0] === null || submittedDataSuccessfully"
                :min="0"
                :label="$t('colleagueSurvey.colleagueSurvey.EinfacheDistanz')"
                suffix="km"
                class="pr-5"
              />
            </v-col>
            <v-col>
              <v-btn
                class="add_text--text"
                color="add"
                :disabled="submittedDataSuccessfully"
                @click="newDienstreise()"
              >
                {{ $t('common.Hinzufuegen') }}
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                class="delete_text--text"
                color="delete"
                :disabled="submittedDataSuccessfully"
                @click="removeDienstreise(index)"
              >
                {{ $t('common.Loeschen') }}
              </v-btn>
            </v-col>
          </v-row>
        </div>

        <!-- Umfrage für die IT Geräte Notebook, Desktop PC, Bildschirm, Mobiltelfon -->

        <br>
        <h3>
          {{ $t('colleagueSurvey.colleagueSurvey.IT_Geraete') }}
          <Tooltip
            :tooltip-text="$t('colleagueSurvey.colleagueSurvey.IT_Geraete_tooltip')"
          />
        </h3>

        <v-divider />
        <br>

        <v-container>
          <!-- Notebook -->
          <v-row>
            <v-checkbox
              v-model="geraeteAnzahl[0][2]"
              :disabled="submittedDataSuccessfully"
              hide-details
            />
            <v-text-field
              v-model="geraeteAnzahl[0][1]"
              :rules="geraeteRules"
              :disabled="!geraeteAnzahl[0][2] || submittedDataSuccessfully"
              :min="0"
              :label="$t('colleagueSurvey.colleagueSurvey.IT_Geraete_Notebooks')"
              class="pr-5"
              :suffix="$t('colleagueSurvey.colleagueSurvey.IT_Geraete_Suffix')"
            />
          </v-row>
          <!-- Desktop PC -->
          <v-row>
            <v-checkbox
              v-model="geraeteAnzahl[1][2]"
              hide-details
              :disabled="submittedDataSuccessfully"
            />
            <v-text-field
              v-model="geraeteAnzahl[1][1]"
              :rules="geraeteRules"
              :disabled="!geraeteAnzahl[1][2] || submittedDataSuccessfully"
              :min="0"
              :label="$t('colleagueSurvey.colleagueSurvey.IT_Geraete_Desktops')"
              class="pr-5"
              :suffix="$t('colleagueSurvey.colleagueSurvey.IT_Geraete_Suffix')"
            />
          </v-row>
          <!-- Bildschirm -->
          <v-row>
            <v-checkbox
              v-model="geraeteAnzahl[2][2]"
              hide-details
              :disabled="submittedDataSuccessfully"
            />
            <v-text-field
              v-model="geraeteAnzahl[2][1]"
              :rules="geraeteRules"
              :disabled="!geraeteAnzahl[2][2] || submittedDataSuccessfully"
              :min="0"
              :label="$t('colleagueSurvey.colleagueSurvey.IT_Geraete_Bildschirme')"
              class="pr-5"
              :suffix="$t('colleagueSurvey.colleagueSurvey.IT_Geraete_Suffix')"
            />
          </v-row>
          <!-- Mobiltelefon -->
          <v-row>
            <v-checkbox
              v-model="geraeteAnzahl[3][2]"
              hide-details
              :disabled="submittedDataSuccessfully"
            />
            <v-text-field
              v-model="geraeteAnzahl[3][1]"
              :rules="geraeteRules"
              :disabled="!geraeteAnzahl[3][2] || submittedDataSuccessfully"
              :min="0"
              :label="$t('colleagueSurvey.colleagueSurvey.IT_Geraete_Mobiltelefone')"
              class="pr-5"
              :suffix="$t('colleagueSurvey.colleagueSurvey.IT_Geraete_Suffix')"
            />
          </v-row>
        </v-container>

        <!--- Papierverbrauch currently not used
          <br>
          <h3>Schätzen Sie bitte wie viele Blätter Papier Sie in einer typischen Woche verbrauchen.</h3>
          <v-divider></v-divider>
          
          <v-container>
            <v-row>
                <v-select v-model="papierverbrauch" :items="papierverbrauchListe" label="Papierverbrauch"></v-select>
            </v-row>
          </v-container> -->

        <v-row>
          <v-col cols="2">
            <v-dialog
              v-model="errorDialog"
              transition="dialog-bottom-transition"
            >
              <!-- Mit diesem Button soll die Umfrage abgesendet werden. -->
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="mr-4"
                  color="primary"
                  :disabled="submittedDataSuccessfully"
                  v-bind="attrs"
                  v-on="on"
                  @click="checkValidInput()"
                >
                  {{ ($t('common.Absenden')) }}
                </v-btn>
              </template>

              <v-card>
                <v-toolbar
                  color="primary"
                  dark
                >
                  {{ (errorsArray.length != 0) ? $t('colleagueSurvey.colleagueSurvey.EingabeValidierung_Problem') : $t('colleagueSurvey.colleagueSurvey.EingabeValidierung_Vollstaendig') }}
                </v-toolbar>
                <v-card-text>
                  <div
                    v-if="errorsArray.length != 0"
                    class="pt-6"
                  >
                    {{ $t('colleagueSurvey.colleagueSurvey.EingabeValidierung_kleinereProbleme') }} <br>
                    <v-list
                      flat
                    >
                      <v-list-item
                        v-for="(problem, index) in errorsArray"
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
                  <div 
                    v-if="errorsArray.length == 0"
                    class="pt-6"
                  >
                    {{ $t('colleagueSurvey.colleagueSurvey.EingabeValidierung_Absenden_0') }}<br>
                    {{ $t('colleagueSurvey.colleagueSurvey.EingabeValidierung_Absenden_1') }}
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
                    {{ $t('colleagueSurvey.colleagueSurvey.EingabeValidierung_Bearbeiten') }}
                  </v-btn>
                  <v-btn
                    v-if="errorsArray.length == 0"
                    color="primary"
                    text
                    @click="sendData(), errorDialog = false"
                  >
                    {{ $t('colleagueSurvey.colleagueSurvey.EingabeValidierung_Absenden') }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
          <v-col cols="10">
            <LoadingAnimation v-if="displayLoadingAnimation" />
            <v-alert
              :value="errorMessage !== null"
              dense
              text
              type="error"
            >
              {{ errorMessage }}
            </v-alert>
            <v-alert
              :value="submittedDataSuccessfully"
              dense
              text
              type="success"
            >
              {{ $t('colleagueSurvey.colleagueSurvey.Absenden_Erfolgreich') }}
            </v-alert>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import Tooltip from "@/components/componentParts/Tooltip.vue";
import LoadingAnimation from '../componentParts/LoadingAnimation.vue';
import i18n from "@/i18n";

export default {  components: {
    Tooltip,
    LoadingAnimation
  },

  props: {
    bezeichnung: {
      default: "",
      type: String
    }
  },

  data: () => ({
    umfrageYear: "UnknownYear",

    // display of alerts
    displayLoadingAnimation: false,
    errorMessage: null,
    submittedDataSuccessfully: false,

    //Arbeitstage
    arbeitstageBuero: null,

    //Pendelweg ------------------------------------------
    fahrtmediumListe: [],
    fahrtmediumÖPNVListe: [],
    /*
     * verkehrmittel Array format:
     * [0]: fahrtmedium || Öffentliche
     * [1]: null or if [0] is Öffentliche -> ÖPVN
     * [2]: true if Fahrgemeinschaft and [0] is a PKW typ
     * [3]: number of fahrgemeinschaftsmitglieder
     * [4]: einfacher Pendelweg
     * [5]: Tankart if [0] is PKW(Diesel or Benzin)
     */
    verkehrsmittel: [[null, null, false, null, null, null]],

    //Dienstreisen ---------------------------------------
    dienstreiseMediumListe: [],
    flugstreckeListe: [],
    flugklassenListe: [],

    /*
     * dienstreisen Array format:
     * [0]: dienstreiseMedium selected from List
     * [1]: flugstreckentTyp either Lang- or Kurzstrecke
     * [2]: dienstreiseDistanz accumulates all distances over multiple Dienstreisen of the last 12 months
     * [3]: flugklasse
     */
    dienstreisen: [[null, null, null, null]],

    //IT Geräte
    /* Geraet mit Array Position format [intern Geraete ID, Anzahl, enabled]
     * [0] Notebook
     * [1] DesktopPC
     * [2] Bildschirm
     * [3] Mobiltelefon
     */
    geraeteAnzahl: [
      [1, null, false],
      [2, null, false],
      [3, null, false],
      [5, null, false],
    ],

    //Papierverbrauch currently not used
    //papierverbrauch: null,
    //papierverbrauchListe: ['0', '1-20', '21 - 50', '51 - 70', '70+']

    //Array containing found errors in form
    errorsArray: [],
    errorDialog: false,

    //Rules for input validation
    tageImBueroRules: [
      (v) => !!v || i18n.t('colleagueSurvey.colleagueSurvey.Rules_MussAngegeben'),
      (v) =>
        (parseInt(v) < 8 && parseInt(v) >= 0) ||
        i18n.t('colleagueSurvey.colleagueSurvey.TageBueroRules_0'),
    ],
    streckeRules: [
      (v) => !!v || i18n.t('colleagueSurvey.colleagueSurvey.Rules_MussAngegeben'),
      (v) => parseInt(v) > 0 || i18n.t('colleagueSurvey.colleagueSurvey.StreckeRules_0'),
    ],
    geraeteRules: [
      (v) =>
        !!v || i18n.t('colleagueSurvey.colleagueSurvey.GeraeteRules_0'),
      (v) =>
        parseInt(v) != 0 ||
        i18n.t('colleagueSurvey.colleagueSurvey.GeraeteRules_0'),
      (v) => parseInt(v) > 0 || i18n.t('colleagueSurvey.colleagueSurvey.GeraeteRules_1'),
    ],
    mitfahrerRules: [
      (v) => !!v || i18n.t('colleagueSurvey.colleagueSurvey.MitfahrerRules_0'),
      (v) =>
        parseInt(v) > 0 ||
        i18n.t('colleagueSurvey.colleagueSurvey.MitfahrerRules_1'),
    ],
  }),
  watch: {
    '$i18n.locale': function() {
      this.setListe();

      // reset values for Pendelwege and Dienstreisen
      this.verkehrsmittel = [[null, null, false, null, null, null]]
      this.dienstreisen = [[null, null, null, null]]
    },
  },
  created() {
    this.fetchUmfrageYear(this.$route.params.umfrageID);  // request the year of the umfrage
    this.setListe();
  },

  methods: {
    // This Method is needed bc of i18n. 
    // Otherwise after changing the language the dropdown menus would not change.
    setListe: function(){
      this.fahrtmediumListe = [
        i18n.t("colleagueSurvey.colleagueSurvey.fahrmediumListe_0"),
        i18n.t("colleagueSurvey.colleagueSurvey.fahrmediumListe_2"),
        i18n.t("colleagueSurvey.colleagueSurvey.fahrmediumListe_3"),
        i18n.t("colleagueSurvey.colleagueSurvey.fahrmediumListe_4"),
        i18n.t("colleagueSurvey.colleagueSurvey.fahrmediumListe_5"),
        i18n.t("colleagueSurvey.colleagueSurvey.fahrmediumListe_6")
      ]
      this.fahrtmediumÖPNVListe = [
        i18n.t("colleagueSurvey.colleagueSurvey.fahrtmediumOEPNVListe_0"),
        i18n.t("colleagueSurvey.colleagueSurvey.fahrtmediumOEPNVListe_1"),
        i18n.t("colleagueSurvey.colleagueSurvey.fahrtmediumOEPNVListe_2"),
        i18n.t("colleagueSurvey.colleagueSurvey.fahrtmediumOEPNVListe_3"),
        i18n.t("colleagueSurvey.colleagueSurvey.fahrtmediumOEPNVListe_4"),
        i18n.t("colleagueSurvey.colleagueSurvey.fahrtmediumOEPNVListe_5"),
      ]
      this.dienstreiseMediumListe = [
        i18n.t("colleagueSurvey.colleagueSurvey.dienstreiseMediumListe_0"),
        i18n.t("colleagueSurvey.colleagueSurvey.dienstreiseMediumListe_2"),
        i18n.t("colleagueSurvey.colleagueSurvey.dienstreiseMediumListe_3"),
      ],
      this.flugstreckeListe = [
        i18n.t("colleagueSurvey.colleagueSurvey.flugstreckeListe_0"), //Langstrecke
        i18n.t("colleagueSurvey.colleagueSurvey.flugstreckeListe_1"), //Kurzstrecke
        i18n.t("colleagueSurvey.colleagueSurvey.flugstreckeListe_2"), //Inland
        i18n.t("colleagueSurvey.colleagueSurvey.flugstreckeListe_3"), //International
      ],
      this.pkwListe = [
        i18n.t("colleagueSurvey.colleagueSurvey.dienstreiseMedium_Diesel"),
        i18n.t("colleagueSurvey.colleagueSurvey.dienstreiseMedium_Benzin"),
      ],
      this.flugklassenListe = [
        i18n.t("colleagueSurvey.colleagueSurvey.flugklasse_average"), //average
        i18n.t("colleagueSurvey.colleagueSurvey.flugklasse_economy"), //economy
        i18n.t("colleagueSurvey.colleagueSurvey.flugklasse_business"), //business
        i18n.t("colleagueSurvey.colleagueSurvey.flugklasse_premiumeconomy"), //premium economy
        i18n.t("colleagueSurvey.colleagueSurvey.flugklasse_first"), //first
      ]
    },

    /**
     * Adds a new Verkehrsmittel to select as the  Pendelmedium
     */
    newVerkehrsmittel: function () {
      this.verkehrsmittel.push([null, null, false, null, null, null]);
    },

    /**
     * Removes the element at the position index from the verkehrmittel index therfore removing this field from displaying
     */
    removeVerkehrsmittel: function (index) {
      if (index >= 0 && this.verkehrsmittel.length > index) {
        this.verkehrsmittel.splice(index, 1);
        //When the only element is removed add a new, thereby clearing the values of the fields on the webpage
        if (this.verkehrsmittel.length === 0) {
          this.newVerkehrsmittel();
        }
      } else {
        console.error("Negative or out of bounds array index supplied");
      }
    },

    /**
     * Returns an Integer ID that resolves the Pendelmedium Name to its specified internal ID
     */
    mapPendelverkehrsmittel: function (verkehrsmitteltyp, oepnvspezifikation, tankspezifikation) {
      console.log(verkehrsmitteltyp, oepnvspezifikation, tankspezifikation)
      //Backend expects the following IDs for the following Verkehrsmittel
      const verkehrsmittelMap = new Map([
        [i18n.t('colleagueSurvey.colleagueSurvey.fahrmediumListe_2'), 1], //Fahrrad
        [i18n.t('colleagueSurvey.colleagueSurvey.fahrmediumListe_3'), 2], //E-Bike
        [i18n.t('colleagueSurvey.colleagueSurvey.fahrmediumListe_4'), 3], //Motorisiertes Zweirad"
        [i18n.t('colleagueSurvey.colleagueSurvey.Pkw_diesel'), 4], // Diesel
        [i18n.t('colleagueSurvey.colleagueSurvey.Pkw_benzin'), 5], // Benzin
        [i18n.t('colleagueSurvey.colleagueSurvey.fahrtmediumOEPNVListe_1'), 6], //Bus
        [i18n.t('colleagueSurvey.colleagueSurvey.fahrtmediumOEPNVListe_0'), 7], //Bahn
        [i18n.t('colleagueSurvey.colleagueSurvey.fahrtmediumOEPNVListe_2'), 8], //U-Bahn
        [i18n.t('colleagueSurvey.colleagueSurvey.fahrtmediumOEPNVListe_3'), 9], //Straßenbahn
        [i18n.t('colleagueSurvey.colleagueSurvey.fahrtmediumOEPNVListe_4'), 10], //Mix inkl. U-Bahn
        [i18n.t('colleagueSurvey.colleagueSurvey.fahrtmediumOEPNVListe_5'), 11], //Mix exkl. U-Bahn
        [i18n.t('colleagueSurvey.colleagueSurvey.fahrmediumListe_6'), 12] // Zu Fuß 
      ]);
      //Check if Öffentliche is selected
      if(verkehrsmitteltyp === i18n.t('colleagueSurvey.colleagueSurvey.fahrmediumListe_5')) {
        return verkehrsmittelMap.get(oepnvspezifikation);
        //Check if PKW is selected
      } else if(verkehrsmitteltyp === i18n.t('colleagueSurvey.colleagueSurvey.fahrmediumListe_0')){
        return verkehrsmittelMap.get(tankspezifikation);
      } else {
        return verkehrsmittelMap.get(verkehrsmitteltyp);
      }
    },

    /**
     * Returns an array formatted [Medium ID, if PKW String of Tank else null]
     */
    mapDienstreisemittel: function (verkehrsmittel) {
      const verkehrsmittelMap = new Map([
        [i18n.t('colleagueSurvey.colleagueSurvey.fahrtmediumOEPNVListe_0'), 1], //Bahn
        [i18n.t('colleagueSurvey.colleagueSurvey.dienstreiseMediumListe_0'), 2], //PKW
        [i18n.t('colleagueSurvey.colleagueSurvey.dienstreiseMediumListe_3'), 3], //Flugzeug
      ]);
      
      //Tankart should be empty if not PKW
      var tankart = "";

      //Check if verkehrsmittel is PKW
      if(parseInt(verkehrsmittelMap.get(verkehrsmittel)) == 2) {
        //Check if Benzin or Diesel
        if(this.verkehrmittel[5] == i18n.t('colleagueSurvey.colleagueSurvey.dienstreiseMedium_Benzin')) {
          tankart = "Benzin"
        } else if(this.verkehrmittel[5] == i18n.t('colleagueSurvey.colleagueSurvey.dienstreiseMedium_Diesel')) {
          tankart = "Diesel"
        } else {
          console.error("No valid Tankart selected")
          tankart = "";
        }
      }

      return [
        verkehrsmittelMap.get(verkehrsmittel),
        tankart
      ];

      // return [
      //   verkehrsmittelMap.get(verkehrsmittel),
      //   parseInt(verkehrsmittelMap.get(verkehrsmittel)) == 2
      //     ? verkehrsmittel == i18n.t('colleagueSurvey.colleagueSurvey.dienstreiseMediumListe_0')
      //       ? i18n.t('colleagueSurvey.colleagueSurvey.dienstreiseMedium_Benzin')
      //       : i18n.t('colleagueSurvey.colleagueSurvey.dienstreiseMedium_Diesel')
      //     : "",
      // ];
    },

    mapDienstreiseFlugkategorie: function (reisedistanz) {
      //Langstrecke
      if(reisedistanz > 750){
        return i18n.t('colleagueSurvey.colleagueSurvey.flugstreckeListe_0')
      }
      //Kurzstrecke
      return i18n.t('colleagueSurvey.colleagueSurvey.flugstreckeListe_1') 
    },

    mapDienstreiseFlugklasse: function (flugstreckeart) {
      if(flugstreckeart == i18n.t('colleagueSurvey.colleagueSurvey.flugstreckeListe_0')){ //Langstrecke
        return [
          i18n.t('colleagueSurvey.colleagueSurvey.flugklasse_average'),
          i18n.t('colleagueSurvey.colleagueSurvey.flugklasse_economy'),
          i18n.t('colleagueSurvey.colleagueSurvey.flugklasse_business'),
          i18n.t('colleagueSurvey.colleagueSurvey.flugklasse_premiumeconomy'),
          i18n.t('colleagueSurvey.colleagueSurvey.flugklasse_first')
        ]
      } else if (flugstreckeart == i18n.t('colleagueSurvey.colleagueSurvey.flugstreckeListe_1')) { //Kurzstrecke
        return [
          i18n.t('colleagueSurvey.colleagueSurvey.flugklasse_average'),
          i18n.t('colleagueSurvey.colleagueSurvey.flugklasse_economy'),
          i18n.t('colleagueSurvey.colleagueSurvey.flugklasse_business')
        ]
      } else if (flugstreckeart == i18n.t('colleagueSurvey.colleagueSurvey.flugstreckeListe_2')) { //Inland
        return [
          i18n.t('colleagueSurvey.colleagueSurvey.flugklasse_average'),
        ]
      } else if (flugstreckeart == i18n.t('colleagueSurvey.colleagueSurvey.flugstreckeListe_3')) { //International
        return [
          i18n.t('colleagueSurvey.colleagueSurvey.flugklasse_average'),
          i18n.t('colleagueSurvey.colleagueSurvey.flugklasse_economy'),
          i18n.t('colleagueSurvey.colleagueSurvey.flugklasse_business'),
          i18n.t('colleagueSurvey.colleagueSurvey.flugklasse_premiumeconomy'),
          i18n.t('colleagueSurvey.colleagueSurvey.flugklasse_first')
        ]
      }
    },


    /**
     * Adds a new Dienstreise to select as another Dienstreisemedium
     */
    newDienstreise: function () {
      this.dienstreisen.push([null, null, null, null]);
    },

    /**
     * Removes a Dienstreise at the given index, therby deleting it from the webpage
     */
    removeDienstreise: function (index) {
      if (index >= 0 && this.dienstreisen.length > index) {
        this.dienstreisen.splice(index, 1);
        //When the only element is removed add a new, thereby clearing the values of the fields on the webpage
        if (this.dienstreisen.length === 0) {
          this.newDienstreise();
        }
      } else {
        console.error("Negative or out of bounds array index supplied");
      }
    },

    /**
     * Return an array of the Pendelweg data as specified in the API Documentation
     *  [{
     *    strecke: Integer
     *    idPendelweg: Integer
     *    personenanzahl: Integer
     *  }]
     *
     */
    pendelwegJSON: function () {
      //Build Pendelweg Array
      var buildPendelweg = [];
      for (var pendel of this.verkehrsmittel) {
        // eslint-disable-next-line no-extra-boolean-cast
        if(!!pendel[0]){
          buildPendelweg.push({
            strecke: parseInt(pendel[4]),
            idPendelweg: parseInt(
              this.mapPendelverkehrsmittel(pendel[0], pendel[1], pendel[5])
            ),
            //return 1 for no fahrgemeinschaft. In Question we ask Anzahl Mitfahrer so pendel[3]+1 are all persons in the vehicle
            personenanzahl: parseInt(
              pendel[3] == null ? 1 : parseInt(pendel[3]) + 1
            ),
          });
        }
      }
      return buildPendelweg;
    },

    /**
     * Returns an array of the Geräte data as specified in the API Documentation
     *  [{
     *    idITGeraete: Integer
     *    anzahl: Integer
     *  }]
     *
     */
    itGeraeteJSON: function () {
      //Build IT Geräte Array of non-null gerate
      var usedITGeraete = [];
      for (var geraet of this.geraeteAnzahl) {
        if (geraet[1] > 0 && geraet[2] == true) {
          usedITGeraete.push({
            idITGeraete: parseInt(geraet[0]),
            anzahl: parseInt(geraet[1]),
          });
        }
      }
      return usedITGeraete;
    },

    /**
     * Returns an array of the Dienstreise data as specified in API Documentation
     *  [{
     *    idDienstreise: Integer
     *    streckentyp: String
     *    strecke: Integer
     *    tankart: String
     *  }]
     *
     */
    dienstreisenJSON: function () {
      //Build Dienstreisen Array
      var buildDienstreisen = [];
      for (var dienstreise of this.dienstreisen) {
        // eslint-disable-next-line no-extra-boolean-cast
        if(!!dienstreise[0]){
          var dienstreisetyp = this.mapDienstreisemittel(dienstreise[0]);

          buildDienstreisen.push({
            idDienstreise: parseInt(dienstreisetyp[0]),
            //Catches spezial case where user selects Flugtyp but then changes to other Verkehrsmedium
            streckentyp: parseInt(dienstreisetyp[0]) == 3 ? dienstreise[1] : "",
            strecke: parseInt(dienstreise[2]),
            tankart: dienstreisetyp[1], //Empty if not PKW
            klasse: dienstreise[3], //Empty if not Flugzeug
          });
        }
      }
      console.log(buildDienstreisen);
      return buildDienstreisen;
    },

    /**
     * Checks if input to form is valid i.e. has no logical errors
     * and returns an List of found errors
     */
    checkValidInput: function() {
      var errors = []
      // Check for Pendelweg distance and valid öffentliche
      for(const verkehr  of this.verkehrsmittel) {
        var verkehrsmedium = (verkehr[0] != i18n.t('colleagueSurvey.colleagueSurvey.fahrmediumListe_5')) ? verkehr[0] : verkehr[1]
        if(verkehr[0] != null && (!verkehr[4] || verkehr[4] < 0)) {
          if(verkehrsmedium == null) {
            errors.push(i18n.t('colleagueSurvey.colleagueSurvey.EingabeValidierung_Verkehrsmedium'))
          } else {
            errors.push(i18n.t('colleagueSurvey.colleagueSurvey.EingabeValidierung_Pendelweg_0') + verkehrsmedium + i18n.t('colleagueSurvey.colleagueSurvey.EingabeValidierung_Pendelweg_1'))
          }
        }
        if(verkehr[0] != null && verkehr[2] && !verkehr[3]) {
          errors.push(i18n.t('colleagueSurvey.colleagueSurvey.EingabeValidierung_Pendelweg_0') + verkehrsmedium + i18n.t('colleagueSurvey.colleagueSurvey.EingabeValidierung_Fahrgemeinschaft_0')+ verkehrsmedium + i18n.t('colleagueSurvey.colleagueSurvey.EingabeValidierung_Fahrgemeinschaft_1'))
        }
      }
      // Check number of days in office
      if(this.arbeitstageBuero < 0 || this.arbeitstageBuero > 7) {
        errors.push(i18n.t('colleagueSurvey.colleagueSurvey.EingabeValidierung_TageBuero'))
      }
      // Check for Dienstreise
      for(const dienst of this.dienstreisen) {
        if(dienst[0] && (!dienst[2] || dienst[2] < 0)) {
          var dienstmedium = (dienst[0] != i18n.t('colleagueSurvey.colleagueSurvey.dienstreiseMediumListe_3')) ? dienst[0] : dienst[1]
          if(dienstmedium == null) {
            errors.push(i18n.t('colleagueSurvey.colleagueSurvey.EingabeValidierung_Dienstreise_0')) 
          } else {
            errors.push(i18n.t('colleagueSurvey.colleagueSurvey.EingabeValidierung_Dienstreise_1') + dienst[0] + i18n.t('colleagueSurvey.colleagueSurvey.EingabeValidierung_Dienstreise_2'))
          }
        }
      }
      // Check IT Geraete
      for(const geraet of this.geraeteAnzahl) {
        var geraeteName = (geraet[0] == 1) ? i18n.t('colleagueSurvey.colleagueSurvey.IT_Gereate_Notebook') : (geraet[0] == 2) ? i18n.t('colleagueSurvey.colleagueSurvey.IT_Gereate_Desktop')  : (geraet[0] == 3) ? i18n.t('colleagueSurvey.colleagueSurvey.IT_Gereate_Bildschirm') : i18n.t('colleagueSurvey.colleagueSurvey.IT_Gereate_Mobiltelefon')
        if(geraet[2] && geraet[1] == null) {
          errors.push(i18n.t('colleagueSurvey.colleagueSurvey.EingabeValidierung_Gereate_0') + geraeteName + i18n.t('colleagueSurvey.colleagueSurvey.EingabeValidierung_Gereate_1'))
        }
        else if(geraet[2] && geraet[1] < 0) {
          errors.push(i18n.t('colleagueSurvey.colleagueSurvey.EingabeValidierung_Gereate_0') + geraeteName + i18n.t('colleagueSurvey.colleagueSurvey.EingabeValidierung_Gereate_1'))
        }
      }
      this.errorsArray = errors
    },

    /**
     * Sends a JSON POST request to the backend to insert the data into the database and start the calculation
     */
    sendData: async function () {
      this.displayLoadingAnimation = true;
      await fetch(process.env.VUE_APP_BASEURL + "/mitarbeiterumfrage/insert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pendelweg: this.pendelwegJSON(),
          tageImBuero: parseInt(this.arbeitstageBuero),
          dienstreisen: this.dienstreisenJSON(),
          itGeraete: this.itGeraeteJSON(),
          idUmfrage: this.$route.params.umfrageID,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if(data.status === "success"){
            this.submittedDataSuccessfully = true;
            this.errorMessage = null;
          }else if(data.status == "error") {
            this.errorMessage = data.error.message;
          }
          this.displayLoadingAnimation = false;
        })
        .catch((error) => {
          console.error("Error:", error);
          this.errorMessage = "Server nicht erreichbar.";
          this.displayLoadingAnimation = false;
        });
    },

    /**
   * Requests from the server to which year the survey belongs.
   */
    fetchUmfrageYear: async function (givenID) {
      await fetch(process.env.VUE_APP_BASEURL + "/umfrage/jahr?id=" + givenID, {
        method: "GET",
        })
        .then((response) => response.json())
        .then((data) => {
          if (data.status == "success"){
            this.umfrageYear = String(data.data.jahr);
          }
          else{
            this.umfrageYear = "UnknownYear";
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          this.umfrageYear = "UnknownYear";
        });
    },
  },
};
</script>