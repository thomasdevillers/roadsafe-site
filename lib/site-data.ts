export type Spec = {
  label: string;
  value: string;
  indicative?: boolean;
};

export type Product = {
  slug: string;
  path: string;
  name: string;
  shortName: string;
  category: "message" | "control" | "radar" | "lighting" | "warning";
  availability: "rental" | "purchase" | "both";
  categoryLabel: string;
  categoryPath: string;
  tagline: string;
  description: string;
  image: string;
  imageAlt: string;
  features: string[];
  specs: Spec[];
  specUrl?: string;
  flagship?: boolean;
};

export type ProductCategory = {
  slug: string;
  path: string;
  name: string;
  kicker: string;
  description: string;
  image: string;
  imageAlt: string;
  productPaths: string[];
};

export const contact = {
  phoneDisplay: "066 000 8887",
  phoneHref: "tel:+27660008887",
  whatsappHref: "https://wa.me/27660008887",
  publicEmail: "info@roadsafe.co.za",
  quoteEmail: "nicki@roadsafe.co.za",
  address: "113 Louisa Road, Colleen Glen, Gqeberha, Eastern Cape, South Africa, 6018"
};

export const navigation = [
  { label: "Products", href: "/products" },
  { label: "Rentals", href: "/rentals" },
  { label: "Case studies", href: "/case-studies" },
  { label: "Support", href: "/support" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
];

export const products: Product[] = [
  {
    slug: "variable-message-signs",
    path: "variable-message-signs",
    name: "Variable Message Signs",
    shortName: "VMS Boards",
    category: "message",
    availability: "both",
    categoryLabel: "Traffic communication",
    categoryPath: "/products/variable-message-signs",
    tagline: "Put the right message in front of every driver.",
    description:
      "Trailer-mounted, solar-powered variable message signs for roadworks, diversions, incident management and public information. Manage messaging from phone or desktop and position the board for clear roadside visibility.",
    image: "/images/vms-board.png",
    imageAlt: "Roadsafe trailer-mounted variable message sign displaying an amber safety message",
    features: [
      "Five-colour optical LED display",
      "Phone and desktop message control",
      "Solar power with AC charging backup",
      "Road-legal trailer with 360-degree board rotation",
      "Optional radar speed display"
    ],
    specs: [
      { label: "Pixel matrix", value: "112 × 56 pixels" },
      { label: "Display area", value: "2860 × 1860 mm" },
      { label: "LED colours", value: "Red, green, yellow, blue and white" },
      { label: "Solar panel", value: "330 W" },
      { label: "Battery bank", value: "2 × 260 Ah deep-cycle solar batteries" },
      { label: "Trailer", value: "750 kg road-legal trailer" },
      { label: "Integration", value: "NTCIP compatible" }
    ],
    specUrl:
      "https://drive.google.com/file/d/1fNf3bnpV0GgDWT8TT05OmtGptuZD_QK6/view?usp=sharing",
    flagship: true
  },
  {
    slug: "traffic-control-units",
    path: "traffic-control-units",
    name: "Traffic Control Units",
    shortName: "TCU",
    category: "control",
    availability: "both",
    categoryLabel: "Temporary traffic control",
    categoryPath: "/products/traffic-control-units",
    tagline: "Remote traffic control built for active roadworks.",
    description:
      "Solar-powered traffic control units combine red and green signals, amber warning lights and radio communication to manage alternating traffic safely across temporary works.",
    image: "/images/traffic-control-unit-nobg.png",
    imageAlt: "Roadsafe mobile traffic control units with warning arrows and signal lights",
    features: [
      "Red and green traffic signals",
      "Linked amber warning light",
      "Solar-powered off-grid operation",
      "Long-range radio communication",
      "Road-legal mobile platform"
    ],
    specs: [
      { label: "Work light", value: "100 W LED flood light" },
      { label: "Signals", value: "Red / green traffic light" },
      { label: "Battery", value: "220 Ah solar battery" },
      { label: "Solar panel", value: "210 W" },
      { label: "Charge controller", value: "30 A MPPT" },
      { label: "Communication", value: "25 W two-way radio with whip antenna" }
    ],
    specUrl:
      "https://drive.google.com/file/d/1MVFSfZ70GKSEonMP_YDqUmbNvh1SMiAL/view?usp=drive_link",
    flagship: true
  },
  {
    slug: "solar-light-towers",
    path: "solar-light-towers",
    name: "Solar Light Towers",
    shortName: "Light Towers",
    category: "lighting",
    availability: "rental",
    categoryLabel: "Work-zone lighting",
    categoryPath: "/products/solar-light-towers",
    tagline: "Wide-area lighting without fuel, noise or emissions.",
    description:
      "A compact, one-person deployable solar lighting platform for roadworks, construction areas and temporary sites where dependable illumination matters.",
    image: "/images/solar-light-tower-nobg.png",
    imageAlt: "Trailer-mounted Roadsafe solar light tower with raised LED lighting mast",
    features: [
      "High-output energy-efficient LEDs",
      "Adjustable 360-degree light fixtures",
      "Automatic solar charging with MPPT control",
      "Compact, transportable trailer",
      "No engine, fuel, noise or direct emissions"
    ],
    specs: [
      { label: "Coverage", value: "Up to 27,000 sq ft" },
      { label: "Panels", value: "Extendable mono-crystalline solar panels" },
      { label: "Battery", value: "Maintenance-free gel batteries" },
      { label: "Finish", value: "Hot-galvanised, anti-UV powder-coated trailer" },
      { label: "Configuration", value: "Multiple light and panel options available" }
    ],
    specUrl:
      "https://drive.google.com/file/d/1xQw9euk3I3u05vsSEvOzmQse8xFjdYnJ/view?usp=sharing"
  },
  {
    slug: "speed-sentinel-classic",
    path: "speed-radars/speed-sentinel-classic",
    name: "Speed Sentinel Classic",
    shortName: "Sentinel Classic",
    category: "radar",
    availability: "both",
    categoryLabel: "Vehicle-activated speed radar",
    categoryPath: "/products/speed-radars",
    tagline: "Immediate visual feedback that changes driver behaviour.",
    description:
      "A programmable vehicle-activated speed display with clear red and green feedback and an emotional warning message for high-impact speed awareness.",
    image: "/images/speed-sentinel-classic-nobg.png",
    imageAlt: "Roadsafe Speed Sentinel Classic vehicle-activated speed display",
    features: [
      "Programmable speed threshold",
      "Red and green driver feedback",
      "Flashing emotional warning message",
      "Weather-resistant enclosure"
    ],
    specs: [
      { label: "Frame", value: "1000 × 700 mm" },
      { label: "LED height", value: "344 mm" },
      { label: "Product code", value: "SID001" },
      {
        label: "Power configuration",
        value: "Solar with rechargeable battery storage",
        indicative: true
      }
    ],
    specUrl:
      "https://docs.google.com/document/d/1rqiwWDryNkjxdIL2VE7EbemYMy1vz7V0/edit?usp=sharing&ouid=106723960608208770754&rtpof=true&sd=true"
  },
  {
    slug: "speed-sentinel-compact",
    path: "speed-radars/speed-sentinel-compact",
    name: "Speed Sentinel Compact",
    shortName: "Sentinel Compact",
    category: "radar",
    availability: "both",
    categoryLabel: "Vehicle-activated speed radar",
    categoryPath: "/products/speed-radars",
    tagline: "Compact roadside speed feedback with a clear warning.",
    description:
      "A space-efficient speed radar display that flashes a clear SLOW DOWN message when approaching vehicles exceed the programmed threshold.",
    image: "/images/speed-sentinel-compact.png",
    imageAlt: "Roadsafe Speed Sentinel Compact speed display showing red and green readings",
    features: [
      "Speed-triggered SLOW DOWN warning",
      "High-visibility LED display",
      "Compact roadside footprint",
      "Programmable speed threshold"
    ],
    specs: [
      { label: "Frame", value: "740 × 540 mm" },
      { label: "LED height", value: "360 mm" },
      { label: "Product code", value: "HK5474-R" },
      { label: "Visibility", value: "Approximately 300 m", indicative: true }
    ],
    specUrl:
      "https://docs.google.com/document/d/1rqiwWDryNkjxdIL2VE7EbemYMy1vz7V0/edit?usp=sharing&ouid=106723960608208770754&rtpof=true&sd=true"
  },
  {
    slug: "speed-sentinel-advanced",
    path: "speed-radars/speed-sentinel-advanced",
    name: "Speed Sentinel Advanced",
    shortName: "Sentinel Advanced",
    category: "radar",
    availability: "both",
    categoryLabel: "Vehicle-activated speed radar",
    categoryPath: "/products/speed-radars",
    tagline: "Larger-format speed feedback for demanding approaches.",
    description:
      "A high-visibility speed display with red and amber LEDs and a triggered SLOW DOWN message for roadworks, approaches and higher-speed environments.",
    image: "/images/speed-sentinel-advanced.png",
    imageAlt: "Roadsafe Speed Sentinel Advanced board displaying speed and a slow down warning",
    features: [
      "Red and amber LED output",
      "Triggered SLOW DOWN message",
      "Large-format driver display",
      "Programmable operating threshold"
    ],
    specs: [
      { label: "Frame", value: "1020 × 820 mm" },
      { label: "LED height", value: "450 mm" },
      { label: "Product code", value: "SID009" },
      {
        label: "Power configuration",
        value: "Solar with rechargeable battery storage",
        indicative: true
      }
    ],
    specUrl:
      "https://docs.google.com/document/d/1rqiwWDryNkjxdIL2VE7EbemYMy1vz7V0/edit?usp=sharing&ouid=106723960608208770754&rtpof=true&sd=true"
  },
  {
    slug: "speed-sentinel-essential",
    path: "speed-radars/speed-sentinel-essential",
    name: "Speed Sentinel Essential",
    shortName: "Sentinel Essential",
    category: "radar",
    availability: "both",
    categoryLabel: "Vehicle-activated speed radar",
    categoryPath: "/products/speed-radars",
    tagline: "Essential speed feedback in a highly portable format.",
    description:
      "A compact red and green speed display for sites that need straightforward driver feedback and fast deployment.",
    image: "/images/speed-sentinel-essential.png",
    imageAlt: "Roadsafe Speed Sentinel Essential compact vehicle speed display",
    features: [
      "Red and green speed indication",
      "Compact, portable format",
      "High-visibility LED numerals",
      "Straightforward roadside deployment"
    ],
    specs: [
      { label: "Frame", value: "430 × 400 mm" },
      { label: "Rated visibility", value: "300 m" },
      { label: "LED array", value: "240 × 5 mm LEDs" },
      { label: "Product code", value: "DT-SDR2K-Eco" }
    ],
    specUrl:
      "https://docs.google.com/document/d/1rqiwWDryNkjxdIL2VE7EbemYMy1vz7V0/edit?usp=sharing&ouid=106723960608208770754&rtpof=true&sd=true"
  },
  {
    slug: "flashguard-dummy-camera",
    path: "speed-radars/flashguard-dummy-camera",
    name: "FlashGuard Dummy Camera",
    shortName: "FlashGuard",
    category: "radar",
    availability: "both",
    categoryLabel: "Speed deterrent",
    categoryPath: "/products/speed-radars",
    tagline: "A visible speed deterrent with radar-triggered flash.",
    description:
      "A solar-powered roadside camera housing with an integrated radar unit that activates a flash when a vehicle exceeds the set speed.",
    image: "/images/flashguard-camera.png",
    imageAlt: "Roadsafe FlashGuard roadside speed camera housing",
    features: [
      "Radar-triggered flash",
      "Records passing vehicle speeds",
      "Average speed reporting",
      "Solar-powered operation"
    ],
    specs: [
      { label: "Radar range", value: "Approximately 150–200 m", indicative: true },
      { label: "Data export", value: "Web dashboard with CSV export", indicative: true },
      { label: "Enclosure rating", value: "Approximately IP65", indicative: true },
      { label: "Power", value: "Solar" }
    ],
    specUrl:
      "https://drive.google.com/file/d/1jU04z6oibFigoeQY6NI38-gR15hLFKOO/view?usp=sharing"
  },
  {
    slug: "solar-road-stud",
    path: "warning-lights/solar-road-stud",
    name: "Solar Road Stud",
    shortName: "Road Stud",
    category: "warning",
    availability: "purchase",
    categoryLabel: "Road delineation",
    categoryPath: "/products/warning-lights",
    tagline: "Reliable lane guidance after dark.",
    description:
      "A low-profile solar road stud designed to mark lanes, pedestrian crossings and critical road sections without external wiring.",
    image: "/images/solar-road-stud.png",
    imageAlt: "Low-profile Roadsafe solar LED road stud",
    features: [
      "Self-contained solar power",
      "High night-time visibility",
      "No external wiring",
      "Weather-resistant construction",
      "Designed for vehicle load environments"
    ],
    specs: [
      { label: "Service life", value: "Approximately 3–5 years", indicative: true },
      { label: "Load rating", value: "Up to approximately 20 tonnes", indicative: true },
      { label: "LED colours", value: "Amber, white, red, green or blue", indicative: true },
      { label: "Mounting", value: "Surface installation" }
    ]
  },
  {
    slug: "traffic-wand-light",
    path: "warning-lights/traffic-wand-light",
    name: "Traffic Wand Light",
    shortName: "Wand Light",
    category: "warning",
    availability: "purchase",
    categoryLabel: "Handheld signalling",
    categoryPath: "/products/warning-lights",
    tagline: "Clear, handheld direction in low-light conditions.",
    description:
      "A lightweight, rechargeable traffic wand for traffic controllers, road crews and emergency response personnel.",
    image: "/images/traffic-wand-light.png",
    imageAlt: "Illuminated handheld Roadsafe traffic control wand",
    features: [
      "High-visibility LED output",
      "Multiple operating modes",
      "Rechargeable battery",
      "Secure wrist strap",
      "Rugged, lightweight body"
    ],
    specs: [
      { label: "Operating modes", value: "Steady and flashing", indicative: true },
      { label: "Battery runtime", value: "Approximately 8–12 hours", indicative: true },
      { label: "Ingress protection", value: "Approximately IP54", indicative: true },
      { label: "Charging", value: "Rechargeable" }
    ]
  },
  {
    slug: "solar-warning-light",
    path: "warning-lights/solar-warning-light",
    name: "Solar Warning Light",
    shortName: "Warning Light",
    category: "warning",
    availability: "purchase",
    categoryLabel: "Work-zone warning",
    categoryPath: "/products/warning-lights",
    tagline: "Bright, self-powered warning for active work zones.",
    description:
      "A durable solar warning light for roadworks, construction zones and temporary hazards where visibility must remain consistent.",
    image: "/images/solar-warning-light-nobg.png",
    imageAlt: "Yellow Roadsafe solar work-zone warning light",
    features: [
      "Solar-powered operation",
      "High-intensity LED output",
      "All-weather housing",
      "Long operating cycle",
      "No external wiring"
    ],
    specs: [
      { label: "Flash pattern", value: "Single-flash dusk-to-dawn operation", indicative: true },
      { label: "Visibility", value: "Up to approximately 800 m", indicative: true },
      { label: "Runtime", value: "Approximately 5–7 nights per full charge", indicative: true },
      { label: "Mounting", value: "Barrier, post or bracket mounting", indicative: true }
    ]
  },
  {
    slug: "sign-mounted-solar-light",
    path: "warning-lights/sign-mounted-solar-light",
    name: "Sign Mounted Solar Light",
    shortName: "Sign Solar Light",
    category: "warning",
    availability: "purchase",
    categoryLabel: "Sign-mounted warning",
    categoryPath: "/products/warning-lights",
    tagline: "Self-powered visibility for roadside signs and temporary hazards.",
    description:
      "A compact solar warning light designed to mount directly to roadside and temporary traffic signs, adding an attention-grabbing amber flash without external cabling.",
    image: "/images/sign-mounted-solar-light-nobg.png",
    imageAlt: "Yellow sign-mounted solar warning light with amber LED lens",
    features: [
      "Integrated top-mounted solar panel",
      "High-visibility amber LED array",
      "Automatic dusk-to-dawn operation",
      "Compact sign and post mounting format",
      "Weather-resistant yellow housing"
    ],
    specs: [
      { label: "LED configuration", value: "8 amber LEDs", indicative: true },
      { label: "Flash pattern", value: "Single-flash warning mode", indicative: true },
      { label: "Solar charging", value: "Integrated monocrystalline panel", indicative: true },
      { label: "Operating cycle", value: "Up to 7 nights per full charge", indicative: true },
      { label: "Mounting", value: "Sign, barrier or post bracket", indicative: true },
      { label: "Ingress protection", value: "Approximately IP65", indicative: true }
    ]
  },
  {
    slug: "beacon-light",
    path: "warning-lights/beacon-light",
    name: "Beacon Light",
    shortName: "Beacon",
    category: "warning",
    availability: "purchase",
    categoryLabel: "Portable warning",
    categoryPath: "/products/warning-lights",
    tagline: "Portable high-visibility warning, ready when needed.",
    description:
      "A compact multi-mode beacon for roadside incidents, temporary hazards, vehicles and emergency signalling.",
    image: "/images/beacon-light-nobg.png",
    imageAlt: "Round amber Roadsafe LED beacon light",
    features: [
      "High-output LED array",
      "Multiple flash patterns",
      "Compact portable body",
      "Weather-resistant construction",
      "Vehicle charging support"
    ],
    specs: [
      { label: "Flash patterns", value: "9 selectable patterns", indicative: true },
      { label: "Charging", value: "Cable and vehicle adaptor" },
      { label: "Ingress protection", value: "Approximately IP67", indicative: true },
      { label: "Mounting", value: "Integrated magnetic base", indicative: true }
    ]
  },
  {
    slug: "double-arrow-light",
    path: "warning-lights/double-arrow-light",
    name: "Double Arrow Light",
    shortName: "Double Arrow",
    category: "warning",
    availability: "purchase",
    categoryLabel: "Directional warning",
    categoryPath: "/products/warning-lights",
    tagline: "Clear directional warning for changing work zones.",
    description:
      "A high-visibility directional warning unit for lane closures, diversions and mobile roadworks, designed for clear recognition at approach.",
    image: "/images/double-arrow-flashing-light-nobg.png",
    imageAlt: "Roadsafe double arrow flashing light with amber signal lamps",
    features: [
      "Clear directional arrow panels",
      "Integrated signal lamps",
      "High-visibility reflective finish",
      "Weather-resistant mobile format",
      "Designed for temporary traffic control"
    ],
    specs: [
      { label: "Arrow modes", value: "Left and right directional display", indicative: true },
      { label: "Panel dimensions", value: "Approximately 900 × 450 mm per panel", indicative: true },
      { label: "Signal operation", value: "Synchronized amber flashing", indicative: true },
      { label: "Power", value: "Solar with rechargeable battery backup", indicative: true }
    ]
  },
  {
    slug: "half-moon-road-stud",
    path: "warning-lights/half-moon-road-stud",
    name: "Half Moon Road Stud",
    shortName: "Half Moon Stud",
    category: "warning",
    availability: "purchase",
    categoryLabel: "Road delineation",
    categoryPath: "/products/warning-lights",
    tagline: "A robust solar marker for boundaries and lane guidance.",
    description:
      "A compact solar marker with a raised half-moon profile for boundaries, traffic guidance and night-time delineation.",
    image: "/images/half-moon-road-stud-nobg.png",
    imageAlt: "Pair of Roadsafe half moon solar road studs",
    features: [
      "Self-contained solar power",
      "High night-time visibility",
      "No external wiring",
      "Durable road-ready housing",
      "Fast surface installation"
    ],
    specs: [
      { label: "Service life", value: "Approximately 3–5 years", indicative: true },
      { label: "Load rating", value: "Up to approximately 20 tonnes", indicative: true },
      { label: "LED colours", value: "Amber, white, red, green or blue", indicative: true },
      { label: "Dimensions", value: "Approximately 110 × 100 × 30 mm", indicative: true }
    ]
  }
];

export const categories: ProductCategory[] = [
  {
    slug: "variable-message-signs",
    path: "variable-message-signs",
    name: "Variable Message Signs",
    kicker: "Flagship rental fleet",
    description: "Remote-controlled roadside messaging for roadworks, incidents and changing traffic conditions.",
    image: "/images/vms-field.jpg",
    imageAlt: "Roadsafe variable message sign deployed outdoors",
    productPaths: ["variable-message-signs"]
  },
  {
    slug: "traffic-control-units",
    path: "traffic-control-units",
    name: "Traffic Control Units",
    kicker: "Flagship rental fleet",
    description: "Solar-powered temporary signals and radio communication for alternating traffic control.",
    image: "/images/traffic-control-unit-nobg.png",
    imageAlt: "Roadsafe mobile traffic control units",
    productPaths: ["traffic-control-units"]
  },
  {
    slug: "speed-radars",
    path: "speed-radars",
    name: "Vehicle-Activated Speed Radars",
    kicker: "Five deployment options",
    description: "Speed feedback and deterrent systems sized for everything from compact works to high-speed approaches.",
    image: "/images/speed-sentinel-classic-nobg.png",
    imageAlt: "Roadsafe vehicle-activated speed display",
    productPaths: [
      "speed-radars/speed-sentinel-classic",
      "speed-radars/speed-sentinel-compact",
      "speed-radars/speed-sentinel-advanced",
      "speed-radars/speed-sentinel-essential",
      "speed-radars/flashguard-dummy-camera"
    ]
  },
  {
    slug: "solar-light-towers",
    path: "solar-light-towers",
    name: "Solar Light Towers",
    kicker: "Zero-fuel illumination",
    description: "Quiet, emission-free area lighting for temporary road and construction environments.",
    image: "/images/solar-light-tower-nobg.png",
    imageAlt: "Roadsafe trailer-mounted solar light tower",
    productPaths: ["solar-light-towers"]
  },
  {
    slug: "warning-lights",
    path: "warning-lights",
    name: "Warning Lights & Delineation",
    kicker: "Seven purchase-only products",
    description: "Purchase-only solar and rechargeable visibility equipment for hazards, lane guidance and active traffic control.",
    image: "/images/arrow-warning-board.png",
    imageAlt: "Roadsafe arrow warning boards",
    productPaths: [
      "warning-lights/solar-road-stud",
      "warning-lights/traffic-wand-light",
      "warning-lights/solar-warning-light",
      "warning-lights/sign-mounted-solar-light",
      "warning-lights/beacon-light",
      "warning-lights/double-arrow-light",
      "warning-lights/half-moon-road-stud"
    ]
  }
];

export function getProduct(path: string) {
  return products.find((product) => product.path === path);
}

export function getCategory(path: string) {
  return categories.find((category) => category.path === path);
}

export function productsForCategory(category: ProductCategory) {
  return category.productPaths
    .map((path) => getProduct(path))
    .filter((product): product is Product => Boolean(product));
}

export function productHref(product: Product) {
  return `/products/${product.path}`;
}
