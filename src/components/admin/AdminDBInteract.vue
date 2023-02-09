<template>
  <v-container>
    <v-card class="px-0 pb-2">
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
        <v-row>
          <v-col
            cols="3"
            class="mx-4"
          >
            Monitoring:
          </v-col>
          <v-col class="mx-4">
            <a
              href="https://cloud.mongodb.com/freemonitoring/cluster/FJISZV76EW3BHYEPQZKEOLCQTMZ457BD"
              target="_blank"
            >https://cloud.mongodb.com/freemonitoring/cluster/FJISZV76EW3BHYEPQZKEOLCQTMZ457BD</a>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <v-card class="px-0 pb-4 mt-2">
      <v-card-title class="mx-4">
        Eintragen von Daten
      </v-card-title>

      <v-alert
        class="mx-4"
        type="warning"
        border="bottom"
        colored-border
        elevation="3"
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
        focusable
        class="px-4 pb-4 mt-2"
      >
        <!-- Add CO2 factors to the database -->
        <v-expansion-panel>
          <v-expansion-panel-header>
            <label>
              Neuen CO<sub>2</sub>-Faktor für Energie hinzufügen
              <Tooltip tooltip-text="Hiermit can ein CO2-Faktor für Energie für ein bestimmtes Jahr eingetargen werden. Es sind alle Jahre von 2018 bis zum letzten Jahr möglich. Zusätzlich wird zwischen Faktoren für die Energiearten und der TU Darmstadt oder von extern ist." />
            </label>
          </v-expansion-panel-header>

          <v-expansion-panel-content>
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

            <v-card-actions>
              <v-col class="text-left">
                <v-btn
                  color="primary"
                  @click="sendFactor"
                >
                  Absenden
                </v-btn>
              </v-col>
            </v-card-actions>

            <v-card
              v-if="displaySuccess[0] || displayLoadingAnimation[0] || displayError[0]"
              elevation="2"
            >
              <LoadingAnimation v-if="displayLoadingAnimation[0]" />
              <v-alert
                v-if="displaySuccess[0]"
                type="success"
              >
                {{ successMessage[0] }}
              </v-alert>
              <v-alert
                v-if="displayError[0]"
                type="error"
              >
                {{ errorMessage[0] }}
              </v-alert>
            </v-card>
          </v-expansion-panel-content>
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
        focusable
        class="px-4 pb-4 mt-2"
      >
        <!-- Add a new building to the database -->
        <v-expansion-panel>
          <v-expansion-panel-header>
            <label> 
              Gebäude hinzufügen 
              <Tooltip tooltip-text="Hiermit lässt sich ein neues Gebäude in die Datenbank einfügen. Es wird eine eindeutige Gebäudenummer sowie eine Gebäudebezeichnung benötigt. Zusätzlich muss die Fläche des Gebäudes angegebnen werden. Falls ein Wert nicht vorliegt, soll 0 als Wert eigentragen werden. Ist das Gebäude an einen externen Versorger angeschlossen, so können die entsprechenden Jahre angegeben werden. Dafür muss die Checkbox ausgewählt sein und die Jahre seit 2018 als komma-seperierte in das entsprechende Feld eingetragen werden.  " />
            </label>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
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
                  Geben sie die Jahre seit 2018 an, für die das Gebäude einen externe Versorger hatte. Eingabe als komma-seperierte Liste and
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
                type="success"
              >
                {{ successMessage[1] }}
              </v-alert>
              <v-alert
                v-if="displayError[1]"
                type="error"
              >
                {{ errorMessage[1] }}
              </v-alert>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <!-- Add external suppliers to a building -->
        <v-expansion-panel>
          <v-expansion-panel-header>
            <label>
              Versorger für Gebäude hinzufügen
              <Tooltip tooltip-text="Hiermit kann für ein bestehendes Gebäude der Versorger für ein Jahr zwischen 2018 und dem letzten Jahr festgelegt werden, solange noch kein Versorger angegebn ist. Bei Versorgern wird zwischen der TU Darmstadt und jeglichen anderen, externen Versorger unterschieden. Ebenso sind die Versorger von verschiedenen Energiearten getrennt voneinander aufgeführt. Um das Gebäude zu identifizieren, wird die eindeutige Gebäudenummer verwendet." />
            </label>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
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
                type="success"
              >
                {{ successMessage[4] }}
              </v-alert>
              <v-alert
                v-if="displayError[4]"
                type="error"
              >
                {{ errorMessage[4] }}
              </v-alert>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <!-- Add default external suppliers to buildings that don't have a supplier for a specific year -->
        <v-expansion-panel>
          <v-expansion-panel-header>
            <label>
              Standard Versorger für alle Gebäude hinzufügen
              <Tooltip tooltip-text="Hiermit lässt sich für alle in der Datenbank vorhanden Gebäude der Standard-Versorger TU Darmstadt für ein bestimmtes Jahr eintragen. Der Wert wird bei allen Gebäuden und für alle Energiearten eingetragen, wenn noch kein Versorger für das spezifizierte Jahr angegeben wurde. Als Jahre stehen alle Jahre zwischen 2018 und dem letzten Jahr zur Verfügung." />
            </label>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
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
                type="success"
              >
                {{ successMessage[5] }}
              </v-alert>
              <v-alert
                v-if="displayError[5]"
                type="error"
              >
                {{ errorMessage[5] }}
              </v-alert>
            </v-card>
          </v-expansion-panel-content>
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
        focusable
        class="px-4 mt-2"
      >
        <!-- Add a new counter to the database -->
        <v-expansion-panel>
          <v-expansion-panel-header>
            <label>
              Neuen Zähler hinzufügen
              <Tooltip tooltip-text="Hiermit kan ein neuer Zähler in die Datenbank eingetragen werden. Dazu wird die eindeutige Nummer des Zählers benötigt. Weitere angaben sind die Zählereinheit, den Zählertyp, und die Bezeichnung. Referenzen zu Gebäude, zu denen der Zähler gehört, können durch die zusätzlichen Felder eingetragen werden. Standardmäßig wird einem Zähler für alle Jahre von 2018 bis zum letzten Jahr der Wert 0 als Zählerstand eingetragen." />
            </label>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-text-field
              v-model="counter.primary_key"
              :rules="notNegativeRule"
              label="Primary Key des Zählers"
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
                <v-col cols="9">
                  <v-text-field
                    v-model="building_reference[0]"
                    :rules="basicRule"
                    label="Gebäudereferenz"
                  />
                </v-col>
                <v-col>
                  <v-btn
                    class="add_text--text"
                    color="add"
                    @click="newBuildingRef()"
                  >
                    Hinzufügen
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn
                    class="delete_text--text"
                    color="delete"
                    @click="removeBuildingRef(i)"
                  >
                    Löschen
                  </v-btn>
                </v-col>
              </v-row>
            </div>

            <v-card-actions>
              <v-col class="text-left">
                <v-btn
                  color="primary"
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
                type="success"
              >
                {{ successMessage[2] }}
              </v-alert>
              <v-alert
                v-if="displayError[2]"
                type="error"
              >
                {{ errorMessage[2] }}
              </v-alert>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <!-- Set counter value for specific counter -->
        <v-expansion-panel>
          <v-expansion-panel-header>
            <label>
              Zählerdaten für Zähler hinzufügen
              <Tooltip tooltip-text="Hiermit kann einem bestehenden Zähler ein Zählerstand stand für ein Jahr zwischen 2018 und dem letzten Jahr eingetragen werden. Dazu wird die eindeutige Zählernummer und der Zählertyp benötigt. Ist der Zähler nicht vorhanden oder ist für das angegeben Jahr schon ein Wert (außer 0) eingetragen, schlägt die Operation fehl." />
            </label>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-autocomplete
              v-model="counter_data.year"
              :items="possibleYears"
              label="Bilanzierungsjahr"
              prepend-icon="mdi-calendar-question"
            />

            <v-text-field
              v-model="counter_data.primary_key"
              :rules="notNegativeRule"
              label="Primary Key des Zählers"
            />

            <v-select
              v-model="counter_data.energy_type"
              :items="energy_types"
              flat
              label="Zählertyp"
            />

            <v-text-field
              v-model="counter_data.value"
              :rules="notNegativeRule"
              label="Zählerwert"
            />

            <v-card-actions>
              <v-col class="text-left">
                <v-btn
                  color="primary"
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
                type="success"
              >
                {{ successMessage[3] }}
              </v-alert>
              <v-alert
                v-if="displayError[3]"
                type="error"
              >
                {{ errorMessage[3] }}
              </v-alert>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <!-- Set default counter values for all counters that don't have a value in a given year -->
        <v-expansion-panel>
          <v-expansion-panel-header>
            <label>
              Standard Zählerdaten für alle Zähler hinzufügen
              <Tooltip tooltip-text="Hiermit kann allen Zähler in der Datenbank der Standardwert 0 für ein Jahr zwischen 2018 und dem letzten Jahr eingetragen werden. Dies funktioniert nur bei Zählern, die für das angegebene Jahr noch keine Zählerstand eingetragen haben." />
            </label>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-autocomplete
              v-model="default_counter_data.year"
              :items="possibleYears"
              label="Bilanzierungsjahr"
              prepend-icon="mdi-calendar-question"
            />

            <v-card-actions>
              <v-col class="text-left">
                <v-btn
                  color="primary"
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
                type="success"
              >
                {{ successMessage[6] }}
              </v-alert>
              <v-alert
                v-if="displayError[6]"
                type="error"
              >
                {{ errorMessage[6] }}
              </v-alert>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <!-- CSV parser for sending a bunch of counter values -->
        <v-expansion-panel>
          <v-expansion-panel-header>
            <label>
              Zählerdaten mittels CSV-Datei hinzufügen
              <Tooltip tooltip-text="Hiermit lassen sich Zählerdaten mittels einer CSV-Datei direkt aus dem EMS in die Datenbank übertragen. Das Jahr von welchem die Daten kommen, muss angegeben werden, damit die richtigen Daten aus der CSV gelesen werden. Sollte ein Fehler bei einem Zähler auftreten, wird dieser angezeigt. Die anderen Zähler sind von diesem Fehler nicht behindert und deren Daten werden erfolgreich eingetragen. Eine Anleitung zu auslesen der Daten aus dem EMS ist über den Button im Extension Panel verfügbar." />
            </label>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row>
              <v-col>
                <v-autocomplete
                  v-model="csv_counter_data.year"
                  :items="possibleYears"
                  label="Bilanzierungsjahr"
                  prepend-icon="mdi-calendar-question"
                />
              </v-col>
            </v-row>
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

            <v-card-actions>
              <v-col class="text-left">
                <v-btn
                  color="primary"
                  @click="parseFile"
                >
                  Absenden
                </v-btn>
              </v-col>
              <v-spacer />
              <v-col class="text-right">
                <v-dialog
                  v-model="dialog"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      v-on="on"
                    >
                      EMS Anleitung
                    </v-btn>
                  </template>

                  <v-card>
                    <v-card-title class="text-h5 grey lighten-2">
                      Daten aus dem EMS auslesen
                    </v-card-title>

                    <v-card-text style="white-space: pre-wrap">
                      <p
                        class="mb-0 mt-4" 
                        style="color: black;font-size: medium;"
                      >
                        1. Ganz oben auf "Auswertung", dann auf "Werte und Korrekturen" <br>
                        2. Links an der Seite auf "Werte", dann "Alle Zähler" und "Alle - Zähler" <br>
                        3. In der obersten Zeile der Tabelle folgendes auswählen: <br>
                      </p>
                      <table
                        class="mx-6"
                        style="color: black;font-size: medium;"
                      >
                        <tr>
                          <th />
                          <th>Wärmezähler</th>
                          <th>Kältezähler</th>
                          <th>Stromzähler</th>
                        </tr>
                        <tr>
                          <td><b>Name</b></td>
                          <td>*HE000*</td>
                          <td>*KA000*</td>
                          <td>*NA000*</td>
                        </tr>
                        <tr>
                          <td><b>Quellklasse</b></td>
                          <td>CSV, Formel</td>
                          <td>CSV, EDLs</td>
                          <td>verschiedene</td>
                        </tr>
                        <tr>
                          <td><b>Einheit</b></td>
                          <td>MWh, kWh</td>
                          <td>MWh, kWh</td>
                          <td>MWh, kWh</td>
                        </tr>
                      </table>
                      <p
                        class="mb-0 mt-0" 
                        style="color: black;font-size: medium;"
                      >
                        4. Dann alle Zähler auswählen und "Datenpunkte selektieren" klicken. <br>
                        5. In ausgewählte Datenpunkte können ungewollte Zähler über "-" wieder entfernt werden. <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&#x2022; z.B. "Eigenverbrauch" muss raus <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&#x2022; Insgesamt sollten es 114 Wärmezähler, (?) Stromzähler und 19 Kältezähler sein (Stand 05.02.2023)  <br>
                        6. Sind alle ungewollten Zähler entfernt, dann auf "Werte anzeigen" klicken. <br>
                        7. Ganz oben "Aggregationsmodus" und "Zeitintervall" einstellen. <br>
                        8. Unten in der Zeile auf Export (CSV), um Zählerdaten in CSV herunterladen.
                      </p>                   
                    </v-card-text>
                  </v-card>
                </v-dialog>
              </v-col>
            </v-card-actions>

            <v-card
              v-if="displaySuccess[7] || displayLoadingAnimation[7] || displayError[7]"
              elevation="2"
            >
              <LoadingAnimation v-if="displayLoadingAnimation[7]" />
              <v-alert 
                v-if="displayError[7]"
                type="error"
                style="white-space: pre-wrap"
              >
                {{ errorMessage[7] }}
              </v-alert>
              <v-alert 
                v-if="displaySuccess[7]"
                type="success"
              >
                {{ successMessage[7] }}
              </v-alert>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </v-container>
</template>

<script>
import Tooltip from "@/components/componentParts/Tooltip.vue";
import LoadingAnimation from "../componentParts/LoadingAnimation.vue";
import Cookies from "../Cookie"

export default {
  components: {
    Tooltip,
    LoadingAnimation
  },

  data: () => ({
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
      primary_key: null,
      unit: '',
      energy_type: '',
      name: null,
      building_references: [[null]]
    },
    counter_data: {
      year: '',
      primary_key: null,
      energy_type: '',
      value: null
    },
    default_counter_data: {
      year: '',
    },
    contracts: ['TU Darmstadt', 'Extern'],
    contract_map: new Map([['TU Darmstadt', 1], ['Extern', 2]]),
    energy_types: ['Wärme', 'Strom', 'Kälte'],
    energy_map: new Map([['Wärme', 1], ['Strom', 2], ['Kälte', 3]]),
    units: ['kWh', 'MWh'],

    displaySuccess: [false, false, false, false, false, false, false, false],
    displayError: [false, false, false, false, false, false, false, false],
    displayLoadingAnimation: [false, false, false, false, false, false, false, false], 

    errorMessage: ["", "", "", "", "", "", "", ""],
    successMessage: ["", "", "", "", "", "", "", ""],

    chosenFile: null,
    csv_counter_data: {
      year: '',
      primary_keys: null,
      energy_types: null,
      values: null
    },

    dialog: false,

    // arrays contain counters and buildings that are explicitly left out
    // reasons are given in BP_Berechnungsformeln.pdf
    irrelevant_counters: [2104, 2105, 2106, 2256, 3613, 3614, 2102, 2377, 2378, 4193, 4194, 3576, 3966, 3960, 6697, 3789, 2558, 2560],
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
      (v) => parseInt(v) > 2017 || "Bitte geben Sie ein valides Jahr an",
    ],

  }),

  computed: {
    /**
    * Returns a list beginning with last year until 2018.
    */
    possibleYears: function () {
      const beginningYear = 2018;
      let lastYear = new Date().getFullYear() - 1;
      return Array.from(new Array(lastYear - beginningYear + 1), (x, i) => i + beginningYear).reverse();
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
      this.$set(this.displaySuccess, 0, false)
      this.$set(this.displayError, 0, false)
      this.$set(this.displayLoadingAnimation, 0, true)

      if(!this.co2_factor.year || !this.co2_factor.energy_type || !this.co2_factor.value || !this.co2_factor.contract){
        this.$set(this.errorMessage, 0, "Alle Felder müssen ausgefüllt sein")
        this.$set(this.displayLoadingAnimation, 0, false)
        this.$set(this.displayError, 0, true)

        return
      }

      await fetch(process.env.VUE_APP_BASEURL + "/db/addFaktor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          authToken: {
            username: Cookies.getCookieAttribut('username'),
            sessiontoken: Cookies.getCookieAttribut('sessiontoken'),
          },
          idEnergieversorgung: this.energy_map.get(this.co2_factor.energy_type),
          idVertrag: this.contract_map.get(this.co2_factor.contract),
          jahr: parseInt(this.co2_factor.year),
          wert: parseInt(this.co2_factor.value),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if(data.status == "success"){
            this.$set(this.successMessage, 0, "Der CO2-Faktor wurde erfolgreich in der Datenbank gespeichert.")
            this.$set(this.displayLoadingAnimation, 0, false)
            this.$set(this.displaySuccess, 0, true)
          }
          else if(data.status == "error"){
            this.$set(this.errorMessage, 0, "Code " + data.error.code + ": " + data.error.message)
            this.$set(this.displayLoadingAnimation, 0, false)
            this.$set(this.displayError, 0, true)
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
      this.$set(this.displaySuccess, 1, false)
      this.$set(this.displayError, 1, false)
      this.$set(this.displayLoadingAnimation, 1, true)

      if(!this.building.number || !this.building.name || !this.building.hnf || !this.building.nnf  || !this.building.ngf || 
         !this.building.ff || !this.building.vf || !this.building.freif || !this.building.gesamtf){
        this.$set(this.errorMessage, 1, "Gebäudenummer, Gebäudebezeichnung und Flächen müssen ausgefüllt sein!")
        this.$set(this.displayLoadingAnimation, 1, false)
        this.$set(this.displayError, 1, true)

        return
      }

      if(this.irrelevant_buildings.includes(parseInt(this.building.number))){
        this.$set(this.errorMessage, 1, "Das Gebäude " + this.building.number + " wurde explizit ausgeschlossen!")
        this.$set(this.displayLoadingAnimation, 1, false)
        this.$set(this.displayError, 1, true)

        return
      }

      var warmth_supplier = []
      var cold_supplier = []
      var electricity_supplier = []

      const beginningYear = 2018
      let currentYear = new Date().getFullYear()

      function numberfilter (num) {
        return !!num && num >= beginningYear && num <= currentYear
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

      await fetch(process.env.VUE_APP_BASEURL + "/db/insertGebaeude", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          authToken: {
            username: Cookies.getCookieAttribut('username'),
            sessiontoken: Cookies.getCookieAttribut('sessiontoken'),
          },
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
            this.$set(this.successMessage, 1, "Das Gebäude wurde erfolgreich in der Datenbank gespeichert.")
            this.$set(this.displayLoadingAnimation, 1, false)
            this.$set(this.displaySuccess, 1, true)
          }
          else if(data.status == "error"){
            this.$set(this.errorMessage, 1, "Code " + data.error.code + ": " + data.error.message)
            this.$set(this.displayLoadingAnimation, 1, false)
            this.$set(this.displayError, 1, true)
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
      this.$set(this.displaySuccess, 4, false)
      this.$set(this.displayError, 4, false)
      this.$set(this.displayLoadingAnimation, 4, true)

      if(!this.supplier.number || !this.supplier.year || !this.supplier.energy_type || !this.supplier.contract){
        this.$set(this.errorMessage, 4, "Alle Felder müssen ausgefüllt sein")
        this.$set(this.displayLoadingAnimation, 4, false)
        this.$set(this.displayError, 4, true)

        return
      }

      await fetch(process.env.VUE_APP_BASEURL + "/db/addVersorger", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          authToken: {
            username: Cookies.getCookieAttribut('username'),
            sessiontoken: Cookies.getCookieAttribut('sessiontoken'),
          },
          nr: parseInt(this.supplier.number),
          idEnergieversorgung: this.energy_map.get(this.supplier.energy_type),
          idVertrag: this.contract_map.get(this.supplier.contract),
          jahr: parseInt(this.supplier.year),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if(data.status == "success"){
            this.$set(this.successMessage, 4, "Der Versorger wurde erfolgreich in der Datenbank gespeichert.")
            this.$set(this.displayLoadingAnimation, 4, false)
            this.$set(this.displaySuccess, 4, true)
          }
          else if(data.status == "error"){
            this.$set(this.errorMessage, 4, "Code " + data.error.code + ": " + data.error.message)
            this.$set(this.displayLoadingAnimation, 4, false)
            this.$set(this.displayError, 4, true)
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
      this.$set(this.displaySuccess, 5, false)
      this.$set(this.displayError, 5, false)
      this.$set(this.displayLoadingAnimation, 5, true)

      if(!this.default_supplier.year){
        this.$set(this.errorMessage, 5, "Alle Felder müssen ausgefüllt sein")
        this.$set(this.displayLoadingAnimation, 5, false)
        this.$set(this.displayError, 5, true)

        return
      }

      await fetch(process.env.VUE_APP_BASEURL + "/db/addStandardVersorger", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          authToken: {
            username: Cookies.getCookieAttribut('username'),
            sessiontoken: Cookies.getCookieAttribut('sessiontoken'),
          },
          jahr: parseInt(this.default_supplier.year),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if(data.status == "success"){
            this.$set(this.successMessage, 5, "Für alle Gebäude ohne Versorger wurde die TU Darmstadt als Versorger eingetragen.")
            this.$set(this.displayLoadingAnimation, 5, false)
            this.$set(this.displaySuccess, 5, true)
          }
          else if(data.status == "error"){
            this.$set(this.errorMessage, 5, "Code " + data.error.code + ": " + data.error.message)
            this.$set(this.displayLoadingAnimation, 5, false)
            this.$set(this.displayError, 5, true)
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
      this.$set(this.displaySuccess, 2, false)
      this.$set(this.displayError, 2, false)
      this.$set(this.displayLoadingAnimation, 2, true)

      if(!this.counter.primary_key || !this.counter.unit || !this.counter.energy_type ||
         !this.counter.name || this.buildingRefJSON().length === 0){
        this.$set(this.errorMessage, 2, "Alle Felder müssen ausgefüllt sein")
        this.$set(this.displayLoadingAnimation, 2, false)
        this.$set(this.displayError, 2, true)

        return
      }

      await fetch(process.env.VUE_APP_BASEURL + "/db/insertZaehler", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          authToken: {
            username: Cookies.getCookieAttribut('username'),
            sessiontoken: Cookies.getCookieAttribut('sessiontoken'),
          },
          pkEnergie: parseInt(this.counter.primary_key),
          idEnergieversorgung: this.energy_map.get(this.counter.energy_type),
          bezeichnung: this.counter.name,
          einheit: this.counter.unit,
          gebaeudeRef: this.buildingRefJSON(),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if(data.status == "success"){
            this.$set(this.successMessage, 2, "Der Zähler wurde erfolgreich in der Datenbank gespeichert.")
            this.$set(this.displayLoadingAnimation, 2, false)
            this.$set(this.displaySuccess, 2, true)
          }
          else if(data.status == "error"){
            this.$set(this.errorMessage, 2, "Code " + data.error.code + ": " + data.error.message)
            this.$set(this.displayLoadingAnimation, 2, false)
            this.$set(this.displayError, 2, true)
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
      this.$set(this.displaySuccess, 3, false)
      this.$set(this.displayError, 3, false)
      this.$set(this.displayLoadingAnimation, 3, true)

      if(!this.counter_data.year || !this.counter_data.primary_key || !this.counter_data.energy_type || !this.counter_data.value){
        this.$set(this.errorMessage, 3, "Alle Felder müssen ausgefüllt sein")
        this.$set(this.displayLoadingAnimation, 3, false)
        this.$set(this.displayError, 3, true)

        return
      }

      await fetch(process.env.VUE_APP_BASEURL + "/db/addZaehlerdaten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          authToken: {
            username: Cookies.getCookieAttribut('username'),
            sessiontoken: Cookies.getCookieAttribut('sessiontoken'),
          },
          pkEnergie: parseInt(this.counter_data.primary_key),
          idEnergieversorgung: this.energy_map.get(this.counter_data.energy_type),
          jahr: parseInt(this.counter_data.year),
          wert: parseFloat(this.counter_data.value),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if(data.status == "success"){
            this.$set(this.successMessage, 3, "Die Zählerdaten wurden erfolgreich in der Datenbank gespeichert.")
            this.$set(this.displayLoadingAnimation, 3, false)
            this.$set(this.displaySuccess, 3, true)
          }
          else if(data.status == "error"){
            this.$set(this.errorMessage, 3, "Code " + data.error.code + ": " + data.error.message)
            this.$set(this.displayLoadingAnimation, 3, false)
            this.$set(this.displayError, 3, true)
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
      this.$set(this.displaySuccess, 6, false)
      this.$set(this.displayError, 6, false)
      this.$set(this.displayLoadingAnimation, 6, true)

      if(!this.default_counter_data.year){
        this.$set(this.errorMessage, 6, "Alle Felder müssen ausgefüllt sein")
        this.$set(this.displayLoadingAnimation, 6, false)
        this.$set(this.displayError, 6, true)

        return
      }

      await fetch(process.env.VUE_APP_BASEURL + "/db/addStandardZaehlerdaten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          authToken: {
            username: Cookies.getCookieAttribut('username'),
            sessiontoken: Cookies.getCookieAttribut('sessiontoken'),
          },
          jahr: parseInt(this.default_counter_data.year),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if(data.status == "success"){
            this.$set(this.successMessage, 6, "Für alle Zähler von Wert für " + this.default_counter_data.year + " wurde 0 als Zählerwert eingetragen.")
            this.$set(this.displayLoadingAnimation, 6, false)
            this.$set(this.displaySuccess, 6, true)
          }
          else if(data.status == "error"){
            this.$set(this.errorMessage, 6, "Code " + data.error.code + ": " + data.error.message)
            this.$set(this.displayLoadingAnimation, 6, false)
            this.$set(this.displayError, 6, true)
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
      this.$set(this.displaySuccess, 7, false)
      this.$set(this.displayError, 7, false)
      this.$set(this.displayLoadingAnimation, 7, true)

      // reset object for data
      this.csv_counter_data.primary_keys = null
      this.csv_counter_data.energy_types = null
      this.csv_counter_data.values = null

      if(!this.chosenFile){
        this.$set(this.errorMessage, 7, "No File selected")
        this.$set(this.displayLoadingAnimation, 7, false)
        this.$set(this.displayError, 7, true)

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

      var parsedFile = await new Promise(
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

      parsedFile.data.forEach(
        arr => {
          if (arr[0] == "PrimaryKey"){
            this.csv_counter_data.primary_keys = arr.slice(1).map(
              (elem) => {return parseInt(elem)}
            )
          }
          if (arr[0] == "DPName"){
            this.csv_counter_data.energy_types = arr.slice(1).map(
              (elem) => {
                if (elem.indexOf('HE000') !== -1){
                  return 1;
                }
                else if (elem.indexOf('NA000') !== -1){
                  return 2;
                }
                else if (elem.indexOf('KA000') !== -1){
                  return 3;
                }
                else{
                  this.$set(this.errorMessage, 7, "Zählertype des Zählers mit der Bezeichung " + elem + " ist nicht bekannt!!")
                  this.$set(this.displayLoadingAnimation, 7, false)
                  this.$set(this.displayError, 7, true)
                }
              }
            )
          }
          if (arr[0] == "01.01." + this.csv_counter_data.year + " 00:00:00"){
            this.csv_counter_data.values = arr.slice(1).map(
              (elem) => {return !elem ? 0 : parseFloat(elem.replace(",", "."))}
            )
          }
        }
      )

      if (!this.csv_counter_data.year || !this.csv_counter_data.primary_keys || !this.csv_counter_data.energy_types || !this.csv_counter_data.values
          || this.csv_counter_data.primary_keys.length != this.csv_counter_data.energy_types.length || this.csv_counter_data.energy_types.length != this.csv_counter_data.values.length){
        this.$set(this.errorMessage, 7, "CSV Datei konnte nicht korrekt gelesen werden!")
        this.$set(this.displayLoadingAnimation, 7, false)
        this.$set(this.displayError, 7, true)

        return
      }

      var mask = this.csv_counter_data.primary_keys.map(x => !this.irrelevant_counters.includes(x))
      console.log(this.csv_counter_data.primary_keys.filter((elem, index) => !mask[index]))

      this.csv_counter_data.primary_keys = this.csv_counter_data.primary_keys.filter((elem, index) => mask[index])
      this.csv_counter_data.energy_types = this.csv_counter_data.energy_types.filter((elem, index) => mask[index])
      this.csv_counter_data.values = this.csv_counter_data.values.filter((elem, index) => mask[index])

      if (this.csv_counter_data.primary_keys.length != this.csv_counter_data.energy_types.length || this.csv_counter_data.energy_types.length != this.csv_counter_data.values.length){
        this.$set(this.errorMessage, 7, "CSV Datei konnte nicht korrekt gelesen werden!")
        this.$set(this.displayLoadingAnimation, 7, false)
        this.$set(this.displayError, 7, true)

        return
      }
      
      if (!this.displayError[7]){
        // send request
        this.sendCSVCounterData()
      }
    },

    /**
     * send parsed CSV file to db
     */
    sendCSVCounterData: async function(){
      await fetch(process.env.VUE_APP_BASEURL + "/db/addZaehlerdatenCSV", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          authToken: {
            username: Cookies.getCookieAttribut('username'),
            sessiontoken: Cookies.getCookieAttribut('sessiontoken'),
          },
          pkEnergie: this.csv_counter_data.primary_keys,
          idEnergieversorgung: this.csv_counter_data.energy_types,
          jahr: this.csv_counter_data.year,
          wert: this.csv_counter_data.values,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if(data.status == "success"){
            this.$set(this.successMessage, 7, "Die Zählerdaten wurden erfolgreich in der Datenbank gespeichert.")
            this.$set(this.displayLoadingAnimation, 7, false)
            this.$set(this.displaySuccess, 7, true)
          }
          else if(data.status == "error"){
            this.$set(this.errorMessage, 7, "Code " + data.error.code + ": " + data.error.message)
            this.$set(this.displayLoadingAnimation, 7, false)
            this.$set(this.displayError, 7, true)
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
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}
th, td {
  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: 4px;
  padding-right: 4px;
}
</style>