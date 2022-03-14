<template>
  <v-app-bar
    app
    color="primary"
    dark
  >
    <div class="d-flex align-center" />
    <!--- Tab Menu --->

    <v-tabs
      center-active
      :value="selectedTab"
    >
      <v-tab
        v-for="tab in filteredTabs"
        :key="'tab-' + tab.id"
        @click="changeTab(tab.id, tab.componentType)"
      >
        {{ tab.title }}
      </v-tab>
      <v-tab 
        class="pa-0 ma-0"
        style="min-width:0px"
      />
    </v-tabs>

    <span>
      <UserSettingsHeader
        v-if="displayUserSettings"
        @openAccountSettings="changeTab(2, accountSettings)"
      />
    </span>
  </v-app-bar>
</template>
<script>

import UserSettingsHeader from "../settings/UserSettingsHeader.vue";
import AccountSettings from "../settings/AccountSettings.vue";

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
    displayUserSetting: {
      default: true,
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
    }
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