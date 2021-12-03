<template>
  <v-app>
    <Header @changeTab="changeTab($event)" />

    <v-main>
      <component :is="currentType" />
    </v-main>

    <Footer />
  </v-app>
</template>

<script>
import Uebersicht from './components/uebersichtUmfragen';
import Footer from "./components/Footer";
import Header from "./components/Header";

const TAB_TYPES = [Umfrage, Mitarbeiterumfrage, Uebersicht];
import Umfrage from './components/umfrage.vue';
import Mitarbeiterumfrage from './components/mitarbeiterUmfrage.vue';

export default {
  name: "App",

  components: {
    Footer,
    Header,
    TAB_TYPES
},


  data: () => ({
    selectedTab: 0,
  }),
  computed: {
    currentType: function () {
      return TAB_TYPES[this.selectedTab]
    },
  },
  methods: {
    changeTab(selectedTab) {
      this.selectedTab = selectedTab;
    },
  },
};
</script>
