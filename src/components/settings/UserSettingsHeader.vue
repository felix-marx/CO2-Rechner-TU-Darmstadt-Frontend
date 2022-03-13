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
          
          {{ cookieAttribut }}
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-title class="grey--text">
            Angemeldet als: {{ cookieAttribut }}
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
          @click="deleteAbmelden()"
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
    // we need this for some reason, since a direct call to Cookies.getCookieAttribut() in the template does not evaluate.
    cookieAttribut: function () {
      return Cookies.getCookieAttribut('username')
    },

    isAdmin: function() {
      return Cookies.getCookieAttribut('rolle') == 1
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

    async deleteAbmelden() {
    await fetch(process.env.VUE_APP_BASEURL + "/auth/abmeldung", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: Cookies.getCookieAttribut('username')
      }),
    })
      .then((response) => response.json())
      .then(() => {
        //This is always the case when the backend returns a package
        //Delete cookie and log if not success
        Cookies.deleteCookieAttribut("username")
        Cookies.deleteCookieAttribut("sessiontoken")
        this.$router.push('/').catch(() => {})
  
      })
      .catch((error) => {
        //This is always the case when the backend returns nothing -> Timeout
        console.error("Error:", error)
      });
    }

  }
};
</script>
