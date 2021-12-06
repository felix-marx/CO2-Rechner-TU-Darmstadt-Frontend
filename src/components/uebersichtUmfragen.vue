<template>
  <v-container>
    <!-- Die erstellte Umfrage soll eine Karte erhalten. -->
    <v-card
      elevation="2"
      outlined
    >
      <v-list-item three-line>
        <v-list-item-content>
          <div class="text-overline mb-4">
            Zuletzt bearbeitet am XX.YY.ZZZZ
          </div>

          <v-list-item-title class="text-h5 mb-1">
            Umfrage 1
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- Die erstellte Umfrage soll bearbeitet und ausgewählt werden können. -->
      <v-card-actions>
        <v-btn
          class="ma2"
          outlined
          rounded
          text
        >
          <v-icon left>
            mdi-square-edit-outline
          </v-icon>
          <span>bearbeiten</span>
        </v-btn>

        <v-spacer />

        <v-checkbox
          v-model="selected"
        />
      </v-card-actions>
    </v-card>

    <!-- Mit diesem Button sollen ausgewählte Umfragen gelöscht werden können. -->
    <v-col class="text-right">
      <v-btn
        class="ma2"
        outlined
        text
      >
        Ausgewählte löschen
      </v-btn>
    </v-col>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        selected: ['Umfrage1'],
      }
    },
  }
</script>
