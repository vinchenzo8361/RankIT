import fs from 'fs';

const rawText = `A
ABE, Accelerator, Aito, Alani Nu, Amini, Apple Energy, AR Energy, Area 51, Arizona, Asahi, Aspire, Adrenaline Rush, Adrenaline Shoc, Amp Energy, Amper.
B
Bacchus, Bad Dog, Baly, Bang Energy, Barebells, Battery, Be Sharp, Beaver Buzz, BEEBAD, Benny, Big Game Energy, Big Shock!, Bizon, Black Bruin, Black Energy, Black Rifle Energy, Bloom Energy, BLU, Blue Chameleon, Bolero, Bomba, Boom, Boost, Booster, Brite, BSc, Bucked Up, Buffalo Kick, Bullit, BUM Energy, Burn, Beyond Raw, Black Cat, Black Dragon.
C
C4 Energy, Carabao, Celsius, Chucky, Clean, Club Mate, Crazy Tiger, Cult, Code Red, Cobra, Cocaine Energy, Crunk, Cloud 9.
D
Day and Nite, Dop3, Driver's Energy, Dynam:t, Dzik, Dark Dog, Dragon Energy, Dragon Fire, Drive Me.
E
Echelon, ED Energy, Effect, El Jefe, Emerge, ENERDRINK, EnerYeti, Euroshopper, Explo, Extase, Eastroc Super Drink, E6, E-ON.
F
Faxe Kondi Booster, Fearless, Flash, Flash Up, FLRT, Flying Horse, Frank's, Freeway, Froosh, Fucked Up, Funky Monkey, Fusion, Fast Twitch.
G
G Fuel, Gaam, Gainomax, Gatorade Energy, GG Energy, Ghost Energy, Gladiator Energy, Go And Fun, GOAT FUEL, GoFast, Golden Eagle, Gönrgy, GORGIE, Gorilla, Gorilla Mind, Gosh!, Grizzly Bear, Grizzly Energy, Ground Zero, Guarana, Guru, GURU Organic Energy, G Fuel, Green Monster.
H
HELL Energy, Hi-Tiger, HiBall, Hot6ix, Huxley, Hyper Zone, Hyperion X1, H2O Power, Hyper.
I
I Am Fucked Up, Irn-Bru Energy, Isostar Energy.
J
Jaffa Booster, Jano, Jocko Fuel, Joggy Energy, Jolt, Joluca, Juissi, Java Monster.
K
Kabisa, Kili, Killa, Kirkland, Kong Strong, Khaos, Kickstart.
L
La Jefa, Latitude 65, Lemon Soda, Lemonade Lover, Linx, Lipovitan, Live Plus, Lohilo, Lost and Found, Lucky Energy, Lucky Punch, Lucozade Alert, Lucozade Energy, Lucozade.
M
M-150, MAC Energy, Mad Croc, Matelaituri, Maxx, Mega Watt, Megaforce, Mojo Mate, Monster Energy, Moose Juice, Mother, Motor Oil, Mountain Dew Energy, Myrttisen Kurkut, Missile, Mr. Big, MTN Dew Amp, MTN Dew Energy, MTN Dew Game Fuel, MiO Energy, Muscle Monster.
N
Nalu, Nello, Netflix Energy, Next Level, Nine, No Brainwaste, NOCCO, Non Stop, Nordpuls, NOS Energy, Neuro.
O
Obolon, OME, Oshee, OxyShred, Optimum Nutrition Energy.
P
Palestine Energy, Pampa+, Pändy, PerfectTed, Phorm Energy, Pirkka, Pirkka BCAA, Playboy Energy, Power Horse, Power Malt, Powerking, Prime Energy, Pro! Brands, Psychik, Puhdistamo, Puls, Puls Nutrition, PURE Energy, PWR BRU, PXL, PHOCUS, Predator.
Q
Qhush Energy, Quake Energy.
R
R Go, React, Reboost Energy, Red Bull, Red Devil, Redcon1, Reign, Reign Storm, Relentless, Repp, RevUp, Riot Energy, Riot Games Energy, Rip It, Rockstar, Rodeo, Rubicon Raw, Russ Energy, Ryse Fuel, Raptor, Redline, Rowdy Energy, Real Gold.
S
Score, Semtex, Shark, Shark God, Sneak, Snowman, Spartan, Speed Unlimited, Sportyfeel, Squid Game Energy, Starter, State, Sting, Strafe, Sunbeam, Super Energy, Switch, Starbucks BAYA Energy, Starbucks Iced Energy, Supa Komando, Shock, Speed, Street King, Stacker 2.
T
TEHO, Tenzing, The Energy Drink, The Good Guys, Thunder, Tiger, TNT, To/Ga Thrust, Toro Loco, Toxic Waste Energy, Twenty Five, Tornado, Taft, Tzinga.
U
UNWELL, UPDATE, USN, Uptime Energy, Ultra.
V
V Energy, V8 Energy, Venom, Vichy Vitamix, Viking Power, Vimto Energy, Vitamin Well, Vitamizu, Volt, Volt AJE, Volt Energy, Volya, Vive 100, VPX Redline, Vuka.
W
W Energy, Weld, Wired Energy, Wolf, Wolverine, War Horse.
X
X Energy, X Gamer, XL, XLNT Sports, XYIENCE Energy, XOT.
Z
ZOA Energy, Zen, Zest Energy, ZONe Energy.
Numbers
3D Energy, 5-hour Energy, 9mm Energy, 28 BLACK.
Oronamin C, Taisho, XXL, Hot6, Uptime, Wired, Bomba, Rodeo, HELL, XL Energy`;

// Discontinued brand list
const discontinuedList = new Set([
  'Adrenaline Shoc', 'Cocaine Energy', 'Crunk', 'Vault', 'Redline', 'VPX Redline', 'Jolt', 
  'Lost and Found', 'Khaos', 'Muscle Monster', 'Starbucks BAYA Energy', 'Street King',
  'Quake Energy', 'Rowdy Energy', 'HiBall', 'Bang Energy', 'Motor Oil', 'Missile', 
  'Cloud 9', 'Dark Dog', 'Dragon Fire', 'E6', 'Fucked Up', 'I Am Fucked Up', 'Squid Game Energy',
  'Playboy Energy', 'Raptor', 'Shock', 'Speed', 'Stacker 2', 'Tornado', 'Taft', 'Tzinga',
  'Vuka', 'Wolverine', 'War Horse', 'XOT'
]);

// Map markets
const marketMap = {
  'Red Bull': 'Austria / Global',
  'Monster Energy': 'USA / Global',
  'Rockstar': 'USA / Global',
  'Rockstar Energy': 'USA / Global',
  'Celsius': 'USA / Global',
  'Bang Energy': 'USA',
  'NOS Energy': 'USA',
  'Reign': 'USA',
  'Reign Storm': 'USA',
  'Alani Nu': 'USA',
  'C4 Energy': 'USA',
  'Ghost Energy': 'USA / Global',
  '5-hour Energy': 'USA',
  'Prime Energy': 'USA / Global',
  'V Energy': 'Australia / New Zealand',
  'Lucozade Energy': 'UK',
  'Lucozade': 'UK',
  'Burn': 'Global',
  'HELL Energy': 'Hungary / Global',
  'HELL': 'Hungary',
  'Carabao': 'Thailand / Global',
  'M-150': 'Thailand',
  'Sting': 'Vietnam / India / Global',
  'Eastroc Super Drink': 'China',
  'Shark': 'Thailand / Global',
  'Shark Energy': 'Thailand / Global',
  'Mother': 'Australia',
  'Venom': 'USA',
  'Venom Energy': 'USA',
  'Amp Energy': 'USA',
  'MTN Dew Amp': 'USA',
  'Full Throttle': 'USA',
  'Fast Twitch': 'USA',
  'Gatorade Fast Twitch': 'USA',
  'Rip It': 'USA',
  'Adrenaline Rush': 'International',
  'Battery': 'Finland',
  'Relentless': 'UK',
  'Cult': 'Denmark',
  'Emerge': 'UK',
  'Power Horse': 'Austria / International',
  'Tiger': 'Poland / Southeast Asia',
  'XL Energy': 'Poland / Europe',
  'XL': 'Poland / Europe',
  '28 BLACK': 'Germany',
  'Nalu': 'Belgium',
  'Guru': 'Canada',
  'GURU Organic Energy': 'Canada',
  'Aspire': 'USA',
  'ZOA Energy': 'USA',
  'Bucked Up': 'USA',
  'Ryse Fuel': 'USA',
  'G Fuel': 'USA',
  'XYIENCE': 'USA',
  'XYIENCE Energy': 'USA',
  'Redline': 'USA',
  'Big Shock!': 'Czech Republic',
  'Semtex': 'Czech Republic',
  'Non Stop': 'Eastern Europe / Poland',
  'Flying Horse': 'Brazil',
  'Toro Loco': 'Spain',
  'Mad Croc': 'Europe',
  'Powerking': 'Europe',
  'XXL': 'Europe',
  'XLNT Sports': 'Europe',
  'Oshee': 'Poland',
  'Tenzing': 'UK',
  'PerfectTed': 'UK',
  'NOCCO': 'Sweden',
  'Vitamin Well': 'Sweden',
  'Sneak': 'UK',
  'Gorilla Mind': 'USA',
  'Jocko Fuel': 'USA',
  'Uptime': 'USA',
  'Uptime Energy': 'USA',
  'Wired': 'USA',
  'Wired Energy': 'USA',
  'Bomba': 'Europe',
  'Rodeo': 'Europe',
  'Pampa+': 'South America',
  'Volt': 'Latin America',
  'Volt AJE': 'Latin America',
  'Volt Energy': 'Latin America',
  'Vive 100': 'Colombia',
  'Kabisa': 'Africa',
  'Supa Komando': 'Africa',
  'Hi-Tiger': 'China',
  'Hot6': 'South Korea',
  'Hot6ix': 'South Korea',
  'Lipovitan': 'Japan',
  'ZONe Energy': 'Japan',
  'Real Gold': 'Japan',
  'Oronamin C': 'Japan',
  'Taisho': 'Japan',
  'TEHO': 'Finland',
  'Black Bruin': 'Turkey',
  'Baly': 'Turkey',
  'Gorilla': 'Europe',
  'Crazy Tiger': 'Europe',
  'EnerYeti': 'Spain',
  'Irn-Bru Energy': 'Scotland / UK',
  'Club Mate': 'Germany',
  'Effect': 'Germany',
  'Kombat': 'International',
  'Kong Strong': 'Germany / Europe'
};

const lines = rawText.split('\n');
const extractedNames = new Set();

for (const line of lines) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.length <= 2 || trimmed.startsWith('More ') || trimmed.startsWith('These ') || trimmed.startsWith('Brand')) continue;
  const parts = trimmed.split(/,\s*/);
  for (const part of parts) {
    const clean = part.replace(/\.$/, '').trim();
    if (clean && clean.length > 1 && !/^[A-Z]$/.test(clean) && clean !== 'Numbers') {
      extractedNames.add(clean);
    }
  }
}

// Convert into brand objects
const brandList = Array.from(extractedNames).map((name) => {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const isDisc = discontinuedList.has(name) || name.toLowerCase().includes('discontinued');
  const market = marketMap[name] || 'International';

  return {
    id: slug,
    name: name,
    category: isDisc ? 'Discontinued' : 'Active', // 'Active' or 'Discontinued'
    status: isDisc ? 'Discontinued' : 'Active',
    origin: market,
    description: `${name} energy drink brand (${market}).`,
    logo: '⚡',
    color: isDisc ? '#475569' : '#4F46E5'
  };
});

// Sort by category (Active first, then Discontinued), then alphabetically
brandList.sort((a, b) => {
  if (a.category !== b.category) {
    return a.category === 'Active' ? -1 : 1;
  }
  return a.name.localeCompare(b.name);
});

console.log(`Total brands extracted: ${brandList.length}`);
const activeCount = brandList.filter(b => b.category === 'Active').length;
const discCount = brandList.filter(b => b.category === 'Discontinued').length;
console.log(`Active: ${activeCount}, Discontinued: ${discCount}`);

const code = `// Complete Brand Database Classified into Active Brands and Discontinued Brands
export const initialBrands = ${JSON.stringify(brandList, null, 2)};
`;

fs.writeFileSync('src/data/brands.js', code);
console.log('Successfully written src/data/brands.js');
