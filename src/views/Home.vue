<template>
  <v-app>
    <!-- Header -->
    <Header
      :tabs="tabList" 
      :display-user-setting="true"
      :display-back-button="false"
      @changeTab="changeTab($event)"
    />

    <!-- main body -->
    <v-main class="mb-16">
      <component :is="currentTabType" />
    </v-main>

    <!-- Footer -->
    <Footer />
  </v-app>
</template>

<script>
import Footer from "@/components/componentParts/Footer";
import Header from "@/components/componentParts/Header";
import Survey from "@/components/userSurvey/Survey";
import SurveyOverview from "@/components/userSurveyManagement/SurveyOverview";
import AccountSettings from '../components/settings/AccountSettings.vue';
import i18n from "../i18n";

export default {
  name: "App",

  components: {
    Footer,
    Header,
    Survey,
  },

  data: () => ({
    // standard tab selected is the first tab / Survey tab
    // could extend this to be persistent on site refresh, but this would require additional plugins, like e.g. Vuex.
    selectedTab: 0,
    currentTabType: Survey,
    tabList: [
        { id: 2, title: i18n.t('common.Accounteinstellungen'), componentType: AccountSettings},
        { id: 0, title: i18n.t('common.CO2_Rechner'), componentType: Survey },
        { id: 1, title: i18n.t('common.UmfrageUebersicht'), componentType: SurveyOverview },
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
