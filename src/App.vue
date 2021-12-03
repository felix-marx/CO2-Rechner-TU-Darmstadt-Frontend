<template>
  <v-app>
    <!-- Header -->
    <Header @changeTab="changeTab($event)" />

    <!-- main body -->
    <v-main>
      <component :is="currentTabType" />
    </v-main>

    <!-- Footer -->
    <Footer />
  </v-app>
</template>

<script>

import Footer from "./components/Footer";
import Header from "./components/Header";
import Umfrage from './components/umfrage';

export default {
  name: "App",

  components: {
    Footer,
    Header,
    Umfrage
  },


  data: () => ({
    // standard tab selected is the first tab / Umfrage tab
    // TODO could extend this to be persistent on site refresh, but this would require additional plugins, like e.g. Vuex.
    selectedTab: 0,
    currentTabType: Umfrage
  }),
  methods: {
    changeTab(tab) {
      this.selectedTab = tab.id;
      this.currentTabType = tab.componentType;
    },
  },
};
</script>
