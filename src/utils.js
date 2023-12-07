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