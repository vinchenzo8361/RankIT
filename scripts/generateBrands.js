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
Oronamin C, Taisho, XXL, Hot6, Uptime, Wired, Bomba, Rodeo, HELL, XL Energy, Full Throttle`;

// Discontinued brand list
const discontinuedList = new Set([
  'Adrenaline Shoc', 'Cocaine Energy', 'Crunk', 'Vault', 'Redline', 'VPX Redline', 'Jolt', 
  'Lost and Found', 'Khaos', 'Muscle Monster', 'Starbucks BAYA Energy', 'Street King',
  'Quake Energy', 'Rowdy Energy', 'HiBall', 'Motor Oil', 'Missile', 
  'Cloud 9', 'Dark Dog', 'Dragon Fire', 'E6', 'Fucked Up', 'I Am Fucked Up', 'Squid Game Energy',
  'Playboy Energy', 'Raptor', 'Shock', 'Speed', 'Stacker 2', 'Tornado', 'Taft', 'Tzinga',
  'Vuka', 'Wolverine', 'War Horse', 'XOT'
]);

// Top 25 Brands exactly as ordered (with Red Bull Editions removed, shifted up, and Full Throttle at 25)
const top25Roster = [
  { rank: 1, name: 'Red Bull', origin: 'Austria' },
  { rank: 2, name: 'Monster Energy', origin: 'USA' },
  { rank: 3, name: 'Rockstar Energy', origin: 'USA' },
  { rank: 4, name: 'Celsius', origin: 'USA' },
  { rank: 5, name: 'Eastroc Super Drink', origin: 'China' },
  { rank: 6, name: 'Bang Energy', origin: 'USA' },
  { rank: 7, name: 'Alani Nu', origin: 'USA' },
  { rank: 8, name: 'GHOST Energy', origin: 'USA' },
  { rank: 9, name: 'C4 Energy', origin: 'USA' },
  { rank: 10, name: 'NOS Energy', origin: 'USA' },
  { rank: 11, name: 'Reign', origin: 'USA' },
  { rank: 12, name: 'M-150', origin: 'Thailand' },
  { rank: 13, name: 'Carabao', origin: 'Thailand' },
  { rank: 14, name: 'Sting', origin: 'International / Asia' },
  { rank: 15, name: 'V Energy', origin: 'New Zealand' },
  { rank: 16, name: 'Lucozade Energy', origin: 'UK' },
  { rank: 17, name: 'Burn', origin: 'Global' },
  { rank: 18, name: 'Prime Energy', origin: 'USA' },
  { rank: 19, name: '5-hour Energy', origin: 'USA' },
  { rank: 20, name: 'Shark Energy', origin: 'Thailand' },
  { rank: 21, name: 'Mother', origin: 'Australia' },
  { rank: 22, name: 'HELL Energy', origin: 'Hungary' },
  { rank: 23, name: 'Power Horse', origin: 'Austria' },
  { rank: 24, name: 'GURU Organic Energy', origin: 'Canada' },
  { rank: 25, name: 'Full Throttle', origin: 'USA' }
];

const top25Map = {};
top25Roster.forEach(item => {
  top25Map[item.name.toLowerCase()] = item.rank;
});

const lines = rawText.split('\n');
const extractedNames = new Set();

// Add top 25 first
top25Roster.forEach(item => extractedNames.add(item.name));

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
  const topRank = top25Map[name.toLowerCase()] || null;

  return {
    id: slug,
    name: name,
    category: isDisc ? 'Discontinued' : 'Active',
    isTop25: topRank !== null,
    top25Rank: topRank,
    status: isDisc ? 'Discontinued' : 'Active',
    origin: topRank ? top25Roster.find(r => r.rank === topRank)?.origin || 'International' : 'International',
    logo: '⚡',
    color: isDisc ? '#64748B' : '#4F46E5'
  };
});

// Sort
brandList.sort((a, b) => {
  if (a.top25Rank && b.top25Rank) return a.top25Rank - b.top25Rank;
  if (a.category !== b.category) return a.category === 'Active' ? -1 : 1;
  return a.name.localeCompare(b.name);
});

console.log(`Total brands extracted: ${brandList.length}`);
console.log(`Top 25 count: ${brandList.filter(b => b.isTop25).length}`);

const code = `// Complete Brand Database with Active, Discontinued, and Top 25 classifications
export const top25BrandsRoster = ${JSON.stringify(top25Roster, null, 2)};

export const initialBrands = ${JSON.stringify(brandList, null, 2)};
`;

fs.writeFileSync('src/data/brands.js', code);
console.log('Successfully written src/data/brands.js');
