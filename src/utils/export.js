/**
 * Utilities for exporting and importing RankIt data
 * Supports: JSON Export, JSON Import, CSV Export for Rankings & Drink Tracker, Print formatting
 */

export const downloadJSON = (data, filename = 'rankit-backup.json') => {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const downloadCSV = (content, filename = 'rankit-export.csv') => {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportRatingsToCSV = (ratings, productsMap) => {
  const headers = ['Product ID', 'Product Name', 'Brand', 'Rating (out of 10)', 'Personal Comment'];
  const rows = Object.entries(ratings).map(([productId, data]) => {
    const prod = productsMap[productId] || {};
    const name = `"${(prod.name || productId).replace(/"/g, '""')}"`;
    const brand = `"${(prod.brand || '').replace(/"/g, '""')}"`;
    const rating = typeof data === 'object' ? data.rating : data;
    const comment = `"${(typeof data === 'object' ? data.comment || '' : '').replace(/"/g, '""')}"`;
    return [productId, name, brand, rating, comment].join(',');
  });

  return [headers.join(','), ...rows].join('\n');
};

export const exportDrinkLogsToCSV = (drinkLogs, productsMap) => {
  const headers = ['Date', 'Time', 'Product ID', 'Product Name', 'Brand', 'Volume (ml)', 'Caffeine (mg)'];
  const rows = [];

  // Sort dates descending
  const dates = Object.keys(drinkLogs).sort((a, b) => b.localeCompare(a));
  dates.forEach((date) => {
    const entries = drinkLogs[date] || [];
    entries.forEach((item) => {
      const prod = productsMap[item.productId] || {};
      const name = `"${(prod.name || item.productId).replace(/"/g, '""')}"`;
      const brand = `"${(prod.brand || '').replace(/"/g, '""')}"`;
      rows.push([
        date,
        item.time || '',
        item.productId,
        name,
        brand,
        item.volumeMl,
        item.caffeineMg
      ].join(','));
    });
  });

  return [headers.join(','), ...rows].join('\n');
};

export const triggerPrint = () => {
  window.print();
};
