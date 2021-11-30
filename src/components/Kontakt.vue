 <template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="mx-4" text v-bind="attrs" v-on="on" elevation="0">
        <span class="mx-2">Kontakt</span>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        Büro für Nachhaltigkeit
      </v-card-title>

      <v-list-item>
        <!--- Kontakt Bild --->
        <v-list-item-avatar size="150" left>
          <v-img
            :src="require('../assets/kontakt_solarhaus.jpg')"
            alt="Bild des Solarhauses am Campus Lichtwiese. Der Sitz des Büros für Nachhaltigkeit."
          >
          </v-img>
        </v-list-item-avatar>

        <!--- Kontakt Adresse --->
        <v-list-item-content>
          <v-card elevation="0">
            <v-icon class="mr-2">mdi-email-outline</v-icon>
            <a href="mailto:nachhaltigkeit@tu-darmstadt.de"
              >nachhaltigkeit@tu-darmstadt.de</a
            >
          </v-card>
          <v-card elevation="0">
            <v-icon class="mr-2">mdi-phone</v-icon>
            <a href="tel:+4961511657230">+49 6151 16-57230</a>
          </v-card>

          <div class="my-2 mx-2" v-html="addresse"></div>
        </v-list-item-content>
      </v-list-item>
      <v-card-actions>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Kontakt",
  data() {
    return {
      addresse: "L3|02 Solarhaus</br>El-Lissitzky-Straße 3</br>64287 Darmstadt",
      dialog: false,
    };
  },
};
</script>