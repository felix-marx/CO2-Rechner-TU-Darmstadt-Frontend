<template>
  <v-container>
    <v-card
      class="px-0 pb-2 mx-auto"
      :max-width="constants.v_card_max_width"
    >
      <v-card-title
        class="mx-4"
      >
        Datenbankinformationen
      </v-card-title>
      <v-divider />
      <v-container>
        <v-row>
          <v-col
            cols="3"
            class="mx-4"
          >
            Datenbankversion:
          </v-col>
          <v-col class="mx-4">
            MongoDB v5.0.6
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <v-card
      class="px-0 pb-4 mt-2 mx-auto"
      :max-width="constants.v_card_max_width"
    >
      <v-card-title class="mx-4">
        Eintragen von Daten
      </v-card-title>

      <v-alert
        class="mx-4 mb-4"
        type="warning"
        border-color
        elevation="3"
        variant="tonal"
      >
        Bei Dezimalzahlen muss ein Punkt als Dezimaltrenner verwendet werden!
      </v-alert>

      <v-divider />

      <p
        class="px-4 mt-4 mx-4"
        align="center"
      >
        <strong>CO<sub>2</sub>-Faktoren</strong>
      </p>

      <v-expansion-panels
        class="px-4 pb-4 mt-2"
        multiple
      >
        <!-- Add CO2 factors to the database -->
        <v-expansion-panel focusable>
          <v-expansion-panel-title>
            <div>
              <label>
                Neuen CO<sub>2</sub>-Faktor für Energie hinzufügen
              </label>
              <Tooltip
                :tooltip-text="'Hiermit kann ein CO2-Faktor für Energie für ein bestimmtes Jahr eingetragen werden. Es sind alle Jahre von ' + constants.beginningYear + ' bis zum letzten Jahr möglich. Zusätzlich wird zwischen Faktoren den Energiearten und dem Versorger (TU Darmstadt oder extern) unterschieden.'"
              />
            </div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-autocomplete
              v-model="co2_factor.year"
              :items="possibleYears"
              label="Bilanzierungsjahr"
              prepend-icon="mdi-calendar-question"
            />

            <v-select
              v-model="co2_factor.energy_type"
              :items="energy_types"
              flat
              label="Energieart"
            />

            <v-select
              v-model="co2_factor.contract"
              :items="contracts"
              flat
              label="Versorger"
            />

            <v-text-field
              v-model="co2_factor.value"
              :rules="notNegativeRule"
              label="Wert des CO2-Faktors in g/kWh"
            >
              <template #label>
                <label>Wert des CO<sub>2</sub>-Faktors in g/kWh</label>
              </template>
            </v-text-field>
            
            <v-col
              class="pt-0"
              cols="3"
            >
              <v-btn
                color="primary"
                variant="outlined"
                @click="sendFactor"
              >
                Absenden
              </v-btn>
            </v-col>

            <v-card
              v-if="displaySuccess[0] || displayLoadingAnimation[0] || displayError[0]"
              elevation="2"
            >
              <LoadingAnimation v-if="displayLoadingAnimation[0]" />
              <v-alert
                v-if="displaySuccess[0]"
                variant="tonal"
                type="success"
              >
                {{ successMessage[0] }}
              </v-alert>
              <v-alert
                v-if="displayError[0]"
                variant="tonal"
                type="error"
              >
                {{ errorMessage[0] }}
              </v-alert>
            </v-card>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-divider />

      <p
        class="px-4 mt-4"
        align="center"
      >
        <strong>Gebäude</strong>
      </p>

      <v-expansion-panels
        class="px-4 pb-4 mt-2"
        multiple
      >
        <!-- Add a new building to the database -->
        <v-expansion-panel focusable>
          <v-expansion-panel-title>
            <div>
              <label> 
                Gebäude hinzufügen 
              </label>
              <Tooltip 
                :tooltip-text="'Hiermit lässt sich ein neues Gebäude in die Datenbank einfügen. Es wird eine eindeutige Gebäudenummer sowie eine Gebäudebezeichnung benötigt. Zusätzlich muss die Fläche des Gebäudes angegebnen werden. Falls ein Wert nicht vorliegt, soll 0 als Wert eigentragen werden. Ist das Gebäude an einen externen Versorger angeschlossen, so können die entsprechenden Jahre angegeben werden. Dafür muss die Checkbox ausgewählt sein und die Jahre seit ' + constants.beginningYear + ' als kommaseparierte in das entsprechende Feld eingetragen werden.'" 
              />
            </div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-row>
              <v-col cols="11">
                <v-text-field
                  v-model="building.number"
                  label="Gebäudenummer"
                  :rules="basicRule"
                />
              </v-col>
              <v-col align-self="center">
                <Tooltip
                  tooltip-text="4 Ziffern: Die 1. Ziffer für den Campus (1=Stadtmitte, 2=Botanischer Garten, 
                3=Lichtwiese, 4=Hochschulstadion und 5=Windkanal/August-Euler-Flugplatz). Die Ziffer 2-4 für die 
                Gebäudenummer. Zum Beispiel 1101 für das Universitätszentrum."
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="11">
                <v-text-field
                  v-model="building.name"
                  label="Gebäudebezeichnung"
                  :rules="basicRule"
                />
              </v-col>
              <v-col align-self="center">
                <Tooltip
                  tooltip-text="Eindeutige Bezeichnung des Gebäudes. Zum Beispiel 'Maschinenhaus'."
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  v-model="building.hnf"
                  label="Hauptnutzungsfläche in qm"
                  :rules="notNegativeRule"
                />
              </v-col>
              <v-col>
                <v-text-field
                  v-model="building.nnf"
                  label="Nebennutzungsfläche in qm"
                  :rules="notNegativeRule"
                />
              </v-col>
              <v-col>
                <v-text-field
                  v-model="building.ngf"
                  label="Nettogrundfläche in qm"
                  :rules="notNegativeRule"
                />
              </v-col>
              <v-col>
                <v-text-field
                  v-model="building.ff"
                  label="Funktionsfläche in qm"
                  :rules="notNegativeRule"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="building.vf"
                  label="Verkehrsfläche in qm"
                  :rules="notNegativeRule"
                />
              </v-col>
              <v-col>
                <v-text-field
                  v-model="building.freif"
                  label="Freifläche in qm"
                  :rules="notNegativeRule"
                />
              </v-col>
              <v-col>
                <v-text-field
                  v-model="building.gesamtf"
                  label="Gesamtfläche in qm"
                  :rules="notNegativeRule"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-checkbox
                  v-model="external_supplier"
                  label="Hat das Gebäude externe Versorger?"
                />
              </v-col>
            </v-row>
            <v-row v-if="external_supplier">
              <v-col>
                <p>
                  Geben sie die Jahre seit {{ constants.beginningYear }} an, für die das Gebäude einen externe Versorger hatte. Eingabe als kommaseparierte Liste.
                </p>
              </v-col>
            </v-row>
            <v-row v-if="external_supplier">
              <v-col>
                <v-text-field
                  v-model="building.warmth"
                  label="Externe Wärmeversorger"
                />
              </v-col>
            </v-row>
            <v-row v-if="external_supplier">
              <v-col>
                <v-text-field
                  v-model="building.cold"
                  label="Externe Kälteversorger"
                />
              </v-col>
            </v-row>
            <v-row v-if="external_supplier">
              <v-col>
                <v-text-field
                  v-model="building.electricity"
                  label="Externe Stromversorger"
                />
              </v-col>
            </v-row>

            <v-card-actions>
              <v-col class="text-left">
                <v-btn
                  color="primary"
                  variant="outlined"
                  @click="sendNewBuilding"
                >
                  Absenden
                </v-btn>
              </v-col>
            </v-card-actions>

            <v-card
              v-if="displaySuccess[1] || displayLoadingAnimation[1] || displayError[1]"
              elevation="2"
            >
              <LoadingAnimation v-if="displayLoadingAnimation[1]" />
              <v-alert
                v-if="displaySuccess[1]"
                variant="tonal"
                type="success"
              >
                {{ successMessage[1] }}
              </v-alert>
              <v-alert
                v-if="displayError[1]"
                variant="tonal"
                type="error"
              >
                {{ errorMessage[1] }}
              </v-alert>
            </v-card>
          </v-expansion-panel-text>
        </v-expansion-panel>

        <!-- Add external suppliers to a building -->
        <v-expansion-panel focusable>
          <v-expansion-panel-title>
            <div>
              <label>
                Externe Versorger für Gebäude hinzufügen
              </label>
              <Tooltip
                :tooltip-text="'Hiermit kann für ein bestehendes Gebäude der Versorger für ein Jahr zwischen ' + constants.beginningYear + ' und dem letzten Jahr festgelegt werden, solange noch kein Versorger angegeben ist. Bei Versorgern wird zwischen der TU Darmstadt und jeglichen anderen, externen Versorger unterschieden. Ebenso sind die Versorger von verschiedenen Energiearten getrennt voneinander aufgeführt. Um das Gebäude zu identifizieren, wird die eindeutige Gebäudenummer verwendet.'"
              />
            </div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-row>
              <v-col cols="11">
                <v-text-field
                  v-model="supplier.number"
                  label="Gebäudenummer"
                  :rules="basicRule"
                />
              </v-col>
              <v-col align-self="center">
                <Tooltip
                  tooltip-text="4 Ziffern: Die 1. Ziffer für den Campus (1=Stadtmitte, 2=Botanischer Garten, 
                3=Lichtwiese, 4=Hochschulstadion und 5=Windkanal/August-Euler-Flugplatz). Die Ziffer 2-4 für die 
                Gebäudenummer. Zum Beispiel 1101 für das Universitätszentrum."
                />
              </v-col>
            </v-row>

            <v-autocomplete
              v-model="supplier.year"
              :items="possibleYears"
              label="Bilanzierungsjahr"
              prepend-icon="mdi-calendar-question"
            />

            <v-select
              v-model="supplier.energy_type"
              :items="energy_types"
              flat
              label="Energieart"
            />

            <v-select
              v-model="supplier.contract"
              :items="contracts"
              flat
              label="Versorger"
            />

            <v-card-actions>
              <v-col class="text-left">
                <v-btn
                  color="primary"
                  variant="outlined"
                  @click="sendSupplier"
                >
                  Absenden
                </v-btn>
              </v-col>
            </v-card-actions>

            <v-card
              v-if="displaySuccess[4] || displayLoadingAnimation[4] || displayError[4]"
              elevation="2"
            >
              <LoadingAnimation v-if="displayLoadingAnimation[4]" />
              <v-alert
                v-if="displaySuccess[4]"
                variant="tonal"
                type="success"
              >
                {{ successMessage[4] }}
              </v-alert>
              <v-alert
                v-if="displayError[4]"
                variant="tonal"
                type="error"
              >
                {{ errorMessage[4] }}
              </v-alert>
            </v-card>
          </v-expansion-panel-text>
        </v-expansion-panel>

        <!-- Add default external suppliers to buildings that don't have a supplier for a specific year -->
        <v-expansion-panel focusable>
          <v-expansion-panel-title>
            <div>
              <label>
                Standard Versorger für alle Gebäude hinzufügen
              </label>
              <Tooltip
                :tooltip-text="'Hiermit lässt sich für alle in der Datenbank vorhanden Gebäude der Standard-Versorger TU Darmstadt für ein bestimmtes Jahr eintragen. Der Wert wird bei allen Gebäuden und für alle Energiearten eingetragen, wenn noch kein Versorger für das spezifizierte Jahr angegeben wurde. Als Jahre stehen alle Jahre zwischen ' + constants.beginningYear + ' und dem letzten Jahr zur Verfügung.'"
              />
            </div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-row>
              <v-col>
                <v-autocomplete
                  v-model="default_supplier.year"
                  :items="possibleYears"
                  label="Bilanzierungsjahr"
                  prepend-icon="mdi-calendar-question"
                />
              </v-col>
            </v-row>

            <v-card-actions>
              <v-col class="text-left">
                <v-btn
                  color="primary"
                  variant="outlined"
                  @click="sendDefaultSupplier"
                >
                  Absenden
                </v-btn>
              </v-col>
            </v-card-actions>

            <v-card
              v-if="displaySuccess[5] || displayLoadingAnimation[5] || displayError[5]"
              elevation="2"
            >
              <LoadingAnimation v-if="displayLoadingAnimation[5]" />
              <v-alert
                v-if="displaySuccess[5]"
                variant="tonal"
                type="success"
              >
                {{ successMessage[5] }}
              </v-alert>
              <v-alert
                v-if="displayError[5]"
                variant="tonal"
                type="error"
              >
                {{ errorMessage[5] }}
              </v-alert>
            </v-card>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-divider />

      <p
        class="px-4 mt-4"
        align="center"
      >
        <strong>Zähler</strong>
      </p>

      <v-expansion-panels
        class="px-4 mt-2"
        multiple
      >
        <!-- Add a new counter to the database -->
        <v-expansion-panel focusable>
          <v-expansion-panel-title>
            <div>
              <label>
                Neuen Zähler hinzufügen
              </label>
              <Tooltip
                :tooltip-text="'Hiermit kann ein neuer Zähler in die Datenbank eingetragen werden. Dazu wird die eindeutige Nummer des Zählers benötigt. Weitere Angaben sind die Zählereinheit, den Zählertyp, und die Bezeichnung. Referenzen zu Gebäude, zu denen der Zähler gehört, können durch die zusätzlichen Felder eingetragen werden. Standardmäßig wird einem Zähler für alle Jahre von ' + constants.beginningYear + ' bis zum letzten Jahr der Wert 0 als Zählerstand eingetragen.'"
              />
            </div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-text-field
              v-model="counter.dp_name"
              :rules="basicRule"
              label="DPName des Zählers"
            />

            <v-select
              v-model="counter.unit"
              :items="units"
              flat
              label="Zählereinheit"
            />

            <v-select
              v-model="counter.energy_type"
              :items="energy_types"
              flat
              label="Zählertyp"
            />

            <v-text-field
              v-model="counter.name"
              :rules="basicRule"
              label="Bezeichnung des Zählers"
            />

            <div
              v-for="(building_reference, i) in counter.building_references"
              :key="'Gebäudereferenz-' + i"
            >
              <v-row>
                <v-col cols="11">
                  <v-text-field
                    v-model="building_reference[0]"
                    :rules="basicRule"
                    label="Gebäudereferenz"
                  />
                </v-col>
                <v-col>
                  <v-btn
                    class="delete_text--text mx-auto mt-1"
                    color="delete"
                    icon="mdi-delete-outline"
                    @click="removeBuildingRef(i)"
                  />
                </v-col>
              </v-row>
            </div>

            <v-row>
              <v-col>
                <v-btn
                  class="add_text--text pl-2"
                  color="add"
                  @click="newBuildingRef()"
                >
                  <v-icon>
                    mdi-plus
                  </v-icon>
                  {{ $t('userSurvey.Survey.gebaeudeHinzufuegen') }}
                </v-btn>
              </v-col>
            </v-row>
            

            <v-card-actions>
              <v-col class="text-left">
                <v-btn
                  color="primary"
                  variant="outlined"
                  @click="sendNewCounter"
                >
                  Absenden
                </v-btn>
              </v-col>
            </v-card-actions>

            <v-card
              v-if="displaySuccess[2] || displayLoadingAnimation[2] || displayError[2]"
              elevation="2"
            >
              <LoadingAnimation v-if="displayLoadingAnimation[2]" />
              <v-alert
                v-if="displaySuccess[2]"
                variant="tonal"
                type="success"
              >
                {{ successMessage[2] }}
              </v-alert>
              <v-alert
                v-if="displayError[2]"
                variant="tonal"
                type="error"
              >
                {{ errorMessage[2] }}
              </v-alert>
            </v-card>
          </v-expansion-panel-text>
        </v-expansion-panel>

        <!-- Set counter value for specific counter -->
        <v-expansion-panel focusable>
          <v-expansion-panel-title>
            <div>
              <label>
                Zählerdaten für Zähler hinzufügen
              </label>
              <Tooltip
                :tooltip-text="'Hiermit kann einem bestehenden Zähler ein Zählerstand für ein Jahr zwischen ' + constants.beginningYear + ' und dem letzten Jahr eingetragen werden. Dazu wird die eindeutige Zählernummer und der Zählertyp benötigt. Ist der Zähler nicht vorhanden oder ist für das angegeben Jahr schon ein Wert (außer 0) eingetragen, schlägt die Operation fehl.'"
              />
            </div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-container>
              <v-row>
                <v-col cols="6">
                  <v-autocomplete
                    v-model="counter_data.year"
                    :items="possibleYears"
                    label="Bilanzierungsjahr"
                    prepend-icon="mdi-calendar-question"
                  />
                </v-col>
                <v-col cols="6">
                  <v-autocomplete
                    v-model="counter_data.month"
                    :items="months"
                    label="Monat"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-text-field
                  v-model="counter_data.dp_name"
                  :rules="basicRule"
                  label="DPName des Zählers"
                />
              </v-row>
              <v-row>
                <v-select
                  v-model="counter_data.energy_type"
                  :items="energy_types"
                  flat
                  label="Zählertyp"
                />
              </v-row>
              <v-row>
                <v-text-field
                  v-model="counter_data.value"
                  :rules="notNegativeRule"
                  label="Zählerwert"
                />
              </v-row>
            </v-container>

            <v-card-actions>
              <v-col class="text-left">
                <v-btn
                  color="primary"
                  variant="outlined"
                  @click="sendCounterData"
                >
                  Absenden
                </v-btn>
              </v-col>
            </v-card-actions>

            <v-card
              v-if="displaySuccess[3] || displayLoadingAnimation[3] || displayError[3]"
              elevation="2"
            >
              <LoadingAnimation v-if="displayLoadingAnimation[3]" />
              <v-alert
                v-if="displaySuccess[3]"
                variant="tonal"
                type="success"
              >
                {{ successMessage[3] }}
              </v-alert>
              <v-alert
                v-if="displayError[3]"
                variant="tonal"
                type="error"
              >
                {{ errorMessage[3] }}
              </v-alert>
            </v-card>
          </v-expansion-panel-text>
        </v-expansion-panel>

        <!-- Set default counter values for all counters that don't have a value in a given year -->
        <v-expansion-panel focusable>
          <v-expansion-panel-title>
            <div>
              <label>
                Standard Zählerdaten für alle Zähler hinzufügen
              </label>
              <Tooltip
                :tooltip-text="'Hiermit kann allen Zähler in der Datenbank der Standardwert 0 für ein Jahr zwischen ' + constants.beginningYear + ' und dem letzten Jahr eingetragen werden. Dies funktioniert nur bei Zählern, die für das angegebene Jahr noch keine Zählerstand eingetragen haben.'"
              />
            </div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-container>
              <v-row>
                <v-col cols="6">
                  <v-autocomplete
                    v-model="default_counter_data.year"
                    :items="possibleYears"
                    label="Bilanzierungsjahr"
                    prepend-icon="mdi-calendar-question"
                  />
                </v-col>
                <v-col cols="6">
                  <v-autocomplete
                    v-model="default_counter_data.month"
                    :items="months"
                    label="Monat"
                  />
                </v-col>
              </v-row>
            </v-container>

            <v-card-actions>
              <v-col class="text-left">
                <v-btn
                  color="primary"
                  variant="outlined"
                  @click="sendDefaultCounterData"
                >
                  Absenden
                </v-btn>
              </v-col>
            </v-card-actions>

            <v-card
              v-if="displaySuccess[6] || displayLoadingAnimation[6] || displayError[6]"
              elevation="2"
            >
              <LoadingAnimation v-if="displayLoadingAnimation[6]" />
              <v-alert
                v-if="displaySuccess[6]"
                variant="tonal"
                type="success"
              >
                {{ successMessage[6] }}
              </v-alert>
              <v-alert
                v-if="displayError[6]"
                variant="tonal"
                type="error"
              >
                {{ errorMessage[6] }}
              </v-alert>
            </v-card>
          </v-expansion-panel-text>
        </v-expansion-panel>

        <!-- CSV parser for sending a bunch of counter values -->
        <v-expansion-panel focusable>
          <v-expansion-panel-title>
            <div>
              <label>
                Zählerdaten mittels CSV-Datei hinzufügen
              </label>
              <Tooltip
                tooltip-text="Hiermit lassen sich Zählerdaten mittels einer CSV-Datei direkt aus dem EMS in die Datenbank übertragen. Das Jahr von welchem die Daten kommen, muss angegeben werden, damit die richtigen Daten aus der CSV gelesen werden. Sollte ein Fehler bei einem Zähler auftreten, wird dieser angezeigt. Die anderen Zähler sind von diesem Fehler nicht behindert und deren Daten werden erfolgreich eingetragen. Eine Anleitung zu auslesen der Daten aus dem EMS ist über den Button 'EMS Anleitung' verfügbar. Unwichtige Zähler werden aus der CSV-Datei herausgefilter."
              />
            </div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-row>
              <v-col>
                <v-file-input
                  v-model="chosenFile"
                  accept=".csv"
                  label="Click here to select a .csv file"
                  chips
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-select
                  v-model="csvEnergyType"
                  :items="energy_types"
                  flat
                  label="Zählertyp"
                />
              </v-col>
            </v-row>

            <v-card-actions>
              <v-col class="text-left">
                <v-dialog
                  v-model="dialogParseFile"
                  :max-width="constants.v_dialog_max_width"
                >
                  <template #activator="{ props }">
                    <v-btn
                      variant="outlined"
                      color="primary"
                      v-bind="props"
                      @click="parseFile"
                    >
                      Parse File
                    </v-btn>
                  </template>

                  <v-card>
                    <v-card-title class="text-h5 bg-grey-lighten-2">
                      Parsing CSV Datei
                    </v-card-title>
                    <v-card-text>
                      <template v-if="displaySuccess[7] || displayLoadingAnimation[7] || displayError[7]">
                        <LoadingAnimation v-if="displayLoadingAnimation[7]" />
                        <v-alert 
                          v-if="displayError[7]"
                          variant="tonal"
                          type="error"
                          style="white-space: pre-wrap"
                        >
                          {{ errorMessage[7] }}
                        </v-alert>
                        <v-alert 
                          v-if="displaySuccess[7]"
                          variant="tonal"
                          type="success"
                        >
                          {{ successMessage[7] }}
                        </v-alert>
                      </template>
                      <template v-else>
                        <v-container>
                          <v-row>
                            <v-col class="pb-0">
                              <p class="text-body-2 text-black">
                                Wählen Sie die Monate aus, die Sie in die Datenbank eintragen möchten:
                              </p>
                            </v-col>
                          </v-row>
                          <v-row
                            v-for="(counterValuesDate, index) in counterValuesDates"
                            :key="index"
                          >
                            <v-col class="py-0">
                              <v-checkbox
                                v-model="counterValuesToSent[index]"
                                :label="counterValuesDate"
                                density="compact"
                                hide-details="true"
                              />
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col class="pt-0">
                              <v-btn
                                color="primary"
                                variant="outlined"
                                @click="sendCSVCounterData"
                              >
                                Absenden
                              </v-btn>
                            </v-col>
                          </v-row>
                        </v-container>  
                      </template>
                    </v-card-text>
                  </v-card>
                </v-dialog>
              </v-col>
              <v-spacer />
              <v-col class="text-right">
                <v-dialog
                  v-model="dialogEMS"
                  :max-width="constants.v_dialog_max_width"
                >
                  <template #activator="{ props }">
                    <v-btn
                      variant="outlined"
                      v-bind="props"
                    >
                      EMS Anleitung
                    </v-btn>
                  </template>

                  <v-card>
                    <v-card-title class="text-h5 bg-grey-lighten-2">
                      Daten aus dem EMS auslesen
                    </v-card-title>

                    <v-card-text style="white-space: pre-wrap">
                      <p
                        class="mb-0 mt-4 text-body-2 text-black"
                      >
                        Die Zählerdaten können aus dem EMS ausgelesen werden. Dazu müssen folgende Schritte durchgeführt werden: <br>
                        1. Im EMS anmelden <br>
                        2. Oben im Menü auf "Auswertungen" dann "Visualisierungen" <br>
                        3. Links im Menü auf "Alle Einträge anzeigen" <br>
                        4. Unter "Name" nach folgenden Graphen suchen: <br>
                      </p>
                      <v-table 
                        class="mt-0 mb-1 ml-4"
                      >
                        <template #default>
                          <thead>
                            <tr>
                              <th>Zählerart</th>
                              <th>Graphenname</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Wärmezähler</td>
                              <td>Fernwaerme_Gebaeudeebene_monatlich</td>
                            </tr>
                          </tbody>
                          <tbody>
                            <tr>
                              <td>Kältezähler</td>
                              <td>TUDA_KMZ_monatlich</td>
                            </tr>
                          </tbody>
                          <tbody>
                            <tr>
                              <td>Stromzähler</td>
                              <td>Strom_FA_kWh_monatlich</td>
                            </tr>
                          </tbody>
                        </template>
                      </v-table>
                      <p
                        class="mb-0 mt-0 text-body-2 text-black"
                      >
                        5. Graph auswählen und auf "Vorschau" klicken <br>
                        6. Zeitintervall unten entpsrechned einstellen <br>
                        7. CSV Datei über "Daten als Datei exportieren" oben rechts im Graphen herunterladen <br>
                      </p>                   
                    </v-card-text>
                  </v-card>
                </v-dialog>
              </v-col>
            </v-card-actions>

            <v-card
              v-if="(displaySuccess[7] || displayLoadingAnimation[7] || displayError[7]) && !dialogParseFile"
              elevation="2"
            >
              <LoadingAnimation v-if="displayLoadingAnimation[7]" />
              <v-alert 
                v-if="displayError[7]"
                variant="tonal"
                type="error"
                style="white-space: pre-wrap"
              >
                {{ errorMessage[7] }}
              </v-alert>
              <v-alert 
                v-if="displaySuccess[7]"
                variant="tonal"
                type="success"
              >
                {{ successMessage[7] }}
              </v-alert>
            </v-card>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </v-container>
</template>

<script>
import Tooltip from "@/components/componentParts/Tooltip.vue";
import LoadingAnimation from "@/components/componentParts/LoadingAnimation.vue";
import constants from "@/const.js";

export default {
  components: {
    Tooltip,
    LoadingAnimation
  },

  data: () => ({
    constants: constants,
    date: null,
    co2_factor: {
      year: '',
      energy_type: '',
      contract: '',
      value: null
    },
    building: {
      number: null,
      name: null,
      hnf: null,
      nnf: null,
      ngf: null,
      ff: null,
      vf: null,
      freif: null,
      gesamtf: null,
      warmth: '',
      cold: '',
      electricity: '',
    },
    external_supplier: false,
    supplier: {
      building_number: null,
      year: '',
      energy_type: '',
      contract: '',
    },
    default_supplier: {
      year: '',
    },
    counter: {
      dp_name: null,
      unit: '',
      energy_type: '',
      name: null,
      building_references: [[null]]
    },
    counter_data: {
      year: '',
      month: '',
      dp_name: null,
      energy_type: '',
      value: null
    },
    default_counter_data: {
      year: '',
      month: '',
    },
    contracts: ['TU Darmstadt', 'Extern'],
    contract_map: new Map([['TU Darmstadt', 1], ['Extern', 2]]),
    energy_types: ['Wärme', 'Strom', 'Kälte'],
    energy_map: new Map([['Wärme', 1], ['Strom', 2], ['Kälte', 3]]),
    units: ['kWh', 'MWh'],
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],

    displaySuccess: [false, false, false, false, false, false, false, false],
    displayError: [false, false, false, false, false, false, false, false],
    displayLoadingAnimation: [false, false, false, false, false, false, false, false], 

    errorMessage: ["", "", "", "", "", "", "", ""],
    successMessage: ["", "", "", "", "", "", "", ""],

    chosenFile: null,
    csvEnergyType: null,
    parsedFile: null,
    counterValuesDates: [],
    counterValuesToSent: [],
    csv_counter_data: {
      years: [],
      months: [],
      dp_names: [],
      energy_types: [],
      values: []
    },

    dialogEMS: false,
    dialogParseFile: false,

    // arrays contain counters and buildings that are explicitly left out
    // reasons are given in BP_Berechnungsformeln.pdf
    irrelevant_counters: ["S473XXXXXXHE000XXXXXXZ40CO00001",
                          "S475XXXXXXHE000XXXXXXZ40CO00001",
                          "S476XXXXXXHE000XXXXXXZ40CO00001",
                          "S477XXXXXXHE000XXXXXXZ40CO00001",
                          "S479XXXXXXHE000XXXXXXZ40CO00001",
                          "S480XXXXXXHE000XXXXXXZ40CO00001",
                          "S481XXXXXXHE000XXXXXXZ40CO00001"],
    irrelevant_buildings: [1473, 1475, 1476, 1477, 1479, 1480, 1481, 1213],
    
    //Rules for input validation
    basicRule: [
      (v) => !!v || "Muss angegeben werden",
    ],
    notNegativeRule: [
      v => !!v || "Muss angegeben werden",
      v => (parseInt(v) >= 0) || "Bitte geben Sie eine nicht-negative Zahl an"
    ],
    yearRule: [
      (v) => !!v || "Muss angegeben werden",
      (v) => parseInt(v) >= constants.beginningYear || "Bitte geben Sie ein valides Jahr an",
    ],

  }),

  computed: {
    /**
    * Returns a list containing the years between constants.beginningYear and last year.
    */
    possibleYears: function () {
      let lastYear = new Date().getFullYear() - 1;
      return Array.from(new Array(lastYear - constants.beginningYear + 1), (x, i) => i + constants.beginningYear).reverse();
    },
  },

  methods: {
    /**
     * Adds a new building reference to this counter
     */
    newBuildingRef() {
      this.counter.building_references.push([
        null
      ])
    },

    /**
     * Removes the building reference at index i from the counter
     */
    removeBuildingRef(i) {
      if (i >= 0 && this.counter.building_references.length > i) {
        this.counter.building_references.splice(i, 1)
        //When the only element is removed add a new, thereby clearing the values of the fields on the webpage
        if (this.counter.building_references.length === 0) {
          this.newBuildingRef()
        }
      }
    },

    /**
     * sends CO2 factor as a json file to db
     */
    sendFactor: async function () {
      this.displaySuccess[0] = false
      this.displayError[0] = false
      this.displayLoadingAnimation[0] = true

      if(!this.co2_factor.year || !this.co2_factor.energy_type || !this.co2_factor.value || !this.co2_factor.contract){
        this.errorMessage[0] = "Alle Felder müssen ausgefüllt sein"
        this.displayLoadingAnimation[0] = false
        this.displayError[0] = true

        return
      }

      await fetch(import.meta.env.VITE_BASEURL + "/db/addFaktor", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + this.$keycloak.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idEnergieversorgung: this.energy_map.get(this.co2_factor.energy_type),
          idVertrag: this.contract_map.get(this.co2_factor.contract),
          jahr: parseInt(this.co2_factor.year),
          wert: parseInt(this.co2_factor.value),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if(data.status == "success"){
            this.successMessage[0] = "Der CO2-Faktor wurde erfolgreich in der Datenbank gespeichert."
            this.displayLoadingAnimation[0] = false
            this.displaySuccess[0] = true
          }
          else if(data.status == "error"){
            this.errorMessage[0] = "Code " + data.error.code + ": " + data.error.message
            this.displayLoadingAnimation[0] = false
            this.displayError[0] = true
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },

    /**
     * sends new building as a json file to db
     */
    sendNewBuilding: async function () {
      this.displaySuccess[1] = false
      this.displayError[1] = false
      this.displayLoadingAnimation[1] = true

      if(!this.building.number || !this.building.name || !this.building.hnf || !this.building.nnf  || !this.building.ngf || 
         !this.building.ff || !this.building.vf || !this.building.freif || !this.building.gesamtf){
        this.errorMessage[1] = "Gebäudenummer, Gebäudebezeichnung und Flächen müssen ausgefüllt sein!"
        this.displayLoadingAnimation[1] = false
        this.displayError[1] = true

        return
      }

      if(this.irrelevant_buildings.includes(parseInt(this.building.number))){
        this.errorMessage[1] = "Das Gebäude " + this.building.number + " wurde explizit ausgeschlossen!"
        this.displayLoadingAnimation[1] = false
        this.displayError[1] = true

        return
      }

      var warmth_supplier = []
      var cold_supplier = []
      var electricity_supplier = []

      let currentYear = new Date().getFullYear()

      function numberfilter (num) {
        return !!num && num >= constants.beginningYear && num <= currentYear
      }

      if (this.external_supplier) {
        if (this.building.warmth){
          warmth_supplier = this.building.warmth.split(',').map((str) => {return parseInt(str, 10)})
        }
        if (this.building.cold){
          cold_supplier = this.building.cold.split(',').map((str) => {return parseInt(str, 10)})
        }
        if (this.building.electricity){
          electricity_supplier = this.building.electricity.split(',').map((str) => {return parseInt(str, 10)})
        }

        warmth_supplier = warmth_supplier.filter(numberfilter)
        cold_supplier = cold_supplier.filter(numberfilter)
        electricity_supplier = electricity_supplier.filter(numberfilter)
      }

      await fetch(import.meta.env.VITE_BASEURL + "/db/insertGebaeude", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + this.$keycloak.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nr: parseInt(this.building.number),
          bezeichnung: this.building.name,
          flaeche: {
            hnf: parseFloat(this.building.hnf),
            nnf: parseFloat(this.building.nnf),
            ngf: parseFloat(this.building.ngf),
            ff: parseFloat(this.building.ff),
            vf: parseFloat(this.building.vf),
            freif: parseFloat(this.building.freif),
            gesamtf: parseFloat(this.building.gesamtf),
          },
          waerme_versorger_jahre: warmth_supplier,
          kaelte_versorger_jahre: cold_supplier,
          strom_versorger_jahre: electricity_supplier,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if(data.status == "success"){
            this.successMessage[1] = "Das Gebäude wurde erfolgreich in der Datenbank gespeichert."
            this.displayLoadingAnimation[1] = false
            this.displaySuccess[1] = true
          }
          else if(data.status == "error"){
            this.errorMessage[1] = "Code " + data.error.code + ": " + data.error.message
            this.displayLoadingAnimation[1] = false
            this.displayError[1] = true
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },

    /**
     * send supplier to db
     */
    sendSupplier: async function () {
      this.displaySuccess[4] = false
      this.displayError[4] = false
      this.displayLoadingAnimation[4] = true

      if(!this.supplier.number || !this.supplier.year || !this.supplier.energy_type || !this.supplier.contract){
        this.errorMessage[4] = "Alle Felder müssen ausgefüllt sein"
        this.displayLoadingAnimation[4] = false
        this.displayError[4] = true

        return
      }

      await fetch(import.meta.env.VITE_BASEURL + "/db/addVersorger", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + this.$keycloak.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nr: parseInt(this.supplier.number),
          idEnergieversorgung: this.energy_map.get(this.supplier.energy_type),
          idVertrag: this.contract_map.get(this.supplier.contract),
          jahr: parseInt(this.supplier.year),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if(data.status == "success"){
            this.successMessage[4] = "Der Versorger wurde erfolgreich in der Datenbank gespeichert."
            this.displayLoadingAnimation[4] = false
            this.displaySuccess[4] = true
          }
          else if(data.status == "error"){
            this.errorMessage[4] = "Code " + data.error.code + ": " + data.error.message
            this.displayLoadingAnimation[4] = false
            this.displayError[4] = true
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },

    /**
     * send default supplier to db
     */
     sendDefaultSupplier: async function () {
      this.displaySuccess[5] = false
      this.displayError[5] = false
      this.displayLoadingAnimation[5] = true

      if(!this.default_supplier.year){
        this.errorMessage[5] = "Alle Felder müssen ausgefüllt sein"
        this.displayLoadingAnimation[5] = false
        this.displayError[5] = true

        return
      }

      await fetch(import.meta.env.VITE_BASEURL + "/db/addStandardVersorger", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + this.$keycloak.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jahr: parseInt(this.default_supplier.year),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if(data.status == "success"){
            this.successMessage[5] = "Für alle Gebäude ohne Versorger wurde die TU Darmstadt als Versorger eingetragen."
            this.displayLoadingAnimation[5] = false
            this.displaySuccess[5] = true
          }
          else if(data.status == "error"){
            this.errorMessage[5] = "Code " + data.error.code + ": " + data.error.message
            this.displayLoadingAnimation[5] = false
            this.displayError[5] = true
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },

    /**
     * sends new counter as a json file to db
     */
    sendNewCounter: async function () {
      this.displaySuccess[2] = false
      this.displayError[2] = false
      this.displayLoadingAnimation[2] = true

      if(!this.counter.dp_name || !this.counter.unit || !this.counter.energy_type ||
         !this.counter.name || this.buildingRefJSON().length === 0){
        this.errorMessage[2] = "Alle Felder müssen ausgefüllt sein"
        this.displayLoadingAnimation[2] = false
        this.displayError[2] = true

        return
      }

      await fetch(import.meta.env.VITE_BASEURL + "/db/insertZaehler", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + this.$keycloak.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dpName: this.counter.dp_name,
          idEnergieversorgung: this.energy_map.get(this.counter.energy_type),
          bezeichnung: this.counter.name,
          einheit: this.counter.unit,
          gebaeudeRef: this.buildingRefJSON(),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if(data.status == "success"){
            this.successMessage[2] = "Der Zähler wurde erfolgreich in der Datenbank gespeichert."
            this.displayLoadingAnimation[2] = false
            this.displaySuccess[2] = true
          }
          else if(data.status == "error"){
            this.errorMessage[2] = "Code " + data.error.code + ": " + data.error.message
            this.displayLoadingAnimation[2] = false
            this.displayError[2] = true
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },

    /**
     * sends counter data as a json file to db
     */
    sendCounterData: async function () {
      this.displaySuccess[3] = false
      this.displayError[3] = false
      this.displayLoadingAnimation[3] = true

      if(!this.counter_data.year || !this.counter_data.month || !this.counter_data.dp_name || !this.counter_data.energy_type || !this.counter_data.value){
        this.errorMessage[3] = "Alle Felder müssen ausgefüllt sein"
        this.displayLoadingAnimation[3] = false
        this.displayError[3] = true

        return
      }

      await fetch(import.meta.env.VITE_BASEURL + "/db/addZaehlerdaten", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + this.$keycloak.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dpName: this.counter_data.dp_name,
          idEnergieversorgung: this.energy_map.get(this.counter_data.energy_type),
          jahr: parseInt(this.counter_data.year),
          monat: parseInt(this.counter_data.month),
          wert: parseFloat(this.counter_data.value),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if(data.status == "success"){
            this.successMessage[3] = "Die Zählerdaten wurden erfolgreich in der Datenbank gespeichert."
            this.displayLoadingAnimation[3] = false
            this.displaySuccess[3] = true
          }
          else if(data.status == "error"){
            this.errorMessage[3] = "Code " + data.error.code + ": " + data.error.message
            this.displayLoadingAnimation[3] = false
            this.displayError[3] = true
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },

    /**
     * send default counter data to db
     */
    sendDefaultCounterData: async function () {
      this.displaySuccess[6] = false
      this.displayError[6] = false
      this.displayLoadingAnimation[6] = true

      if(!this.default_counter_data.year || !this.default_counter_data.month){
        this.errorMessage[6] = "Alle Felder müssen ausgefüllt sein"
        this.displayLoadingAnimation[6] = false
        this.displayError[6] = true

        return
      }

      await fetch(import.meta.env.VITE_BASEURL + "/db/addStandardZaehlerdaten", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + this.$keycloak.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jahr: parseInt(this.default_counter_data.year),
          monat: parseInt(this.default_counter_data.month),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if(data.status == "success"){
            this.successMessage[6] = "Allen Zählern wurde 0 als Zählerwert für " + this.default_counter_data.month + "." + this.default_counter_data.year + " eingetragen."
            this.displayLoadingAnimation[6] = false
            this.displaySuccess[6] = true
          }
          else if(data.status == "error"){
            this.errorMessage[6] = "Code " + data.error.code + ": " + data.error.message
            this.displayLoadingAnimation[6] = false
            this.displayError[6] = true
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },

    /**
     * parses the building references of a counter to integers
     */
    buildingRefJSON: function () {
      var buildingRefs = []

      for (var objekt of this.counter.building_references) {
        if (objekt[0] != null) {
          buildingRefs.push(
            parseInt(objekt[0]),
          )
        }
      }
      return buildingRefs
    },

    /**
     * parses a CSV file containing counter values
     */
    parseFile: async function () {
      this.displaySuccess[7] = false
      this.displayError[7] = false
      this.displayLoadingAnimation[7] = true

      // reset variables
      this.counterValuesDates = []
      this.counterValuesToSent = []
      this.parsedFile = null

      if(!this.chosenFile || !this.csvEnergyType){
        this.errorMessage[7] = "No File or Countertype selected"
        this.displayLoadingAnimation[7] = false
        this.displayError[7] = true

        return
      }

      /*{ Full config
        delimiter: "",	// auto-detect
        newline: "",	// auto-detect
        quoteChar: '"',
        escapeChar: '"',
        header: false,
        transformHeader: undefined,
        dynamicTyping: false,
        preview: 0,
        encoding: "",
        worker: false,
        comments: false,
        step: undefined,
        complete: undefined,
        error: undefined,
        download: false,
        downloadRequestHeaders: undefined,
        downloadRequestBody: undefined,
        skipEmptyLines: false,
        chunk: undefined,
        chunkSize: undefined,
        fastMode: undefined,
        beforeFirstChunk: undefined,
        withCredentials: undefined,
        transform: undefined,
        delimitersToGuess: [',', '\t', '|', ';', this.$papa.RECORD_SEP, this.$papa.UNIT_SEP]
      }*/

      this.parsedFile = await new Promise(
        resolve => {
          this.$papa.parse(
            this.chosenFile, 
            {
              delimiter: ";",
              complete: results => {resolve(results)},
            }
          )
        }
      )

      // check if csv is valid
      if (this.parsedFile.errors.length > 0 || this.parsedFile.data.length < 1 || this.parsedFile.data[0].length < 2) {
        this.errorMessage[7] = "Fehler beim Parsen der CSV-Datei: Keine Daten gefunden oder Format ist nicht wie erwartet."
        this.displayLoadingAnimation[7] = false
        this.displayError[7] = true

        return
      }

      this.parsedFile.data.forEach(element => {
        if (element[0] != "") {
          this.counterValuesDates.push(element[0])
          this.counterValuesToSent.push(false)
        }
      });

      this.displayLoadingAnimation[7] = false
    },

    /**
     * send parsed CSV file to db
     */
    sendCSVCounterData: async function(){
      this.dialogParseFile = false    // close dialog

      this.displaySuccess[7] = false
      this.displayError[7] = false
      this.displayLoadingAnimation[7] = true

      this.csv_counter_data = {
        years: [],
        months: [],
        dp_names: [],
        energy_types: [],
        values: []
      }

      let header = this.parsedFile.data[0]
      let data = this.parsedFile.data.slice(1)

      // extract DPNames from header
      let dp_names = []
      for (let i = 1; i < header.length; i++) {
        let dp_name_split = header[i].split("(")
        let dp_name = dp_name_split[dp_name_split.length - 1].split(")")[0]
        dp_names.push(dp_name)
      }

      // extract data
      for (let i = 0; i < data.length; i++) {
        if (this.counterValuesToSent[i]) {
          for (let j = 1; j < data[i].length; j++) {
            if (this.irrelevant_counters.includes(dp_names[j - 1])) {   // skip irrelevant counters
              continue
            }
            let year = parseInt(data[i][0].substring(6, 10))
            if (year < constants.beginningYear || year > new Date().getFullYear()) {
              this.errorMessage[7] = "Fehler beim Parsen der CSV-Datei: Ungültiges Jahr " + year
              this.displayLoadingAnimation[7] = false
              this.displayError[7] = true

              return
            }
            this.csv_counter_data.years.push(year)

            let month = parseInt(data[i][0].substring(3, 5))
            if (month < 1 || month > 12) {
              this.errorMessage[7] = "Fehler beim Parsen der CSV-Datei: Ungültiger Monat " + month
              this.displayLoadingAnimation[7] = false
              this.displayError[7] = true

              return
            }
            this.csv_counter_data.months.push(month)

            this.csv_counter_data.dp_names.push(dp_names[j - 1])

            if (data[i][j] == "") {
              this.csv_counter_data.values.push(0)
            } else {
              let value = parseFloat(data[i][j].replace(".", "").replace(",", "."))
              if (isNaN(value)) {
                this.errorMessage[7] = "Fehler beim Parsen der CSV-Datei: Ungültiger Wert " + data[i][j]
                this.displayLoadingAnimation[7] = false
                this.displayError[7] = true

                return
              }

              if (value < 0) {  // negative values are set to 0
                this.csv_counter_data.values.push(0)
              }
              else {
                this.csv_counter_data.values.push(value)
              }
            }

            this.csv_counter_data.energy_types.push(this.energy_map.get(this.csvEnergyType))
          }
        }
      }


      await fetch(import.meta.env.VITE_BASEURL + "/db/addZaehlerdatenCSV", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + this.$keycloak.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dpName: this.csv_counter_data.dp_names,
          idEnergieversorgung: this.csv_counter_data.energy_types,
          jahr: this.csv_counter_data.years,
          monat: this.csv_counter_data.months,
          wert: this.csv_counter_data.values,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if(data.status == "success"){
            this.successMessage[7] = "Die Zählerdaten wurden erfolgreich in der Datenbank gespeichert."
            this.displayLoadingAnimation[7] = false
            this.displaySuccess[7] = true
          }
          else if(data.status == "error"){
            this.errorMessage[7] = "Code " + data.error.code + ": " + data.error.message 
            this.displayLoadingAnimation[7] = false
            this.displayError[7] = true
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  },
}

</script>

<style>
tr:hover {
  background-color: transparent !important;
}
th {
  color: rgba(0, 0, 0, 0.6);
}
</style>