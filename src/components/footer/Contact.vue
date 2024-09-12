<template>
  <v-dialog
    v-model="dialog"
    width="500"
  >
    <template #activator="{ props }">
      <v-btn
        class="mx-4"
        variant="text"
        v-bind="props"
      >
        <span class="mx-2 text-white"> {{ $t('footer.Contact.Name') }} </span>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="text-h5 bg-grey-lighten-2 headerClass">
        {{ $t('footer.Contact.Titel') }}
      </v-card-title>

      <v-container>
        <v-row>
          <v-col
            cols="4"
            align-self="center"
          >
            <v-img
              src="@/assets/kontakt_solarhaus.jpg"
              alt="Bild des Solarhauses am Campus Lichtwiese. Der Sitz des Büros für Nachhaltigkeit."
            />
          </v-col>
          <v-col
            cols="8"
          >
            <!-- Webseite -->
            <v-card elevation="0">
              <v-icon class="mr-2">
                mdi-web
              </v-icon>
              <a
                href="https://www.tu-darmstadt.de/nachhaltigkeit/buero_fuer_nachhaltigkeit/index.de.jsp"
                target="_blank"
              > 
                {{ $t('footer.Contact.Titel') }}
              </a>
            </v-card>
            <!-- Mail -->
            <v-card elevation="0">
              <v-icon class="mr-2">
                mdi-email-outline
              </v-icon>
              <a
                href="mailto:co2-rechner@zv.tu-darmstadt.de"
              >co2-rechner@zv.tu-darmstadt.de</a>
            </v-card>
            <!-- Phone -->
            <v-card elevation="0">
              <v-icon class="mr-2">
                mdi-phone
              </v-icon>
              <a href="tel:+4961511657230">+49 6151 16-57230</a>
            </v-card>

            <!-- following div was issued as vulnerable to XSS attacks by the linter. 
          The issue was reviewed and showed that there are no possible XSS attacks here, therefore the linter is turned off
          for this component -->
          
            <div
              class="my-3 mx-4"
            >
              {{ $t('footer.Contact.Adresse_1') }}<br>{{ $t('footer.Contact.Adresse_2') }}<br>{{ $t('footer.Contact.Adresse_3') }}
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Contact",
  
  data() {
    return {
      dialog: false,
    };
  },
};
</script>