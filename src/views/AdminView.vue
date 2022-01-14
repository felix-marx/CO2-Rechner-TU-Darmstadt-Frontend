<template>
  <v-app>
    <!-- Header -->
    <Header
      :anmelden-button="false" 
      :tabs="tabList"
      @changeTab="changeTab($event)" 
    />

    <!-- main body -->
    <v-main>
      <component :is="currentTabType" />
    </v-main>

    <!-- Footer -->
    <Footer />
  </v-app>
</template>

<script>
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import AdminEintraege from "@/components/AdminEintraege";
import AdminAuswertung from "@/components/AdminAuswertung";
import AdminUebersicht from "@/components/AdminUebersicht";

export default {
  name: "App",

  components: {
    Footer,
    Header,
    AdminUebersicht,
    AdminEintraege,
    AdminAuswertung
  },

  data: () => ({
    // standard tab selected is the first tab / Umfrage tab
    // could extend this to be persistent on site refresh, but this would require additional plugins, like e.g. Vuex.
    selectedTab: 0,
    currentTabType: AdminUebersicht,
    tabList: [
      { id: 0, title: "Übersicht", componentType: AdminUebersicht},
      { id: 1, title: "Daten eintragen", componentType: AdminEintraege },
      { id: 2, title: "Auswertung", componentType: AdminAuswertung},
    ],
  }),

  methods: {
    /**
    Listens for events in the header tab menu.
    @param tab the new tab that is now selected. Has two attributes id and componentType.
    The componentType determines the component that is then shown in the App Body.
    */
    changeTab(tab) {
      this.selectedTab = tab.id;
      this.currentTabType = tab.componentType;
    },
  },
};
</script>
