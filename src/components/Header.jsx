import React from 'react';
import { 
  Trophy, 
  Layers, 
  Coffee, 
  BookOpen, 
  Sparkles,
  Database
} from 'lucide-react';

export default function Header({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'rankings', label: 'Rankings', icon: Trophy },
    { id: 'catalog', label: 'Catalog', icon: Layers },
    { id: 'tracker', label: 'Drink Tracker', icon: Coffee },
    { id: 'library', label: 'Library', icon: BookOpen }
  ];

  return (
    <header style={{
      height: '64px',
      backgroundColor: '#10131A',
      borderBottom: '1px solid #242B3B',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      width: '100%'
    }} className="top-header no-print">
      {/* Left: Brand Logo & Title */}
      <div 
        onClick={() => setActiveTab('home')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          cursor: 'pointer',
          userSelect: 'none'
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em', color: '#F8FAFC' }}>
            Rank<span style={{ color: '#38BDF8' }}>It</span>
          </span>
          <span style={{ 
            fontSize: '0.62rem', 
            fontWeight: 700, 
            backgroundColor: 'rgba(56, 189, 248, 0.15)', 
            color: '#38BDF8', 
            padding: '2px 6px', 
            borderRadius: '4px',
            border: '1px solid rgba(56, 189, 248, 0.25)'
          }}>
            v1.0
          </span>
        </div>
      </div>

      {/* Middle/Right: Left-to-Right Horizontal Navigation Bar */}
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }}>
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
                gap: '8px',
                padding: '8px 14px',
                borderRadius: '8px',
                backgroundColor: isActive ? 'rgba(56, 189, 248, 0.12)' : 'transparent',
                color: isActive ? '#38BDF8' : '#94A3B8',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.88rem',
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
              <Icon size={16} color={isActive ? '#38BDF8' : '#64748B'} strokeWidth={isActive ? 2.5 : 2} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Right Side: Private Local Status Pill */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '0.74rem',
          fontWeight: 600,
          color: '#94A3B8',
          backgroundColor: '#14171F',
          padding: '6px 12px',
          borderRadius: '9999px',
          border: '1px solid #242B3B'
        }}>
          <Database size={13} color="#38BDF8" />
          <span>Local Storage</span>
        </div>
      </div>
    </header>
  );
}
