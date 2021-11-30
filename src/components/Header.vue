<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center"></div>

    
    <v-tabs center-active>
      <v-tab v-for="tabTitle in tabs" :key=tabTitle>
      {{tabTitle}}</v-tab>
    </v-tabs>

    <v-spacer></v-spacer>

    <v-btn text>
      <span class="mr-2">Anmelden</span>
      <v-icon>mdi-account</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "Header",

  data: () => ({
    tabs: ["Umfragen", "Ergebnisse"],
  }),
};
</script>