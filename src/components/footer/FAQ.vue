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
          <v-card
            elevation="2"
            outlined
          >
            <h2 class="display-1 font-weight-bold">
              {{ $t('footer.FAQ.Titel_1') }}
            </h2>
          
            <v-expansion-panels
              focusable
              multiple
              class="px-4 pb-4 mt-2"
            >
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <b> {{ $t('footer.FAQ.Frage_1_1') }} </b> 
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-card
                    class="mt-4"
                    elevation="0"
                  >
                    {{ $t('footer.FAQ.Antwort_1_1') }}
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header>
                  <b> {{ $t('footer.FAQ.Frage_1_2') }} </b>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-card
                    class="mt-4"
                    elevation="0"
                  >
                    <p> {{ $t('footer.FAQ.Antwort_1_2_1') }} </p>
                    <p> {{ $t('footer.FAQ.Antwort_1_2_2') }} </p>
                    <p> {{ $t('footer.FAQ.Antwort_1_2_3') }} </p>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header>
                  <b> {{ $t('footer.FAQ.Frage_1_3') }} </b> 
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-card
                    class="mt-4"
                    elevation="0"
                  >
                    <p> {{ $t('footer.FAQ.Antwort_1_3_1') }} </p>
                    <p> {{ $t('footer.FAQ.Antwort_1_3_2') }} </p>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header>
                  <b> {{ $t('footer.FAQ.Frage_1_4') }} </b> 
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-card
                    class="mt-4"
                    elevation="0"
                  >
                    <p> {{ $t('footer.FAQ.Antwort_1_4_1') }} </p>
                    <p> {{ $t('footer.FAQ.Antwort_1_4_2') }} </p>
                    <p> {{ $t('footer.FAQ.Antwort_1_4_2_1') }} </p>
                    <p> {{ $t('footer.FAQ.Antwort_1_4_2_2') }} </p>
                    <p> {{ $t('footer.FAQ.Antwort_1_4_2_3') }} </p>
                    <p> {{ $t('footer.FAQ.Antwort_1_4_3') }} </p>
                    <p> {{ $t('footer.FAQ.Antwort_1_4_4') }} </p>
                    <p> {{ $t('footer.FAQ.Antwort_1_4_5') }} </p>
                    <p> {{ $t('footer.FAQ.Antwort_1_4_6') }} </p>
                    <p> {{ $t('footer.FAQ.Antwort_1_4_7') }} </p>
                    <v-simple-table>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th />
                            <th> {{ $t('footer.FAQ.Antwort_1_4_Tabelle_1') }} </th>
                            <th> {{ $t('footer.FAQ.Antwort_1_4_Tabelle_2') }} </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th> Scope 1 </th>
                            <td> {{ $t('footer.FAQ.Antwort_1_4_Tabelle_3') }} </td>
                            <td> {{ $t('footer.FAQ.Antwort_1_4_Tabelle_4') }}  </td>
                          </tr>
                          <tr>
                            <th> Scope 2 </th>
                            <td> {{ $t('footer.FAQ.Antwort_1_4_Tabelle_5') }} </td>
                            <td> {{ $t('footer.FAQ.Antwort_1_4_Tabelle_5') }} </td>
                          </tr>
                          <tr>
                            <th> Scope 3 </th>
                            <td> {{ $t('footer.FAQ.Antwort_1_4_Tabelle_6') }} </td>
                            <td> {{ $t('footer.FAQ.Antwort_1_4_Tabelle_7') }} </td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header>
                  <b> {{ $t('footer.FAQ.Frage_1_5') }} </b> 
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-card
                    class="mt-4"
                    elevation="0"
                  >
                    <p> {{ $t('footer.FAQ.Antwort_1_5_1') }} </p>
                    <p> {{ $t('footer.FAQ.Antwort_1_5_2') }} </p>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header>
                  <b> {{ $t('footer.FAQ.Frage_1_6') }} </b> 
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-card
                    class="mt-4"
                    elevation="0"
                  >
                    <p> {{ $t('footer.FAQ.Antwort_1_6_1') }} </p>
                    <p> {{ $t('footer.FAQ.Antwort_1_6_2') }} </p>
                    <v-simple-table>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th> {{ $t('footer.FAQ.Antwort_1_6_Tabelle_1') }} </th>
                            <th> {{ $t('footer.FAQ.Antwort_1_6_Tabelle_2') }} </th>
                            <th> {{ $t('footer.FAQ.Antwort_1_6_Tabelle_3') }} </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td> {{ $t('footer.FAQ.Antwort_1_6_Tabelle_4') }} </td>
                            <td> 5 - 200 </td>
                            <td> 1 </td>
                          </tr>
                          <tr>
                            <td> {{ $t('footer.FAQ.Antwort_1_6_Tabelle_5') }} </td>
                            <td> 12 </td>
                            <td> 25 </td>
                          </tr>
                          <tr>
                            <td> {{ $t('footer.FAQ.Antwort_1_6_Tabelle_6') }} </td>
                            <td> 114 </td>
                            <td> 298 </td>
                          </tr>
                          <tr>
                            <td> {{ $t('footer.FAQ.Antwort_1_6_Tabelle_7') }} </td>
                            <td> {{ $n(1.4, 'decimal') }} - 270 </td>
                            <td> 124 - {{ $n(14800, 'integer') }} </td>
                          </tr>
                          <tr>
                            <td> {{ $t('footer.FAQ.Antwort_1_6_Tabelle_8') }} </td>
                            <td> 740 - {{ $n(50000, 'integer') }}</td>
                            <td> {{ $n(7390, 'integer') }} - {{ $n(12000, 'integer') }}</td>
                          </tr>
                          <tr>
                            <td> {{ $t('footer.FAQ.Antwort_1_6_Tabelle_9') }} </td>
                            <td> {{ $n(3200, 'integer') }}</td>
                            <td> {{ $n(22800, 'integer') }}</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header>
                  <b> {{ $t('footer.FAQ.Frage_1_7') }} </b> 
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-card
                    class="mt-4"
                    elevation="0"
                  >
                    <p> {{ $t('footer.FAQ.Antwort_1_7_1') }} </p>
                    <p> {{ $t('footer.FAQ.Antwort_1_7_2') }} </p>
                    <p> {{ $t('footer.FAQ.Antwort_1_7_3') }} </p>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>

            <h2 class="display-1 font-weight-bold">
              {{ $t('footer.FAQ.Titel_2') }}
            </h2>

            <v-expansion-panels
              focusable
              multiple
              class="px-4 pb-4 mt-2"
            >
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <b> {{ $t('footer.FAQ.Frage_2_1') }} </b> 
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-card
                    class="mt-4"
                    elevation="0"
                  >
                    <p> {{ $t('footer.FAQ.Antwort_2_1') }} </p>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header>
                  <b> {{ $t('footer.FAQ.Frage_2_2') }} </b> 
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-card
                    class="mt-4"
                    elevation="0"
                  >
                    <p> {{ $t('footer.FAQ.Antwort_2_2') }} </p>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header>
                  <b> {{ $t('footer.FAQ.Frage_2_3') }} </b> 
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-card
                    class="mt-4"
                    elevation="0"
                  >
                    <p> {{ $t('footer.FAQ.Antwort_2_3_1') }} </p>
                    <p> {{ $t('footer.FAQ.Antwort_2_3_2') }} </p>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header>
                  <b> {{ $t('footer.FAQ.Frage_2_4') }} </b> 
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-card
                    class="mt-4"
                    elevation="0"
                  >
                    <p> {{ $t('footer.FAQ.Antwort_2_4') }} </p>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header>
                  <b> {{ $t('footer.FAQ.Frage_2_5') }} </b> 
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-card
                    class="mt-4"
                    elevation="0"
                  >
                    <p> {{ $t('footer.FAQ.Antwort_2_5') }} </p>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header>
                  <b> {{ $t('footer.FAQ.Frage_2_6') }} </b> 
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-card
                    class="mt-4"
                    elevation="0"
                  >
                    <p> {{ $t('footer.FAQ.Antwort_2_6_1') }} </p>
                    <p> {{ $t('footer.FAQ.Antwort_2_6_2') }} </p>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header>
                  <b> {{ $t('footer.FAQ.Frage_2_7') }} </b> 
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-card
                    class="mt-4"
                    elevation="0"
                  >
                    <p> {{ $t('footer.FAQ.Antwort_2_7') }} </p>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header>
                  <b> {{ $t('footer.FAQ.Frage_2_8') }} </b> 
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-card
                    class="mt-4"
                    elevation="0"
                  >
                    <p> {{ $t('footer.FAQ.Antwort_2_8_1') }} </p>
                    <p> Formeln </p>
                    <p> {{ $t('footer.FAQ.Antwort_2_8_2') }} </p>
                    <p> Formeln </p>
                    <p> {{ $t('footer.FAQ.Antwort_2_8_3') }} </p>
                    <p> Formeln </p>
                    <p> {{ $t('footer.FAQ.Antwort_2_8_4') }} </p>
                    <p> Formeln </p>
                    <p> {{ $t('footer.FAQ.Antwort_2_8_5') }} </p>
                    <p> Formeln </p>
                    <p> {{ $t('footer.FAQ.Antwort_2_8_6') }} </p>
                    <p> Formeln </p>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header>
                  <b> {{ $t('footer.FAQ.Frage_2_9') }} </b> 
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-card
                    class="mt-4"
                    elevation="0"
                  >
                    <p> {{ $t('footer.FAQ.Antwort_2_9') }} </p>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header>
                  <b> {{ $t('footer.FAQ.Frage_2_10') }} </b> 
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-card
                    class="mt-4"
                    elevation="0"
                  >
                    <p> {{ $t('footer.FAQ.Antwort_2_10') }} </p>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header>
                  <b> {{ $t('footer.FAQ.Frage_2_11') }} </b> 
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-card
                    class="mt-4"
                    elevation="0"
                  >
                    <p> {{ $t('footer.FAQ.Antwort_2_11_1') }} </p>
                    <p> {{ $t('footer.FAQ.Antwort_2_11_2') }} </p>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header>
                  <b> {{ $t('footer.FAQ.Frage_2_12') }} </b> 
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-card
                    class="mt-4"
                    elevation="0"
                  >
                    <p> {{ $t('footer.FAQ.Antwort_2_12_1') }} </p>
                    <p> {{ $t('footer.FAQ.Antwort_2_12_2') }} </p>
                    <p> {{ $t('footer.FAQ.Antwort_2_12_3') }} </p>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header>
                  <b> {{ $t('footer.FAQ.Frage_2_13') }} </b> 
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-card
                    class="mt-4"
                    elevation="0"
                  >
                    <p> {{ $t('footer.FAQ.Antwort_2_13') }} </p>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>

            <h2 class="display-1 font-weight-bold">
              {{ $t('footer.FAQ.Titel_3') }}
            </h2>

            <v-expansion-panels
              focusable
              multiple
              class="px-4 pb-4 mt-2"
            >
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <b> {{ $t('footer.FAQ.Frage_3_1') }} </b> 
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-card
                    class="mt-4"
                    elevation="0"
                  >
                    <p> {{ $t('footer.FAQ.Antwort_3_1_1') }} </p>
                    <p> {{ $t('footer.FAQ.Antwort_3_1_2') }} </p>
                    <p> {{ $t('footer.FAQ.Antwort_3_1_3') }} </p>
                    <p> {{ $t('footer.FAQ.Antwort_3_1_4') }} </p>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header>
                  <b> {{ $t('footer.FAQ.Frage_3_2') }} </b> 
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-card
                    class="mt-4"
                    elevation="0"
                  >
                    <p> {{ $t('footer.FAQ.Antwort_3_2_1') }} </p>
                    <p> {{ $t('footer.FAQ.Antwort_3_2_2') }} </p>
                    <p> {{ $t('footer.FAQ.Antwort_3_2_3') }} </p>
                    <p> {{ $t('footer.FAQ.Antwort_3_2_4') }} </p>
                    <p> {{ $t('footer.FAQ.Antwort_3_2_5') }} </p>
                    <p> {{ $t('footer.FAQ.Antwort_3_2_6') }} </p>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header>
                  <b> {{ $t('footer.FAQ.Frage_3_3') }} </b> 
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-card
                    class="mt-4"
                    elevation="0"
                  >
                    <p> {{ $t('footer.FAQ.Antwort_3_3_1') }} </p>
                    <p> {{ $t('footer.FAQ.Antwort_3_3_2') }} </p>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>

            <h2 class="display-1 font-weight-bold">
              {{ $t('footer.FAQ.Titel_4') }}
            </h2>

            <v-expansion-panels
              focusable
              multiple
              class="px-4 pb-4 mt-2"
            >
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <b> {{ $t('footer.FAQ.Frage_4_1') }} </b> 
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-card
                    class="mt-4"
                    elevation="0"
                  >
                    <p> {{ $t('footer.FAQ.Antwort_4_1') }} </p>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header>
                  <b> {{ $t('footer.FAQ.Frage_4_2') }} </b> 
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-card
                    class="mt-4"
                    elevation="0"
                  >
                    <p> {{ $t('footer.FAQ.Antwort_4_2') }} </p>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header>
                  <b> {{ $t('footer.FAQ.Frage_4_3') }} </b> 
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-card
                    class="mt-4"
                    elevation="0"
                  >
                    <p> {{ $t('footer.FAQ.Antwort_4_3_1') }} </p>
                    <p> {{ $t('footer.FAQ.Antwort_4_3_2') }} </p>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
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

export default {
    name: "FAQ",
    components: {
        Header,
        Footer
    },
    data: () => ({
        tabList: [{ id: 0, title: 'FAQ', componentType: loadingAnimation}],
    }),
}

</script>