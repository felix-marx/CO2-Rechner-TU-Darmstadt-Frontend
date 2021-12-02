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
                <v-select v-model="verkehrsmittel1" :items="fahrtmediumListe" label="Verkehrsmedium" class="pr-5"></v-select>
                <v-select v-model="verkehrsmittel2" v-show="verkehrsmittel1 === 'Öffentliche'" :items="fahrtmediumÖPNVListe" label="ÖPNV" class="pr-5"></v-select>
                <v-text-field v-model="einfacherPendelweg" label="Einfacher Pendelweg" type=number suffix="km"></v-text-field>
            </v-row>
            <h4 v-show="verkehrsmittel1 === 'PKW (Diesel)' || verkehrsmittel1 === 'PKW (Benzin)'" class="my-3">Fahren Sie in einer Fahrgemeinschaft?</h4>
            <v-row>
                <v-checkbox v-show="verkehrsmittel1 === 'PKW (Diesel)' || verkehrsmittel1 === 'PKW (Benzin)'" v-model="activeFahrgemeinschaft" label="Ja" class="pr-4"></v-checkbox>
                <v-text-field v-model="fahrgemeinschaftMitfahrer" v-show="activeFahrgemeinschaft && (verkehrsmittel1 === 'PKW (Diesel)' || verkehrsmittel1 === 'PKW (Benzin)')" 
                    label="Anzahl Mitfahrer" type="number" class="pr-5"></v-text-field>
            </v-row>
          </v-container>

          <br>
          <h3>Wie viele Tage in der Woche sind Sie im Büro?</h3>
          <v-divider></v-divider>
          <br>

          <v-container>
            <v-row>
                <v-text-field v-model="arbeitstageBuero" label="Tage im Büro" type=number></v-text-field>
            </v-row>
          </v-container>

          <br>
          <h3>Welche Dienstreisen haben Sie in den letzten 12 Monaten unternommen?</h3>
          <v-divider></v-divider>
          <br>

          <v-container>
            <v-row>
                <v-select v-model="dienstreiseMedium" label="Verkehrsmittel" :items="dienstreiseMediumListe" class="pr-5"></v-select>
                <!--<v-select v-model="flugklasse" label="Klasse" v-show="dienstreiseMedium === 'Flugzeug'" :items="flugklasseListe"></v-select>-->
                <v-select v-model="flugstreckenTyp" label="Flugstrecke" v-show="dienstreiseMedium === 'Flugzeug'" :items="flugstreckeListe" class="pr-5"></v-select>
                <v-text-field v-model="dienstreiseDistanz" :disabled="(dienstreiseMedium===null)" label="Einfache Distanz" suffix="km" class="pr-5"></v-text-field>
            </v-row>
          </v-container>

          <br>
          <h3>Welche IT-Geräte benutzen Sie in ihrer Arbeit?</h3>
          <v-divider></v-divider>
          <br>

          <v-container>
            <v-row>
                <v-checkbox  v-model="activeNotebook" hide-details></v-checkbox>
                <v-text-field v-model="notebook" :disabled="!activeNotebook" label="Notebooks" type="number" class="pr-5" suffix="Gerät/e"></v-text-field>
            </v-row>
            <v-row>
                <v-checkbox v-model="activeDesktopPC" hide-details></v-checkbox>
                <v-text-field v-model="desktopPC" :disabled="!activeDesktopPC" label="Desktop PCs" type="number" class="pr-5" suffix="Gerät/e"></v-text-field>
            </v-row>
            <v-row>
                <v-checkbox v-model="activeBildschirm" hide-details></v-checkbox>
                <v-text-field v-model="bildschirme" :disabled="!activeBildschirm" label="Bildschirme" type="number" class="pr-5" suffix="Gerät/e"></v-text-field>
            </v-row>
            <v-row>
                <v-checkbox v-model="activeMobiltelefon" hide-details></v-checkbox>
                <v-text-field v-model="mobiltelefon" :disabled="!activeMobiltelefon" label="Mobiltelefone" type="number" class="pr-5" suffix="Gerät/e"></v-text-field>
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

          <v-btn @click="send()">Absenden</v-btn>
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
    fahrtmediumÖPNVListe: ['Bahn', 'Linienbus', 'U-Bahn', 'Straßenbahn', 'MIX inkl. U-Bahn', 'MIX exkl. U-Bahn'],
    verkehrsmittel1: null,
    verkehrsmittel2: null,
    activeFahrgemeinschaft: false,
    fahrgemeinschaftMitfahrer: null,
    einfacherPendelweg: null,

    //Dienstreisen
    dienstreiseMediumListe: ['PKW (Diesel)', 'PKW (Benzin)', 'Bahn', 'Flugzeug'],
    dienstreiseMedium: null,
      //Flugklasse is not needed for calculation
      //flugklasseListe: ['Economy', 'Business'],
      //flugklasse: null,
    flugstreckeListe: ['Langstrecke', 'Kurzstrecke'],
    flugstreckenTyp: null,
    dienstreiseDistanz: null,

    //IT Geräte
    activeNotebook: false,
    notebook: null,

    activeDesktopPC: false,
    desktopPC: null,

    activeBildschirm: false,
    bildschirme: null,

    activeMobiltelefon: false,
    mobiltelefon: null,
    
    //Papierverbrauch
    papierverbrauch: null,
    papierverbrauchListe: ['0', '1-20', '21 - 50', '51 - 70', '70+']
    }),
    methods: {
      logging: function() {
        console.log("Arbeitstage:", this.arbeitstageBuero, "\n Verkehrsmittel:", this.verkehrsmittel1, this.verkehrsmittel2, this.einfacherPendelweg, "\n Fahrgemeinschaft:", this.activeFahrgemeinschaft, this.fahrgemeinschaftMitfahrer,
        "\n Dienstreise:", this.dienstreiseMedium, this.flugstreckenTyp, this.dienstreiseDistanz, "\n Notebooks:", this.notebook, "\n Deskop PC:", this.desktopPC,
        "\n Bildschirm:", this.bildschirme, "\n Mobiltelefon:", this.mobiltelefon)
      },
      send: function() {
        this.logging();
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