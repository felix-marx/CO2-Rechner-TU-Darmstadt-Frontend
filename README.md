# Frontend des CO2 Rechners der TU Darmstadt

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

Der CO2 Rechner verwendet folgende Abhängigkeiten, um die Funktionalität bereitzustellen:

- [core-js Version 3.6.5](https://github.com/zloirock/core-js) - Javascript für Eventhandling
- [vue Version 2.6.11](https://v2.vuejs.org/) - Framework für Webdarstellung
- [vue-router Version 3.5.3](https://router.vuejs.org/) - Routing von Seitenzugriffen
- [vuetify Version 2.4.0](https://vuetifyjs.com/en/) - Material Design UI Framework für einheitliche Darstellung
- [vue-material-design-icons Version 4.13.0](https://github.com/robcresswell/vue-material-design-icons) - Material Design Icons zur Darstellung
- [chart.js Version 2.9.4](https://www.chartjs.org/) - Javascript Graphenframwork
- [chartjs-plugin-datalabels Version 1.0.0](https://chartjs-plugin-datalabels.netlify.app/) - Labeling Plugin für Graphen
- [vue-chartjs Version 3.5.1](https://vue-chartjs.org/) - Chartjs integration in Vue
- [file-saver Version 2.0.5](https://github.com/eligrey/FileSaver.js/) - clientseitiger Download von Auswertungen
- [xlsx Version 0.17.5](https://github.com/SheetJS/sheetjs) - Auswertungsexport


## Entwicklungssetup
Das Projekt wurde mit der Vue CLI v4.5.15 erstellt.

Installation von allen Abhängigkeiten über Paketverwaltung npm.

```
npm install
```

### Entwicklung mit Hot Reload der Anwendung
```
npm run serve
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
