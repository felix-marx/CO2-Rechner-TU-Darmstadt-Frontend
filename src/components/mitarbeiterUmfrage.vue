<template>
  <v-container>
    <v-card
      elevation="2"
      outlined
    >
      <h3>Survey with ID: {{ $route.params.umfrageID }}</h3>

      <v-form>
        <v-card class="pa-7">
          <h3>
            Wie kommen Sie ins Büro?
            <Tooltip
              tooltip-text="Zur Berechnung können Sie z.B. Google Maps verwenden. Falls Sie eine Fahrgemeinschaft haben, berechnen Sie die mittlere Fahrstrecke (mit z.B. Google Maps)."
            />
          </h3>
          <v-divider />
          <br>

          <div
            v-for="(medium, index) in verkehrsmittel"
            :key="'dienstreise-' + index"
          >
            <v-row>
              <!-- The length of the column is calculated based on the selection, so that the button to add new elements in this line -->
              <v-col :cols="medium[0] === 'Öffentliche' ? 4 : 6">
                <v-select
                  v-model="medium[0]"
                  :items="fahrtmediumListe"
                  label="Verkehrsmedium"
                />
              </v-col>
              <v-col
                v-if="medium[0] === 'Öffentliche'"
                :cols="medium[0] === 'Öffentliche' ? 3 : 0"
              >
                <v-select
                  v-model="medium[1]"
                  :items="fahrtmediumÖPNVListe"
                  label="ÖPNV"
                />
              </v-col>
              <v-col :cols="medium[0] === 'Öffentliche' ? 3 : 4">
                <v-text-field
                  v-model="medium[4]"
                  :rules="streckeRules"
                  :disabled="medium[0] === null"
                  :min="0"
                  label="Einfacher Pendelweg"
                  type="number"
                  suffix="km"
                />
              </v-col>
              <v-col>
                <v-btn
                  class="add_text--text"
                  color="add"
                  @click="newVerkehrsmittel()"
                >
                  Hinzufügen
                </v-btn>
              </v-col>
              <v-col>
                <v-btn
                  class="delete_text--text"
                  color="delete"
                  @click="removeVerkehrsmittel(index)"
                >
                  Löschen
                </v-btn>
              </v-col>
            </v-row>
            <!-- Weitere Reihe für PKWs mit Fahrgemeinschaft -->
            <h4
              v-show="
                medium[0] === 'PKW (Diesel)' || medium[0] === 'PKW (Benzin)'
              "
              class="my-3"
            >
              Fahren Sie in einer Fahrgemeinschaft?
            </h4>
            <v-row>
              <v-col :cols="1">
                <v-checkbox
                  v-show="
                    medium[0] === 'PKW (Diesel)' || medium[0] === 'PKW (Benzin)'
                  "
                  v-model="medium[2]"
                  label="Ja"
                  class="pr-4"
                />
              </v-col>
              <v-col :cols="9">
                <v-text-field
                  v-show="
                    medium[2] &&
                      (medium[0] === 'PKW (Diesel)' ||
                        medium[0] === 'PKW (Benzin)')
                  "
                  v-model="medium[3]"
                  :rules="mitfahrerRules"
                  :min="0"
                  label="Anzahl Mitfahrer"
                  type="number"
                  class="pr-5"
                />
              </v-col>
            </v-row>
          </div>

          <!-- Arbeitstage im Büro -->

          <br>
          <h3>Wie viele Tage in der Woche sind Sie im Büro?</h3>
          <v-divider />
          <br>

          <v-container>
            <v-row>
              <v-text-field
                v-model="arbeitstageBuero"
                :rules="tageImBueroRules"
                :min="0"
                :max="7"
                label="Tage im Büro"
                type="number"
              />
            </v-row>
          </v-container>

          <!-- Dienstreisen Abfrage Option mehrere anzugeben -->

          <br>
          <h3>
            Welche Dienstreisen haben Sie in den letzten 12 Monaten unternommen?
            <Tooltip
              tooltip-text="Zur Berechnung können Sie z.B. Google Maps verwenden. Bei Flugreisen können Sie als Distanz direkt die Summe aller Kurz- und Langstreckenflüge angeben."
            />
          </h3>
          <v-divider />
          <br>

          <div
            v-for="(reise, index) in dienstreise"
            :key="'verkehrsmittel-' + index"
          >
            <v-row>
              <v-col :cols="reise[0] === 'Flugzeug' ? 4 : 5">
                <v-select
                  v-model="reise[0]"
                  label="Verkehrsmittel"
                  :items="dienstreiseMediumListe"
                  class="pr-5"
                />
              </v-col>
              <!--<v-select v-model="flugklasse" label="Klasse" v-show="reise[0] === 'Flugzeug'" :items="flugklasseListe"></v-select>-->
              <v-col
                v-if="reise[0] === 'Flugzeug'"
                :cols="reise[0] === 'Flugzeug' ? 3 : 0"
              >
                <v-select
                  v-show="reise[0] === 'Flugzeug'"
                  v-model="reise[1]"
                  label="Flugstrecke"
                  :items="flugstreckeListe"
                  class="pr-5"
                />
              </v-col>
              <v-col :cols="reise[0] === 'Flugzeug' ? 3 : 5">
                <v-text-field
                  v-model="reise[2]"
                  :rules="streckeRules"
                  :disabled="reise[0] === null"
                  :min="0"
                  label="Einfache Distanz"
                  suffix="km"
                  class="pr-5"
                  type="number"
                />
              </v-col>
              <v-col>
                <v-btn
                  class="add_text--text"
                  color="add"
                  @click="newDienstreise()"
                >
                  Hinzufügen
                </v-btn>
              </v-col>
              <v-col>
                <v-btn
                  class="delete_text--text"
                  color="delete"
                  @click="removeDienstreise(index)"
                >
                  Löschen
                </v-btn>
              </v-col>
            </v-row>
          </div>

          <!-- Umfrage für die IT Geräte Notebook, Desktop PC, Bildschirm, Mobiltelfon -->

          <br>
          <h3>
            Welche IT-Geräte benutzen Sie bei Ihrer Arbeit?
            <Tooltip
              tooltip-text="Gemeinschaftlich genutzte IT-Geräte wie z.B. Multifunktionsdrucker werden hier nicht betrachtet."
            />
          </h3>

          <v-divider />
          <br>

          <v-container>
            <!-- Notebook -->
            <v-row>
              <v-checkbox
                v-model="geraeteAnzahl[0][2]"
                hide-details
              />
              <v-text-field
                v-model="geraeteAnzahl[0][1]"
                :rules="geraeteRules"
                :disabled="!geraeteAnzahl[0][2]"
                :min="0"
                label="Notebooks"
                type="number"
                class="pr-5"
                suffix="Gerät/e"
              />
            </v-row>
            <!-- Desktop PC -->
            <v-row>
              <v-checkbox
                v-model="geraeteAnzahl[1][2]"
                hide-details
              />
              <v-text-field
                v-model="geraeteAnzahl[1][1]"
                :rules="geraeteRules"
                :disabled="!geraeteAnzahl[1][2]"
                :min="0"
                label="Desktop PCs"
                type="number"
                class="pr-5"
                suffix="Gerät/e"
              />
            </v-row>
            <!-- Bildschirm -->
            <v-row>
              <v-checkbox
                v-model="geraeteAnzahl[2][2]"
                hide-details
              />
              <v-text-field
                v-model="geraeteAnzahl[2][1]"
                :rules="geraeteRules"
                :disabled="!geraeteAnzahl[2][2]"
                :min="0"
                label="Bildschirme"
                type="number"
                class="pr-5"
                suffix="Gerät/e"
              />
            </v-row>
            <!-- Mobiltelefon -->
            <v-row>
              <v-checkbox
                v-model="geraeteAnzahl[3][2]"
                hide-details
              />
              <v-text-field
                v-model="geraeteAnzahl[3][1]"
                :rules="geraeteRules"
                :disabled="!geraeteAnzahl[3][2]"
                :min="0"
                label="Mobiltelefone"
                type="number"
                class="pr-5"
                suffix="Gerät/e"
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

          <v-btn @click="sendData()">
            Absenden
          </v-btn>
        </v-card>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import Tooltip from "@/components/componentParts/tooltip.vue";

export default {
  components: {
    Tooltip,
  },

  data: () => ({
    //Arbeitstage
    arbeitstageBuero: null,

    //Pendelweg
    fahrtmediumListe: [
      "PKW (Diesel)",
      "PKW (Benzin)",
      "Fahrrad",
      "E-Fahrrad",
      "Motorisiertes Zweirad",
      "Öffentliche",
    ],
    fahrtmediumÖPNVListe: [
      "Bahn",
      "Bus",
      "U-Bahn",
      "Straßenbahn",
      "MIX inkl. U-Bahn",
      "MIX exkl. U-Bahn",
    ],
    /*
     * verkehrmittel Array format:
     * [0]: fahrtmedium || Öffentliche
     * [1]: null or if [0] is Öffentliche -> ÖPVN
     * [2]: true if Fahrgemeinschaft and [0] is a PKW typ
     * [3]: number of fahrgemeinschaftsmitglieder
     * [4]: einfacher Pendelweg
     */
    verkehrsmittel: [[null, null, false, null, null]],

    //Dienstreisen
    //Flugklasse is not needed for calculation
    //flugklasseListe: ['Economy', 'Business'],
    //flugklasse: null,
    dienstreiseMediumListe: [
      "PKW (Diesel)",
      "PKW (Benzin)",
      "Bahn",
      "Flugzeug",
    ],
    flugstreckeListe: ["Langstrecke", "Kurzstrecke"],
    /*
     * dienstreise Array format:
     * [0]: dienstreiseMedium selected from List
     * [1]: flugstreckentTyp either Lang- or Kurzstrecke
     * [2]: dienstreiseDistanz accumulates all distances over multiple Dienstreisen of the last 12 months
     */
    dienstreise: [[null, null, null]],

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

    //Rules for input validation
    tageImBueroRules: [
      (v) => !!v || "Muss angegeben werden.",
      (v) =>
        (parseInt(v) < 8 && parseInt(v) >= 0) ||
        "Bitte geben Sie die Tage pro Woche an.",
    ],
    streckeRules: [
      (v) => !!v || "Muss angegeben werden.",
      (v) => parseInt(v) > 0 || "Bitte geben Sie eine valide Distanz an.",
    ],
    geraeteRules: [
      (v) =>
        !!v || "Wenn Sie das Gerät nicht benutzen, wählen Sie es bitte ab.",
      (v) =>
        parseInt(v) != 0 ||
        "Wenn Sie das Gerät nicht benutzen, wählen Sie es bitte ab.",
      (v) => parseInt(v) > 0 || "Bitte geben Sie eine valide Menge an.",
    ],
    mitfahrerRules: [
      (v) => !!v || "Wenn Sie alleine fahren, wählen Sie bitte diese Option ab.",
      (v) =>
        parseInt(v) > 0 ||
        "Bitte geben Sie eine positive Anzahl an Mitfahrenden an.",
    ],

    //stores response JSON
    responseData: {},
  }),

  methods: {
    /**
     * Prints all variables to the console
     */
    logging: function () {
      console.log(
        "Arbeitstage:",
        this.arbeitstageBuero,
        "\n Verkehrsmittel:",
        this.verkehrsmittel,
        "\n Dienstreise:",
        this.dienstreise,
        "\n Geräte: ",
        this.geraeteAnzahl
      );
    },

    /**
     * Adds a new Verkehrsmittel to select as the  Pendelmedium
     */
    newVerkehrsmittel: function () {
      this.verkehrsmittel.push([null, null, false, null, null]);
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
    mapPendelverkehrsmittel: function (verkehrmittel1, verkehrsmittel2) {
      const verkehrsmittelMap = new Map([
        ["Fahrrad", 1],
        ["E-Fahrrad", 2],
        ["Motorisiertes Zweirad", 3],
        ["PKW (Diesel)", 4],
        ["PKW (Benzin)", 5],
        ["Bus", 6],
        ["Bahn", 7],
        ["U-Bahn", 8],
        ["Straßenbahn", 9],
        ["Mix inkl. U-Bahn", 10],
        ["Mix exkl. U-Bahn", 11],
      ]);
      if (verkehrmittel1 != "Öffentliche") {
        return verkehrsmittelMap.get(verkehrmittel1);
      } else {
        return verkehrsmittelMap.get(verkehrsmittel2);
      }
    },

    /**
     * Returns an array formatted [Medium ID, if PKW String of Tank else null]
     */
    mapDienstreisemittel: function (verkehrsmittel) {
      const verkehrsmittelMap = new Map([
        ["Bahn", 1],
        ["PKW (Diesel)", 2],
        ["PKW (Benzin)", 2],
        ["Flugzeug", 3],
      ]);
      return [
        verkehrsmittelMap.get(verkehrsmittel),
        parseInt(verkehrsmittelMap.get(verkehrsmittel)) == 2
          ? verkehrsmittel == "PKW (Benzin)"
            ? "Benzin"
            : "Diesel"
          : "",
      ];
    },

    /**
     * Adds a new Dienstreise to select as another Dienstreisemedium
     */
    newDienstreise: function () {
      this.dienstreise.push([null, null, null]);
    },

    /**
     * Removes a Dienstreise at the given index, therby deleting it from the webpage
     */
    removeDienstreise: function (index) {
      if (index >= 0 && this.dienstreise.length > index) {
        this.dienstreise.splice(index, 1);
        //When the only element is removed add a new, thereby clearing the values of the fields on the webpage
        if (this.dienstreise.length === 0) {
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
        buildPendelweg.push({
          strecke: parseInt(pendel[4]),
          idPendelweg: parseInt(
            this.mapPendelverkehrsmittel(pendel[0], pendel[1])
          ),
          //return 1 for no fahrgemeinschaft. In Question we ask Anzahl Mitfahrer so pendel[3]+1 are all persons in the vehicle
          personenanzahl: parseInt(
            pendel[3] == null ? 1 : parseInt(pendel[3]) + 1
          ),
        });
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
      for (var reise of this.dienstreise) {
        var dienstreisetyp = this.mapDienstreisemittel(reise[0]);
        buildDienstreisen.push({
          idDienstreise: parseInt(dienstreisetyp[0]),
          //Catches spezial case were user selects Flugtyp but then changes to other Verkehrsmedium
          streckentyp: parseInt(dienstreisetyp[0]) == 3 ? reise[1] : "",
          strecke: parseInt(reise[2]),
          tankart: dienstreisetyp[1],
        });
      }
      return buildDienstreisen;
    },

    /**
     * Sends an JSON POST request to the backend to insert the data into the database and start the calculation
     */
    sendData: async function () {
      await fetch("http://localhost:9000/mitarbeiterUmfrage/insertMitarbeiterUmfrage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pendelweg: this.pendelwegJSON(),
          tageImBuero: parseInt(this.arbeitstageBuero),
          dienstreise: this.dienstreisenJSON(),
          itGeraete: this.itGeraeteJSON(),
          idUmfrage: this.$route.params.umfrageID,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          this.responseData = data;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
};
</script>

<!-- Removes the buttons in textfields to increase decrease number -->
<style lang="scss">
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>