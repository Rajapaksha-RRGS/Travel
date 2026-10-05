export interface KekirawaSite {
  id: string;
  name: string;
  sinhalaName: string;
  category: "Religious" | "Archaeological" | "Natural" | "Hydraulic";
  distanceKm: number;
  travelTimeMin: number;
  recommendedTime: string;
  shadeCondition: "Full Morning Shade" | "Moderate Canopy" | "Exposed Noon Sun" | "Forest Cloud Cover";
  elderSuitability: "High (Flat terrain)" | "Moderate (Gentle stairs)" | "Challenging (Stone climb)" | "Easy Walkway";
  etiquette: string;
  coordinates: { lat: number; lon: number };
  position3D: [number, number, number]; // [x, y, z] mapped in 25km field
  description: string;
  historicalSignificance: string;
  travelTip: string;
  openingHours: string;
}

export const KEKIRAWA_CENTER = {
  name: "Kekirawa Junction Terminal",
  coordinates: { lat: 8.0333, lon: 80.5833 },
  position3D: [0, 0, 0] as [number, number, number],
};

export const SITES_DATA: KekirawaSite[] = [
  {
    id: "awukana",
    name: "Awukana Buddha Colossus",
    sinhalaName: "අවුකන බුදු පිළිමය",
    category: "Religious",
    distanceKm: 8.4,
    travelTimeMin: 18,
    recommendedTime: "06:30 AM – 09:30 AM",
    shadeCondition: "Full Morning Shade",
    elderSuitability: "High (Flat terrain)",
    etiquette: "Cover shoulders and knees; remove footwear at stone threshold.",
    coordinates: { lat: 8.0167, lon: 80.5167 },
    position3D: [-1.8, 0.15, -0.6],
    description: "A breathtaking 12-meter (39 ft) standing Buddha carved out of a single solid granite cliff in the 5th century during King Dhatusena's reign, demonstrating supreme Anuradhapura stone craftsmanship.",
    historicalSignificance: "Famous for the lotus pedestal and the Asisa Mudra (blessing of fearlessness), aligned with early morning sun rays.",
    travelTip: "Arrive at sunrise for gentle golden side-lighting on the robe drapery and cool stone paving.",
    openingHours: "06:00 AM – 06:30 PM",
  },
  {
    id: "kalawewa",
    name: "Kalawewa Ancient Reservoir",
    sinhalaName: "කලාවැව ජලාශය",
    category: "Hydraulic",
    distanceKm: 11.2,
    travelTimeMin: 22,
    recommendedTime: "04:00 PM – 06:15 PM",
    shadeCondition: "Moderate Canopy",
    elderSuitability: "High (Flat terrain)",
    etiquette: "Respect fishing grounds; no littering on the ancient bund.",
    coordinates: { lat: 8.0000, lon: 80.5333 },
    position3D: [-1.4, 0.05, 1.6],
    description: "Constructed by King Dhatusena in 460 AD, this monumental 6,380-hectare reservoir feeds the Yoda Ela (Giant's Canal) to Anuradhapura over 87 km with an astonishing gradient of just 6 inches per mile.",
    historicalSignificance: "The crown jewel of Sri Lanka's ancient hydraulic engineering and home to diverse waterfowl and migratory elephants.",
    travelTip: "Late afternoon brings cooling lake breezes and sunset reflections over the reservoir embankment.",
    openingHours: "Open All Hours (Best in daylight)",
  },
  {
    id: "ritigala",
    name: "Ritigala Strict Forest Monastery",
    sinhalaName: "රිටිගල වන සෙනසුන",
    category: "Archaeological",
    distanceKm: 21.8,
    travelTimeMin: 38,
    recommendedTime: "07:30 AM – 10:30 AM",
    shadeCondition: "Forest Cloud Cover",
    elderSuitability: "Challenging (Stone climb)",
    etiquette: "Strict silence in monastic precincts; do not touch medicinal flora.",
    coordinates: { lat: 8.1167, lon: 80.6500 },
    position3D: [2.1, 0.6, -1.9],
    description: "An isolated mountain peak (766m) shrouded in micro-climate mist, housing an austere 1st-century BCE monastic hospital and meditation walkways of the Pansukulika ascetic monks.",
    historicalSignificance: "Features stone medicinal baths, sunken double-platform meditation halls, and no statues or stupas, symbolizing absolute ascetic renunciation.",
    travelTip: "Wear grippy footwear; morning mist keeps the forest quiet and cool before midday heat sets in.",
    openingHours: "07:00 AM – 04:30 PM",
  },
  {
    id: "resvehera",
    name: "Resvehera (Sasseruwa) Rock Shrine",
    sinhalaName: "රැස්වෙහෙර විහාරය",
    category: "Religious",
    distanceKm: 19.5,
    travelTimeMin: 35,
    recommendedTime: "08:00 AM – 11:00 AM",
    shadeCondition: "Moderate Canopy",
    elderSuitability: "Moderate (Gentle stairs)",
    etiquette: "Modest white dress requested for shrine rooms.",
    coordinates: { lat: 7.9833, lon: 80.4333 },
    position3D: [-2.6, 0.35, 1.2],
    description: "Ancient forest temple with an unfinished colossal rock Buddha believed to be the apprentice counterpart to Awukana, plus 99 ascetic caves with drip-ledge Brahmi inscriptions.",
    historicalSignificance: "Houses a sacred bo tree sapling from the original Sri Maha Bodhi and rare Kandyan period cave murals.",
    travelTip: "Notice the contrast in stone texture compared to Awukana; fewer crowds allow quiet meditation.",
    openingHours: "06:30 AM – 05:30 PM",
  },
  {
    id: "namal_uyana",
    name: "Jathika Namal Uyana & Pink Quartz",
    sinhalaName: "ජාතික නාමල් උයන",
    category: "Natural",
    distanceKm: 17.6,
    travelTimeMin: 32,
    recommendedTime: "07:00 AM – 10:00 AM",
    shadeCondition: "Full Morning Shade",
    elderSuitability: "Moderate (Gentle stairs)",
    etiquette: "Do not remove quartz minerals or carve on ironwood trees.",
    coordinates: { lat: 7.9500, lon: 80.6167 },
    position3D: [1.1, 0.25, 2.4],
    description: "The largest human-planted Na (Ironwood) forest in South Asia alongside a 550-million-year-old Pink Quartz mountain range that once served as a sanctuary for King Devanampiyatissa.",
    historicalSignificance: "Archaeological ruins of ancient stupas and King Dappula IV's 10th-century sanctuary asylum boundary stones.",
    travelTip: "Walking under the deep Na canopy is remarkably tranquil and cool even on warm mornings.",
    openingHours: "06:30 AM – 05:00 PM",
  },
  {
    id: "vijithapura",
    name: "Vijithapura Fortress Memorial",
    sinhalaName: "විජිතපුර බලකොටුව",
    category: "Archaeological",
    distanceKm: 13.8,
    travelTimeMin: 24,
    recommendedTime: "08:30 AM – 11:30 AM",
    shadeCondition: "Exposed Noon Sun",
    elderSuitability: "High (Flat terrain)",
    etiquette: "Treat monument stones and ancient bo-tree boundary with dignity.",
    coordinates: { lat: 8.0833, lon: 80.5333 },
    position3D: [-1.2, 0.1, -1.5],
    description: "Site of the legendary siege of Vijithapura where King Dutugemunu and his royal elephant Kandula breached Elara's three-layered iron fortress walls in the 2nd century BCE.",
    historicalSignificance: "Ancient moat depressions and commemorative stone relics honoring the historic unification of ancient Lanka.",
    travelTip: "Pair with Awukana; best visited before 11:00 AM as the open fortress grounds become warm by midday.",
    openingHours: "07:00 AM – 06:00 PM",
  },
];
