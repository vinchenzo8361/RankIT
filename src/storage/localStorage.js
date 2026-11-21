// Local Storage Management Keys & Helpers for RankIt Version 1
import { initialBrands } from '../data/brands';
import { initialProducts } from '../data/products';

const STORAGE_KEYS = {
  BRANDS: 'rankit_brands_v1',
  PRODUCTS: 'rankit_products_v1',
  PROJECTS: 'rankit_projects_v1',
  STANDALONE_TIER: 'rankit_standalone_tier_v1',
  RATINGS: 'rankit_ratings_v1',
  DRINK_LOGS: 'rankit_drink_logs_v1',
  SETTINGS: 'rankit_settings_v1',
};

// Default initial state
export const getStoredBrands = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BRANDS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.BRANDS, JSON.stringify(initialBrands));
      return initialBrands;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed reading brands from storage', e);
    return initialBrands;
  }
};

export const saveStoredBrands = (brands) => {
  try {
    localStorage.setItem(STORAGE_KEYS.BRANDS, JSON.stringify(brands));
  } catch (e) {
    console.error('Failed saving brands', e);
  }
};

export const getStoredProducts = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(initialProducts));
      return initialProducts;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed reading products from storage', e);
    return initialProducts;
  }
};

export const saveStoredProducts = (products) => {
  try {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  } catch (e) {
    console.error('Failed saving products', e);
  }
};

// Ranking Projects
export const getStoredProjects = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    if (!raw) {
      const defaultProjects = [
        {
          id: 'proj-favorite-drinks',
          name: 'My Favourite Energy Drinks',
          rankingType: 'tier-list', // 'tier-list' | 'ratings'
          category: 'drinks', // 'brands' | 'drinks'
          selectedProductIds: ['rb-original', 'mnst-ultra-white', 'ghost-blue-raspberry', 'mnst-mango-loco', 'c4-frozen-bombsicle', 'celsius-sparkling-orange'],
          tiers: {
            S: ['ghost-blue-raspberry', 'mnst-ultra-white'],
            A: ['rb-original', 'mnst-mango-loco'],
            B: ['c4-frozen-bombsicle'],
            C: ['celsius-sparkling-orange'],
            D: [],
            F: [],
            IDK: []
          },
          ratings: {},
          comments: {
            'ghost-blue-raspberry': 'Incredible authentic sour candy taste, smooth energy without crash.',
            'mnst-ultra-white': 'The undisputed king of zero sugar everyday hydration.'
          },
          createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 'proj-brand-eval',
          name: 'Top Energy Drink Brands',
          rankingType: 'ratings',
          category: 'brands',
          selectedProductIds: ['red-bull', 'monster-energy', 'ghost-energy', 'c4', 'celsius', 'rockstar'],
          tiers: { S: [], A: [], B: [], C: [], D: [], F: [], IDK: [] },
          ratings: {
            'monster-energy': 9.4,
            'ghost-energy': 9.2,
            'red-bull': 9.0,
            'c4': 8.3,
            'celsius': 8.0,
            'rockstar': 6.5
          },
          comments: {
            'monster-energy': 'Unrivaled variety with the Ultra and Juice lines.',
            'ghost-energy': 'Best flavor profiles in the modern era.'
          },
          createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(defaultProjects));
      return defaultProjects;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed reading projects', e);
    return [];
  }
};

export const saveStoredProjects = (projects) => {
  try {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  } catch (e) {
    console.error('Failed saving projects', e);
  }
};

// Global Standalone Tier List State
export const getStoredStandaloneTier = (category = 'drinks') => {
  try {
    const raw = localStorage.getItem(`${STORAGE_KEYS.STANDALONE_TIER}_${category}`);
    if (!raw) {
      const defaultData = {
        S: category === 'brands' ? ['monster-energy', 'ghost-energy'] : ['ghost-blue-raspberry', 'mnst-ultra-white'],
        A: category === 'brands' ? ['red-bull'] : ['mnst-mango-loco', 'rb-original'],
        B: category === 'brands' ? ['c4', 'celsius'] : ['c4-frozen-bombsicle', 'celsius-peach-vibe'],
        C: category === 'brands' ? ['rockstar'] : ['nos-original', 'rb-sugar-free'],
        D: category === 'brands' ? ['bang'] : ['rockstar-original'],
        F: category === 'brands' ? [] : ['redline-xtreme'],
        IDK: []
      };
      return defaultData;
    }
    return JSON.parse(raw);
  } catch (e) {
    return { S: [], A: [], B: [], C: [], D: [], F: [], IDK: [] };
  }
};

export const saveStoredStandaloneTier = (category, data) => {
  try {
    localStorage.setItem(`${STORAGE_KEYS.STANDALONE_TIER}_${category}`, JSON.stringify(data));
  } catch (e) {
    console.error('Failed saving standalone tier list', e);
  }
};

// Standalone Ratings out of 10 State
export const getStoredRatings = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RATINGS);
    if (!raw) {
      const defaultRatings = {
        'rb-sugar-free': { rating: 9.2, comment: 'Clean, crisp and classic.' },
        'mnst-ultra-white': { rating: 8.8, comment: 'Really good flavour. Not overly sweet and very refreshing. One of my favourites.' },
        'ghost-blue-raspberry': { rating: 8.5, comment: 'Authentic Sour Patch blue raspberry sourness.' },
        'mnst-mango-loco': { rating: 7.9, comment: 'Very juicy and sweet mango nectar.' },
        'rockstar-original': { rating: 6.5, comment: 'Nostalgic medicinal undertone.' }
      };
      localStorage.setItem(STORAGE_KEYS.RATINGS, JSON.stringify(defaultRatings));
      return defaultRatings;
    }
    return JSON.parse(raw);
  } catch (e) {
    return {};
  }
};

export const saveStoredRatings = (ratings) => {
  try {
    localStorage.setItem(STORAGE_KEYS.RATINGS, JSON.stringify(ratings));
  } catch (e) {
    console.error('Failed saving ratings', e);
  }
};

// Drink Tracker Logs
// Format: { [dateString: 'YYYY-MM-DD']: [ { id, productId, volumeMl, caffeineMg, timestamp } ] }
export const getStoredDrinkLogs = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DRINK_LOGS);
    if (!raw) {
      // Seed with some realistic recent entries for immediate satisfaction
      const today = new Date();
      const formatDate = (d) => d.toISOString().split('T')[0];

      const sampleLogs = {};
      const todayStr = formatDate(today);

      const y1 = new Date(today); y1.setDate(today.getDate() - 1);
      const y2 = new Date(today); y2.setDate(today.getDate() - 2);
      const y3 = new Date(today); y3.setDate(today.getDate() - 3);

      sampleLogs[todayStr] = [
        { id: 'log-1', productId: 'rb-original', volumeMl: 250, caffeineMg: 80, time: '09:15' },
        { id: 'log-2', productId: 'mnst-ultra-white', volumeMl: 500, caffeineMg: 150, time: '14:30' }
      ];
      sampleLogs[formatDate(y1)] = [
        { id: 'log-3', productId: 'ghost-blue-raspberry', volumeMl: 473, caffeineMg: 200, time: '11:00' }
      ];
      sampleLogs[formatDate(y2)] = [
        { id: 'log-4', productId: 'celsius-sparkling-orange', volumeMl: 355, caffeineMg: 200, time: '08:30' },
        { id: 'log-5', productId: 'rb-sugar-free', volumeMl: 250, caffeineMg: 80, time: '15:15' }
      ];
      sampleLogs[formatDate(y3)] = [
        { id: 'log-6', productId: 'mnst-pipeline-punch', volumeMl: 500, caffeineMg: 160, time: '13:00' }
      ];

      localStorage.setItem(STORAGE_KEYS.DRINK_LOGS, JSON.stringify(sampleLogs));
      return sampleLogs;
    }
    return JSON.parse(raw);
  } catch (e) {
    return {};
  }
};

export const saveStoredDrinkLogs = (logs) => {
  try {
    localStorage.setItem(STORAGE_KEYS.DRINK_LOGS, JSON.stringify(logs));
  } catch (e) {
    console.error('Failed saving drink logs', e);
  }
};

// Full JSON Backup Export & Import
export const exportFullBackup = () => {
  const data = {
    version: '1.0.0',
    exportDate: new Date().toISOString(),
    brands: getStoredBrands(),
    products: getStoredProducts(),
    projects: getStoredProjects(),
    ratings: getStoredRatings(),
    standaloneTiers: {
      brands: getStoredStandaloneTier('brands'),
      drinks: getStoredStandaloneTier('drinks')
    },
    drinkLogs: getStoredDrinkLogs()
  };
  return data;
};

export const importFullBackup = (jsonData) => {
  if (!jsonData || typeof jsonData !== 'object') {
    throw new Error('Invalid JSON format');
  }
  if (jsonData.brands) saveStoredBrands(jsonData.brands);
  if (jsonData.products) saveStoredProducts(jsonData.products);
  if (jsonData.projects) saveStoredProjects(jsonData.projects);
  if (jsonData.ratings) saveStoredRatings(jsonData.ratings);
  if (jsonData.standaloneTiers?.brands) saveStoredStandaloneTier('brands', jsonData.standaloneTiers.brands);
  if (jsonData.standaloneTiers?.drinks) saveStoredStandaloneTier('drinks', jsonData.standaloneTiers.drinks);
  if (jsonData.drinkLogs) saveStoredDrinkLogs(jsonData.drinkLogs);
  return true;
};
