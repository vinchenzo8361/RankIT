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
  CheckCircle2,
  Clock,
  Layers
} from 'lucide-react';
import { libraryData } from '../data/libraryData';
import { coffeeLibraryData } from '../data/coffeeLibraryData';

export default function Library({ onNavigateToCatalogProduct }) {
  const [activeCategory, setActiveCategory] = useState('energy-drinks'); // 'energy-drinks' | 'coffee'
  
  // Energy drinks subsections
  const [activeSubTab, setActiveSubTab] = useState('brands'); // 'brands' | 'products' | 'industry' | 'ingredients' | 'archive'

  // Coffee subsections
  const [activeCoffeeTab, setActiveCoffeeTab] = useState('drinks'); // 'drinks' | 'roasts' | 'brewing' | 'beans'

  const { brandHistories, productHistories, industryHistory, ingredients, discontinuedArchive } = libraryData;
  const { drinkTypes, roastLevels, homeBrewingGuide, beanSpecies } = coffeeLibraryData;

  return (
    <div style={{ padding: '28px', maxWidth: '1300px', margin: '0 auto', width: '100%' }}>
      {/* 6.1 Top Category Switcher */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '22px'
      }}>
        <div style={{ display: 'flex', gap: '6px', backgroundColor: '#F4F4F5', padding: '3px', borderRadius: '8px' }}>
          <button
            onClick={() => setActiveCategory('energy-drinks')}
            style={{
              padding: '7px 16px',
              borderRadius: '6px',
              fontSize: '0.85rem',
              fontWeight: 700,
              backgroundColor: activeCategory === 'energy-drinks' ? '#FFFFFF' : 'transparent',
              color: activeCategory === 'energy-drinks' ? '#18181B' : '#71717A',
              boxShadow: activeCategory === 'energy-drinks' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none'
            }}
          >
            ⚡ Energy Drinks Encyclopedia
          </button>
          <button
            onClick={() => setActiveCategory('coffee')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 16px',
              borderRadius: '6px',
              fontSize: '0.85rem',
              fontWeight: 700,
              backgroundColor: activeCategory === 'coffee' ? '#FFFFFF' : 'transparent',
              color: activeCategory === 'coffee' ? '#18181B' : '#71717A',
              boxShadow: activeCategory === 'coffee' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none'
            }}
          >
            <Coffee size={15} color="#B45309" />
            <span>☕ Coffee Library & Brewing</span>
          </button>
        </div>
      </div>

      {/* =========================================================
          COFFEE ENCYCLOPEDIA & HOME BREWING MASTER SECTION
         ========================================================= */}
      {activeCategory === 'coffee' ? (
        <div>
          {/* Header intro */}
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#18181B' }}>
              Coffee Encyclopedia & Brewing Guide
            </h2>
            <p style={{ fontSize: '0.82rem', color: '#71717A', marginTop: '2px' }}>
              Learn drink anatomy (Latte, Cappuccino, Americano), roast intensities, bean biology, and step-by-step home brewing recipes.
            </p>
          </div>

          {/* Coffee Subsections Tabs */}
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
                    backgroundColor: isActive ? '#18181B' : '#FFFFFF',
                    color: isActive ? '#FFFFFF' : '#71717A',
                    border: '1px solid #E4E4E7',
                    boxShadow: isActive ? '0 1px 2px rgba(0,0,0,0.08)' : 'none'
                  }}
                >
                  <Icon size={14} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* 1. DRINK TYPES (Latte, Cappuccino, Americano, Flat White, etc.) */}
          {activeCoffeeTab === 'drinks' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
              {drinkTypes.map((item) => (
                <div key={item.id} className="rankit-card" style={{ padding: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#B45309', textTransform: 'uppercase' }}>
                        {item.italianMeaning || item.origin || 'Classic Drink'}
                      </span>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#F59E0B' }}>
                        {item.caffeine}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#18181B', marginTop: '4px' }}>
                      {item.name}
                    </h3>

                    <div style={{
                      padding: '5px 8px',
                      backgroundColor: '#FAFAFA',
                      borderRadius: '5px',
                      border: '1px solid #E4E4E7',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: '#18181B',
                      marginTop: '8px',
                      marginBottom: '10px'
                    }}>
                      Ratio: {item.ratio}
                    </div>

                    <p style={{ fontSize: '0.82rem', color: '#52525B', lineHeight: 1.5 }}>
                      {item.description}
                    </p>
                  </div>

                  <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid #F4F4F5', fontSize: '0.74rem', color: '#71717A' }}>
                    <strong>Ingredients:</strong> {item.ingredients}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 2. ROAST LEVELS & INTENSITIES */}
          {activeCoffeeTab === 'roasts' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {roastLevels.map((roast, idx) => (
                <div key={idx} className="rankit-card" style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
                    <div>
                      <span className="badge" style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}>
                        {roast.intensity}
                      </span>
                      <h3 style={{ fontSize: '1.18rem', fontWeight: 800, color: '#18181B', marginTop: '4px' }}>
                        {roast.level}
                      </h3>
                      <span style={{ fontSize: '0.76rem', color: '#71717A' }}>
                        Roasting Temperature: {roast.temp} • {roast.internalTemp}
                      </span>
                    </div>

                    <div style={{ padding: '6px 10px', backgroundColor: '#F4F4F5', borderRadius: '5px', fontSize: '0.74rem', fontWeight: 600, color: '#18181B' }}>
                      {roast.caffeineLevel}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px', marginTop: '12px', fontSize: '0.82rem' }}>
                    <div style={{ padding: '10px', backgroundColor: '#FAFAFA', borderRadius: '6px', border: '1px solid #E4E4E7' }}>
                      <strong style={{ display: 'block', color: '#18181B', marginBottom: '3px' }}>Flavor Profile & Aromatics:</strong>
                      <span style={{ color: '#52525B', lineHeight: 1.5 }}>{roast.flavorProfile}</span>
                    </div>

                    <div style={{ padding: '10px', backgroundColor: '#FAFAFA', borderRadius: '6px', border: '1px solid #E4E4E7' }}>
                      <strong style={{ display: 'block', color: '#18181B', marginBottom: '3px' }}>Best Brewing Equipment:</strong>
                      <span style={{ color: '#52525B', lineHeight: 1.5 }}>{roast.bestFor}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 3. HOME BREWING GUIDE (French Press, V60, Aeropress, Moka Pot) */}
          {activeCoffeeTab === 'brewing' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {homeBrewingGuide.map((brew, idx) => (
                <div key={idx} className="rankit-card" style={{ padding: '22px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
                    <div>
                      <span className="badge badge-brand">Difficulty: {brew.difficulty}</span>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#18181B', marginTop: '4px' }}>
                        {brew.method}
                      </h3>
                      <span style={{ fontSize: '0.78rem', color: '#71717A' }}>
                        Equipment: {brew.gearNeeded}
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{ padding: '4px 8px', borderRadius: '4px', backgroundColor: '#F4F4F5', fontSize: '0.74rem', fontWeight: 600 }}>
                        Ratio: {brew.coffeeToWater}
                      </span>
                      <span style={{ padding: '4px 8px', borderRadius: '4px', backgroundColor: '#F4F4F5', fontSize: '0.74rem', fontWeight: 600 }}>
                        Water: {brew.waterTemp}
                      </span>
                    </div>
                  </div>

                  {/* Step by Step instructions */}
                  <div style={{ marginBottom: '14px' }}>
                    <h4 style={{ fontSize: '0.82rem', fontWeight: 800, color: '#18181B', textTransform: 'uppercase', marginBottom: '8px' }}>
                      Step-by-Step Brewing Recipe
                    </h4>
                    <ol style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.82rem', color: '#52525B', lineHeight: 1.5 }}>
                      {brew.steps.map((st, sIdx) => (
                        <li key={sIdx}>{st}</li>
                      ))}
                    </ol>
                  </div>

                  <div style={{ padding: '10px 12px', backgroundColor: '#FAFAFA', borderRadius: '6px', border: '1px solid #E4E4E7', fontSize: '0.78rem', color: '#71717A' }}>
                    <strong>Expected Tasting Result:</strong> {brew.tastingNotes}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 4. BEAN SPECIES (Arabica vs Robusta) */}
          {activeCoffeeTab === 'beans' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
              {beanSpecies.map((b, idx) => (
                <div key={idx} className="rankit-card" style={{ padding: '20px' }}>
                  <span className="badge" style={{ backgroundColor: '#FEF3C7', color: '#B45309' }}>
                    {b.share}
                  </span>
                  <h3 style={{ fontSize: '1.18rem', fontWeight: 800, color: '#18181B', marginTop: '6px' }}>
                    {b.species}
                  </h3>
                  <div style={{ fontSize: '0.76rem', color: '#71717A', marginTop: '2px', marginBottom: '12px' }}>
                    Elevation: {b.altitudes} • Natural Caffeine: {b.caffeine}
                  </div>
                  <p style={{ fontSize: '0.82rem', color: '#52525B', lineHeight: 1.6 }}>
                    {b.characteristics}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* =========================================================
           ENERGY DRINKS ENCYCLOPEDIA (Existing)
           ========================================================= */
        <>
          <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '22px' }}>
            {[
              { id: 'brands', label: 'Brand Histories', icon: Building },
              { id: 'products', label: 'Product Histories', icon: Sparkles },
              { id: 'industry', label: 'Industry Development', icon: History },
              { id: 'ingredients', label: 'Ingredients & Science', icon: FlaskConical },
              { id: 'archive', label: 'Discontinued Archive', icon: Archive }
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
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: '6px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                    backgroundColor: isActive ? '#18181B' : '#FFFFFF',
                    color: isActive ? '#FFFFFF' : '#71717A',
                    border: '1px solid #E4E4E7',
                    boxShadow: isActive ? '0 1px 2px rgba(0,0,0,0.08)' : 'none'
                  }}
                >
                  <Icon size={14} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {activeSubTab === 'brands' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {brandHistories.map((brand) => (
                <div key={brand.id} className="rankit-card" style={{ padding: '24px' }}>
                  <div style={{ marginBottom: '14px' }}>
                    <span className="badge badge-brand">{brand.country} • Founded {brand.founded}</span>
                    <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#18181B', marginTop: '4px' }}>
                      {brand.title}
                    </h2>
                    <div style={{ fontSize: '0.8rem', color: '#71717A', marginTop: '2px' }}>
                      Founders: <strong>{brand.founders}</strong> | Ownership: <strong>{brand.ownership}</strong>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.88rem', color: '#3F3F46', fontStyle: 'italic', marginBottom: '16px', borderLeft: '3px solid #18181B', paddingLeft: '12px' }}>
                    "{brand.summary}"
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '18px' }}>
                    {brand.content.map((sec, i) => (
                      <div key={i}>
                        <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#18181B', marginBottom: '2px' }}>
                          {sec.heading}
                        </h4>
                        <p style={{ fontSize: '0.82rem', color: '#52525B', lineHeight: 1.5 }}>
                          {sec.body}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div style={{ backgroundColor: '#FAFAFA', padding: '14px', borderRadius: '8px', border: '1px solid #E4E4E7' }}>
                    <h4 style={{ fontSize: '0.78rem', fontWeight: 800, color: '#18181B', textTransform: 'uppercase', marginBottom: '8px' }}>
                      Historical Milestones
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '8px' }}>
                      {brand.milestones.map((m, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: '6px', fontSize: '0.78rem' }}>
                          <span style={{ fontWeight: 800, color: '#18181B' }}>{m.year}:</span>
                          <span style={{ color: '#52525B' }}>{m.event}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSubTab === 'products' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
              {productHistories.map((prod) => (
                <div key={prod.id} className="rankit-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span className="badge badge-brand">{prod.brand} • {prod.year}</span>
                    <h3 style={{ fontSize: '1.08rem', fontWeight: 800, color: '#18181B', marginTop: '6px' }}>
                      {prod.name}
                    </h3>
                    <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#F59E0B', marginTop: '2px', marginBottom: '8px' }}>
                      {prod.significance}
                    </div>
                    <p style={{ fontSize: '0.82rem', color: '#52525B', lineHeight: 1.5 }}>
                      {prod.content}
                    </p>
                  </div>
                  <div style={{ marginTop: '16px', paddingTop: '10px', borderTop: '1px solid #F4F4F5' }}>
                    <button
                      onClick={() => onNavigateToCatalogProduct(prod.productId)}
                      className="btn-secondary"
                      style={{ width: '100%', justifyContent: 'center', fontSize: '0.76rem' }}
                    >
                      <span>View in Catalog</span>
                      <ExternalLink size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSubTab === 'industry' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {industryHistory.map((era, idx) => (
                <div key={idx} className="rankit-card" style={{ padding: '18px', display: 'flex', gap: '16px' }}>
                  <div style={{ minWidth: '130px', fontWeight: 800, color: '#18181B', fontSize: '0.88rem' }}>
                    {era.era}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#18181B', marginBottom: '4px' }}>
                      {era.title}
                    </h3>
                    <p style={{ fontSize: '0.82rem', color: '#52525B', lineHeight: 1.5 }}>
                      {era.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSubTab === 'ingredients' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '14px' }}>
              {ingredients.map((ing, idx) => (
                <div key={idx} className="rankit-card" style={{ padding: '18px' }}>
                  <span className="badge badge-brand">{ing.type}</span>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#18181B', marginTop: '6px' }}>
                    {ing.name}
                  </h3>
                  <div style={{ fontSize: '0.76rem', color: '#71717A', marginTop: '2px', marginBottom: '8px' }}>
                    Role: <strong>{ing.role}</strong> | Dose: <strong>{ing.typicalDose}</strong>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#52525B', lineHeight: 1.5 }}>
                    {ing.description}
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeSubTab === 'archive' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {discontinuedArchive.map((item) => (
                <div key={item.id} className="rankit-card" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ maxWidth: '640px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                      <span className="badge badge-discontinued">Discontinued</span>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#71717A' }}>{item.yearsActive}</span>
                    </div>
                    <h3 style={{ fontSize: '1.08rem', fontWeight: 800, color: '#18181B' }}>
                      {item.name} — <span style={{ color: '#71717A' }}>{item.brand}</span>
                    </h3>
                    <p style={{ fontSize: '0.78rem', color: '#52525B', marginTop: '4px' }}>
                      Status: {item.status} | Formulation: {item.caffeine}
                    </p>
                    <p style={{ fontSize: '0.78rem', color: '#71717A', marginTop: '2px', fontStyle: 'italic' }}>
                      {item.notes}
                    </p>
                  </div>
                  <button
                    onClick={() => onNavigateToCatalogProduct(item.name)}
                    className="btn-secondary"
                    style={{ fontSize: '0.76rem' }}
                  >
                    Catalog Entry
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
