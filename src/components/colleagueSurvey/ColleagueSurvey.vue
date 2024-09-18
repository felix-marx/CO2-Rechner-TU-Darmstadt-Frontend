<!-- eslint-disable vue/no-v-html -->
<template>
  <v-container>
    <v-card 
      class="pa-7 mt-2 mx-auto"
      :max-width="constants.v_card_max_width"
    >
      <!-- Introduction Text -->
      <p> {{ ($t('colleagueSurvey.colleagueSurvey.UmfrageErklaerung_0')) }} </p>
      <p v-html="$t('colleagueSurvey.colleagueSurvey.UmfrageErklaerung_1')" />
      <p>{{ ($t('colleagueSurvey.colleagueSurvey.UmfrageErklaerung_2')) }} <b>{{ umfrageYear }}</b> {{ ($t('colleagueSurvey.colleagueSurvey.UmfrageErklaerung_3')) }} </p>
      <p>{{ ($t('colleagueSurvey.colleagueSurvey.UmfrageErklaerung_4')) }}</p>
      <p> {{ ($t('colleagueSurvey.colleagueSurvey.UmfrageErklaerung_5')) }}</p>
      <p> {{ ($t('colleagueSurvey.colleagueSurvey.UmfrageErklaerung_6')) }}</p>
    </v-card>
    
    <v-card
      elevation="2"
      :class="$vuetify.display.smAndUp ? 'pa-7 mt-2 mx-auto' : 'py-7 px-5 mt-2 mx-auto'"
      border
      :max-width="constants.v_card_max_width"
    >
      <v-card-title class="headerClass">
        {{ bezeichnung }}
      </v-card-title>

      <!-- Umfrage -->
      <v-form>
        <!-- Pendelwege -->
        <h3>
          {{ ($t('colleagueSurvey.colleagueSurvey.WieInsBuero')) }}
          <Tooltip
            :tooltip-text="$t('colleagueSurvey.colleagueSurvey.WieInsBuero_tooltip')"
          />
        </h3>
        <v-divider />
        <br>

        <div
          v-for="(medium, index) in verkehrsmittel"
          :key="'pendelweg-' + index"
        >
          <!-- Desktop -->
          <template v-if="$vuetify.display.smAndUp">
            <v-row>
              <v-col
                cols="11"
                class="pa-0"
              >
                <v-container>
                  <v-row>
                    <!-- Allgemeines Verkehrsmedium -->
                    <v-col
                      :cols="medium[0] === $t('colleagueSurvey.colleagueSurvey.fahrmediumListe_5') || medium[0] === $t('colleagueSurvey.colleagueSurvey.fahrmediumListe_0') ? 4 : 8"
                      class="pb-0"
                    >
                      <v-select
                        v-model="medium[0]"
                        :items="fahrtmediumListe"
                        :disabled="submittedDataSuccessfully"
                        :label="$t('colleagueSurvey.colleagueSurvey.WieInsBuero_verkehrsmedium')"
                      />
                    </v-col>
                    <!-- ÖPNV -->
                    <v-col
                      v-if="medium[0] === $t('colleagueSurvey.colleagueSurvey.fahrmediumListe_5')"
                      cols="4"
                      class="pb-0"
                    >
                      <v-select
                        v-model="medium[1]"
                        :disabled="submittedDataSuccessfully"
                        :items="fahrtmediumÖPNVListe"
                        :label="$t('colleagueSurvey.colleagueSurvey.fahrtmediumOEPNV')"
                      />
                    </v-col>
                    <!-- PKW-Typ -->
                    <v-col
                      v-if="medium[0] === $t('colleagueSurvey.colleagueSurvey.fahrmediumListe_0')"
                      cols="4"
                      class="pb-0"
                    >
                      <v-select
                        v-model="medium[5]"
                        :items="pkwListe"
                        :disabled="submittedDataSuccessfully"
                        :label="$t('colleagueSurvey.colleagueSurvey.Pkw_Motortyp')"
                      />
                    </v-col>
                    <!-- Distanz -->
                    <v-col
                      cols="4"
                      class="pb-0"
                    >
                      <v-text-field
                        :ref="'pendelwegDistanz' + index"
                        v-model="medium[4]"
                        type="number"
                        :rules="streckeRules"
                        :disabled="medium[0] === null || (medium[0] === $t('colleagueSurvey.colleagueSurvey.fahrmediumListe_5') && medium[1] === null) || (medium[0] === $t('colleagueSurvey.colleagueSurvey.fahrmediumListe_0') && medium[5] === null) || submittedDataSuccessfully"
                        :min="0"
                        :label="$t('colleagueSurvey.colleagueSurvey.WieInsBuero_pendelweg')"
                        :suffix="$t('common.Einheit_km')"
                        hide-spin-buttons
                      />
                    </v-col>
                  </v-row>
                  <!-- Weitere Reihe für PKWs mit Fahrgemeinschaft -->
                  <v-row
                    v-if="medium[0] === $t('colleagueSurvey.colleagueSurvey.fahrmediumListe_0')"
                  >
                    <v-col
                      cols="4"
                      class="pt-0"
                    >
                      <h4 class="pt-5">
                        {{ $t('colleagueSurvey.colleagueSurvey.WieInsBuero_fahrgemeinschaft') }}
                      </h4>
                    </v-col>
                    <v-col
                      cols="2"
                      class="pt-0"
                    >
                      <v-checkbox
                        v-model="medium[2]"
                        :disabled="submittedDataSuccessfully"
                        :label="$t('common.Ja')"
                        class="pr-4"
                      />
                    </v-col>
                    <v-col
                      cols="6"
                      class="pt-0"
                    >
                      <v-text-field
                        :ref="'mitfahrer' + index"
                        v-model="medium[3]"
                        type="number"
                        :rules="mitfahrerRules"
                        :disabled="!medium[2] || submittedDataSuccessfully"
                        :min="0"
                        :label="$t('colleagueSurvey.colleagueSurvey.WieInsBuero_anzahlMitfahrende')"
                        hide-spin-buttons
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
              <!-- Delete Button -->
              <v-col
                class="pb-0 text-center"
                cols="1"
              >
                <v-btn
                  class="delete_text--text mx-auto mt-1"
                  color="delete"
                  icon="mdi-delete-outline"
                  :disabled="submittedDataSuccessfully"
                  @click="removeVerkehrsmittel(index)"
                />
              </v-col>
            </v-row>
          </template>
          <!-- Mobile -->
          <template v-else>
            <v-card class="mb-2">
              <v-container class="py-4">
                <v-row
                  align="center"
                >
                  <v-col
                    cols="10"
                    class="pa-0"
                  >
                    <v-container>
                      <v-row>
                        <!-- Allgemeines Verkehrsmedium -->
                        <v-col
                          :cols="medium[0] === $t('colleagueSurvey.colleagueSurvey.fahrmediumListe_5') || medium[0] === $t('colleagueSurvey.colleagueSurvey.fahrmediumListe_0') ? 6 : 12"
                          class="py-0"
                        >
                          <v-select
                            v-model="medium[0]"
                            :items="fahrtmediumListe"
                            :disabled="submittedDataSuccessfully"
                            :label="$t('colleagueSurvey.colleagueSurvey.WieInsBuero_verkehrsmedium')"
                          />
                        </v-col>
                        <!-- ÖPNV -->
                        <v-col
                          v-if="medium[0] === $t('colleagueSurvey.colleagueSurvey.fahrmediumListe_5')"
                          cols="6"
                          class="py-0"
                        >
                          <v-select
                            v-model="medium[1]"
                            :disabled="submittedDataSuccessfully"
                            :items="fahrtmediumÖPNVListe"
                            :label="$t('colleagueSurvey.colleagueSurvey.fahrtmediumOEPNV')"
                          />
                        </v-col>
                        <!-- PKW-Typ -->
                        <v-col
                          v-if="medium[0] === $t('colleagueSurvey.colleagueSurvey.fahrmediumListe_0')"
                          cols="6"
                          class="py-0"
                        >
                          <v-select
                            v-model="medium[5]"
                            :items="pkwListe"
                            :disabled="submittedDataSuccessfully"
                            :label="$t('colleagueSurvey.colleagueSurvey.Pkw_Motortyp')"
                          />
                        </v-col>
                      </v-row>
                      <v-row>  
                        <!-- Distanz -->
                        <v-col
                          cols="12"
                          class="pt-0 pb-1"
                        >
                          <v-text-field
                            :ref="'pendelwegDistanz' + index"
                            v-model="medium[4]"
                            type="number"
                            :rules="streckeRules"
                            :disabled="medium[0] === null || (medium[0] === $t('colleagueSurvey.colleagueSurvey.fahrmediumListe_5') && medium[1] === null) || (medium[0] === $t('colleagueSurvey.colleagueSurvey.fahrmediumListe_0') && medium[5] === null) || submittedDataSuccessfully"
                            :min="0"
                            :label="$t('colleagueSurvey.colleagueSurvey.WieInsBuero_pendelweg')"
                            :suffix="$t('common.Einheit_km')"
                            hide-spin-buttons
                          />
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-col>
                  <v-col
                    class="pa-0 text-center"
                    cols="2"
                  >
                    <v-btn
                      class="delete_text--text mx-auto"
                      color="delete"
                      icon="mdi-delete-outline"
                      :disabled="submittedDataSuccessfully"
                      @click="removeVerkehrsmittel(index)"
                    />
                  </v-col>
                </v-row>

                <!-- Weitere Reihe für PKWs mit Fahrgemeinschaft -->
                <template v-if="medium[0] === $t('colleagueSurvey.colleagueSurvey.fahrmediumListe_0')">
                  <v-row>
                    <v-col
                      class="pt-0"
                    >
                      <h4>
                        {{ $t('colleagueSurvey.colleagueSurvey.WieInsBuero_fahrgemeinschaft') }}
                      </h4>
                    </v-col>
                  </v-row>
                  <v-row>  
                    <v-col
                      cols="2"
                      class="pt-0"
                    >
                      <v-checkbox
                        v-model="medium[2]"
                        :disabled="submittedDataSuccessfully"
                        :label="$t('common.Ja')"
                        class="pr-4"
                      />
                    </v-col>
                    <v-col
                      class="pt-0"
                    >
                      <v-text-field
                        :ref="'mitfahrer' + index"
                        v-model="medium[3]"
                        type="number"
                        :rules="mitfahrerRules"
                        :disabled="!medium[2] || submittedDataSuccessfully"
                        :min="0"
                        :label="$t('colleagueSurvey.colleagueSurvey.WieInsBuero_anzahlMitfahrende')"
                        hide-spin-buttons
                      />
                    </v-col>
                  </v-row>
                </template>
              </v-container>
            </v-card>
          </template>
        </div>
        <!-- Add Button -->
        <v-row>
          <v-col>
            <v-btn
              class="add_text--text pl-2"
              color="add"
              :disabled="submittedDataSuccessfully"
              @click="newVerkehrsmittel()"
            >
              <v-icon>
                mdi-plus
              </v-icon>
              {{ ($t('colleagueSurvey.colleagueSurvey.WieInsBuero_verkehrsmedium')) }}
            </v-btn>
          </v-col>
        </v-row>

        <!-- Arbeitstage im Büro -->
        <br>
        <h3>{{ $t('colleagueSurvey.colleagueSurvey.TageBuero') }}</h3>
        <v-divider />
        <br>

        <v-container>
          <v-row>
            <v-text-field
              ref="arbeitstageBuero"
              v-model="arbeitstageBuero"
              type="number"
              :rules="tageImBueroRules"
              :disabled="submittedDataSuccessfully"
              :min="0"
              :max="7"
              :label="$t('colleagueSurvey.colleagueSurvey.TageBuero_label')"
              hide-spin-buttons
            />
          </v-row>
        </v-container>

        <!-- Dienstreisen Abfrage Option mehrere anzugeben -->
        <br>
        <h3>
          {{ $t('colleagueSurvey.colleagueSurvey.Dienstreise_0') }} {{ umfrageYear }} 
          {{ $t('colleagueSurvey.colleagueSurvey.Dienstreise_1') }}
          <Tooltip
            :tooltip-text="$t('colleagueSurvey.colleagueSurvey.Dienstreise_tooltip_1') + ' ' + $t('colleagueSurvey.colleagueSurvey.Dienstreise_tooltip_2') + ' ' + $t('colleagueSurvey.colleagueSurvey.Dienstreise_tooltip_3')"
          />
        </h3>
        <v-divider />
        <br>

        <div
          v-for="(reise, index) in dienstreisen"
          :key="'dienstreisen-' + index"
        >
          <!-- Desktop -->
          <template v-if="$vuetify.display.smAndUp">
            <v-row>
              <!-- Allgemeines Verkehrsmedium -->
              <v-col 
                :cols="reise[0] === $t('colleagueSurvey.colleagueSurvey.dienstreiseMediumListe_0') ? 3 : (reise[0] === $t('colleagueSurvey.colleagueSurvey.dienstreiseMediumListe_3') ? 3 : 8)"
                class=""
              >
                <v-select
                  v-model="reise[0]"
                  :disabled="submittedDataSuccessfully"
                  :label="$t('colleagueSurvey.colleagueSurvey.WieInsBuero_verkehrsmedium')"
                  :items="dienstreiseMediumListe"
                />
              </v-col>
              <!-- PKW-Typ -->
              <v-col
                v-if="reise[0] === $t('colleagueSurvey.colleagueSurvey.dienstreiseMediumListe_0')"
                cols="5"
              >
                <v-select
                  v-model="reise[1]"
                  :v-show="reise[0] === $t('colleagueSurvey.colleagueSurvey.dienstreiseMediumListe_0')"
                  :label="$t('colleagueSurvey.colleagueSurvey.Pkw_Motortyp')"
                  :items="pkwListe"
                  :disabled="submittedDataSuccessfully"
                />
              </v-col>
              <!-- Flugstreckentyp -->
              <v-col 
                v-if="reise[0] === $t('colleagueSurvey.colleagueSurvey.dienstreiseMediumListe_3')"
                cols="3"
              >
                <v-select 
                  v-show="reise[0] === $t('colleagueSurvey.colleagueSurvey.dienstreiseMediumListe_3')" 
                  v-model="reise[1]" 
                  :label="$t('colleagueSurvey.colleagueSurvey.flugstreckentyp')" 
                  :items="flugstreckeListe"
                  :disabled="submittedDataSuccessfully"
                  @update:model-value="resetPlaneClass(index)"
                />
              </v-col>
              <!-- Flugklasse -->
              <v-col
                v-if="reise[0] === $t('colleagueSurvey.colleagueSurvey.dienstreiseMediumListe_3')"
                class="pl-0"
                cols="2"
              >
                <v-select
                  v-model="reise[3]"
                  :disabled="submittedDataSuccessfully || (reise[0] === $t('colleagueSurvey.colleagueSurvey.dienstreiseMediumListe_3') && !reise[1])"
                  :label="$t('colleagueSurvey.colleagueSurvey.Flugklasse')"
                  :items="mapDienstreiseFlugklasse(reise[1])"
                />
              </v-col>
              <!-- Distanz -->
              <v-col 
                cols="3"
                class=""
              >
                <v-text-field
                  :ref="'dienstreiseDistanz' + index"
                  v-model="reise[2]"
                  type="number"
                  :rules="streckeRules"
                  :disabled="reise[0] === null || submittedDataSuccessfully || (reise[0] === $t('colleagueSurvey.colleagueSurvey.dienstreiseMediumListe_0') && reise[1] === null) || (reise[0] === $t('colleagueSurvey.colleagueSurvey.dienstreiseMediumListe_3') && reise[3] === null)"
                  :min="0"
                  :label="$t('colleagueSurvey.colleagueSurvey.EinfacheDistanz')"
                  :suffix="$t('common.Einheit_km')"
                  hide-spin-buttons
                />
              </v-col>
              <!-- Delete Button -->
              <v-col
                class="text-center"
                cols="1"
              >
                <v-btn
                  class="delete_text--text mx-auto mt-1"
                  color="delete"
                  icon="mdi-delete-outline"
                  :disabled="submittedDataSuccessfully"
                  @click="removeDienstreise(index)"
                />
              </v-col>
            </v-row>
          </template>

          <!-- Mobile -->
          <template v-else>
            <v-card class="mb-4">
              <v-container class="py-4">
                <v-row
                  align="center"
                >
                  <v-col
                    cols="10"
                    class="pa-0"
                  >
                    <v-container>
                      <v-row>
                        <!-- Allgemeines Verkehrsmedium -->
                        <v-col 
                          :cols="reise[0] === $t('colleagueSurvey.colleagueSurvey.dienstreiseMediumListe_0') ? 6 : (reise[0] === $t('colleagueSurvey.colleagueSurvey.dienstreiseMediumListe_3') ? 12 : 12)"
                          class="py-0"
                        >
                          <v-select
                            v-model="reise[0]"
                            :disabled="submittedDataSuccessfully"
                            :label="$t('colleagueSurvey.colleagueSurvey.WieInsBuero_verkehrsmedium')"
                            :items="dienstreiseMediumListe"
                          />
                        </v-col>
                        <!-- PKW-Typ -->
                        <v-col
                          v-if="reise[0] === $t('colleagueSurvey.colleagueSurvey.dienstreiseMediumListe_0')"
                          cols="6"
                          class="py-0"
                        >
                          <v-select
                            v-model="reise[1]"
                            :v-show="reise[0] === $t('colleagueSurvey.colleagueSurvey.dienstreiseMediumListe_0')"
                            :label="$t('colleagueSurvey.colleagueSurvey.Pkw_Motortyp')"
                            :items="pkwListe"
                            :disabled="submittedDataSuccessfully"
                          />
                        </v-col>
                      </v-row>
                      <v-row>  
                        <!-- Flugstreckentyp -->
                        <v-col 
                          v-if="reise[0] === $t('colleagueSurvey.colleagueSurvey.dienstreiseMediumListe_3')"
                          cols="6"
                          class="py-0"
                        >
                          <v-select 
                            v-show="reise[0] === $t('colleagueSurvey.colleagueSurvey.dienstreiseMediumListe_3')" 
                            v-model="reise[1]" 
                            :label="$t('colleagueSurvey.colleagueSurvey.flugstreckentyp')" 
                            :items="flugstreckeListe"
                            :disabled="submittedDataSuccessfully"
                            @update:model-value="resetPlaneClass(index)"
                          />
                        </v-col>
                        <!-- Flugklasse -->
                        <v-col
                          v-if="reise[0] === $t('colleagueSurvey.colleagueSurvey.dienstreiseMediumListe_3')"
                          class="py-0"
                          cols="6"
                        >
                          <v-select
                            v-model="reise[3]"
                            :disabled="submittedDataSuccessfully || (reise[0] === $t('colleagueSurvey.colleagueSurvey.dienstreiseMediumListe_3') && !reise[1])"
                            :label="$t('colleagueSurvey.colleagueSurvey.Flugklasse')"
                            :items="mapDienstreiseFlugklasse(reise[1])"
                          />
                        </v-col>
                      </v-row>
                      <v-row> 
                        <!-- Distanz --> 
                        <v-col 
                          class="py-0"
                        >
                          <v-text-field
                            :ref="'dienstreiseDistanz' + index"
                            v-model="reise[2]"
                            type="number"
                            :rules="streckeRules"
                            :disabled="reise[0] === null || submittedDataSuccessfully || (reise[0] === $t('colleagueSurvey.colleagueSurvey.dienstreiseMediumListe_0') && reise[1] === null) || (reise[0] === $t('colleagueSurvey.colleagueSurvey.dienstreiseMediumListe_3') && reise[3] === null)"
                            :min="0"
                            :label="$t('colleagueSurvey.colleagueSurvey.EinfacheDistanz')"
                            :suffix="$t('common.Einheit_km')"
                            hide-spin-buttons
                          />
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-col>
                  <!-- Delete Button -->
                  <v-col
                    class="pa-0 text-center"
                    cols="2"
                  >
                    <v-btn
                      class="delete_text--text mx-auto"
                      color="delete"
                      icon="mdi-delete-outline"
                      :disabled="submittedDataSuccessfully"
                      @click="removeDienstreise(index)"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-card>          
          </template>
        </div>
        <!-- Add Button -->
        <v-row>
          <v-col>
            <v-btn
              class="add_text--text pl-2"
              color="add"
              :disabled="submittedDataSuccessfully"
              @click="newDienstreise()"
            >
              <v-icon>
                mdi-plus
              </v-icon>
              {{ ($t('colleagueSurvey.colleagueSurvey.WieInsBuero_verkehrsmedium')) }}
            </v-btn>
          </v-col>
        </v-row>


        <!-- Umfrage für die IT Geräte Notebook, Desktop PC, Bildschirm, Mobiltelfon -->
        <br>
        <h3>
          {{ $t('colleagueSurvey.colleagueSurvey.IT_Geraete') }}
          <Tooltip
            :tooltip-text="$t('colleagueSurvey.colleagueSurvey.IT_Geraete_tooltip')"
          />
        </h3>

        <v-divider />
        <br>

        <v-container>
          <!-- Notebook -->
          <v-row>
            <v-col :class="!$vuetify.display.mobile ? 'py-0' : 'pa-0'">
              <number-input
                ref="notebooks"
                v-model="geraeteAnzahl[0][1]"
                :rules="geraeteRules"
                :disabled="submittedDataSuccessfully"
                :min="0"
                :label="$t('colleagueSurvey.colleagueSurvey.IT_Geraete_Notebooks')"
                :suffix="$t('colleagueSurvey.colleagueSurvey.IT_Geraete_Suffix')"
                buttons-right
              />
            </v-col>
          </v-row>
          <!-- Desktop PC -->
          <v-row>
            <v-col :class="!$vuetify.display.mobile ? 'py-0' : 'pa-0'">
              <number-input
                ref="desktops"
                v-model="geraeteAnzahl[1][1]"
                :rules="geraeteRules"
                :disabled="submittedDataSuccessfully"
                :min="0"
                :label="$t('colleagueSurvey.colleagueSurvey.IT_Geraete_Desktops')"
                :suffix="$t('colleagueSurvey.colleagueSurvey.IT_Geraete_Suffix')"
                buttons-right
              />
            </v-col>
          </v-row>
          <!-- Bildschirm -->
          <v-row>
            <v-col :class="!$vuetify.display.mobile ? 'py-0' : 'pa-0'">
              <number-input
                ref="bildschirme"
                v-model="geraeteAnzahl[2][1]"
                :rules="geraeteRules"
                :disabled="submittedDataSuccessfully"
                :min="0"
                :label="$t('colleagueSurvey.colleagueSurvey.IT_Geraete_Bildschirme')"
                :suffix="$t('colleagueSurvey.colleagueSurvey.IT_Geraete_Suffix')"
                buttons-right
              />
            </v-col>
          </v-row>
          <!-- Mobiltelefon -->
          <v-row>
            <v-col :class="!$vuetify.display.mobile ? 'py-0' : 'pa-0'">
              <number-input
                ref="mobiltelefone"
                v-model="geraeteAnzahl[3][1]"
                :rules="geraeteRules"
                :disabled="submittedDataSuccessfully"
                :min="0"
                :label="$t('colleagueSurvey.colleagueSurvey.IT_Geraete_Mobiltelefone')"
                :suffix="$t('colleagueSurvey.colleagueSurvey.IT_Geraete_Suffix')"
                buttons-right
              />
            </v-col>
          </v-row>
        </v-container>

        <!--- Papierverbrauch currently not used
          <br>
          <h3>Schätzen Sie bitte wie viele Blätter Papier Sie in einer typischen Woche verbrauchen.</h3>
          <v-divider></v-divider>
          
          <v-container>
            <v-row>
                <v-select v-model="papierverbrauch" :items="papierverbrauchListe" label="Papierverbrauch"></v-select>
            </v-row>
          </v-container> -->

        <v-row>
          <v-col>
            <v-dialog
              v-model="errorDialog"
              transition="dialog-bottom-transition"
              :max-width="constants.v_dialog_max_width"
            >
              <!-- Mit diesem Button soll die Umfrage abgesendet werden. -->
              <template #activator="{ props }">
                <v-btn
                  class="mr-4"
                  color="primary"
                  :disabled="submittedDataSuccessfully"
                  v-bind="props"
                  @click="checkValidInput()"
                >
                  {{ ($t('common.Absenden')) }}
                </v-btn>
              </template>

              <v-card>
                <v-toolbar
                  class="px-4"
                  color="primary"
                  dark
                >
                  {{ (errorsArray.length != 0) ? $t('colleagueSurvey.colleagueSurvey.EingabeValidierung_Problem') : $t('colleagueSurvey.colleagueSurvey.EingabeValidierung_Vollstaendig') }}
                </v-toolbar>
                <v-card-text>
                  <div
                    v-if="errorsArray.length != 0"
                    class="pt-6"
                  >
                    {{ $t('colleagueSurvey.colleagueSurvey.EingabeValidierung_kleinereProbleme') }} <br>
                    <v-list>
                      <v-list-item
                        v-for="(problem, index) in errorsArray"
                        :key="index"
                      >
                        <label class="text-sm-body-2 mb-2">
                          {{ problem }}
                        </label>
                      </v-list-item>
                    </v-list>
                  </div>
                  <div 
                    v-if="errorsArray.length == 0"
                    class="pt-6"
                  >
                    {{ $t('colleagueSurvey.colleagueSurvey.EingabeValidierung_Absenden_0') }}<br>
                    {{ $t('colleagueSurvey.colleagueSurvey.EingabeValidierung_Absenden_1') }}
                  </div>
                </v-card-text>

                <v-divider />

                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    color="primary"
                    variant="text"
                    @click="errorDialog = false"
                  >
                    {{ $t('colleagueSurvey.colleagueSurvey.EingabeValidierung_Bearbeiten') }}
                  </v-btn>
                  <v-btn
                    v-if="errorsArray.length == 0"
                    color="primary"
                    variant="text"
                    @click="sendData(), errorDialog = false"
                  >
                    {{ $t('colleagueSurvey.colleagueSurvey.EingabeValidierung_Absenden') }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
        <v-row v-if="displayLoadingAnimation || submittedDataSuccessfully || (errorMessage !== null)">
          <v-col>
            <LoadingAnimation v-if="displayLoadingAnimation" />
            <v-alert
              ref="errorMessage"
              class="mb-0"
              :model-value="errorMessage !== null"
              density="compact"
              variant="tonal"
              type="error"
            >
              {{ errorMessage }}
            </v-alert>
            <v-alert
              ref="successMessage"
              class="mb-0"
              :model-value="submittedDataSuccessfully"
              density="compact"
              variant="tonal"
              type="success"
            >
              {{ $t('colleagueSurvey.colleagueSurvey.Absenden_Erfolgreich') }}
            </v-alert>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import Tooltip from "@/components/componentParts/Tooltip.vue";
import LoadingAnimation from '@/components/componentParts/LoadingAnimation.vue';
import NumberInput from "@/components/componentParts/NumberInput.vue";
import constants from "@/const.js";
import { nextTick } from "vue";

export default {  
  components: {
    Tooltip,
    LoadingAnimation,
    NumberInput
  },

  props: {
    bezeichnung: {
      default: "",
      type: String
    }
  },

  data: () => ({
    constants: constants,
    umfrageYear: "UnknownYear",

    // display of alerts
    displayLoadingAnimation: false,
    errorMessage: null,
    submittedDataSuccessfully: false,
    scrollToSuccesMessage: false,
    scrollToErrorMessage: false,

    //Arbeitstage
    arbeitstageBuero: null,

    //Pendelweg ------------------------------------------
    fahrtmediumListe: [],
    fahrtmediumÖPNVListe: [],
    /*
     * verkehrmittel Array format:
     * [0]: fahrtmedium || Öffentliche
     * [1]: null or if [0] is Öffentliche -> ÖPVN
     * [2]: true if Fahrgemeinschaft and [0] is a PKW typ
     * [3]: number of fahrgemeinschaftsmitglieder
     * [4]: einfacher Pendelweg
     * [5]: Tankart if [0] is PKW(Diesel or Benzin)
     */
    verkehrsmittel: [[null, null, false, null, null, null]],

    //Dienstreisen ---------------------------------------
    dienstreiseMediumListe: [],
    flugstreckeListe: [],
    flugklassenListeLangstrecke: [],
    flugklassenListeKurzstrecke: [],
    flugklassenListeInland: [],
    flugklassenListeInternational: [],

    /*
     * dienstreisen Array format:
     * [0]: dienstreiseMedium selected from List
     * [1]: flugstreckentTyp either Lang- or Kurzstrecke
     * [2]: dienstreiseDistanz accumulates all distances over multiple Dienstreisen of the last 12 months
     * [3]: flugklasse
     */
    dienstreisen: [[null, null, null, null]],

    //IT Geräte
    /* Geraet mit Array Position format [intern Geraete ID, Anzahl]
     * [0] Notebook
     * [1] DesktopPC
     * [2] Bildschirm
     * [3] Mobiltelefon
     */
    geraeteAnzahl: [
      [constants.it_geraet_notebook, null],
      [constants.it_geraet_desktop, null],
      [constants.it_geraet_bildschirm, null],
      [constants.it_geraet_mobiltelefon, null],
    ],

    //Papierverbrauch currently not used
    //papierverbrauch: null,
    //papierverbrauchListe: ['0', '1-20', '21 - 50', '51 - 70', '70+']

    //Array containing found errors in form
    errorsArray: [],
    errorDialog: false,

    //Rules for input validation
    tageImBueroRules: [],
    streckeRules: [],
    geraeteRules: [],
    mitfahrerRules: [],
  }),

  watch: {
    '$i18n.locale': function() {
      this.setListe();
      this.setRules();

      // reset values for Pendelwege and Dienstreisen
      this.verkehrsmittel = [[null, null, false, null, null, null]]
      this.dienstreisen = [[null, null, null, null]]

      // revalidate textfields to change language of error messages
      for (var i = 0; i < this.verkehrsmittel.length; i++) {
        this.$refs["pendelwegDistanz" + i][0].resetValidation();

        if (this.verkehrsmittel[i][0] === this.$t('colleagueSurvey.colleagueSurvey.fahrmediumListe_0')) {
          this.$refs["mitfahrer" + i][0].resetValidation();
        }
      }

      if (this.arbeitstageBuero) {
        this.$refs.arbeitstageBuero.validate();
      }
      else {
        this.$refs.arbeitstageBuero.resetValidation();
      }

      for (i = 0; i < this.verkehrsmittel.length; i++) {
        this.$refs["dienstreiseDistanz" + i][0].resetValidation();
      }

      if (this.geraeteAnzahl[0][1]) {
        this.$refs.notebooks.validate();
      }
      else {
        this.$refs.notebooks.resetValidation();
      }
      if (this.geraeteAnzahl[1][1]) {
        this.$refs.desktops.validate();
      }
      else {
        this.$refs.desktops.resetValidation();
      }
      if (this.geraeteAnzahl[2][1]) {
        this.$refs.bildschirme.validate();
      }
      else {
        this.$refs.bildschirme.resetValidation();
      }
      if (this.geraeteAnzahl[3][1]) {
        this.$refs.mobiltelefone.validate();
      }
      else {
        this.$refs.mobiltelefone.resetValidation();
      }
    },

    scrollToSuccesMessage: async function() {
      if (!this.scrollToSuccesMessage) {
        return;
      }

      await nextTick();

      this.$refs.successMessage.$el.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest" });
      this.scrollToSuccesMessage = false;
    },

    scrollToErrorMessage: async function() {
      if (!this.scrollToErrorMessage) {
        return;
      }

      await nextTick();

      this.$refs.errorMessage.$el.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest" });
      this.scrollToErrorMessage = false;
    }
  },

  created() {
    this.fetchUmfrageYear(this.$route.params.umfrageID);  // request the year of the umfrage
    this.setListe();
    this.setRules(); 
  },

  methods: {
    /**
     * This Method is needed bc of i18n. Otherwise after changing the language the dropdown menus would not change.
     */
    setListe: function(){
      this.fahrtmediumListe = [
        this.$t("colleagueSurvey.colleagueSurvey.fahrmediumListe_0"),
        this.$t("colleagueSurvey.colleagueSurvey.fahrmediumListe_2"),
        this.$t("colleagueSurvey.colleagueSurvey.fahrmediumListe_3"),
        this.$t("colleagueSurvey.colleagueSurvey.fahrmediumListe_4"),
        this.$t("colleagueSurvey.colleagueSurvey.fahrmediumListe_5"),
        this.$t("colleagueSurvey.colleagueSurvey.fahrmediumListe_6")
      ]
      this.fahrtmediumÖPNVListe = [
        this.$t("colleagueSurvey.colleagueSurvey.fahrtmediumOEPNVListe_0"),
        this.$t("colleagueSurvey.colleagueSurvey.fahrtmediumOEPNVListe_1"),
        this.$t("colleagueSurvey.colleagueSurvey.fahrtmediumOEPNVListe_2"),
        this.$t("colleagueSurvey.colleagueSurvey.fahrtmediumOEPNVListe_3"),
        this.$t("colleagueSurvey.colleagueSurvey.fahrtmediumOEPNVListe_4"),
        this.$t("colleagueSurvey.colleagueSurvey.fahrtmediumOEPNVListe_5"),
      ]
      this.dienstreiseMediumListe = [
        this.$t("colleagueSurvey.colleagueSurvey.dienstreiseMediumListe_0"),
        this.$t("colleagueSurvey.colleagueSurvey.dienstreiseMediumListe_2"),
        this.$t("colleagueSurvey.colleagueSurvey.dienstreiseMediumListe_3"),
      ]
      this.flugstreckeListe = [
        this.$t("colleagueSurvey.colleagueSurvey.flugstreckeListe_0"), //Langstrecke
        this.$t("colleagueSurvey.colleagueSurvey.flugstreckeListe_1"), //Kurzstrecke
        this.$t("colleagueSurvey.colleagueSurvey.flugstreckeListe_2"), //Inland
        this.$t("colleagueSurvey.colleagueSurvey.flugstreckeListe_3"), //International
      ]
      this.pkwListe = [
        this.$t("colleagueSurvey.colleagueSurvey.dienstreiseMedium_Diesel"),
        this.$t("colleagueSurvey.colleagueSurvey.dienstreiseMedium_Benzin"),
        this.$t("colleagueSurvey.colleagueSurvey.dienstreiseMedium_Hybrid"),
        this.$t("colleagueSurvey.colleagueSurvey.dienstreiseMedium_Elektro"),
      ]
      this.flugklassenListeLangstrecke = [
        this.$t("colleagueSurvey.colleagueSurvey.flugklasse_average"),
        this.$t("colleagueSurvey.colleagueSurvey.flugklasse_economy"),
        this.$t("colleagueSurvey.colleagueSurvey.flugklasse_business"),
        this.$t("colleagueSurvey.colleagueSurvey.flugklasse_premiumeconomy"),
        this.$t("colleagueSurvey.colleagueSurvey.flugklasse_first"),
      ]
      this.flugklassenListeKurzstrecke = [
        this.$t("colleagueSurvey.colleagueSurvey.flugklasse_average"),
        this.$t("colleagueSurvey.colleagueSurvey.flugklasse_economy"),
        this.$t("colleagueSurvey.colleagueSurvey.flugklasse_business"),
      ]
      this.flugklassenListeInland = [
        this.$t("colleagueSurvey.colleagueSurvey.flugklasse_average"),
      ]
      this.flugklassenListeInternational = [
        this.$t("colleagueSurvey.colleagueSurvey.flugklasse_average"),
        this.$t("colleagueSurvey.colleagueSurvey.flugklasse_economy"),
        this.$t("colleagueSurvey.colleagueSurvey.flugklasse_business"),
        this.$t("colleagueSurvey.colleagueSurvey.flugklasse_premiumeconomy"),
        this.$t("colleagueSurvey.colleagueSurvey.flugklasse_first"),
      ]

      // Sort the lists based on current language
      let collator = new Intl.Collator(this.$i18n.locale, {sensitivity: 'base'});

      this.fahrtmediumListe.sort(collator.compare);
      this.fahrtmediumÖPNVListe.sort(collator.compare);
      this.dienstreiseMediumListe.sort(collator.compare);
      this.flugstreckeListe.sort(collator.compare);
      this.pkwListe.sort(collator.compare);
      this.flugklassenListeLangstrecke.sort(collator.compare);
      this.flugklassenListeKurzstrecke.sort(collator.compare);
      this.flugklassenListeInland.sort(collator.compare);
      this.flugklassenListeInternational.sort(collator.compare);
    },

    /**
     * This Method is needed bc of i18n. Otherwise after changing the language the rules would not change.
     */
    setRules: function(){
      this.tageImBueroRules = [
        (v) => !!v || this.$t('colleagueSurvey.colleagueSurvey.Rules_MussAngegeben'),
        (v) =>
          (parseInt(v) < 8 && parseInt(v) >= 0) ||
          this.$t('colleagueSurvey.colleagueSurvey.TageBueroRules_0'),
      ]

      this.streckeRules = [
        (v) => !!v || this.$t('colleagueSurvey.colleagueSurvey.Rules_MussAngegeben'),
        (v) => parseInt(v) > 0 || this.$t('colleagueSurvey.colleagueSurvey.StreckeRules_0'),
      ]

      this.geraeteRules = [
        (v) =>
          !!v || this.$t('colleagueSurvey.colleagueSurvey.GeraeteRules_0'),
        (v) =>
          parseInt(v) != 0 ||
          this.$t('colleagueSurvey.colleagueSurvey.GeraeteRules_0'),
        (v) => parseInt(v) > 0 || this.$t('colleagueSurvey.colleagueSurvey.GeraeteRules_1'),
      ],

      this.geraeteRules = [
        (v) => !!v || this.$t('colleagueSurvey.colleagueSurvey.GeraeteRules_1'),
        (v) => parseInt(v) >= 0 || this.$t('colleagueSurvey.colleagueSurvey.GeraeteRules_1'),
      ],

      this.mitfahrerRules = [
        (v) => !!v || this.$t('colleagueSurvey.colleagueSurvey.MitfahrerRules_0'),
        (v) =>
          parseInt(v) > 0 ||
          this.$t('colleagueSurvey.colleagueSurvey.MitfahrerRules_1'),
      ]
    },

    /**
     * Resets the Dienstreisen fileds associated with distnace and class
     */
    resetPlaneClass: function (index) {
      this.dienstreisen[index][2] = null;
      this.dienstreisen[index][3] = null;
    },

    /**
     * Adds a new Verkehrsmittel to select as the  Pendelmedium
     */
    newVerkehrsmittel: function () {
      this.verkehrsmittel.push([null, null, false, null, null, null]);
    },

    /**
     * Removes the element at the position index from the verkehrmittel index therfore removing this field from displaying
     */
    removeVerkehrsmittel: function (index) {
      if (index >= 0 && this.verkehrsmittel.length > index) {
        this.verkehrsmittel.splice(index, 1);
        //When the only element is removed add a new, thereby clearing the values of the fields on the webpage
        if (this.verkehrsmittel.length === 0) {
          this.newVerkehrsmittel();
        }
      } else {
        console.error("Negative or out of bounds array index supplied");
      }
    },

    /**
     * Returns an Integer ID that resolves the Pendelmedium Name to its specified internal ID
     */
    mapPendelverkehrsmittel: function (verkehrsmitteltyp, oepnvspezifikation, tankspezifikation) {
      //Backend expects the following IDs for the following Verkehrsmittel
      const verkehrsmittelMap = new Map([
        [this.$t('colleagueSurvey.colleagueSurvey.fahrmediumListe_2'), constants.pendelweg_fahrrad],
        [this.$t('colleagueSurvey.colleagueSurvey.fahrmediumListe_3'), constants.pendelweg_e_fahrrad],
        [this.$t('colleagueSurvey.colleagueSurvey.fahrmediumListe_4'), constants.pendelweg_motorisiertes_zweirad],
        [this.$t('colleagueSurvey.colleagueSurvey.Pkw_diesel'), constants.pendelweg_pkw_diesel],
        [this.$t('colleagueSurvey.colleagueSurvey.Pkw_benzin'), constants.pendelweg_pkw_benzin],
        [this.$t('colleagueSurvey.colleagueSurvey.fahrtmediumOEPNVListe_1'), constants.pendelweg_bus],
        [this.$t('colleagueSurvey.colleagueSurvey.fahrtmediumOEPNVListe_0'), constants.pendelweg_bahn],
        [this.$t('colleagueSurvey.colleagueSurvey.fahrtmediumOEPNVListe_2'), constants.pendelweg_u_bahn],
        [this.$t('colleagueSurvey.colleagueSurvey.fahrtmediumOEPNVListe_3'), constants.pendelweg_straßenbahn],
        [this.$t('colleagueSurvey.colleagueSurvey.fahrtmediumOEPNVListe_4'), constants.pendelweg_mix_inkl_u_bahn],
        [this.$t('colleagueSurvey.colleagueSurvey.fahrtmediumOEPNVListe_5'), constants.pendelweg_mix_exkl_u_bahn],
        [this.$t('colleagueSurvey.colleagueSurvey.fahrmediumListe_6'), constants.pendelweg_fußgaenger],
        [this.$t('colleagueSurvey.colleagueSurvey.dienstreiseMedium_Hybrid'), constants.pendelweg_pkw_plug_in_hybrid],
        [this.$t('colleagueSurvey.colleagueSurvey.dienstreiseMedium_Elektro'), constants.pendelweg_pkw_elektro]
      ]);

      //Check if Öffentliche is selected
      if(verkehrsmitteltyp === this.$t('colleagueSurvey.colleagueSurvey.fahrmediumListe_5')) {
        return verkehrsmittelMap.get(oepnvspezifikation);
        //Check if PKW is selected
      } else if(verkehrsmitteltyp === this.$t('colleagueSurvey.colleagueSurvey.fahrmediumListe_0')){
        return verkehrsmittelMap.get(tankspezifikation);
      } else {
        return verkehrsmittelMap.get(verkehrsmitteltyp);
      }
    },

    /**
     * Returns an array formatted [Medium ID, if PKW String of Tank else null]
     */
    mapDienstreisemittel: function (verkehrsmittel) {
      const verkehrsmittelMap = new Map([
        [this.$t('colleagueSurvey.colleagueSurvey.fahrtmediumOEPNVListe_0'), constants.dienstreisen_bahn],
        [this.$t('colleagueSurvey.colleagueSurvey.dienstreiseMediumListe_0'), constants.dienstreisen_pkw],
        [this.$t('colleagueSurvey.colleagueSurvey.dienstreiseMediumListe_3'), constants.dienstreisen_flugzeug],
      ]);
      
      //Tankart should be empty if not PKW
      var tankart = "";
      var flugklasse = "";
      var flugstreckeart = "";

      //Check if verkehrsmittel is PKW
      if(parseInt(verkehrsmittelMap.get(verkehrsmittel[0])) == 2) {
        //Check if Benzin or Diesel
        if(verkehrsmittel[1] == this.$t('colleagueSurvey.colleagueSurvey.dienstreiseMedium_Benzin')) {
          tankart = constants.dienstreisen_benzin
        } else if(verkehrsmittel[1] == this.$t('colleagueSurvey.colleagueSurvey.dienstreiseMedium_Diesel')) {
          tankart = constants.dienstreisen_diesel
        } else if(verkehrsmittel[1] == this.$t('colleagueSurvey.colleagueSurvey.dienstreiseMedium_Hybrid')) {
          tankart = constants.dienstreisen_plug_in_hybrid
        } else if(verkehrsmittel[1] == this.$t('colleagueSurvey.colleagueSurvey.dienstreiseMedium_Elektro')) {
          tankart = constants.dienstreisen_elektro
        } else { 
          console.error("No valid Tankart selected")
          tankart = "";
        }
      }

      //Check if verkehrsmittel is Flugzeug, then set the Flugstreckeart
      if(parseInt(verkehrsmittelMap.get(verkehrsmittel[0])) == 3) {
        if(verkehrsmittel[1] == this.$t('colleagueSurvey.colleagueSurvey.flugstreckeListe_0')) {
          flugstreckeart = constants.dienstreisen_langstrecke
        } else if(verkehrsmittel[1] == this.$t('colleagueSurvey.colleagueSurvey.flugstreckeListe_1')) {
          flugstreckeart = constants.dienstreisen_kurzstrecke
        } else if(verkehrsmittel[1] == this.$t('colleagueSurvey.colleagueSurvey.flugstreckeListe_2')) {
          flugstreckeart = constants.dienstreisen_inland
        } else if(verkehrsmittel[1] == this.$t('colleagueSurvey.colleagueSurvey.flugstreckeListe_3')) {
          flugstreckeart = constants.dienstreisen_international
        } else {
          console.error("No valid Flugstreckeart selected")
          flugstreckeart = "";
        }
      }

      //Check if verkehrsmittel is Flugzeug, then set the Flugklasse
      if(parseInt(verkehrsmittelMap.get(verkehrsmittel[0])) == 3) {
        if(verkehrsmittel[3] == this.$t('colleagueSurvey.colleagueSurvey.flugklasse_average')) {
          flugklasse = constants.dienstreisen_average
        } else if(verkehrsmittel[3] == this.$t('colleagueSurvey.colleagueSurvey.flugklasse_economy')) {
          flugklasse = constants.dienstreisen_economy
        } else if(verkehrsmittel[3] == this.$t('colleagueSurvey.colleagueSurvey.flugklasse_business')) {
          flugklasse = constants.dienstreisen_business
        } else if(verkehrsmittel[3] == this.$t('colleagueSurvey.colleagueSurvey.flugklasse_premiumeconomy')) {
          flugklasse = constants.dienstreisen_premium_economy  
        } else if(verkehrsmittel[3] == this.$t('colleagueSurvey.colleagueSurvey.flugklasse_first')) {
          flugklasse = constants.dienstreisen_first
        } else {
          console.error("No valid Flugklasse selected")
          flugklasse = "";
        }
      }

      return [
        verkehrsmittelMap.get(verkehrsmittel[0]),
        tankart,
        flugstreckeart,
        flugklasse
      ];
    },

    /**
     * Returns the Flugklassenliste based on the Flugstreckeart
     */
    mapDienstreiseFlugklasse: function (flugstreckeart) {
      if(flugstreckeart == this.$t('colleagueSurvey.colleagueSurvey.flugstreckeListe_0')){ //Langstrecke
        return this.flugklassenListeLangstrecke;
      } else if (flugstreckeart == this.$t('colleagueSurvey.colleagueSurvey.flugstreckeListe_1')) { //Kurzstrecke
        return this.flugklassenListeKurzstrecke;
      } else if (flugstreckeart == this.$t('colleagueSurvey.colleagueSurvey.flugstreckeListe_2')) { //Inland
        return this.flugklassenListeInland;
      } else if (flugstreckeart == this.$t('colleagueSurvey.colleagueSurvey.flugstreckeListe_3')) { //International
        return this.flugklassenListeInternational;
      }
    },

    /**
     * Adds a new Dienstreise to select as another Dienstreisemedium
     */
    newDienstreise: function () {
      this.dienstreisen.push([null, null, null, null]);
    },

    /**
     * Removes a Dienstreise at the given index, therby deleting it from the webpage
     */
    removeDienstreise: function (index) {
      if (index >= 0 && this.dienstreisen.length > index) {
        this.dienstreisen.splice(index, 1);
        //When the only element is removed add a new, thereby clearing the values of the fields on the webpage
        if (this.dienstreisen.length === 0) {
          this.newDienstreise();
        }
      } else {
        console.error("Negative or out of bounds array index supplied");
      }
    },

    /**
     * Return an array of the Pendelweg data as specified in the API Documentation
     *  [{
     *    strecke: Integer
     *    idPendelweg: Integer
     *    personenanzahl: Integer
     *  }]
     *
     */
    pendelwegJSON: function () {
      //Build Pendelweg Array
      var buildPendelweg = [];
      for (var pendel of this.verkehrsmittel) {
        // eslint-disable-next-line no-extra-boolean-cast
        if(!!pendel[0]){
          buildPendelweg.push({
            strecke: parseInt(pendel[4]),
            idPendelweg: parseInt(
              this.mapPendelverkehrsmittel(pendel[0], pendel[1], pendel[5])
            ),
            //return 1 for no fahrgemeinschaft. In Question we ask Anzahl Mitfahrer so pendel[3]+1 are all persons in the vehicle
            personenanzahl: parseInt(
              pendel[3] == null ? 1 : parseInt(pendel[3]) + 1
            ),
          });
        }
      }
      return buildPendelweg;
    },

    /**
     * Returns an array of the Geräte data as specified in the API Documentation
     *  [{
     *    idITGeraete: Integer
     *    anzahl: Integer
     *  }]
     *
     */
    itGeraeteJSON: function () {
      //Build IT Geräte Array of non-null gerate
      var usedITGeraete = [];
      for (var geraet of this.geraeteAnzahl) {
        if (geraet[1] > 0) {
          usedITGeraete.push({
            idITGeraete: parseInt(geraet[0]),
            anzahl: parseInt(geraet[1]),
          });
        }
      }
      return usedITGeraete;
    },

    /**
     * Returns an array of the Dienstreise data as specified in API Documentation
     *  [{
     *    idDienstreise: Integer
     *    streckentyp: String
     *    strecke: Integer
     *    tankart: String
     *  }]
     *
     */
    dienstreisenJSON: function () {
      //Build Dienstreisen Array
      var buildDienstreisen = [];
      for (var dienstreise of this.dienstreisen) {
        // eslint-disable-next-line no-extra-boolean-cast
        if(!!dienstreise[0]){
          var dienstreisetyp = this.mapDienstreisemittel(dienstreise);

          buildDienstreisen.push({
            idDienstreise: parseInt(dienstreisetyp[0]),
            //Catches spezial case where user selects Flugtyp but then changes to other Verkehrsmedium
            streckentyp: parseInt(dienstreisetyp[0]) == 3 ? dienstreisetyp[2] : "",
            strecke: parseInt(dienstreise[2]),
            tankart: dienstreisetyp[1], //Empty if not PKW
            klasse: dienstreisetyp[3], //Empty if not Flugzeug
          });
        }
      }
      return buildDienstreisen;
    },

    /**
     * Checks if input to form is valid i.e. has no logical errors
     * and returns an List of found errors
     */
    checkValidInput: function() {
      var errors = []
      // Check for Pendelweg distance and valid öffentliche
      for(const verkehr  of this.verkehrsmittel) {
        var verkehrsmedium = (verkehr[0] != this.$t('colleagueSurvey.colleagueSurvey.fahrmediumListe_5')) ? verkehr[0] : verkehr[1]
        if(verkehr[0] != null && (!verkehr[4] || verkehr[4] < 0)) {
          if(verkehrsmedium == null) {
            errors.push(this.$t('colleagueSurvey.colleagueSurvey.EingabeValidierung_Verkehrsmedium'))
          } else {
            errors.push(this.$t('colleagueSurvey.colleagueSurvey.EingabeValidierung_Pendelweg_0') + verkehrsmedium + this.$t('colleagueSurvey.colleagueSurvey.EingabeValidierung_Pendelweg_1'))
          }
        }
        if(verkehr[0] != null && verkehr[2] && !verkehr[3]) {
          errors.push(this.$t('colleagueSurvey.colleagueSurvey.EingabeValidierung_Pendelweg_0') + verkehrsmedium + this.$t('colleagueSurvey.colleagueSurvey.EingabeValidierung_Fahrgemeinschaft_0')+ verkehrsmedium + this.$t('colleagueSurvey.colleagueSurvey.EingabeValidierung_Fahrgemeinschaft_1'))
        }
      }
      // Check number of days in office
      if(!this.arbeitstageBuero || this.arbeitstageBuero < 0 || this.arbeitstageBuero > 7) {
        errors.push(this.$t('colleagueSurvey.colleagueSurvey.EingabeValidierung_TageBuero'))
      }
      // Check for Dienstreise
      for(const dienst of this.dienstreisen) {
        if(dienst[0] && (!dienst[2] || dienst[2] < 0)) {
          var dienstmedium = (dienst[0] != this.$t('colleagueSurvey.colleagueSurvey.dienstreiseMediumListe_3')) ? dienst[0] : dienst[1]
          if(dienstmedium == null) {
            errors.push(this.$t('colleagueSurvey.colleagueSurvey.EingabeValidierung_Dienstreise_0')) 
          } else {
            errors.push(this.$t('colleagueSurvey.colleagueSurvey.EingabeValidierung_Dienstreise_1') + dienst[0] + this.$t('colleagueSurvey.colleagueSurvey.EingabeValidierung_Dienstreise_2'))
          }
        }
      }
      // Check IT Geraete
      for(const geraet of this.geraeteAnzahl) {
        var geraeteName = (geraet[0] == 1) ? this.$t('colleagueSurvey.colleagueSurvey.IT_Geraete_Notebook') : (geraet[0] == 2) ? this.$t('colleagueSurvey.colleagueSurvey.IT_Geraete_Desktop')  : (geraet[0] == 3) ? this.$t('colleagueSurvey.colleagueSurvey.IT_Geraete_Bildschirm') : this.$t('colleagueSurvey.colleagueSurvey.IT_Geraete_Mobiltelefon')
        if(geraet[1] < 0) {
          errors.push(this.$t('colleagueSurvey.colleagueSurvey.EingabeValidierung_Geraete_0') + geraeteName + this.$t('colleagueSurvey.colleagueSurvey.EingabeValidierung_Geraete_1'))
        }
      }
      this.errorsArray = errors
    },

    /**
     * Sends a JSON POST request to the backend to insert the data into the database and start the calculation
     */
    sendData: async function () {
      this.displayLoadingAnimation = true;

      await fetch(import.meta.env.VITE_BASEURL + "/mitarbeiterumfrage/insert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pendelweg: this.pendelwegJSON(),
          tageImBuero: parseInt(this.arbeitstageBuero),
          dienstreisen: this.dienstreisenJSON(),
          itGeraete: this.itGeraeteJSON(),
          idUmfrage: this.$route.params.umfrageID,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if(data.status === "success"){
            this.submittedDataSuccessfully = true;
            this.scrollToSuccesMessage = true;
            this.errorMessage = null;
          }else if(data.status == "error") {
            this.errorMessage = data.error.message;
            this.scrollToErrorMessage = true;
          }
          this.displayLoadingAnimation = false;
        })
        .catch((error) => {
          console.error("Error:", error);
          this.errorMessage = "Server nicht erreichbar.";
          this.scrollToErrorMessage = true;
          this.displayLoadingAnimation = false;
        });
    },

    /**
   * Requests from the server to which year the survey belongs.
   */
    fetchUmfrageYear: async function (givenID) {
      await fetch(import.meta.env.VITE_BASEURL + "/umfrage/jahr?id=" + givenID, {
        method: "GET",
        })
        .then((response) => response.json())
        .then((data) => {
          if (data.status == "success"){
            this.umfrageYear = String(data.data.jahr);
          }
          else{
            this.umfrageYear = "UnknownYear";
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          this.umfrageYear = "UnknownYear";
        });   
    },
  },
};
</script>