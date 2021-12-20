<template>
  <v-app-bar
    app
    color="primary"
    dark
  >
    <div class="d-flex align-center" />

    <!--- Tab Menu --->
    <v-tabs center-active>
      <v-tab
        v-for="tab in tabs"
        :key="'tab-' + tab.id"
        @click="changeTab(tab.id, tab.componentType)"
      >
        {{ tab.title }}
      </v-tab>
    </v-tabs>

    <v-spacer />

    <!--- Anmelden Button --->
    <Anmeldung/>
  </v-app-bar>
</template>


<script>
import Umfrage from "./umfrage";
import Mitarbeiterumfrage from "./mitarbeiterUmfrage";
import Uebersicht from "./uebersichtUmfragen";
import Anmeldung from "./Anmeldung.vue";
import AdminEintraege from "./AdminEintraege";


export default {
  name: "Header",

  data: () => ({
    // data on tabs and shown component when selecting the tab
    tabs: [
      { id: 0, title: "Umfrage", componentType: Umfrage },
      { id: 1, title: "Mitarbeiterumfrage", componentType: Mitarbeiterumfrage },
      { id: 2, title: "Ergebnisse", componentType: Uebersicht },
      { id: 3, title: "Datenbankeinträge", componentType: AdminEintraege }
    ],
  }),
    methods: {
        /**
         * Emits the selected tab and new component type to the parent.
         * @param selectedTab - the id of the selected tab. starting at 0, increasing left to right.
         * @param componentType - the component to be shown when the corresponding tab is selected.
         */
        changeTab(selectedTab, componentType) {
            let data = { id: selectedTab, componentType: componentType };
            this.$emit("changeTab", data);
        },
    },
    components: { Anmeldung }
};
</script>