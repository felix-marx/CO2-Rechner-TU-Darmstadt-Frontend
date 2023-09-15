<template>
  <!-- user settings component. Dropdown menu when clicking button for user options -->
  <v-container>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          elevation="0"
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          <v-icon> mdi-account-cog </v-icon>
          {{ displayName }}
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-title class="grey--text">
            Angemeldet als: {{ displayName }}
          </v-list-item-title>
        </v-list-item>
        <v-divider />
        <v-list-item
          text
          @click="openAccountSettings()"
        >
          <v-list-item-title> Accountverwaltung </v-list-item-title>
        </v-list-item>

        <v-list-item
          v-show="isAdmin"
          text
          @click="switchAdminOrSurvey()"
        >
          <v-list-item-title> {{ this.$route.fullPath == "/admin" ? "Zur Umfrage" : "Zur Adminübersicht" }} </v-list-item-title>
        </v-list-item>
        <v-list-item
          text
          @click="$keycloak.logoutFn()"
        >
          <v-list-item-title class="red--text">
            Abmelden
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-container>
</template>

<script>
import Cookies from "../Cookie.js"
import AccountSettings from "./AccountSettings.vue"

export default {
  name: "UserSettingsHeader",

  computed: {
    isAdmin: function() {
      return Cookies.getCookieAttribut('rolle') == 1
    },

    displayName: function() {
      if(this.$keycloak.tokenParsed.name != undefined) {
        return this.$keycloak.tokenParsed.name
      }
      else if (this.$keycloak.tokenParsed.email != undefined) {
        return this.$keycloak.tokenParsed.email
      } 
      else {
        return this.$keycloak.tokenParsed.preferred_username
      }
    }
  },

  methods: {
    openAccountSettings: function() {
      let data = { id: 2, componentType: AccountSettings };
      this.$emit("openAccountSettings", data);
    },

    switchAdminOrSurvey: function() {
      if(this.$route.fullPath == "/admin")  {
        this.$router.push('/survey').catch(() => {})
      } else {
        this.$router.push('/admin').catch(() => {})
      }
    },

  }
};
</script>
