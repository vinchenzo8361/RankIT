import React, { useState } from 'react';
import { 
  BookOpen, 
  History, 
  Sparkles, 
  Archive, 
  FlaskConical, 
  ExternalLink,
  Search,
  Building,
  Award
} from 'lucide-react';
import { libraryData } from '../data/libraryData';

export default function Library({ onNavigateToCatalogProduct }) {
  const [activeCategory, setActiveCategory] = useState('energy-drinks'); // 'energy-drinks' | 'coffee'
  const [activeSubTab, setActiveSubTab] = useState('brands'); // 'brands' | 'products' | 'industry' | 'ingredients' | 'archive'
  const [searchQuery, setSearchQuery] = useState('');

  const { brandHistories, productHistories, industryHistory, ingredients, discontinuedArchive } = libraryData;

  return (
    <div style={{ padding: '28px', maxWidth: '1300px', margin: '0 auto', width: '100%' }}>
      {/* 6.1 Top Category Switcher */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', gap: '8px', backgroundColor: '#E2E8F0', padding: '4px', borderRadius: '10px' }}>
          <button
            onClick={() => setActiveCategory('energy-drinks')}
            style={{
              padding: '8px 18px',
              borderRadius: '8px',
              fontSize: '0.875rem',
              fontWeight: 700,
              backgroundColor: activeCategory === 'energy-drinks' ? '#FFFFFF' : 'transparent',
              color: activeCategory === 'energy-drinks' ? '#4F46E5' : '#64748B',
              boxShadow: activeCategory === 'energy-drinks' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            ⚡ Energy Drinks Encyclopedia
          </button>
          <button
            onClick={() => setActiveCategory('coffee')}
            style={{
              padding: '8px 18px',
              borderRadius: '8px',
              fontSize: '0.875rem',
              fontWeight: 700,
              backgroundColor: activeCategory === 'coffee' ? '#FFFFFF' : 'transparent',
              color: activeCategory === 'coffee' ? '#4F46E5' : '#64748B',
              boxShadow: activeCategory === 'coffee' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            ☕ Coffee (Reserved for Future)
          </button>
        </div>
      </div>

      {activeCategory === 'coffee' ? (
        <div className="rankit-card" style={{ padding: '48px', textAlign: 'center', margin: '40px auto', maxWidth: '600px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>☕</div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A' }}>Coffee Encyclopedia Reserved</h2>
          <p style={{ color: '#64748B', marginTop: '8px', lineHeight: 1.6 }}>
            The coffee history, origins, roast profiles, and extraction encyclopedia will be introduced in future expansions alongside the Coffee Catalog!
          </p>
          <button onClick={() => setActiveCategory('energy-drinks')} className="btn-primary" style={{ marginTop: '20px' }}>
            Return to Energy Drinks Library
          </button>
        </div>
      ) : (
        <>
          {/* Subsections: Brand Histories, Product Histories, Industry History, Ingredients, Discontinued Archive */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '28px' }}>
            {[
              { id: 'brands', label: 'Brand Histories', icon: Building },
              { id: 'products', label: 'Product Histories', icon: Sparkles },
              { id: 'industry', label: 'Industry Development', icon: History },
              { id: 'ingredients', label: 'Ingredients & Science', icon: FlaskConical },
              { id: 'archive', label: 'Discontinued Product Archive', icon: Archive }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeSubTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubTab(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '9px 16px',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                    backgroundColor: isActive ? '#4F46E5' : '#FFFFFF',
                    color: isActive ? '#FFFFFF' : '#475569',
                    border: isActive ? '1px solid #4F46E5' : '1px solid #E2E8F0',
                    boxShadow: isActive ? '0 2px 4px rgba(79, 70, 229, 0.2)' : 'none'
                  }}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* =========================================================
              SUBSECTION 1: BRAND HISTORIES
             ========================================================= */}
          {activeSubTab === 'brands' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {brandHistories.map((brand) => (
                <div key={brand.id} className="rankit-card" style={{ padding: '28px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                    <div>
                      <span className="badge badge-brand">{brand.country} • Founded {brand.founded}</span>
                      <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', marginTop: '6px' }}>
                        {brand.title}
                      </h2>
                      <div style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '4px' }}>
                        Founders: <strong>{brand.founders}</strong> | Parent Company: <strong>{brand.ownership}</strong>
                      </div>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.95rem', color: '#334155', fontStyle: 'italic', marginBottom: '20px', borderLeft: '4px solid #4F46E5', paddingLeft: '14px' }}>
                    "{brand.summary}"
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                    {brand.content.map((sec, i) => (
                      <div key={i}>
                        <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', marginBottom: '4px' }}>
                          {sec.heading}
                        </h4>
                        <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.6 }}>
                          {sec.body}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Milestones list */}
                  <div style={{ backgroundColor: '#F8FAFC', padding: '16px', borderRadius: '10px', marginBottom: '16px', border: '1px solid #E2E8F0' }}>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0F172A', marginBottom: '10px', textTransform: 'uppercase' }}>
                      Historical Milestones
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px' }}>
                      {brand.milestones.map((m, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: '8px', fontSize: '0.82rem' }}>
                          <span style={{ fontWeight: 800, color: '#4F46E5' }}>{m.year}:</span>
                          <span style={{ color: '#334155' }}>{m.event}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Fun Facts */}
                  <div>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
                      Did You Know?
                    </h4>
                    <ul style={{ paddingLeft: '20px', fontSize: '0.85rem', color: '#475569', lineHeight: 1.6 }}>
                      {brand.funFacts.map((fact, idx) => (
                        <li key={idx}>{fact}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* =========================================================
              SUBSECTION 2: PRODUCT HISTORIES (With 6.3 Catalog Link)
             ========================================================= */}
          {activeSubTab === 'products' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
              {productHistories.map((prod) => (
                <div key={prod.id} className="rankit-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span className="badge badge-brand">{prod.brand} • Introduced {prod.year}</span>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', marginTop: '8px' }}>
                      {prod.name}
                    </h3>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#F59E0B', marginTop: '4px', marginBottom: '12px' }}>
                      {prod.significance}
                    </div>
                    <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.6 }}>
                      {prod.content}
                    </p>
                  </div>

                  {/* 6.3 Link to Catalog */}
                  <div style={{ marginTop: '20px', paddingTop: '14px', borderTop: '1px solid #F1F5F9' }}>
                    <button
                      onClick={() => onNavigateToCatalogProduct(prod.productId)}
                      className="btn-secondary"
                      style={{ width: '100%', justifyContent: 'center', fontSize: '0.8rem' }}
                    >
                      <span>View in Catalog Database</span>
                      <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* =========================================================
              SUBSECTION 3: INDUSTRY DEVELOPMENT
             ========================================================= */}
          {activeSubTab === 'industry' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {industryHistory.map((era, idx) => (
                <div key={idx} className="rankit-card" style={{ padding: '24px', display: 'flex', gap: '20px' }}>
                  <div style={{ minWidth: '140px', fontWeight: 800, color: '#4F46E5', fontSize: '0.95rem' }}>
                    {era.era}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
                      {era.title}
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.6 }}>
                      {era.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* =========================================================
              SUBSECTION 4: INGREDIENTS & SCIENCE
             ========================================================= */}
          {activeSubTab === 'ingredients' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
              {ingredients.map((ing, idx) => (
                <div key={idx} className="rankit-card" style={{ padding: '20px' }}>
                  <span className="badge badge-brand">{ing.type}</span>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', marginTop: '8px' }}>
                    {ing.name}
                  </h3>
                  <div style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '2px', marginBottom: '12px' }}>
                    Role: <strong>{ing.role}</strong> | Typical: <strong>{ing.typicalDose}</strong>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.6 }}>
                    {ing.description}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* =========================================================
              SUBSECTION 5: DISCONTINUED PRODUCT ARCHIVE (6.2)
             ========================================================= */}
          {activeSubTab === 'archive' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {discontinuedArchive.map((item) => (
                <div key={item.id} className="rankit-card" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                  <div style={{ maxWidth: '680px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span className="badge badge-discontinued">Discontinued Archive</span>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748B' }}>{item.yearsActive}</span>
                    </div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A' }}>
                      {item.name} — <span style={{ color: '#4F46E5' }}>{item.brand}</span>
                    </h3>
                    <p style={{ fontSize: '0.82rem', color: '#475569', marginTop: '6px' }}>
                      Status: <strong>{item.status}</strong> | Form: <strong>{item.caffeine}</strong>
                    </p>
                    <p style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '6px', fontStyle: 'italic' }}>
                      {item.notes}
                    </p>
                  </div>

                  <button
                    onClick={() => onNavigateToCatalogProduct(item.name)}
                    className="btn-secondary"
                    style={{ fontSize: '0.8rem' }}
                  >
                    Find in Catalog
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
