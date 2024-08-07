import i18n from "@/plugins/i18n.js";
import constants from "@/const"; 

/**
 * Translates a given gebaeudeID to its numerical equivalent.
 * E.g. S101 is translated to 1101, L312 to 3312 and so on.
 */
export function translateGebaeudeIDToNumeric(gebaeudeID) {
  if (!gebaeudeID) return null;

  let gebaeudeDict = {
    "S": 1,
    "B": 2,
    "L": 3,
    "H": 4,
    "W": 5,
  };
  let translatedID =
    gebaeudeDict[gebaeudeID.substring(0, 1)] + gebaeudeID.substring(1);
  return parseInt(translatedID);
}

/**
 * Translates a given numeric gebaeudeID to its symbolic equivalent (string).
 * E.g. 1101 is translated to S101, 3312 to L312 and so on.
 */
export function translateGebaeudeIDToSymbolic(gebaeudeID) {
  let gebaeudeDict = {
    1: "S",
    2: "B",
    3: "L",
    4: "H",
    5: "W",
  };

  gebaeudeID = gebaeudeID.toString()
  let translatedID =
    gebaeudeDict[gebaeudeID.substring(0, 1)] + gebaeudeID.substring(1);
  return translatedID;
}

export function resolveITGeraetID(geraetID) {
  let ITGeraetIDDict = new Map([
    [constants.it_geraet_multifunktionsgeraet, i18n.global.t("userSurvey.Survey.ITGeraetIDDic_7")],
    [constants.it_geraet_multifunktionsgeraet_toner, i18n.global.t("userSurvey.Survey.ITGeraetIDDic_8")],
    [constants.it_geraet_drucker, i18n.global.t("userSurvey.Survey.ITGeraetIDDic_9")],
    [constants.it_geraet_drucker_toner, i18n.global.t("userSurvey.Survey.ITGeraetIDDic_10")],
    [constants.it_geraet_beamer, i18n.global.t("userSurvey.Survey.ITGeraetIDDic_4")],
    [constants.it_geraet_server, i18n.global.t("userSurvey.Survey.ITGeraetIDDic_6")],
  ]);

  return ITGeraetIDDict.get(geraetID)
}

/**
 * Returns a map of all possible ITGeraeteIDs and their corresponding labels.
 */
export function getITGeraeteLabelMap(){
  return new Map([
    [constants.it_geraet_notebook.toString(), i18n.global.t('colleagueSurvey.colleagueSurvey.IT_Geraete_Notebooks')],
    [constants.it_geraet_desktop.toString(), i18n.global.t('colleagueSurvey.colleagueSurvey.IT_Geraete_Desktops')],
    [constants.it_geraet_bildschirm.toString(), i18n.global.t('colleagueSurvey.colleagueSurvey.IT_Geraete_Bildschirme')],
    [constants.it_geraet_beamer.toString(), i18n.global.t('userSurvey.Survey.ITGeraetIDDic_4')],
    [constants.it_geraet_mobiltelefon.toString(), i18n.global.t('colleagueSurvey.colleagueSurvey.IT_Geraete_Mobiltelefone')],
    [constants.it_geraet_server.toString(), i18n.global.t('userSurvey.Survey.ITGeraetIDDic_6')],
    [constants.it_geraet_multifunktionsgeraet.toString(), i18n.global.t('userSurvey.Survey.ITGeraetIDDic_7')],
    [constants.it_geraet_multifunktionsgeraet_toner.toString(), i18n.global.t('userSurvey.Survey.ITGeraetIDDic_8')],
    [constants.it_geraet_drucker.toString(), i18n.global.t('userSurvey.Survey.ITGeraetIDDic_9')],
    [constants.it_geraet_drucker_toner.toString(), i18n.global.t('userSurvey.Survey.ITGeraetIDDic_10')],
  ]) 
}

/**
 * Returns a map of all possible DienstreisenIDs and their corresponding labels.
 */
export function getDienstreisenLabelMap(){
  return new Map([
    [constants.dienstreisen_bahn.toString(), i18n.global.t("colleagueSurvey.colleagueSurvey.dienstreiseMediumListe_2")],
    [constants.dienstreisen_pkw.toString(), i18n.global.t("colleagueSurvey.colleagueSurvey.dienstreiseMedium_Auto")],
    [constants.dienstreisen_flugzeug.toString(), i18n.global.t("colleagueSurvey.colleagueSurvey.dienstreiseMediumListe_3")],
    [constants.dienstreisen_benzin, i18n.global.t("colleagueSurvey.colleagueSurvey.dienstreiseMedium_Benzin")],
    [constants.dienstreisen_diesel, i18n.global.t("colleagueSurvey.colleagueSurvey.dienstreiseMedium_Diesel")],
    [constants.dienstreisen_plug_in_hybrid, i18n.global.t("colleagueSurvey.colleagueSurvey.dienstreiseMedium_Hybrid")],
    [constants.dienstreisen_elektro, i18n.global.t("colleagueSurvey.colleagueSurvey.dienstreiseMedium_Elektro")],
    [constants.dienstreisen_kurzstrecke, i18n.global.t("colleagueSurvey.colleagueSurvey.flugstreckeListe_1")],
    [constants.dienstreisen_langstrecke, i18n.global.t("colleagueSurvey.colleagueSurvey.flugstreckeListe_0")],
    [constants.dienstreisen_inland, i18n.global.t("colleagueSurvey.colleagueSurvey.flugstreckeListe_2")],
    [constants.dienstreisen_international, i18n.global.t("colleagueSurvey.colleagueSurvey.flugstreckeListe_3")],
    [constants.dienstreisen_average, i18n.global.t("colleagueSurvey.colleagueSurvey.flugklasse_average")],
    [constants.dienstreisen_economy, i18n.global.t("colleagueSurvey.colleagueSurvey.flugklasse_economy")],
    [constants.dienstreisen_premium_economy, i18n.global.t("colleagueSurvey.colleagueSurvey.flugklasse_premiumeconomy")],
    [constants.dienstreisen_business, i18n.global.t("colleagueSurvey.colleagueSurvey.flugklasse_business")],
    [constants.dienstreisen_first, i18n.global.t("colleagueSurvey.colleagueSurvey.flugklasse_first")],
    [constants.aggregation_dienstreisen_verbrenner, i18n.global.t("colleagueSurvey.colleagueSurvey.dienstreiseMedium_Verbrenner")]
  ])
}

/**
 * Returns a map of all possible PendelwegIDs and their corresponding labels.
 */
export function getPendelwegeLabelMap(){
  return new Map([
    [constants.pendelweg_fahrrad.toString(), i18n.global.t('colleagueSurvey.colleagueSurvey.fahrmediumListe_2')],
    [constants.pendelweg_e_fahrrad.toString(), i18n.global.t('colleagueSurvey.colleagueSurvey.fahrmediumListe_3')],
    [constants.pendelweg_motorisiertes_zweirad.toString(), i18n.global.t('colleagueSurvey.colleagueSurvey.fahrmediumListe_4')],
    [constants.pendelweg_pkw_benzin.toString(), i18n.global.t('colleagueSurvey.colleagueSurvey.Pkw_pendelweg_benzin')],
    [constants.pendelweg_pkw_diesel.toString(), i18n.global.t('colleagueSurvey.colleagueSurvey.Pkw_pendelweg_diesel')],
    [constants.pendelweg_bus.toString(), i18n.global.t('colleagueSurvey.colleagueSurvey.fahrtmediumOEPNVListe_1')],
    [constants.pendelweg_bahn.toString(), i18n.global.t('colleagueSurvey.colleagueSurvey.fahrtmediumOEPNVListe_0')],
    [constants.pendelweg_u_bahn.toString(), i18n.global.t('colleagueSurvey.colleagueSurvey.fahrtmediumOEPNVListe_2')],
    [constants.pendelweg_straßenbahn.toString(), i18n.global.t('colleagueSurvey.colleagueSurvey.fahrtmediumOEPNVListe_3')],
    [constants.pendelweg_mix_inkl_u_bahn.toString(), i18n.global.t('colleagueSurvey.colleagueSurvey.fahrtmediumOEPNVListe_4')],
    [constants.pendelweg_mix_exkl_u_bahn.toString(), i18n.global.t('colleagueSurvey.colleagueSurvey.fahrtmediumOEPNVListe_5')],
    [constants.pendelweg_fußgaenger.toString(), i18n.global.t('colleagueSurvey.colleagueSurvey.fahrmediumListe_6')],
    [constants.pendelweg_pkw_plug_in_hybrid.toString(), i18n.global.t('colleagueSurvey.colleagueSurvey.Pkw_pendelweg_hybrid')],
    [constants.pendelweg_pkw_elektro.toString(), i18n.global.t('colleagueSurvey.colleagueSurvey.Pkw_pendelweg_elektro')],
    [constants.aggregation_pendelwege_oepnv, i18n.global.t('colleagueSurvey.colleagueSurvey.fahrtmediumOEPNV')],
    [constants.aggregation_pendelwege_verbrenner, i18n.global.t('colleagueSurvey.colleagueSurvey.Pkw_pendelweg_verbrenner')],
    [constants.aggregation_pendelwege_elektro, i18n.global.t('colleagueSurvey.colleagueSurvey.Pkw_pendelweg_elektro')],
  ]);
}

/**
 * Returns a string with the first letter capitalized.
 */
export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}