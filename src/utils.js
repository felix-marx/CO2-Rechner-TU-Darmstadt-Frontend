import i18n from "@/i18n";


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
  let ITGeraetIDDict = {
    7: i18n.t("userSurvey.Survey.ITGeraetIDDic_7"),
    8: i18n.t("userSurvey.Survey.ITGeraetIDDic_8"),
    9: i18n.t("userSurvey.Survey.ITGeraetIDDic_9"),
    10: i18n.t("userSurvey.Survey.ITGeraetIDDic_10"),
    4: i18n.t("userSurvey.Survey.ITGeraetIDDic_4"),
    6: i18n.t("userSurvey.Survey.ITGeraetIDDic_6"),
  };
  return ITGeraetIDDict[geraetID]
}

/**
 * Returns a map of all possible ITGeraeteIDs and their corresponding labels.
 */
export function getITGeraeteLabelMap(){
  return new Map([
    ["1", i18n.t('colleagueSurvey.colleagueSurvey.IT_Geraete_Notebooks')],
    ["2", i18n.t('colleagueSurvey.colleagueSurvey.IT_Geraete_Desktops')],
    ["3", i18n.t('colleagueSurvey.colleagueSurvey.IT_Geraete_Bildschirme')],
    ["4", i18n.t('userSurvey.Survey.ITGeraetIDDic_4')],
    ["5", i18n.t('colleagueSurvey.colleagueSurvey.IT_Geraete_Mobiltelefone')],
    ["6", i18n.t('userSurvey.Survey.ITGeraetIDDic_6')],
    ["7", i18n.t('userSurvey.Survey.ITGeraetIDDic_7')],
    ["8", i18n.t('userSurvey.Survey.ITGeraetIDDic_8')],
    ["9", i18n.t('userSurvey.Survey.ITGeraetIDDic_9')],
    ["10", i18n.t('userSurvey.Survey.ITGeraetIDDic_10')],
  ]) 
}

/**
 * Returns a map of all possible DienstreisenIDs and their corresponding labels.
 */
export function getDienstreisenLabelMap(){
  return new Map([
    ["1", i18n.t("colleagueSurvey.colleagueSurvey.dienstreiseMediumListe_2")],
    ["2", i18n.t("colleagueSurvey.colleagueSurvey.dienstreiseMedium_Auto")],
    ["3", i18n.t("colleagueSurvey.colleagueSurvey.dienstreiseMediumListe_3")],
    ["Benzin", i18n.t("colleagueSurvey.colleagueSurvey.dienstreiseMedium_Benzin")],
    ["Diesel", i18n.t("colleagueSurvey.colleagueSurvey.dienstreiseMedium_Diesel")],
    ["Kurzstrecke", i18n.t("colleagueSurvey.colleagueSurvey.flugstreckeListe_1")],
    ["Langstrecke", i18n.t("colleagueSurvey.colleagueSurvey.flugstreckeListe_0")],
    ["Inland", i18n.t("colleagueSurvey.colleagueSurvey.flugstreckeListe_2")],
    ["International", i18n.t("colleagueSurvey.colleagueSurvey.flugstreckeListe_3")],
    ["average", i18n.t("colleagueSurvey.colleagueSurvey.flugklasse_average")],
    ["economy", i18n.t("colleagueSurvey.colleagueSurvey.flugklasse_economy")],
    ["premium economy", i18n.t("colleagueSurvey.colleagueSurvey.flugklasse_premiumeconomy")],
    ["business", i18n.t("colleagueSurvey.colleagueSurvey.flugklasse_business")],
    ["first", i18n.t("colleagueSurvey.colleagueSurvey.flugklasse_first")],
  ])
}

/**
 * Returns a map of all possible PendelwegIDs and their corresponding labels.
 */
export function getPendelwegeLabelMap(){
  return new Map([
    ["1", i18n.t('colleagueSurvey.colleagueSurvey.fahrmediumListe_2')],
    ["2", i18n.t('colleagueSurvey.colleagueSurvey.fahrmediumListe_3')],
    ["3", i18n.t('colleagueSurvey.colleagueSurvey.fahrmediumListe_4')],
    ["4", i18n.t('colleagueSurvey.colleagueSurvey.Pkw_pendelweg_benzin')],
    ["5", i18n.t('colleagueSurvey.colleagueSurvey.Pkw_pendelweg_diesel')],
    ["6", i18n.t('colleagueSurvey.colleagueSurvey.fahrtmediumOEPNVListe_1')],
    ["7", i18n.t('colleagueSurvey.colleagueSurvey.fahrtmediumOEPNVListe_0')],
    ["8", i18n.t('colleagueSurvey.colleagueSurvey.fahrtmediumOEPNVListe_2')],
    ["9", i18n.t('colleagueSurvey.colleagueSurvey.fahrtmediumOEPNVListe_3')],
    ["10", i18n.t('colleagueSurvey.colleagueSurvey.fahrtmediumOEPNVListe_4')],
    ["11", i18n.t('colleagueSurvey.colleagueSurvey.fahrtmediumOEPNVListe_5')],
    ["12", i18n.t('colleagueSurvey.colleagueSurvey.fahrmediumListe_6')]
  ]);
}

/**
 * Returns a string with the first letter capitalized.
 */
export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}