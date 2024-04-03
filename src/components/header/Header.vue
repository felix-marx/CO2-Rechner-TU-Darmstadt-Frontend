<template>
  <div>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center" /> 
    
      <v-tabs
        center-active
        :value="selectedTab"
      >
        <!-- display tabs normally -->
        <template v-if="!this.$vuetify.breakpoint.mobile">
          <v-tab
            v-for="tab in filteredTabs"
            :key="'tab-' + tab.id"
            @click="changeTab(tab.id, tab.componentType)"
          >
            {{ tab.title }}
          </v-tab>
        </template>

        <!-- display menu button for tabs on mobile -->
        <v-menu v-if="this.$vuetify.breakpoint.mobile && filteredTabs">
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              v-on="on"
            >
              <v-icon>mdi-menu</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="tab in filteredTabs"
              :key="'tab-' + tab.id"
              @click="changeTab(tab.id, tab.componentType)"
            >
              <v-list-item-title>
                {{ tab.title }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-tabs>

      <span>
        <LangSelection />
      </span>

      <span>
        <UserSettingsHeader
          v-if="displayUserSetting"
          @openAccountSettings="changeTab(2, accountSettings)"
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
          color="primary"
          elevation="0"
          @click="$keycloak.loginFn()"
        >
          <v-icon left>
            mdi-account
          </v-icon>
          {{ $t('header.Header.LoginButton') }}
        </v-btn>
      </span>
    </v-app-bar>
  </div>
</template>
<script>

import UserSettingsHeader from "../header/UserSettingsHeader.vue";
import AccountSettings from "../header/AccountSettings.vue";
import LangSelection from "@/components/header/LangSelection.vue";

export default {
  name: "Header",

  components: {
    UserSettingsHeader,
    LangSelection
  },

  props: {
    // data on tabs and shown component when selecting the tab
    // entries should be of shape {id: int, title: "", component: ComponentType}
    tabs: {
      default: null,
      type: Array
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
  },

  data: () => ({
    accountSettings: AccountSettings,
    selectedTab: 0,
  }),

  computed: {
    /**
     * Returns all tabs with id >= 0. Tab with index -1 is a placeholder for when settings are shown.
     */
    filteredTabs: function() {
      if (this.tabs === null){
        return null
      }
      return this.tabs.filter(tab => tab.id != 2)
    },
  },

  methods: {
    /**
     * Emits the selected tab and new component type to the parent.
     * @param selectedTab - the id of the selected tab. starting at 0, increasing left to right.
     * @param componentType - the component to be shown when the corresponding tab is selected.
     */
    changeTab(selectedTab, componentType) {
      this.selectedTab = selectedTab;
      let data = { id: selectedTab, componentType: componentType };
      this.$emit("changeTab", data);
    },
  }
};
</script>