<template>
  <v-app>
    <!-- Header -->
    <Header
      :display-user-setting="true"
      :tabs="tabList"
      :display-back-button="false"
      :display-login-button="false"
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
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import AdminDBInteract from "@/components/admin/AdminDBInteract";
import AdminViewSurveys from "@/components/admin/AdminViewSurveys";
import AccountSettings from '@/components/header/AccountSettings.vue';
import i18n from "../i18n";

export default {
  name: "App",

  components: {
    Footer,
    Header,
    AdminDBInteract,
    AdminViewSurveys,
    AccountSettings
  },

  data: () => ({
    // standard tab selected is the first tab / Umfrage tab
    // could extend this to be persistent on site refresh, but this would require additional plugins, like e.g. Vuex.
    selectedTab: 0,
    currentTabType: AdminViewSurveys,
    tabList: [
      { id: 2, title: i18n.t('common.Accounteinstellungen'), componentType: AccountSettings},
      { id: 0, title: i18n.t('common.UmfrageUebersicht'), componentType: AdminViewSurveys},
      { id: 1, title: i18n.t('common.Datenbank'), componentType: AdminDBInteract},
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
