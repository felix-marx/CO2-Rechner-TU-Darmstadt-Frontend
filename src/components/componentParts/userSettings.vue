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
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
            <v-list-item-title class="grey--text"> Angemeldet als: {{cookieAttribut}} </v-list-item-title>
        </v-list-item>
        <v-divider/>
        <!-- TODO Hover Effect -->
        <v-list-item>
            <v-list-item-title> Accountverwaltung </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-container>
</template>

<script>
import Cookies from "../../Cookie"

export default {
  name: "UserSettings",

  props: {
  },

  data: () => ({

  }),
  computed: {
    cookieAttribut: function () {
      return Cookies.getCookieAttribut('username')
    }
  },
};
</script>
