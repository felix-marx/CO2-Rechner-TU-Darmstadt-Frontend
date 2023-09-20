<template>
  <v-app>
    <Header
      :tabs="tabList"
      :display-user-setting="false"
      :display-back-button="true"
    />
    <v-main class="mb-16">
      <v-container>
        <v-card elevation="0">
          <p>
            {{ $t('legal.PrivacyPolicy.DatenschutzerklaerungHeadline') }}
          </p>
      
          <h2>{{ $t('legal.PrivacyPolicy.NameUndAnschrift') }}</h2>
          <p>
            Technische Universität Darmstadt<br>
            Karolinenplatz 5<br>
            64289 Darmstadt<br>
            Telefon: +49 6151 16-01<br>
            Internet: <a
              target="_blank"
              href="https://www.tu-darmstadt.de"
            >www.tu-darmstadt.de</a><br>
            {{ $t('legal.PrivacyPolicy.AnfrageDatenschutz') }}
          </p>
          <h2> {{ $t('legal.PrivacyPolicy.KontaktdatenDatenschutzBeauftragten') }} </h2>
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
          <h2>{{ $t('legal.PrivacyPolicy.RechteBeschwerde_0') }}</h2>
          <p>
            {{ $t('legal.PrivacyPolicy.RechteBeschwerde_1') }} <br>
            {{ $t('legal.PrivacyPolicy.RechteBeschwerde_2') }} <br>
            {{ $t('legal.PrivacyPolicy.RechteBeschwerde_3') }} <br>
            Postfach 3163<br>
            65021 Wiesbaden<br>
            <a
              href="https://datenschutz.hessen.de/%C3%BCber-uns/kontakt"
              target="_blank"
            >E-Mail an HDSB</a><br>
            Telefon: +49 611 1408-0<br>
            Telefax: +49 611 1408-611<br><br>

            {{ $t('legal.PrivacyPolicy.RechteDaten') }}<br>
            <v-list
              dense
            >
              <v-list-item-title>{{ $t('legal.PrivacyPolicy.RechtAuskunft') }}</v-list-item-title>
              <v-list-item-title>{{ $t('legal.PrivacyPolicy.RechtLoeschung') }}</v-list-item-title>
              <v-list-item-title>{{ $t('legal.PrivacyPolicy.RechtVerarbeitung') }}</v-list-item-title>
              <v-list-item-title>{{ $t('legal.PrivacyPolicy.RechtWiederruf') }}</v-list-item-title>
              <v-list-item-title>{{ $t('legal.PrivacyPolicy.RechtWiderspruch') }}</v-list-item-title>
              <v-list-item-title>{{ $t('legal.PrivacyPolicy.RechtDatenuebertragbarkeit') }}</v-list-item-title>
            </v-list>
          </p>

          <h2>{{ $t('legal.PrivacyPolicy.ZweckRechtsgrundlagenLoeschungsfrist') }}</h2>
          
          <h3>{{ $t('legal.PrivacyPolicy.UmgangPersonDaten_0') }}</h3>
          <p>
            {{ $t('legal.PrivacyPolicy.UmgangPersonDaten_1') }}<br>
            {{ $t('legal.PrivacyPolicy.UmgangPersonDaten_2') }}<br>
            {{ $t('legal.PrivacyPolicy.UmgangPersonDaten_3') }}<br>
          </p>
          <h3>{{ $t('legal.PrivacyPolicy.Logdateien_0') }}</h3>
          {{ $t('legal.PrivacyPolicy.Logdateien_1') }}<p>
            <br>
     
            <v-list dense>
              <v-list-item-title>{{ $t('legal.PrivacyPolicy.Logdateien_2') }}</v-list-item-title>
              <v-list-item-title>{{ $t('legal.PrivacyPolicy.Logdateien_3') }}</v-list-item-title>
              <v-list-item-title>{{ $t('legal.PrivacyPolicy.Logdateien_4') }}</v-list-item-title>
              <v-list-item-title>{{ $t('legal.PrivacyPolicy.Logdateien_5') }}</v-list-item-title>
              <v-list-item-title>{{ $t('legal.PrivacyPolicy.Logdateien_6') }}</v-list-item-title>
              <v-list-item-title>{{ $t('legal.PrivacyPolicy.Logdateien_7') }}</v-list-item-title>
            </v-list>

            {{ $t('legal.PrivacyPolicy.Logdateien_8') }}<br>
            {{ $t('legal.PrivacyPolicy.Logdateien_9') }}<br>
            {{ $t('legal.PrivacyPolicy.Logdateien_10') }}<br>
          </p>

          <h3>{{ $t('legal.PrivacyPolicy.Kontaktaufnahme_0') }}</h3>
          <p>
            {{ $t('legal.PrivacyPolicy.Kontaktaufnahme_1') }}<br>
            {{ $t('legal.PrivacyPolicy.Kontaktaufnahme_2') }}<br>
          </p>

          <h3>{{ $t('legal.PrivacyPolicy.Cookies_0') }}</h3>
          <p>
            {{ $t('legal.PrivacyPolicy.Cookies_1') }}<br>
            {{ $t('legal.PrivacyPolicy.Cookies_2') }}<br>
            {{ $t('legal.PrivacyPolicy.Cookies_3') }}<br>
            {{ $t('legal.PrivacyPolicy.Cookies_4') }}<br>
            {{ $t('legal.PrivacyPolicy.Cookies_5') }}<br>
            {{ $t('legal.PrivacyPolicy.Cookies_6') }}<br>
            {{ $t('legal.PrivacyPolicy.Cookies_7') }}
          </p>

          <h3>{{ $t('legal.PrivacyPolicy.ZugriffsgeschuetzteWebsiten_0') }}</h3>
          <p>
            {{ $t('legal.PrivacyPolicy.ZugriffsgeschuetzteWebsiten_1') }}
          </p>

          <h3>{{ $t('legal.PrivacyPolicy.EinbindungDienstenDritter_0') }}</h3>
          <p>
            {{ $t('legal.PrivacyPolicy.EinbindungDienstenDritter_1') }} <a
              href="https://www.hrz.tu-darmstadt.de/hrz_aktuelles/index.de.jsp"
              target="_blanck"
            >Hochschulrechenzentrums Darmstadt</a> (kurz HRZ).<br>
            {{ $t('legal.PrivacyPolicy.EinbindungDienstenDritter_2') }}<br>
            {{ $t('legal.PrivacyPolicy.EinbindungDienstenDritter_3') }}<br>
            {{ $t('legal.PrivacyPolicy.EinbindungDienstenDritter_4') }}<br>
            {{ $t('legal.PrivacyPolicy.EinbindungDienstenDritter_5') }}<br>
            {{ $t('legal.PrivacyPolicy.EinbindungDienstenDritter_6') }}
          </p>

          <h3>{{ $t('legal.PrivacyPolicy.ErstellungUmfrage_0') }}</h3>
          <p>
            {{ $t('legal.PrivacyPolicy.ErstellungUmfrage_1') }}<br>
            {{ $t('legal.PrivacyPolicy.ErstellungUmfrage_2') }}<br>
            {{ $t('legal.PrivacyPolicy.ErstellungUmfrage_3') }}<br>
            {{ $t('legal.PrivacyPolicy.ErstellungUmfrage_4') }}<br>
            {{ $t('legal.PrivacyPolicy.ErstellungUmfrage_5') }}<br><br>

            {{ $t('legal.PrivacyPolicy.ErstellungUmfrage_6') }}<br>

            {{ $t('legal.PrivacyPolicy.ErstellungUmfrage_7') }}
            <v-list dense>
              <v-list-item-title>{{ $t('legal.PrivacyPolicy.ErstellungUmfrage_7_1') }}</v-list-item-title>
              <v-list-item-title>{{ $t('legal.PrivacyPolicy.ErstellungUmfrage_7_2') }}</v-list-item-title>
              <v-list-item-title>{{ $t('legal.PrivacyPolicy.ErstellungUmfrage_7_3') }}</v-list-item-title>
              <v-list-item-title>{{ $t('legal.PrivacyPolicy.ErstellungUmfrage_7_4') }}</v-list-item-title>
              <v-list-item-title>{{ $t('legal.PrivacyPolicy.ErstellungUmfrage_7_5') }}</v-list-item-title>
            </v-list>
            {{ $t('legal.PrivacyPolicy.ErstellungUmfrage_8_0') }}
            <v-list dense>
              <v-list-item-title>{{ $t('legal.PrivacyPolicy.ErstellungUmfrage_8_1') }}</v-list-item-title>
              <v-list-item-title>{{ $t('legal.PrivacyPolicy.ErstellungUmfrage_8_2') }}</v-list-item-title>
            </v-list>

            {{ $t('legal.PrivacyPolicy.ErstellungUmfrage_9_0') }}
            <v-list dense>
              <v-list-item-title>{{ $t('legal.PrivacyPolicy.ErstellungUmfrage_9_1') }}</v-list-item-title>
              <v-list-item-title>{{ $t('legal.PrivacyPolicy.ErstellungUmfrage_9_2') }}</v-list-item-title>
              <v-list-item-title>{{ $t('legal.PrivacyPolicy.ErstellungUmfrage_9_3') }}</v-list-item-title>
              <v-list-item-title>{{ $t('legal.PrivacyPolicy.ErstellungUmfrage_9_4') }}</v-list-item-title>
              <v-list-item-title>{{ $t('legal.PrivacyPolicy.ErstellungUmfrage_9_5') }}</v-list-item-title>
            </v-list>
            {{ $t('legal.PrivacyPolicy.ErstellungUmfrage_10') }}
            <br>

            {{ $t('legal.PrivacyPolicy.ErstellungUmfrage_11') }}<sub>2</sub>{{ $t('legal.PrivacyPolicy.ErstellungUmfrage_12') }}<br>
            {{ $t('legal.PrivacyPolicy.ErstellungUmfrage_13') }}
            {{ $t('legal.PrivacyPolicy.ErstellungUmfrage_14') }}

            <br>
          </p>

          <h3>{{ $t('legal.PrivacyPolicy.Umfrageauswertung_0') }}</h3>
          <p>
            {{ $t('legal.PrivacyPolicy.Umfrageauswertung_1') }}<br>
            {{ $t('legal.PrivacyPolicy.Umfrageauswertung_2') }}<br>
            {{ $t('legal.PrivacyPolicy.Umfrageauswertung_3') }}<br>
          </p>
        </v-card>
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Header from '../componentParts/Header.vue'
import Footer from '../componentParts/Footer.vue'
import loadingAnimation from '../componentParts/LoadingAnimation.vue'
export default {
    name: "PrivacyPolicy",
    components: {
        Header,
        Footer
    },
    data: () => ({
        tabList: [{ id: 0, title: 'Datenschutzerklärung', componentType: loadingAnimation}],
    }),
}


</script>