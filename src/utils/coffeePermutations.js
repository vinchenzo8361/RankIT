/**
 * Generates dynamic step-by-step instructions and adaptations based on the user's available equipment.
 * Handles every permutation of toggled checklist items.
 */

export const getBrewingInstructions = (methodId, equipmentState) => {
  // Method 1: Pour-Over (V60 / Kalita)
  if (methodId === 'pour-over') {
    const hasCone = equipmentState.dripper ?? true;
    const hasFilter = equipmentState.filter ?? true;
    const hasScale = equipmentState.scale ?? true;
    const hasGooseneck = equipmentState.gooseneck ?? true;

    const steps = [];

    // Step 1: Vessel & Filter prep
    if (hasCone && hasFilter) {
      steps.push({
        title: 'Rinse Filter & Preheat',
        desc: 'Place the paper filter inside the dripper cone over your mug. Pour hot water over the empty filter to eliminate paper taste and pre-heat the ceramic/plastic cone, then discard the rinse water.'
      });
    } else if (hasCone && !hasFilter) {
      steps.push({
        title: 'Emergency Filter Substitution',
        desc: 'Without a standard coffee filter, fold a clean unbleached paper towel into a cone, or line the dripper with clean cheesecloth. Rinse thoroughly with hot water before adding grounds.'
      });
    } else {
      steps.push({
        title: 'Funnel / Strainer Improvised Setup',
        desc: 'Without a dedicated coffee cone, place a clean kitchen mesh sieve lined with filter paper or a clean cloth directly over your favorite mug.'
      });
    }

    // Step 2: Dosing & Ratio
    if (hasScale) {
      steps.push({
        title: 'Dose with Scale Precision',
        desc: 'Tare your scale to zero with the cone and mug in place. Add exactly 15.0g of medium-fine ground coffee. Make a gentle small indentation in the center with your finger.'
      });
    } else {
      steps.push({
        title: 'Volume Approximation Dosing',
        desc: 'No scale available: Measure 2 level tablespoons (approx 15g) of medium-fine coffee grounds. Gently shake the brewer to create an even, flat coffee bed.'
      });
    }

    // Step 3: Bloom phase
    if (hasGooseneck && hasScale) {
      steps.push({
        title: 'Gooseneck Precision Bloom',
        desc: 'Start timer. Pour precisely 45g of 93°C hot water in gentle, tight concentric circles. Allow the coffee to bloom and bubble for 40 seconds to release trapped carbon dioxide.'
      });
    } else if (!hasGooseneck && hasScale) {
      steps.push({
        title: 'Standard Kettle Bloom',
        desc: 'Pour hot water very gently from your standard kettle or measuring cup spout until reaching 45g. Pour close to the bed to avoid churning up coffee mud. Let bloom for 40 seconds.'
      });
    } else {
      steps.push({
        title: 'Visual Bloom',
        desc: 'Pour just enough hot water (approx 3 tablespoons) to wet all the dry grounds. Wait 40 seconds until the bubbling and gas release subsides.'
      });
    }

    // Step 4: Main pours
    if (hasGooseneck && hasScale) {
      steps.push({
        title: 'Steady Spiral Pouring',
        desc: 'Pour in steady spirals until reaching 150g by 1:15, then pour up to 240g total water by 1:45. Let draw down completely by 2:45 to 3:00.'
      });
    } else if (!hasGooseneck && hasScale) {
      steps.push({
        title: 'Controlled Center Pouring',
        desc: 'Pour slowly and steadily in small pulses into the center of the bed until reaching 240g total weight. Avoid splashing up the sides of the paper.'
      });
    } else {
      steps.push({
        title: 'Cup Volume Pouring',
        desc: 'Slowly pour one full coffee mug (approx 240ml / 8oz) of hot water across two or three slow pulses, keeping the water level halfway up the cone.'
      });
    }

    steps.push({
      title: 'Finish & Swirl',
      desc: 'Let all liquid filter through. Discard the spent grounds and give your brewed coffee a gentle swirl to homogenize the layers before drinking.'
    });

    return steps;
  }

  // Method 2: French Press
  if (methodId === 'french-press') {
    const hasPress = equipmentState.press ?? true;
    const hasCoarse = equipmentState.coarse_grind ?? true;
    const hasScale = equipmentState.scale ?? true;
    const hasTimer = equipmentState.timer ?? true;

    const steps = [];

    if (hasScale) {
      steps.push({
        title: 'Weigh Coffee',
        desc: 'Weigh 30g of coffee. If you have coarse grounds, this produces a sweet, clean extraction. Place the grounds into the bottom of the vessel.'
      });
    } else {
      steps.push({
        title: 'Measure with Spoons',
        desc: 'Add 4 rounded tablespoons of ground coffee into the bottom of the press (equivalent to roughly 30 grams).'
      });
    }

    if (hasPress) {
      steps.push({
        title: 'Water Saturation',
        desc: hasScale 
          ? 'Vigorously pour 450g of hot water (94°C / 200°F) into the press to ensure all dry grounds are completely submerged.'
          : 'Fill the press with hot water up to roughly 2 inches beneath the metal spout (approx 450ml).'
      });
    } else {
      steps.push({
        title: 'Mason Jar Immersion',
        desc: 'Without a French Press, pour 450ml hot water directly into a glass mason jar or sturdy heat-proof jug with the coffee grounds.'
      });
    }

    steps.push({
      title: 'Steep Time',
      desc: hasTimer
        ? 'Place lid on top with plunger up. Start timer for 4:00 minutes. (If using finer coffee, reduce to 3:00 minutes to avoid bitterness).'
        : 'Let the coffee steep undisturbed for about 4 minutes (roughly the length of one full song).'
    });

    if (hasPress) {
      steps.push({
        title: 'Crust Break & Plunge',
        desc: 'At 4:00, use a spoon to gently break the crust on top so the grounds sink. Press the plunger down slowly and smoothly just to the bed.'
      });
    } else {
      steps.push({
        title: 'Strain Through Sieve',
        desc: 'Pour the steeped coffee through a fine kitchen mesh strainer or paper towel into your serving mug.'
      });
    }

    steps.push({
      title: 'Decant Immediately',
      desc: 'Pour all brewed coffee into mugs immediately. Leaving coffee in the press will cause over-extraction and harsh bitterness.'
    });

    return steps;
  }

  // Method 3: Moka Pot
  if (methodId === 'moka-pot') {
    const hasPreboiled = equipmentState.preboiled ?? true;
    const hasFineGrind = equipmentState.fine_grind ?? true;

    const steps = [
      {
        title: 'Water Chamber Prep',
        desc: hasPreboiled
          ? 'Fill the lower boiler with pre-boiled boiling water up to just below the safety valve. Pre-boiling prevents the metal pot from overheating and scorching the coffee grounds.'
          : 'Fill the lower chamber with cold tap water just below the brass safety valve. Note: Use lower burner heat to prevent scorching the beans.'
      },
      {
        title: 'Basket Filling',
        desc: hasFineGrind
          ? 'Fill the metal funnel basket completely with fine-medium ground coffee. Level it off smoothly with your finger—NEVER tamp or press down.'
          : 'Fill the basket loosely with your available coffee grounds. Do not compress or pack down tightly, as steam must pass through safely.'
      },
      {
        title: 'Assembly & Heat',
        desc: 'Tightly screw the top carafe onto the bottom base using a towel to protect your hands from the hot lower chamber. Place on medium-low heat with the lid open.'
      },
      {
        title: 'Monitor Extraction',
        desc: 'Watch closely as a rich, warm golden-brown coffee stream flows into the upper column like melted honey.'
      },
      {
        title: 'Stop Extraction (Cold Water Trick)',
        desc: 'As soon as the stream turns pale yellow and starts sputtering/frothing, remove from burner immediately and run the bottom base under cold tap water to stop extraction before bitter compounds enter the cup.'
      }
    ];

    return steps;
  }

  // Method 4: AeroPress
  if (methodId === 'aeropress') {
    const hasFilter = equipmentState.filter ?? true;
    const hasPaddle = equipmentState.paddle ?? true;
    const hasScale = equipmentState.scale ?? true;

    const steps = [
      {
        title: 'Filter Setup',
        desc: hasFilter
          ? 'Place circular micro-filter into the black cap and rinse with warm water to seal.'
          : 'Cut a small circle of standard coffee filter paper or rinse clean cloth to fit the cap.'
      },
      {
        title: 'Dosing',
        desc: hasScale
          ? 'Add exactly 16g of medium-fine ground coffee into the chamber.'
          : 'Add one level AeroPress scoop (approx 15–17g) of coffee grounds into the chamber.'
      },
      {
        title: 'Water & Stir',
        desc: hasPaddle
          ? 'Pour 220g hot water (or fill to the number 4 mark). Stir 3 times with the paddle to ensure thorough saturation.'
          : 'Pour 220g hot water (to number 4 mark). Use a regular spoon or butter knife to gently stir 3 times.'
      },
      {
        title: 'Vacuum Seal',
        desc: 'Insert the rubber plunger 1cm into the top of the chamber to create a vacuum seal that prevents coffee from dripping through. Steep for 1:30.'
      },
      {
        title: 'Gentle Press',
        desc: 'Gently press down with steady body weight for 30 seconds until you hear a soft hiss, then stop pressing immediately.'
      }
    ];

    return steps;
  }

  return [];
};
