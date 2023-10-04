<!-- eslint-disable vue/no-v-html -->

<template>
  <v-app>
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
          >
            <v-card
              class="px-0 pb-2"
              elevation="0"
            >
              <v-card-title
                class="mx-4"
                v-html="$t('footer.FAQ.Titel_1')"
              />

              <v-expansion-panels
                v-model="panel_1"
                focusable
                multiple
                class="px-4 pb-4 mt-2"
              >
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    <b v-html="$t('footer.FAQ.Frage_1_1')" /> 
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-card
                      class="mt-4"
                      elevation="0"
                    >
                      <p v-html="$t('footer.FAQ.Antwort_1_1')" />
                    </v-card>
                  </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-header>
                    <b v-html="$t('footer.FAQ.Frage_1_2')" /> 
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-card
                      class="mt-4"
                      elevation="0"
                    >
                      <p v-html="$t('footer.FAQ.Antwort_1_2_1')" />
                      <p v-html="$t('footer.FAQ.Antwort_1_2_2')" />
                      <p v-html="$t('footer.FAQ.Antwort_1_2_3')" />
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
                      <p v-html="$t('footer.FAQ.Antwort_1_3_2')" />
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
                      <p>
                        {{ $t('footer.FAQ.Antwort_1_4_2') }}
                        <ul>
                          <li v-html="$t('footer.FAQ.Antwort_1_4_2_1')" />
                          <li v-html="$t('footer.FAQ.Antwort_1_4_2_2')" />
                          <li v-html="$t('footer.FAQ.Antwort_1_4_2_3')" />
                        </ul>
                      </p>
                      <p> {{ $t('footer.FAQ.Antwort_1_4_3') }} </p>
                      <p v-html="$t('footer.FAQ.Antwort_1_4_4')" />
                      <p v-html="$t('footer.FAQ.Antwort_1_4_5')" />
                      <p>
                        <label v-html="$t('footer.FAQ.Antwort_1_4_6')" />  <br>
                        {{ $t('footer.FAQ.Antwort_1_4_7') }}
                      </p>
                      <u> {{ $t('footer.FAQ.Antwort_1_4_8') }} </u>
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
                      <p v-html="$t('footer.FAQ.Antwort_1_5_1')" />
                      <p> {{ $t('footer.FAQ.Antwort_1_5_2') }} </p>
                    </v-card>
                  </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-header>
                    <b v-html="$t('footer.FAQ.Frage_1_6')" />
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-card
                      class="mt-4"
                      elevation="0"
                    >
                      <p v-html="$t('footer.FAQ.Antwort_1_6_1')" />
                      <p v-html="$t('footer.FAQ.Antwort_1_6_2')" />
                      <v-simple-table>
                        <template v-slot:default>
                          <thead>
                            <tr>
                              <th> {{ $t('footer.FAQ.Antwort_1_6_Tabelle_1') }} </th>
                              <th> {{ $t('footer.FAQ.Antwort_1_6_Tabelle_2') }} </th>
                              <th v-html="$t('footer.FAQ.Antwort_1_6_Tabelle_3')" />
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td v-html="$t('footer.FAQ.Antwort_1_6_Tabelle_4')" />
                              <td> 5 - 200 </td>
                              <td> 1 </td>
                            </tr>
                            <tr>
                              <td v-html="$t('footer.FAQ.Antwort_1_6_Tabelle_5')" />
                              <td> 12 </td>
                              <td> 25 </td>
                            </tr>
                            <tr>
                              <td v-html="$t('footer.FAQ.Antwort_1_6_Tabelle_6')" />
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
                              <td v-html="$t('footer.FAQ.Antwort_1_6_Tabelle_9')" />
                              <td> {{ $n(3200, 'integer') }}</td>
                              <td> {{ $n(22800, 'integer') }}</td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </v-card>
                  </v-expansion-panel-content>
                </v-expansion-panel>

                <!-- <v-expansion-panel>
                  <v-expansion-panel-header>
                    <b v-html="$t('footer.FAQ.Frage_1_7')" />
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-card
                      class="mt-4"
                      elevation="0"
                    >
                      <p v-html="$t('footer.FAQ.Antwort_1_7_1')" />
                      <p v-html="$t('footer.FAQ.Antwort_1_7_2')" />
                      <p> {{ $t('footer.FAQ.Antwort_1_7_3') }} </p>
                    </v-card>
                  </v-expansion-panel-content>
                </v-expansion-panel> -->
              </v-expansion-panels>
            </v-card>


            <v-card
              class="px-0 pb-2"
              elevation="0"
            >
              <v-card-title
                class="mx-4"
              >
                {{ $t('footer.FAQ.Titel_2') }}
              </v-card-title>

              <v-expansion-panels
                v-model="panel_2"
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
                      <p v-html="$t('footer.FAQ.Antwort_2_1')" />
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
                      <p v-html="$t('footer.FAQ.Antwort_2_6_2')" />
                    </v-card>
                  </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-header>
                    <b v-html="$t('footer.FAQ.Frage_2_7')" />
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-card
                      class="mt-4"
                      elevation="0"
                    >
                      <p v-html="$t('footer.FAQ.Antwort_2_7')" />
                      <v-simple-table>
                        <template v-slot:default>
                          <thead>
                            <tr>
                              <th> {{ $t('footer.FAQ.Antwort_2_7_Tabelle_1') }} </th>
                              <th> {{ $t('footer.FAQ.Antwort_2_7_Tabelle_2') }} </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td> {{ $t('footer.FAQ.Antwort_2_7_Tabelle_3') }} </td>
                              <td> {{ $t('footer.FAQ.Antwort_2_7_Tabelle_4') }} / {{ $t('footer.FAQ.Antwort_2_7_Tabelle_5') }} </td>
                            </tr>
                            <tr>
                              <td> {{ $t('footer.FAQ.Antwort_2_7_Tabelle_6') }} </td>
                              <td> {{ $t('footer.FAQ.Antwort_2_7_Tabelle_4') }} </td>
                            </tr>
                            <tr>
                              <td> {{ $t('footer.FAQ.Antwort_2_7_Tabelle_7') }} </td>
                              <td> {{ $t('footer.FAQ.Antwort_2_7_Tabelle_8') }} </td>
                            </tr>
                            <tr>
                              <td> {{ $t('footer.FAQ.Antwort_2_7_Tabelle_9') }} </td>
                              <td> {{ $t('footer.FAQ.Antwort_2_7_Tabelle_10') }} </td>
                            </tr>
                            <tr>
                              <td> {{ $t('footer.FAQ.Antwort_2_7_Tabelle_11') }} </td>
                              <td> {{ $t('footer.FAQ.Antwort_2_7_Tabelle_10') }} </td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
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
                      <p v-html="$t('footer.FAQ.Antwort_2_8_1')" />
                      <p v-html="$t('footer.FAQ.Antwort_2_8_2')" />
                      <div
                        :key="formel_1"
                        v-katex:auto
                        class="text-center pb-4"
                      >
                        {{ formel_1 }}
                      </div>
                      <p v-html="$t('footer.FAQ.Antwort_2_8_3')" />
                      <div
                        :key="formel_2"
                        v-katex:auto
                        class="text-center pb-4"
                      >
                        {{ formel_2 }}
                      </div>

                      <p v-html="$t('footer.FAQ.Antwort_2_8_4')" />
                      {{ $t('footer.FAQ.Antwort_2_8_5') }}
                      <div
                        :key="formel_3"
                        v-katex:auto
                        class="text-center pb-4"
                      >
                        {{ formel_3 }}
                      </div>

                      <p v-html="$t('footer.FAQ.Antwort_2_8_6')" />
                      <div
                        :key="formel_4"
                        v-katex:auto
                        class="text-center pb-4"
                      >
                        {{ formel_4 }}
                      </div>
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
                      <p> {{ $t('footer.FAQ.Antwort_2_10_1') }} </p>
                      <p> {{ $t('footer.FAQ.Antwort_2_10_2') }} </p>
                      <p v-html="$t('footer.FAQ.Antwort_2_10_3')" />
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
              </v-expansion-panels>
            </v-card>

            <v-card
              ref="#nutzung"
              class="px-0 pb-2"
              elevation="0"
            >
              <v-card-title
                class="mx-4"
              >
                {{ $t('footer.FAQ.Titel_3') }}
              </v-card-title>


              <v-expansion-panels
                v-model="panel_3"
                focusable
                multiple
                class="px-4 pb-4 mt-2"
              >
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    <b v-html="$t('footer.FAQ.Frage_3_2')" />
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
                    <b v-html="$t('footer.FAQ.Frage_3_3')" /> 
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-card
                      class="mt-4"
                      elevation="0"
                    >
                      <p v-html="$t('footer.FAQ.Antwort_3_3_1')" />
                      <p>
                        <label v-html="$t('footer.FAQ.Antwort_3_3_2')" />
                        <a href="mailto:co2-rechner@zv.tu-darmstadt.de">co2-rechner@zv.tu-darmstadt.de</a>.
                      </p>
                    </v-card>
                  </v-expansion-panel-content>
                </v-expansion-panel>

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
                    <b> {{ $t('footer.FAQ.Frage_2_11') }} </b> 
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-card
                      class="mt-4"
                      elevation="0"
                    >
                      <p v-html="$t('footer.FAQ.Antwort_2_11_1')" />
                      <p v-html="$t('footer.FAQ.Antwort_2_11_2')" />
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
                    </v-card>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card>

            <v-card
              class="px-0 pb-2"
              elevation="0"
            >
              <v-card-title
                class="mx-4"
              >
                {{ $t('footer.FAQ.Titel_4') }}
              </v-card-title>

              <v-expansion-panels
                v-model="panel_4"
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
                    <b v-html="$t('footer.FAQ.Frage_4_3')" />
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-card
                      class="mt-4"
                      elevation="0"
                    >
                      <p v-html="$t('footer.FAQ.Antwort_4_3_1')" />
                      <p v-html="$t('footer.FAQ.Antwort_4_3_2')" />
                    </v-card>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card>
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
      panel_1: [],
      panel_2: [],
      panel_3: [],
      panel_4: [],
    }),

    computed: {
      formel_1() {
        return "\\(\\begin{aligned} " + 
                "\\text{" + this.$t('footer.FAQ.Antwort_2_8_Formel_1_1')  + "} &= \\sum_{\\text{" + this.$t('footer.FAQ.Antwort_2_8_Formel_1_7')  + "}} \\sum_{\\text{" + this.$t('footer.FAQ.Antwort_2_8_Formel_1_2')  + "}} \\left( \\text{" + this.$t('footer.FAQ.Antwort_2_8_Formel_1_3')  + "} \\cdot \\text{" + this.$t('footer.FAQ.Antwort_2_8_Formel_1_4')  + "} \\cdot \\frac{\\text{" + this.$t('footer.FAQ.Antwort_2_8_Formel_1_5')  + "}}{\\text{" + this.$t('footer.FAQ.Antwort_2_8_Formel_1_6')  + "}} \\right)" + 
                " \\end{aligned} \\)"
      },
      formel_2() {
        return  "\\(\\begin{aligned} " + 
                "\\text{" + this.$t('footer.FAQ.Antwort_2_8_Formel_2_1')  + "} &= \\sum_{\\text{" + this.$t('footer.FAQ.Antwort_2_8_Formel_2_2')  + "}} \\text{" + this.$t('footer.FAQ.Antwort_2_8_Formel_2_3')  + "} \\\\ " + 
                " &= \\sum_{\\text{" + this.$t('footer.FAQ.Antwort_2_8_Formel_2_2')  + "}} \\left( \\text{" + this.$t('footer.FAQ.Antwort_2_8_Formel_2_4')  + "} \\cdot \\text{" + this.$t('footer.FAQ.Antwort_2_8_Formel_2_5')  + "} \\right) \\\\" + 
                " &= \\sum_{\\text{" + this.$t('footer.FAQ.Antwort_2_8_Formel_2_2')  + "}} \\left( \\frac{\\text{" + this.$t('footer.FAQ.Antwort_2_8_Formel_2_6')  + "}}{\\text{" + this.$t('footer.FAQ.Antwort_2_8_Formel_2_7')  + "}} \\cdot \\text{" + this.$t('footer.FAQ.Antwort_2_8_Formel_2_5')  + "} \\right) " +  
                " \\end{aligned} \\)"
      },
      formel_3() {
        return  "\\(\\begin{aligned} " + 
                "\\text{" + this.$t('footer.FAQ.Antwort_2_8_Formel_3_1')  + "} &= \\sum_{\\text{" + this.$t('footer.FAQ.Antwort_2_8_Formel_3_2')  + "}} \\left( \\frac{\\text{" + this.$t('footer.FAQ.Antwort_2_8_Formel_3_3')  + "} \\cdot \\text{" + this.$t('footer.FAQ.Antwort_2_8_Formel_3_4')  + "}}{\\text{" + this.$t('footer.FAQ.Antwort_2_8_Formel_3_5')  + "}} \\right) \\\\" +
                "\\text{" + this.$t('footer.FAQ.Antwort_2_8_Formel_3_3')  + "} &= 2 \\cdot \\text{" + this.$t('footer.FAQ.Antwort_2_8_Formel_3_6')  + "} \\cdot \\text{" + this.$t('footer.FAQ.Antwort_2_8_Formel_3_7')  + "} \\\\" +
                " &= 2 \\cdot \\text{" + this.$t('footer.FAQ.Antwort_2_8_Formel_3_6')  + "} \\cdot \\frac{\\text{" + this.$t('footer.FAQ.Antwort_2_8_Formel_3_8')  + "}}{5} \\cdot \\text{" + this.$t('footer.FAQ.Antwort_2_8_Formel_3_9')  + "} \\\\" +
                "\\end{aligned} \\)"
      },
      formel_4() {
        return  "\\(\\begin{aligned} " + 
                "\\text{" + this.$t('footer.FAQ.Antwort_2_8_Formel_4_1')  + "} &= \\sum_{\\text{" + this.$t('footer.FAQ.Antwort_2_8_Formel_4_2')  + "}} \\left( \\text{" + this.$t('footer.FAQ.Antwort_2_8_Formel_4_3')  + "} \\cdot \\text{" + this.$t('footer.FAQ.Antwort_2_8_Formel_4_4')  + "} \\right) \\\\" +
                "&= \\sum_{\\text{" + this.$t('footer.FAQ.Antwort_2_8_Formel_4_2')  + "}} \\left( 2 \\cdot \\text{" + this.$t('footer.FAQ.Antwort_2_8_Formel_4_5')  + "} \\cdot \\text{" + this.$t('footer.FAQ.Antwort_2_8_Formel_4_4')  + "} \\right)" +
                "\\end{aligned} \\)"
      },
    },

    created() {
      if(this.$route.hash == "#nutzung"){
        this.panel_3 = [0]
      }
    },

    mounted() {
      if(this.$route.hash){
        // if(this.$route.hash == "#nutzung"){
        //   this.panel_3 = [0]
        // }

        let top = this.$refs[this.$route.hash].$refs.link.offsetTop
        console.log(top)

        window.scrollTo({
          top: top, 
          left: 0
        })
      }
    },
}

</script>

<style lang="scss">
  span {
    .mord.accent {
      background-color: inherit !important;
      border-color: inherit !important;
    }
  }
</style>