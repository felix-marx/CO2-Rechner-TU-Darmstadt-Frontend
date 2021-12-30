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
        v-for="tab in tabs"
        :key="'tab-' + tab.id"
        @click="changeTab(tab.id, tab.componentType)"
      >
        {{ tab.title }}
      </v-tab>
    </v-tabs>
    <v-container>
      <v-row>
        <v-col cols="8" />
        <v-col>
          <h4>
            Angemeldet als: {{ cookieAttribut }}
          </h4>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>
<script>

import Cookies from "../Cookie"

export default {
  name: "Header",

  props: {
      anmeldenButton: {
        default: true,
        type: Boolean,
      },
      // data on tabs and shown component when selecting the tab
      tabs: {
        default: null,
        type: Array
      },
    },

  data: () => ({
    
  }),
  computed: {
    cookieAttribut: function(){
      return Cookies.getCookieAttribut('email')
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
        checkIfCookieAttributExists(identifier){
          Cookies.checkIfCookieAttributExists(identifier)
        },
        getCookieAttribut(identifier){
          Cookies.getCookieAttribut(identifier)
        }
        
  }
};
</script>