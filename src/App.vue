<template>
  <v-app>
    <Header @changeTab="changeTab($event)" />

    <v-main>
      <component v-bind:is="currentType"></component>
    </v-main>

    <Footer />
  </v-app>
</template>

<script>
import Footer from "./components/Footer";
import Header from "./components/Header";

// TODO replace with actual components that should be shown then
import HelloWorld from "./components/HelloWorld";
import HelloWorld2 from "./components/HelloWorld2";
const TAB_TYPES = [HelloWorld, HelloWorld2];

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
  methods: {
    changeTab(selectedTab) {
      this.selectedTab = selectedTab;
    },
  },
  computed: {
    currentType: function () {
      return TAB_TYPES[this.selectedTab]
    },
  },
};
</script>
