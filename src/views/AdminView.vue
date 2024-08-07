<template>
  <v-app :style="{background: $vuetify.theme.themes[theme].colors.background}">
    <!-- Header -->
    <Header
      :display-user-setting="true"
      :tabs="tabList"
      :display-back-button="false"
      :display-login-button="false"
      @change-tab="changeTab($event)" 
    />

    <!-- main body -->
    <v-main class="mb-0">
      <component :is="currentTabType" />
    </v-main>

    <!-- Footer -->
    <Footer />
  </v-app>
</template>


<script>
export default {
  name: "App",
}
</script>

<script setup>
import Footer from "@/components/footer/Footer.vue";
import Header from "@/components/header/Header.vue";
import AdminDBInteract from "@/components/admin/AdminDBInteract.vue";
import AdminViewSurveys from "@/components/admin/AdminViewSurveys.vue";

import { computed, ref, watch, shallowRef } from "vue";
import { useI18n } from "vue-i18n";
import vuetify from "@/plugins/vuetify";

const { t, locale } = useI18n();

const adminViewSurveys = shallowRef(AdminViewSurveys);
const adminDBInteract = shallowRef(AdminDBInteract);

const selectedTab = ref(0)
const defaultTab = ref(0)
const currentTabType = shallowRef(null);
const tabList = ref([])


const theme = computed(() => {
  return vuetify.theme.dark ? "dark" : "light";
});


watch(locale, () => {
  setTabList();
});


// created
setTabList();
setInitalTab();

/**
Listens for events in the header tab menu.
@param tab the new tab that is now selected. Has two attributes id and component.
The component determines the component that is then shown in the App Body.
*/
function changeTab(tab) {
  selectedTab.value = tab.id;
  currentTabType.value = tab.component;
}

function setTabList(){
  tabList.value = [
    { id: 0, title: t('common.UmfrageUebersicht'), component: adminViewSurveys},
    { id: 1, title: t('common.Datenbank'), component: adminDBInteract},
  ]
}

function setInitalTab(){
  let tabObj = null
  for (let i = 0; i < tabList.value.length; i++) {
    if (tabList.value[i].id === defaultTab.value) {
      tabObj = tabList.value[i]
      break
    }
  }

  if (tabObj !== null) {
    changeTab(tabObj)
  }
}
</script>
