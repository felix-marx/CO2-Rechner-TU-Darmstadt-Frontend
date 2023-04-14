<template>
  <v-container class="pa-0 ma-0">
    <!-- Datenlücken Visualisierung - Simplifiziert -->
    <v-alert
      v-if="dataGap"
      class="mt-3 mb-0"
      type="info"
      text
      dense
      style="white-space: pre-wrap"
    >
      <v-container>
        <v-row>
          {{ dataGapWarningMessage[0] }}
        </v-row>
        <v-row>
          <v-btn
            small
            plain
            light
            :ripple="false"
            @click="moreInfo = !moreInfo"
          >
            <v-icon v-if="!moreInfo">
              mdi-menu-right
            </v-icon>
            <v-icon v-if="moreInfo">
              mdi-menu-down
            </v-icon>
            Weiter Informationen
          </v-btn>
        </v-row>
        <v-row
          v-if="moreInfo"
          class="ml-2"
        >
          {{ dataGapWarningMessage[1] }}
        </v-row>
      </v-container>
    </v-alert>
  </v-container>
</template>
  
<script>
export default {
  props:{
    gebaeudeIDsUndZaehler: {
      type: Array,
      default: () => [],      // default value need to be a function so function returns empty array
    },
    zaehler: {
      type: Array,
      default: () => [],
    },
    gebaeude: {
      type: Array,
      default: () => [],
    },
    bilanzierungsjahr: {
      type: Number,
      default: 0,
    }
  },

  data: () => ({
    moreInfo: false,
  }),

  computed: {
    mapGebauedeZaehlerRefs: function(){
      return new Map(
        this.gebaeudeIDsUndZaehler.map((obj) => [translateGebaeudeIDToSymbolic(obj.nr), {kaelteRef: obj.kaelteRef, stromRef: obj.stromRef, waermeRef: obj.waermeRef}])
      )
    },

    mapZaehlerWerte: function(){
      return new Map(
        this.zaehler.map((obj) => [obj.pkEnergie, new Map(obj.zaehlerdatenVorhanden.map((obj2) => [obj2.jahr, obj2.vorhanden]))])
      ) 
    },

    dataGapWarningMessage: function() {
      var msgShort = ""
      var msgLong = ""
      var msgShortFragments = []

      for(var i = 0; i < this.gebaeude.length; i++) {
        var zaehlerZustand = [0, 0, 0]    // [Kaelte, Strom, Waerme], 
                                          // 0 - Zaehler und Daten vorhaden, 1 - keine Zaehler, 2 - Zaehler aber ohne Daten fuer ausgewaehltes Jahr

        if (this.gebaeude[i][0]) {    // falls Gebäude ausgewählt
          let zaehlerRefs = this.mapGebauedeZaehlerRefs.get(this.gebaeude[i][0])

          // if (zaehlerRefs["kaelteRef"].length == 0){   // keine Ueberpruefung, ob Kaeltezaehler vorhanden sind, weil Kaeltezaehler nur sehr wenig Verwendung haben
          //   zaehlerZustand[0] = 1
          // }
          if (zaehlerRefs["stromRef"].length == 0){
            zaehlerZustand[1] = 1
          }
          if (zaehlerRefs["waermeRef"].length == 0){
            zaehlerZustand[2] = 1
          }

          if (this.bilanzierungsjahr) {
            zaehlerRefs["kaelteRef"].forEach((zaehler) => {
              if (!this.mapZaehlerWerte.get(zaehler).get(this.bilanzierungsjahr)){
                zaehlerZustand[0] = 2
              }
            });
            zaehlerRefs["stromRef"].forEach((zaehler) => {
              if (!this.mapZaehlerWerte.get(zaehler).get(this.bilanzierungsjahr)){
                zaehlerZustand[1] = 2
              }
            });
            zaehlerRefs["waermeRef"].forEach((zaehler) => {
              if (!this.mapZaehlerWerte.get(zaehler).get(this.bilanzierungsjahr)){
                zaehlerZustand[2] = 2
              }
            });
          }

          if(zaehlerZustand[0] != 0 || zaehlerZustand[1] != 0 || zaehlerZustand[2] != 0){
            // generiere kurze Nachricht
            msgShortFragments.push(this.gebaeude[i][0])

            // generiere lange Nachricht
            var msgLongFragments = []
            if (zaehlerZustand[0] == 2){
              msgLongFragments.push("keine Kältedaten für das Jahr " + this.bilanzierungsjahr)
            }
            if (zaehlerZustand[1] == 1){
              msgLongFragments.push("keine Stromzähler")
            }
            else if (zaehlerZustand[1] == 2){
              msgLongFragments.push("keine Stromdaten für das Jahr " + this.bilanzierungsjahr)
            }
            if (zaehlerZustand[2] == 1){
              msgLongFragments.push("keine Wärmezähler")
            }
            else if (zaehlerZustand[2] == 2){
              msgLongFragments.push("keine Wärmedaten für das Jahr " + this.bilanzierungsjahr)
            }

            msgLong = msgLong + "Für " + this.gebaeude[i][0] + " haben wir " + msgLongFragments.slice(0, -1).join(", ") + (msgLongFragments.length != 1 ? " und " : "") + msgLongFragments.slice(-1) + ".\n "
          }
        }
      }

      // generiere kurze Nachricht
      msgShort = "Für die Gebäude " + msgShortFragments.slice(0, -1).join(", ") + (msgShortFragments.length > 1 ? " und " : "") + msgShortFragments.slice(-1) + " haben wir aktuell leider nur unvollständige Daten zum Energieverbrauch!"

      return [msgShort, msgLong.slice(0, -2)]
    },

    dataGap: function(){
      return this.dataGapWarningMessage[1] != ""
    },
  },
};

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
  let translatedID = gebaeudeDict[gebaeudeID.substring(0, 1)] + gebaeudeID.substring(1);
  return translatedID;
}

</script>
  