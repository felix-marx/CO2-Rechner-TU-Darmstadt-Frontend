<template>
  <v-container>
    <v-card elevation="2" outlined>
      <v-form lazy-validation>
        <v-card class="pa-7" >

          <br>
          <h3>Wie viele Mitarbeiter arbeiten in ihrer Abteilung?</h3>
          <v-divider></v-divider>
          <br>

          <v-container>
            <v-row>
              <v-text-field :rules="mitarbeiterRules" v-model="anzahlMitarbeiter" label="Mitarbeiteranzahl" prepend-icon="mdi-account"></v-text-field>
            </v-row>
          </v-container>

          <br>
          <h3>Welche Gebäude nutzt ihre Abteilung?</h3>
          <v-divider></v-divider>
          <br>

          <v-container>
            <v-row>
              <v-text-field v-model="gebaeudeNr" label="Gebäudenr" prepend-icon="mdi-domain" class="pr-5"></v-text-field>
              <v-text-field v-model="flaechenanteil" label="Nutzfläche" prepend-icon="mdi-domain" suffix="qm"></v-text-field>
            </v-row>
          </v-container>

          <br>
          <h3>Welche IT-Geräte benutzen Sie in ihrer Abteilung gemeinschaftlich?</h3>
          <v-divider></v-divider>
          <br>
          
          <v-container>
            <v-row>
              <v-checkbox v-model="geraeteAnzahl[0][2]" hide-details></v-checkbox>
              <v-text-field v-model="geraeteAnzahl[0][1]" :rules="geraeteRules" :disabled="!geraeteAnzahl[0][2]" label="Multifunktionsgeräte z.B. Netzwerkdrucker" type="number" class="pr-5" suffix="Gerät/e"></v-text-field>
              <v-text-field v-model="geraeteAnzahl[1][1]" :rules="geraeteRules" :disabled="!geraeteAnzahl[0][2]" label="verbrauchte Toner" type="number" suffix="Toner"></v-text-field>
            </v-row>
            <v-row>
              <v-checkbox v-model="geraeteAnzahl[2][2]" hide-details></v-checkbox>
              <v-text-field v-model="geraeteAnzahl[2][1]" :rules="geraeteRules" :disabled="!geraeteAnzahl[2][2]" label="Laser- & Tintenstrahldrucker" type="number" suffix="Drucker" class="pr-5"></v-text-field>
              <v-text-field v-model="geraeteAnzahl[3][1]" :rules="geraeteRules" :disabled="!geraeteAnzahl[2][2]" label="verbrauchte Toner" suffix="Toner" type="number"></v-text-field>
            </v-row>
            <v-row>
              <v-checkbox v-model="geraeteAnzahl[4][2]"></v-checkbox>
              <v-text-field v-model="geraeteAnzahl[4][1]" :rules="geraeteRules" :disabled="!geraeteAnzahl[4][2]" label="Beamer" type="number" suffix="Beamer"></v-text-field>
            </v-row>
            <v-row>
              <v-checkbox v-model="geraeteAnzahl[5][2]"></v-checkbox>
              <v-text-field v-model="geraeteAnzahl[5][1]" :rules="geraeteRules" :disabled="!geraeteAnzahl[5][2]" label="interne Server" type="number" suffix="Server"></v-text-field>
            </v-row>
          </v-container>

          <!-- Papierverbrauch currently not used 
          <br>
          <h3>Wie viel Papier benutzen Sie in ihrer Abteilung?</h3>
          <v-divider></v-divider>
          <h5>Sollten Sie keine Angabe machen, werden ihre Mitarbeiter nach ihrem individuellen Papierverbrauch befragt.</h5>
          <br>

          <v-container>
            <v-row>
              <v-text-field v-model="papierverbrauch" label="Papierverbrauch" suffix="kg" type="number"></v-text-field>
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
    //Mitarbeiter
    anzahlMitarbeiter: null,
    //genutzte Gebäude
    gebaeudeNr: null,
    flaechenanteil: null,

    //IT Geräte
    /* Geraet an Array Position format [intern Geraete ID, Anzahl, enabled]
     * Multigeraete 0
     * MultigeraetToner 1
     * Laserdrucker 2
     * LaserdruckerToner 3
     * beamer 4
     * server 5
     */
    geraeteAnzahl: [[7, null, false], [8, null, false], [9, null, false], [10, null, false], [4, null, false], [6, null, false]],

    //Papiernutzung currently not used
    //papierverbrauch: null

    //Rules for input validation
    mitarbeiterRules: [
      v => !!v || "Muss angegeben werden",
      v => (parseInt(v) > 0) || "Bitte geben Sie eine valide Mitarbeiteranzahl an"
    ],
    geraeteRules: [
      v => !!v || "Wenn Sie das Gerät nicht benutzten, wählen Sie es bitte ab",
      v => (parseInt(v)> 0) || "Bitte geben Sie eine valide Menge an"
    ]
    
  }),
  methods: {
    logging: function() {
      console.log("Mitarbeiter:", this.anzahlMitarbeiter, "\n Gebäude:", this.gebaeudeNr, this.flaechenanteil, "\n geraeteAnzahl:", this.geraeteAnzahl);
    },

    /**
     * Returns an array of the Geräte data as specified in the API Documentation
     * If negative amounts of a certain Gerät is supplied it is ignored
     *  [{
     *    idITGeraete: Integer
     *    anzahl: Integer
     *  }]
     */
    itGeraeteJSON: function() {
      //Build IT Geräte Array of non-null gerate
      var usedITGeraete = []
      //Special case were we set the Toner enabled value to the matchig geraete value 
      this.geraeteAnzahl[1][2] = this.geraeteAnzahl[0][2]
      this.geraeteAnzahl[3][2] = this.geraeteAnzahl[2][2]

      for (var geraet of this.geraeteAnzahl) {
        console.log(geraet[1], " ", geraet[2])
        if(geraet[1] > 0 && geraet[2]) {
          usedITGeraete.push({
            idITGeraete: parseInt(geraet[0]),
            anzahl: parseInt(geraet[1])
          })
        }
      }
      return usedITGeraete
    },
    
    sendData: async function () {

      /*console.log(JSON.stringify({
          gebaeude: [
            {
              gebaeudeNr: parseInt(this.gebaeudeNr),
              flaechenanteil: parseInt(this.flaechenanteil)
            }
          ],
          anzahlMitarbeiter: parseInt(this.anzahlMitarbeiter),
          itGeraete: this.itGeraeteJSON()
        }))*/

      await fetch("http://localhost:9000/umfrage/hauptverantwortlicher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gebaeude: [
            {
              gebaeudeNr: parseInt(this.gebaeudeNr),
              flaechenanteil: parseInt(this.flaechenanteil)
            }
          ],
          anzahlMitarbeiter: parseInt(this.anzahlMitarbeiter),
          itGeraete: this.itGeraeteJSON()
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
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