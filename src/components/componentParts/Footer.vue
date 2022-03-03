<template>
  <v-card>
    <!--- Footer --->
    <v-footer
      :padless="padless"
      fixed
      bottom
    >
      <v-card
        text
        tile
        width="100%"
        class="primary text-center"
      >
        <v-row justify="center">
          <v-card-text>
            <v-btn
              v-for="(fElem, index) in footerButtons"
              :key="'footerButton-' + index"
              :href="fElem.href"
              class="mx-4"
              :target="fElem.target"
              text
            >
              <span class="mx-2">{{ fElem.text }}</span>
            </v-btn>

            <!--- Contact Dialog --->
            <Contact />
            <!-- Link to Github Repository -->
            <OpenSource />
          </v-card-text>
        </v-row>
      </v-card>
    </v-footer>
  </v-card>
</template>

<script>
import Contact from "../legal/Contact.vue";
import OpenSource from "./OpenSource.vue";

export default {
  name: "Footer",
  components: {
    Contact,
    OpenSource
},

  data: () => ({
    padless: true,
    dialog: false,
    
    // Contact component not in footerButtons for it is as Dialog and not a Button
    footerButtons: [
      {
        text: "Impressum",
        href: "https://www.tu-darmstadt.de/impressum/index.de.jsp", // TODO keep link to TU Darmstadt website or make own impressum? --> AG Meeting
        target: "_blank",
      },
      {
        text: "Datenschutzerklärung",
        href: process.env.VUE_APP_URL + "/datenschutz", // Eigene Datenschutzerklaerung
        target: "",
      },
    ],
  })
};
</script>