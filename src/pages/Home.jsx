import React from 'react';
import { 
  Trophy, 
  Layers, 
  Coffee, 
  BookOpen, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2
} from 'lucide-react';

export default function Home({ onNavigate, stats }) {
  return (
    <div style={{ padding: '36px 28px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      {/* Hero Welcome Area as per Section 2 Specification */}
      <div className="rankit-card" style={{
        padding: '36px',
        background: 'linear-gradient(135deg, #FFFFFF 0%, #F5F7FF 100%)',
        border: '1px solid #E2E8F0',
        marginBottom: '32px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '720px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', backgroundColor: '#EEF2FF', borderRadius: '9999px', color: '#4F46E5', fontSize: '0.8rem', fontWeight: 700, marginBottom: '14px' }}>
            <Sparkles size={14} />
            <span>RankIt Version 1.0 Release</span>
          </div>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.03em', lineHeight: 1.15 }}>
            Personal Product Ranking & Caffeine Intelligence
          </h1>
          <p style={{ fontSize: '1rem', color: '#64748B', marginTop: '12px', lineHeight: 1.6 }}>
            Explore an extensive energy drink catalog, construct custom tier lists and 0–10 numerical ratings, 
            track daily consumption with precise serving volume math, and dive into brand histories. 
            <strong> 100% local and private to your browser.</strong>
          </p>

          <div style={{ display: 'flex', gap: '12px', marginTop: '24px', flexWrap: 'wrap' }}>
            <button
              onClick={() => onNavigate('rankings')}
              className="btn-primary"
              style={{ padding: '12px 22px', fontSize: '0.95rem' }}
            >
              <Trophy size={18} />
              <span>Start Ranking</span>
            </button>
            <button
              onClick={() => onNavigate('catalog')}
              className="btn-secondary"
              style={{ padding: '12px 22px', fontSize: '0.95rem' }}
            >
              <Layers size={18} />
              <span>Browse 27+ Brands</span>
            </button>
          </div>
        </div>
      </div>

      {/* Four Main Section Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '36px' }}>
        {/* A. Rankings */}
        <div 
          onClick={() => onNavigate('rankings')}
          className="rankit-card" 
          style={{ padding: '24px', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <div>
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <Trophy size={22} color="#F59E0B" />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A' }}>A. Rankings</h3>
            <p style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '8px', lineHeight: 1.5 }}>
              Create personal ranking workspaces, build S through F tier lists, and evaluate individual products with decimals out of 10.
            </p>
          </div>
          <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '6px', color: '#4F46E5', fontWeight: 700, fontSize: '0.85rem' }}>
            <span>Open Rankings</span>
            <ArrowRight size={15} />
          </div>
        </div>

        {/* B. Catalog */}
        <div 
          onClick={() => onNavigate('catalog')}
          className="rankit-card" 
          style={{ padding: '24px', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <div>
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <Layers size={22} color="#4F46E5" />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A' }}>B. Catalog</h3>
            <p style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '8px', lineHeight: 1.5 }}>
              Central product database powering all sections. Browse active flavors, discontinued formulations, and filter by caffeine or brand.
            </p>
          </div>
          <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '6px', color: '#4F46E5', fontWeight: 700, fontSize: '0.85rem' }}>
            <span>Explore Catalog</span>
            <ArrowRight size={15} />
          </div>
        </div>

        {/* C. Drink Tracker */}
        <div 
          onClick={() => onNavigate('tracker')}
          className="rankit-card" 
          style={{ padding: '24px', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <div>
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: '#DBEAFE', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <Coffee size={22} color="#3B82F6" />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A' }}>C. Drink Tracker</h3>
            <p style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '8px', lineHeight: 1.5 }}>
              Record daily consumption with automatic caffeine intake calculations based on exact milliliters, plus 7-day bar charts.
            </p>
          </div>
          <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '6px', color: '#4F46E5', fontWeight: 700, fontSize: '0.85rem' }}>
            <span>Log Drinks</span>
            <ArrowRight size={15} />
          </div>
        </div>

        {/* D. Library */}
        <div 
          onClick={() => onNavigate('library')}
          className="rankit-card" 
          style={{ padding: '24px', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <div>
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <BookOpen size={22} color="#16A34A" />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A' }}>D. Library</h3>
            <p style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '8px', lineHeight: 1.5 }}>
              The encyclopedia of energy drinks: historical brand origins, discontinued product museum, and the science of active ingredients.
            </p>
          </div>
          <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '6px', color: '#4F46E5', fontWeight: 700, fontSize: '0.85rem' }}>
            <span>Open Library</span>
            <ArrowRight size={15} />
          </div>
        </div>
      </div>

      {/* Architectural Guarantee Section */}
      <div className="rankit-card" style={{ padding: '24px', backgroundColor: '#FFFFFF' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldCheck size={18} color="#10B981" />
          <span>RankIt Core Architecture & Privacy Guarantees</span>
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', fontSize: '0.82rem', color: '#475569' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <CheckCircle2 size={16} color="#4F46E5" style={{ flexShrink: 0, marginTop: '2px' }} />
            <span><strong>Centralized Catalog:</strong> Adding or editing drinks automatically makes them available across Rankings and Drink Tracker.</span>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <CheckCircle2 size={16} color="#4F46E5" style={{ flexShrink: 0, marginTop: '2px' }} />
            <span><strong>Independent Ranking Systems:</strong> Numerical 0–10 ratings never force tier placement changes and vice versa.</span>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <CheckCircle2 size={16} color="#4F46E5" style={{ flexShrink: 0, marginTop: '2px' }} />
            <span><strong>Zero Cloud Tracking:</strong> Full data persistence in local browser storage, with complete JSON backup export and import.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
