/**
 * Accurate Caffeine & Serving Volume Calculations
 * Formula from Specification:
 * Caffeine consumed = (Volume consumed / Standard serving volume) * Caffeine per standard serving
 */
export const calculateCaffeine = (product, volumeConsumedMl) => {
  if (!product || !product.servingSize || product.servingSize <= 0) return 0;
  const ratio = volumeConsumedMl / product.servingSize;
  return Math.round(ratio * (product.caffeine || 0));
};

export const COMMON_VOLUMES = [
  { label: '100 ml (Tasting / Sip)', value: 100 },
  { label: '125 ml (Half Standard)', value: 125 },
  { label: '250 ml (Standard Slim Can)', value: 250 },
  { label: '355 ml (12 fl oz Can)', value: 355 },
  { label: '473 ml (16 fl oz Tallboy)', value: 473 },
  { label: '500 ml (Euro Standard)', value: 500 },
  { label: '710 ml (24 fl oz Mega Can)', value: 710 }
];

export const TIER_CONFIG = {
  S: { name: 'S', label: 'Exceptional', color: '#F59E0B', bg: '#FEF3C7', border: '#F59E0B' },
  A: { name: 'A', label: 'Excellent', color: '#16A34A', bg: '#DCFCE7', border: '#16A34A' },
  B: { name: 'B', label: 'Good', color: '#3B82F6', bg: '#DBEAFE', border: '#3B82F6' },
  C: { name: 'C', label: 'Average', color: '#EAB308', bg: '#FEF9C3', border: '#EAB308' },
  D: { name: 'D', label: 'Below Average', color: '#F97316', bg: '#FFEDD5', border: '#F97316' },
  F: { name: 'F', label: 'Terrible', color: '#EF4444', bg: '#FEE2E2', border: '#EF4444' },
  IDK: { name: 'IDK', label: 'Not Yet Ranked', color: '#94A3B8', bg: '#F1F5F9', border: '#94A3B8' }
};

export const TIER_ORDER = ['S', 'A', 'B', 'C', 'D', 'F', 'IDK'];
