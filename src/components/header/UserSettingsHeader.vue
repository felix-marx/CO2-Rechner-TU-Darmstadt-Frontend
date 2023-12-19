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
            {{ $t('header.userSettingsHeader.AngemeldetAls') }} {{ displayName }}
          </v-list-item-title>
        </v-list-item>
        <v-divider />
        <v-list-item
          text
          @click="openAccountSettings()"
        >
          <v-list-item-title> {{ $t('header.userSettingsHeader.Accountverwaltung') }} </v-list-item-title>
        </v-list-item>

        <v-list-item
          v-show="isAdmin"
          text
          @click="switchAdminOrSurvey()"
        >
          <v-list-item-title> {{ this.$route.fullPath == "/admin" ? $t('header.userSettingsHeader.ZurUmfrage') : $t('header.userSettingsHeader.ZurAdminuebersicht') }} </v-list-item-title>
        </v-list-item>
        <v-list-item
          text
          @click="$keycloak.logoutFn()"
        >
          <v-list-item-title class="red--text">
            {{ $t('header.userSettingsHeader.Abmelden') }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-container>
</template>

<script>
import AccountSettings from "./AccountSettings.vue"

export default {
  name: "UserSettingsHeader",

  data: () => ({
    isAdmin: false,
  }),

  computed: {
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

  created() {
    this.getRole();
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

    getRole: async function() {
      await fetch(process.env.VUE_APP_BASEURL + "/nutzer/rolle", {
        method: 'GET',
        headers: {
          "Authorization": "Bearer " + this.$keycloak.token,
        }
      }).then(response => response.json())
        .then(data => {
          if(data.data.rolle == 1){
            this.isAdmin = true;
          }
      }).catch((error) => {
        console.error("Error:", error);
      });
    }
  }
};
</script>
