// Comprehensive Coffee Encyclopedia, History, Chemistry, and Dynamic Home Brewing Permutations
export const coffeeLibraryData = {
  // 1. Complete History & Origins of Coffee
  coffeeHistory: {
    title: 'The Origin, Spread & Evolution of Coffee',
    subtitle: 'From Ancient Ethiopian Goat Herders to the Modern Third-Wave Specialty Boom',
    timeline: [
      {
        era: '850 CE: The Ethiopian Highlands & Kaldi the Goat Herder',
        year: 'c. 850 CE',
        title: 'Discovery in Ancient Kaffa, Ethiopia',
        content: 'Legend records that Kaldi, an Ethiopian goat herder, noticed his flock dancing with unusual hyperactivity after chewing bright red berries from an unfamiliar forest shrub. Curious, Kaldi brought the berries to an Islamic monastery. The abbot condemned them as devils work and threw them into a fire. Soon, an intoxicatingly aromatic roasted fragrance wafted out; the monks raked out the glowing beans, crushed them into hot water, and drank the world’s very first cup of coffee to stay alert during nocturnal prayer vigils.'
      },
      {
        era: '1400s – 1500s: The Arabian Peninsula & Sufi Monasteries',
        year: '1400s – 1500s',
        title: 'Yemen, Mocha & The First Coffee Houses',
        content: 'Coffee cultivation began systematically in Yemen across the Red Sea. Sufi mystics drank "Qahwah" to sustain concentration during overnight spiritual chants. By the 1500s, commercial port cities like Mocha exported beans across Egypt, Syria, and Turkey. The world’s first public coffeehouses ("Kaveh Kanes") opened in Mecca and Istanbul, nicknamed "Schools of the Wise" because scholars, poets, and politicians gathered to converse, play chess, and listen to music.'
      },
      {
        era: '1600s – 1700s: European Arrival & The Smuggling of Fertile Seeds',
        year: '1600s – 1700s',
        title: 'From Venetian Traders to the London Stock Exchange',
        content: 'Ottoman merchants introduced coffee to Venice in 1615. Initially denounced by Catholic clergy as the "bitter invention of Satan," Pope Clement VIII tasted it, was captivated, and playfully declared he would baptize it to fool the Devil. Coffee houses exploded across London, Paris, and Vienna. The London Stock Exchange, Lloyd’s of London insurance, and Sotheby’s auction house were all founded inside 17th-century London coffeehouses. The Dutch successfully smuggled fertile coffee seedlings out of Yemen to plant in Java (Indonesia) and Suriname.'
      },
      {
        era: '1800s – 1900s: Industrial Extraction & Espresso Machinery',
        year: '1884 – 1948',
        title: 'Italian Steam Engineering & Achille Gaggia’s Crema',
        content: 'Angelo Moriondo of Turin patented the first steam-driven coffee machine in 1884. In 1948, Milanese inventor Achille Gaggia revolutionized coffee forever by designing a spring-piston lever machine that forced hot water through tightly packed coffee grounds at 9 atmospheres of high pressure. For the first time, espresso emerged crowned with a golden, velvety aromatic foam layer—which Gaggia marketed as "Caffè Crema".'
      },
      {
        era: 'Late 20th – 21st Century: The Three Waves of Coffee',
        year: '1970s – Present',
        title: 'First, Second, and Third Wave Specialty Coffee',
        content: 'First Wave brought cheap instant cans into every suburban pantry (Folgers, Maxwell House). Second Wave (spearheaded by Peet’s and Starbucks) popularized espresso bars, dark Italian roasts, and flavored lattes. Today’s Third Wave treats coffee as an artisanal agricultural delicacy similar to fine wine—emphasizing single-origin micro-lots, transparent fair-trade farmer co-ops, light-to-medium roast profiles, and precision brewing chemistry.'
      }
    ]
  },

  // 2. Types of Coffee Drinks (Latte, Cappuccino, Americano, Cortado, etc.)
  drinkTypes: [
    {
      id: 'espresso',
      name: 'Espresso',
      italianMeaning: 'Pressed-out under pressure',
      ratio: '1:2 (e.g. 18g ground coffee yields 36g liquid espresso)',
      caffeine: '64 mg (per 30ml single shot)',
      description: 'The foundation of all modern specialty espresso drinks. Water forced at 9 bars of pressure through finely ground coffee in 25–30 seconds. Features a deep body, sweet heart, and a golden aromatic crema foam layer.',
      ingredients: 'Finely ground coffee + high-pressure hot water (93°C / 200°F).'
    },
    {
      id: 'latte',
      name: 'Caffè Latte',
      italianMeaning: 'Milk Coffee',
      ratio: '1/6 Espresso + 4/6 Steamed Milk + 1/6 Microfoam',
      caffeine: '64–128 mg (1–2 shots)',
      description: 'The creamiest and mildest espresso drink. Made with one or two shots of espresso topped with a generous volume of silky steamed milk and a thin 5mm layer of glossy microfoam on top, perfect for latte art.',
      ingredients: '1–2 shots espresso, 240–300ml steamed milk, thin microfoam layer.'
    },
    {
      id: 'cappuccino',
      name: 'Cappuccino',
      italianMeaning: 'Named after the brown hoods of Capuchin monks',
      ratio: '1/3 Espresso + 1/3 Steamed Milk + 1/3 Aerated Foam Dome',
      caffeine: '64–128 mg',
      description: 'Famous for its velvety contrast and dense foam dome. Served in a 150–180ml ceramic cup with equal thirds of rich espresso, sweet steamed milk, and a thick airy foam cap often dusted with cocoa.',
      ingredients: 'Espresso shot, steamed milk, dense aerated foam.'
    },
    {
      id: 'americano',
      name: 'Caffè Americano',
      italianMeaning: 'American-style diluted coffee',
      ratio: '1/3 Espresso + 2/3 Hot Water',
      caffeine: '64–128 mg',
      description: 'Invented during World War II when American GIs stationed in Italy found Italian espresso too concentrated and added hot water to emulate American drip coffee. Retains espresso aromatics with light drip body.',
      ingredients: '1–2 shots espresso poured into 180–240ml hot water.'
    },
    {
      id: 'flat-white',
      name: 'Flat White',
      origin: 'Australia / New Zealand',
      ratio: '1/3 Double Ristretto/Espresso + 2/3 Steamed Whole Milk',
      caffeine: '128 mg (Double shot standard)',
      description: 'Stronger and more coffee-forward than a latte, with glossy steamed microfoam completely blended into the drink rather than sitting on top as a stiff separate foam cap.',
      ingredients: 'Double espresso (often ristretto) + 150ml glossy microfoam.'
    },
    {
      id: 'cortado',
      name: 'Cortado',
      origin: 'Spain / Latin America',
      ratio: '1:1 Equal parts Espresso and Warm Textured Milk',
      caffeine: '64–128 mg',
      description: 'From the Spanish verb "cortar" (to cut). The steamed milk gently cuts through the acidity of the espresso without overpowering its rich, intense bean notes.',
      ingredients: '60ml double espresso + 60ml lightly textured warm milk.'
    },
    {
      id: 'macchiato',
      name: 'Espresso Macchiato',
      italianMeaning: 'Stained or Marked',
      ratio: 'Espresso with a dash/dollop of milk foam',
      caffeine: '64 mg',
      description: 'A shot of espresso "marked" with a single spoonful of textured milk foam. Concentrated and punchy.',
      ingredients: 'Single espresso shot + 1 teaspoon foamed milk.'
    },
    {
      id: 'cold-brew',
      name: 'Cold Brew',
      ratio: '1:8 to 1:12 steep ratio',
      caffeine: '150–200 mg per 250ml',
      description: 'Coarsely ground coffee steeped in cold filtered water for 16 to 24 hours. Cold extraction bypasses heat-induced oxidation, yielding 65% less perceived acidity and deep chocolate notes.',
      ingredients: 'Coarse ground coffee + cold filtered water steeped 16–20 hrs.'
    }
  ],

  // 3. Roast Levels, Intensities & Flavor Profiles
  roastLevels: [
    {
      level: 'Light Roast (Cinnamon / New England)',
      temp: '196°C – 205°C (385°F – 401°F)',
      internalTemp: 'Roasted just to "First Crack"',
      color: 'Light brown, dry matte surface (no oils)',
      intensity: 'Intensity 3–5 / 12',
      caffeineLevel: 'Highest caffeine density per bean weight',
      flavorProfile: 'Bright, pronounced citrus acidity, floral notes, crisp green apple, berries, and original origin terroir.',
      bestFor: 'Pour Over (V60, Chemex), AeroPress, Chemex drip filter.'
    },
    {
      level: 'Medium Roast (City / American)',
      temp: '210°C – 219°C (410°F – 426°F)',
      internalTemp: 'Between First Crack and start of Second Crack',
      color: 'Warm milk chocolate brown, matte surface',
      intensity: 'Intensity 6–8 / 12',
      caffeineLevel: 'Balanced caffeine and extraction solubility',
      flavorProfile: 'The crowd favorite. Balanced acidity, pronounced sweetness, caramel, milk chocolate, toasted nuts, and stone fruit.',
      bestFor: 'Drip coffee makers, French Press, balanced everyday espresso.'
    },
    {
      level: 'Medium-Dark Roast (Full City / Vienna)',
      temp: '225°C (437°F)',
      internalTemp: 'Beginning of "Second Crack"',
      color: 'Rich chestnut brown with light oil droplets emerging',
      intensity: 'Intensity 8–10 / 12',
      caffeineLevel: 'Moderate',
      flavorProfile: 'Heavy body, dark cocoa, molasses, roasted pecans, and faint smoky undertones with minimal acidity.',
      bestFor: 'Traditional espresso machines, Moka Pot, Cold Brew.'
    },
    {
      level: 'Dark Roast (French / Italian Roast)',
      temp: '240°C – 245°C (464°F – 473°F)',
      internalTemp: 'Past Second Crack (cellular wall breakdown)',
      color: 'Deep shiny dark brown to charcoal, covered in visible natural oils',
      intensity: 'Intensity 10–12 / 12 (Maximum Boldness)',
      caffeineLevel: 'Slightly lower per bean volume due to prolonged roasting burn-off',
      flavorProfile: 'Intense bittersweet chocolate, toasted wood, camp smoke, burnt sugar, low acidity, thick lingering crema.',
      bestFor: 'Caffè Latte, Cappuccino (cuts through heavy milk), Cuban Cafecito, Moka Pot.'
    }
  ],

  // 4. Interactive Home Brewing Methods with Equipment Checklist & Dynamic Permutations
  homeBrewingMethods: [
    {
      id: 'pour-over',
      name: 'Pour-Over (Hario V60 / Kalita)',
      tagline: 'Clean, crisp, aromatic clarity',
      difficulty: 'Intermediate',
      defaultRatio: '1:16 (15g coffee : 240g water)',
      equipment: [
        { id: 'dripper', name: 'Pour-Over Cone (V60 / Kalita)', essential: true, fallback: 'Standard coffee funnel or clean mug' },
        { id: 'filter', name: 'Paper / Cloth Filter', essential: true, fallback: 'Clean paper towel, cheesecloth or fine metal sieve' },
        { id: 'scale', name: 'Digital Kitchen Scale', essential: false, fallback: 'Tablespoon measurement (approx 2 level tbsp = 10g coffee)' },
        { id: 'gooseneck', name: 'Gooseneck Kettle', essential: false, fallback: 'Standard kettle poured slowly from the spout or measuring cup' }
      ]
    },
    {
      id: 'french-press',
      name: 'French Press (Immersion Pot)',
      tagline: 'Rich, bold, full-bodied extraction',
      difficulty: 'Beginner',
      defaultRatio: '1:15 (30g coffee : 450g water)',
      equipment: [
        { id: 'press', name: 'French Press Carafe & Mesh Plunger', essential: true, fallback: 'Mason jar steeped + poured through a kitchen mesh strainer' },
        { id: 'coarse_grind', name: 'Coarse Coffee Grounds', essential: true, fallback: 'Medium ground coffee steeped 3 minutes instead of 4' },
        { id: 'scale', name: 'Kitchen Scale', essential: false, fallback: 'Tablespoons: 4 heaping tablespoons coffee for 2 large mugs of water' },
        { id: 'timer', name: 'Timer / Stopwatch', essential: false, fallback: 'Count to 240 seconds mentally or watch the kitchen clock' }
      ]
    },
    {
      id: 'moka-pot',
      name: 'Stovetop Moka Pot (Italian Espresso)',
      tagline: 'Thick, syrupy, concentrated crema-base',
      difficulty: 'Intermediate',
      defaultRatio: 'Fill bottom chamber to valve; fill basket loosely',
      equipment: [
        { id: 'moka', name: 'Bialetti / Moka Pot', essential: true, fallback: 'Cannot substitute Moka steam boiler principle' },
        { id: 'fine_grind', name: 'Fine-Medium Coffee Grounds', essential: true, fallback: 'Store-bought espresso ground coffee' },
        { id: 'preboiled', name: 'Pre-Boiled Hot Water', essential: false, fallback: 'Cold tap water (takes longer to boil and can impart metallic notes)' },
        { id: 'stovetop', name: 'Stove / Induction Burner', essential: true, fallback: 'Portable camp burner or hot plate' }
      ]
    },
    {
      id: 'aeropress',
      name: 'AeroPress Pressure Brewer',
      tagline: 'Smooth, rapid, zero-bitterness cup',
      difficulty: 'Beginner',
      defaultRatio: '1:14 (16g coffee : 220g water)',
      equipment: [
        { id: 'chamber', name: 'AeroPress Chamber & Plunger', essential: true, fallback: 'Standard immersion steep in mug' },
        { id: 'filter', name: 'Micro Paper Filter', essential: true, fallback: 'Cut-to-size standard coffee filter paper circle' },
        { id: 'paddle', name: 'Stirring Paddle / Spoon', essential: false, fallback: 'Regular kitchen spoon or butter knife' },
        { id: 'scale', name: 'Scale / Measuring Scoop', essential: false, fallback: 'Use the AeroPress numbered chamber marks and scoop' }
      ]
    }
  ],

  // 5. Bean Species
  beanSpecies: [
    {
      species: 'Coffea Arabica (Arabica)',
      share: '60% – 70% of global production',
      altitudes: '900m – 2,200m above sea level',
      caffeine: '1.2% – 1.5% by bean weight',
      characteristics: 'Delicate, sweet, complex aromatic profiles containing 60% more lipids and almost double the natural sugar of Robusta. Grown at high mountain elevations where slow maturation creates higher acidity, floral notes, and fruity complexity.'
    },
    {
      species: 'Coffea Canephora (Robusta)',
      share: '30% – 40% of global production',
      altitudes: 'Sea level – 800m',
      caffeine: '2.2% – 2.7% by bean weight (Nearly double Arabica)',
      characteristics: 'Hardy crop resistant to pests and diseases due to high natural caffeine content (which acts as a botanical defense mechanism). Produces deep crema, earthy, nutty, dark chocolate notes, and punchy bitterness. Essential in traditional Italian espresso blends and Vietnamese Phin coffee.'
    }
  ]
};
