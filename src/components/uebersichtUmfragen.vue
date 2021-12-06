<template>
  <v-container>
    <v-card
      elevation="10"
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

      <v-card-actions>
        <v-btn
          class="white black--text"
          outlined
          rounded
          text
        >
          <v-icon left>
            mdi-square-edit-outline
          </v-icon>
          <span>bearbeiten</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>