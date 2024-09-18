// file contains project wide constants

const constants = {
    v_card_max_width: "1500px",
    v_dialog_max_width: "1450px",
    v_tooltip_max_width: "1000px",
    charts_min_height: "300px",

    // Pendelweg-Label aus der Datenbank
    pendelweg_fahrrad: 1,
    pendelweg_e_fahrrad: 2,
    pendelweg_motorisiertes_zweirad: 3,
    pendelweg_pkw_diesel: 4,
    pendelweg_pkw_benzin: 5,
    pendelweg_bus: 6,
    pendelweg_bahn: 7,
    pendelweg_u_bahn: 8,
    pendelweg_straßenbahn: 9,
    pendelweg_mix_inkl_u_bahn: 10,
    pendelweg_mix_exkl_u_bahn: 11,
    pendelweg_fußgaenger: 12,
    pendelweg_pkw_plug_in_hybrid: 13,
    pendelweg_pkw_elektro: 14,

    // Dienstreisen-Label aus der Datenbank
    dienstreisen_bahn: 1,
    dienstreisen_pkw: 2,
    dienstreisen_flugzeug: 3,
    dienstreisen_benzin: "Benzin",
    dienstreisen_diesel: "Diesel",
    dienstreisen_plug_in_hybrid: "Plug-In-Hybrid",
    dienstreisen_elektro: "Elektro",
    dienstreisen_kurzstrecke: "Kurzstrecke",
    dienstreisen_langstrecke: "Langstrecke",
    dienstreisen_inland: "Inland",
    dienstreisen_international: "International",
    dienstreisen_average: "average",
    dienstreisen_economy: "economy",
    dienstreisen_premium_economy: "premium economy",
    dienstreisen_business: "business",
    dienstreisen_first: "first",

    // IT Geraete-Label aus der Datenbank
    it_geraet_notebook: 1,
    it_geraet_desktop: 2,
    it_geraet_bildschirm: 3,
    it_geraet_beamer: 4,
    it_geraet_mobiltelefon: 5,
    it_geraet_server: 6,
    it_geraet_multifunktionsgeraet: 7,
    it_geraet_multifunktionsgeraet_toner: 8,
    it_geraet_drucker: 9,
    it_geraet_drucker_toner: 10,

    // Auswertung
    split_char: "_",
    aggregation_pendelwege_oepnv: "Aggregation_OEPNV",
    aggregation_pendelwege_verbrenner: "Aggregation_Verbrenner",
    aggregation_pendelwege_elektro: "Aggregation_Elektro",
    aggregation_dienstreisen_verbrenner: "Verbrenner",
    aggregation_no_key: "no_key",
}

export default constants