/**
 * CHAMP Endorsers Data
 * 77 countries + European Union = 78 endorsers
 * ISO codes verified against CLAUDE.md
 */
const champEndorsers = [
  { name: "Albania", iso2: "AL", iso3: "ALB", isoNumeric: "008", region: "Europe", status: "Endorsed", joinedYear: 2023 },
  { name: "Andorra", iso2: "AD", iso3: "AND", isoNumeric: "020", region: "Europe", status: "Endorsed", joinedYear: 2023 },
  { name: "Antigua and Barbuda", iso2: "AG", iso3: "ATG", isoNumeric: "028", region: "North America & Caribbean", status: "Endorsed", joinedYear: 2023 },
  { name: "Armenia", iso2: "AM", iso3: "ARM", isoNumeric: "051", region: "Middle East & Central Asia", status: "Endorsed", joinedYear: 2023 },
  { name: "Australia", iso2: "AU", iso3: "AUS", isoNumeric: "036", region: "Asia-Pacific", status: "Endorsed", joinedYear: 2023 },
  { name: "Azerbaijan", iso2: "AZ", iso3: "AZE", isoNumeric: "031", region: "Middle East & Central Asia", status: "Endorsed", joinedYear: 2023 },
  { name: "Bahamas", iso2: "BS", iso3: "BHS", isoNumeric: "044", region: "North America & Caribbean", status: "Endorsed", joinedYear: 2023 },
  { name: "Bangladesh", iso2: "BD", iso3: "BGD", isoNumeric: "050", region: "Asia-Pacific", status: "Endorsed", joinedYear: 2023 },
  { name: "Belgium", iso2: "BE", iso3: "BEL", isoNumeric: "056", region: "Europe", status: "Endorsed", joinedYear: 2023 },
  { name: "Bhutan", iso2: "BT", iso3: "BTN", isoNumeric: "064", region: "Asia-Pacific", status: "Endorsed", joinedYear: 2023 },
  { name: "Bolivia", iso2: "BO", iso3: "BOL", isoNumeric: "068", region: "Latin America", status: "Endorsed", joinedYear: 2025 },
  { name: "Brazil", iso2: "BR", iso3: "BRA", isoNumeric: "076", region: "Latin America", status: "Endorsed", joinedYear: 2023 },
  { name: "Brunei Darussalam", iso2: "BN", iso3: "BRN", isoNumeric: "096", region: "Asia-Pacific", status: "Endorsed", joinedYear: 2023 },
  { name: "Bulgaria", iso2: "BG", iso3: "BGR", isoNumeric: "100", region: "Europe", status: "Endorsed", joinedYear: 2023 },
  { name: "Burkina Faso", iso2: "BF", iso3: "BFA", isoNumeric: "854", region: "Africa", status: "Endorsed", joinedYear: 2023 },
  { name: "Cabo Verde", iso2: "CV", iso3: "CPV", isoNumeric: "132", region: "Africa", status: "Endorsed", joinedYear: 2023 },
  { name: "Canada", iso2: "CA", iso3: "CAN", isoNumeric: "124", region: "North America & Caribbean", status: "Endorsed", joinedYear: 2023 },
  { name: "Chad", iso2: "TD", iso3: "TCD", isoNumeric: "148", region: "Africa", status: "Endorsed", joinedYear: 2023 },
  { name: "Chile", iso2: "CL", iso3: "CHL", isoNumeric: "152", region: "Latin America", status: "Endorsed", joinedYear: 2023 },
  { name: "Colombia", iso2: "CO", iso3: "COL", isoNumeric: "170", region: "Latin America", status: "Endorsed", joinedYear: 2023 },
  { name: "Costa Rica", iso2: "CR", iso3: "CRI", isoNumeric: "188", region: "Latin America", status: "Endorsed", joinedYear: 2023 },
  { name: "Cote d'Ivoire", iso2: "CI", iso3: "CIV", isoNumeric: "384", region: "Africa", status: "Endorsed", joinedYear: 2023 },
  { name: "Denmark", iso2: "DK", iso3: "DNK", isoNumeric: "208", region: "Europe", status: "Endorsed", joinedYear: 2023 },
  { name: "Dominican Republic", iso2: "DO", iso3: "DOM", isoNumeric: "214", region: "North America & Caribbean", status: "Endorsed", joinedYear: 2023 },
  { name: "El Salvador", iso2: "SV", iso3: "SLV", isoNumeric: "222", region: "Latin America", status: "Endorsed", joinedYear: 2023 },
  { name: "Estonia", iso2: "EE", iso3: "EST", isoNumeric: "233", region: "Europe", status: "Endorsed", joinedYear: 2023 },
  { name: "Eswatini", iso2: "SZ", iso3: "SWZ", isoNumeric: "748", region: "Africa", status: "Endorsed", joinedYear: 2023 },
  { name: "Ethiopia", iso2: "ET", iso3: "ETH", isoNumeric: "231", region: "Africa", status: "Endorsed", joinedYear: 2023 },
  { name: "Finland", iso2: "FI", iso3: "FIN", isoNumeric: "246", region: "Europe", status: "Endorsed", joinedYear: 2024 },
  { name: "France", iso2: "FR", iso3: "FRA", isoNumeric: "250", region: "Europe", status: "Endorsed", joinedYear: 2023 },
  { name: "Germany", iso2: "DE", iso3: "DEU", isoNumeric: "276", region: "Europe", status: "Endorsed", joinedYear: 2023 },
  { name: "Ghana", iso2: "GH", iso3: "GHA", isoNumeric: "288", region: "Africa", status: "Endorsed", joinedYear: 2023 },
  { name: "Guatemala", iso2: "GT", iso3: "GTM", isoNumeric: "320", region: "Latin America", status: "Endorsed", joinedYear: 2023 },
  { name: "Hungary", iso2: "HU", iso3: "HUN", isoNumeric: "348", region: "Europe", status: "Endorsed", joinedYear: 2023 },
  { name: "Iceland", iso2: "IS", iso3: "ISL", isoNumeric: "352", region: "Europe", status: "Endorsed", joinedYear: 2023 },
  { name: "Italy", iso2: "IT", iso3: "ITA", isoNumeric: "380", region: "Europe", status: "Endorsed", joinedYear: 2023 },
  { name: "Jamaica", iso2: "JM", iso3: "JAM", isoNumeric: "388", region: "North America & Caribbean", status: "Endorsed", joinedYear: 2023 },
  { name: "Japan", iso2: "JP", iso3: "JPN", isoNumeric: "392", region: "East Asia", status: "Endorsed", joinedYear: 2023 },
  { name: "Jordan", iso2: "JO", iso3: "JOR", isoNumeric: "400", region: "Middle East & Central Asia", status: "Endorsed", joinedYear: 2023 },
  { name: "Kenya", iso2: "KE", iso3: "KEN", isoNumeric: "404", region: "Africa", status: "Endorsed", joinedYear: 2023 },
  { name: "Kiribati", iso2: "KI", iso3: "KIR", isoNumeric: "296", region: "Asia-Pacific", status: "Endorsed", joinedYear: 2023 },
  { name: "Kyrgyzstan", iso2: "KG", iso3: "KGZ", isoNumeric: "417", region: "Middle East & Central Asia", status: "Endorsed", joinedYear: 2023 },
  { name: "Lebanon", iso2: "LB", iso3: "LBN", isoNumeric: "422", region: "Middle East & Central Asia", status: "Endorsed", joinedYear: 2023 },
  { name: "Lesotho", iso2: "LS", iso3: "LSO", isoNumeric: "426", region: "Africa", status: "Endorsed", joinedYear: 2023 },
  { name: "Mexico", iso2: "MX", iso3: "MEX", isoNumeric: "484", region: "Latin America", status: "Endorsed", joinedYear: 2023 },
  { name: "Moldova", iso2: "MD", iso3: "MDA", isoNumeric: "498", region: "Europe", status: "Endorsed", joinedYear: 2023 },
  { name: "Mongolia", iso2: "MN", iso3: "MNG", isoNumeric: "496", region: "Asia-Pacific", status: "Endorsed", joinedYear: 2023 },
  { name: "Morocco", iso2: "MA", iso3: "MAR", isoNumeric: "504", region: "Africa", status: "Endorsed", joinedYear: 2023 },
  { name: "Netherlands", iso2: "NL", iso3: "NLD", isoNumeric: "528", region: "Europe", status: "Endorsed", joinedYear: 2023 },
  { name: "Nicaragua", iso2: "NI", iso3: "NIC", isoNumeric: "558", region: "Latin America", status: "Endorsed", joinedYear: 2023 },
  { name: "Nigeria", iso2: "NG", iso3: "NGA", isoNumeric: "566", region: "Africa", status: "Endorsed", joinedYear: 2023 },
  { name: "North Macedonia", iso2: "MK", iso3: "MKD", isoNumeric: "807", region: "Europe", status: "Endorsed", joinedYear: 2023 },
  { name: "Norway", iso2: "NO", iso3: "NOR", isoNumeric: "578", region: "Europe", status: "Endorsed", joinedYear: 2023 },
  { name: "Pakistan", iso2: "PK", iso3: "PAK", isoNumeric: "586", region: "Middle East & Central Asia", status: "Endorsed", joinedYear: 2023 },
  { name: "Palau", iso2: "PW", iso3: "PLW", isoNumeric: "585", region: "Asia-Pacific", status: "Endorsed", joinedYear: 2023 },
  { name: "Panama", iso2: "PA", iso3: "PAN", isoNumeric: "591", region: "Latin America", status: "Endorsed", joinedYear: 2023 },
  { name: "Papua New Guinea", iso2: "PG", iso3: "PNG", isoNumeric: "598", region: "Asia-Pacific", status: "Endorsed", joinedYear: 2023 },
  { name: "Paraguay", iso2: "PY", iso3: "PRY", isoNumeric: "600", region: "Latin America", status: "Endorsed", joinedYear: 2023 },
  { name: "Philippines", iso2: "PH", iso3: "PHL", isoNumeric: "608", region: "Asia-Pacific", status: "Endorsed", joinedYear: 2023 },
  { name: "Poland", iso2: "PL", iso3: "POL", isoNumeric: "616", region: "Europe", status: "Endorsed", joinedYear: 2023 },
  { name: "Portugal", iso2: "PT", iso3: "PRT", isoNumeric: "620", region: "Europe", status: "Endorsed", joinedYear: 2023 },
  { name: "Rwanda", iso2: "RW", iso3: "RWA", isoNumeric: "646", region: "Africa", status: "Endorsed", joinedYear: 2023 },
  { name: "Saint Vincent and the Grenadines", iso2: "VC", iso3: "VCT", isoNumeric: "670", region: "Latin America", status: "Endorsed", joinedYear: 2023 },
  { name: "Serbia", iso2: "RS", iso3: "SRB", isoNumeric: "688", region: "Europe", status: "Endorsed", joinedYear: 2023 },
  { name: "Seychelles", iso2: "SC", iso3: "SYC", isoNumeric: "690", region: "Africa", status: "Endorsed", joinedYear: 2023 },
  { name: "Sierra Leone", iso2: "SL", iso3: "SLE", isoNumeric: "694", region: "Africa", status: "Endorsed", joinedYear: 2023 },
  { name: "South Korea", iso2: "KR", iso3: "KOR", isoNumeric: "410", region: "East Asia", status: "Endorsed", joinedYear: 2023 },
  { name: "Sri Lanka", iso2: "LK", iso3: "LKA", isoNumeric: "144", region: "Asia-Pacific", status: "Endorsed", joinedYear: 2023 },
  { name: "Sweden", iso2: "SE", iso3: "SWE", isoNumeric: "752", region: "Europe", status: "Endorsed", joinedYear: 2025 },
  { name: "Tunisia", iso2: "TN", iso3: "TUN", isoNumeric: "788", region: "Africa", status: "Endorsed", joinedYear: 2023 },
  { name: "Turkey", iso2: "TR", iso3: "TUR", isoNumeric: "792", region: "Europe", status: "Endorsed", joinedYear: 2023 },
  { name: "Turkmenistan", iso2: "TM", iso3: "TKM", isoNumeric: "795", region: "Middle East & Central Asia", status: "Endorsed", joinedYear: 2023 },
  { name: "United Arab Emirates", iso2: "AE", iso3: "ARE", isoNumeric: "784", region: "Middle East & Central Asia", status: "Endorsed", joinedYear: 2023 },
  { name: "Ukraine", iso2: "UA", iso3: "UKR", isoNumeric: "804", region: "Europe", status: "Endorsed", joinedYear: 2023 },
  { name: "United Kingdom", iso2: "GB", iso3: "GBR", isoNumeric: "826", region: "Europe", status: "Endorsed", joinedYear: 2023 },
  { name: "United States of America", iso2: "US", iso3: "USA", isoNumeric: "840", region: "North America & Caribbean", status: "Endorsed", joinedYear: 2023 },
  { name: "Yemen", iso2: "YE", iso3: "YEM", isoNumeric: "887", region: "Middle East & Central Asia", status: "Endorsed", joinedYear: 2023 },
  { name: "European Union", iso2: "EU", iso3: "EUE", isoNumeric: null, region: "Europe", status: "Endorsed", joinedYear: 2025 }
];

// Lookup maps for fast access
const endorserByNumeric = {};
const endorserByIso2 = {};
champEndorsers.forEach(e => {
  if (e.isoNumeric) endorserByNumeric[e.isoNumeric] = e;
  endorserByIso2[e.iso2] = e;
});

// EU member states that are also CHAMP endorsers (for map highlighting)
const euMemberEndorsers = [
  "056", // Belgium
  "100", // Bulgaria
  "208", // Denmark
  "233", // Estonia
  "246", // Finland
  "250", // France
  "276", // Germany
  "348", // Hungary
  "380", // Italy
  "528", // Netherlands
  "616", // Poland
  "620", // Portugal
  "752"  // Sweden
];

// All regions for filtering
const champRegions = [
  "Africa",
  "East Asia",
  "Asia-Pacific",
  "Europe",
  "Latin America",
  "North America & Caribbean",
  "Middle East & Central Asia"
];

// Sample resources
const sampleResources = [
  {
    id: 1,
    title: "CHAMP Summary of Activities 2025",
    type: "PDF",
    topic: "Implementation",
    region: "All",
    date: "2025-03-15",
    description: "Comprehensive summary of CHAMP coalition activities, milestones, and achievements throughout 2025.",
    url: "https://www.champ-climate.org/s/CHAMP-Summary-Activities-2025.pdf"
  },
  {
    id: 2,
    title: "CHAMP Pledge Document",
    type: "PDF",
    topic: "NDC Guidance",
    region: "All",
    date: "2023-12-01",
    description: "The original COP28 pledge document outlining CHAMP commitments with frequently asked questions.",
    url: "#"
  },
  {
    id: 3,
    title: "CHAMP Explainer",
    type: "Guide",
    topic: "Implementation",
    region: "All",
    date: "2024-01-15",
    description: "A comprehensive overview of CHAMP for newcomers, explaining the coalition's mission, structure, and goals.",
    url: "#"
  },
  {
    id: 4,
    title: "Implementation Guidance for Endorsers",
    type: "Guide",
    topic: "Implementation",
    region: "All",
    date: "2024-06-01",
    description: "Detailed guidance document for all CHAMP endorsers on implementing multilevel climate partnerships.",
    url: "#"
  },
  {
    id: 5,
    title: "CHAMP Summary of Activities 2024",
    type: "PDF",
    topic: "Implementation",
    region: "All",
    date: "2024-12-15",
    description: "Annual report summarizing CHAMP activities, events, and progress during 2024.",
    url: "#"
  },
  {
    id: 6,
    title: "Multilevel Action for Climate Resilience in Informal Settlements",
    type: "Expert Note",
    topic: "Case Studies",
    region: "Africa",
    date: "2024-09-20",
    description: "WRI expert note examining multilevel climate action approaches for building resilience in informal settlements.",
    url: "#"
  },
  {
    id: 7,
    title: "Stronger NDCs with Cities, States, and Regions",
    type: "Guide",
    topic: "NDC Guidance",
    region: "All",
    date: "2024-11-01",
    description: "WRI recommendations for strengthening Nationally Determined Contributions through subnational engagement.",
    url: "#"
  },
  {
    id: 8,
    title: "CHAMP COP29 Briefing",
    type: "Briefing",
    topic: "NDC Guidance",
    region: "All",
    date: "2024-11-10",
    description: "Briefing document on understanding and promoting multilevel climate action at COP29 in Baku.",
    url: "#"
  }
];

// Sample events
const sampleEvents = [
  {
    id: 1,
    title: "CHAMP High-Level Political Dialogue",
    date: "2024-09-22",
    location: "New York",
    context: "Climate Week NYC",
    format: "In-person",
    description: "High-level dialogue bringing together national and subnational leaders to advance multilevel climate partnerships during Climate Week NYC.",
    upcoming: false
  },
  {
    id: 2,
    title: "2nd Ministerial Meeting on Urbanization and Climate Change",
    date: "2024-12-05",
    location: "Baku, Azerbaijan",
    context: "COP29",
    format: "In-person",
    description: "Second ministerial meeting addressing the intersection of urbanization and climate change, held during COP29.",
    upcoming: false
  },
  {
    id: 3,
    title: "CHAMP UNFCCC Focal Point Dialogue",
    date: "2025-06-15",
    location: "Virtual",
    context: "UNFCCC Process",
    format: "Virtual",
    description: "Virtual dialogue connecting UNFCCC focal points from CHAMP endorsing countries to coordinate multilevel climate action.",
    upcoming: true
  },
  {
    id: 4,
    title: "Daring Cities 2024 CHAMP Roundtable",
    date: "2024-04-18",
    location: "Bonn, Germany",
    context: "Daring Cities",
    format: "In-person",
    description: "Roundtable discussion on CHAMP implementation and subnational climate leadership at the Daring Cities conference.",
    upcoming: false
  }
];

// Sample news
const sampleNews = [
  {
    id: 1,
    title: "EU Joins CHAMP Ahead of COP30",
    date: "2025-11-15",
    excerpt: "The European Union has officially endorsed the Coalition for High Ambition Multilevel Partnerships, becoming the 78th endorser ahead of COP30 in Belem, Brazil.",
    url: "#"
  },
  {
    id: 2,
    title: "Sweden and Bolivia Join CHAMP",
    date: "2025-03-20",
    excerpt: "Sweden and Bolivia have joined the growing CHAMP coalition, bringing the total number of endorsers to 77 countries committed to multilevel climate action.",
    url: "#"
  },
  {
    id: 3,
    title: "Finland Becomes 73rd CHAMP Endorser",
    date: "2024-09-15",
    excerpt: "Finland has officially endorsed CHAMP, reinforcing its commitment to multilevel governance and subnational climate partnerships.",
    url: "#"
  },
  {
    id: 4,
    title: "U.S. Cities Raising Climate Ambition Through Subnational Diplomacy",
    date: "2024-07-10",
    excerpt: "American cities are leveraging CHAMP's framework for subnational diplomacy to raise climate ambition and strengthen partnerships with national governments.",
    url: "#"
  }
];
