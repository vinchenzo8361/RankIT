// Local Storage Management Keys & Helpers for RankIt Version 1
import { initialBrands } from '../data/brands';
import { initialProducts } from '../data/products';

const STORAGE_KEYS = {
  BRANDS: 'rankit_brands_v4', // updated for popularity ranks
  PRODUCTS: 'rankit_products_v2',
  PROJECTS: 'rankit_projects_v1',
  STANDALONE_TIER: 'rankit_standalone_tier_v1',
  RATINGS: 'rankit_ratings_v1',
  DRINK_LOGS: 'rankit_drink_logs_v1',
  FAVORITES: 'rankit_favorites_v1', // dedicated drink favorites store
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

// User Favorites (Array of drink product IDs)
export const getStoredFavorites = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    if (!raw) {
      // Default to initial popular favourites so users see it immediately
      const defaultFavs = ['rb-original', 'mnst-ultra-white', 'ghost-blue-raspberry'];
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(defaultFavs));
      return defaultFavs;
    }
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
};

export const saveStoredFavorites = (favs) => {
  try {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favs));
  } catch (e) {
    console.error('Failed saving favorites', e);
  }
};

// Ranking Projects
export const getStoredProjects = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify([]));
      return [];
    }
    return JSON.parse(raw);
  } catch (e) {
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
      return { S: [], A: [], B: [], C: [], D: [], F: [], IDK: [] };
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
      localStorage.setItem(STORAGE_KEYS.RATINGS, JSON.stringify({}));
      return {};
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
export const getStoredDrinkLogs = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DRINK_LOGS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.DRINK_LOGS, JSON.stringify({}));
      return {};
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
    favorites: getStoredFavorites(),
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
  if (jsonData.favorites) saveStoredFavorites(jsonData.favorites);
  if (jsonData.standaloneTiers?.brands) saveStoredStandaloneTier('brands', jsonData.standaloneTiers.brands);
  if (jsonData.standaloneTiers?.drinks) saveStoredStandaloneTier('drinks', jsonData.standaloneTiers.drinks);
  if (jsonData.drinkLogs) saveStoredDrinkLogs(jsonData.drinkLogs);
  return true;
};
