<template>
  <div>
    <v-app-bar
      color="primary"
    >
      <v-tabs
        class="ml-0"
        :model-value="selectedTab"
      >
        <!-- display tabs normally -->
        <template v-if="displayTabs">
          <v-tab
            v-for="tab in myProps.tabs"
            :key="'tab-' + tab.id"
            @click="changeTab(tab.id, tab.component)"
          >
            {{ tab.title }}
          </v-tab>
        </template>

        <!-- display menu button for tabs on mobile -->
        <v-menu v-else>
          <template #activator="{ props }">
            <v-btn
              class="mt-2 ml-2"
              icon
              v-bind="props"
            >
              <v-icon>mdi-menu</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="tab in myProps.tabs"
              :key="'tab-' + tab.id"
              @click="changeTab(tab.id, tab.component)"
            >
              <v-list-item-title>
                {{ tab.title }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-tabs>

      <v-spacer />

      <span>
        <LangSelection />
      </span>

      <span>
        <UserSettingsHeader
          v-if="displayUserSetting"
          @open-account-settings="changeTab(-1, accountSettings)"
        />
        <v-btn
          v-if="displayBackButton"
          :icon="true"
          @click="$router.back()"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-btn
          v-if="displayLoginButton"
          elevation="0"
          variant="text"
          @click="$keycloak.loginFn()"
        >
          <v-icon start>
            mdi-account
          </v-icon>
          {{ $t('header.Header.LoginButton') }}
        </v-btn>
      </span>
    </v-app-bar>
  </div>
</template>


<script>
export default {
  name: "Header",
}
</script>

<script setup>
import UserSettingsHeader from "@/components/header/UserSettingsHeader.vue";
import AccountSettings from "@/components/header/AccountSettings.vue";
import LangSelection from "@/components/header/LangSelection.vue";
import { computed, ref, shallowRef } from "vue";
import vuetify from "@/plugins/vuetify";


const myProps = defineProps({
  // data on tabs and shown component when selecting the tab
  // entries should be of shape {id: int, title: "", component: component}
  tabs: {
    default: () => [],
    type: Array
  },
  defaultTab: {
    default: 0,
    type: Number
  },
  displayUserSetting: {
    default: true,
    type: Boolean
  },
  displayBackButton: {
    default: false,
    type: Boolean
  },
  displayLoginButton: {
    default: false,
    type: Boolean
  }
});

const emit = defineEmits(["changeTab"]);

const accountSettings = shallowRef(AccountSettings);
const selectedTab = ref(0);


const displayTabs = computed(() => {
  // wenn width > 600px, dann displayTabs = true
  if (vuetify.display.smAndUp.value) {
    return true
  }

  // wenn keine tabs, dann displayTabs = True, damit der Menu Button nicht angezeigt wird
  // wenn nur ein tab, dann displayTabs = True, weil ein Menu Button keinen Sinn macht
  if (myProps.tabs.length <= 1) {
    return true
  }

  return false
});

// created
selectedTab.value = myProps.defaultTab


/**
 * Emits the selected tab and new component type to the parent.
 * @param selectedTab - the id of the selected tab. Starting at 0, increasing left to right.
 * @param component - the component to be shown when the corresponding tab is selected.
 */
function changeTab(newSelectedTab, component) {
  selectedTab.value = newSelectedTab;
  let data = { id: selectedTab.value, component: component };

  emit("changeTab", data);
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}
</script>


<style lang="scss">
  .v-slide-group__content {
    transform: none !important;
  }
</style>