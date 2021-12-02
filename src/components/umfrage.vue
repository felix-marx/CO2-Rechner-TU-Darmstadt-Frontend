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
              <v-text-field v-model="anzahlMitarbeiter" label="Mitarbeiteranzahl" prepend-icon="mdi-account"></v-text-field>
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
              <v-checkbox v-model="activeNetzwerkdrucker" hide-details></v-checkbox>
              <v-text-field v-model="geraeteAnzahl[0][1]" :disabled="!activeNetzwerkdrucker" label="Multifunktionsgeräte z.B. Netzwerkdrucker" type="number" class="pr-5" suffix="Gerät/e"></v-text-field>
              <v-text-field v-model="geraeteAnzahl[1][1]" :disabled="!activeNetzwerkdrucker" label="verbrauchte Toner" type="number" suffix="Toner"></v-text-field>
            </v-row>
            <v-row>
              <v-checkbox v-model="activeLaserdrucker" hide-details></v-checkbox>
              <v-text-field v-model="geraeteAnzahl[2][1]" :disabled="!activeLaserdrucker" label="Laser- & Tintenstrahldrucker" type="number" suffix="Drucker" class="pr-5"></v-text-field>
              <v-text-field v-model="geraeteAnzahl[3][1]" :disabled="!activeLaserdrucker" label="verbrauchte Toner" suffix="Toner" type="number"></v-text-field>
            </v-row>
            <v-row>
              <v-checkbox v-model="activeBeamer"></v-checkbox>
              <v-text-field v-model="geraeteAnzahl[4][1]" :disabled="!activeBeamer" label="Beamer" type="number" suffix="Beamer"></v-text-field>
            </v-row>
            <v-row>
              <v-checkbox v-model="activeServer"></v-checkbox>
              <v-text-field v-model="geraeteAnzahl[5][1]" :disabled="!activeServer" label="interne Server" type="number" suffix="Server"></v-text-field>
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
    /* Geraet an Array Position format [intern Geraete ID, Anzahl]
     * Multigeraete 0
     * MultigeraetToner 1
     * Laserdrucker 2
     * LaserdruckerToner 3
     * beamer 4
     * server 5
     */
    geraeteAnzahl: [[7, null], [8, null], [9, null], [10, null], [4, null], [6, null]],

    activeNetzwerkdrucker: false,
    activeLaserdrucker: false,
    activeBeamer: false,
    activeServer: false,

    //Papiernutzung currently not used
    //papierverbrauch: null

    //Rules for input validation
    
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
      for (var geraet of this.geraeteAnzahl) {
        if(geraet[1] > 0) {
          usedITGeraete.push({
            idITGeraete: parseInt(geraet[0]),
            anzahl: parseInt(geraet[1])
          })
        }
      }
    },
    
    sendData: async function () {

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