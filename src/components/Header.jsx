import React, { useRef } from 'react';
import { Sparkles } from 'lucide-react';
import { 
  exportFullBackup, 
  importFullBackup, 
  getStoredRatings, 
  getStoredDrinkLogs, 
  getStoredProducts 
} from '../storage/localStorage';
import { 
  downloadJSON, 
  downloadCSV, 
  exportRatingsToCSV, 
  exportDrinkLogsToCSV, 
  triggerPrint 
} from '../utils/export';

export default function Header({ onDataReload, activeTab }) {
  const fileInputRef = useRef(null);

  // Download features are kept safe in the codebase, hidden from public UI per user request
  const handleExportJSON = () => {
    const data = exportFullBackup();
    const dateStr = new Date().toISOString().split('T')[0];
    downloadJSON(data, `RankIt_Backup_${dateStr}.json`);
  };

  const handleImportJSON = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        importFullBackup(parsed);
        alert('RankIt backup restored successfully!');
        if (onDataReload) onDataReload();
      } catch (err) {
        alert('Failed to parse backup file: ' + err.message);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleExportCSV = () => {
    const ratings = getStoredRatings();
    const drinkLogs = getStoredDrinkLogs();
    const products = getStoredProducts();
    const map = {};
    products.forEach((p) => { map[p.id] = p; });

    const ratingsCSV = exportRatingsToCSV(ratings, map);
    const logsCSV = exportDrinkLogsToCSV(drinkLogs, map);

    downloadCSV(ratingsCSV, `RankIt_Ratings_${new Date().toISOString().split('T')[0]}.csv`);
    setTimeout(() => {
      downloadCSV(logsCSV, `RankIt_DrinkTracker_${new Date().toISOString().split('T')[0]}.csv`);
    }, 300);
  };

  return (
    <header style={{
      height: '64px',
      backgroundColor: 'rgba(12, 14, 18, 0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid #242B3B',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 28px',
      position: 'sticky',
      top: 0,
      zIndex: 20
    }} className="top-header no-print">
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <h1 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#F8FAFC', textTransform: 'capitalize' }}>
          {activeTab === 'home' ? 'Overview' : activeTab.replace('-', ' ')}
        </h1>
      </div>

      {/* Hidden file input for restore code integrity */}
      <input 
        type="file" 
        ref={fileInputRef} 
        style={{ display: 'none' }} 
        accept=".json"
        onChange={handleImportJSON} 
      />

      {/* Clean status pill */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '0.75rem',
          fontWeight: 600,
          color: '#94A3B8',
          backgroundColor: '#1F2433',
          padding: '4px 10px',
          borderRadius: '20px',
          border: '1px solid #242B3B'
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981' }}></span>
          <span>RankIt Studio</span>
        </span>
      </div>
    </header>
  );
}
