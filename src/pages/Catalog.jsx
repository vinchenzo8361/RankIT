import React, { useState } from 'react';
import { 
  Layers, 
  Plus, 
  Grid, 
  List, 
  X, 
  AlertCircle, 
  ChevronRight, 
  ArrowLeft, 
  Sparkles, 
  Zap, 
  Droplets, 
  Search, 
  CheckCircle2, 
  Archive,
  Crown
} from 'lucide-react';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';

export default function Catalog({ products, brands, onAddProduct }) {
  const [activeCatalogCategory, setActiveCatalogCategory] = useState('energy-drinks'); // 'energy-drinks' | 'coffee'
  
  // Brand category tab: 'top25' (Top 25 Brands) | 'active' (Active Brands) | 'discontinued' (Discontinued Brands)
  const [brandCategoryTab, setBrandCategoryTab] = useState('top25');

  // Selected Brand View: null = show all Brand Buttons; brand object = drill down into specific brand
  const [selectedBrand, setSelectedBrand] = useState(null);

  const [brandSearchQuery, setBrandSearchQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'active' | 'discontinued'
  const [sortOrder, setSortOrder] = useState('az'); // 'az' | 'za' | 'caffeine-desc' | 'caffeine-asc'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedProductDetail, setSelectedProductDetail] = useState(null);

  // New product form state
  const [newProduct, setNewProduct] = useState({
    name: '',
    brand: selectedBrand?.name || brands[0]?.name || 'Red Bull',
    flavor: '',
    caffeine: 160,
    servingSize: 500,
    isDiscontinued: false,
    sugarFree: false,
    description: '',
    image: ''
  });

  // Calculate product counts per brand
  const brandProductCounts = {};
  products.forEach((p) => {
    const bName = p.brand;
    brandProductCounts[bName] = (brandProductCounts[bName] || 0) + 1;
  });

  // Separate active vs discontinued vs top 25 brands
  const top25Brands = brands.filter((b) => b.isTop25).sort((a, b) => (a.top25Rank || 99) - (b.top25Rank || 99));
  const activeBrands = brands.filter((b) => b.category === 'Active');
  const discontinuedBrands = brands.filter((b) => b.category === 'Discontinued');

  const displayedBrandsPool = 
    brandCategoryTab === 'top25' ? top25Brands :
    brandCategoryTab === 'active' ? activeBrands : discontinuedBrands;

  const filteredBrands = displayedBrandsPool.filter((b) => {
    return b.name.toLowerCase().includes(brandSearchQuery.toLowerCase()) ||
           (b.origin && b.origin.toLowerCase().includes(brandSearchQuery.toLowerCase()));
  });

  // Products belonging to the selected brand
  const currentBrandProducts = selectedBrand 
    ? products.filter((p) => p.brand.toLowerCase() === selectedBrand.name.toLowerCase() || p.brandId === selectedBrand.id)
    : products;

  // Filtered & Sorted products within active view
  const displayProducts = currentBrandProducts.filter((p) => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.flavor && p.flavor.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = 
      statusFilter === 'all' ? true :
      statusFilter === 'active' ? !p.isDiscontinued :
      p.isDiscontinued;

    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    if (sortOrder === 'az') return a.name.localeCompare(b.name);
    if (sortOrder === 'za') return b.name.localeCompare(a.name);
    if (sortOrder === 'caffeine-desc') return (b.caffeine || 0) - (a.caffeine || 0);
    if (sortOrder === 'caffeine-asc') return (a.caffeine || 0) - (b.caffeine || 0);
    return 0;
  });

  const handleCreateProductSubmit = (e) => {
    e.preventDefault();
    if (!newProduct.name.trim()) return;

    const brandObj = brands.find((b) => b.name === newProduct.brand) || brands[0];
    const created = {
      id: `custom-prod-${Date.now()}`,
      name: newProduct.name.trim(),
      brand: brandObj.name,
      brandId: brandObj.id,
      flavor: newProduct.flavor.trim() || 'Custom Flavour',
      caffeine: Number(newProduct.caffeine) || 160,
      servingSize: Number(newProduct.servingSize) || 500,
      isDiscontinued: Boolean(newProduct.isDiscontinued),
      sugarFree: Boolean(newProduct.sugarFree),
      description: newProduct.description.trim() || 'User-added catalog product.',
      image: newProduct.image.trim() || 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=400&q=80',
      releaseYear: new Date().getFullYear()
    };

    onAddProduct(created);
    setIsAddModalOpen(false);
    setNewProduct({
      name: '',
      brand: selectedBrand?.name || brands[0]?.name || 'Red Bull',
      flavor: '',
      caffeine: 160,
      servingSize: 500,
      isDiscontinued: false,
      sugarFree: false,
      description: '',
      image: ''
    });
  };

  return (
    <div style={{ padding: '28px', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
      {/* 4.1 Top Level Category Switcher */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', gap: '6px', background: '#1F2433', padding: '3px', borderRadius: '8px' }}>
          <button
            onClick={() => { setActiveCatalogCategory('energy-drinks'); }}
            style={{
              padding: '7px 16px',
              borderRadius: '6px',
              fontSize: '0.85rem',
              fontWeight: 700,
              backgroundColor: activeCatalogCategory === 'energy-drinks' ? '#14171F' : 'transparent',
              color: activeCatalogCategory === 'energy-drinks' ? '#F8FAFC' : '#94A3B8',
              boxShadow: activeCatalogCategory === 'energy-drinks' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none'
            }}
          >
            ⚡ Energy Drinks Catalog ({brands.length})
          </button>
          <button
            onClick={() => setActiveCatalogCategory('coffee')}
            style={{
              padding: '7px 16px',
              borderRadius: '6px',
              fontSize: '0.85rem',
              fontWeight: 700,
              backgroundColor: activeCatalogCategory === 'coffee' ? '#14171F' : 'transparent',
              color: activeCatalogCategory === 'coffee' ? '#F8FAFC' : '#94A3B8',
              boxShadow: activeCatalogCategory === 'coffee' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none'
            }}
          >
            ☕ Coffee (Reserved)
          </button>
        </div>

        {activeCatalogCategory === 'energy-drinks' && (
          <button
            onClick={() => {
              setNewProduct(prev => ({ ...prev, brand: selectedBrand?.name || brands[0]?.name || 'Red Bull' }));
              setIsAddModalOpen(true);
            }}
            className="btn-primary"
          >
            <Plus size={16} />
            <span>Add New Drink</span>
          </button>
        )}
      </div>

      {activeCatalogCategory === 'coffee' ? (
        <div className="rankit-card" style={{ padding: '48px', textAlign: 'center', margin: '40px auto', maxWidth: '560px' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '14px' }}>☕</div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#F8FAFC' }}>Coffee Database Reserved</h2>
          <p style={{ color: '#94A3B8', marginTop: '6px', lineHeight: 1.5, fontSize: '0.88rem' }}>
            As defined in the specification, Version 1 focuses exclusively on functional energy drinks. Coffee will be introduced in future expansions!
          </p>
          <button onClick={() => setActiveCatalogCategory('energy-drinks')} className="btn-primary" style={{ marginTop: '18px' }}>
            Return to Energy Drinks
          </button>
        </div>
      ) : !selectedBrand ? (
        /* =========================================================
           BRAND SELECTION VIEW:
           Three Categories: 1. Top 25 Brands | 2. Active Brands | 3. Discontinued Brands
           ========================================================= */
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '18px' }}>
            <div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#F8FAFC' }}>
                Energy Drink Brands ({brands.length} Total)
              </h2>
              <p style={{ fontSize: '0.82rem', color: '#94A3B8', marginTop: '2px' }}>
                Explore the global Top 25, active manufacturers, or historical discontinued brands.
              </p>
            </div>

            {/* THREE CATEGORIES TABS: Top 25 vs Active Brands vs Discontinued Brands */}
            <div style={{ display: 'flex', gap: '4px', backgroundColor: '#1F2433', padding: '3px', borderRadius: '8px' }}>
              <button
                onClick={() => {
                  setBrandCategoryTab('top25');
                  setBrandSearchQuery('');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 15px',
                  borderRadius: '6px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  backgroundColor: brandCategoryTab === 'top25' ? '#F8FAFC' : 'transparent',
                  color: brandCategoryTab === 'top25' ? '#14171F' : '#94A3B8',
                  boxShadow: brandCategoryTab === 'top25' ? '0 1px 2px rgba(0,0,0,0.08)' : 'none'
                }}
              >
                <Crown size={14} color={brandCategoryTab === 'top25' ? '#F59E0B' : '#94A3B8'} />
                <span>Top 25 Brands ({top25Brands.length})</span>
              </button>

              <button
                onClick={() => {
                  setBrandCategoryTab('active');
                  setBrandSearchQuery('');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 15px',
                  borderRadius: '6px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  backgroundColor: brandCategoryTab === 'active' ? '#F8FAFC' : 'transparent',
                  color: brandCategoryTab === 'active' ? '#14171F' : '#94A3B8',
                  boxShadow: brandCategoryTab === 'active' ? '0 1px 2px rgba(0,0,0,0.08)' : 'none'
                }}
              >
                <CheckCircle2 size={14} color={brandCategoryTab === 'active' ? '#10B981' : '#94A3B8'} />
                <span>Active ({activeBrands.length})</span>
              </button>

              <button
                onClick={() => {
                  setBrandCategoryTab('discontinued');
                  setBrandSearchQuery('');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 15px',
                  borderRadius: '6px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  backgroundColor: brandCategoryTab === 'discontinued' ? '#F8FAFC' : 'transparent',
                  color: brandCategoryTab === 'discontinued' ? '#14171F' : '#94A3B8',
                  boxShadow: brandCategoryTab === 'discontinued' ? '0 1px 2px rgba(0,0,0,0.08)' : 'none'
                }}
              >
                <Archive size={14} color={brandCategoryTab === 'discontinued' ? '#EF4444' : '#94A3B8'} />
                <span>Discontinued ({discontinuedBrands.length})</span>
              </button>
            </div>
          </div>

          {/* Minimal Search Bar */}
          <div style={{ marginBottom: '18px', maxWidth: '380px' }}>
            <SearchBar
              value={brandSearchQuery}
              onChange={setBrandSearchQuery}
              placeholder={`Filter in ${brandCategoryTab === 'top25' ? 'Top 25' : brandCategoryTab === 'active' ? 'Active' : 'Discontinued'}...`}
            />
          </div>

          {/* Clean Brand Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
            gap: '12px'
          }}>
            {filteredBrands.map((b) => {
              const count = brandProductCounts[b.name] || 0;
              const isDisc = b.category === 'Discontinued';

              return (
                <button
                  key={b.id}
                  onClick={() => {
                    setSelectedBrand(b);
                    setSearchQuery('');
                  }}
                  className="rankit-card"
                  style={{
                    padding: '14px 16px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    textAlign: 'left',
                    gap: '6px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    border: '1px solid #242B3B',
                    backgroundColor: '#14171F',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {b.top25Rank && (
                        <span style={{
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          padding: '2px 6px',
                          borderRadius: '4px',
                          backgroundColor: 'rgba(245, 158, 11, 0.15)',
                          color: '#FBBF24'
                        }}>
                          #{b.top25Rank}
                        </span>
                      )}
                      <span style={{ fontSize: '1.25rem' }}>{b.logo || '⚡'}</span>
                    </div>

                    <span style={{
                      fontSize: '0.68rem',
                      fontWeight: 600,
                      padding: '2px 6px',
                      borderRadius: '4px',
                      backgroundColor: isDisc ? 'rgba(239, 68, 68, 0.15)' : count > 0 ? 'rgba(56, 189, 248, 0.15)' : '#1F2433',
                      color: isDisc ? '#F87171' : count > 0 ? '#38BDF8' : '#94A3B8'
                    }}>
                      {isDisc ? 'Discontinued' : `${count} ${count === 1 ? 'drink' : 'drinks'}`}
                    </span>
                  </div>

                  <div style={{ marginTop: '4px' }}>
                    <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#F8FAFC', lineHeight: 1.2 }}>
                      {b.name}
                    </h3>
                    <p style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '2px' }}>
                      {b.origin || 'International'}
                    </p>
                  </div>

                  <div style={{ marginTop: 'auto', paddingTop: '6px', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 600, color: '#3B82F6' }}>
                    <span>View Drinks</span>
                    <ChevronRight size={13} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        /* =========================================================
           BRAND SPECIFIC DRINKS VIEW
           ========================================================= */
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
            <button
              onClick={() => {
                setSelectedBrand(null);
                setSearchQuery('');
              }}
              className="btn-secondary"
              style={{ padding: '7px 12px', fontSize: '0.82rem' }}
            >
              <ArrowLeft size={15} />
              <span>All Brands</span>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '1.8rem' }}>{selectedBrand.logo || '⚡'}</span>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#F8FAFC', lineHeight: 1.1 }}>
                    {selectedBrand.name} Drinks
                  </h2>
                  {selectedBrand.top25Rank && (
                    <span className="badge" style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#FBBF24' }}>
                      Top #{selectedBrand.top25Rank} Brand
                    </span>
                  )}
                  <span className={selectedBrand.category === 'Discontinued' ? 'badge badge-discontinued' : 'badge badge-active'}>
                    {selectedBrand.category}
                  </span>
                </div>
                <p style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '2px' }}>
                  Origin: {selectedBrand.origin} • {displayProducts.length} listed variant(s)
                </p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="rankit-card" style={{ padding: '12px 16px', marginBottom: '18px', display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', justifyContent: 'space-between' }}>
            <SearchBar 
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder={`Search ${selectedBrand.name} drinks...`}
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  padding: '7px 10px',
                  borderRadius: '6px',
                  border: '1px solid #242B3B',
                  backgroundColor: '#14171F',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: '#F8FAFC',
                  cursor: 'pointer'
                }}
              >
                <option value="all">All Editions</option>
                <option value="active">Active Only</option>
                <option value="discontinued">Discontinued Only</option>
              </select>

              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                style={{
                  padding: '7px 10px',
                  borderRadius: '6px',
                  border: '1px solid #242B3B',
                  backgroundColor: '#14171F',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: '#F8FAFC',
                  cursor: 'pointer'
                }}
              >
                <option value="az">A to Z</option>
                <option value="za">Z to A</option>
                <option value="caffeine-desc">Caffeine: High to Low</option>
                <option value="caffeine-asc">Caffeine: Low to High</option>
              </select>

              <div style={{ display: 'flex', border: '1px solid #242B3B', borderRadius: '6px', overflow: 'hidden' }}>
                <button
                  onClick={() => setViewMode('grid')}
                  style={{
                    padding: '6px 8px',
                    backgroundColor: viewMode === 'grid' ? '#1F2433' : '#14171F',
                    color: viewMode === 'grid' ? '#F8FAFC' : '#94A3B8'
                  }}
                  title="Grid View"
                >
                  <Grid size={15} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  style={{
                    padding: '6px 8px',
                    backgroundColor: viewMode === 'list' ? '#1F2433' : '#14171F',
                    color: viewMode === 'list' ? '#F8FAFC' : '#94A3B8'
                  }}
                  title="List View"
                >
                  <List size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* Product cards or table */}
          {displayProducts.length === 0 ? (
            <div className="rankit-card" style={{ padding: '36px', textAlign: 'center', color: '#94A3B8' }}>
              <AlertCircle size={28} color="#A1A1AA" style={{ margin: '0 auto 8px auto' }} />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#F8FAFC' }}>No drinks listed yet for {selectedBrand.name}</h3>
              <p style={{ marginTop: '2px', fontSize: '0.8rem' }}>
                Click "+ Add New Drink" above to add the first flavour to this brand!
              </p>
            </div>
          ) : viewMode === 'grid' ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '16px'
            }}>
              {displayProducts.map((prod) => (
                <ProductCard 
                  key={prod.id} 
                  product={prod} 
                  onClick={() => setSelectedProductDetail(prod)}
                />
              ))}
            </div>
          ) : (
            <div className="rankit-card" style={{ overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#1F2433', borderBottom: '1px solid #242B3B', color: '#94A3B8', fontWeight: 600 }}>
                    <th style={{ padding: '12px 16px' }}>Product</th>
                    <th style={{ padding: '12px 16px' }}>Flavour / Note</th>
                    <th style={{ padding: '12px 16px' }}>Caffeine</th>
                    <th style={{ padding: '12px 16px' }}>Serving Size</th>
                    <th style={{ padding: '12px 16px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {displayProducts.map((p) => (
                    <tr 
                      key={p.id}
                      onClick={() => setSelectedProductDetail(p)}
                      style={{ borderBottom: '1px solid #1F2433', cursor: 'pointer', transition: 'background 0.15s ease' }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#FAFAFA'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                    >
                      <td style={{ padding: '12px 16px', fontWeight: 700, color: '#F8FAFC' }}>
                        {p.name}
                      </td>
                      <td style={{ padding: '12px 16px', color: '#94A3B8' }}>
                        {p.flavor || '—'}
                      </td>
                      <td style={{ padding: '12px 16px', fontWeight: 700, color: '#F59E0B' }}>
                        {p.caffeine} mg
                      </td>
                      <td style={{ padding: '12px 16px', color: '#94A3B8' }}>
                        {p.servingSize} ml
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        {p.isDiscontinued ? (
                          <span className="badge badge-discontinued">Discontinued</span>
                        ) : (
                          <span className="badge badge-active">Active</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProductDetail && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(24, 24, 27, 0.4)',
          backdropFilter: 'blur(2px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
          padding: '20px'
        }}>
          <div className="rankit-card" style={{ width: '100%', maxWidth: '480px', maxHeight: '90vh', overflowY: 'auto', padding: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#3B82F6', textTransform: 'uppercase' }}>
                  {selectedProductDetail.brand}
                </span>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#F8FAFC', marginTop: '2px' }}>
                  {selectedProductDetail.name}
                </h2>
              </div>
              <button 
                onClick={() => setSelectedProductDetail(null)}
                style={{ padding: '5px', borderRadius: '5px', color: '#94A3B8', backgroundColor: '#1F2433' }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{
              width: '100%',
              height: '200px',
              backgroundColor: '#1F2433',
              borderRadius: '8px',
              overflow: 'hidden',
              marginBottom: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img 
                src={selectedProductDetail.image} 
                alt={selectedProductDetail.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginBottom: '14px' }}>
              <div style={{ padding: '9px', backgroundColor: '#FAFAFA', borderRadius: '6px', border: '1px solid #242B3B' }}>
                <span style={{ fontSize: '0.7rem', color: '#94A3B8', fontWeight: 600 }}>Caffeine</span>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#F59E0B' }}>
                  {selectedProductDetail.caffeine} mg
                </div>
              </div>
              <div style={{ padding: '9px', backgroundColor: '#FAFAFA', borderRadius: '6px', border: '1px solid #242B3B' }}>
                <span style={{ fontSize: '0.7rem', color: '#94A3B8', fontWeight: 600 }}>Standard Can Size</span>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#3B82F6' }}>
                  {selectedProductDetail.servingSize} ml
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '18px' }}>
              <h4 style={{ fontSize: '0.8rem', fontWeight: 700, color: '#F8FAFC', marginBottom: '3px' }}>Description</h4>
              <p style={{ fontSize: '0.82rem', color: '#52525B', lineHeight: 1.5 }}>
                {selectedProductDetail.description || 'No description provided.'}
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                onClick={() => setSelectedProductDetail(null)}
                className="btn-primary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Drink Modal */}
      {isAddModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(24, 24, 27, 0.4)',
          backdropFilter: 'blur(2px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
          padding: '20px'
        }}>
          <form onSubmit={handleCreateProductSubmit} className="rankit-card" style={{ width: '100%', maxWidth: '480px', padding: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#F8FAFC' }}>Add Drink to Catalog</h2>
              <button type="button" onClick={() => setIsAddModalOpen(false)} style={{ color: '#94A3B8' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#F8FAFC', display: 'block', marginBottom: '3px' }}>
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Monster Ultra Gold"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  style={{ width: '100%', padding: '8px 10px', border: '1px solid #242B3B', borderRadius: '6px', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#F8FAFC', display: 'block', marginBottom: '3px' }}>
                    Brand *
                  </label>
                  <select
                    value={newProduct.brand}
                    onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                    style={{ width: '100%', padding: '8px 10px', border: '1px solid #242B3B', borderRadius: '6px', fontSize: '0.85rem', backgroundColor: '#14171F' }}
                  >
                    {brands.map((b) => (
                      <option key={b.id} value={b.name}>{b.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#F8FAFC', display: 'block', marginBottom: '3px' }}>
                    Flavour Note
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Golden Pineapple"
                    value={newProduct.flavor}
                    onChange={(e) => setNewProduct({ ...newProduct, flavor: e.target.value })}
                    style={{ width: '100%', padding: '8px 10px', border: '1px solid #242B3B', borderRadius: '6px', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#F8FAFC', display: 'block', marginBottom: '3px' }}>
                    Caffeine (mg) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="600"
                    value={newProduct.caffeine}
                    onChange={(e) => setNewProduct({ ...newProduct, caffeine: e.target.value })}
                    style={{ width: '100%', padding: '8px 10px', border: '1px solid #242B3B', borderRadius: '6px', fontSize: '0.85rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#F8FAFC', display: 'block', marginBottom: '3px' }}>
                    Serving Size (ml) *
                  </label>
                  <input
                    type="number"
                    min="50"
                    max="1000"
                    value={newProduct.servingSize}
                    onChange={(e) => setNewProduct({ ...newProduct, servingSize: e.target.value })}
                    style={{ width: '100%', padding: '8px 10px', border: '1px solid #242B3B', borderRadius: '6px', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 500 }}>
                  <input
                    type="checkbox"
                    checked={newProduct.sugarFree}
                    onChange={(e) => setNewProduct({ ...newProduct, sugarFree: e.target.checked })}
                  />
                  <span>Sugar Free</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 500 }}>
                  <input
                    type="checkbox"
                    checked={newProduct.isDiscontinued}
                    onChange={(e) => setNewProduct({ ...newProduct, isDiscontinued: e.target.checked })}
                  />
                  <span>Discontinued</span>
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '4px' }}>
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save to Catalog
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
