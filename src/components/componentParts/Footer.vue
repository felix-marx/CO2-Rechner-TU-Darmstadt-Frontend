<template>
  <!--- Footer --->
  <v-footer
    padless
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
</template>

<script>
import Contact from "../legal/Contact.vue";
import OpenSource from "./OpenSource.vue";
import i18n from "@/i18n";

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
        text: i18n.t('componentParts.footer.Impressum'),
        href: "https://www.tu-darmstadt.de/impressum/index.de.jsp",
        target: "_blank",
      },
      {
        text: i18n.t('componentParts.footer.Datenschutzerklearung'),
        href: process.env.VUE_APP_URL + "/datenschutz", // Eigene Datenschutzerklaerung
        target: "",
      },
    ],
  })
};
</script>