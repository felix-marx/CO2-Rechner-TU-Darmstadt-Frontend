<!-- eslint-disable vue/no-v-html -->
<template>
  <v-app :style="{background: $vuetify.theme.themes[theme].colors.background}">
    <Header
      :tabs="tabList"
      :display-user-setting="false"
      :display-back-button="true"
      :display-login-button="false"
    />
    <v-main 
      :class="$vuetify.display.mobile ? 'mb-0 pb-0' : 'mb-0'" 
      @vue:mounted="vuetifyMounted"
    >
      <v-container>
        <v-card
          elevation="0"
          class="mx-auto"
          :max-width="constants.v_card_max_width"
        >
          <v-card
            elevation="2"
            border
          >
            <v-card
              ref="#bilanzierung"
              class="px-0 pb-2"
              elevation="0" 
            >
              <v-card-title
                class="mx-4 mt-3"
              >
                <label
                  class="headerClass"
                  v-html="title1"
                />
              </v-card-title>

              <v-expansion-panels
                v-model="panel_1"
                multiple
                class="px-4 pb-4 mt-2"
              >
                <v-expansion-panel focusable>
                  <v-expansion-panel-title>
                    <b v-html="$t('footer.FAQ.Frage_1_1')" /> 
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <v-card
                      class="mt-4"
                      elevation="0"
                    >
                      <p v-html="$t('footer.FAQ.Antwort_1_1')" />
                    </v-card>
                  </v-expansion-panel-text>
                </v-expansion-panel>

                <v-expansion-panel focusable>
                  <v-expansion-panel-title>
                    <b v-html="$t('footer.FAQ.Frage_1_2')" /> 
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <v-card
                      class="mt-4"
                      elevation="0"
                    >
                      <p v-html="$t('footer.FAQ.Antwort_1_2_1')" />
                      <p v-html="$t('footer.FAQ.Antwort_1_2_2')" />
                      <p v-html="$t('footer.FAQ.Antwort_1_2_3')" />
                    </v-card>
                  </v-expansion-panel-text>
                </v-expansion-panel>

                <v-expansion-panel focusable>
                  <v-expansion-panel-title>
                    <b> {{ $t('footer.FAQ.Frage_1_3') }} </b> 
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <v-card
                      class="mt-4"
                      elevation="0"
                    >
                      <p> {{ $t('footer.FAQ.Antwort_1_3_1') }} </p>
                      <p v-html="$t('footer.FAQ.Antwort_1_3_2')" />
                    </v-card>
                  </v-expansion-panel-text>
                </v-expansion-panel>

                <v-expansion-panel focusable>
                  <v-expansion-panel-title>
                    <b> {{ $t('footer.FAQ.Frage_1_4') }} </b> 
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
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
                      <v-table>
                        <template #default>
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
                      </v-table>
                    </v-card>
                  </v-expansion-panel-text>
                </v-expansion-panel>

                <v-expansion-panel focusable>
                  <v-expansion-panel-title>
                    <b> {{ $t('footer.FAQ.Frage_1_5') }} </b> 
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <v-card
                      class="mt-4"
                      elevation="0"
                    >
                      <p v-html="$t('footer.FAQ.Antwort_1_5_1')" />
                      <p> {{ $t('footer.FAQ.Antwort_1_5_2') }} </p>
                    </v-card>
                  </v-expansion-panel-text>
                </v-expansion-panel>

                <v-expansion-panel focusable>
                  <v-expansion-panel-title>
                    <b v-html="$t('footer.FAQ.Frage_1_6')" />
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <v-card
                      class="mt-4"
                      elevation="0"
                    >
                      <p v-html="$t('footer.FAQ.Antwort_1_6_1')" />
                      <p v-html="$t('footer.FAQ.Antwort_1_6_2')" />
                      <v-table>
                        <template #default>
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
                      </v-table>
                    </v-card>
                  </v-expansion-panel-text>
                </v-expansion-panel>

                <v-expansion-panel focusable>
                  <v-expansion-panel-title>
                    <b v-html="$t('footer.FAQ.Frage_1_7')" />
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <v-card
                      class="mt-4"
                      elevation="0"
                    >
                      <p v-html="$t('footer.FAQ.Antwort_1_7_1')" />
                      <p v-html="$t('footer.FAQ.Antwort_1_7_2')" />
                    </v-card>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card>


            <v-card
              ref="#allgemein"
              class="px-0 pb-2"
              elevation="0"
            >
              <v-card-title
                class="mx-4"
              >
                <label
                  class="headerClass"
                  v-html="$t('footer.FAQ.Titel_2')"
                />
              </v-card-title>

              <v-expansion-panels
                v-model="panel_2"
                multiple
                class="px-4 pb-4 mt-2"
              >
                <v-expansion-panel focusable>
                  <v-expansion-panel-title>
                    <b v-html="$t('footer.FAQ.Frage_2_1')" />
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <v-card
                      class="mt-4"
                      elevation="0"
                    >
                      <p v-html="$t('footer.FAQ.Antwort_2_1')" />
                    </v-card>
                  </v-expansion-panel-text>
                </v-expansion-panel>

                <v-expansion-panel focusable>
                  <v-expansion-panel-title>
                    <b v-html="$t('footer.FAQ.Frage_2_2')" />
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <v-card
                      class="mt-4"
                      elevation="0"
                    >
                      <p v-html="$t('footer.FAQ.Antwort_2_2')" />
                    </v-card>
                  </v-expansion-panel-text>
                </v-expansion-panel>

                <v-expansion-panel focusable>
                  <v-expansion-panel-title>
                    <b v-html="$t('footer.FAQ.Frage_2_3')" />
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <v-card
                      class="mt-4"
                      elevation="0"
                    >
                      <p v-html="$t('footer.FAQ.Antwort_2_3_1')" />
                      <p v-html="$t('footer.FAQ.Antwort_2_3_2')" />
                    </v-card>
                  </v-expansion-panel-text>
                </v-expansion-panel>

                <v-expansion-panel focusable>
                  <v-expansion-panel-title>
                    <b v-html="$t('footer.FAQ.Frage_2_4')" />
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <v-card
                      class="mt-4"
                      elevation="0"
                    >
                      <p v-html="$t('footer.FAQ.Antwort_2_4')" />
                      <v-table>
                        <template #default>
                          <thead>
                            <tr>
                              <th> {{ $t('footer.FAQ.Antwort_2_4_Tabelle_1') }} </th>
                              <th> {{ $t('footer.FAQ.Antwort_2_4_Tabelle_2') }} </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td> {{ $t('footer.FAQ.Antwort_2_4_Tabelle_3') }} </td>
                              <td> {{ $t('footer.FAQ.Antwort_2_4_Tabelle_4') }} / {{ $t('footer.FAQ.Antwort_2_4_Tabelle_5') }} </td>
                            </tr>
                            <tr>
                              <td> {{ $t('footer.FAQ.Antwort_2_4_Tabelle_6') }} </td>
                              <td> {{ $t('footer.FAQ.Antwort_2_4_Tabelle_4') }} </td>
                            </tr>
                            <tr>
                              <td> {{ $t('footer.FAQ.Antwort_2_4_Tabelle_7') }} </td>
                              <td> {{ $t('footer.FAQ.Antwort_2_4_Tabelle_8') }} </td>
                            </tr>
                            <tr>
                              <td> {{ $t('footer.FAQ.Antwort_2_4_Tabelle_9') }} </td>
                              <td> {{ $t('footer.FAQ.Antwort_2_4_Tabelle_10') }} </td>
                            </tr>
                            <tr>
                              <td> {{ $t('footer.FAQ.Antwort_2_4_Tabelle_11') }} </td>
                              <td> {{ $t('footer.FAQ.Antwort_2_4_Tabelle_10') }} </td>
                            </tr>
                          </tbody>
                        </template>
                      </v-table>
                    </v-card>
                  </v-expansion-panel-text>
                </v-expansion-panel>

                <v-expansion-panel focusable>
                  <v-expansion-panel-title>
                    <b> {{ $t('footer.FAQ.Frage_2_5') }} </b> 
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <v-card
                      class="mt-4"
                      elevation="0"
                    >
                      <p v-html="$t('footer.FAQ.Antwort_2_5_1')" />
                      <p v-html="$t('footer.FAQ.Antwort_2_5_2')" />
                      <div
                        :key="formel_1"
                        v-katex:auto
                        class="text-center pb-4 overflow-auto"
                      >
                        {{ formel_1 }}
                      </div>
                      <p v-html="$t('footer.FAQ.Antwort_2_5_3')" />
                      <div
                        :key="formel_2"
                        v-katex:auto
                        class="text-center pb-4 overflow-auto"
                      >
                        {{ formel_2 }}
                      </div>

                      <p v-html="$t('footer.FAQ.Antwort_2_5_4')" />
                      {{ $t('footer.FAQ.Antwort_2_5_5') }}
                      <div
                        :key="formel_3"
                        v-katex:auto
                        class="text-center pb-4 overflow-auto"
                      >
                        {{ formel_3 }}
                      </div>

                      <p v-html="$t('footer.FAQ.Antwort_2_5_6')" />
                      <div
                        :key="formel_4"
                        v-katex:auto
                        class="text-center pb-4 overflow-auto"
                      >
                        {{ formel_4 }}
                      </div>
                    </v-card>
                  </v-expansion-panel-text>
                </v-expansion-panel>

                <v-expansion-panel focusable>
                  <v-expansion-panel-title>
                    <b> {{ $t('footer.FAQ.Frage_2_6') }} </b> 
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <v-card
                      class="mt-4"
                      elevation="0"
                    >
                      <p> {{ $t('footer.FAQ.Antwort_2_6_1') }} </p>
                      <p> {{ $t('footer.FAQ.Antwort_2_6_2') }} </p>
                      <p v-html="$t('footer.FAQ.Antwort_2_6_3')" />
                    </v-card>
                  </v-expansion-panel-text>
                </v-expansion-panel>

                <v-expansion-panel focusable>
                  <v-expansion-panel-title>
                    <b> {{ $t('footer.FAQ.Frage_2_7') }} </b> 
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <v-card
                      class="mt-4"
                      elevation="0"
                    >
                      <p> {{ $t('footer.FAQ.Antwort_2_7') }} </p>
                    </v-card>
                  </v-expansion-panel-text>
                </v-expansion-panel>

                <v-expansion-panel focusable>
                  <v-expansion-panel-title>
                    <b> {{ $t('footer.FAQ.Frage_2_8') }} </b> 
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <v-card
                      class="mt-4"
                      elevation="0"
                    >
                      <p v-html="$t('footer.FAQ.Antwort_2_8_1')" />
                      <p> {{ $t('footer.FAQ.Antwort_2_8_2') }} </p>
                    </v-card>
                  </v-expansion-panel-text>
                </v-expansion-panel>

                <v-expansion-panel focusable>
                  <v-expansion-panel-title>
                    <b> {{ $t('footer.FAQ.Frage_2_9') }} </b> 
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <v-card
                      class="mt-4"
                      elevation="0"
                    >
                      <v-table>
                        <template #default>
                          <tbody>
                            <tr>
                              <th> 2020 </th>
                              <td v-html="$t('footer.FAQ.Antwort_2_9_Tabelle_1')" />
                            </tr>
                            <tr>
                              <th> 2021 </th>
                              <td v-html="$t('footer.FAQ.Antwort_2_9_Tabelle_2')" />
                            </tr>
                            <tr>
                              <th> 2022 </th>
                              <td v-html="$t('footer.FAQ.Antwort_2_9_Tabelle_3')" />
                            </tr>
                            <tr>
                              <th> 2023 </th>
                              <td v-html="$t('footer.FAQ.Antwort_2_9_Tabelle_4')" />
                            </tr>
                            <tr>
                              <th> 2023/24 </th>
                              <td> 
                                <label v-html="$t('footer.FAQ.Antwort_2_9_Tabelle_5')" /> <br>
                                <label v-html="$t('footer.FAQ.Antwort_2_9_Tabelle_6')" /> <br>
                                <label v-html="$t('footer.FAQ.Antwort_2_9_Tabelle_7')" />
                              </td>
                            </tr>
                          </tbody>
                        </template>
                      </v-table>
                    </v-card>
                  </v-expansion-panel-text>
                </v-expansion-panel>

                <v-expansion-panel focusable>
                  <v-expansion-panel-title>
                    <b v-html="$t('footer.FAQ.Frage_2_10')" />
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <v-card
                      class="mt-4"
                      elevation="0"
                    >
                      <p v-html="$t('footer.FAQ.Antwort_2_10_1')" />
                      <p>
                        {{ $t('footer.FAQ.Antwort_2_10_2') }}
                        <a
                          href="https://github.com/felix-marx/CO2-Rechner-TU-Darmstadt-Frontend"
                          target="_blank"
                        >{{ $t('common.GithubRepo') }}</a>
                      </p>
                      <p>
                        {{ $t('footer.FAQ.Antwort_2_10_3') }} 
                        <a
                          href="https://github.com/Anhilly/co2-rechner-TU-Darmstadt-backend"
                          target="_blank"
                        >{{ $t('common.GithubRepo') }}</a>
                      </p>
                    </v-card>
                  </v-expansion-panel-text>
                </v-expansion-panel>  
              </v-expansion-panels>
            </v-card>

            <v-card
              ref="#warum"
              class="px-0 pb-2"
              elevation="0"
            >
              <v-card-title
                class="mx-4"
              >
                <label
                  class="headerClass"
                  v-html="$t('footer.FAQ.Titel_3')"
                />
              </v-card-title>

              <v-expansion-panels
                v-model="panel_3"
                multiple
                class="px-4 pb-4 mt-2"
              >
                <v-expansion-panel focusable>
                  <v-expansion-panel-title>
                    <b v-html="$t('footer.FAQ.Frage_3_1')" />
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <v-card
                      class="mt-4"
                      elevation="0"
                    >
                      <b> {{ $t('footer.FAQ.Antwort_3_1_1') }} </b>
                      <p> 
                        <label v-html="$t('footer.FAQ.Antwort_3_1_1_1')" />
                      </p>
                      <b> {{ $t('footer.FAQ.Antwort_3_1_2') }} </b>
                      <p> 
                        <label v-html="$t('footer.FAQ.Antwort_3_1_2_1')" /> <br>
                        <label v-html="$t('footer.FAQ.Antwort_3_1_2_2')" />
                      </p>
                      <b> {{ $t('footer.FAQ.Antwort_3_1_3') }} </b>
                      <p> 
                        {{ $t('footer.FAQ.Antwort_3_1_3_1') }} <br>
                        <label v-html="$t('footer.FAQ.Antwort_3_1_3_2')" />
                      </p>
                      <b> {{ $t('footer.FAQ.Antwort_3_1_4') }} </b>
                      <p> 
                        <label v-html="$t('footer.FAQ.Antwort_3_1_4_1')" /> <br>
                        <label v-html="$t('footer.FAQ.Antwort_3_1_4_2')" /> 
                      </p>
                      <b> {{ $t('footer.FAQ.Antwort_3_1_5') }} </b>
                      <p> {{ $t('footer.FAQ.Antwort_3_1_5_1') }} </p>
                    </v-card>
                  </v-expansion-panel-text>
                </v-expansion-panel>

                <v-expansion-panel focusable>
                  <v-expansion-panel-title>
                    <b v-html="$t('footer.FAQ.Frage_3_2')" /> 
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <v-card
                      class="mt-4"
                      elevation="0"
                    >
                      <p v-html="$t('footer.FAQ.Antwort_3_2_1')" />
                      <p>
                        <label v-html="$t('footer.FAQ.Antwort_3_2_2')" />
                        <a href="mailto:co2-rechner@zv.tu-darmstadt.de">co2-rechner@zv.tu-darmstadt.de</a>.
                      </p>
                    </v-card>
                  </v-expansion-panel-text>
                </v-expansion-panel>

                <v-expansion-panel focusable>
                  <v-expansion-panel-title>
                    <b> {{ $t('footer.FAQ.Frage_3_3') }} </b> 
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <v-card
                      class="mt-4"
                      elevation="0"
                    >
                      <p> {{ $t('footer.FAQ.Antwort_3_3_1') }} </p>
                      <p> {{ $t('footer.FAQ.Antwort_3_3_2') }} </p>
                      <p> {{ $t('footer.FAQ.Antwort_3_3_3') }} </p>
                      <p v-html="$t('footer.FAQ.Antwort_3_3_4')" />
                    </v-card>
                  </v-expansion-panel-text>
                </v-expansion-panel>

                <v-expansion-panel focusable>
                  <v-expansion-panel-title>
                    <b> {{ $t('footer.FAQ.Frage_3_4') }} </b> 
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <v-card
                      class="mt-4"
                      elevation="0"
                    >
                      <p> {{ $t('footer.FAQ.Antwort_3_4') }} </p>
                    </v-card>
                  </v-expansion-panel-text>
                </v-expansion-panel>

                <v-expansion-panel focusable>
                  <v-expansion-panel-title>
                    <b> {{ $t('footer.FAQ.Frage_3_5') }} </b> 
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <v-card
                      class="mt-4"
                      elevation="0"
                    >
                      <p v-html="$t('footer.FAQ.Antwort_3_5')" />
                    </v-card>
                  </v-expansion-panel-text>
                </v-expansion-panel>

                <v-expansion-panel focusable>
                  <v-expansion-panel-title>
                    <b> {{ $t('footer.FAQ.Frage_3_6') }} </b> 
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <v-card
                      class="mt-4"
                      elevation="0"
                    >
                      <p v-html="$t('footer.FAQ.Antwort_3_6_1')" />
                      <p v-html="$t('footer.FAQ.Antwort_3_6_2')" />
                    </v-card>
                  </v-expansion-panel-text>
                </v-expansion-panel>

                <v-expansion-panel focusable>
                  <v-expansion-panel-title>
                    <b v-html="$t('footer.FAQ.Frage_3_7')" />
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <v-card
                      class="mt-4"
                      elevation="0"
                    >
                      <p> {{ $t('footer.FAQ.Antwort_3_7_1') }} </p>
                      <p> {{ $t('footer.FAQ.Antwort_3_7_2') }} </p>
                    </v-card>
                  </v-expansion-panel-text>
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
import Header from '@/components/header/Header.vue'
import Footer from '@/components/footer/Footer.vue'
import constants from '@/const.js'

export default {
  name: "FAQ",
  components: {
    Header,
    Footer
  },

  data: () => ({
    constants: constants,
    tabList: [],
    panel_1: [],
    panel_2: [],
    panel_3: [],
  }),

  computed: {
    theme(){
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    },
    formel_1() {
      return "\\(\\begin{aligned} " + 
              "\\text{" + this.$t('footer.FAQ.Antwort_2_5_Formel_1_1')  + "} &= \\sum_{\\text{" + this.$t('footer.FAQ.Antwort_2_5_Formel_1_7')  + "}} \\sum_{\\text{" + this.$t('footer.FAQ.Antwort_2_5_Formel_1_2')  + "}} \\left( \\text{" + this.$t('footer.FAQ.Antwort_2_5_Formel_1_3')  + "} \\cdot \\text{" + this.$t('footer.FAQ.Antwort_2_5_Formel_1_4')  + "} \\cdot \\frac{\\text{" + this.$t('footer.FAQ.Antwort_2_5_Formel_1_5')  + "}}{\\text{" + this.$t('footer.FAQ.Antwort_2_5_Formel_1_6')  + "}} \\right)" + 
              " \\end{aligned} \\)"
    },
    formel_2() {
      return  "\\(\\begin{aligned} " + 
              "\\text{" + this.$t('footer.FAQ.Antwort_2_5_Formel_2_1')  + "} &= \\sum_{\\text{" + this.$t('footer.FAQ.Antwort_2_5_Formel_2_2')  + "}} \\text{" + this.$t('footer.FAQ.Antwort_2_5_Formel_2_3')  + "} \\\\ " + 
              " &= \\sum_{\\text{" + this.$t('footer.FAQ.Antwort_2_5_Formel_2_2')  + "}} \\left( \\text{" + this.$t('footer.FAQ.Antwort_2_5_Formel_2_4')  + "} \\cdot \\text{" + this.$t('footer.FAQ.Antwort_2_5_Formel_2_5')  + "} \\right) \\\\" + 
              " &= \\sum_{\\text{" + this.$t('footer.FAQ.Antwort_2_5_Formel_2_2')  + "}} \\left( \\frac{\\text{" + this.$t('footer.FAQ.Antwort_2_5_Formel_2_6')  + "}}{\\text{" + this.$t('footer.FAQ.Antwort_2_5_Formel_2_7')  + "}} \\cdot \\text{" + this.$t('footer.FAQ.Antwort_2_5_Formel_2_5')  + "} \\right) " +  
              " \\end{aligned} \\)"
    },
    formel_3() {
      return  "\\(\\begin{aligned} " + 
              "\\text{" + this.$t('footer.FAQ.Antwort_2_5_Formel_3_1')  + "} &= \\sum_{\\text{" + this.$t('footer.FAQ.Antwort_2_5_Formel_3_2')  + "}} \\left( \\frac{\\text{" + this.$t('footer.FAQ.Antwort_2_5_Formel_3_3')  + "} \\cdot \\text{" + this.$t('footer.FAQ.Antwort_2_5_Formel_3_4')  + "}}{\\text{" + this.$t('footer.FAQ.Antwort_2_5_Formel_3_5')  + "}} \\right) \\\\" +
              "\\text{" + this.$t('footer.FAQ.Antwort_2_5_Formel_3_3')  + "} &= 2 \\cdot \\text{" + this.$t('footer.FAQ.Antwort_2_5_Formel_3_6')  + "} \\cdot \\text{" + this.$t('footer.FAQ.Antwort_2_5_Formel_3_7')  + "} \\\\" +
              " &= 2 \\cdot \\text{" + this.$t('footer.FAQ.Antwort_2_5_Formel_3_6')  + "} \\cdot \\frac{\\text{" + this.$t('footer.FAQ.Antwort_2_5_Formel_3_8')  + "}}{5} \\cdot \\text{" + this.$t('footer.FAQ.Antwort_2_5_Formel_3_9')  + "} \\\\" +
              "\\end{aligned} \\)"
    },
    formel_4() {
      return  "\\(\\begin{aligned} " + 
              "\\text{" + this.$t('footer.FAQ.Antwort_2_5_Formel_4_1')  + "} &= \\sum_{\\text{" + this.$t('footer.FAQ.Antwort_2_5_Formel_4_2')  + "}} \\left( \\text{" + this.$t('footer.FAQ.Antwort_2_5_Formel_4_3')  + "} \\cdot \\text{" + this.$t('footer.FAQ.Antwort_2_5_Formel_4_4')  + "} \\right) \\\\" +
              "&= \\sum_{\\text{" + this.$t('footer.FAQ.Antwort_2_5_Formel_4_2')  + "}} \\left( 2 \\cdot \\text{" + this.$t('footer.FAQ.Antwort_2_5_Formel_4_5')  + "} \\cdot \\text{" + this.$t('footer.FAQ.Antwort_2_5_Formel_4_4')  + "} \\right)" +
              "\\end{aligned} \\)"
    },
    title1() {
      return this.$t('footer.FAQ.Titel_1')
    },
  },

  watch: {
    '$i18n.locale': function() {
      this.setTabList();
    }
  },

  created() {
    this.setTabList();

    if (this.$route.hash == "#bilanzierung"){
      this.panel_1 = [0]
    }
    else if (this.$route.hash == "#allgemein"){
      this.panel_2 = [0]
    }
    else if (this.$route.hash == "#warum"){
      this.panel_3 = [1]
    }
  },


  methods: {
    setTabList(){
      this.tabList = [
        { id: 0, title: this.$t('footer.Footer.FAQ'), component: null},
      ]
    },

    // Vuetify uses <suspense> inside their components, which means that the mounted hook is called before the content is rendered
    // This function is called once v-main is and all its childs are mounted
    vuetifyMounted() {
      if(this.$route.hash){
        let top = this.$refs[this.$route.hash].$el.offsetTop

        window.scrollTo({
          top: top, 
          left: 0
        })
      }
    }
  }
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