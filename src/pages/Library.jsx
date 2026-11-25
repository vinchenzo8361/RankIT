import React, { useState } from 'react';
import { 
  BookOpen, 
  History, 
  Sparkles, 
  Archive, 
  FlaskConical, 
  ExternalLink,
  Building,
  Coffee,
  Flame,
  CupSoda,
  Clock,
  Layers,
  ArrowLeft,
  ChevronRight,
  Compass,
  Lock
} from 'lucide-react';
import { libraryData } from '../data/libraryData';
import { coffeeLibraryData } from '../data/coffeeLibraryData';

export default function Library({ onNavigateToCatalogProduct }) {
  // activeSection: null = Main Library Portal View; 'energy-drinks' | 'coffee'
  const [activeSection, setActiveSection] = useState(null);

  // Subtabs within Energy Drinks
  const [activeEnergyTab, setActiveEnergyTab] = useState('history'); // 'history' | 'products' | 'brands' | 'ingredients' | 'archive'

  // Subtabs within Coffee
  const [activeCoffeeTab, setActiveCoffeeTab] = useState('drinks'); // 'drinks' | 'roasts' | 'brewing' | 'beans'

  const { energyDrinkHistory, productHistories, brandHistories, ingredients, discontinuedArchive } = libraryData;
  const { drinkTypes, roastLevels, homeBrewingGuide, beanSpecies } = coffeeLibraryData;

  // Available library modules/components
  const libraryModules = [
    {
      id: 'energy-drinks',
      title: 'Energy Drinks Encyclopedia',
      badge: 'Active & Historical',
      badgeColor: '#38BDF8',
      description: 'The definitive encyclopedia: 60-year history from Asian tonics, extreme sports culture, product deep-dives (origin, invention, fame, impact), and active ingredient science.',
      icon: '⚡',
      accentColor: '#38BDF8',
      sectionsCount: '5 Sections'
    },
    {
      id: 'coffee',
      title: 'Coffee Library & Brewing',
      badge: 'Master Guide',
      badgeColor: '#B45309',
      description: 'Drink anatomy (Latte, Cappuccino, Americano, Cortado), roast levels and intensities (1–12), Arabica vs Robusta biology, and step-by-step home brewing recipes.',
      icon: '☕',
      accentColor: '#B45309',
      sectionsCount: '4 Sections'
    },
    {
      id: 'tea-nootropics',
      title: 'Tea & Functional Adaptogens',
      badge: 'Coming Soon',
      badgeColor: '#64748B',
      description: 'Matcha ceremonies, yerba mate history, L-theanine synergy, and botanical adaptogens. Scheduled for future version expansion.',
      icon: '🍵',
      accentColor: '#64748B',
      sectionsCount: 'Expansion V2',
      isLocked: true
    }
  ];

  return (
    <div style={{ padding: '28px', maxWidth: '1300px', margin: '0 auto', width: '100%' }}>
      {/* =========================================================
          VIEW 1: PORTAL / COMPONENT SELECTION VIEW
          When user enters Library, they see the module cards in the center screen.
          No top category clutter.
         ========================================================= */}
      {!activeSection ? (
        <div>
          <div style={{ marginBottom: '28px', maxWidth: '640px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '3px 10px', borderRadius: '20px', backgroundColor: '#1F2433', border: '1px solid #242B3B', fontSize: '0.72rem', color: '#38BDF8', fontWeight: 700, marginBottom: '8px' }}>
              <Compass size={13} />
              <span>RankIt Knowledge Center</span>
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#F8FAFC', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
              Product Library & Encyclopedia
            </h2>
            <p style={{ fontSize: '0.88rem', color: '#94A3B8', marginTop: '6px', lineHeight: 1.5 }}>
              Select a category module below to explore deep historical timelines, product inventions, cultural impact, and brewing guides.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '20px'
          }}>
            {libraryModules.map((mod) => (
              <div
                key={mod.id}
                onClick={() => {
                  if (!mod.isLocked) setActiveSection(mod.id);
                }}
                className="rankit-card"
                style={{
                  padding: '26px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  cursor: mod.isLocked ? 'not-allowed' : 'pointer',
                  opacity: mod.isLocked ? 0.65 : 1,
                  position: 'relative',
                  border: mod.isLocked ? '1px dashed #242B3B' : '1px solid #242B3B',
                  minHeight: '260px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <span style={{ fontSize: '2.4rem' }}>{mod.icon}</span>
                    <span style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: '5px',
                      backgroundColor: mod.isLocked ? '#1F2433' : 'rgba(56, 189, 248, 0.12)',
                      color: mod.badgeColor
                    }}>
                      {mod.isLocked && <Lock size={11} />}
                      <span>{mod.badge}</span>
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#F8FAFC', lineHeight: 1.2 }}>
                    {mod.title}
                  </h3>

                  <p style={{ fontSize: '0.82rem', color: '#94A3B8', marginTop: '8px', lineHeight: 1.5 }}>
                    {mod.description}
                  </p>
                </div>

                <div style={{ marginTop: '22px', paddingTop: '14px', borderTop: '1px solid #1F2433', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600 }}>{mod.sectionsCount}</span>
                  {!mod.isLocked ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem', fontWeight: 700, color: mod.accentColor }}>
                      <span>Open Library</span>
                      <ChevronRight size={15} />
                    </div>
                  ) : (
                    <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Coming Soon</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* =========================================================
           VIEW 2: DRILL-DOWN INTO SPECIFIC MODULE
           Shows top module navigation tabs, breadcrumb back button
         ========================================================= */
        <div>
          {/* Top header navigation with Back button & Module switcher */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', marginBottom: '22px' }}>
            <button
              onClick={() => setActiveSection(null)}
              className="btn-secondary"
              style={{ padding: '7px 12px', fontSize: '0.82rem' }}
            >
              <ArrowLeft size={15} />
              <span>Back to Library Categories</span>
            </button>

            {/* Sub-module switcher added only when inside a component */}
            <div style={{ display: 'flex', gap: '4px', backgroundColor: '#14171F', padding: '3px', borderRadius: '8px', border: '1px solid #242B3B' }}>
              <button
                onClick={() => setActiveSection('energy-drinks')}
                style={{
                  padding: '6px 14px',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  backgroundColor: activeSection === 'energy-drinks' ? '#1F2433' : 'transparent',
                  color: activeSection === 'energy-drinks' ? '#38BDF8' : '#94A3B8',
                  border: activeSection === 'energy-drinks' ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent'
                }}
              >
                ⚡ Energy Drinks Encyclopedia
              </button>
              <button
                onClick={() => setActiveSection('coffee')}
                style={{
                  padding: '6px 14px',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  backgroundColor: activeSection === 'coffee' ? '#1F2433' : 'transparent',
                  color: activeSection === 'coffee' ? '#F59E0B' : '#94A3B8',
                  border: activeSection === 'coffee' ? '1px solid rgba(245, 158, 11, 0.3)' : '1px solid transparent'
                }}
              >
                ☕ Coffee Library & Brewing
              </button>
            </div>
          </div>

          {/* =========================================================
              COMPONENT A: ENERGY DRINKS ENCYCLOPEDIA & HISTORY
             ========================================================= */}
          {activeSection === 'energy-drinks' && (
            <div>
              {/* Internal subsection pills */}
              <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '22px' }}>
                {[
                  { id: 'history', label: 'History of Energy Drinks', icon: History },
                  { id: 'products', label: 'Item Deep-Dives (Origins, Fame & Impact)', icon: Sparkles },
                  { id: 'brands', label: 'Brand Chronicles', icon: Building },
                  { id: 'ingredients', label: 'Ingredient Science', icon: FlaskConical },
                  { id: 'archive', label: 'Discontinued Museum', icon: Archive }
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeEnergyTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveEnergyTab(tab.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 14px',
                        borderRadius: '6px',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        whiteSpace: 'nowrap',
                        backgroundColor: isActive ? '#1F2433' : '#14171F',
                        color: isActive ? '#38BDF8' : '#94A3B8',
                        border: isActive ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid #242B3B'
                      }}
                    >
                      <Icon size={14} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* 1. DEDICATED HISTORY OF ENERGY DRINKS */}
              {activeEnergyTab === 'history' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                  <div className="rankit-card" style={{ padding: '26px' }}>
                    <div style={{ marginBottom: '18px' }}>
                      <span className="badge badge-brand">Global Retrospective</span>
                      <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#F8FAFC', marginTop: '6px' }}>
                        {energyDrinkHistory.title}
                      </h2>
                      <p style={{ fontSize: '0.85rem', color: '#38BDF8', marginTop: '2px' }}>
                        {energyDrinkHistory.subtitle}
                      </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', borderLeft: '2px solid #242B3B', paddingLeft: '18px', marginLeft: '6px' }}>
                      {energyDrinkHistory.timeline.map((era, i) => (
                        <div key={i} style={{ position: 'relative' }}>
                          <span style={{
                            position: 'absolute',
                            left: '-23px',
                            top: '4px',
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: '#38BDF8',
                            boxShadow: '0 0 8px rgba(56, 189, 248, 0.6)'
                          }}></span>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#38BDF8', backgroundColor: 'rgba(56, 189, 248, 0.1)', padding: '2px 7px', borderRadius: '4px' }}>
                              {era.year}
                            </span>
                            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#94A3B8' }}>
                              {era.era}
                            </span>
                          </div>

                          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#F8FAFC', marginBottom: '6px' }}>
                            {era.title}
                          </h3>

                          <p style={{ fontSize: '0.85rem', color: '#94A3B8', lineHeight: 1.6 }}>
                            {era.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Cultural Impact Overview */}
                  <div className="rankit-card" style={{ padding: '24px' }}>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#F8FAFC', marginBottom: '14px' }}>
                      Cultural Impact in Modern Life
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
                      {energyDrinkHistory.culturalImpact.map((item, idx) => (
                        <div key={idx} style={{ padding: '14px', backgroundColor: '#14171F', borderRadius: '8px', border: '1px solid #242B3B' }}>
                          <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#38BDF8', marginBottom: '4px' }}>
                            {item.heading}
                          </h4>
                          <p style={{ fontSize: '0.82rem', color: '#94A3B8', lineHeight: 1.5 }}>
                            {item.body}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 2. ITEM DEEP-DIVES (Origins, Invention, Fame, Impact, Fun Facts) */}
              {activeEnergyTab === 'products' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {productHistories.map((prod) => (
                    <div key={prod.id} className="rankit-card" style={{ padding: '24px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span className="badge badge-brand">{prod.brand}</span>
                            <span style={{ fontSize: '0.78rem', color: '#94A3B8' }}>Released in {prod.releaseYear}</span>
                          </div>
                          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#F8FAFC', marginTop: '4px' }}>
                            {prod.name}
                          </h3>
                          <span style={{ fontSize: '0.8rem', color: '#38BDF8', fontWeight: 600 }}>
                            Origin: {prod.origin} • Inventor: {prod.inventor}
                          </span>
                        </div>

                        <div style={{ padding: '6px 12px', backgroundColor: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '6px', textAlign: 'right' }}>
                          <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#F59E0B', textTransform: 'uppercase', display: 'block' }}>Fame Rating</span>
                          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#F59E0B' }}>{prod.fameScore}</span>
                        </div>
                      </div>

                      {/* How It Was First Made & Today's Impact */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '14px', marginBottom: '18px' }}>
                        <div style={{ padding: '14px', backgroundColor: '#14171F', borderRadius: '8px', border: '1px solid #242B3B' }}>
                          <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#F8FAFC', marginBottom: '4px' }}>
                            How It Was First Made:
                          </h4>
                          <p style={{ fontSize: '0.82rem', color: '#94A3B8', lineHeight: 1.5 }}>
                            {prod.howItWasMade}
                          </p>
                        </div>

                        <div style={{ padding: '14px', backgroundColor: '#14171F', borderRadius: '8px', border: '1px solid #242B3B' }}>
                          <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#F8FAFC', marginBottom: '4px' }}>
                            Impact in Today's Life:
                          </h4>
                          <p style={{ fontSize: '0.82rem', color: '#94A3B8', lineHeight: 1.5 }}>
                            {prod.todaysImpact}
                          </p>
                        </div>
                      </div>

                      {/* Random Fun Facts */}
                      <div style={{ padding: '14px', backgroundColor: 'rgba(56, 189, 248, 0.05)', borderRadius: '8px', border: '1px solid rgba(56, 189, 248, 0.2)', marginBottom: '14px' }}>
                        <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#38BDF8', marginBottom: '8px' }}>
                          Random Fun Facts:
                        </h4>
                        <ul style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.82rem', color: '#94A3B8', lineHeight: 1.5 }}>
                          {prod.funFacts.map((fact, fIdx) => (
                            <li key={fIdx}>{fact}</li>
                          ))}
                        </ul>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid #1F2433', fontSize: '0.78rem', color: '#64748B' }}>
                        <span>Taste Profile: {prod.tastingNotes}</span>
                        <button
                          onClick={() => onNavigateToCatalogProduct(prod.id)}
                          className="btn-secondary"
                          style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                        >
                          <span>Catalog Entry</span>
                          <ExternalLink size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 3. BRAND CHRONICLES */}
              {activeEnergyTab === 'brands' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  {brandHistories.map((brand) => (
                    <div key={brand.id} className="rankit-card" style={{ padding: '24px' }}>
                      <div style={{ marginBottom: '14px' }}>
                        <span className="badge badge-brand">{brand.country} • Founded {brand.founded}</span>
                        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#F8FAFC', marginTop: '4px' }}>
                          {brand.title}
                        </h2>
                        <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '2px' }}>
                          Founders: <strong>{brand.founders}</strong> | Ownership: <strong>{brand.ownership}</strong>
                        </div>
                      </div>

                      <p style={{ fontSize: '0.88rem', color: '#CBD5E1', fontStyle: 'italic', marginBottom: '16px', borderLeft: '3px solid #38BDF8', paddingLeft: '12px' }}>
                        "{brand.summary}"
                      </p>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '18px' }}>
                        {brand.content.map((sec, i) => (
                          <div key={i}>
                            <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#F8FAFC', marginBottom: '2px' }}>
                              {sec.heading}
                            </h4>
                            <p style={{ fontSize: '0.82rem', color: '#94A3B8', lineHeight: 1.5 }}>
                              {sec.body}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div style={{ backgroundColor: '#14171F', padding: '14px', borderRadius: '8px', border: '1px solid #242B3B' }}>
                        <h4 style={{ fontSize: '0.78rem', fontWeight: 800, color: '#38BDF8', textTransform: 'uppercase', marginBottom: '8px' }}>
                          Milestones
                        </h4>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '8px' }}>
                          {brand.milestones.map((m, idx) => (
                            <div key={idx} style={{ display: 'flex', gap: '6px', fontSize: '0.78rem' }}>
                              <span style={{ fontWeight: 800, color: '#F8FAFC' }}>{m.year}:</span>
                              <span style={{ color: '#94A3B8' }}>{m.event}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 4. INGREDIENT SCIENCE */}
              {activeEnergyTab === 'ingredients' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
                  {ingredients.map((ing, idx) => (
                    <div key={idx} className="rankit-card" style={{ padding: '18px' }}>
                      <span className="badge badge-brand">{ing.type}</span>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#F8FAFC', marginTop: '6px' }}>
                        {ing.name}
                      </h3>
                      <div style={{ fontSize: '0.76rem', color: '#94A3B8', marginTop: '2px', marginBottom: '8px' }}>
                        Role: <strong>{ing.role}</strong> | Typical: <strong>{ing.typicalDose}</strong>
                      </div>
                      <p style={{ fontSize: '0.8rem', color: '#94A3B8', lineHeight: 1.5 }}>
                        {ing.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* 5. DISCONTINUED ARCHIVE */}
              {activeEnergyTab === 'archive' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {discontinuedArchive.map((item) => (
                    <div key={item.id} className="rankit-card" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                          <span className="badge badge-discontinued">Discontinued Archive</span>
                          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94A3B8' }}>{item.yearsActive}</span>
                        </div>
                        <h3 style={{ fontSize: '1.08rem', fontWeight: 800, color: '#F8FAFC' }}>
                          {item.name} — <span style={{ color: '#38BDF8' }}>{item.brand}</span>
                        </h3>
                        <p style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '4px' }}>
                          Formulation: {item.caffeine}
                        </p>
                        <p style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '2px', fontStyle: 'italic' }}>
                          {item.notes}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* =========================================================
              COMPONENT B: COFFEE LIBRARY & BREWING
             ========================================================= */}
          {activeSection === 'coffee' && (
            <div>
              <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '22px' }}>
                {[
                  { id: 'drinks', label: 'Coffee Drink Types (Latte, Cappuccino...)', icon: CupSoda },
                  { id: 'roasts', label: 'Roast Levels & Intensities', icon: Flame },
                  { id: 'brewing', label: 'How to Make Coffee at Home', icon: Clock },
                  { id: 'beans', label: 'Arabica vs Robusta Beans', icon: Layers }
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeCoffeeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveCoffeeTab(tab.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 14px',
                        borderRadius: '6px',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        whiteSpace: 'nowrap',
                        backgroundColor: isActive ? '#1F2433' : '#14171F',
                        color: isActive ? '#F59E0B' : '#94A3B8',
                        border: isActive ? '1px solid rgba(245, 158, 11, 0.3)' : '1px solid #242B3B'
                      }}
                    >
                      <Icon size={14} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* 1. DRINK TYPES */}
              {activeCoffeeTab === 'drinks' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
                  {drinkTypes.map((item) => (
                    <div key={item.id} className="rankit-card" style={{ padding: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#F59E0B', textTransform: 'uppercase' }}>
                            {item.italianMeaning || item.origin || 'Classic Drink'}
                          </span>
                          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#F59E0B' }}>
                            {item.caffeine}
                          </span>
                        </div>

                        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#F8FAFC', marginTop: '4px' }}>
                          {item.name}
                        </h3>

                        <div style={{
                          padding: '5px 8px',
                          backgroundColor: '#1F2433',
                          borderRadius: '5px',
                          border: '1px solid #242B3B',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          color: '#F8FAFC',
                          marginTop: '8px',
                          marginBottom: '10px'
                        }}>
                          Ratio: {item.ratio}
                        </div>

                        <p style={{ fontSize: '0.82rem', color: '#94A3B8', lineHeight: 1.5 }}>
                          {item.description}
                        </p>
                      </div>

                      <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid #1F2433', fontSize: '0.74rem', color: '#64748B' }}>
                        <strong>Ingredients:</strong> {item.ingredients}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 2. ROAST LEVELS */}
              {activeCoffeeTab === 'roasts' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {roastLevels.map((roast, idx) => (
                    <div key={idx} className="rankit-card" style={{ padding: '20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
                        <div>
                          <span className="badge" style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#F59E0B' }}>
                            {roast.intensity}
                          </span>
                          <h3 style={{ fontSize: '1.18rem', fontWeight: 800, color: '#F8FAFC', marginTop: '4px' }}>
                            {roast.level}
                          </h3>
                          <span style={{ fontSize: '0.76rem', color: '#94A3B8' }}>
                            Roasting Temperature: {roast.temp} • {roast.internalTemp}
                          </span>
                        </div>

                        <div style={{ padding: '6px 10px', backgroundColor: '#1F2433', borderRadius: '5px', fontSize: '0.74rem', fontWeight: 600, color: '#F8FAFC' }}>
                          {roast.caffeineLevel}
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px', marginTop: '12px', fontSize: '0.82rem' }}>
                        <div style={{ padding: '10px', backgroundColor: '#14171F', borderRadius: '6px', border: '1px solid #242B3B' }}>
                          <strong style={{ display: 'block', color: '#F8FAFC', marginBottom: '3px' }}>Flavor Profile & Aromatics:</strong>
                          <span style={{ color: '#94A3B8', lineHeight: 1.5 }}>{roast.flavorProfile}</span>
                        </div>

                        <div style={{ padding: '10px', backgroundColor: '#14171F', borderRadius: '6px', border: '1px solid #242B3B' }}>
                          <strong style={{ display: 'block', color: '#F8FAFC', marginBottom: '3px' }}>Best Brewing Equipment:</strong>
                          <span style={{ color: '#94A3B8', lineHeight: 1.5 }}>{roast.bestFor}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 3. HOME BREWING RECIPES */}
              {activeCoffeeTab === 'brewing' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {homeBrewingGuide.map((brew, idx) => (
                    <div key={idx} className="rankit-card" style={{ padding: '22px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
                        <div>
                          <span className="badge badge-brand">Difficulty: {brew.difficulty}</span>
                          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#F8FAFC', marginTop: '4px' }}>
                            {brew.method}
                          </h3>
                          <span style={{ fontSize: '0.78rem', color: '#94A3B8' }}>
                            Equipment: {brew.gearNeeded}
                          </span>
                        </div>

                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          <span style={{ padding: '4px 8px', borderRadius: '4px', backgroundColor: '#1F2433', fontSize: '0.74rem', fontWeight: 600, color: '#F8FAFC' }}>
                            Ratio: {brew.coffeeToWater}
                          </span>
                          <span style={{ padding: '4px 8px', borderRadius: '4px', backgroundColor: '#1F2433', fontSize: '0.74rem', fontWeight: 600, color: '#F8FAFC' }}>
                            Water: {brew.waterTemp}
                          </span>
                        </div>
                      </div>

                      <div style={{ marginBottom: '14px' }}>
                        <h4 style={{ fontSize: '0.82rem', fontWeight: 800, color: '#F59E0B', textTransform: 'uppercase', marginBottom: '8px' }}>
                          Step-by-Step Brewing Recipe
                        </h4>
                        <ol style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.82rem', color: '#94A3B8', lineHeight: 1.5 }}>
                          {brew.steps.map((st, sIdx) => (
                            <li key={sIdx}>{st}</li>
                          ))}
                        </ol>
                      </div>

                      <div style={{ padding: '10px 12px', backgroundColor: '#14171F', borderRadius: '6px', border: '1px solid #242B3B', fontSize: '0.78rem', color: '#94A3B8' }}>
                        <strong style={{ color: '#F8FAFC' }}>Expected Tasting Result:</strong> {brew.tastingNotes}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 4. BEAN SPECIES */}
              {activeCoffeeTab === 'beans' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
                  {beanSpecies.map((b, idx) => (
                    <div key={idx} className="rankit-card" style={{ padding: '20px' }}>
                      <span className="badge" style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#F59E0B' }}>
                        {b.share}
                      </span>
                      <h3 style={{ fontSize: '1.18rem', fontWeight: 800, color: '#F8FAFC', marginTop: '6px' }}>
                        {b.species}
                      </h3>
                      <div style={{ fontSize: '0.76rem', color: '#94A3B8', marginTop: '2px', marginBottom: '12px' }}>
                        Elevation: {b.altitudes} • Natural Caffeine: {b.caffeine}
                      </div>
                      <p style={{ fontSize: '0.82rem', color: '#94A3B8', lineHeight: 1.6 }}>
                        {b.characteristics}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
