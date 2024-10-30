# Frontend des CO2 Rechners der TU Darmstadt

__Hinweis: Das Projekt wurde auf GitLab verschoben:__ [GitLab](https://git.rwth-aachen.de/thg-tuda/co2-rechner/CO2-Rechner-TU-Darmstadt-Frontend)

Hierbei handelt es sich um das Frontend des CO2 Rechners, welcher im Rahmen des Bachelorpraktikums für das Büro für Nachhaltigkeit und das Institut für Fluidsystemtechnik entwickelt wurde.

Dieses Projekt ermöglicht eine Erfassung von CO2 Emissionen von TU Einheiten und die anschließende Auswertung.

## Implementierte Funktionen

- Nutzendenverwaltung
- Umfrageerstellung für Verantwortliche von TU Einheiten
- Befragung von Mitarbeitenden der eigenen TU Einheit
- Verwaltung und Bearbeitung von erstellten Umfragen
- Auswertung von Umfragen und Teilen der Umfrageergebnisse
- Administrative Schnittstelle an Datenbank zum Eintragen von Daten
- Einsicht aller vorhandenen Umfragen durch administrative Benutzende

## Verwandte Projekte

Das Frontend kann nicht unabhängig betrieben werden.

Das Backend, welches als Controller und Schnittstelle zur Datenbank dient, ist hier einsehbar: [Github](https://github.com/Anhilly/co2-rechner-TU-Darmstadt-backend)  
Die Interaktionen zwischen Frontend und Backend sind in einer REST artigen API definiert, welche hier eingesehen werden kann: [Github](https://github.com/Anhilly/CO2-Rechner-api)

## Abhängigkeiten

Alle Abhängigkeiten des CO2-Rechners sind in der `package.json` zu finden. Die wichtigsten Abhängigkeiten werden im folgenden aufgeführt:

- [vue v3.4.11](https://vuejs.org/) - Framework für Webdarstellung
- [vue-router v4.4.0](https://router.vuejs.org/) - Routing von Seitenzugriffen
- [vuetify v3.6.13](https://vuetifyjs.com/en/) - Material Design UI Framework für einheitliche Darstellung
- [vite-plugin-vuetify v2.0.3](https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin) - Vuetify Plugin for Vite
- [core-js v3.37.1](https://github.com/zloirock/core-js) - Javascript für Eventhandling
- [vue-material-design-icons v5.3.0](https://github.com/robcresswell/vue-material-design-icons) - Material Design Icons zur Darstellung
- [chart.js v3.37.1](https://www.chartjs.org/) - Javascript Graphenframwork
- [chartjs-plugin-datalabels v2.2.0](https://chartjs-plugin-datalabels.netlify.app/) - Labeling Plugin für Graphen
- [vue-chartjs v5.3.1](https://vue-chartjs.org/) - Chartjs integration in Vue
- [file-saver v2.0.5](https://github.com/eligrey/FileSaver.js/) - clientseitiger Download von Auswertungen
- [xlsx v0.20.3](https://github.com/SheetJS/sheetjs) - Export von XLSX Dateien
- [vue-keycloak-js v2.4.0](https://github.com/dsb-norge/vue-keycloak-js) - Vue Keycloak Client
- [katex v0.16.11](https://github.com/KaTeX/KaTeX) - TeX Rendering
- [vue-katex v0.6.0-rc.7](https://www.npmjs.com/package/@hsorby/vue3-katex) - KaTeX in Vue
- [vue-i18n v9.13.1](https://github.com/kazupon/vue-i18n) - i18n für Vue
- [unplugin-vue-i18n v4.0.0](https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n) - Plugin zum Laden der Sprachen
- [vue-papa-parse v3.1.0](https://github.com/twickstrom/vue-papa-parse) - PapaParse zum Parsen von CSV Dateien


## Entwicklungssetup
Das Projekt wurde mit der Vite 5.3.5 mit Node.js v20.16.0 (LTS) erstellt.

Im Backend Repository ist eine Docker Compose File gegeben, die folgende Container enthält:
- MongoDB als Datenbank
- NGINX als Webserver und Reverse Proxy
- Keycloak zur Authentifizierung und Kommunikation mit externen Diensten
- Postgres als Datenbank für Keycloak

Das Frontend und Backend müssen unabhängig von der Docker Compose lokal gestartet werden. 
Die default Konfiguration erwartet das Frontend unter `localhost:8081` und das Backend unter `localhost:3000`. Die Webanwendung ist dann per nginx unter `localhost:8080` zu erreichen. 

Installation von allen Abhängigkeiten über Paketverwaltung npm.

```
npm install
```

### Entwicklung mit Hot Reload der Anwendung
```
npm run dev
```

### Build der Anwendung
```
npm run build
```

### Linter zur Entwicklung

In der Entwicklung haben wir den Linter [ESLint](https://eslint.org/) verwendet, welcher Javascript code analysiert und gängige Probleme automatisch korrigiert, sodass die Code einer einheitlichen Struktur entspricht.

```
npm run lint
```
