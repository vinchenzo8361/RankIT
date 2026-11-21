import React, { useState } from 'react';
import { 
  Trophy, 
  Layers, 
  Star, 
  Plus, 
  Trash2, 
  Edit3, 
  Sparkles, 
  GripVertical, 
  MessageSquare,
  ArrowUpDown,
  Search,
  Filter,
  CheckCircle2,
  Calendar
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
  // 3.0 Three sub-options: Personal Rankings (1), Tier List (2), Ratings Out of 10 (3)
  const [subSection, setSubSection] = useState('personal'); // 'personal' | 'tier-list' | 'ratings'

  // Standalone Tier List Category: 'brands' vs 'drinks'
  const [tierCategory, setTierCategory] = useState('drinks');

  // Ratings Category: 'drinks' vs 'brands'
  const [ratingsCategory, setRatingsCategory] = useState('drinks');
  const [ratingsSort, setRatingsSort] = useState('desc'); // 'desc' | 'asc'
  const [ratingsSearch, setRatingsSearch] = useState('');

  // Selected project for workspace
  const [activeProjectId, setActiveProjectId] = useState(projects[0]?.id || null);
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false);

  // New project creation state
  const [newProject, setNewProject] = useState({
    name: '',
    rankingType: 'tier-list', // 'tier-list' | 'ratings'
    category: 'drinks', // 'brands' | 'drinks'
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

  // --- 3.1 Personal Rankings Handlers ---
  const handleCreateProjectSubmit = (e) => {
    e.preventDefault();
    if (!newProject.name.trim()) return;

    // Default tiers or ratings
    const initialTiers = { S: [], A: [], B: [], C: [], D: [], F: [], IDK: [...newProject.selectedProductIds] };
    const initialRatings = {};

    const created = {
      id: `proj-${Date.now()}`,
      name: newProject.name.trim(),
      rankingType: newProject.rankingType,
      category: newProject.category,
      selectedProductIds: [...newProject.selectedProductIds],
      tiers: initialTiers,
      ratings: initialRatings,
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
    if (!confirm('Are you sure you want to delete this ranking project?')) return;
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

  // Drag and drop for Tiers
  const handleTierMove = (itemId, fromTier, toTier, isProject = false) => {
    if (isProject) {
      handleUpdateActiveProject((proj) => {
        const tiers = { ...proj.tiers };
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

  // Re-ordering within tier
  const handleMoveWithinTier = (tierName, index, direction, isProject = false) => {
    const swap = (arr, i, j) => {
      const copy = [...arr];
      const temp = copy[i];
      copy[i] = copy[j];
      copy[j] = temp;
      return copy;
    };

    if (isProject) {
      handleUpdateActiveProject((proj) => {
        const tierList = [...(proj.tiers[tierName] || [])];
        const target = direction === 'up' ? index - 1 : index + 1;
        if (target < 0 || target >= tierList.length) return proj;
        return {
          ...proj,
          tiers: {
            ...proj.tiers,
            [tierName]: swap(tierList, index, target)
          }
        };
      });
    } else {
      const current = { ...(standaloneTiers[tierCategory] || {}) };
      const tierList = [...(current[tierName] || [])];
      const target = direction === 'up' ? index - 1 : index + 1;
      if (target < 0 || target >= tierList.length) return;
      current[tierName] = swap(tierList, index, target);
      onSaveStandaloneTiers(tierCategory, current);
    }
  };

  // Comment Handlers
  const handleCommentChange = (itemId, commentText, isProject = false) => {
    if (isProject) {
      handleUpdateActiveProject((proj) => ({
        ...proj,
        comments: {
          ...proj.comments,
          [itemId]: commentText
        }
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

  // Numerical Rating Handlers
  const handleNumericRatingChange = (itemId, val, isProject = false) => {
    const num = Math.min(10, Math.max(0, parseFloat(val) || 0));
    if (isProject) {
      handleUpdateActiveProject((proj) => ({
        ...proj,
        ratings: {
          ...proj.ratings,
          [itemId]: num
        }
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
          <span>1. Personal Rankings</span>
        </button>

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
          <span>2. Tier List</span>
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
          <span>3. Ratings Out of 10</span>
        </button>
      </div>

      {/* =========================================================
          SECTION 3.1 — PERSONAL RANKINGS WORKSPACE
         ========================================================= */}
      {subSection === 'personal' && (
        <div>
          {/* Projects bar + Create project button */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>Personal Ranking Projects</h2>
              <p style={{ fontSize: '0.82rem', color: '#64748B' }}>
                Create independent custom ranking projects with their own product pools, tier lists or 0–10 ratings.
              </p>
            </div>
            <button
              onClick={() => setIsCreateProjectModalOpen(true)}
              className="btn-primary"
            >
              <Plus size={18} />
              <span>Create New Ranking</span>
            </button>
          </div>

          {/* Project Tabs Pills */}
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
                      <span style={{ textTransform: 'capitalize' }}>{proj.rankingType.replace('-', ' ')}</span>
                      <span>•</span>
                      <span>{proj.selectedProductIds?.length || 0} items</span>
                    </div>
                  </div>
                  {projects.length > 1 && (
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
                  )}
                </div>
              );
            })}
          </div>

          {/* Active Project Canvas */}
          {activeProject ? (
            <div className="rankit-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '20px', borderBottom: '1px solid #F1F5F9', paddingBottom: '16px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="badge badge-brand">{activeProject.category === 'brands' ? 'Energy Drink Brands' : 'Energy Drinks'}</span>
                    <span className="badge" style={{ backgroundColor: '#F8FAFC', border: '1px solid #CBD5E1', color: '#475569' }}>
                      {activeProject.rankingType === 'tier-list' ? 'Tier List Mode' : '0-10 Rating Mode'}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', marginTop: '6px' }}>
                    {activeProject.name}
                  </h3>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '2px', display: 'flex', gap: '12px' }}>
                    <span>Created: {new Date(activeProject.createdAt).toLocaleDateString()}</span>
                    <span>Last Updated: {new Date(activeProject.updatedAt).toLocaleTimeString()}</span>
                  </div>
                </div>

                {/* Manage Products inside Project */}
                <button
                  onClick={() => {
                    const pool = activeProject.category === 'brands' ? brands : products;
                    const name = prompt('Add product ID or search name to project pool:');
                    if (name) {
                      const match = pool.find((x) => x.name.toLowerCase().includes(name.toLowerCase()) || x.id === name);
                      if (match && !activeProject.selectedProductIds.includes(match.id)) {
                        handleUpdateActiveProject((p) => ({
                          ...p,
                          selectedProductIds: [...p.selectedProductIds, match.id],
                          tiers: {
                            ...p.tiers,
                            IDK: [...(p.tiers.IDK || []), match.id]
                          }
                        }));
                      }
                    }
                  }}
                  className="btn-secondary"
                  style={{ fontSize: '0.8rem' }}
                >
                  <Plus size={15} />
                  <span>Add Product to Pool</span>
                </button>
              </div>

              {/* Render Project Tier List or Ratings according to rankingType */}
              {activeProject.rankingType === 'tier-list' ? (
                <TierListRenderer
                  tiers={activeProject.tiers || { S: [], A: [], B: [], C: [], D: [], F: [], IDK: [] }}
                  comments={activeProject.comments || {}}
                  category={activeProject.category}
                  onMove={(id, from, to) => handleTierMove(id, from, to, true)}
                  onReorder={(tier, idx, dir) => handleMoveWithinTier(tier, idx, dir, true)}
                  onCommentChange={(id, text) => handleCommentChange(id, text, true)}
                  getEntity={(id) => getEntity(id, activeProject.category)}
                />
              ) : (
                <RatingsRenderer
                  items={activeProject.selectedProductIds.map((id) => {
                    const e = getEntity(id, activeProject.category);
                    const r = activeProject.ratings[id] || 0;
                    const c = activeProject.comments[id] || '';
                    return { ...e, rating: r, comment: c };
                  })}
                  onRatingChange={(id, val) => handleNumericRatingChange(id, val, true)}
                  onCommentChange={(id, text) => handleCommentChange(id, text, true)}
                />
              )}
            </div>
          ) : (
            <div className="rankit-card" style={{ padding: '40px', textAlign: 'center', color: '#64748B' }}>
              <p>No project selected. Create one above to get started!</p>
            </div>
          )}
        </div>
      )}

      {/* =========================================================
          SECTION 3.2 — STANDALONE TIER LIST (7 Tiers + 2 Categories)
         ========================================================= */}
      {subSection === 'tier-list' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>Global Tier List Workspace</h2>
              <p style={{ fontSize: '0.82rem', color: '#64748B' }}>
                Organize products across S, A, B, C, D, F, and IDK. Changes save automatically.
              </p>
            </div>

            {/* Two Ranking Categories: Energy Drink Brand vs Energy Drinks */}
            <div style={{ display: 'flex', gap: '8px', backgroundColor: '#F1F5F9', padding: '4px', borderRadius: '8px', border: '1px solid #CBD5E1' }}>
              <button
                onClick={() => setTierCategory('drinks')}
                style={{
                  padding: '7px 16px',
                  borderRadius: '6px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  backgroundColor: tierCategory === 'drinks' ? '#4F46E5' : 'transparent',
                  color: tierCategory === 'drinks' ? '#FFFFFF' : '#475569'
                }}
              >
                Energy Drinks (Flavours)
              </button>
              <button
                onClick={() => setTierCategory('brands')}
                style={{
                  padding: '7px 16px',
                  borderRadius: '6px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  backgroundColor: tierCategory === 'brands' ? '#4F46E5' : 'transparent',
                  color: tierCategory === 'brands' ? '#4F46E5' : '#475569'
                }}
              >
                Energy Drink Brands
              </button>
            </div>
          </div>

          {/* Quick Pool Add / IDK Filler */}
          <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={() => {
                const current = { ...(standaloneTiers[tierCategory] || {}) };
                const currentRanked = new Set(Object.values(current).flat());
                const pool = tierCategory === 'brands' ? brands : products;
                const unranked = pool.filter((x) => !currentRanked.has(x.id)).map((x) => x.id);

                current.IDK = Array.from(new Set([...(current.IDK || []), ...unranked]));
                onSaveStandaloneTiers(tierCategory, current);
              }}
              className="btn-secondary"
              style={{ fontSize: '0.8rem' }}
            >
              <Plus size={15} />
              <span>Fill IDK With All Catalog {tierCategory === 'brands' ? 'Brands' : 'Drinks'}</span>
            </button>
          </div>

          <TierListRenderer
            tiers={standaloneTiers[tierCategory] || { S: [], A: [], B: [], C: [], D: [], F: [], IDK: [] }}
            comments={ratings}
            category={tierCategory}
            onMove={(id, from, to) => handleTierMove(id, from, to, false)}
            onReorder={(tier, idx, dir) => handleMoveWithinTier(tier, idx, dir, false)}
            onCommentChange={(id, text) => handleCommentChange(id, text, false)}
            getEntity={(id) => getEntity(id, tierCategory)}
          />
        </div>
      )}

      {/* =========================================================
          SECTION 3.3 — RATINGS OUT OF 10
         ========================================================= */}
      {subSection === 'ratings' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>Ratings Out of 10</h2>
              <p style={{ fontSize: '0.82rem', color: '#64748B' }}>
                Rate brands or individual drinks on a 0 to 10 scale (decimals like 8.8, 9.2 supported).
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

          {/* Search & Sort Controls */}
          <div className="rankit-card" style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', maxWidth: '360px' }}>
              <Search size={18} color="#94A3B8" />
              <input
                type="text"
                placeholder="Search rated items..."
                value={ratingsSearch}
                onChange={(e) => setRatingsSearch(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.85rem' }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                onClick={() => setRatingsSort(ratingsSort === 'desc' ? 'asc' : 'desc')}
                className="btn-secondary"
                style={{ fontSize: '0.85rem' }}
              >
                <ArrowUpDown size={15} />
                <span>Sort: {ratingsSort === 'desc' ? 'Highest Rating First' : 'Lowest Rating First'}</span>
              </button>
            </div>
          </div>

          {/* Ratings Table / Rows */}
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

      {/* Project Creation Modal */}
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
          <form onSubmit={handleCreateProjectSubmit} className="rankit-card" style={{ width: '100%', maxWidth: '580px', padding: '28px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '16px' }}>
              Create New Ranking Project
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '6px' }}>
                  Project Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Best Sugar-Free Energy Drinks"
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.875rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '6px' }}>
                    Ranking Method *
                  </label>
                  <select
                    value={newProject.rankingType}
                    onChange={(e) => setNewProject({ ...newProject, rankingType: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.875rem', backgroundColor: '#FFFFFF' }}
                  >
                    <option value="tier-list">Tier List (S to F + IDK)</option>
                    <option value="ratings">Ratings Out of 10</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '6px' }}>
                    Category *
                  </label>
                  <select
                    value={newProject.category}
                    onChange={(e) => setNewProject({ ...newProject, category: e.target.value, selectedProductIds: [] })}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.875rem', backgroundColor: '#FFFFFF' }}
                  >
                    <option value="drinks">Energy Drinks (Products)</option>
                    <option value="brands">Energy Drink Brands</option>
                  </select>
                </div>
              </div>

              {/* Select items to include */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '8px' }}>
                  Select Initial Pool of Products / Brands ({newProject.selectedProductIds.length} selected)
                </label>
                <div style={{
                  maxHeight: '200px',
                  overflowY: 'auto',
                  border: '1px solid #CBD5E1',
                  borderRadius: '8px',
                  padding: '10px',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '8px'
                }}>
                  {(newProject.category === 'brands' ? brands : products).map((item) => {
                    const isChecked = newProject.selectedProductIds.includes(item.id);
                    return (
                      <label key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', cursor: 'pointer', padding: '4px' }}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewProject({ ...newProject, selectedProductIds: [...newProject.selectedProductIds, item.id] });
                            } else {
                              setNewProject({ ...newProject, selectedProductIds: newProject.selectedProductIds.filter((id) => id !== item.id) });
                            }
                          }}
                        />
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setIsCreateProjectModalOpen(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Create Project & Start Ranking
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// Component: TierListRenderer (Drag / Move Controls & Comment Modal)
// -------------------------------------------------------------
function TierListRenderer({ tiers, comments, category, onMove, onReorder, onCommentChange, getEntity }) {
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [commentInput, setCommentInput] = useState('');

  const openCommentModal = (id) => {
    setEditingCommentId(id);
    const existing = comments[id];
    setCommentInput(typeof existing === 'object' ? existing.comment || '' : existing || '');
  };

  const saveComment = () => {
    if (editingCommentId) {
      onCommentChange(editingCommentId, commentInput);
      setEditingCommentId(null);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {TIER_ORDER.map((tierKey) => {
        const config = TIER_CONFIG[tierKey];
        const itemIds = tiers[tierKey] || [];

        return (
          <div
            key={tierKey}
            className="rankit-card"
            style={{
              display: 'flex',
              minHeight: '84px',
              border: `1px solid ${config.border}`,
              overflow: 'hidden'
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

            {/* Droppable / Placed Items Area */}
            <div style={{
              flex: 1,
              backgroundColor: config.bg,
              padding: '10px 14px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '10px',
              minHeight: '84px'
            }}>
              {itemIds.length === 0 ? (
                <span style={{ fontSize: '0.8rem', color: '#94A3B8', fontStyle: 'italic' }}>
                  No items in {config.name} tier
                </span>
              ) : (
                itemIds.map((itemId, idx) => {
                  const entity = getEntity(itemId);
                  const hasComment = Boolean(comments[itemId]);

                  return (
                    <div
                      key={itemId}
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E2E8F0',
                        borderRadius: '8px',
                        padding: '6px 10px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                        maxWidth: '240px'
                      }}
                    >
                      {entity.image && (
                        <img 
                          src={entity.image} 
                          alt="" 
                          style={{ width: '28px', height: '28px', borderRadius: '4px', objectFit: 'cover' }} 
                        />
                      )}
                      <div style={{ overflow: 'hidden' }}>
                        <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {entity.name}
                        </div>
                        {entity.subtitle && (
                          <div style={{ fontSize: '0.68rem', color: '#64748B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {entity.subtitle}
                          </div>
                        )}
                      </div>

                      {/* Tier Switch Dropdown Selector */}
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

                      {/* Comment Icon Button */}
                      <button
                        onClick={() => openCommentModal(itemId)}
                        style={{
                          color: hasComment ? '#4F46E5' : '#94A3B8',
                          padding: '2px'
                        }}
                        title={hasComment ? 'View / Edit Personal Comment' : 'Add Personal Comment'}
                      >
                        <MessageSquare size={14} fill={hasComment ? '#4F46E5' : 'none'} />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        );
      })}

      {/* Comment Edit Modal */}
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
          <div className="rankit-card" style={{ width: '100%', maxWidth: '440px', padding: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
              Personal Tasting Note & Opinion
            </h3>
            <p style={{ fontSize: '0.78rem', color: '#64748B', marginBottom: '14px' }}>
              Private notes for your personal ranking (not public reviews).
            </p>
            <textarea
              rows="4"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="e.g. Really good flavour. Not overly sweet and very refreshing. One of my favourites."
              style={{ width: '100%', padding: '10px', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '16px' }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button onClick={() => setEditingCommentId(null)} className="btn-secondary">
                Cancel
              </button>
              <button onClick={saveComment} className="btn-primary">
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
// Component: RatingsRenderer for Inside Projects
// -------------------------------------------------------------
function RatingsRenderer({ items, onRatingChange, onCommentChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {items.map((item) => (
        <div 
          key={item.id} 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            padding: '12px 16px', 
            backgroundColor: '#F8FAFC', 
            borderRadius: '8px', 
            border: '1px solid #E2E8F0',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          <div>
            <div style={{ fontWeight: 700, color: '#0F172A' }}>{item.name}</div>
            <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{item.subtitle}</div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748B' }}>Rating:</span>
              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                value={item.rating || ''}
                onChange={(e) => onRatingChange(item.id, e.target.value)}
                placeholder="—"
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
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748B' }}>/ 10</span>
            </div>

            <input
              type="text"
              placeholder="Add personal comment..."
              value={item.comment || ''}
              onChange={(e) => onCommentChange(item.id, e.target.value)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                fontSize: '0.8rem',
                minWidth: '220px'
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// -------------------------------------------------------------
// Component: RatingsList for Standalone Section 3.3
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
