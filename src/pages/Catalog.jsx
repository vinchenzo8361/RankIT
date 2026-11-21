import React, { useState } from 'react';
import { 
  Layers, 
  Filter, 
  Plus, 
  Grid, 
  List, 
  X, 
  AlertCircle, 
  Check, 
  Droplets, 
  Zap, 
  Building2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';

export default function Catalog({ products, brands, onAddProduct, onSelectProductForDetail }) {
  const [activeCatalogCategory, setActiveCatalogCategory] = useState('energy-drinks'); // 'energy-drinks' | 'coffee'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrandFilter, setSelectedBrandFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'active' | 'discontinued'
  const [sortOrder, setSortOrder] = useState('az'); // 'az' | 'za' | 'caffeine-desc' | 'caffeine-asc'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedProductDetail, setSelectedProductDetail] = useState(null);

  // New product form state
  const [newProduct, setNewProduct] = useState({
    name: '',
    brand: brands[0]?.name || 'Red Bull',
    flavor: '',
    caffeine: 160,
    servingSize: 500,
    isDiscontinued: false,
    sugarFree: false,
    description: '',
    image: ''
  });

  // Filter & Sort Logic
  const filteredProducts = products.filter((p) => {
    // Search query matches name, brand, flavor, or description
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.flavor && p.flavor.toLowerCase().includes(searchQuery.toLowerCase()));

    // Brand filter
    const matchesBrand = selectedBrandFilter === 'all' || p.brand.toLowerCase() === selectedBrandFilter.toLowerCase() || p.brandId === selectedBrandFilter;

    // Status filter
    const matchesStatus = 
      statusFilter === 'all' ? true :
      statusFilter === 'active' ? !p.isDiscontinued :
      p.isDiscontinued;

    return matchesSearch && matchesBrand && matchesStatus;
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
      brand: brands[0]?.name || 'Red Bull',
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
      {/* 4.1 Catalog Category Selector */}
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
            onClick={() => setActiveCatalogCategory('energy-drinks')}
            style={{
              padding: '8px 20px',
              borderRadius: '8px',
              fontSize: '0.875rem',
              fontWeight: 700,
              backgroundColor: activeCatalogCategory === 'energy-drinks' ? '#FFFFFF' : 'transparent',
              color: activeCatalogCategory === 'energy-drinks' ? '#4F46E5' : '#64748B',
              boxShadow: activeCatalogCategory === 'energy-drinks' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            ⚡ Energy Drinks ({products.length})
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
              boxShadow: activeCatalogCategory === 'coffee' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            ☕ Coffee (Reserved for Future)
          </button>
        </div>

        {activeCatalogCategory === 'energy-drinks' && (
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="btn-primary"
          >
            <Plus size={18} />
            <span>Add New Product</span>
          </button>
        )}
      </div>

      {activeCatalogCategory === 'coffee' ? (
        <div className="rankit-card" style={{ padding: '48px', textAlign: 'center', margin: '40px auto', maxWidth: '600px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>☕</div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A' }}>Coffee Database Reserved</h2>
          <p style={{ color: '#64748B', marginTop: '8px', lineHeight: 1.6 }}>
            As defined in the Version 1 Specification, the initial release focuses exclusively on functional energy drinks. 
            Coffee beans, cold brews, and espresso categories will be introduced in future expansions!
          </p>
          <button 
            onClick={() => setActiveCatalogCategory('energy-drinks')}
            className="btn-primary" 
            style={{ marginTop: '20px' }}
          >
            Return to Energy Drinks
          </button>
        </div>
      ) : (
        <>
          {/* Controls Bar: Search, Brand Filter, Status Filter, Sorting, View Mode */}
          <div className="rankit-card" style={{ padding: '16px 20px', marginBottom: '24px', display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
            <SearchBar 
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search flavours, brands, caffeine..."
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              {/* Brand Filter */}
              <select
                value={selectedBrandFilter}
                onChange={(e) => setSelectedBrandFilter(e.target.value)}
                style={{
                  padding: '9px 14px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  backgroundColor: '#FFFFFF',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: '#0F172A',
                  cursor: 'pointer'
                }}
              >
                <option value="all">All Brands ({brands.length})</option>
                {brands.map((b) => (
                  <option key={b.id} value={b.name}>{b.name}</option>
                ))}
              </select>

              {/* Active / Discontinued Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  padding: '9px 14px',
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
                <option value="active">Active Available Only</option>
                <option value="discontinued">Discontinued Archives</option>
              </select>

              {/* Sorting */}
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                style={{
                  padding: '9px 14px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  backgroundColor: '#FFFFFF',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: '#0F172A',
                  cursor: 'pointer'
                }}
              >
                <option value="az">Name: A to Z</option>
                <option value="za">Name: Z to A</option>
                <option value="caffeine-desc">Caffeine: High to Low</option>
                <option value="caffeine-asc">Caffeine: Low to High</option>
              </select>

              {/* Grid / List switch */}
              <div style={{ display: 'flex', border: '1px solid #CBD5E1', borderRadius: '8px', overflow: 'hidden' }}>
                <button
                  onClick={() => setViewMode('grid')}
                  style={{
                    padding: '8px 10px',
                    backgroundColor: viewMode === 'grid' ? '#EEF2FF' : '#FFFFFF',
                    color: viewMode === 'grid' ? '#4F46E5' : '#64748B'
                  }}
                  title="Grid View"
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  style={{
                    padding: '8px 10px',
                    backgroundColor: viewMode === 'list' ? '#EEF2FF' : '#FFFFFF',
                    color: viewMode === 'list' ? '#4F46E5' : '#64748B'
                  }}
                  title="List View"
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Catalog Results Summary */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 600 }}>
              Showing {filteredProducts.length} of {products.length} products
            </span>
          </div>

          {/* Product Layout (Grid vs List) */}
          {filteredProducts.length === 0 ? (
            <div className="rankit-card" style={{ padding: '40px', textAlign: 'center', color: '#64748B' }}>
              <AlertCircle size={32} color="#94A3B8" style={{ margin: '0 auto 12px auto' }} />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A' }}>No matching drinks found</h3>
              <p style={{ marginTop: '4px' }}>Try broadening your search term or clearing active filters.</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '20px'
            }}>
              {filteredProducts.map((prod) => (
                <ProductCard 
                  key={prod.id} 
                  product={prod} 
                  onClick={() => setSelectedProductDetail(prod)}
                />
              ))}
            </div>
          ) : (
            /* List View */
            <div className="rankit-card" style={{ overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontWeight: 700 }}>
                    <th style={{ padding: '14px 20px' }}>Product</th>
                    <th style={{ padding: '14px 20px' }}>Brand</th>
                    <th style={{ padding: '14px 20px' }}>Flavour / Note</th>
                    <th style={{ padding: '14px 20px' }}>Caffeine</th>
                    <th style={{ padding: '14px 20px' }}>Serving Size</th>
                    <th style={{ padding: '14px 20px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((p) => (
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
                      <td style={{ padding: '14px 20px', color: '#4F46E5', fontWeight: 600 }}>
                        {p.brand}
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
        </>
      )}

      {/* Product Detail Modal / Panel */}
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
          <div className="rankit-card" style={{ width: '100%', maxWidth: '560px', maxHeight: '90vh', overflowY: 'auto', padding: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#4F46E5', textTransform: 'uppercase' }}>
                  {selectedProductDetail.brand}
                </span>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', marginTop: '2px' }}>
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
              height: '240px',
              backgroundColor: '#F1F5F9',
              borderRadius: '12px',
              overflow: 'hidden',
              marginBottom: '20px',
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

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '20px' }}>
              <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Caffeine Content</span>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#F59E0B', marginTop: '2px' }}>
                  {selectedProductDetail.caffeine} mg
                </div>
              </div>
              <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Standard Can Volume</span>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#3B82F6', marginTop: '2px' }}>
                  {selectedProductDetail.servingSize} ml
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A', marginBottom: '6px' }}>Flavour Profile & Description</h4>
              <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.6 }}>
                {selectedProductDetail.description || 'No description provided.'}
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button 
                onClick={() => setSelectedProductDetail(null)}
                className="btn-primary"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4.5 Add Product Manually Modal */}
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
          <form onSubmit={handleCreateProductSubmit} className="rankit-card" style={{ width: '100%', maxWidth: '520px', padding: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>Add Drink to Catalog</h2>
              <button type="button" onClick={() => setIsAddModalOpen(false)} style={{ color: '#64748B' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '6px' }}>
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Monster Ultra Gold"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.875rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '6px' }}>
                    Brand *
                  </label>
                  <select
                    value={newProduct.brand}
                    onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.875rem', backgroundColor: '#FFFFFF' }}
                  >
                    {brands.map((b) => (
                      <option key={b.id} value={b.name}>{b.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '6px' }}>
                    Flavour Note
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Golden Pineapple"
                    value={newProduct.flavor}
                    onChange={(e) => setNewProduct({ ...newProduct, flavor: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.875rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '6px' }}>
                    Caffeine (mg) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="600"
                    value={newProduct.caffeine}
                    onChange={(e) => setNewProduct({ ...newProduct, caffeine: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.875rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '6px' }}>
                    Serving Size (ml) *
                  </label>
                  <input
                    type="number"
                    min="50"
                    max="1000"
                    value={newProduct.servingSize}
                    onChange={(e) => setNewProduct({ ...newProduct, servingSize: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.875rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '20px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 600 }}>
                  <input
                    type="checkbox"
                    checked={newProduct.sugarFree}
                    onChange={(e) => setNewProduct({ ...newProduct, sugarFree: e.target.checked })}
                  />
                  <span>Sugar Free / Zero Sugar</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 600 }}>
                  <input
                    type="checkbox"
                    checked={newProduct.isDiscontinued}
                    onChange={(e) => setNewProduct({ ...newProduct, isDiscontinued: e.target.checked })}
                  />
                  <span>Discontinued Formulation</span>
                </label>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '6px' }}>
                  Description / Tasting Notes
                </label>
                <textarea
                  rows="3"
                  placeholder="Personal tasting observations, ingredients..."
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.875rem' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Product to Catalog
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
