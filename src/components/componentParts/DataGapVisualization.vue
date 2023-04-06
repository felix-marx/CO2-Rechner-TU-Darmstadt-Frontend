<template>
  <v-container>
    <!-- Datenlücken Visualisierung - Proof of Concept -->
    <v-alert
      v-if="dataGap"
      class="mt-3 mb-0"
      type="info"
      text
      dense
      style="white-space: pre-wrap"
    >
      {{ dataGapWarningMessage }}
    </v-alert>
  
    <!-- Datenlücken Visualisierung - Benutzerfreundlicher -->
    <v-alert
      v-if="dataGap2"
      class="mt-3 mb-0"
      type="info"
      text
      dense
      style="white-space: pre-wrap"
    >
      {{ dataGapWarningMessage2 }}
    </v-alert>
  
    <!-- Datenlücken Visualisierung - Simplifiziert -->
    <v-alert
      v-if="dataGap3"
      class="mt-3 mb-0"
      type="info"
      text
      dense
      style="white-space: pre-wrap"
    >
      <v-container>
        <v-row>
          {{ dataGapWarningMessage3 }}
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
          {{ dataGapWarningMessage2 }}
        </v-row>
      </v-container>
    </v-alert>
  
    <!-- Datenlücken Visualisierung - Tabelle -->
    <v-alert
      v-if="dataGapTable"
      class="mt-3 mb-0"
      type="info"
      text
      dense
      style="white-space: pre-wrap"
    >
      <v-simple-table light>
        <thead>
          <tr>
            <th class="text-left">
              Gedäude
            </th>
            <th class="text-left">
              Kältedaten
            </th>
            <th class="text-left">
              Stromdaten
            </th>
            <th class="text-left">
              Wärmedaten
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in dataGapWarning"
            :key="item.name"
          >
            <td>
              {{ item.name }}
            </td>
            <td>
              <div
                v-if="item.kaelte == 1"
                class="pa-2 mt-1 red text-no-wrap rounded-pill"
              >
                nicht vorhanden
              </div>
              <div
                v-if="item.kaelte == 2"
                class="pa-2 mt-1 yellow text-no-wrap rounded-pill"
              >
                unvollständig
              </div>
              <div
                v-if="item.kaelte == 0"
                class="pa-2 mt-1 green text-no-wrap rounded-pill"
              >
                vollständig
              </div>
            </td>
            <td>
              <div
                v-if="item.strom == 1"
                class="pa-4 red rounded-circle d-inline-block"
              />
              <div
                v-if="item.strom == 2"
                class="pa-4 yellow rounded-circle d-inline-block"
              />
              <div
                v-if="item.strom == 0"
                class="pa-4 green rounded-circle d-inline-block"
              />
              {{ item.strom }}
            </td>
            <td>
              <div
                v-if="item.waerme == 1"
                class="pa-4 mt-1 red rounded-circle d-inline-block"
              />
              <div
                v-if="item.waerme == 2"
                class="pa-4 mt-1  yellow rounded-circle d-inline-block"
              />
              <div
                v-if="item.waerme == 0"
                class="pa-4 mt-1 green rounded-circle d-inline-block"
              />
              {{ item.waerme }}
            </td>
          </tr>
        </tbody>
      </v-simple-table>
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
      var msg = "Datenlücken:"

      for(var i = 0; i < this.gebaeude.length; i++) {
        //console.log(this.gebaeude[i])

        if (this.gebaeude[i][0]) {    // falls Gebäude ausgewählt
          let zaehlerRefs = this.mapGebauedeZaehlerRefs.get(this.gebaeude[i][0])

          //console.log(zaehlerRefs)

          if (zaehlerRefs["kaelteRef"].length == 0){
            msg = msg + "\n " + this.gebaeude[i][0] + " hat keine Kältezahler"
          }
          if (zaehlerRefs["stromRef"].length == 0){
            msg = msg + "\n " + this.gebaeude[i][0] + " hat keine Stromzahler"
          }
          if (zaehlerRefs["waermeRef"].length == 0){
            msg = msg + "\n " + this.gebaeude[i][0] + " hat keine Wärmezahler"
          }

          if (this.bilanzierungsjahr) {
            var functCheck = (zaehler) => {
              if (!this.mapZaehlerWerte.get(zaehler).get(this.bilanzierungsjahr)){
                msg = msg + "\n " + zaehler + " von " + this.gebaeude[i][0] + " hat keine Wert für das Jahr " + this.bilanzierungsjahr
              }
            }

            zaehlerRefs["kaelteRef"].forEach(functCheck);
            zaehlerRefs["stromRef"].forEach(functCheck);
            zaehlerRefs["waermeRef"].forEach(functCheck);
          }
        }
      }

      return msg
    },

    dataGap: function(){
      return this.dataGapWarningMessage != "Datenlücken:"
    },

    dataGapWarningMessage2: function() {
      var msg = "Datenlücken:"

      for(var i = 0; i < this.gebaeude.length; i++) {
        //console.log(this.gebaeude[i])
        var temp = [0, 0, 0]

        if (this.gebaeude[i][0]) {    // falls Gebäude ausgewählt
          let zaehlerRefs = this.mapGebauedeZaehlerRefs.get(this.gebaeude[i][0])

          //console.log(zaehlerRefs)

          if (zaehlerRefs["kaelteRef"].length == 0){
            temp[0] = 1
          }
          if (zaehlerRefs["stromRef"].length == 0){
            temp[1] = 1
          }
          if (zaehlerRefs["waermeRef"].length == 0){
            temp[2] = 1
          }

          if (this.bilanzierungsjahr) {
            zaehlerRefs["kaelteRef"].forEach((zaehler) => {
              if (!this.mapZaehlerWerte.get(zaehler).get(this.bilanzierungsjahr)){
                temp[0] = 2
              }
            });
            zaehlerRefs["stromRef"].forEach((zaehler) => {
              if (!this.mapZaehlerWerte.get(zaehler).get(this.bilanzierungsjahr)){
                temp[1] = 2
              }
            });
            zaehlerRefs["waermeRef"].forEach((zaehler) => {
              if (!this.mapZaehlerWerte.get(zaehler).get(this.bilanzierungsjahr)){
                temp[2] = 2
              }
            });
          }

          if(temp[0] != 0 || temp[1] != 0 || temp[2] != 0){
            msg = msg + "\n " + "Gebäude " + this.gebaeude[i][0] + ": "
            msg = msg + (temp[0] == 0 ? "" : (temp[0] == 1 ? "keine Kältedaten, " : "unvollständige Kältedaten, "))
            msg = msg + (temp[1] == 0 ? "" : (temp[1] == 1 ? "keine Stromdaten, " : "unvollständige Stromdaten, "))
            msg = msg + (temp[2] == 0 ? "" : (temp[2] == 1 ? "keine Wärmedaten, " : "unvollständige Wärmedaten, "))
            msg = msg.slice(0, -2)
          }
        }
      }

      return msg
    },

    dataGap2: function(){
      return this.dataGapWarningMessage2 != "Datenlücken:"
    },

    dataGapWarning: function() {
      var arr = []

      for(var i = 0; i < this.gebaeude.length; i++) {
        //console.log(this.gebaeude[i])
        var temp = [this.gebaeude[i][0], 0, 0, 0]

        if (this.gebaeude[i][0]) {    // falls Gebäude ausgewählt
          let zaehlerRefs = this.mapGebauedeZaehlerRefs.get(this.gebaeude[i][0])

          //console.log(zaehlerRefs)

          if (zaehlerRefs["kaelteRef"].length == 0){
            temp[1] = 1
          }
          if (zaehlerRefs["stromRef"].length == 0){
            temp[2] = 1
          }
          if (zaehlerRefs["waermeRef"].length == 0){
            temp[3] = 1
          }

          if (this.bilanzierungsjahr) {
            zaehlerRefs["kaelteRef"].forEach((zaehler) => {
              if (!this.mapZaehlerWerte.get(zaehler).get(this.bilanzierungsjahr)){
                  temp[1] = 2
              }
            });
            zaehlerRefs["stromRef"].forEach((zaehler) => {
              if (!this.mapZaehlerWerte.get(zaehler).get(this.bilanzierungsjahr)){
                  temp[2] = 2
              }
            });
            zaehlerRefs["waermeRef"].forEach((zaehler) => {
              if (!this.mapZaehlerWerte.get(zaehler).get(this.bilanzierungsjahr)){
                  temp[3] = 2
              }
            });
          }

          arr.push({
            name: temp[0],
            kaelte: temp[1],
            strom: temp[2],
            waerme: temp[3],
          })
        }
      }

      //console.log("Arr", arr)

      return arr
    },

    dataGapTable: function(){
      return this.dataGapWarning.length != 0
    },

    dataGapWarningMessage3: function() {
      var msg = "Für die folgenden Gebäude haben wir aktuell leider nur unvollständige Daten: "

      for(var i = 0; i < this.gebaeude.length; i++) {
        //console.log(this.gebaeude[i])

        if (this.gebaeude[i][0]) {    // falls Gebäude ausgewählt
          let zaehlerRefs = this.mapGebauedeZaehlerRefs.get(this.gebaeude[i][0])
          let incomplete = false
          //console.log(zaehlerRefs)

          if (zaehlerRefs["kaelteRef"].length == 0){
            incomplete = true
          }
          if (zaehlerRefs["stromRef"].length == 0){
            incomplete = true
          }
          if (zaehlerRefs["waermeRef"].length == 0){
            incomplete = true
          }

          if (this.bilanzierungsjahr) {
            zaehlerRefs["kaelteRef"].forEach((zaehler) => {
              if (!this.mapZaehlerWerte.get(zaehler).get(this.bilanzierungsjahr)){
                incomplete = true
              }
            });
            zaehlerRefs["stromRef"].forEach((zaehler) => {
              if (!this.mapZaehlerWerte.get(zaehler).get(this.bilanzierungsjahr)){
                incomplete = true
              }
            });
            zaehlerRefs["waermeRef"].forEach((zaehler) => {
              if (!this.mapZaehlerWerte.get(zaehler).get(this.bilanzierungsjahr)){
                incomplete = true
              }
            });
          }

          if (incomplete){
            msg = msg + this.gebaeude[i][0] + ", "
          }
        }
      }

      return msg.slice(0, -2)
    },

    dataGap3: function(){
      return this.dataGapWarningMessage3 != "Für die folgenden Gebäude haben wir aktuell leider nur unvollständige Daten"
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
  