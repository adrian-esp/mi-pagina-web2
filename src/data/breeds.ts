export interface BreedMonograph {
  id: string;
  name: string;
  latinName: string;
  fciGroup: string;
  fciSection: string;
  fciNumber: string;
  akcRecognition: number;
  origin: string;
  originRegion: string;
  historicalEpoch: string;
  category: 'spitz' | 'working' | 'herding' | 'sporting';
  taxaTag: string;
  imageUrl: string;
  summary: string;
  intellectRank: number | null;
  intellectScore: number; // 1-5
  energyScore: number; // 1-5
  biteForcePsi: number;
  lifespanMin: number;
  lifespanMax: number;
  workingClass: string;
  groomingLevel: number; // 1-5
  groomingNote: string;
  tags: string[];
  keyTraits: string[];
  cephalicIndex: {
    type: 'Dolichocephalic' | 'Mesocephalic' | 'Brachycephalic';
    ratio: string;
    description: string;
  };
  physicalMetrics: {
    maleHeightCm: string;
    femaleHeightCm: string;
    weightKg: string;
    coatStructure: string;
    dentitionBite: string;
  };
  genomicProfile: {
    mitochondrialHaplogroup: string;
    notableAlleles: string[];
    geneticIsolationYearsBp: number;
    drd4ReceptorTrait: string;
  };
  behavioralRadar: {
    endurance: number;
    biddability: number;
    preyDrive: number;
    socialAffiliation: number;
    coldTolerance: number;
    vigilance: number;
  };
  historicalMonograph: string[];
  curatorNotes: string;
  lineageAncestry: {
    ancestralClade: string;
    foundationalLine: string;
    historicalRole: string;
    modernStandardization: string;
  };
}

export const BREED_DATA: BreedMonograph[] = [
  {
    id: 'siberian-husky',
    name: 'Siberian Husky',
    latinName: 'Canis lupus familiaris spitzicus',
    fciGroup: 'FCI Group 5',
    fciSection: 'Sec. 1.2',
    fciNumber: '270',
    akcRecognition: 1930,
    origin: 'Siberia',
    originRegion: 'Kolyma River Basin & Chukotka Peninsula',
    historicalEpoch: 'Pleistocene / Neolithic Transition (~9,500 BP)',
    category: 'spitz',
    taxaTag: 'Spitz & Arctic Working',
    imageUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1UJsZJmhZPZ2ALrqUN39sSotJsT1PwmEKK7Xj3AOTJyX9ws0Djg0oXRuA6Ayqeq3V7b9KeQizJBNpIZyEDQyCkam8QbSRYxf1ZbF1db8z0tkL6hIQVYXVSPqWSxTAf_g81LKnJ1YE__sEjNdJiDISmaVN_XRBlgvYHgKsEpirLhCqsTNt3FyquIy5sGkoLOajvftv6S0msyKZS-jkvabnr5Ycw6dEfz_n3AO28Tyu17fw1d1Nl1HeB-GbQ',
    summary: 'Engineered by the Chukchi people of northeastern Asia. Renowned for boundless metabolic efficiency, dual-layer insulation, and distinct vocal howling registers.',
    intellectRank: 45,
    intellectScore: 3.5,
    energyScore: 5.0,
    biteForcePsi: 320,
    lifespanMin: 12,
    lifespanMax: 14,
    workingClass: 'Spitz / Arctic Sled',
    groomingLevel: 4.0,
    groomingNote: 'Seasonal Blow (Biannual Undercoat Shedding)',
    tags: ['spitz', 'arctic', 'sled', 'endurance', 'working'],
    keyTraits: ['High Endurance', 'Arctic Double-Coat', 'Vocal / Pack'],
    cephalicIndex: {
      type: 'Mesocephalic',
      ratio: '52.4 (Cranial width / Cranial length)',
      description: 'Balanced cranial vault offering moderate airway thermoregulation in sub-zero thermal extremes without cranial foreshortening.'
    },
    physicalMetrics: {
      maleHeightCm: '53.5 – 60 cm',
      femaleHeightCm: '50.5 – 56 cm',
      weightKg: '16 – 27 kg',
      coatStructure: 'Double coat with dense cashmere-fine underfur and straight guard hairs reflecting UV radiation.',
      dentitionBite: 'Complete scissors bite, 42 teeth; robust carnassials calibrated for mastication of frozen pinniped fat.'
    },
    genomicProfile: {
      mitochondrialHaplogroup: 'Haplogroup d2 (Clade Arc-Chukchi)',
      notableAlleles: ['FGF5 (Intact ancestral wild-type fur density)', 'EPAS1 (High altitude & hypobaric oxygen carrier)', 'DRD4-480 (Nomadic exploratory drive)'],
      geneticIsolationYearsBp: 9500,
      drd4ReceptorTrait: 'High nomadic wanderlust and pack cohesion with diminished territorial resource guarding.'
    },
    behavioralRadar: {
      endurance: 98,
      biddability: 60,
      preyDrive: 88,
      socialAffiliation: 94,
      coldTolerance: 100,
      vigilance: 52
    },
    historicalMonograph: [
      'The Chukchi dog represents one of the most untouched ancient domesticate lineages on earth. Developed over millennia in coastal and inland tundra, these dogs were selected for extreme aerobic stamina, pulling moderate sled freight across immense distances at -50°C without consuming their own glycogen reserves.',
      'Unlike heavier freighting draft canids, the Siberian lineage was optimized for continuous trotting speeds of 10 to 12 miles per hour. During the 1925 Serum Run to Nome (the Great Race of Mercy), Siberian sled teams led by Leonhard Seppala, Togo, and Gunnar Kaasen transported diphtheria antitoxin over 674 miles of Arctic ice, sealing the breed into international cynological legend.',
      'Modern whole-genome sequencing confirms their basal position on the phylogenetic tree, branching before the major radiation of modern European and Asian breeds.'
    ],
    curatorNotes: 'Requires structured aerobic output exceeding 10 km daily to prevent displacement behaviors. Extraordinary cold adaptation renders them sensitive to ambient temperatures above 26°C.',
    lineageAncestry: {
      ancestralClade: 'Late Pleistocene Siberian Paleolithic Wolf Cross',
      foundationalLine: 'Chukchi Sled Canid Landrace',
      historicalRole: 'Long-distance sub-zero freight transport & thermal hearth companion',
      modernStandardization: 'AKC Registered 1930; FCI Standard 1966'
    }
  },
  {
    id: 'german-shepherd',
    name: 'German Shepherd',
    latinName: 'Canis lupus familiaris pastoralis',
    fciGroup: 'FCI Group 1',
    fciSection: 'Sec. 1.0',
    fciNumber: '166',
    akcRecognition: 1908,
    origin: 'Germany',
    originRegion: 'Thuringia & Württemberg',
    historicalEpoch: 'Late 19th Century (1899 founding by Max von Stephanitz)',
    category: 'herding',
    taxaTag: 'Herding & Protection',
    imageUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1WM5SXnWxB9_ZaEFmu6XhUMu3u8iFS0hOe3y6Fmogti4Vd0NBUE6kM-_z0d_-tRPtRv0iNYoT-br0xuVM8jcwix9BAacs5_fnNJ7CvGalBzAoaYAj049JEHmrOnA51FsEk5OBqxFP71MRSkvlZi6sgNQm0qrWHr07GNuQtRsIEKMuzmecrIHrU22VvJRHucvqCywlQkASI0ZHraQ0uE6cR2yjGxOSZ38B9cxJke-MkBDx7ZrQsCujVD0lg',
    summary: 'Established by Max von Stephanitz in 1899. Celebrated for high working intelligence, extraordinary olfactory acuity, and noble fidelity in utilitarian services.',
    intellectRank: 3,
    intellectScore: 4.9,
    energyScore: 4.5,
    biteForcePsi: 238,
    lifespanMin: 9,
    lifespanMax: 13,
    workingClass: 'Pastoral / Herding',
    groomingLevel: 3.5,
    groomingNote: 'Double Coat (Dense Weather-Resistant Lining)',
    tags: ['herding', 'working', 'protection', 'police', 'k9'],
    keyTraits: ['Intellect Rank #3', 'Confident Drive', 'High Trainability'],
    cephalicIndex: {
      type: 'Mesocephalic',
      ratio: '49.8 (Cranial width / Cranial length)',
      description: 'Wedge-shaped cranial structure with strong jaw musculature, permitting wide stereoscopic field and concentrated bite leverage.'
    },
    physicalMetrics: {
      maleHeightCm: '60 – 65 cm',
      femaleHeightCm: '55 – 60 cm',
      weightKg: '30 – 40 kg (M) / 22 – 32 kg (F)',
      coatStructure: 'Double coat with straight, firm, dense outer coat and dense undercoat; harsh weather tolerance.',
      dentitionBite: 'Scissors bite with deep alveolar anchoring; 42 teeth conforming to complete dental formula.'
    },
    genomicProfile: {
      mitochondrialHaplogroup: 'Haplogroup A (Central European Pastoral)',
      notableAlleles: ['MC1R (Melanophore eumelanin distribution)', 'SOD1 (Superoxide dismutase monitoring marker)', 'DRD4 Variant A (Rapid command apprehension)'],
      geneticIsolationYearsBp: 130,
      drd4ReceptorTrait: 'Supreme associative memory consolidation and rapid operant conditioning speed.'
    },
    behavioralRadar: {
      endurance: 88,
      biddability: 98,
      preyDrive: 84,
      socialAffiliation: 80,
      coldTolerance: 82,
      vigilance: 96
    },
    historicalMonograph: [
      'In 1899, Captain Max von Stephanitz purchased Hektor Linksrhein (subsequently christened Horand von Grafrath) at a canine exhibition in Karlsruhe, proclaiming: "Utility is the true criterion of beauty." From this single sire, the Verein für Deutsche Schäferhunde (SV) codified the archetypal working dog.',
      'Originally conceived to tend vast flocks in fluctuating alpine and lowland German topography, the breed transitioned swiftly into military, telecommunications, sentry, and mountain search duties during World War I and II, proving unmatched in versatile adaptability.',
      'Their cerebral cortex exhibits elevated neuron density in frontal cognitive lobes, enabling nuanced contextual discrimination between routine environmental stimuli and acute protective threats.'
    ],
    curatorNotes: 'Demands rigorous cerebral problem-solving and systematic drive channeling. Regular screening for coxofemoral and elbow congruity recommended according to SV protocols.',
    lineageAncestry: {
      ancestralClade: 'Continental European Herding Canids',
      foundationalLine: 'Horand von Grafrath (ex Hektor Linksrhein)',
      historicalRole: 'Pastoral sheep boundary control, sentry & service work',
      modernStandardization: 'Verein für Deutsche Schäferhunde (1899); FCI 1955'
    }
  },
  {
    id: 'shiba-inu',
    name: 'Shiba Inu',
    latinName: 'Canis lupus familiaris japonicus',
    fciGroup: 'FCI Group 5',
    fciSection: 'Sec. 5.0',
    fciNumber: '257',
    akcRecognition: 1992,
    origin: 'Japan',
    originRegion: 'Chūbu Region & Nagano Mountain Range',
    historicalEpoch: 'Jōmon Period (~300 BCE – 300 CE Archaeological Record)',
    category: 'spitz',
    taxaTag: 'Ancient Spitz / Basal',
    imageUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1UynS8m0mqtCTQTfZ-5484wL8y8gEe3vPkckZKPazml8RHpgItq5J8KXQyZnsWJ24cjiQtcAwvdPqIn_9x1NM_WRtsFde8V-VSUIZhcn82aqbT0dkq-MmFaY2pRjD2hzOtogh4WUpCknE8f-SAoctDVLRbZhDsTBa9tpyKxJxUdXi6HbQu7WBTuLwuOVH1tl1stpbZXCC1cG1V_RVT3Bwyji4h3tTYi2mOtocCC8Mof31_SEkitrLZHNts',
    summary: 'The oldest and smallest of Japan’s native Nihon Ken breeds. Exhibits Kan-i (spirited boldness), fastidious self-grooming, and agile mountain gait.',
    intellectRank: 49,
    intellectScore: 3.9,
    energyScore: 3.5,
    biteForcePsi: 190,
    lifespanMin: 13,
    lifespanMax: 16,
    workingClass: 'Basal Mountain Hunter',
    groomingLevel: 2.5,
    groomingNote: 'Cat-Like Self Grooming, Seasonal Dense Shed',
    tags: ['spitz', 'basal', 'japan', 'nihon-ken', 'mountain'],
    keyTraits: ['Spirited (Kan-i)', 'Fastidious', 'Fox-Like Agility'],
    cephalicIndex: {
      type: 'Mesocephalic',
      ratio: '55.1 (Broad triangular cranial base)',
      description: 'Broad flat skull with prominent cheeks and obliquely set triangular dark hazel eyes.'
    },
    physicalMetrics: {
      maleHeightCm: '39.5 cm (Ideal)',
      femaleHeightCm: '36.5 cm (Ideal)',
      weightKg: '8 – 11 kg',
      coatStructure: 'Harsh, straight outer coat with soft, dense undercoat; thick brush tail held high over spine.',
      dentitionBite: 'Complete scissors bite, firm incisors and powerful canine roots for small-game pinning.'
    },
    genomicProfile: {
      mitochondrialHaplogroup: 'Haplogroup B1 (Jōmon-Yayoi Indigenous Clade)',
      notableAlleles: ['Agrp (Endogenous basal metabolic thrift)', 'Corin (Red urajiro white markings on ventral plane)'],
      geneticIsolationYearsBp: 3200,
      drd4ReceptorTrait: 'High independence, high situational wariness, distinct primitive vocalizations.'
    },
    behavioralRadar: {
      endurance: 76,
      biddability: 54,
      preyDrive: 92,
      socialAffiliation: 62,
      coldTolerance: 86,
      vigilance: 90
    },
    historicalMonograph: [
      'Archaeological excavations of shell mounds (kaizuka) from the prehistoric Jōmon era yielded skeletal remains of small, compact canids with coiled tails and upright ears nearly identical to the modern Shiba Inu.',
      'Bred to navigate the steep, brush-choked terrain of the Chūbu mountainous interior, Shibas flushed pheasants, copper pheasants, and small boars. Japanese cynologists codify their temperament through three classical virtues: Kan-i (intrepid spirited audacity), Ryōsei (good-natured calm fidelity), and Soboku (artless, unadorned rustic purity).',
      'Declared a Living Natural Monument of Japan under the Cultural Properties Protection Law in 1936 following the heroic rescue efforts of the Nihon Ken Hozonkai (NIPPO).'
    ],
    curatorNotes: 'Remarkable feline grooming habits and natural cleanliness. Autonomous temperament requires respectful operant positive reinforcement rather than punitive coercion.',
    lineageAncestry: {
      ancestralClade: 'Basal East Asian Dog Cluster',
      foundationalLine: 'Shinshu Shiba, Mino Shiba & Sanin Shiba amalgam',
      historicalRole: 'Mountain brush small-game flushing and boar pursuit',
      modernStandardization: 'Nihon Ken Hozonkai (1934); FCI Standard 1964'
    }
  },
  {
    id: 'doberman-pinscher',
    name: 'Doberman Pinscher',
    latinName: 'Canis lupus familiaris apoldensis',
    fciGroup: 'FCI Group 2',
    fciSection: 'Sec. 1.1',
    fciNumber: '143',
    akcRecognition: 1908,
    origin: 'Germany',
    originRegion: 'Apolda, Thuringia',
    historicalEpoch: 'Circa 1890 (Codified by Louis Dobermann)',
    category: 'working',
    taxaTag: 'Working & Guard',
    imageUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1VyWWhuByAyNBksMbJ7om_NigpAGssN5wnOu6u58wFT14FbvwotlYN5aPCnwhhRFJqsRff0WddY_baaGRuFjL3Gkm53-y-750p2wItwPJb9UNscnzQEX6PhJ1jDQJw1Z6s0m7QPmnNBtuLm1hy86aYi5stH6mvxu_Jt4eqOKxHvPx3iszRq3Y_0ZfGl3qEiRx3dkCptyqNP5CXaGtIL9F-HBZdUj64cFPXLZKBstXoOdVnYdSEG5j-3HW4',
    summary: 'Originated by Louis Dobermann in Apolda. Synonymous with sleek biomechanics, intense situational vigilance, and muscular economy.',
    intellectRank: 5,
    intellectScore: 4.8,
    energyScore: 4.8,
    biteForcePsi: 305,
    lifespanMin: 10,
    lifespanMax: 12,
    workingClass: 'Protection / Sentry',
    groomingLevel: 1.0,
    groomingNote: 'Smooth Short Single-Layer Coat',
    tags: ['working', 'guard', 'protection', 'athletic', 'sentry'],
    keyTraits: ['Athletic Power', 'High Vigilance', 'Muscular Economy'],
    cephalicIndex: {
      type: 'Dolichocephalic',
      ratio: '45.2 (Elongated aerodynamic skull plane)',
      description: 'Long and lean cranial lines creating parallel planes of skull and muzzle with minimal stop.'
    },
    physicalMetrics: {
      maleHeightCm: '68 – 72 cm',
      femaleHeightCm: '63 – 68 cm',
      weightKg: '40 – 45 kg (M) / 32 – 35 kg (F)',
      coatStructure: 'Short, hard, and dense; lying close and tight to skin with glossy sheen; low cold resilience.',
      dentitionBite: 'Powerful scissor bite with 42 well-developed teeth; exceptionally deep mandibular bone mass.'
    },
    genomicProfile: {
      mitochondrialHaplogroup: 'Haplogroup C (Rottweiler / Beauceron / Pinscher mosaic)',
      notableAlleles: ['PDK4 (Pyruvate dehydrogenase kinase cardiac allele monitoring)', 'BCO2 (Rust-tan markings boundary)'],
      geneticIsolationYearsBp: 135,
      drd4ReceptorTrait: 'Hypersensitive spatial alerting, lightning sprint acceleration, intense handler focus.'
    },
    behavioralRadar: {
      endurance: 85,
      biddability: 95,
      preyDrive: 86,
      socialAffiliation: 78,
      coldTolerance: 45,
      vigilance: 99
    },
    historicalMonograph: [
      'Louis Dobermann, serving as local tax collector, night watchman, and municipal dog catcher in Apolda, sought to engineer the definitive personal bodyguard canid: courageous, fast, intimidating, yet discerning and affectionate with immediate kin.',
      'By synthesizing the old German Pinscher, Rottweiler, Beauceron, and English Greyhound, Dobermann fused muscular force with kinetic sprint efficiency. His successor Otto Göller stabilized the standard through the National Dobermann Pinscher Club in 1899.',
      'Known colloquially as the "Gendarme dog," Dobermans distinguished themselves extensively in marine corps scouting expeditions in the Pacific theater, winning the epithet "Semper Fidelis" and eternal civic gratitude.'
    ],
    curatorNotes: 'Single coat necessitates indoor shelter and protective blankets during harsh winter frost. Outstanding agility and obedience competition candidate.',
    lineageAncestry: {
      ancestralClade: 'Central European Molosser-Pinscher Blend',
      foundationalLine: 'Early Thuringian Pinscher / Rottweiler Cross',
      historicalRole: 'Tax collector bodyguard, nocturnal municipal security & military scouting',
      modernStandardization: 'Dobermann-Pinscher Club (1899); FCI 1955'
    }
  },
  {
    id: 'golden-retriever',
    name: 'Golden Retriever',
    latinName: 'Canis lupus familiaris venaticus',
    fciGroup: 'FCI Group 8',
    fciSection: 'Sec. 1.0',
    fciNumber: '111',
    akcRecognition: 1925,
    origin: 'Scotland',
    originRegion: 'Guisachan, Glen Affric, Scottish Highlands',
    historicalEpoch: 'Victorian Era (1868 Nous & Belle Foundation Cross)',
    category: 'sporting',
    taxaTag: 'Gundog / Sporting',
    imageUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1XCYRJG4LfXKD77zXMMXKxB7n1BWtT7DorL97YugJAENGsULOkEE_0qyrLnr86DIShz1BSrNl92oQCQ6fYMB1p6TN7TzD3csrkEUcyZ8z4utcnqkTtupdKz1xXJcGk5WJgNPui21vRiYylHIssDb03D7rqJLk8EVcpsFcK8CIsM3S14FbO9dpPLe6TupJ-G29Iu6m72wWvrlNy0Qk0pNrLTfT0qDi11ocvHV6DuDYWpK4yWAgl2i3VMl7A',
    summary: 'Bred by Lord Tweedmouth at Guisachan Estate. Acclaimed for supreme biddability, water-repellent dense coat, and exquisite gentle retrieve reflex.',
    intellectRank: 4,
    intellectScore: 4.7,
    energyScore: 4.0,
    biteForcePsi: 190,
    lifespanMin: 10,
    lifespanMax: 12,
    workingClass: 'Gundog / Field Retriever',
    groomingLevel: 3.5,
    groomingNote: 'Water Coat Feathering, Periodic Shedding',
    tags: ['sporting', 'gundog', 'retriever', 'water', 'gentle'],
    keyTraits: ['Biddable Nature', 'Gentle Soft Mouth', 'High Sociability'],
    cephalicIndex: {
      type: 'Mesocephalic',
      ratio: '51.8 (Broad cranial dome with distinct frontal stop)',
      description: 'Chiseled skull, wide braincase, and deep powerful muzzle engineered for soft-mouth waterfowl carrying.'
    },
    physicalMetrics: {
      maleHeightCm: '56 – 61 cm',
      femaleHeightCm: '51 – 56 cm',
      weightKg: '30 – 34 kg (M) / 25 – 32 kg (F)',
      coatStructure: 'Dense and water-repellent double coat with good feathering on forelegs and underbody; rich luster.',
      dentitionBite: 'Scissors bite with supreme neuro-muscular jaw inhibition ("soft mouth" carrying without tissue puncture).'
    },
    genomicProfile: {
      mitochondrialHaplogroup: 'Haplogroup A (British Sporting Gun Dog Clade)',
      notableAlleles: ['FGF5 (Wavy long coat feathering)', 'SOD1 / PRCD (Retinal health genetic assays)'],
      geneticIsolationYearsBp: 155,
      drd4ReceptorTrait: 'Extraordinary human-directed prosociality, low intra-species aggression, high cooperative focus.'
    },
    behavioralRadar: {
      endurance: 82,
      biddability: 96,
      preyDrive: 74,
      socialAffiliation: 99,
      coldTolerance: 80,
      vigilance: 50
    },
    historicalMonograph: [
      'In the mid-19th century, wildfowling was elevated to an aristocratic art across the Scottish Highlands. Dudley Marjoribanks (later 1st Baron Tweedmouth) maintained meticulous studbooks at his Guisachan estate, breeding a yellow Wavy-Coated Retriever named "Nous" with a Tweed Water Spaniel named "Belle" in 1868.',
      'Through strategic outcrosses with Irish Setters and Bloodhounds, Tweedmouth created an incomparable retriever capable of marking downed game in marshland, braving freezing lochs, and gently delivering game unblemished to hand.',
      'Today, their profound cognitive empathy and cooperative motivation position them as the global standard for assistance, guide work, and therapeutic interventions.'
    ],
    curatorNotes: 'Coat demands regular carding to prevent dense matting behind auricular flaps and caudal thigh feathering. Thrives on retrieving exercises in aquatic environments.',
    lineageAncestry: {
      ancestralClade: 'British Water Spaniel / St. John’s Canid Radiance',
      foundationalLine: 'Nous (Yellow Retriever) x Belle (Tweed Water Spaniel)',
      historicalRole: 'Highland waterfowl retrieve & upland game marking',
      modernStandardization: 'Kennel Club of England (1913); FCI Standard 1954'
    }
  },
  {
    id: 'samoyed',
    name: 'Samoyed',
    latinName: 'Canis lupus familiaris bjelkier',
    fciGroup: 'FCI Group 5',
    fciSection: 'Sec. 1.0',
    fciNumber: '212',
    akcRecognition: 1906,
    origin: 'NW Siberia',
    originRegion: 'Yamal Peninsula & Taymyr Autonomous Okrug',
    historicalEpoch: 'Ancient Circumpolar Landrace (>1,000 BP)',
    category: 'spitz',
    taxaTag: 'Primitive Nordic Spitz',
    imageUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1WRFlSbUtkPxLaxKc8iDYeZvHoQwgtYbFNHJV3tD7ddpHol_ZbCantMwkjSJSbyaSkhywIOXciEK8NsSV-sHkkY6eEDFcKPb7EnmdSxHTD8mwkPB6jub17wxcPZ4bmw58uEdleQvGFXG3qiQI-m4Rkp3HpiuNO4dhYb2w2jWxdLOG1A_RUX8dHEBEMSv1wmkpbpxjrJRW5C8CAg8Z2vDGub5VZ8xD4NPWLQHM6W566XvNvSA9fpdRbDVA',
    summary: 'Reindeer-herding companion of the Arctic Samoyedic peoples. Celebrated for its upturned mouth corners inhibiting icicle formation, and pure white weather-resistant coat.',
    intellectRank: 33,
    intellectScore: 3.7,
    energyScore: 4.2,
    biteForcePsi: 240,
    lifespanMin: 12,
    lifespanMax: 14,
    workingClass: 'Nordic Pastoral / Draft',
    groomingLevel: 5.0,
    groomingNote: 'Intense Polar Fluff (Heavy Dual Stratification)',
    tags: ['spitz', 'arctic', 'samoyed', 'reindeer', 'polar'],
    keyTraits: ['Signature Smile', 'Arctic Weatherproof', 'Pack Affection'],
    cephalicIndex: {
      type: 'Mesocephalic',
      ratio: '53.8 (Conical polar skull profile)',
      description: 'Conical, strong skull with slight upward tilt of the lip corners to avert frozen drool droplets during blizzards.'
    },
    physicalMetrics: {
      maleHeightCm: '57 cm (±3cm)',
      femaleHeightCm: '53 cm (±3cm)',
      weightKg: '20 – 30 kg',
      coatStructure: 'Profuse, thick, supple and dense polar coat; dense soft woolly underfur with harsh straight outer coat shining with silver tips.',
      dentitionBite: 'Regular and complete scissor bite with heavy enamel calcification resisting Arctic wind exposure.'
    },
    genomicProfile: {
      mitochondrialHaplogroup: 'Haplogroup d1 (North Siberian Indigenous Nomadic Lineage)',
      notableAlleles: ['TYRP1 (Pure white silver-tipped pheomelanin inhibition)', 'SLC2A9 (Uric acid transport efficiency in subpolar diets)'],
      geneticIsolationYearsBp: 3500,
      drd4ReceptorTrait: 'High gentle social trust, cooperative herd herding instinct, lack of aggressive territorial hostility.'
    },
    behavioralRadar: {
      endurance: 92,
      biddability: 70,
      preyDrive: 68,
      socialAffiliation: 98,
      coldTolerance: 100,
      vigilance: 72
    },
    historicalMonograph: [
      'The Nenets and other Samoyedic reindeer nomads bred the Bjelkier ("white dog that breeds white") in northwestern Siberia. In these unforgiving polar tundra zones, the canids were multi-functional: herding vast semi-domestic reindeer herds, pulling sledges over drifting snow, and sleeping inside choom tents to keep young children warm.',
      'British explorer Ernest Kilburn-Scott introduced the first specimen to England in 1889. Explorers Fridtjof Nansen, Robert Falcon Scott, and Roald Amundsen enlisted Samoyedic dogs on historic polar expeditions due to their serene disposition and polar resilience.',
      'Their famed "Samoyed smile" (slightly upturned corners of the mouth) evolved as a critical anatomical adaptation preventing saliva from freezing into sharp icicles along the muzzle.'
    ],
    curatorNotes: 'Requires rigorous line-combing at the skin level weekly to prevent dermal moisture entrapment. Pure white coat has natural self-cleaning shedding action when dry.',
    lineageAncestry: {
      ancestralClade: 'Siberian Basal Arctic Sledge Canid',
      foundationalLine: 'Nenets Reindeer Herding Dog (Laika)',
      historicalRole: 'Reindeer pastoralism, tent heater & light polar draft',
      modernStandardization: 'The Kennel Club (1909); FCI Standard 1959'
    }
  }
];

export const TAXA_FILTERS = [
  { id: 'all', label: 'All Specimen (6)' },
  { id: 'spitz', label: 'Spitz & Arctic' },
  { id: 'working', label: 'Working & Guard' },
  { id: 'herding', label: 'Herding' },
  { id: 'sporting', label: 'Gundog / Sporting' }
] as const;

export const ARCHIVAL_THESIS = {
  title: 'Whole-Genome Comparative Sequencing of Basal Arctic & European Working Lineages',
  series: 'Genomic Series 2024.11',
  doi: '10.1038/s41588-canis-024',
  pages: '48 Pages',
  format: 'PDF Archive / High Precision Folio',
  abstract: 'An empirical investigation analyzing 142 microsatellite markers and single-nucleotide polymorphisms (SNPs) across the Chukchi Siberian, Spitz, and Western Herding clades, validating phenotypic insulation alleles (FGF5, RSPO2) and bite mechanics loci.',
  findings: [
    {
      title: 'Key Finding I',
      highlight: 'Arctic clades exhibit distinct mitochondrial haplogroup d2, isolated 9,500 years BP.',
      detail: 'Sequencing confirms that the Chukchi Siberian Husky and Samoyed lineages branched independently of the main Holocene European dog radiation, preserving prehistoric metabolic adaptations to lipid-dense seal and caribou nutrition.'
    },
    {
      title: 'Key Finding II',
      highlight: 'Working group trainability correlates directly with DRD4 dopamine receptor polymorphisms.',
      detail: 'Pastoral breeds (German Shepherd) and Sporting Retrievers demonstrate elevated frequencies of the 48bp repeat allele in exon 3 of DRD4, accounting for rapid operant cue conditioning and lowered frustration latency.'
    },
    {
      title: 'Key Finding III',
      highlight: 'Cranial cephalic index correlates directly with temporalis muscle mechanical advantage.',
      detail: 'Dolichocephalic skulls (Doberman Pinscher) generate peak shear force at the canine cusps (305 PSI), while Mesocephalic arctic skulls balance bite distribution across carnassials for crushing frozen tissue.'
    }
  ],
  authors: [
    'Dr. Aurelia Vance, PhD (Curator of Canine Evolutionary Genomics, Oxford)',
    'Prof. Kenjiro Takahashi (Institute of Cynological Morphometrics, Kyoto)',
    'Dr. Hélène Moreau (CNRS Cynogenetic Laboratory, Lyon)'
  ]
};
