<template>
  <v-card height="400px">
    <v-footer
      :padless="padless"
      fixed
      bottom
    >
      <v-card
        flat
        tile
        width="100%"
        class="primary text-center"
      >
        <v-row justify="center">
          <v-card-text>
            <!--- Footer Links --->
            <v-btn
              v-for="(fElem, i) in footerElements"
              :key="i"
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
import Kontakt from "./Kontakt.vue";

export default {
  name: "Footer",
  components: {
      Kontakt
  },

  data: () => ({
    padless: true,
    dialog: false,
    footerElements: [
      {
        text: "Impressum",
        href: "https://www.tu-darmstadt.de/impressum/index.de.jsp", // TODO
      },
      {
        text: "Datenschutzerklärung",
        href: "https://www.tu-darmstadt.de/datenschutzerklaerung.de.jsp", // TODO
      },
    ],
  })
};
</script>