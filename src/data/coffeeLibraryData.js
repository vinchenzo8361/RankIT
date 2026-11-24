// Comprehensive Coffee Encyclopedia, Brewing Science & Home Guides
export const coffeeLibraryData = {
  overview: {
    title: 'The Coffee Encyclopedia & Master Guide',
    tagline: 'From Bean to Cup: Roast Chemistry, Espresso Anatomy, and Home Brewing',
    summary: 'Everything you need to know about coffee: roast levels, roast profiles, espresso drinks explained, bean varieties, and step-by-step home brewing methods.'
  },

  // 1. Types of Coffee Drinks (Latte, Cappuccino, Americano, etc.)
  drinkTypes: [
    {
      id: 'espresso',
      name: 'Espresso',
      italianMeaning: 'Pressed-out',
      ratio: '1:2 (e.g. 18g coffee to 36g liquid espresso)',
      caffeine: '64 mg (per 30ml single shot)',
      description: 'The foundation of all modern specialty coffee. Water forced under 9 bars of pressure through finely ground coffee in 25–30 seconds. Composed of a rich syrupy body, deep heart, and a golden aromatic foam layer on top called the crema.',
      ingredients: 'Finely ground coffee + high-pressure hot water (93°C / 200°F).'
    },
    {
      id: 'latte',
      name: 'Caffè Latte',
      italianMeaning: 'Milk Coffee',
      ratio: '1/6 Espresso + 4/6 Steamed Milk + 1/6 Microfoam',
      caffeine: '64–128 mg (1–2 shots)',
      description: 'The creamiest and mildest espresso drink. Made with one or two shots of espresso topped with a large volume of steamed milk and a thin 5mm layer of silky microfoam on top, perfect for latte art.',
      ingredients: '1–2 shots espresso, 240–300ml steamed milk, thin microfoam layer.'
    },
    {
      id: 'cappuccino',
      name: 'Cappuccino',
      italianMeaning: 'Named after the hoods of Capuchin monks',
      ratio: '1/3 Espresso + 1/3 Steamed Milk + 1/3 Thick Milk Foam',
      caffeine: '64–128 mg',
      description: 'Famous for its velvety, luxurious mouthfeel and distinct contrast. Traditional Italian cappuccino is served in a 150–180ml cup with equal thirds of rich espresso, sweet steamed milk, and a dense, pillow-like dome of froth often dusted with cocoa.',
      ingredients: 'Espresso shot, steamed milk, dense aerated foam.'
    },
    {
      id: 'americano',
      name: 'Caffè Americano',
      italianMeaning: 'American-style coffee',
      ratio: '1/3 Espresso + 2/3 Hot Water',
      caffeine: '64–128 mg',
      description: 'Invented during World War II when American soldiers stationed in Italy diluted intense Italian espresso with hot water to mimic the drip coffee from back home. Preserves the complex flavor profile of espresso with a lighter, drip-coffee mouthfeel.',
      ingredients: '1–2 shots espresso poured into 180–240ml hot water.'
    },
    {
      id: 'flat-white',
      name: 'Flat White',
      origin: 'Australia / New Zealand',
      ratio: '1/3 Double Ristretto/Espresso + 2/3 Steamed Whole Milk',
      caffeine: '128 mg (Double shot standard)',
      description: 'Originating in Melbourne and Wellington in the 1980s. Stronger than a latte with less milk, featuring glossy steamed microfoam completely folded into the coffee rather than sitting on top as a separate fluffy layer.',
      ingredients: 'Double espresso (often ristretto) + 150ml glossy microfoam.'
    },
    {
      id: 'cortado',
      name: 'Cortado',
      origin: 'Spain / Latin America',
      ratio: '1:1 Equal parts Espresso and Warm Steamed Milk',
      caffeine: '64–128 mg',
      description: 'From the Spanish verb "cortar" (to cut). The steamed milk gently cuts through the acidity and bitterness of the espresso without overpowering its rich, intense bean aromatics.',
      ingredients: '60ml double espresso + 60ml lightly textured warm milk.'
    },
    {
      id: 'macchiato',
      name: 'Espresso Macchiato',
      italianMeaning: 'Stained or Marked',
      ratio: 'Espresso with a dash/dollop of milk foam',
      caffeine: '64 mg',
      description: 'A shot of espresso "marked" with a single spoonful of textured milk foam. Not to be confused with commercial dessert caramel drinks—authentic Italian macchiato is intensely strong and concentrated.',
      ingredients: 'Single espresso shot + 1 teaspoon foamed milk.'
    },
    {
      id: 'cold-brew',
      name: 'Cold Brew',
      ratio: '1:8 to 1:12 steep ratio',
      caffeine: '150–200 mg per 250ml',
      description: 'Coarsely ground coffee steeped in cold or ambient filtered water for 12 to 24 hours. Cold extraction pulls out chocolate and caramel notes while bypassing hot water oxidation, resulting in 65% less perceived acidity and a naturally sweet, silky cup.',
      ingredients: 'Coarse ground coffee + cold filtered water steeped 16–20 hrs.'
    }
  ],

  // 2. Roast Levels, Intensities & Flavor Profiles
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

  // 3. Step-by-Step Home Brewing Guide
  homeBrewingGuide: [
    {
      method: 'French Press (Immersion Brewing)',
      difficulty: 'Beginner',
      gearNeeded: 'French Press, Kettle, Spoon',
      grindSize: 'Coarse (Sea salt consistency)',
      coffeeToWater: '1:15 ratio (e.g. 30g coffee to 450g water)',
      waterTemp: '94°C (200°F) — 45 seconds off the boil',
      steps: [
        'Add 30g of coarse freshly ground coffee to the glass carafe.',
        'Pour 450g hot water vigorously to saturate all grounds evenly.',
        'Place lid on top with plunger pulled up. Set a timer for 4:00 minutes.',
        'At 4:00, use a soup spoon to gently crust-break the top floating coffee. The grounds will sink to the bottom.',
        'Gently press the mesh filter down just below the liquid surface and pour immediately. Never leave brewed coffee sitting in the press.'
      ],
      tastingNotes: 'Heavy, rich, bold mouthfeel with natural aromatic coffee oils preserved.'
    },
    {
      method: 'Pour-Over (Hario V60 / Kalita Wave)',
      difficulty: 'Intermediate',
      gearNeeded: 'Pour-over cone, paper filter, gooseneck kettle, kitchen scale',
      grindSize: 'Medium-Fine (Kosher salt consistency)',
      coffeeToWater: '1:16 ratio (e.g. 15g coffee to 240g water)',
      waterTemp: '93°C (200°F)',
      steps: [
        'Fold and rinse the paper filter with hot water to remove paper taste, then discard rinse water.',
        'Add 15g of ground coffee, make a small dimple in the center, and tare scale to zero.',
        'Bloom phase: Pour 45g of water gently in circles. Wait 40 seconds to allow trapped carbon dioxide gas to escape.',
        'Pour 2: In slow concentric circles from inside out, pour steadily until reaching 150g by 1:15.',
        'Final Pour: Continue pouring gently up to 240g total water by 1:45. Let draw down completely by 2:45 to 3:00.'
      ],
      tastingNotes: 'Pristine clarity, vibrant acidity, highlights floral, berry, and citrus flavor notes.'
    },
    {
      method: 'AeroPress (Inverted or Classic)',
      difficulty: 'Beginner to Intermediate',
      gearNeeded: 'AeroPress chamber, paper/metal filter, paddle',
      grindSize: 'Medium-Fine',
      coffeeToWater: '1:14 ratio (e.g. 16g coffee to 220g water)',
      waterTemp: '85°C – 90°C (185°F – 194°F) — Cooler water reduces bitterness',
      steps: [
        'Insert paper filter in cap and wet with warm water.',
        'Add 16g of medium-fine coffee into chamber over a sturdy mug.',
        'Pour 220g hot water in 10 seconds. Stir 3 times with paddle.',
        'Insert plunger 1cm to create a vacuum seal and prevent dripping. Steep for 1:30 minutes.',
        'Gently press down with steady body weight for 30 seconds until you hear a soft hiss.'
      ],
      tastingNotes: 'Smooth, sweet, clean body with almost zero bitterness and low perceived acidity.'
    },
    {
      method: 'Stovetop Moka Pot (Italian Espresso-Style)',
      difficulty: 'Intermediate',
      gearNeeded: 'Bialetti / Moka Pot, stove or burner',
      grindSize: 'Fine (Finer than drip, coarser than commercial espresso)',
      coffeeToWater: 'Fill boiler to lower pressure valve; fill basket loosely',
      waterTemp: 'Pre-boiled water in lower chamber (prevents burnt taste)',
      steps: [
        'Fill bottom boiler chamber with pre-boiled hot water up to just beneath the safety release valve.',
        'Fill funnel basket with fine coffee grounds. Level it off smoothly with your finger—NEVER tamp or press down firmly.',
        'Screw top carafe tightly onto base using a towel to protect your hands from hot bottom chamber.',
        'Place on medium-low heat with the lid open. Watch for coffee to emerge like warm golden honey.',
        'As soon as stream turns light pale yellow and starts sputtering (frothing hiss), immediately remove from heat and run bottom base under cold sink water to stop extraction instantly.'
      ],
      tastingNotes: 'Intense, thick, espresso-like strength, perfect base for homemade lattes and iced coffees.'
    }
  ],

  // 4. Bean Types & Origins
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
