import React from 'react';
import { 
  Trophy, 
  Layers, 
  Coffee, 
  BookOpen, 
  Sparkles, 
  ChevronRight
} from 'lucide-react';

export default function Home({ onNavigate, stats }) {
  const quickActions = [
    {
      id: 'rankings',
      title: 'Rankings',
      subtitle: 'Create tier lists & rate drinks',
      icon: Trophy,
      color: '#F59E0B',
      bgGlow: 'rgba(245, 158, 11, 0.12)',
      badge: 'Interactive'
    },
    {
      id: 'catalog',
      title: 'Drink Catalog',
      subtitle: `${stats?.brandCount || 334}+ brands & flavors`,
      icon: Layers,
      color: '#38BDF8',
      bgGlow: 'rgba(56, 189, 248, 0.12)',
      badge: 'Database'
    },
    {
      id: 'tracker',
      title: 'Drink Tracker',
      subtitle: 'Log daily drinks & caffeine',
      icon: Coffee,
      color: '#10B981',
      bgGlow: 'rgba(16, 185, 129, 0.12)',
      badge: 'Logger'
    },
    {
      id: 'library',
      title: 'Library & Brewing',
      subtitle: 'History, deep dives & brew guides',
      icon: BookOpen,
      color: '#A855F7',
      bgGlow: 'rgba(168, 85, 247, 0.12)',
      badge: 'Encyclopedia'
    }
  ];

  return (
    <div style={{ padding: '32px 24px', maxWidth: '1080px', margin: '0 auto', width: '100%' }}>
      {/* Super Simple Hero */}
      <div style={{
        textAlign: 'center',
        padding: '48px 24px 36px 24px',
        maxWidth: '680px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 14px',
          backgroundColor: 'rgba(56, 189, 248, 0.1)',
          border: '1px solid rgba(56, 189, 248, 0.25)',
          borderRadius: '9999px',
          color: '#38BDF8',
          fontSize: '0.8rem',
          fontWeight: 700,
          marginBottom: '20px'
        }}>
          <Sparkles size={14} />
          <span>Simple, Private & 100% Local</span>
        </div>

        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 800,
          color: '#F8FAFC',
          letterSpacing: '-0.03em',
          lineHeight: 1.15
        }}>
          Rank, Track & Explore <br />
          <span style={{
            background: 'linear-gradient(135deg, #38BDF8 0%, #818CF8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Every Energy Drink & Coffee
          </span>
        </h1>

        <p style={{
          fontSize: '1.05rem',
          color: '#94A3B8',
          marginTop: '14px',
          lineHeight: 1.6
        }}>
          Your personal caffeine studio. Browse hundreds of brands, rank your favorites, track daily intake, and master home coffee brewing.
        </p>

        {/* Primary CTA Buttons */}
        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center',
          marginTop: '28px',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => onNavigate('rankings')}
            className="btn-primary"
            style={{ padding: '12px 24px', fontSize: '0.95rem' }}
          >
            <Trophy size={18} />
            <span>Start Ranking</span>
          </button>
          <button
            onClick={() => onNavigate('tracker')}
            className="btn-secondary"
            style={{ padding: '12px 24px', fontSize: '0.95rem' }}
          >
            <Coffee size={18} />
            <span>Log a Drink</span>
          </button>
          <button
            onClick={() => onNavigate('catalog')}
            className="btn-secondary"
            style={{ padding: '12px 24px', fontSize: '0.95rem' }}
          >
            <Layers size={18} />
            <span>Browse Catalog</span>
          </button>
        </div>
      </div>

      {/* Clean 4-Card Hub Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '18px',
        marginTop: '16px'
      }}>
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <div
              key={action.id}
              onClick={() => onNavigate(action.id)}
              className="rankit-card"
              style={{
                padding: '24px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '190px',
                backgroundColor: '#14171F',
                border: '1px solid #242B3B',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = action.color;
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = `0 8px 24px -4px ${action.bgGlow}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#242B3B';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px'
                }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    backgroundColor: action.bgGlow,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={22} color={action.color} />
                  </div>
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: '#94A3B8',
                    backgroundColor: '#1F2433',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    border: '1px solid #242B3B'
                  }}>
                    {action.badge}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#F8FAFC' }}>
                  {action.title}
                </h3>
                <p style={{ fontSize: '0.86rem', color: '#94A3B8', marginTop: '6px', lineHeight: 1.4 }}>
                  {action.subtitle}
                </p>
              </div>

              <div style={{
                marginTop: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: action.color,
                fontWeight: 700,
                fontSize: '0.85rem'
              }}>
                <span>Open {action.title}</span>
                <ChevronRight size={15} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Simple Quick Stats Bar */}
      <div style={{
        marginTop: '32px',
        padding: '20px 24px',
        backgroundColor: '#14171F',
        border: '1px solid #242B3B',
        borderRadius: '12px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        gap: '20px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#38BDF8' }}>
            {stats?.brandCount || 334}
          </div>
          <div style={{ fontSize: '0.76rem', color: '#94A3B8', fontWeight: 600 }}>
            Energy Brands
          </div>
        </div>

        <div style={{ width: '1px', height: '36px', backgroundColor: '#242B3B' }} className="no-print" />

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#F59E0B' }}>
            Top 25
          </div>
          <div style={{ fontSize: '0.76rem', color: '#94A3B8', fontWeight: 600 }}>
            Global Rankings
          </div>
        </div>

        <div style={{ width: '1px', height: '36px', backgroundColor: '#242B3B' }} className="no-print" />

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#10B981' }}>
            Custom
          </div>
          <div style={{ fontSize: '0.76rem', color: '#94A3B8', fontWeight: 600 }}>
            Tier Lists & Logs
          </div>
        </div>

        <div style={{ width: '1px', height: '36px', backgroundColor: '#242B3B' }} className="no-print" />

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#A855F7' }}>
            Brew Lab
          </div>
          <div style={{ fontSize: '0.76rem', color: '#94A3B8', fontWeight: 600 }}>
            Dynamic Coffee Permutations
          </div>
        </div>
      </div>
    </div>
  );
}
