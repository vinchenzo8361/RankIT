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
  Archive
} from 'lucide-react';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';

export default function Catalog({ products, brands, onAddProduct }) {
  const [activeCatalogCategory, setActiveCatalogCategory] = useState('energy-drinks'); // 'energy-drinks' | 'coffee'
  
  // Brand category tab: 'active' (Active Brands) vs 'discontinued' (Discontinued Brands)
  const [brandCategoryTab, setBrandCategoryTab] = useState('active');

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

  // Separate active vs discontinued brands
  const activeBrands = brands.filter((b) => b.category === 'Active');
  const discontinuedBrands = brands.filter((b) => b.category === 'Discontinued');

  const displayedBrandsPool = brandCategoryTab === 'active' ? activeBrands : discontinuedBrands;

  const filteredBrands = displayedBrandsPool.filter((b) => {
    return b.name.toLowerCase().includes(brandSearchQuery.toLowerCase()) ||
           (b.origin && b.origin.toLowerCase().includes(brandSearchQuery.toLowerCase()));
  });

  // Products belonging to the selected brand (or all if filtered)
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
        <div style={{ display: 'flex', gap: '8px', background: '#E2E8F0', padding: '4px', borderRadius: '10px' }}>
          <button
            onClick={() => { setActiveCatalogCategory('energy-drinks'); }}
            style={{
              padding: '8px 20px',
              borderRadius: '8px',
              fontSize: '0.875rem',
              fontWeight: 700,
              backgroundColor: activeCatalogCategory === 'energy-drinks' ? '#FFFFFF' : 'transparent',
              color: activeCatalogCategory === 'energy-drinks' ? '#4F46E5' : '#64748B',
              boxShadow: activeCatalogCategory === 'energy-drinks' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            ⚡ Energy Drinks Catalog ({brands.length} Brands)
          </button>
          <button
            onClick={() => setActiveCatalogCategory('coffee')}
            style={{
              padding: '8px 20px',
              borderRadius: '8px',
              fontSize: '0.875rem',
              fontWeight: 700,
              backgroundColor: activeCatalogCategory === 'coffee' ? '#FFFFFF' : 'transparent',
              color: activeCatalogCategory === 'coffee' ? '#4F46E5' : '#64748B',
              boxShadow: activeCatalogCategory === 'coffee' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            ☕ Coffee (Reserved for Future)
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
            <Plus size={18} />
            <span>Add New Drink</span>
          </button>
        )}
      </div>

      {activeCatalogCategory === 'coffee' ? (
        <div className="rankit-card" style={{ padding: '48px', textAlign: 'center', margin: '40px auto', maxWidth: '600px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>☕</div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A' }}>Coffee Database Reserved</h2>
          <p style={{ color: '#64748B', marginTop: '8px', lineHeight: 1.6 }}>
            As defined in the specification, Version 1 focuses exclusively on functional energy drinks. Coffee will be introduced in future expansions!
          </p>
          <button onClick={() => setActiveCatalogCategory('energy-drinks')} className="btn-primary" style={{ marginTop: '20px' }}>
            Return to Energy Drinks
          </button>
        </div>
      ) : !selectedBrand ? (
        /* =========================================================
           BRAND SELECTION VIEW:
           Two Categories: 1. Active Brands vs 2. Discontinued Brands
           ========================================================= */
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A' }}>
                Energy Drink Brands ({brands.length} Total)
              </h2>
              <p style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '4px' }}>
                Browse by brand category. Click any brand button to see all its individual drinks and variants.
              </p>
            </div>

            {/* TWO CATEGORIES TABS: Active Brands vs Discontinued Brands */}
            <div style={{ display: 'flex', gap: '6px', backgroundColor: '#F1F5F9', padding: '4px', borderRadius: '10px', border: '1px solid #CBD5E1' }}>
              <button
                onClick={() => {
                  setBrandCategoryTab('active');
                  setBrandSearchQuery('');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 18px',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  backgroundColor: brandCategoryTab === 'active' ? '#16A34A' : 'transparent',
                  color: brandCategoryTab === 'active' ? '#FFFFFF' : '#475569',
                  boxShadow: brandCategoryTab === 'active' ? '0 1px 3px rgba(22, 163, 74, 0.3)' : 'none'
                }}
              >
                <CheckCircle2 size={15} />
                <span>Active Brands ({activeBrands.length})</span>
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
                  padding: '8px 18px',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  backgroundColor: brandCategoryTab === 'discontinued' ? '#EF4444' : 'transparent',
                  color: brandCategoryTab === 'discontinued' ? '#FFFFFF' : '#475569',
                  boxShadow: brandCategoryTab === 'discontinued' ? '0 1px 3px rgba(239, 68, 68, 0.3)' : 'none'
                }}
              >
                <Archive size={15} />
                <span>Discontinued Brands ({discontinuedBrands.length})</span>
              </button>
            </div>
          </div>

          {/* Brand Search Bar */}
          <div style={{ marginBottom: '20px', maxWidth: '440px' }}>
            <SearchBar
              value={brandSearchQuery}
              onChange={setBrandSearchQuery}
              placeholder={`Search in ${brandCategoryTab === 'active' ? 'Active' : 'Discontinued'} Brands...`}
            />
          </div>

          {/* Brand Buttons Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
            gap: '14px'
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
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    textAlign: 'left',
                    gap: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    border: '1px solid #E2E8F0',
                    backgroundColor: '#FFFFFF'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = isDisc ? '#EF4444' : '#4F46E5';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 12px -2px rgba(0, 0, 0, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#E2E8F0';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.05)';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.5rem' }}>{b.logo || '⚡'}</span>
                    <span style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      padding: '2px 7px',
                      borderRadius: '9999px',
                      backgroundColor: isDisc ? '#FEE2E2' : count > 0 ? '#EEF2FF' : '#F1F5F9',
                      color: isDisc ? '#DC2626' : count > 0 ? '#4F46E5' : '#94A3B8'
                    }}>
                      {isDisc ? 'Discontinued' : `${count} ${count === 1 ? 'drink' : 'drinks'}`}
                    </span>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '1.02rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.2 }}>
                      {b.name}
                    </h3>
                    <p style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '2px' }}>
                      {b.origin || 'International'}
                    </p>
                  </div>

                  <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 700, color: isDisc ? '#EF4444' : '#4F46E5' }}>
                    <span>View Drinks</span>
                    <ChevronRight size={14} />
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
          {/* Back button and brand header banner */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
            <button
              onClick={() => {
                setSelectedBrand(null);
                setSearchQuery('');
              }}
              className="btn-secondary"
              style={{ padding: '8px 14px', fontSize: '0.85rem' }}
            >
              <ArrowLeft size={16} />
              <span>All Brands</span>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '2rem' }}>{selectedBrand.logo || '⚡'}</span>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.1 }}>
                    {selectedBrand.name} Drinks
                  </h2>
                  <span className={selectedBrand.category === 'Discontinued' ? 'badge badge-discontinued' : 'badge badge-active'}>
                    {selectedBrand.category === 'Discontinued' ? 'Discontinued Brand' : 'Active Brand'}
                  </span>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '2px' }}>
                  Market: {selectedBrand.origin} • {displayProducts.length} drink(s) in catalog
                </p>
              </div>
            </div>
          </div>

          {/* Controls: Search in this brand, Discontinued filter, Sort order, View mode */}
          <div className="rankit-card" style={{ padding: '14px 18px', marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', justifyContent: 'space-between' }}>
            <SearchBar 
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder={`Search ${selectedBrand.name} drinks & flavours...`}
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  backgroundColor: '#FFFFFF',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: '#0F172A',
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
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  backgroundColor: '#FFFFFF',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: '#0F172A',
                  cursor: 'pointer'
                }}
              >
                <option value="az">A to Z</option>
                <option value="za">Z to A</option>
                <option value="caffeine-desc">Caffeine: High to Low</option>
                <option value="caffeine-asc">Caffeine: Low to High</option>
              </select>

              <div style={{ display: 'flex', border: '1px solid #CBD5E1', borderRadius: '8px', overflow: 'hidden' }}>
                <button
                  onClick={() => setViewMode('grid')}
                  style={{
                    padding: '7px 9px',
                    backgroundColor: viewMode === 'grid' ? '#EEF2FF' : '#FFFFFF',
                    color: viewMode === 'grid' ? '#4F46E5' : '#64748B'
                  }}
                  title="Grid View"
                >
                  <Grid size={17} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  style={{
                    padding: '7px 9px',
                    backgroundColor: viewMode === 'list' ? '#EEF2FF' : '#FFFFFF',
                    color: viewMode === 'list' ? '#4F46E5' : '#64748B'
                  }}
                  title="List View"
                >
                  <List size={17} />
                </button>
              </div>
            </div>
          </div>

          {/* Product cards or table */}
          {displayProducts.length === 0 ? (
            <div className="rankit-card" style={{ padding: '40px', textAlign: 'center', color: '#64748B' }}>
              <AlertCircle size={32} color="#94A3B8" style={{ margin: '0 auto 12px auto' }} />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A' }}>No drinks listed yet for {selectedBrand.name}</h3>
              <p style={{ marginTop: '4px', fontSize: '0.85rem' }}>
                Click "+ Add New Drink" above to add the first flavour to this brand!
              </p>
            </div>
          ) : viewMode === 'grid' ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '20px'
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
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontWeight: 700 }}>
                    <th style={{ padding: '14px 20px' }}>Product</th>
                    <th style={{ padding: '14px 20px' }}>Flavour / Note</th>
                    <th style={{ padding: '14px 20px' }}>Caffeine</th>
                    <th style={{ padding: '14px 20px' }}>Serving Size</th>
                    <th style={{ padding: '14px 20px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {displayProducts.map((p) => (
                    <tr 
                      key={p.id}
                      onClick={() => setSelectedProductDetail(p)}
                      style={{ borderBottom: '1px solid #F1F5F9', cursor: 'pointer', transition: 'background 0.15s ease' }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F8FAFC'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                    >
                      <td style={{ padding: '14px 20px', fontWeight: 700, color: '#0F172A' }}>
                        {p.name}
                      </td>
                      <td style={{ padding: '14px 20px', color: '#64748B' }}>
                        {p.flavor || '—'}
                      </td>
                      <td style={{ padding: '14px 20px', fontWeight: 700, color: '#F59E0B' }}>
                        {p.caffeine} mg
                      </td>
                      <td style={{ padding: '14px 20px', color: '#64748B' }}>
                        {p.servingSize} ml
                      </td>
                      <td style={{ padding: '14px 20px' }}>
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
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(3px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
          padding: '20px'
        }}>
          <div className="rankit-card" style={{ width: '100%', maxWidth: '520px', maxHeight: '90vh', overflowY: 'auto', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#4F46E5', textTransform: 'uppercase' }}>
                  {selectedProductDetail.brand}
                </span>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', marginTop: '2px' }}>
                  {selectedProductDetail.name}
                </h2>
              </div>
              <button 
                onClick={() => setSelectedProductDetail(null)}
                style={{ padding: '6px', borderRadius: '6px', color: '#64748B', backgroundColor: '#F1F5F9' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{
              width: '100%',
              height: '220px',
              backgroundColor: '#F1F5F9',
              borderRadius: '10px',
              overflow: 'hidden',
              marginBottom: '16px',
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

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '16px' }}>
              <div style={{ padding: '10px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600 }}>Caffeine</span>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#F59E0B' }}>
                  {selectedProductDetail.caffeine} mg
                </div>
              </div>
              <div style={{ padding: '10px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600 }}>Standard Can Size</span>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#3B82F6' }}>
                  {selectedProductDetail.servingSize} ml
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0F172A', marginBottom: '4px' }}>Description</h4>
              <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>
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
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(3px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
          padding: '20px'
        }}>
          <form onSubmit={handleCreateProductSubmit} className="rankit-card" style={{ width: '100%', maxWidth: '500px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A' }}>Add Drink to Catalog</h2>
              <button type="button" onClick={() => setIsAddModalOpen(false)} style={{ color: '#64748B' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '4px' }}>
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Monster Ultra Gold"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.875rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '4px' }}>
                    Brand *
                  </label>
                  <select
                    value={newProduct.brand}
                    onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.875rem', backgroundColor: '#FFFFFF' }}
                  >
                    {brands.map((b) => (
                      <option key={b.id} value={b.name}>{b.name} ({b.category})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '4px' }}>
                    Flavour Note
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Golden Pineapple"
                    value={newProduct.flavor}
                    onChange={(e) => setNewProduct({ ...newProduct, flavor: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.875rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '4px' }}>
                    Caffeine (mg) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="600"
                    value={newProduct.caffeine}
                    onChange={(e) => setNewProduct({ ...newProduct, caffeine: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.875rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '4px' }}>
                    Serving Size (ml) *
                  </label>
                  <input
                    type="number"
                    min="50"
                    max="1000"
                    value={newProduct.servingSize}
                    onChange={(e) => setNewProduct({ ...newProduct, servingSize: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.875rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', cursor: 'pointer', fontWeight: 600 }}>
                  <input
                    type="checkbox"
                    checked={newProduct.sugarFree}
                    onChange={(e) => setNewProduct({ ...newProduct, sugarFree: e.target.checked })}
                  />
                  <span>Sugar Free</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', cursor: 'pointer', fontWeight: 600 }}>
                  <input
                    type="checkbox"
                    checked={newProduct.isDiscontinued}
                    onChange={(e) => setNewProduct({ ...newProduct, isDiscontinued: e.target.checked })}
                  />
                  <span>Discontinued Formulation</span>
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '6px' }}>
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
