<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn text v-bind="attrs" v-on="on">
        <span class="mr-2">Anmelden</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </template>

    <v-card class="d-flex justify-center">
      <v-container>
          <v-card-title>Login</v-card-title>   
        <v-row>
          <v-text-field class="px-5"
            v-model="username"
            :rules="absolutpositivRules"
            label="E-Mail Adresse"
            prepend-icon="mdi-account"
          />
        </v-row>
        <v-row>
          <v-text-field class="px-5"
            v-model="password"
            :rules="absolutpositivRules"
            label="Passwort"
            type="number"
            prepend-icon="mdi-key"
          />
        </v-row>
        <v-row>
          <v-col class="px-10">
            <v-btn>
              <span>Anmelden</span>
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </v-col>
          <v-col class="px-10">
            <v-btn>
              <span>Registrieren</span>
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Kontakt",

  data() {
    return {
      dialog: false,
    };
  },
};
</script>