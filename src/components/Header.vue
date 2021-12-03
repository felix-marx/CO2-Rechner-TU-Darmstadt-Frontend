<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center"></div>

    <v-tabs center-active>
      <v-tab v-for="tab in tabs" :key="tab.id" @click="changeTab(tab.id)">
        {{ tab.title }}
      </v-tab>
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
    // TODO how to place tab_titles here and tab_types in App.vue together?
    tabs: [{"id": 0, title: "Umfrage"},
    {"id": 1, title: "Mitarbeiterumfrage"},
    {"id": 2, title: "Ergebnisse"}],
  }),
  methods: {
    changeTab(selectedTabComponent) {
      this.$emit("changeTab", selectedTabComponent);
    },
  },
};
</script>