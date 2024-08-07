<template>
  <v-app :style="{background: $vuetify.theme.themes[theme].background}">
    <!-- Header -->
    <Header
      :tabs="tabList" 
      :default-tab="defaultTab"
      :display-user-setting="true"
      :display-back-button="false"
      :display-login-button="false"
      @changeTab="changeTab($event)"
    />

    <!-- main body -->
    <v-main :class="$vuetify.breakpoint.mobile ? 'mb-0' : 'mb-16'">
      <component :is="currentTabType" />
    </v-main>

    <!-- Footer -->
    <Footer />
  </v-app>
</template>

<script>
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Survey from "@/components/userSurvey/Survey";
import SurveyOverview from "@/components/userSurveyManagement/SurveyOverview";
import AccountSettings from '@/components/header/AccountSettings.vue';
import i18n from "../i18n";

export default {
  name: "App",

  components: {
    Footer,
    Header,
    Survey,
    SurveyOverview,
    AccountSettings
  },

  props: {
    tab: {
      type: Number,
      default: 0
    }
  },

  data: () => ({
    // standard tab selected is the first tab / Survey tab
    // could extend this to be persistent on site refresh, but this would require additional plugins, like e.g. Vuex.
    selectedTab: 0,
    defaultTab: 0,
    currentTabType: Survey,
    tabList: [],
  }),

  computed:{
    theme(){
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    }
  },

  watch: {
    '$i18n.locale': function() {
      this.setTabList();
    }
  },
  
  created() {
    this.setTabList();

    let tabObj = null
    for (let i = 0; i < this.tabList.length; i++) {
      if (this.tabList[i].id === this.tab) {
        tabObj = this.tabList[i]
        break
      }
    }

    if (tabObj !== null) {
      this.defaultTab = tabObj.id
      this.changeTab(tabObj)
    }
  },

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

    setTabList(){
      this.tabList = [
        { id: 2, title: i18n.t('common.Accounteinstellungen'), componentType: AccountSettings},
        { id: 0, title: i18n.t('common.CO2_Rechner'), componentType: Survey },
        { id: 1, title: i18n.t('common.UmfrageUebersicht'), componentType: SurveyOverview },
      ]
    }
  },
};
</script>
