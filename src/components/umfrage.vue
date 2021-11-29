<template>
  <v-container>
    <v-card elevation="2" outlined>
      <v-form>
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
              <v-text-field v-model="multigeraete" :disabled="!activeNetzwerkdrucker" label="Multifunktionsgeräte z.B. Netzwerkdrucker" type="number" class="pr-5" suffix="Gerät/e"></v-text-field>
              <v-text-field v-model="multigeraeteToner" :disabled="!activeNetzwerkdrucker" label="verbrauchte Toner" type="number" suffix="Toner"></v-text-field>
            </v-row>
            <v-row>
              <v-checkbox v-model="activeLaserdrucker" hide-details></v-checkbox>
              <v-text-field v-model="laserdrucker" :disabled="!activeLaserdrucker" label="Laser- & Tintenstrahldrucker" type="number" suffix="Drucker" class="pr-5"></v-text-field>
              <v-text-field v-server="laserdruckerToner" :disabled="!activeLaserdrucker" label="verbrauchte Toner" suffix="Toner" type="number"></v-text-field>
            </v-row>
            <v-row>
              <v-checkbox v-model="activeBeamer"></v-checkbox>
              <v-text-field v-model="beamer" :disabled="!activeBeamer" label="Beamer" type="number" suffix="Beamer"></v-text-field>
            </v-row>
            <v-row>
              <v-checkbox v-model="activeServer"></v-checkbox>
              <v-text-field v-model="server" :disabled="!activeServer" label="interne Server" type="number" suffix="Server"></v-text-field>
            </v-row>
          </v-container>

          <br>
          <h3>Wie viel Papier benutzen Sie in ihrer Abteilung?</h3>
          <v-divider></v-divider>
          <h5>Sollten Sie keine Angabe machen, werden ihre Mitarbeiter nach ihrem individuellen Papierverbrauch befragt.</h5>
          <br>

          <v-container>
            <v-row>
              <v-text-field v-model="papierverbrauch" label="Papierverbrauch" suffix="kg" type="number"></v-text-field>
            </v-row>
          </v-container>
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
    activeNetzwerkdrucker: false,
    multigeraete: null,
    multigeraeteToner: null,

    activeLaserdrucker: false,
    laserdrucker: null,
    laserdruckerToner: null,
    
    activeBeamer: false,
    beamer: null,

    activeServer: false,
    server: null,

    //Papiernutzung
    papierverbrauch: null
  })
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