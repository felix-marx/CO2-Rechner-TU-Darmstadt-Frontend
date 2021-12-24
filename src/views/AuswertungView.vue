<template>
  <v-app>
    <!-- main body -->
    <v-main>
      <v-container>
        <v-row>
          <v-btn @click="visible=!visible">
            Auswertung
          </v-btn>
        </v-row>
        <v-row>
          <div v-if="visible">
            <Auswertung :umfrageid="testid1" />
          </div>
        </v-row>
        <v-row>
          <v-btn @click="visible2=!visible2">
            Auswertung
          </v-btn>
        </v-row>
        <v-row>
          <div v-if="visible2">
            <Auswertung :umfrageid="testid2" />
          </div>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Auswertung from "../components/nutzerauswertung.vue";
// import Auswertung2 from "../components/nutzerauswertung.vue";

export default {
  name: "App",

  components: {
    Auswertung,
    // Auswertung2
  },

  data: () => ({
      testid1: "61c572546ff06604d75512ba",
      testid2: "000",
      visible: false,
      visible2: false,
  }),

  created(){
    console.log("View", this.testid1, this.testid2)
  },

  methods: {

  }
};
</script>
