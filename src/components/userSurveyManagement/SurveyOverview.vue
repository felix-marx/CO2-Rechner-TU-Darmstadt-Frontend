<template>
  <v-container>
    <v-card
      class="mx-auto"
      :max-width="constants.v_card_max_width"
    >
      <v-card-title class="headerClass">
        {{ $t('userSurveyManagement.SurveyOverview.GespeicherteUmfragen') }}
      </v-card-title>

      <!-- Die erstellte Umfrage soll eine Karte erhalten. -->
      <v-card
        v-for="(umfrage, index) in umfragen"
        :key="'umfrage_'+index"
        elevation="2"
        outlined
        class="pb-2"
      >
        <v-container class="mx-1">
          <v-row>
            <v-col class="pb-0">
              <div class="text-overline">
                {{ $t('common.Bilanzierungsjahr') }} {{ umfrage.jahr }}
              </div> 
            </v-col>
          </v-row>
          <v-row>
            <v-col class="pt-1 pb-0">
              <v-list-item-title class="text-h5">
                {{ umfrage.bezeichnung }}
              </v-list-item-title>
            </v-col>
          </v-row>
          <!-- Desktop design in one row -->
          <v-row v-if="!$vuetify.breakpoint.mobile">
            <v-col cols="7">
              <CopyButton
                :button-text="$t('userSurveyManagement.SurveyOverview.LinkZurMitarbeiterumfrage')"
                :text-to-copy="mitarbeiterumfrageBaseURL + umfrage._id"
              />
            </v-col> 
            <v-col
              cols=""
              class="text-right"
              align-self="start"
            >
              <b>{{ umfrage.mitarbeiterUmfrageRef.length }}/{{ umfrage.mitarbeiteranzahl }} </b>  {{ $t('userSurveyManagement.SurveyOverview.MitarbeiterAnzahl') }}
            </v-col>
            <v-col
              cols="1"
              align-self="start"
            >
              <v-progress-circular 
                :color=" umfrage.mitarbeiterUmfrageRef.length == umfrage.mitarbeiteranzahl ? 'primary' : 'grey'"
                :value="100*(umfrage.mitarbeiterUmfrageRef.length / umfrage.mitarbeiteranzahl)"
                :size="35"
              />
            </v-col>
          </v-row>

          <!-- Mobile design in two rows -->
          <template v-else>
            <v-row>
              <v-col>
                <CopyButton
                  :button-text="$t('userSurveyManagement.SurveyOverview.LinkZurMitarbeiterumfrage_short')"
                  :text-to-copy="mitarbeiterumfrageBaseURL + umfrage._id"
                />
              </v-col>
            </v-row>
            <v-row>  
              <v-col
                class="text-left"
                align-self="start"
              >
                <b>{{ umfrage.mitarbeiterUmfrageRef.length }}/{{ umfrage.mitarbeiteranzahl }} </b>  {{ $t('userSurveyManagement.SurveyOverview.MitarbeiterAnzahl') }}
              </v-col>
              <v-col
                cols="2"
                align-self="end"
              >
                <v-progress-circular 
                  :color=" umfrage.mitarbeiterUmfrageRef.length == umfrage.mitarbeiteranzahl ? 'primary' : 'grey'"
                  :value="100*(umfrage.mitarbeiterUmfrageRef.length / umfrage.mitarbeiteranzahl)"
                  :size="35"
                />
              </v-col>
            </v-row>
          </template>
        </v-container>  

        <v-card-actions class="py-0">
          <v-container>
            <v-row>
              <v-col 
                class="px-0 pb-4"
                style="display: flex; flex-wrap: wrap; gap:12px"
              >
                <!-- Umfragen bearbeiten -->
                <v-dialog
                  v-model="dialog[index]"
                  fullscreen
                  hide-overlay
                  transition="dialog-bottom-transition"
                >
                  <template #activator="{ on, attrs }">
                    <v-btn
                      class="mx-2"
                      color="primary"
                      rounded
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon 
                        left 
                      >
                        mdi-clipboard-edit
                      </v-icon>
                      <span>{{ $t('userSurveyManagement.SurveyOverview.Bearbeiten') }}</span>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-toolbar
                      dark
                      color="primary"
                    >
                      <v-btn
                        icon
                        dark
                        @click="closeDialog(index)"
                      >
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                      <v-toolbar-title>{{ $t('common.Umfrage') }}</v-toolbar-title>
                    </v-toolbar>
                    <!-- Hier kommt der Inhalt der Umfrage hin -->
                    <v-card
                      v-if="dialog[index]"
                      :style="{background: $vuetify.theme.themes[theme].background}"
                    >
                      <EditSurvey 
                        :umfrageidprop="umfrage._id"
                      />
                    </v-card>
                  </v-card>
                </v-dialog>

                <!-- Umfrage teilen -->
                <v-dialog
                  v-model="shareDialog[index]"
                  :max-width="constants.v_dialog_max_width"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="mx-2"
                      color="primary"
                      rounded
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon 
                        left 
                      >
                        mdi-share-variant-outline
                      </v-icon>
                      <span>{{ $t('userSurveyManagement.SurveyOverview.Teilen') }}</span>
                    </v-btn>
                  </template>
              
                  <v-card class="pa-0">
                    <v-card-title class="text-h5 grey lighten-2 headerClass">
                      {{ $t('userSurveyManagement.SurveyOverview.ShareDialog_Title') }}
                    </v-card-title>

                    <v-card-text class="px-4 pt-4">
                      <v-container>
                        <v-row>
                          <v-col class="black--text">
                            {{ $t('userSurveyManagement.SurveyOverview.ShareDialog_Text_1') }}
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col class="black--text">
                            {{ $t('userSurveyManagement.SurveyOverview.ShareDialog_Text_2') }}
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            <LinkSharingComponent
                              :mitarbeiter-link="umfrageTeilenBaseURL + umfrage._id"
                            />
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-divider />
                  </v-card>
                </v-dialog>

                <!-- Auswertung anzeigen -->
                <v-dialog
                  v-model="dialogAuswertung[index]"
                  fullscreen
                  hide-overlay
                  transition="dialog-bottom-transition"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="mx-2"
                      color="primary"
                      rounded
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon left>
                        mdi-chart-bar
                      </v-icon>
                      {{ $t('common.Auswertung') }}
                    </v-btn>
                  </template>
                  <v-card>
                    <v-toolbar
                      dark
                      color="primary"
                    >
                      <v-btn
                        icon
                        dark
                        @click="closeDialogAuswertung(index)"
                      >
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                      <v-toolbar-title>{{ $t('common.Auswertung') }}</v-toolbar-title>
                      <v-spacer />
                    </v-toolbar>
                    <v-card
                      v-if="dialogAuswertung[index]"
                      :style="{background: $vuetify.theme.themes[theme].background}"
                    >
                      <SurveyEvaluation
                        :umfrageid="umfrage._id"
                        :shared="false"
                      />
                    </v-card>
                  </v-card>
                </v-dialog>

                <!-- Desktop -->
                <template v-if="!$vuetify.breakpoint.mobile">
                  <v-spacer />

                  <!-- Mit diesem Button sollen ausgewählte Umfragen dupliziert werden können. -->
                  <v-btn
                    class="mx-2"
                    outlined
                    text
                    color="primary"
                    @click="duplicateSurvey(index, umfrage._id)"
                  >
                    <v-icon class="mr-1">
                      mdi-content-copy
                    </v-icon>
                    {{ $t('common.Duplizieren') }}
                  </v-btn>

                  <!-- Umfrage löschen -->
                  <v-dialog
                    v-model="deleteSurvey[index]"
                    transition="dialog-bottom-transition"
                    :max-width="constants.v_dialog_max_width"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <!-- Mit diesem Button sollen ausgewählte Umfragen gelöscht werden können. -->
                      <v-btn
                        class="mx-2 pl-1"
                        outlined
                        text
                        color="delete"
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon>
                          mdi-delete-outline
                        </v-icon>
                        {{ $t('common.Loeschen') }}
                      </v-btn>
                    </template>

                    <v-card>
                      <v-toolbar
                        color="primary"
                        dark
                      >
                        {{ $t('userSurveyManagement.SurveyOverview.LoeschenDerUmfrage_0') }}
                      </v-toolbar>
                      <v-card-text>
                        <div class="pt-6">
                          {{ $t('userSurveyManagement.SurveyOverview.LoeschenDerUmfrage_1') }} {{ umfrage.bezeichnung }} {{ $t('userSurveyManagement.SurveyOverview.LoeschenDerUmfrage_2') }}
                        </div>
                      </v-card-text>

                      <v-divider />

                      <v-card-actions>
                        <v-spacer />
                        <v-btn
                          color="primary"
                          text
                          @click="removeSurvey(index, umfrage._id)"
                        >
                          {{ $t('userSurveyManagement.SurveyOverview.LoeschenBestaetigen') }}
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </template>
              </v-col>
            </v-row>

            <template v-if="$vuetify.breakpoint.mobile">
              <v-row>
                <v-col
                  class="pa-0"
                  style="display: flex; flex-wrap: wrap; gap:12px"
                >
                  <!-- Mit diesem Button sollen ausgewählte Umfragen dupliziert werden können. -->
                  <v-btn
                    class="mx-2"
                    outlined
                    text
                    color="primary"
                    @click="duplicateSurvey(index, umfrage._id)"
                  >
                    <v-icon class="mr-1">
                      mdi-content-copy
                    </v-icon>
                    {{ $t('common.Duplizieren') }}
                  </v-btn>

                  <!-- Umfrage löschen -->
                  <v-dialog
                    v-model="deleteSurvey[index]"
                    transition="dialog-bottom-transition"
                    :max-width="constants.v_dialog_max_width"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <!-- Mit diesem Button sollen ausgewählte Umfragen gelöscht werden können. -->
                      <v-btn
                        class="mx-2 pl-1"
                        outlined
                        text
                        color="delete"
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon>
                          mdi-delete-outline
                        </v-icon>
                        {{ $t('common.Loeschen') }}
                      </v-btn>
                    </template>

                    <v-card>
                      <v-toolbar
                        color="primary"
                        dark
                      >
                        {{ $t('userSurveyManagement.SurveyOverview.LoeschenDerUmfrage_0') }}
                      </v-toolbar>
                      <v-card-text>
                        <div class="pt-6">
                          {{ $t('userSurveyManagement.SurveyOverview.LoeschenDerUmfrage_1') }} {{ umfrage.bezeichnung }} {{ $t('userSurveyManagement.SurveyOverview.LoeschenDerUmfrage_2') }}
                        </div>
                      </v-card-text>

                      <v-divider />

                      <v-card-actions>
                        <v-spacer />
                        <v-btn
                          color="primary"
                          text
                          @click="removeSurvey(index, umfrage._id)"
                        >
                          {{ $t('userSurveyManagement.SurveyOverview.LoeschenBestaetigen') }}
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-col>
              </v-row>
            </template>
          </v-container>
        </v-card-actions>

        <v-alert
          v-show="errors[index]"
          type="error"
        >
          {{ message }}
        </v-alert>
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
import EditSurvey from "./EditSurvey.vue";
import SurveyEvaluation from "../evaluation/SurveyEvaluation.vue";
import CopyButton from '../componentParts/CopyButton.vue';
import LinkSharingComponent from "../componentParts/LinkSharingComponent";
import i18n from "../../i18n";
import constants from "../../const.js";

export default {
  components: {
    EditSurvey,
    SurveyEvaluation,
    CopyButton,
    LinkSharingComponent,
  },

  data: () => ({
    constants: constants,
    umfragen: [],
    deleteSurvey: [],
    dialog: [], 
    dialogAuswertung: [],
    shareDialog: [],
    errors: [],
    message: "",

    notifications: false,
    sound: true,
    widgets: true,
    anteilMitarbeiterUmfrage: 40,

    // base url for Mitarbeiterumfragen
    mitarbeiterumfrageBaseURL: process.env.VUE_APP_URL + '/survey/',
    umfrageTeilenBaseURL: process.env.VUE_APP_URL + '/share/',
  }),

  computed:{
    theme(){
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    }
  },

  created() {
    this.fetchUmfragenForUser();
  },

  methods: {
    /**
     * Loescht eine Umfrage nach Nutzerbestaetigung
     */
    async removeSurvey(index, umfrageID) {
      var ret = this.deleteUmfrage(index, umfrageID)
      if(ret) {
        this.umfragen.splice(index, 1)
        this.deleteSurvey.splice(index, 1)
        this.dialog.splice(index, 1)
        this.dialogAuswertung.splice(index,1)
        this.errors.splice(index, 1)
      }
      return
    },

    /**
     * Dupliziert eine Umfrage nach Nutzerbestaetigung
     */
      async duplicateSurvey(index, umfrageID) {
      await this.duplicateUmfrage(index, umfrageID)
    
      if(!this.errors[index]){
        this.fetchUmfragenForUser()
      }

      return
    },

    /**
     * Closes v-dialog with dialog as v-model
     */
    closeDialog(index) {
      this.fetchUmfragenForUser()
      this.$set(this.dialog, index, false)
    },

    /**
     * Closes v-dialog with dialogAuswertung as v-model
     */
    closeDialogAuswertung(index) {
      this.fetchUmfragenForUser()
      this.$set(this.dialogAuswertung, index, false)
    },

    fetchUmfragenForUser: async function () {
    await fetch(process.env.VUE_APP_BASEURL + "/umfrage/alleUmfragenVonNutzer", {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + this.$keycloak.token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.data.umfragen !== null) {
          this.umfragen = data.data.umfragen;
        } else {
          this.umfragen = []
        }
        
        this.dialog = new Array(this.umfragen.length).fill(false)
        this.dialogAuswertung = new Array(this.umfragen.length).fill(false)
        this.errors = new Array(this.umfragen.length).fill(false)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    },

    /**
     * Loescht die Umfrage mit der gegebenen ID, gibt false bei error, true bei success zurueck
     */
    deleteUmfrage: async function (index, umfrageID) {
      await fetch(process.env.VUE_APP_BASEURL + "/umfrage", {
      method: "DELETE",
      headers: {
        "Authorization": "Bearer " + this.$keycloak.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        umfrageID: umfrageID,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.status === "error") {
          this.errors[index] = true
          this.message = data.error.message
          return false
        }
        return true
      })
      .catch((error) => {
        this.errors[index] = true
        this.message = i18n.t('SurveyOverview.ServerNichtErreichbar')
        console.error("Error:", error);
        return false
      });
    },

    /**
     * Dupliziert die Umfrage mit der gegebenen ID, gibt false bei error, true bei success zurueck
     */
    duplicateUmfrage: async function (index, umfrageID) {
      await fetch(process.env.VUE_APP_BASEURL + "/umfrage/duplicate?id=" + umfrageID, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + this.$keycloak.token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.status === "error") {
          this.errors[index] = true
          this.message = data.error.message
          return false
        }
        return true
      })
      .catch((error) => {
        this.errors[index] = true
        this.message = i18n.t('SurveyOverview.ServerNichtErreichbar')
        console.error("Error:", error);
        return false
      });
    },
  }
}
  
</script>

<style lang="scss">
  .headerClass{
    white-space: wrap;
    word-break: normal;
    display: block;
    hyphens: auto;
  }
</style>