<template>
  <v-dialog
    v-model="dialog"
    width="500"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="mx-4"
        text
        v-bind="attrs"
        v-on="on"
      >
        <span class="mx-2">Projektcode</span>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        Projektcode
      </v-card-title>
      <v-list-item>
        <v-list-item-content>
          <v-card elevation="0">
            Der CO<sub>2</sub>-Rechner wurde öffentlich unter der GNU AGPL-3.0 Open Source Lizenz entwickelt.<br>
            Sie können die gesamte Code Basis auf Github einsehen:
            <v-list>
              <v-list-item>
                <v-list-item-title>
                  Webseite:
                </v-list-item-title>
                <v-list-item-subtitle>
                  <a
                    href="https://github.com/felix-marx/CO2-Rechner-TU-Darmstadt-Frontend"
                    target="_blank"
                  >Github Repository</a>
                </v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>
                  Backend:
                </v-list-item-title>
                <v-list-item-subtitle>
                  <a
                    href="https://github.com/Anhilly/co2-rechner-TU-Darmstadt-backend"
                    target="_blank"
                  >Github Repository</a>
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "OpenSource",
  
  data() {
    return {
      dialog: false,
    };
  },
};
</script>
