import React, { useState } from 'react';
import { 
  Trophy, 
  Layers, 
  Star, 
  Plus, 
  Trash2, 
  MessageSquare,
  ArrowUpDown,
  Search,
  ChevronDown,
  X,
  Sparkles,
  GripVertical
} from 'lucide-react';
import { TIER_CONFIG, TIER_ORDER } from '../utils/caffeine';

export default function Rankings({ 
  products, 
  brands, 
  projects, 
  onSaveProjects, 
  standaloneTiers, 
  onSaveStandaloneTiers, 
  ratings, 
  onSaveRatings 
}) {
  const [subSection, setSubSection] = useState('tier-list'); // 'tier-list' | 'ratings' | 'personal'
  const [tierCategory, setTierCategory] = useState('drinks'); // 'drinks' | 'brands'

  const [ratingsCategory, setRatingsCategory] = useState('drinks');
  const [ratingsSort, setRatingsSort] = useState('desc');
  const [ratingsSearch, setRatingsSearch] = useState('');

  // Selected project for workspace
  const [activeProjectId, setActiveProjectId] = useState(projects[0]?.id || null);
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);

  // New project creation state
  const [newProject, setNewProject] = useState({
    name: '',
    rankingType: 'tier-list',
    category: 'drinks',
    selectedProductIds: []
  });

  const activeProject = projects.find((p) => p.id === activeProjectId);

  // Helper maps
  const productsMap = {};
  products.forEach((p) => { productsMap[p.id] = p; });
  const brandsMap = {};
  brands.forEach((b) => { brandsMap[b.id] = b; });

  const getEntity = (id, category) => {
    if (category === 'brands') {
      const b = brandsMap[id] || brands.find((x) => x.name.toLowerCase() === id.toLowerCase());
      if (b) return { id: b.id, name: b.name, subtitle: b.origin, image: null, badge: b.tagline, isBrand: true };
    }
    const p = productsMap[id];
    if (p) return { id: p.id, name: p.name, subtitle: `${p.brand} • ${p.caffeine}mg`, image: p.image, badge: p.flavor, isBrand: false };
    return { id, name: id, subtitle: '', image: null, badge: '' };
  };

  // --- Handlers ---
  const handleCreateProjectSubmit = (e) => {
    e.preventDefault();
    if (!newProject.name.trim()) return;

    const initialTiers = { S: [], A: [], B: [], C: [], D: [], F: [], IDK: [...newProject.selectedProductIds] };
    const created = {
      id: `proj-${Date.now()}`,
      name: newProject.name.trim(),
      rankingType: newProject.rankingType,
      category: newProject.category,
      selectedProductIds: [...newProject.selectedProductIds],
      tiers: initialTiers,
      ratings: {},
      comments: {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updated = [created, ...projects];
    onSaveProjects(updated);
    setActiveProjectId(created.id);
    setIsCreateProjectModalOpen(false);
    setNewProject({
      name: '',
      rankingType: 'tier-list',
      category: 'drinks',
      selectedProductIds: []
    });
  };

  const handleDeleteProject = (projId) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    const filtered = projects.filter((p) => p.id !== projId);
    onSaveProjects(filtered);
    if (activeProjectId === projId) {
      setActiveProjectId(filtered[0]?.id || null);
    }
  };

  const handleUpdateActiveProject = (updater) => {
    if (!activeProject) return;
    const updated = updater(activeProject);
    updated.updatedAt = new Date().toISOString();
    const newProjects = projects.map((p) => p.id === activeProject.id ? updated : p);
    onSaveProjects(newProjects);
  };

  // Move between tiers
  const handleTierMove = (itemId, fromTier, toTier, isProject = false) => {
    if (isProject) {
      handleUpdateActiveProject((proj) => {
        const tiers = { ...(proj.tiers || { S: [], A: [], B: [], C: [], D: [], F: [], IDK: [] }) };
        tiers[fromTier] = (tiers[fromTier] || []).filter((id) => id !== itemId);
        tiers[toTier] = [...(tiers[toTier] || []), itemId];
        return { ...proj, tiers };
      });
    } else {
      const current = { ...(standaloneTiers[tierCategory] || { S: [], A: [], B: [], C: [], D: [], F: [], IDK: [] }) };
      current[fromTier] = (current[fromTier] || []).filter((id) => id !== itemId);
      current[toTier] = [...(current[toTier] || []), itemId];
      onSaveStandaloneTiers(tierCategory, current);
    }
  };

  // Add an item directly to tier list (default to S or IDK)
  const handleAddItemToTier = (itemId, targetTier = 'IDK', isProject = false) => {
    if (isProject) {
      handleUpdateActiveProject((proj) => {
        const tiers = { ...(proj.tiers || { S: [], A: [], B: [], C: [], D: [], F: [], IDK: [] }) };
        // Remove if existing anywhere
        TIER_ORDER.forEach((t) => {
          tiers[t] = (tiers[t] || []).filter((id) => id !== itemId);
        });
        tiers[targetTier] = [...(tiers[targetTier] || []), itemId];
        const selectedProductIds = Array.from(new Set([...(proj.selectedProductIds || []), itemId]));
        return { ...proj, tiers, selectedProductIds };
      });
    } else {
      const current = { ...(standaloneTiers[tierCategory] || { S: [], A: [], B: [], C: [], D: [], F: [], IDK: [] }) };
      TIER_ORDER.forEach((t) => {
        current[t] = (current[t] || []).filter((id) => id !== itemId);
      });
      current[targetTier] = [...(current[targetTier] || []), itemId];
      onSaveStandaloneTiers(tierCategory, current);
    }
  };

  // Remove an item entirely from tier list
  const handleRemoveItemFromTier = (itemId, fromTier, isProject = false) => {
    if (isProject) {
      handleUpdateActiveProject((proj) => {
        const tiers = { ...(proj.tiers || {}) };
        tiers[fromTier] = (tiers[fromTier] || []).filter((id) => id !== itemId);
        const selectedProductIds = (proj.selectedProductIds || []).filter((id) => id !== itemId);
        return { ...proj, tiers, selectedProductIds };
      });
    } else {
      const current = { ...(standaloneTiers[tierCategory] || {}) };
      current[fromTier] = (current[fromTier] || []).filter((id) => id !== itemId);
      onSaveStandaloneTiers(tierCategory, current);
    }
  };

  // Numerical ratings
  const handleNumericRatingChange = (itemId, val, isProject = false) => {
    const num = Math.min(10, Math.max(0, parseFloat(val) || 0));
    if (isProject) {
      handleUpdateActiveProject((proj) => ({
        ...proj,
        ratings: { ...proj.ratings, [itemId]: num }
      }));
    } else {
      const current = { ...ratings };
      current[itemId] = {
        ...(typeof current[itemId] === 'object' ? current[itemId] : {}),
        rating: num
      };
      onSaveRatings(current);
    }
  };

  const handleCommentChange = (itemId, commentText, isProject = false) => {
    if (isProject) {
      handleUpdateActiveProject((proj) => ({
        ...proj,
        comments: { ...proj.comments, [itemId]: commentText }
      }));
    } else {
      const current = { ...ratings };
      current[itemId] = {
        ...(typeof current[itemId] === 'object' ? current[itemId] : { rating: current[itemId] || 0 }),
        comment: commentText
      };
      onSaveRatings(current);
    }
  };

  return (
    <div style={{ padding: '28px', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
      {/* 3.0 Sub-navigation Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: '#E2E8F0',
        padding: '5px',
        borderRadius: '12px',
        marginBottom: '28px',
        width: 'fit-content'
      }}>
        <button
          onClick={() => setSubSection('tier-list')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            borderRadius: '9px',
            fontSize: '0.875rem',
            fontWeight: 700,
            backgroundColor: subSection === 'tier-list' ? '#FFFFFF' : 'transparent',
            color: subSection === 'tier-list' ? '#4F46E5' : '#64748B',
            boxShadow: subSection === 'tier-list' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
          }}
        >
          <Layers size={17} />
          <span>Tier List</span>
        </button>

        <button
          onClick={() => setSubSection('ratings')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            borderRadius: '9px',
            fontSize: '0.875rem',
            fontWeight: 700,
            backgroundColor: subSection === 'ratings' ? '#FFFFFF' : 'transparent',
            color: subSection === 'ratings' ? '#4F46E5' : '#64748B',
            boxShadow: subSection === 'ratings' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
          }}
        >
          <Star size={17} />
          <span>Ratings Out of 10</span>
        </button>

        <button
          onClick={() => setSubSection('personal')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            borderRadius: '9px',
            fontSize: '0.875rem',
            fontWeight: 700,
            backgroundColor: subSection === 'personal' ? '#FFFFFF' : 'transparent',
            color: subSection === 'personal' ? '#4F46E5' : '#64748B',
            boxShadow: subSection === 'personal' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
          }}
        >
          <Trophy size={17} />
          <span>Personal Projects</span>
        </button>
      </div>

      {/* =========================================================
          TIER LIST (Default Clean State, Add Items button & Native Drag/Drop)
         ========================================================= */}
      {subSection === 'tier-list' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>Tier List Maker</h2>
              <p style={{ fontSize: '0.82rem', color: '#64748B' }}>
                Drag and drop or select items to place them into tiers. Empty by default so you can rank what you want!
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
              {/* Category switch */}
              <div style={{ display: 'flex', gap: '4px', backgroundColor: '#F1F5F9', padding: '4px', borderRadius: '8px', border: '1px solid #CBD5E1' }}>
                <button
                  onClick={() => setTierCategory('drinks')}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '6px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    backgroundColor: tierCategory === 'drinks' ? '#4F46E5' : 'transparent',
                    color: tierCategory === 'drinks' ? '#FFFFFF' : '#475569'
                  }}
                >
                  Energy Drinks
                </button>
                <button
                  onClick={() => setTierCategory('brands')}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '6px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    backgroundColor: tierCategory === 'brands' ? '#4F46E5' : 'transparent',
                    color: tierCategory === 'brands' ? '#FFFFFF' : '#475569'
                  }}
                >
                  Brands
                </button>
              </div>

              {/* Add item to tier list button */}
              <button
                onClick={() => setIsAddItemModalOpen(true)}
                className="btn-primary"
              >
                <Plus size={16} />
                <span>Add {tierCategory === 'brands' ? 'Brand' : 'Drink'} to Tiers</span>
              </button>
            </div>
          </div>

          <TierListRenderer
            tiers={standaloneTiers[tierCategory] || { S: [], A: [], B: [], C: [], D: [], F: [], IDK: [] }}
            comments={ratings}
            category={tierCategory}
            onMove={(id, from, to) => handleTierMove(id, from, to, false)}
            onRemove={(id, from) => handleRemoveItemFromTier(id, from, false)}
            onCommentChange={(id, text) => handleCommentChange(id, text, false)}
            getEntity={(id) => getEntity(id, tierCategory)}
          />

          {/* Quick Picker Modal */}
          {isAddItemModalOpen && (
            <ItemPickerModal
              title={`Add ${tierCategory === 'brands' ? 'Brand' : 'Drink'} to Tier List`}
              items={tierCategory === 'brands' ? brands : products}
              alreadyRanked={new Set(Object.values(standaloneTiers[tierCategory] || {}).flat())}
              onSelect={(item, targetTier) => {
                handleAddItemToTier(item.id, targetTier, false);
                setIsAddItemModalOpen(false);
              }}
              onClose={() => setIsAddItemModalOpen(false)}
            />
          )}
        </div>
      )}

      {/* =========================================================
          RATINGS OUT OF 10
         ========================================================= */}
      {subSection === 'ratings' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>Ratings Out of 10</h2>
              <p style={{ fontSize: '0.82rem', color: '#64748B' }}>
                Rate any drink or brand from 0 to 10 with custom decimals (e.g. 8.8, 9.2).
              </p>
            </div>

            <div style={{ display: 'flex', gap: '8px', backgroundColor: '#F1F5F9', padding: '4px', borderRadius: '8px', border: '1px solid #CBD5E1' }}>
              <button
                onClick={() => setRatingsCategory('drinks')}
                style={{
                  padding: '7px 16px',
                  borderRadius: '6px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  backgroundColor: ratingsCategory === 'drinks' ? '#4F46E5' : 'transparent',
                  color: ratingsCategory === 'drinks' ? '#FFFFFF' : '#475569'
                }}
              >
                Energy Drinks
              </button>
              <button
                onClick={() => setRatingsCategory('brands')}
                style={{
                  padding: '7px 16px',
                  borderRadius: '6px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  backgroundColor: ratingsCategory === 'brands' ? '#4F46E5' : 'transparent',
                  color: ratingsCategory === 'brands' ? '#FFFFFF' : '#475569'
                }}
              >
                Brands
              </button>
            </div>
          </div>

          <div className="rankit-card" style={{ padding: '14px 18px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', maxWidth: '360px' }}>
              <Search size={18} color="#94A3B8" />
              <input
                type="text"
                placeholder="Search items to rate..."
                value={ratingsSearch}
                onChange={(e) => setRatingsSearch(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.85rem' }}
              />
            </div>

            <button
              onClick={() => setRatingsSort(ratingsSort === 'desc' ? 'asc' : 'desc')}
              className="btn-secondary"
              style={{ fontSize: '0.82rem' }}
            >
              <ArrowUpDown size={15} />
              <span>Sort: {ratingsSort === 'desc' ? 'Highest Rating First' : 'Lowest Rating First'}</span>
            </button>
          </div>

          <RatingsList
            pool={ratingsCategory === 'brands' ? brands : products}
            ratings={ratings}
            category={ratingsCategory}
            sortOrder={ratingsSort}
            searchQuery={ratingsSearch}
            onRatingChange={(id, val) => handleNumericRatingChange(id, val, false)}
            onCommentChange={(id, text) => handleCommentChange(id, text, false)}
          />
        </div>
      )}

      {/* =========================================================
          PERSONAL PROJECTS WORKSPACE
         ========================================================= */}
      {subSection === 'personal' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>Personal Ranking Projects</h2>
              <p style={{ fontSize: '0.82rem', color: '#64748B' }}>
                Create separate custom ranking lists (e.g. "My Summer Favourites", "Zero Sugar Only").
              </p>
            </div>
            <button onClick={() => setIsCreateProjectModalOpen(true)} className="btn-primary">
              <Plus size={18} />
              <span>Create New Project</span>
            </button>
          </div>

          {/* Project Tabs Pills */}
          {projects.length > 0 && (
            <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '24px' }}>
              {projects.map((proj) => {
                const isSelected = proj.id === activeProjectId;
                return (
                  <div
                    key={proj.id}
                    onClick={() => setActiveProjectId(proj.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 16px',
                      borderRadius: '10px',
                      backgroundColor: isSelected ? '#FFFFFF' : '#F1F5F9',
                      border: isSelected ? '2px solid #4F46E5' : '1px solid #E2E8F0',
                      boxShadow: isSelected ? '0 2px 4px rgba(79, 70, 229, 0.15)' : 'none',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 700, color: isSelected ? '#4F46E5' : '#0F172A' }}>
                        {proj.name}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#64748B', display: 'flex', gap: '6px' }}>
                        <span>{proj.rankingType.replace('-', ' ')}</span>
                        <span>•</span>
                        <span>{proj.selectedProductIds?.length || 0} items</span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteProject(proj.id);
                      }}
                      style={{ color: '#94A3B8', padding: '4px' }}
                      title="Delete project"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {activeProject ? (
            <div className="rankit-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '20px', borderBottom: '1px solid #F1F5F9', paddingBottom: '16px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="badge badge-brand">{activeProject.category === 'brands' ? 'Brands' : 'Drinks'}</span>
                    <span className="badge" style={{ backgroundColor: '#F8FAFC', border: '1px solid #CBD5E1', color: '#475569' }}>
                      {activeProject.rankingType === 'tier-list' ? 'Tier List Mode' : '0-10 Rating Mode'}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', marginTop: '6px' }}>
                    {activeProject.name}
                  </h3>
                </div>

                <button
                  onClick={() => setIsAddItemModalOpen(true)}
                  className="btn-secondary"
                  style={{ fontSize: '0.8rem' }}
                >
                  <Plus size={15} />
                  <span>Add Item to Project</span>
                </button>
              </div>

              {activeProject.rankingType === 'tier-list' ? (
                <TierListRenderer
                  tiers={activeProject.tiers || { S: [], A: [], B: [], C: [], D: [], F: [], IDK: [] }}
                  comments={activeProject.comments || {}}
                  category={activeProject.category}
                  onMove={(id, from, to) => handleTierMove(id, from, to, true)}
                  onRemove={(id, from) => handleRemoveItemFromTier(id, from, true)}
                  onCommentChange={(id, text) => handleCommentChange(id, text, true)}
                  getEntity={(id) => getEntity(id, activeProject.category)}
                />
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {(activeProject.selectedProductIds || []).map((id) => {
                    const item = getEntity(id, activeProject.category);
                    return (
                      <div key={id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                        <div>
                          <div style={{ fontWeight: 700, color: '#0F172A' }}>{item.name}</div>
                          <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{item.subtitle}</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            max="10"
                            value={activeProject.ratings?.[id] || ''}
                            onChange={(e) => handleNumericRatingChange(id, e.target.value, true)}
                            placeholder="—"
                            style={{ width: '60px', padding: '6px', textAlign: 'center', fontWeight: 800, border: '1px solid #CBD5E1', borderRadius: '6px' }}
                          />
                          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94A3B8' }}>/ 10</span>
                          <input
                            type="text"
                            placeholder="Personal comment..."
                            value={activeProject.comments?.[id] || ''}
                            onChange={(e) => handleCommentChange(id, e.target.value, true)}
                            style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.8rem', minWidth: '180px' }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {isAddItemModalOpen && (
                <ItemPickerModal
                  title={`Add to "${activeProject.name}"`}
                  items={activeProject.category === 'brands' ? brands : products}
                  alreadyRanked={new Set(Object.values(activeProject.tiers || {}).flat())}
                  onSelect={(item, targetTier) => {
                    handleAddItemToTier(item.id, targetTier, true);
                    setIsAddItemModalOpen(false);
                  }}
                  onClose={() => setIsAddItemModalOpen(false)}
                />
              )}
            </div>
          ) : (
            <div className="rankit-card" style={{ padding: '48px', textAlign: 'center', color: '#64748B' }}>
              <Trophy size={36} color="#CBD5E1" style={{ margin: '0 auto 12px auto' }} />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>No ranking projects created yet</h3>
              <p style={{ marginTop: '4px', fontSize: '0.85rem' }}>
                Click "Create New Project" above to make your first personalized ranking board!
              </p>
            </div>
          )}

          {/* Project creation modal */}
          {isCreateProjectModalOpen && (
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
              <form onSubmit={handleCreateProjectSubmit} className="rankit-card" style={{ width: '100%', maxWidth: '480px', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A' }}>Create New Project</h2>
                  <button type="button" onClick={() => setIsCreateProjectModalOpen(false)} style={{ color: '#64748B' }}>
                    <X size={20} />
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '4px' }}>
                      Project Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. My Favourite Energy Drinks"
                      value={newProject.name}
                      onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.875rem' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '4px' }}>
                        Ranking Type
                      </label>
                      <select
                        value={newProject.rankingType}
                        onChange={(e) => setNewProject({ ...newProject, rankingType: e.target.value })}
                        style={{ width: '100%', padding: '9px 12px', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.875rem', backgroundColor: '#FFFFFF' }}
                      >
                        <option value="tier-list">Tier List (S to F)</option>
                        <option value="ratings">Ratings Out of 10</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '4px' }}>
                        Category
                      </label>
                      <select
                        value={newProject.category}
                        onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                        style={{ width: '100%', padding: '9px 12px', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.875rem', backgroundColor: '#FFFFFF' }}
                      >
                        <option value="drinks">Energy Drinks</option>
                        <option value="brands">Brands</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                    <button type="button" onClick={() => setIsCreateProjectModalOpen(false)} className="btn-secondary">
                      Cancel
                    </button>
                    <button type="submit" className="btn-primary">
                      Create Project
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// Component: TierListRenderer with HTML5 Drag-and-Drop
// -------------------------------------------------------------
function TierListRenderer({ tiers, comments, category, onMove, onRemove, onCommentChange, getEntity }) {
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [commentInput, setCommentInput] = useState('');
  const [draggedItemId, setDraggedItemId] = useState(null);
  const [draggedFromTier, setDraggedFromTier] = useState(null);
  const [dragOverTier, setDragOverTier] = useState(null);

  // Drag start
  const handleDragStart = (e, itemId, fromTier) => {
    setDraggedItemId(itemId);
    setDraggedFromTier(fromTier);
    e.dataTransfer.setData('text/plain', JSON.stringify({ itemId, fromTier }));
    e.dataTransfer.effectAllowed = 'move';
  };

  // Drag over
  const handleDragOver = (e, tierKey) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverTier !== tierKey) setDragOverTier(tierKey);
  };

  // Drag leave
  const handleDragLeave = (e, tierKey) => {
    if (dragOverTier === tierKey) setDragOverTier(null);
  };

  // Drop
  const handleDrop = (e, targetTier) => {
    e.preventDefault();
    setDragOverTier(null);
    try {
      const data = JSON.parse(e.dataTransfer.getData('text/plain'));
      if (data && data.itemId && data.fromTier) {
        if (data.fromTier !== targetTier) {
          onMove(data.itemId, data.fromTier, targetTier);
        }
      }
    } catch (err) {
      if (draggedItemId && draggedFromTier && draggedFromTier !== targetTier) {
        onMove(draggedItemId, draggedFromTier, targetTier);
      }
    }
    setDraggedItemId(null);
    setDraggedFromTier(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {TIER_ORDER.map((tierKey) => {
        const config = TIER_CONFIG[tierKey];
        const itemIds = tiers[tierKey] || [];
        const isDragTarget = dragOverTier === tierKey;

        return (
          <div
            key={tierKey}
            className="rankit-card"
            onDragOver={(e) => handleDragOver(e, tierKey)}
            onDragLeave={(e) => handleDragLeave(e, tierKey)}
            onDrop={(e) => handleDrop(e, tierKey)}
            style={{
              display: 'flex',
              minHeight: '84px',
              border: isDragTarget ? '2px dashed #4F46E5' : `1px solid ${config.border}`,
              backgroundColor: isDragTarget ? '#EEF2FF' : '#FFFFFF',
              overflow: 'hidden',
              transition: 'border 0.15s ease, background 0.15s ease'
            }}
          >
            {/* Left Tier Header */}
            <div style={{
              width: '90px',
              backgroundColor: config.color,
              color: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.5rem',
              padding: '8px',
              flexShrink: 0
            }}>
              <span>{config.name}</span>
              <span style={{ fontSize: '0.65rem', fontWeight: 600, opacity: 0.9, textAlign: 'center' }}>
                {config.label}
              </span>
            </div>

            {/* Items Area */}
            <div style={{
              flex: 1,
              backgroundColor: isDragTarget ? '#EEF2FF' : config.bg,
              padding: '10px 14px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '10px',
              minHeight: '84px'
            }}>
              {itemIds.length === 0 ? (
                <span style={{ fontSize: '0.8rem', color: '#94A3B8', fontStyle: 'italic' }}>
                  Drag & drop items here or use the add button above
                </span>
              ) : (
                itemIds.map((itemId) => {
                  const entity = getEntity(itemId);
                  const hasComment = Boolean(comments[itemId]);

                  return (
                    <div
                      key={itemId}
                      draggable
                      onDragStart={(e) => handleDragStart(e, itemId, tierKey)}
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #CBD5E1',
                        borderRadius: '8px',
                        padding: '6px 10px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                        cursor: 'grab',
                        userSelect: 'none'
                      }}
                    >
                      <GripVertical size={14} color="#94A3B8" />

                      {entity.image && (
                        <img 
                          src={entity.image} 
                          alt="" 
                          style={{ width: '28px', height: '28px', borderRadius: '4px', objectFit: 'cover' }} 
                        />
                      )}

                      <div style={{ maxWidth: '140px' }}>
                        <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {entity.name}
                        </div>
                        {entity.subtitle && (
                          <div style={{ fontSize: '0.68rem', color: '#64748B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {entity.subtitle}
                          </div>
                        )}
                      </div>

                      {/* Dropdown switch */}
                      <select
                        value={tierKey}
                        onChange={(e) => onMove(itemId, tierKey, e.target.value)}
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          padding: '2px 4px',
                          border: '1px solid #CBD5E1',
                          borderRadius: '4px',
                          backgroundColor: '#F8FAFC',
                          cursor: 'pointer'
                        }}
                      >
                        {TIER_ORDER.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>

                      {/* Comment */}
                      <button
                        onClick={() => {
                          setEditingCommentId(itemId);
                          const ex = comments[itemId];
                          setCommentInput(typeof ex === 'object' ? ex.comment || '' : ex || '');
                        }}
                        style={{ color: hasComment ? '#4F46E5' : '#94A3B8', padding: '2px' }}
                        title="Add/View Comment"
                      >
                        <MessageSquare size={14} fill={hasComment ? '#4F46E5' : 'none'} />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => onRemove(itemId, tierKey)}
                        style={{ color: '#EF4444', padding: '2px' }}
                        title="Remove from tier list"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        );
      })}

      {/* Comment modal */}
      {editingCommentId && (
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
          zIndex: 60,
          padding: '20px'
        }}>
          <div className="rankit-card" style={{ width: '100%', maxWidth: '420px', padding: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
              Personal Note & Opinion
            </h3>
            <textarea
              rows="4"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Private note about this flavour or brand..."
              style={{ width: '100%', padding: '10px', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '14px' }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button onClick={() => setEditingCommentId(null)} className="btn-secondary">
                Cancel
              </button>
              <button
                onClick={() => {
                  onCommentChange(editingCommentId, commentInput);
                  setEditingCommentId(null);
                }}
                className="btn-primary"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// Component: ItemPickerModal for selecting items to place into tiers
// -------------------------------------------------------------
function ItemPickerModal({ title, items, alreadyRanked, onSelect, onClose }) {
  const [search, setSearch] = useState('');
  const [selectedTier, setSelectedTier] = useState('S');

  const filtered = items.filter((it) => {
    return it.name.toLowerCase().includes(search.toLowerCase()) || (it.brand && it.brand.toLowerCase().includes(search.toLowerCase()));
  });

  return (
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
      zIndex: 60,
      padding: '20px'
    }}>
      <div className="rankit-card" style={{ width: '100%', maxWidth: '500px', padding: '24px', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A' }}>{title}</h3>
          <button onClick={onClose} style={{ color: '#64748B' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '14px' }}>
          <input
            type="text"
            autoFocus
            placeholder="Search items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1, padding: '8px 12px', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.85rem' }}
          />

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748B' }}>Target:</span>
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              style={{ padding: '8px 10px', fontWeight: 800, border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.85rem', backgroundColor: '#FFFFFF' }}
            >
              {TIER_ORDER.map((t) => (
                <option key={t} value={t}>{t} Tier</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {filtered.map((item) => {
            const isRanked = alreadyRanked.has(item.id);
            return (
              <button
                key={item.id}
                onClick={() => onSelect(item, selectedTier)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid #E2E8F0',
                  backgroundColor: '#FFFFFF',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#EEF2FF'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0F172A' }}>{item.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                    {item.brand || item.origin} {item.flavor ? `• ${item.flavor}` : ''}
                  </div>
                </div>
                {isRanked ? (
                  <span style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: 600 }}>Already on board</span>
                ) : (
                  <span style={{ fontSize: '0.8rem', color: '#4F46E5', fontWeight: 700 }}>+ Add to {selectedTier}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Component: RatingsList
// -------------------------------------------------------------
function RatingsList({ pool, ratings, category, sortOrder, searchQuery, onRatingChange, onCommentChange }) {
  const items = pool.map((p) => {
    const rData = ratings[p.id];
    const ratingVal = typeof rData === 'object' ? rData.rating : rData;
    const commentVal = typeof rData === 'object' ? rData.comment || '' : '';
    return {
      id: p.id,
      name: p.name,
      subtitle: category === 'brands' ? p.origin : `${p.brand} • ${p.caffeine}mg`,
      rating: typeof ratingVal === 'number' ? ratingVal : null,
      comment: commentVal
    };
  }).filter((x) => {
    return x.name.toLowerCase().includes(searchQuery.toLowerCase()) || (x.comment && x.comment.toLowerCase().includes(searchQuery.toLowerCase()));
  }).sort((a, b) => {
    const rA = a.rating !== null ? a.rating : -1;
    const rB = b.rating !== null ? b.rating : -1;
    if (sortOrder === 'desc') return rB - rA;
    return rA - rB;
  });

  return (
    <div className="rankit-card" style={{ overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontWeight: 700 }}>
            <th style={{ padding: '14px 20px', width: '50px' }}>#</th>
            <th style={{ padding: '14px 20px' }}>{category === 'brands' ? 'Brand' : 'Drink'}</th>
            <th style={{ padding: '14px 20px', width: '160px' }}>Rating (/ 10)</th>
            <th style={{ padding: '14px 20px' }}>Personal Comment</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={item.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
              <td style={{ padding: '14px 20px', color: '#94A3B8', fontWeight: 700 }}>
                {idx + 1}
              </td>
              <td style={{ padding: '14px 20px' }}>
                <div style={{ fontWeight: 700, color: '#0F172A' }}>{item.name}</div>
                <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{item.subtitle}</div>
              </td>
              <td style={{ padding: '14px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={item.rating !== null ? item.rating : ''}
                    placeholder="—"
                    onChange={(e) => onRatingChange(item.id, e.target.value)}
                    style={{
                      width: '64px',
                      padding: '6px',
                      fontWeight: 800,
                      fontSize: '0.95rem',
                      color: '#4F46E5',
                      borderRadius: '6px',
                      border: '1px solid #CBD5E1',
                      textAlign: 'center'
                    }}
                  />
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94A3B8' }}>/ 10</span>
                </div>
              </td>
              <td style={{ padding: '14px 20px' }}>
                <input
                  type="text"
                  placeholder="Add opinion or tasting notes..."
                  value={item.comment || ''}
                  onChange={(e) => onCommentChange(item.id, e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid #E2E8F0',
                    fontSize: '0.85rem'
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
