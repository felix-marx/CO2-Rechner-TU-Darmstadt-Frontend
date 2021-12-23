<template>
  <v-app>
    <!-- main body -->
    <v-main>
      <v-btn @click="visible=!visible">
        Auswertung
      </v-btn>
      <div v-if="visible">
        <Auswertung :umfrageid="testid" />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Auswertung from "../components/nutzerauswertung.vue";

export default {
  name: "App",

  components: {
    Auswertung
  },

  data: () => ({
      testid: "61b23e9855aa64762baf76d7",
      visible: false,
  }),

  created(){
    console.log("View", this.testid)
  },

  methods: {

  }
};
</script>
