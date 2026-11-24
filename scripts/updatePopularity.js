import fs from 'fs';
import { initialBrands, top25BrandsRoster } from '../src/data/brands.js';

// Global popularity ranks for all brands
// Top 25 get ranks 1-25. Other major global & regional brands get ranks 26-60. The remaining are sorted alphabetically starting from 61.
const notableRanks = {
  'red-bull': 1,
  'monster-energy': 2,
  'rockstar': 3,
  'rockstar-energy': 3,
  'celsius': 4,
  'eastroc-super-drink': 5,
  'bang-energy': 6,
  'bang': 6,
  'alani-nu': 7,
  'ghost-energy': 8,
  'c4-energy': 9,
  'c4': 9,
  'nos-energy': 10,
  'nos': 10,
  'reign': 11,
  'reign-storm': 11,
  'm-150': 12,
  'carabao': 13,
  'sting': 14,
  'v-energy': 15,
  'lucozade-energy': 16,
  'lucozade': 16,
  'burn': 17,
  'prime-energy': 18,
  '5-hour-energy': 19,
  'shark-energy': 20,
  'shark': 20,
  'mother': 21,
  'hell-energy': 22,
  'hell': 22,
  'power-horse': 23,
  'guru-organic-energy': 24,
  'guru': 24,
  'full-throttle': 25,
  'amp-energy': 26,
  'mtn-dew-amp': 26,
  'g-fuel': 27,
  'bucked-up': 28,
  'ryse-fuel': 29,
  'relentless': 30,
  'nocco': 31,
  'sneak': 32,
  'gorilla-mind': 33,
  'fast-twitch': 34,
  'gatorade-fast-twitch': 34,
  'rip-it': 35,
  'battery': 36,
  'xyience': 37,
  'xyience-energy': 37,
  '3d-energy': 38,
  'zoa-energy': 39,
  'bum-energy': 40,
  'jocko-fuel': 41,
  'c4': 42,
  'redline': 43,
  'vpx-redline': 43,
  'venom': 44,
  'venom-energy': 44,
  'volt': 45,
  'vive-100': 46,
  'big-shock': 47,
  'semtex': 48,
  'non-stop': 49,
  'flying-horse': 50,
  'toro-loco': 51,
  'mad-croc': 52,
  'powerking': 53,
  'oshee': 54,
  'tenzing': 55,
  'perfectted': 56,
  'vitamin-well': 57,
  'uptime': 58,
  'uptime-energy': 58,
  'wired': 59,
  'wired-energy': 59,
  'bomba': 60
};

// Sort all brands by popularityScore
const updatedBrands = initialBrands.map((b) => {
  let popRank = notableRanks[b.id];
  if (!popRank && b.top25Rank) popRank = b.top25Rank;
  return {
    ...b,
    popularityRank: popRank || 999
  };
});

// Sort by popularityRank ascending, then alphabetically
updatedBrands.sort((a, b) => {
  if (a.popularityRank !== b.popularityRank) {
    return a.popularityRank - b.popularityRank;
  }
  return a.name.localeCompare(b.name);
});

// Assign clean 1..N order
updatedBrands.forEach((b, index) => {
  b.popularityRank = index + 1;
});

const code = `// Complete Brand Database with Popularity Rank, Active, Discontinued, and Top 25
export const top25BrandsRoster = ${JSON.stringify(top25BrandsRoster, null, 2)};

export const initialBrands = ${JSON.stringify(updatedBrands, null, 2)};
`;

fs.writeFileSync('src/data/brands.js', code);
console.log('Brands updated with complete popularity ranking!');
