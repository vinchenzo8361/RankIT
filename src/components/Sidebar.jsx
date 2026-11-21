import React from 'react';
import { 
  Trophy, 
  Layers, 
  Coffee, 
  BookOpen, 
  Sparkles,
  ChevronRight,
  Database
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'rankings', label: 'Rankings', icon: Trophy, desc: 'Tier lists & ratings' },
    { id: 'catalog', label: 'Catalog', icon: Layers, desc: 'Energy drink database' },
    { id: 'tracker', label: 'Drink Tracker', icon: Coffee, desc: 'Caffeine consumption' },
    { id: 'library', label: 'Library', icon: BookOpen, desc: 'History & encyclopedia' }
  ];

  return (
    <aside style={{
      width: '260px',
      backgroundColor: '#FFFFFF',
      borderRight: '1px solid #E2E8F0',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0
    }} className="sidebar-container no-print">
      {/* Brand Logo Header */}
      <div 
        onClick={() => setActiveTab('home')}
        style={{
          padding: '24px 20px',
          borderBottom: '1px solid #F1F5F9',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}
      >
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '10px',
          backgroundColor: '#4F46E5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
          fontWeight: 800,
          fontSize: '1.25rem',
          boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.25)'
        }}>
          R
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em', color: '#0F172A' }}>
              Rank<span style={{ color: '#4F46E5' }}>It</span>
            </span>
            <span style={{ 
              fontSize: '0.65rem', 
              fontWeight: 700, 
              backgroundColor: '#EEF2FF', 
              color: '#4F46E5', 
              padding: '2px 6px', 
              borderRadius: '4px' 
            }}>
              v1.0
            </span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 500 }}>
            Energy Drink Studio
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav style={{ padding: '16px 12px', flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div style={{ padding: '4px 12px', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: '#94A3B8', letterSpacing: '0.05em' }}>
          Navigation
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: '10px',
                width: '100%',
                textAlign: 'left',
                backgroundColor: isActive ? '#EEF2FF' : 'transparent',
                color: isActive ? '#4F46E5' : '#0F172A',
                fontWeight: isActive ? 700 : 500,
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.backgroundColor = '#F8FAFC';
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <Icon size={20} color={isActive ? '#4F46E5' : '#64748B'} strokeWidth={isActive ? 2.5 : 2} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.9rem', lineHeight: 1.2 }}>{item.label}</div>
                <div style={{ fontSize: '0.72rem', color: isActive ? '#6366F1' : '#94A3B8' }}>{item.desc}</div>
              </div>
              {isActive && <ChevronRight size={16} color="#4F46E5" />}
            </button>
          );
        })}
      </nav>

      {/* Local Mode Notice */}
      <div style={{ padding: '16px', margin: '12px', backgroundColor: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <Database size={15} color="#4F46E5" />
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0F172A' }}>100% Local & Private</span>
        </div>
        <p style={{ fontSize: '0.72rem', color: '#64748B', lineHeight: 1.4 }}>
          No accounts or cloud tracking. Data is preserved directly in your browser.
        </p>
      </div>
    </aside>
  );
}
