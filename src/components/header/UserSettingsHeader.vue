<template>
  <!-- user settings component. Dropdown menu when clicking button for user options -->
  <v-container>
    <v-menu>
      <template #activator="{ props }">
        <v-btn
          elevation="0"
          variant="text"
          v-bind="props"
        >
          <v-icon> mdi-account-cog </v-icon>
          {{ displayName }}
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-title class="text-grey">
            {{ $t('header.userSettingsHeader.AngemeldetAls') }} {{ displayName }}
          </v-list-item-title>
        </v-list-item>
        <v-divider />
        <v-list-item
          text
          @click="$emit('openAccountSettings')"
        >
          <v-list-item-title> {{ $t('header.userSettingsHeader.Accountverwaltung') }} </v-list-item-title>
        </v-list-item>

        <v-list-item
          v-show="isAdmin"
          text
          @click="switchAdminOrSurvey()"
        >
          <v-list-item-title> {{ $route.fullPath == "/admin" ? $t('header.userSettingsHeader.ZurUmfrage') : $t('header.userSettingsHeader.ZurAdminuebersicht') }} </v-list-item-title>
        </v-list-item>
        <v-list-item
          text
          @click="$keycloak.logoutFn()"
        >
          <v-list-item-title class="text-red">
            {{ $t('header.userSettingsHeader.Abmelden') }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-container>
</template>

<script>
export default {
  name: "UserSettingsHeader",

  emits: ["openAccountSettings"],

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
    switchAdminOrSurvey: function() {
      if(this.$route.fullPath == "/admin")  {
        this.$router.push('/survey').catch(() => {})
      } else {
        this.$router.push('/admin').catch(() => {})
      }
    },

    getRole: async function() {
      await fetch(import.meta.env.VITE_BASEURL + "/nutzer/rolle", {
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
