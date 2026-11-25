import React from 'react';
import { 
  Trophy, 
  Layers, 
  Coffee, 
  BookOpen, 
  ChevronRight,
  Database
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'rankings', label: 'Rankings', icon: Trophy, desc: 'Tier lists & ratings' },
    { id: 'catalog', label: 'Catalog', icon: Layers, desc: '330+ energy drinks' },
    { id: 'tracker', label: 'Drink Tracker', icon: Coffee, desc: 'Daily caffeine intake' },
    { id: 'library', label: 'Library', icon: BookOpen, desc: 'Knowledge & brewing' }
  ];

  return (
    <aside style={{
      width: '250px',
      backgroundColor: '#10131A',
      borderRight: '1px solid #242B3B',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0
    }} className="sidebar-container no-print">
      {/* Brand Logo Header */}
      <div 
        onClick={() => setActiveTab('home')}
        style={{
          padding: '22px 20px',
          borderBottom: '1px solid #1F2433',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}
      >
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '9px',
          background: 'linear-gradient(135deg, #38BDF8 0%, #3B82F6 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#0C0E12',
          fontWeight: 800,
          fontSize: '1.2rem',
          boxShadow: '0 4px 12px rgba(56, 189, 248, 0.3)'
        }}>
          R
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.02em', color: '#F8FAFC' }}>
              Rank<span style={{ color: '#38BDF8' }}>It</span>
            </span>
            <span style={{ 
              fontSize: '0.62rem', 
              fontWeight: 700, 
              backgroundColor: 'rgba(56, 189, 248, 0.15)', 
              color: '#38BDF8', 
              padding: '1px 5px', 
              borderRadius: '4px' 
            }}>
              v1.0
            </span>
          </div>
          <div style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: 500 }}>
            Energy & Coffee Studio
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav style={{ padding: '16px 12px', flex: 1, display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <div style={{ padding: '4px 12px', fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748B', letterSpacing: '0.05em' }}>
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
                padding: '11px 14px',
                borderRadius: '8px',
                width: '100%',
                textAlign: 'left',
                backgroundColor: isActive ? 'rgba(56, 189, 248, 0.12)' : 'transparent',
                color: isActive ? '#38BDF8' : '#94A3B8',
                fontWeight: isActive ? 700 : 500,
                border: isActive ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = '#1A1F2B';
                  e.currentTarget.style.color = '#F8FAFC';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#94A3B8';
                }
              }}
            >
              <Icon size={18} color={isActive ? '#38BDF8' : '#64748B'} strokeWidth={isActive ? 2.5 : 2} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.86rem', lineHeight: 1.2, color: isActive ? '#38BDF8' : '#F8FAFC' }}>{item.label}</div>
                <div style={{ fontSize: '0.7rem', color: '#64748B' }}>{item.desc}</div>
              </div>
              {isActive && <ChevronRight size={15} color="#38BDF8" />}
            </button>
          );
        })}
      </nav>

      {/* Local Mode Notice */}
      <div style={{ padding: '14px', margin: '12px', backgroundColor: '#14171F', borderRadius: '8px', border: '1px solid #242B3B' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
          <Database size={14} color="#38BDF8" />
          <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#F8FAFC' }}>100% Local Storage</span>
        </div>
        <p style={{ fontSize: '0.7rem', color: '#94A3B8', lineHeight: 1.4 }}>
          Private and stored in your browser.
        </p>
      </div>
    </aside>
  );
}
