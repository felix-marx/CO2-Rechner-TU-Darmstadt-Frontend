<template>
  <v-app-bar
    app
    color="primary"
    dark
  >
    <div class="d-flex align-center" />
    <!--- Tab Menu --->

    <v-tabs center-active>
      <v-tab
        v-for="tab in filteredTabs"
        :key="'tab-' + tab.id"
        @click="changeTab(tab.id, tab.componentType)"
      >
        {{ tab.title }}
      </v-tab>
      <v-tab />
    </v-tabs>

    <span>
      <UserSettingsHeader
        v-if="cookieAttribut != null"
        @openAccountSettings="changeTab(-1, accountSettings)"
      />
    </span>
  </v-app-bar>
</template>
<script>

import Cookies from "../Cookie"
import UserSettingsHeader from "./componentParts/userSettingsHeader.vue";
import AccountSettings from "./AccountSettings.vue"

export default {
  name: "Header",

  components: {
    UserSettingsHeader
  },

  props: {
    // data on tabs and shown component when selecting the tab
    // entries should be of shape {id: int, title: "", component: ComponentType}
    tabs: {
      default: null,
      type: Array
    },
  },
  data: () => ({
    accountSettings: AccountSettings
  }),
  computed: {
    cookieAttribut: function () {
      return Cookies.getCookieAttribut('username')
    },

    /**
     * Returns all tabs with id >= 0. Tab with index -1 is a placeholder for when settings are shown.
     */
    filteredTabs: function() {
      return this.tabs.filter(tab => tab.id != 2)
    }
  },
  methods: {
    /**
     * Emits the selected tab and new component type to the parent.
     * @param selectedTab - the id of the selected tab. starting at 0, increasing left to right.
     * @param componentType - the component to be shown when the corresponding tab is selected.
     */
    changeTab(selectedTab, componentType) {
      let data = { id: selectedTab, componentType: componentType };
      this.$emit("changeTab", data);
    },
  }
};
</script>