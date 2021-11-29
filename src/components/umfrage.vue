<template>
  <v-container>
    <v-card elevation="2" outlined>
      <v-form>
        <v-card class="pa-7" >
          <v-row>
            <v-text-field v-model="anzahlMitarbeiter" label="Mitarbeiteranzahl" prepend-icon="mdi-account"></v-text-field>
          </v-row>
          <v-row>
            <v-text-field v-model="gebaeudeNr" label="Gebäudenr" prepend-icon="mdi-domain"></v-text-field>
            <v-text-field v-model="flaechenanteil" label="Flächenanteil" prepend-icon="mdi-domain"></v-text-field>
          </v-row>
          <v-row>
            <v-checkbox v-model="activeNetzwerkdrucker" hide-details></v-checkbox>
            <v-text-field v-model="multigeraete" :disabled="!activeNetzwerkdrucker" label="Multifunktionsgeräte z.B. Netzwerkdrucker" type="number" class="pr-5"></v-text-field>
            <v-text-field v-model="multigeraeteToner" :disabled="!activeNetzwerkdrucker" label="Anzahl verbrauchter Toner" type="number"></v-text-field>
          </v-row>
          <v-row>
            <v-checkbox v-model="activeLaserdrucker" hide-details></v-checkbox>
            <v-text-field :disabled="!activeLaserdrucker" label="Anzahl Laser- & Tintenstrahldrucker" type="number" class="pr-5"></v-text-field>
            <v-text-field :disabled="!activeLaserdrucker" label="Anzahl verbrauchter Toner" type="number"></v-text-field>
          </v-row>
          <v-row>
            <v-checkbox v-model="activeBeamer"></v-checkbox>
            <v-text-field :disabled="!activeBeamer" label="Anzahl Beamer" type="number"></v-text-field>
          </v-row>
          <v-row>
            <v-text-field label="Papierverbrauch" suffix="kg" type="number"></v-text-field>
          </v-row>
        </v-card>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    activeNetzwerkdrucker: false,
    activeLaserdrucker: false,
    activeBeamer: false,
    anzahlMitarbeiter: null
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