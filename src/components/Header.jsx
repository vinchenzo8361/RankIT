import React, { useRef } from 'react';
import { 
  Download, 
  Upload, 
  FileSpreadsheet, 
  Printer, 
  Sparkles,
  RefreshCw
} from 'lucide-react';
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
    e.target.value = ''; // Reset input
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
      height: '68px',
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid #E2E8F0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 28px',
      position: 'sticky',
      top: 0,
      zIndex: 20
    }} className="top-header no-print">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', textTransform: 'capitalize' }}>
          {activeTab === 'home' ? 'Overview' : activeTab.replace('-', ' ')}
        </h1>
      </div>

      {/* Action Buttons: Export JSON, Import JSON, CSV, Print */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} className="action-buttons">
        <input 
          type="file" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          accept=".json"
          onChange={handleImportJSON} 
        />

        <button 
          onClick={handleExportJSON}
          className="btn-secondary" 
          title="Backup your entire database (rankings, logs, comments)"
          style={{ padding: '7px 12px', fontSize: '0.8rem' }}
        >
          <Download size={15} color="#4F46E5" />
          <span>Export JSON</span>
        </button>

        <button 
          onClick={() => fileInputRef.current?.click()}
          className="btn-secondary" 
          title="Restore your data from a backup JSON file"
          style={{ padding: '7px 12px', fontSize: '0.8rem' }}
        >
          <Upload size={15} color="#16A34A" />
          <span>Import JSON</span>
        </button>

        <button 
          onClick={handleExportCSV}
          className="btn-secondary" 
          title="Export ratings and tracker logs to CSV for Excel / Sheets"
          style={{ padding: '7px 12px', fontSize: '0.8rem' }}
        >
          <FileSpreadsheet size={15} color="#0EA5E9" />
          <span>Export CSV</span>
        </button>

        <button 
          onClick={triggerPrint}
          className="btn-secondary" 
          title="Print or save PDF of rankings"
          style={{ padding: '7px 12px', fontSize: '0.8rem' }}
        >
          <Printer size={15} color="#64748B" />
          <span>Print</span>
        </button>
      </div>
    </header>
  );
}
