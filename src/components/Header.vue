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

    <h4 v-if="cookieAttribut != null">
      Angemeldet als: {{ cookieAttribut }}
    </h4>
    <v-btn
      v-if="cookieAttribut != null"
      text
      @click="deleteAbmelden()"
    >
      <span class="mr-2">Abmelden</span>
      <v-icon>mdi-account</v-icon>
    </v-btn>
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
    // entries should be of shape {id: int, title: "", component: ComponentType}
    tabs: {
      default: null,
      type: Array
    },
  },
  data: () => ({

  }),
  computed: {
    cookieAttribut: function () {
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
    checkIfCookieAttributExists(identifier) {
      Cookies.checkIfCookieAttributExists(identifier)
    },
    getCookieAttribut(identifier) {
      Cookies.getCookieAttribut(identifier)
    },

    deleteAbmelden: async function () {
      await fetch("http://localhost:9000/auth/abmeldung", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: Cookies.getCookieAttribut('email')
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          //This is always the case when the backend returns a package
          //Delete cookie and log if not success
          Cookies.deleteCookieAttribut("email")
          Cookies.deleteCookieAttribut("sessiontoken")
          if (data.status != "success") {
            console.log("Server konnte nicht löschen")
          }
          this.$router.push('/')
          //TODO Show error message in case of error 
          console.log("Success:", data)

        })
        .catch((error) => {
          //This is always the case when the backend returns nothing -> Timeout
          console.error("Error:", error)
        });
    }

  }
};
</script>