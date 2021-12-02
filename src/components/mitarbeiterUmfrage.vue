<template>
  <v-container>
    <v-card elevation="2" outlined>
      <v-form>
        <v-card class="pa-7">
           <h3>Wie kommen Sie ins Büro?
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">
                    mdi-help-circle-outline
                  </v-icon>
                </template>
                Die Distanz können Sie zum Beispiel mit Google Maps bestimmen.
              </v-tooltip>
            </h3>
            <v-divider></v-divider>
            <br>
          
          <v-container>
            <v-row>
                <v-select v-model="verkehrsmittel[0][0]" :items="fahrtmediumListe" label="Verkehrsmedium" class="pr-5"></v-select>
                <v-select v-model="verkehrsmittel[0][1]" v-show="verkehrsmittel[0][0] === 'Öffentliche'" :items="fahrtmediumÖPNVListe" label="ÖPNV" class="pr-5"></v-select>
                <v-text-field v-model="verkehrsmittel[0][4]" :rules="streckeRules" label="Einfacher Pendelweg" type=number suffix="km"></v-text-field>
            </v-row>
            <h4 v-show="verkehrsmittel[0][0] === 'PKW (Diesel)' || verkehrsmittel[0][0] === 'PKW (Benzin)'" class="my-3">Fahren Sie in einer Fahrgemeinschaft?</h4>
            <v-row>
                <v-checkbox v-show="verkehrsmittel[0][0] === 'PKW (Diesel)' || verkehrsmittel[0][0] === 'PKW (Benzin)'" v-model="verkehrsmittel[0][2]" label="Ja" class="pr-4"></v-checkbox>
                <v-text-field v-model="verkehrsmittel[0][3]" v-show="verkehrsmittel[0][2] && (verkehrsmittel[0][0] === 'PKW (Diesel)' || verkehrsmittel[0][0] === 'PKW (Benzin)')" 
                    label="Anzahl Mitfahrer" type="number" class="pr-5"></v-text-field>
            </v-row>
          </v-container>

          <br>
          <h3>Wie viele Tage in der Woche sind Sie im Büro?</h3>
          <v-divider></v-divider>
          <br>

          <v-container>
            <v-row>
                <v-text-field :rules="tageImBueroRules" v-model="arbeitstageBuero" label="Tage im Büro" type=number></v-text-field>
            </v-row>
          </v-container>

          <br>
          <h3>Welche Dienstreisen haben Sie in den letzten 12 Monaten unternommen?</h3>
          <v-divider></v-divider>
          <br>

          <v-container>
            <v-row>
                <v-select v-model="dienstreise[0][0]" label="Verkehrsmittel" :items="dienstreiseMediumListe" class="pr-5"></v-select>
                <!--<v-select v-model="flugklasse" label="Klasse" v-show="dienstreise[0][0] === 'Flugzeug'" :items="flugklasseListe"></v-select>-->
                <v-select v-model="dienstreise[0][1]" label="Flugstrecke" v-show="dienstreise[0][0] === 'Flugzeug'" :items="flugstreckeListe" class="pr-5"></v-select>
                <v-text-field v-model="dienstreise[0][2]" :rules="streckeRules" :disabled="(dienstreise[0][0] === null)" label="Einfache Distanz" suffix="km" class="pr-5"></v-text-field>
            </v-row>
          </v-container>

          <br>
          <h3>Welche IT-Geräte benutzen Sie in ihrer Arbeit?</h3>
          <v-divider></v-divider>
          <br>

          <v-container>
            <v-row>
                <v-checkbox  v-model="geraeteAnzahl[0][2]" hide-details></v-checkbox>
                <v-text-field v-model="geraeteAnzahl[0][1]" :rules="geraeteRules" :disabled="!geraeteAnzahl[0][2]" label="Notebooks" type="number" class="pr-5" suffix="Gerät/e"></v-text-field>
            </v-row>
            <v-row>
                <v-checkbox v-model="geraeteAnzahl[1][2]" hide-details></v-checkbox>
                <v-text-field v-model="geraeteAnzahl[1][1]" :rules="geraeteRules" :disabled="!geraeteAnzahl[1][2]" label="Desktop PCs" type="number" class="pr-5" suffix="Gerät/e"></v-text-field>
            </v-row>
            <v-row>
                <v-checkbox v-model="geraeteAnzahl[2][2]" hide-details></v-checkbox>
                <v-text-field v-model="geraeteAnzahl[2][1]" :rules="geraeteRules" :disabled="!geraeteAnzahl[2][2]" label="Bildschirme" type="number" class="pr-5" suffix="Gerät/e"></v-text-field>
            </v-row>
            <v-row>
                <v-checkbox v-model="geraeteAnzahl[3][2]" hide-details></v-checkbox>
                <v-text-field v-model="geraeteAnzahl[3][1]" :rules="geraeteRules" :disabled="!geraeteAnzahl[3][2]" label="Mobiltelefone" type="number" class="pr-5" suffix="Gerät/e"></v-text-field>
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

          <v-btn @click="sendData()">Absenden</v-btn>
        </v-card>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    //Arbeitstage
    arbeitstageBuero: null,

    //Pendelweg
    fahrtmediumListe: ['PKW (Diesel)', 'PKW (Benzin)', 'Fahrrad', 'E-Fahrrad', 'Motorisiertes Zweirad', 'Öffentliche'],
    fahrtmediumÖPNVListe: ['Bahn', 'Bus', 'U-Bahn', 'Straßenbahn', 'MIX inkl. U-Bahn', 'MIX exkl. U-Bahn'],
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
    dienstreiseMediumListe: ['PKW (Diesel)', 'PKW (Benzin)', 'Bahn', 'Flugzeug'],
    flugstreckeListe: ['Langstrecke', 'Kurzstrecke'],
    /*
     * dienstreise Array format:
     * [0]: dienstreiseMedium selected from List
     * [1]: flugstreckentTyp either Lang- or Kurzstrecke
     * [2]: dienstreiseDistanz accumulates all distances over multiple Dienstreisen of the last 12 months
     */
    dienstreise: [[null, null, null]],

    //IT Geräte
    /* Geraet mit Array Position format [intern Geraete ID, Anzahl, enabled]
     * Notebook 0
     * DesktopPC 1
     * Bildschirm 2
     * Mobiltelefon 3
     */
    geraeteAnzahl: [[1, null, false], [2, null, false], [3, null, false], [5, null, false]],
    
    activeNotebook: false,
    activeDesktopPC: false,
    activeBildschirm: false,
    activeMobiltelefon: false,
    
    //Papierverbrauch currently not used
    //papierverbrauch: null,
    //papierverbrauchListe: ['0', '1-20', '21 - 50', '51 - 70', '70+']

    //Rules for input validation
    tageImBueroRules: [
      v => !!v || "Muss angegeben werden",
      v => (parseInt(v) < 8 && parseInt(v) >= 0 ) || "Bitte geben Sie die Tage pro Woche an"
    ],
    streckeRules: [
      v => !!v || "Muss angegeben werden",
      v => (parseInt(v) > 0) || "Bitte geben Sie eine valide Distanz an"
    ],
    geraeteRules: [
      v => !!v || "Wenn Sie das Gerät nicht benutzten, wählen Sie es bitte ab",
      v => (parseInt(v)> 0) || "Bitte geben Sie eine valide Menge an"
    ]

    }),

    methods: {
      logging: function() {
        console.log("Arbeitstage:", this.arbeitstageBuero, "\n Verkehrsmittel:", this.verkehrsmittel,
        "\n Dienstreise:", this.dienstreise, "\n Geräte: ", this.geraeteAnzahl)
      },

      /**
       * Returns an Integer ID that resolves the Pendelmedium Name to its specified internal ID
       */
      mapPendelverkehrsmittel: function(verkehrmittel1, verkehrsmittel2) {
        const verkehrsmittelMap = new Map([
          ["Fahrrad", 1], ["E-Fahrrad", 2], ["Motorisiertes Zweirad", 3], ["PKW (Diesel)", 4], ["PKW (Benzin)", 5], 
          ["Bus", 6], ["Bahn", 7], ["U-Bahn", 8], ["Straßenbahn", 9], ["MIX inkl. U-Bahn", 10], ["MIX exkl. U-Bahn", 11]
        ])
        if(verkehrmittel1 != 'Öffentliche') {
          return verkehrsmittelMap.get(verkehrmittel1)
        }
        else {
          return verkehrsmittelMap.get(verkehrsmittel2)
        }
      },
      
      /**
       * Returns an array formatted [Medium ID, if PKW String of Tank else null]
       */
      mapDienstreisemittel: function(verkehrsmittel) {
        const verkehrsmittelMap = new Map([
          ["Bahn", 1], ["PKW (Diesel)", 2], ["PKW (Benzin)", 2], ["Flugzeug", 3]
        ])
        return [verkehrsmittelMap.get(verkehrsmittel), (parseInt(verkehrsmittelMap.get(verkehrsmittel)) == 2 ? (verkehrsmittel == "PKW (Benzin)" ? "Benzin" : "Diesel") : "")]
      },

      /**
       * Return an array of the Pendelweg data as specified in the API Documentation
       *  [{
       *    strecke: Integer
       *    idPendelweg: Integer
       *    personenanzahl: Integer
       *  }]]
       * 
       */
      pendelwegJSON: function() {
        //Build Pendelweg Array
        var buildPendelweg = []
        for (var pendel of this.verkehrsmittel) {
            buildPendelweg.push({
              strecke: parseInt(pendel[4]),
              idPendelweg: parseInt(this.mapPendelverkehrsmittel(pendel[0], pendel[1])),
              //return 1 for no fahrgemeinschaft. In Question we ask Anzahl Mitfahrer so pendel[3]+1 are all persons in the vehicle
              personenanzahl: parseInt(pendel[3] == null ? 1 : pendel[3]+1)
            })
        }
        return buildPendelweg
      },

      /**
       * Returns an array of the Geräte data as specified in the API Documentation
       *  [{
       *    idITGeraete: Integer
       *    anzahl: Integer
       *  }]
       * 
       */
      itGeraeteJSON: function() {
        //Build IT Geräte Array of non-null gerate
        var usedITGeraete = []
        for (var geraet of this.geraeteAnzahl) {
          if(geraet[1] > 0 && geraet[2] == true) {
            usedITGeraete.push({
              idITGeraete: parseInt(geraet[0]),
              anzahl: parseInt(geraet[1])
            })
          }
        }
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
      dienstreisenJSON: function() {
         //Build Dienstreisen Array
        var buildDienstreisen = []
        for (var reise of this.dienstreise) {
          var dienstreisetyp = this.mapDienstreisemittel(reise[0])
          buildDienstreisen.push({
            idDienstreise: parseInt(dienstreisetyp[0]),
            //Catches spezial case were user selects Flugtyp but then changes to other Verkehrsmedium
            streckentyp: (parseInt(dienstreisetyp[0]) == 3 ? reise[1] : ""),
            strecke: parseInt(reise[2]),
            tankart: dienstreisetyp[1]
          })
        }
      },

      /**
       * Sends an JSON POST request to the backend to insert the data into the database and start the calculation 
       */
      sendData: async function () {              

        /*console.log(JSON.stringify({
            pendelweg: this.pendelwegJSON(),
            tageImBuero: parseInt(this.arbeitstageBuero),
            dienstreise: this.dienstreisenJSON(),
            itGeraete: this.itGeraeteJSON()
          }))*/

        await fetch("http://localhost:9000/umfrage/mitarbeiter", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pendelweg: this.pendelwegJSON(),
            tageImBuero: parseInt(this.arbeitstageBuero),
            dienstreise: this.dienstreisenJSON(),
            itGeraete: this.itGeraeteJSON()
          })
        })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }

}
</script>

<style lang="scss">
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>