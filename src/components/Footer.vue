<template>
  <v-card height="400px">
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
            <!--- Footer Buttons (links are currently opened in new tab by 'target="_blank"')--->
            <v-btn
              v-for="(fElem, index) in footerButtons"
              :key="'footerButton-' + index"
              :href="fElem.href"
              class="mx-4"
              target="_blank"
              text
            >
              <span class="mx-2">{{ fElem.text }}</span>
            </v-btn>

            <!--- Kontakt Dialog --->
            <Kontakt />
          </v-card-text>
        </v-row>
      </v-card>
    </v-footer>
  </v-card>
</template>

<script>
import Kontakt from "./Kontakt";

export default {
  name: "Footer",
  components: {
      Kontakt
  },

  data: () => ({
    padless: true,
    dialog: false,
    
    // Kontakt component not in footerButtons for it is as Dialog and not a Button
    footerButtons: [
      {
        text: "Impressum",
        href: "https://www.tu-darmstadt.de/impressum/index.de.jsp", // TODO keep link to TU Darmstadt website or make own impressum? --> AG Meeting
      },
      {
        text: "Datenschutzerklärung",
        href: process.env.VUE_APP_URL + "/datenschutz", // Eigene Datenschutzerklaerung
      },
    ],
  })
};
</script>