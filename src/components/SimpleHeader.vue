<template>
  <v-app-bar
    app
    color="primary"
    dark
  >
    <div class="d-flex align-center" />

    <!--- Tab Menu --->
    <v-tabs center-active>
      <v-tab>
        {{ tabTitle }}
      </v-tab>
    </v-tabs>

    <v-spacer />

    <!--- Anmelden Button --->
    <Anmeldung v-if="anmeldenButton" />
  </v-app-bar>
</template>


<script>
export default {
  name: "SimpleHeader",

  props: {
    tabTitle: {
      default: "untitled",
      type: String,
    },
    anmeldenButton: {
      default: false,
      type: Boolean,
    },
  },
  data: () => ({
  }),
};
</script>