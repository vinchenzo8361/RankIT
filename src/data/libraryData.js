// Comprehensive Energy Drink Encyclopedia, Product Deep-Dives, History, and Cultural Impact
export const libraryData = {
  energyDrinkHistory: {
    title: 'The Complete History & Evolution of Energy Drinks',
    subtitle: 'From Post-War Asian Restorative Tonics to a $90 Billion Global Cultural Phenomenon',
    timeline: [
      {
        era: '1960s: The Japanese Pharmaceutical Roots',
        year: '1962',
        title: 'Lipovitan D & Post-War Economic Miracle',
        content: 'The true ancestor of the modern energy drink was created by Taisho Pharmaceuticals in Tokyo, Japan, under the name Lipovitan D. Packaged in medicinal brown glass apothecary bottles, it was marketed as an over-the-counter restorative health tonic formulated with taurine, nicotinamide, and B vitamins. It was designed to fuel Japanese salarymen and factory technicians working relentless 80-hour weeks rebuild post-World War II Japan.'
      },
      {
        era: '1970s: The Thai Trucker Elixir',
        year: '1976',
        title: 'Chaleo Yoovidhya & Krating Daeng',
        content: 'Inspired by Japanese tonic imports, Thai entrepreneur Chaleo Yoovidhya founded T.C. Pharmaceutical and formulated Krating Daeng ("Red Gaur / Bull"). Sold in amber glass bottles, the uncarbonated syrup blended water, cane sugar, taurine, inositol, and caffeine. It became an essential staple across Southeast Asia for long-haul truck drivers, tuk-tuk operators, and rural farmers.'
      },
      {
        era: '1980s: The Western Transformation',
        year: '1984 – 1987',
        title: 'Dietrich Mateschitz & The Birth of Red Bull',
        content: 'In 1982, Austrian marketing executive Dietrich Mateschitz visited Thailand on business and found Krating Daeng cured his jet lag. Teaming up with Yoovidhya, they adapted the formula for Western palates by carbonating it, lowering sweetness, and introducing the slim 250ml silver-and-blue can. Launched in Austria on April 1, 1987, Red Bull created the modern functional beverage category out of thin air.'
      },
      {
        era: '2000s: The 16oz Can Wars & Youth Culture',
        year: '2001 – 2005',
        title: 'Rockstar, Monster & The Value Revolution',
        content: 'Rockstar (2001) and Hansen Natural’s Monster Energy (2002) disrupted the sector by releasing giant 16oz (473ml) tallboy cans at the exact same $1.99 price point as Red Bull’s 8.4oz can. Pairing twice the liquid volume with motorsports, metal music, video games, and extreme action sports, energy drinks became synonymous with 2000s youth rebellion.'
      },
      {
        era: '2010s: The Fitness & Extreme Stimulant Wave',
        year: '2012 – 2018',
        title: 'Bang, Pre-Workouts & 300mg Caffeine Doses',
        content: 'Bodybuilding nutrition brands leaped into mass retail. Led by VPX Bang, Reign, and C4, energy drinks escalated from 160mg of caffeine to an explosive 300mg payload, fortified with Branched-Chain Amino Acids (BCAAs), CoQ10, and thermogenic ingredients.'
      },
      {
        era: '2020s – Present: Clean Wellness, Nootropics & Candy Collaborations',
        year: '2020 – Present',
        title: 'Ghost, Celsius, Alani Nu & The Lifestyle Era',
        content: 'The modern consumer demands zero sugar, metabolic optimization (Celsius), authentic licensed candy flavours (Ghost collaborating with Sour Patch Kids & Swedish Fish), and female-focused wellness aesthetics (Alani Nu). Energy drinks are no longer just for late-night clubbers or construction workers—they are everyday productivity beverages.'
      }
    ],
    culturalImpact: [
      {
        heading: 'Extreme Sports & Media Ownership',
        body: 'Energy drink companies pioneered modern content marketing. Red Bull literally owns Formula 1 racing teams, soccer clubs across three continents, and funded Felix Baumgartner’s historic supersonic space jump from the stratosphere. Monster sponsors UFC, Moto-GP, and global esports champions.'
      },
      {
        heading: 'Nightlife & Mixed Drink Revolution',
        body: 'Beginning in late-90s European ski resorts and Berlin nightclubs, combining high-caffeine energy drinks with alcohol (Vodka Red Bull, Jägerbombs) permanently reshaped collegiate nightlife, dance music, and club entertainment.'
      },
      {
        heading: 'The Modern Gaming & Creator Economy',
        body: 'Gaming and energy drinks became inseparable. Brands like G Fuel, Ghost, and Twitch streamers cemented energy formulas as essential esports fuel for cognitive reaction speed, twitch reflex stamina, and focus.'
      }
    ]
  },

  // Item Deep-Dives: Includes BOTH Original Green Monster & Monster Ultra White, Red Bull, Ghost, C4, Celsius
  productHistories: [
    {
      id: 'mnst-original',
      name: 'Monster Energy (Original Green)',
      brand: 'Monster Energy',
      origin: 'Corona, California, United States',
      inventor: 'Hansen Natural Corporation (Rodney Sacks & Hilton Schlosberg)',
      releaseYear: 2002,
      howItWasMade: 'In late 2001, Hansen Natural was competing against Red Bull’s high prices. Sacks and Schlosberg formulated a sweet, smooth, carbonated citrus-berry energy punch with Panax Ginseng root extract, L-Carnitine, Taurine, B vitamins, and 160mg caffeine. They packaged it into an audacious 16oz (473ml) matte black can embossed with three radioactive green claw scratches tearing through the metal.',
      fameScore: '10/10 — The Heavyweight Champion of 16oz Big-Can Energy',
      todaysImpact: 'Original Green Monster established the "Twice the Size for the Same Price" market precedent that dethroned Red Bull’s volume dominance in the United States. It turned Hansen Natural into Monster Beverage Corporation—one of the best performing public stocks in modern Wall Street history (over 100,000% return from 2000 to 2020).',
      funFacts: [
        'The iconic green "M" claw logo was designed to look like a beast tearing through the metal can.',
        'Monster distributed free cans out of modified black military trucks at motocross races, skate parks, and rock concerts instead of running TV commercials.',
        'The trademark recipe includes natural guarana seed extract alongside authentic ginseng root.'
      ],
      tastingNotes: 'Sweet, full-bodied carbonated apple-citrus punch with a smooth, lingering tart herbal bite.'
    },
    {
      id: 'mnst-ultra-white',
      name: 'Monster Zero Ultra (Ultra White)',
      brand: 'Monster Energy',
      origin: 'Corona, California, United States',
      inventor: 'Monster Beverage Corporation (Rodney Sacks & Hilton Schlosberg team)',
      releaseYear: 2012,
      howItWasMade: 'In the early 2010s, energy drinks were criticized for high sugar content (a standard original Monster contained 54g of sugar). Monster food chemists spent over two years engineering an ultra-crisp, light citrus-grapefruit profile utilizing erythritol, sucralose, and citric acid with an effervescent textured mouthfeel that had zero bitter chemical aftertaste.',
      fameScore: '10/10 — The Best Selling Sugar-Free Energy Drink in the World',
      todaysImpact: 'Ultra White radically altered beverage history. It attracted millions of fitness enthusiasts, college students, desk workers, and women who previously avoided syrupy black cans. It became Monster’s single most profitable SKU and launched the entire multi-color Ultra line.',
      funFacts: [
        'The can features an intricate raised tactile frosted texture inspired by Southern California surfboards.',
        'Internet fitness culture affectionately nicknamed it "Boomer Juice" and "Gym White", making it an international meme staple.',
        'Despite being marketed as zero calorie, regulatory rounding permits it to declare 10 calories per 500ml can.'
      ],
      tastingNotes: 'Crisp, refreshing light grapefruit, subtle citrus peel, zero sticky syrupy film.'
    },
    {
      id: 'rb-original',
      name: 'Red Bull Energy Drink (Original)',
      brand: 'Red Bull',
      origin: 'Fuschl am See, Austria & Bangkok, Thailand',
      inventor: 'Dietrich Mateschitz & Chaleo Yoovidhya',
      releaseYear: 1987,
      howItWasMade: 'Adapted from the medicinal Thai tonic Krating Daeng. Mateschitz worked with an Austrian flavor house for three full years to dial back the sweet medicinal syrup taste, adding carbonation, a tart apple-tutti-frutti finish, and standardizing the caffeine at precisely 32mg per 100ml (mirroring a shot of European espresso).',
      fameScore: '10/10 — The Uncontested Global Category Icon (>12 Billion Cans Sold Annually)',
      todaysImpact: 'Red Bull created the entire functional energy beverage sector. Without it, Monster, Celsius, and Ghost would not exist. It remains the #1 energy drink on Earth by market share, recognized by over 95% of the human population.',
      funFacts: [
        'Early consumer focus groups in 1985 unanimously hated the taste, calling it "repulsive and medicinal". Mateschitz ignored them and launched it anyway.',
        'The taurine in Red Bull is 100% synthetic laboratory-made, completely debunking the playground myth that it comes from bull parts.',
        'Red Bull spent zero dollars on traditional television ads in its first decade, relying entirely on giving free cans to ski instructors, DJs, and students.'
      ],
      tastingNotes: 'Distinctive tart apple, bubblegum, medicinal tutti-frutti with a sharp effervescent bite.'
    },
    {
      id: 'ghost-blue-raspberry',
      name: 'Ghost Energy Sour Patch Kids Blue Raspberry',
      brand: 'Ghost Energy',
      origin: 'Chicago, Illinois, United States',
      inventor: 'Dan Lourenco & Ryan Hughes (Ghost Beverages LLC)',
      releaseYear: 2020,
      howItWasMade: 'Ghost partnered directly with Mondelez International (the parent candy company of Sour Patch Kids) to license the authentic confectionary flavoring formulation. Rather than creating generic "blue raspberry soda", they chemically analyzed the sour citric acid exterior and sweet gummy core to replicate the candy’s exact two-stage taste profile.',
      fameScore: '9/10 — The Viral Trailblazer of the Collaboration Era',
      todaysImpact: 'It triggered an industry-wide revolution. Almost every energy brand subsequently rushed to secure official candy and snack licenses (Skittles, Starburst, Warheads, Swedish Fish). It also forced competitors to disclose exact milligram amounts of nootropics like Alpha-GPC and Carnipure on their labels.',
      funFacts: [
        'Ghost was the first energy beverage in mass distribution to formulate with NeuroFactor (whole coffee fruit extract clinically studied to support brain BDNF).',
        'In late 2024, Keurig Dr Pepper acquired majority ownership of Ghost in a deal valuing the brand at over $1.5 billion.'
      ],
      tastingNotes: 'Initial sharp mouth-puckering sourness followed immediately by genuine sugary blue raspberry gummy chew.'
    },
    {
      id: 'c4-frozen-bombsicle',
      name: 'C4 Energy Frozen Bombsicle',
      brand: 'C4 Energy',
      origin: 'Austin, Texas, United States',
      inventor: 'Nutrabolt (Woodbolt Distribution)',
      releaseYear: 2018,
      howItWasMade: 'Nutrabolt took the recipe of their world-renowned #1 pre-workout powder C4 and carbonated it for cold RTD (Ready To Drink) cans. They formulated it with CarnoSyn Beta-Alanine, BetaPower natural betaine, and Carnitine to recreate the classic cherry, lime, and blue raspberry summer popsicle.',
      fameScore: '8.5/10 — The Pre-Workout Gym Staple',
      todaysImpact: 'Bridged the gap between serious hardcore bodybuilders and casual gym-goers. It popularized the sensory "skin tingle" (paresthesia caused by beta-alanine) in mainstream grocery and convenience stores.',
      funFacts: [
        'The tingling sensation on your skin after drinking C4 is harmless paresthesia caused by beta-alanine binding to nerve receptors.',
        'Zero artificial colors—the liquid inside pours 100% crystal clear despite the vivid red, white, and blue rocket pop flavor.'
      ],
      tastingNotes: 'Crisp cherry, limeade, and sweet blue raspberry melted popsicle.'
    },
    {
      id: 'celsius-sparkling-orange',
      name: 'Celsius Sparkling Orange',
      origin: 'Boca Raton, Florida, United States',
      brand: 'Celsius',
      inventor: 'Steve Haley & Celsius Holdings',
      releaseYear: 2005,
      howItWasMade: 'Engineered as a thermogenic fitness drink. Formulated with MetaPlus—a proprietary blend of green tea extract (EGCG), guarana seed extract, ginger root extract, and 7 essential vitamins that was clinically proven in university studies to accelerate resting metabolism.',
      fameScore: '9/10 — Wall Street Darling & Modern Fitness Leader',
      todaysImpact: 'Celsius transformed energy drinks from an aggressive adrenaline aesthetic into an everyday health and wellness lifestyle drink, leading to an investment and national distribution partnership with PepsiCo in 2022.',
      funFacts: [
        'Celsius is backed by six published university clinical studies showing it burns up to 100+ calories per can by raising body thermogenesis.',
        'Between 2020 and 2023, Celsius became the fastest growing functional beverage company in North America.'
      ],
      tastingNotes: 'Light sparkling natural orange soda with crisp, clean citrus peel and zero sugar sweetness.'
    }
  ],

  // Brand Chronicles
  brandHistories: [
    {
      id: 'red-bull-brand',
      brandId: 'red-bull',
      title: 'Red Bull: The Austrian Pioneer',
      country: 'Austria / Thailand',
      founded: 1987,
      founders: 'Dietrich Mateschitz & Chaleo Yoovidhya',
      ownership: 'Red Bull GmbH (Private)',
      summary: 'The architect of the entire global energy drink sector and the premier sports media enterprise in the world.',
      content: [
        {
          heading: 'Origin & Philosophy',
          body: 'Created in 1984 and launched on April 1, 1987, in Austria. Instead of selling a generic beverage, Dietrich Mateschitz decided to sell an idea: human potential, extreme performance, and peak adrenaline. Red Bull created its own market segment and remains the global benchmark.'
        },
        {
          heading: 'Global Domination & Sporting Empire',
          body: 'Red Bull owns two Formula One racing teams (Red Bull Racing and RB), five global football clubs (RB Leipzig, Red Bull Salzburg, New York Red Bulls, etc.), extreme sports festivals, and media production studios.'
        }
      ],
      milestones: [
        { year: '1987', event: 'First can of Red Bull sold in Austria.' },
        { year: '1997', event: 'Launched in the United States.' },
        { year: '2003', event: 'Red Bull Sugarfree introduced.' },
        { year: '2012', event: 'Felix Baumgartner Red Bull Stratos supersonic jump.' },
        { year: '2023', event: 'Exceeded 12 billion cans sold worldwide.' }
      ]
    },
    {
      id: 'monster-brand',
      brandId: 'monster-energy',
      title: 'Monster Energy: Unleash the Beast',
      country: 'Corona, California, USA',
      founded: 2002,
      founders: 'Rodney Sacks & Hilton Schlosberg (Hansen Natural)',
      ownership: 'Monster Beverage Corp (The Coca-Cola Company owns 19.4%)',
      summary: 'The 16oz value disruptor that grew into the best performing stock on Wall Street of the 21st century.',
      content: [
        {
          heading: 'Twice the Size, Same Price',
          body: 'Hansen Natural disrupted Red Bull by providing 16oz (473ml) cans for the same $1.99 price as Red Bull’s 8.4oz can. Partnering with Supercross, action sports, metal music, and UFC fighters, Monster built a passionate subculture.'
        },
        {
          heading: 'The Ultra Line Transformation',
          body: 'In 2012, Monster released Monster Ultra in textured zero-sugar cans. It expanded their audience from rebellious youth to mainstream professionals and gym-goers.'
        }
      ],
      milestones: [
        { year: '2002', event: 'Original Monster Energy launched.' },
        { year: '2007', event: 'Java Monster introduced coffee energy.' },
        { year: '2012', event: 'Monster Ultra series debuts.' },
        { year: '2015', event: 'Global distribution deal with Coca-Cola.' },
        { year: '2023', event: 'Acquired Bang Energy assets for $362 million.' }
      ]
    }
  ],

  // Ingredients Science
  ingredients: [
    {
      name: 'Caffeine (1,3,7-trimethylxanthine)',
      type: 'Central Nervous System Stimulant',
      role: 'Adenosine Receptor Antagonist',
      typicalDose: '80mg – 300mg',
      description: 'The core active compound. Binds to adenosine receptors in the brain to block drowsiness, enhancing dopamine release, cognitive reaction time, and cardiovascular output.'
    },
    {
      name: 'Taurine (2-aminoethanesulfonic acid)',
      type: 'Conditionally Essential Amino Acid',
      role: 'Neuromodulation & Hydration',
      typicalDose: '1,000mg – 2,000mg',
      description: 'Abundant in brain and cardiac tissue. Helps regulate electrolyte balance, cellular hydration, and balances neural excitation.'
    },
    {
      name: 'Alpha-GPC',
      type: 'Bioavailable Choline Donor',
      role: 'Acetylcholine Neurotransmitter Synthesis',
      typicalDose: '150mg – 300mg',
      description: 'Crosses the blood-brain barrier rapidly to supply raw choline for the synthesis of acetylcholine, the neurotransmitter responsible for working memory, focus, and muscle contraction.'
    },
    {
      name: 'B-Complex Vitamins (B3, B6, B12)',
      type: 'Water-Soluble Coenzymes',
      role: 'Cellular ATP Energy Metabolism',
      typicalDose: '100% – 1,000% DV',
      description: 'Biological cofactors required by cellular mitochondria to convert carbohydrates, fats, and proteins into usable ATP energy.'
    }
  ],

  // Discontinued Archive
  discontinuedArchive: [
    {
      id: 'disc-redline',
      name: 'Redline Xtreme',
      brand: 'Redline (VPX Sports)',
      yearsActive: '2006 – 2023',
      caffeine: '316mg / 240ml',
      notes: 'Infamous for warning labels cautioning against drinking more than half a bottle due to intense thermogenic sweating and shivering.'
    },
    {
      id: 'disc-rb-silver',
      name: 'Red Bull Silver Edition (Lime)',
      brand: 'Red Bull',
      yearsActive: '2013 – 2017',
      caffeine: '80mg / 250ml',
      notes: 'One of the original three Editions launched in 2013. Cult favorite tart lime formulation later replaced by Green Edition.'
    },
    {
      id: 'disc-monster-m80',
      name: 'Monster M-80 (80% Juice)',
      brand: 'Monster Energy',
      yearsActive: '2007 – 2014',
      caffeine: '160mg / 473ml',
      notes: 'Contained one of the highest authentic real tropical fruit juice concentrations ever packaged in commercial energy drinks.'
    }
  ]
};
