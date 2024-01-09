<!-- eslint-disable vue/no-v-html -->
<template>
  <v-app :style="{background: $vuetify.theme.themes[theme].background}">
    <Header
      :tabs="tabList"
      :display-user-setting="false"
      :display-back-button="true"
      :display-login-button="false"
    />
    <v-main class="mb-16">
      <v-container>
        <v-card elevation="0">
          <v-card
            elevation="2"
            outlined
            class="pa-8"
          >
            <p>
              {{ $t('footer.PrivacyPolicy.DatenschutzerklaerungHeadline') }}
            </p>
      
            <h2>{{ $t('footer.PrivacyPolicy.NameUndAnschrift') }}</h2>
            <p>
              Technische Universität Darmstadt<br>
              Karolinenplatz 5<br>
              64289 Darmstadt<br>
              Telefon: +49 6151 16-01<br>
              Internet: <a
                target="_blank"
                href="https://www.tu-darmstadt.de"
              >www.tu-darmstadt.de</a><br>
              {{ $t('footer.PrivacyPolicy.AnfrageDatenschutz') }}
            </p>
            <h2> {{ $t('footer.PrivacyPolicy.KontaktdatenDatenschutzBeauftragten') }} </h2>
            <p>
              Technische Universität Darmstadt<br>
              Der behördliche Datenschutzbeauftragte<br>
              Jan Hansen <br>
              Karolinenplatz 5<br>
              64289 Darmstadt<br>
              Internet: <a
                href="https://www.tu-darmstadt.de/datenschutz"
                target="_blank"
              >www.tu-darmstadt.de/datenschutz</a>
            </p>
            <h2>{{ $t('footer.PrivacyPolicy.RechteBeschwerde_0') }}</h2>
            <p>
              {{ $t('footer.PrivacyPolicy.RechteBeschwerde_1') }} <br>
              {{ $t('footer.PrivacyPolicy.RechteBeschwerde_2') }} <br>
              {{ $t('footer.PrivacyPolicy.RechteBeschwerde_3') }} <br>
              Postfach 3163<br>
              65021 Wiesbaden<br>
              <a
                href="https://datenschutz.hessen.de/%C3%BCber-uns/kontakt"
                target="_blank"
              >E-Mail an HDSB</a><br>
              Telefon: +49 611 1408-0<br>
              Telefax: +49 611 1408-611<br><br>

              {{ $t('footer.PrivacyPolicy.RechteDaten') }}<br>
              <v-list
                dense
              >
                <v-list-item-title>{{ $t('footer.PrivacyPolicy.RechtAuskunft') }}</v-list-item-title>
                <v-list-item-title>{{ $t('footer.PrivacyPolicy.RechtLoeschung') }}</v-list-item-title>
                <v-list-item-title>{{ $t('footer.PrivacyPolicy.RechtVerarbeitung') }}</v-list-item-title>
                <v-list-item-title>{{ $t('footer.PrivacyPolicy.RechtWiederruf') }}</v-list-item-title>
                <v-list-item-title>{{ $t('footer.PrivacyPolicy.RechtWiderspruch') }}</v-list-item-title>
                <v-list-item-title>{{ $t('footer.PrivacyPolicy.RechtDatenuebertragbarkeit') }}</v-list-item-title>
              </v-list>
            </p>

            <h2>{{ $t('footer.PrivacyPolicy.ZweckRechtsgrundlagenLoeschungsfrist') }}</h2>
          
            <h3>{{ $t('footer.PrivacyPolicy.UmgangPersonDaten_0') }}</h3>
            <p>
              {{ $t('footer.PrivacyPolicy.UmgangPersonDaten_1') }}<br>
              {{ $t('footer.PrivacyPolicy.UmgangPersonDaten_2') }}<br>
              {{ $t('footer.PrivacyPolicy.UmgangPersonDaten_3') }}<br>
            </p>
            <h3>{{ $t('footer.PrivacyPolicy.Logdateien_0') }}</h3>
            {{ $t('footer.PrivacyPolicy.Logdateien_1') }}<p>
              <br>
     
              <v-list dense>
                <v-list-item-title>{{ $t('footer.PrivacyPolicy.Logdateien_2') }}</v-list-item-title>
                <v-list-item-title>{{ $t('footer.PrivacyPolicy.Logdateien_3') }}</v-list-item-title>
                <v-list-item-title>{{ $t('footer.PrivacyPolicy.Logdateien_4') }}</v-list-item-title>
                <v-list-item-title>{{ $t('footer.PrivacyPolicy.Logdateien_5') }}</v-list-item-title>
                <v-list-item-title>{{ $t('footer.PrivacyPolicy.Logdateien_6') }}</v-list-item-title>
                <v-list-item-title>{{ $t('footer.PrivacyPolicy.Logdateien_7') }}</v-list-item-title>
              </v-list>

              {{ $t('footer.PrivacyPolicy.Logdateien_8') }}<br>
              {{ $t('footer.PrivacyPolicy.Logdateien_9') }}<br>
              {{ $t('footer.PrivacyPolicy.Logdateien_10') }}<br>
            </p>

            <h3>{{ $t('footer.PrivacyPolicy.Kontaktaufnahme_0') }}</h3>
            <p>
              {{ $t('footer.PrivacyPolicy.Kontaktaufnahme_1') }}<br>
              {{ $t('footer.PrivacyPolicy.Kontaktaufnahme_2') }}<br>
            </p>

            <h3>{{ $t('footer.PrivacyPolicy.Cookies_0') }}</h3>
            <p>
              {{ $t('footer.PrivacyPolicy.Cookies_1') }}<br>
              {{ $t('footer.PrivacyPolicy.Cookies_2') }}<br>
              {{ $t('footer.PrivacyPolicy.Cookies_3') }}<br>
              {{ $t('footer.PrivacyPolicy.Cookies_4') }}<br>
              {{ $t('footer.PrivacyPolicy.Cookies_5') }}<br>
              {{ $t('footer.PrivacyPolicy.Cookies_6') }}<br>
              {{ $t('footer.PrivacyPolicy.Cookies_7') }}
            </p>

            <h3>{{ $t('footer.PrivacyPolicy.ZugriffsgeschuetzteWebsiten_0') }}</h3>
            <p>
              {{ $t('footer.PrivacyPolicy.ZugriffsgeschuetzteWebsiten_1') }}
            </p>

            <h3>{{ $t('footer.PrivacyPolicy.EinbindungDienstenDritter_0') }}</h3>
            <p>
              {{ $t('footer.PrivacyPolicy.EinbindungDienstenDritter_1') }} <a
                href="https://www.hrz.tu-darmstadt.de/hrz_aktuelles/index.de.jsp"
                target="_blanck"
              >Hochschulrechenzentrums Darmstadt</a> (kurz HRZ).<br>
              {{ $t('footer.PrivacyPolicy.EinbindungDienstenDritter_2') }}<br>
              {{ $t('footer.PrivacyPolicy.EinbindungDienstenDritter_3') }}<br>
              {{ $t('footer.PrivacyPolicy.EinbindungDienstenDritter_4') }}<br>
              {{ $t('footer.PrivacyPolicy.EinbindungDienstenDritter_5') }}<br>
              {{ $t('footer.PrivacyPolicy.EinbindungDienstenDritter_6') }}
            </p>

            <h3>{{ $t('footer.PrivacyPolicy.ErstellungUmfrage_0') }}</h3>
            <p>
              {{ $t('footer.PrivacyPolicy.ErstellungUmfrage_1') }}<br>
              {{ $t('footer.PrivacyPolicy.ErstellungUmfrage_2') }}<br>
              {{ $t('footer.PrivacyPolicy.ErstellungUmfrage_3') }}<br>
              {{ $t('footer.PrivacyPolicy.ErstellungUmfrage_4') }}<br>
              {{ $t('footer.PrivacyPolicy.ErstellungUmfrage_5') }}<br><br>

              {{ $t('footer.PrivacyPolicy.ErstellungUmfrage_6') }}<br>

              {{ $t('footer.PrivacyPolicy.ErstellungUmfrage_7') }}
              <v-list dense>
                <v-list-item-title>{{ $t('footer.PrivacyPolicy.ErstellungUmfrage_7_1') }}</v-list-item-title>
                <v-list-item-title>{{ $t('footer.PrivacyPolicy.ErstellungUmfrage_7_2') }}</v-list-item-title>
                <v-list-item-title>{{ $t('footer.PrivacyPolicy.ErstellungUmfrage_7_3') }}</v-list-item-title>
                <v-list-item-title>{{ $t('footer.PrivacyPolicy.ErstellungUmfrage_7_4') }}</v-list-item-title>
                <v-list-item-title>{{ $t('footer.PrivacyPolicy.ErstellungUmfrage_7_5') }}</v-list-item-title>
              </v-list>
              {{ $t('footer.PrivacyPolicy.ErstellungUmfrage_8_0') }}
              <v-list dense>
                <v-list-item-title>{{ $t('footer.PrivacyPolicy.ErstellungUmfrage_8_1') }}</v-list-item-title>
                <v-list-item-title>{{ $t('footer.PrivacyPolicy.ErstellungUmfrage_8_2') }}</v-list-item-title>
              </v-list>

              {{ $t('footer.PrivacyPolicy.ErstellungUmfrage_9_0') }}
              <v-list dense>
                <v-list-item-title>{{ $t('footer.PrivacyPolicy.ErstellungUmfrage_9_1') }}</v-list-item-title>
                <v-list-item-title>{{ $t('footer.PrivacyPolicy.ErstellungUmfrage_9_2') }}</v-list-item-title>
                <v-list-item-title>{{ $t('footer.PrivacyPolicy.ErstellungUmfrage_9_3') }}</v-list-item-title>
                <v-list-item-title>{{ $t('footer.PrivacyPolicy.ErstellungUmfrage_9_4') }}</v-list-item-title>
                <v-list-item-title>{{ $t('footer.PrivacyPolicy.ErstellungUmfrage_9_5') }}</v-list-item-title>
              </v-list>
              {{ $t('footer.PrivacyPolicy.ErstellungUmfrage_10') }}
              <br>

              <label v-html="$t('footer.PrivacyPolicy.ErstellungUmfrage_11')" /> <br>
              {{ $t('footer.PrivacyPolicy.ErstellungUmfrage_12') }}
              {{ $t('footer.PrivacyPolicy.ErstellungUmfrage_13') }}

              <br>
            </p>

            <h3>{{ $t('footer.PrivacyPolicy.Umfrageauswertung_0') }}</h3>
            <p>
              {{ $t('footer.PrivacyPolicy.Umfrageauswertung_1') }}<br>
              {{ $t('footer.PrivacyPolicy.Umfrageauswertung_2') }}<br>
              {{ $t('footer.PrivacyPolicy.Umfrageauswertung_3') }}<br>
            </p>
          </v-card>
        </v-card>
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Header from '../header/Header.vue'
import Footer from '../footer/Footer.vue'
import loadingAnimation from '../componentParts/LoadingAnimation.vue'
import i18n from '../../i18n'

export default {
  name: "PrivacyPolicy",

  components: {
    Header,
    Footer
  },

  data: () => ({
    tabList: [],
  }),

  computed:{
    theme(){
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    }
  },

  watch: {
    '$i18n.locale': function() {
      this.setTabList();
    }
  },
  
  created() {
    this.setTabList();
  },

  methods: {
    setTabList(){
      this.tabList = [
        { id: 0, title: i18n.t('footer.Footer.Datenschutzerklearung'), componentType: loadingAnimation},
      ]
    }
  },
}


</script>