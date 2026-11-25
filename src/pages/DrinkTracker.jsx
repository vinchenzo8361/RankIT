import React, { useState } from 'react';
import { 
  Coffee, 
  Calendar as CalendarIcon, 
  Plus, 
  Minus, 
  Trash2, 
  ChevronLeft, 
  ChevronRight, 
  Zap, 
  Droplets,
  Search,
  X,
  Check,
  Star,
  ChevronRight as ArrowRightIcon,
  ArrowLeft
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  ReferenceLine 
} from 'recharts';
import { calculateCaffeine } from '../utils/caffeine';

export default function DrinkTracker({ 
  products, 
  brands, 
  drinkLogs, 
  onSaveLogs, 
  favorites = [], 
  onToggleFavorite 
}) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isAddDrinkModalOpen, setIsAddDrinkModalOpen] = useState(false);
  const [activeViewTab, setActiveViewTab] = useState('daily'); // 'daily' | 'weekly'

  // MODAL NAVIGATION: Exactly 2 tabs at the top per user request: 'favs' (My Favs) and 'brands' (All Brands)
  const [modalTab, setModalTab] = useState('brands');
  const [modalSelectedBrand, setModalSelectedBrand] = useState(null); // When set, views brand's drinks inside 'brands'
  const [brandSearch, setBrandSearch] = useState('');
  const [drinkSearch, setDrinkSearch] = useState('');

  // Step 2 confirmation
  const [isConfirmingDrink, setIsConfirmingDrink] = useState(false);
  const [chosenProduct, setChosenProduct] = useState(null);
  const [consumedVolume, setConsumedVolume] = useState(250);
  const [customVolume, setCustomVolume] = useState('');
  const [isCustom, setIsCustom] = useState(false);

  // Helper map
  const productsMap = {};
  products.forEach((p) => { productsMap[p.id] = p; });

  // Brands sorted by popularity rank (1 = most popular: Red Bull, Monster, Rockstar, Celsius, etc.)
  const popularBrands = [...brands].sort((a, b) => {
    const rA = a.popularityRank || 999;
    const rB = b.popularityRank || 999;
    if (rA !== rB) return rA - rB;
    return a.name.localeCompare(b.name);
  });

  const filteredBrands = popularBrands.filter((b) => {
    return b.name.toLowerCase().includes(brandSearch.toLowerCase()) ||
           (b.origin && b.origin.toLowerCase().includes(brandSearch.toLowerCase()));
  });

  // Filtered drinks belonging to chosen brand
  const brandDrinks = modalSelectedBrand 
    ? products.filter((p) => p.brand.toLowerCase() === modalSelectedBrand.name.toLowerCase() || p.brandId === modalSelectedBrand.id)
    : [];

  const filteredBrandDrinks = brandDrinks.filter((p) => {
    return p.name.toLowerCase().includes(drinkSearch.toLowerCase()) ||
           (p.flavor && p.flavor.toLowerCase().includes(drinkSearch.toLowerCase()));
  });

  // Favorite drinks objects
  const favoriteProducts = favorites
    .map((id) => productsMap[id])
    .filter(Boolean);

  // Daily logs for selected date
  const todayLogs = drinkLogs[selectedDate] || [];

  const totalDrinksToday = todayLogs.length;
  const totalCaffeineToday = todayLogs.reduce((acc, curr) => acc + (curr.caffeineMg || 0), 0);
  const totalVolumeToday = todayLogs.reduce((acc, curr) => acc + (curr.volumeMl || 0), 0);

  const shiftDate = (days) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + days);
    setSelectedDate(d.toISOString().split('T')[0]);
  };

  const openLogModal = () => {
    setModalTab(favorites.length > 0 ? 'favs' : 'brands');
    setModalSelectedBrand(null);
    setBrandSearch('');
    setDrinkSearch('');
    setIsConfirmingDrink(false);
    setChosenProduct(null);
    setIsCustom(false);
    setCustomVolume('');
    setIsAddDrinkModalOpen(true);
  };

  const handleSelectProduct = (prod) => {
    setChosenProduct(prod);
    setConsumedVolume(prod.servingSize || 250);
    setIsConfirmingDrink(true);
  };

  const handleConfirmDrink = () => {
    if (!chosenProduct) return;
    const volume = isCustom ? Number(customVolume) || chosenProduct.servingSize : Number(consumedVolume);
    const caffeineCalculated = calculateCaffeine(chosenProduct, volume);

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newEntry = {
      id: `log-${Date.now()}`,
      productId: chosenProduct.id,
      volumeMl: volume,
      caffeineMg: caffeineCalculated,
      time: timeStr
    };

    const updatedDateLogs = [...todayLogs, newEntry];
    onSaveLogs({
      ...drinkLogs,
      [selectedDate]: updatedDateLogs
    });

    setIsAddDrinkModalOpen(false);
  };

  const handleModifyServing = (index, delta) => {
    const item = todayLogs[index];
    if (!item) return;

    const prod = productsMap[item.productId];
    if (!prod) return;

    const stepVolume = prod.servingSize || 250;
    const newVolume = item.volumeMl + delta * stepVolume;

    if (newVolume <= 0) {
      handleRemoveLog(index);
      return;
    }

    const updated = [...todayLogs];
    updated[index] = {
      ...item,
      volumeMl: newVolume,
      caffeineMg: calculateCaffeine(prod, newVolume)
    };

    onSaveLogs({
      ...drinkLogs,
      [selectedDate]: updated
    });
  };

  const handleRemoveLog = (index) => {
    const updated = todayLogs.filter((_, i) => i !== index);
    onSaveLogs({
      ...drinkLogs,
      [selectedDate]: updated
    });
  };

  // Weekly stats calculation
  const getWeeklyData = () => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const result = [];
    const base = new Date(selectedDate);
    const dayIndex = base.getDay();
    const mondayOffset = (dayIndex === 0 ? -6 : 1) - dayIndex;
    const monday = new Date(base);
    monday.setDate(base.getDate() + mondayOffset);

    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const dStr = d.toISOString().split('T')[0];
      const dayLogs = drinkLogs[dStr] || [];

      const dayCaffeine = dayLogs.reduce((sum, item) => sum + (item.caffeineMg || 0), 0);
      const dayDrinks = dayLogs.length;

      result.push({
        dateStr: dStr,
        dayName: daysOfWeek[d.getDay()],
        caffeine: dayCaffeine,
        drinks: dayDrinks,
        isToday: dStr === new Date().toISOString().split('T')[0],
        isSelected: dStr === selectedDate
      });
    }

    const totalWeeklyCaffeine = result.reduce((s, d) => s + d.caffeine, 0);
    const totalWeeklyDrinks = result.reduce((s, d) => s + d.drinks, 0);
    const avgDailyCaffeine = Math.round(totalWeeklyCaffeine / 7);

    return {
      days: result,
      totalWeeklyCaffeine,
      totalWeeklyDrinks,
      avgDailyCaffeine
    };
  };

  const weeklyStats = getWeeklyData();

  return (
    <div style={{ padding: '28px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      {/* Tracker Mode Toggle & Date Navigator */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', gap: '4px', backgroundColor: '#14171F', padding: '3px', borderRadius: '8px', border: '1px solid #242B3B' }}>
          <button
            onClick={() => setActiveViewTab('daily')}
            style={{
              padding: '7px 16px',
              borderRadius: '6px',
              fontSize: '0.84rem',
              fontWeight: 700,
              backgroundColor: activeViewTab === 'daily' ? '#1F2433' : 'transparent',
              color: activeViewTab === 'daily' ? '#38BDF8' : '#94A3B8',
              border: activeViewTab === 'daily' ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent'
            }}
          >
            Daily Tracker
          </button>
          <button
            onClick={() => setActiveViewTab('weekly')}
            style={{
              padding: '7px 16px',
              borderRadius: '6px',
              fontSize: '0.84rem',
              fontWeight: 700,
              backgroundColor: activeViewTab === 'weekly' ? '#1F2433' : 'transparent',
              color: activeViewTab === 'weekly' ? '#38BDF8' : '#94A3B8',
              border: activeViewTab === 'weekly' ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent'
            }}
          >
            Weekly Statistics
          </button>
        </div>

        {/* Date Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#14171F', padding: '6px 12px', borderRadius: '8px', border: '1px solid #242B3B' }}>
          <button onClick={() => shiftDate(-1)} style={{ padding: '3px', color: '#94A3B8' }} title="Previous Day">
            <ChevronLeft size={16} />
          </button>
          <CalendarIcon size={15} color="#38BDF8" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{ border: 'none', fontWeight: 700, fontSize: '0.85rem', color: '#F8FAFC', outline: 'none', cursor: 'pointer' }}
          />
          <button onClick={() => shiftDate(1)} style={{ padding: '3px', color: '#94A3B8' }} title="Next Day">
            <ChevronRight size={16} />
          </button>
          <button
            onClick={() => setSelectedDate(new Date().toISOString().split('T')[0])}
            style={{ fontSize: '0.75rem', color: '#38BDF8', fontWeight: 700, marginLeft: '4px' }}
          >
            Today
          </button>
        </div>
      </div>

      {activeViewTab === 'daily' ? (
        <div>
          {/* Daily Summary Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '22px' }}>
            <div className="rankit-card" style={{ padding: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94A3B8', fontSize: '0.78rem', fontWeight: 600 }}>
                <Coffee size={15} color="#38BDF8" />
                <span>Drinks Consumed</span>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#F8FAFC', marginTop: '4px' }}>
                {totalDrinksToday}
              </div>
              <span style={{ fontSize: '0.72rem', color: '#64748B' }}>Logged entries for this date</span>
            </div>

            <div className="rankit-card" style={{ padding: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94A3B8', fontSize: '0.78rem', fontWeight: 600 }}>
                <Zap size={15} color="#F59E0B" />
                <span>Estimated Caffeine</span>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: totalCaffeineToday > 400 ? '#EF4444' : '#F59E0B', marginTop: '4px' }}>
                {totalCaffeineToday} <span style={{ fontSize: '1rem', fontWeight: 600 }}>mg</span>
              </div>
              <span style={{ fontSize: '0.72rem', color: totalCaffeineToday > 400 ? '#EF4444' : '#10B981', fontWeight: 600 }}>
                {totalCaffeineToday > 400 ? '⚠️ Exceeds 400mg daily limit' : '✓ Safe daily intake'}
              </span>
            </div>

            <div className="rankit-card" style={{ padding: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94A3B8', fontSize: '0.78rem', fontWeight: 600 }}>
                <Droplets size={15} color="#38BDF8" />
                <span>Liquid Volume</span>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#38BDF8', marginTop: '4px' }}>
                {totalVolumeToday} <span style={{ fontSize: '1rem', fontWeight: 600 }}>ml</span>
              </div>
              <span style={{ fontSize: '0.72rem', color: '#64748B' }}>Total volume intake</span>
            </div>
          </div>

          {/* Action Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#F8FAFC' }}>
              Logged Drinks for {selectedDate}
            </h3>
            <button onClick={openLogModal} className="btn-primary">
              <Plus size={16} />
              <span>Log Drink</span>
            </button>
          </div>

          {/* Drink List */}
          {todayLogs.length === 0 ? (
            <div className="rankit-card" style={{ padding: '42px', textAlign: 'center', color: '#94A3B8' }}>
              <Coffee size={32} color="#475569" style={{ margin: '0 auto 10px auto' }} />
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#F8FAFC' }}>No drinks logged for this date</h4>
              <p style={{ fontSize: '0.82rem', marginTop: '3px' }}>Click "Log Drink" above to record what you drank and calculate your caffeine.</p>
            </div>
          ) : (
            <div className="rankit-card" style={{ overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#14171F', borderBottom: '1px solid #242B3B', color: '#94A3B8', fontWeight: 600 }}>
                    <th style={{ padding: '12px 16px' }}>Time</th>
                    <th style={{ padding: '12px 16px' }}>Drink</th>
                    <th style={{ padding: '12px 16px' }}>Volume</th>
                    <th style={{ padding: '12px 16px' }}>Caffeine</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center' }}>Servings</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {todayLogs.map((log, idx) => {
                    const prod = productsMap[log.productId];
                    return (
                      <tr key={log.id} style={{ borderBottom: '1px solid #1F2433' }}>
                        <td style={{ padding: '12px 16px', color: '#94A3B8', fontWeight: 600 }}>
                          {log.time || '—'}
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          <div style={{ fontWeight: 700, color: '#F8FAFC' }}>
                            {prod?.name || log.productId}
                          </div>
                          <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>
                            {prod?.brand} • {prod?.flavor}
                          </div>
                        </td>
                        <td style={{ padding: '12px 16px', fontWeight: 700, color: '#38BDF8' }}>
                          {log.volumeMl} ml
                        </td>
                        <td style={{ padding: '12px 16px', fontWeight: 800, color: '#F59E0B' }}>
                          {log.caffeineMg} mg
                        </td>
                        <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', border: '1px solid #242B3B', borderRadius: '5px', padding: '2px 5px', backgroundColor: '#14171F' }}>
                            <button onClick={() => handleModifyServing(idx, -1)} style={{ padding: '2px 4px', color: '#94A3B8' }} title="Minus one serving">
                              <Minus size={13} />
                            </button>
                            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#F8FAFC' }}>
                              {(log.volumeMl / (prod?.servingSize || 250)).toFixed(1)} can
                            </span>
                            <button onClick={() => handleModifyServing(idx, 1)} style={{ padding: '2px 4px', color: '#38BDF8' }} title="Plus one serving">
                              <Plus size={13} />
                            </button>
                          </div>
                        </td>
                        <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                          <button onClick={() => handleRemoveLog(idx)} style={{ color: '#EF4444', padding: '4px' }} title="Remove entry">
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  <tr style={{ backgroundColor: '#14171F', fontWeight: 800, color: '#F8FAFC' }}>
                    <td style={{ padding: '12px 16px' }}>Total</td>
                    <td style={{ padding: '12px 16px' }}>{totalDrinksToday} drink(s)</td>
                    <td style={{ padding: '12px 16px', color: '#38BDF8' }}>{totalVolumeToday} ml</td>
                    <td style={{ padding: '12px 16px', color: '#F59E0B' }}>{totalCaffeineToday} mg</td>
                    <td colSpan={2}></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        /* Weekly statistics */
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '22px' }}>
            <div className="rankit-card" style={{ padding: '18px' }}>
              <span style={{ fontSize: '0.78rem', color: '#94A3B8', fontWeight: 600 }}>Total Drinks (Week)</span>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#F8FAFC', marginTop: '4px' }}>
                {weeklyStats.totalWeeklyDrinks}
              </div>
            </div>

            <div className="rankit-card" style={{ padding: '18px' }}>
              <span style={{ fontSize: '0.78rem', color: '#94A3B8', fontWeight: 600 }}>Weekly Caffeine</span>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#F59E0B', marginTop: '4px' }}>
                {weeklyStats.totalWeeklyCaffeine} <span style={{ fontSize: '0.95rem' }}>mg</span>
              </div>
            </div>

            <div className="rankit-card" style={{ padding: '18px' }}>
              <span style={{ fontSize: '0.78rem', color: '#94A3B8', fontWeight: 600 }}>Daily Average</span>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#38BDF8', marginTop: '4px' }}>
                {weeklyStats.avgDailyCaffeine} <span style={{ fontSize: '0.95rem' }}>mg / day</span>
              </div>
            </div>
          </div>

          <div className="rankit-card" style={{ padding: '20px', marginBottom: '22px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#F8FAFC', marginBottom: '14px' }}>
              7-Day Caffeine Intake (mg)
            </h3>
            <div style={{ width: '100%', height: '260px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyStats.days} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="dayName" stroke="#94A3B8" fontSize={11} />
                  <YAxis stroke="#94A3B8" fontSize={11} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#14171F', borderRadius: '6px', color: '#F8FAFC', border: '1px solid #242B3B' }} 
                    formatter={(val) => [`${val} mg`, 'Caffeine']}
                  />
                  <ReferenceLine y={400} stroke="#EF4444" strokeDasharray="3 3" label={{ value: '400mg Limit', fill: '#EF4444', fontSize: 10 }} />
                  <Bar dataKey="caffeine" fill="#38BDF8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          LOG DRINK MODAL:
          EXACTLY 2 TABS ONLY: 1. 'My Favs' and 2. 'All Brands'
         ========================================================= */}
      {isAddDrinkModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(12, 14, 18, 0.75)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
          padding: '20px'
        }}>
          <div className="rankit-card" style={{ width: '100%', maxWidth: '520px', padding: '22px', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
            
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#F8FAFC' }}>
                  {isConfirmingDrink ? 'Confirm Serving Size' : 'Log Drink'}
                </h2>
                <p style={{ fontSize: '0.78rem', color: '#94A3B8' }}>
                  {isConfirmingDrink 
                    ? `Selected: ${chosenProduct.name}`
                    : 'Select from your favorites or choose a brand.'}
                </p>
              </div>
              <button onClick={() => setIsAddDrinkModalOpen(false)} style={{ color: '#94A3B8' }}>
                <X size={18} />
              </button>
            </div>

            {/* If NOT in Step 2 Volume Confirm, Show EXACTLY 2 Top Tabs */}
            {!isConfirmingDrink ? (
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
                {/* EXACTLY 2 TABS AT THE TOP: 'My Favs' and 'All Brands' */}
                <div style={{ display: 'flex', gap: '4px', backgroundColor: '#14171F', padding: '3px', borderRadius: '8px', border: '1px solid #242B3B', marginBottom: '14px' }}>
                  {/* TAB 1: MY FAVS */}
                  <button
                    onClick={() => {
                      setModalTab('favs');
                      setModalSelectedBrand(null);
                    }}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      padding: '8px 14px',
                      borderRadius: '6px',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      backgroundColor: modalTab === 'favs' ? '#1F2433' : 'transparent',
                      color: modalTab === 'favs' ? '#38BDF8' : '#94A3B8',
                      border: modalTab === 'favs' ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent'
                    }}
                  >
                    <Star size={14} color={modalTab === 'favs' ? '#F59E0B' : '#94A3B8'} fill={modalTab === 'favs' ? '#F59E0B' : 'none'} />
                    <span>My Favs ({favorites.length})</span>
                  </button>

                  {/* TAB 2: ALL BRANDS */}
                  <button
                    onClick={() => {
                      setModalTab('brands');
                    }}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      padding: '8px 14px',
                      borderRadius: '6px',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      backgroundColor: modalTab === 'brands' ? '#1F2433' : 'transparent',
                      color: modalTab === 'brands' ? '#38BDF8' : '#94A3B8',
                      border: modalTab === 'brands' ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent'
                    }}
                  >
                    <span>All Brands</span>
                  </button>
                </div>

                {/* TAB 1 CONTENT: MY FAVS */}
                {modalTab === 'favs' && (
                  <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {favoriteProducts.length === 0 ? (
                      <div style={{ textAlign: 'center', padding: '36px 20px', color: '#94A3B8' }}>
                        <Star size={28} color="#475569" style={{ margin: '0 auto 8px auto' }} />
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#F8FAFC' }}>No favorite drinks saved yet</h4>
                        <p style={{ fontSize: '0.78rem', marginTop: '3px' }}>
                          Star any drink in the brand list to add it to your favorites for instant 1-click logging!
                        </p>
                      </div>
                    ) : (
                      favoriteProducts.map((p) => {
                        const isFav = favorites.includes(p.id);
                        return (
                          <div
                            key={p.id}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '10px 14px',
                              borderRadius: '7px',
                              border: '1px solid #242B3B',
                              backgroundColor: '#14171F',
                              cursor: 'pointer'
                            }}
                            onClick={() => handleSelectProduct(p)}
                          >
                            <div>
                              <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#F8FAFC' }}>{p.name}</div>
                              <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>
                                {p.brand} • {p.flavor}
                              </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <div style={{ textAlign: 'right' }}>
                                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#F59E0B' }}>{p.caffeine} mg</span>
                                <div style={{ fontSize: '0.7rem', color: '#64748B' }}>{p.servingSize} ml</div>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onToggleFavorite(p.id);
                                }}
                                style={{ color: isFav ? '#F59E0B' : '#475569', padding: '4px' }}
                                title="Toggle favorite"
                              >
                                <Star size={16} fill={isFav ? '#F59E0B' : 'none'} />
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                )}

                {/* TAB 2 CONTENT: ALL BRANDS (Drill down inside the tab without creating an extra tab) */}
                {modalTab === 'brands' && (
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                    {!modalSelectedBrand ? (
                      /* 2A: List of all Brands ordered by Popularity */
                      <>
                        <div style={{ marginBottom: '10px' }}>
                          <input
                            type="text"
                            placeholder="Search brands (e.g. Red Bull, Monster, Celsius...)"
                            value={brandSearch}
                            onChange={(e) => setBrandSearch(e.target.value)}
                            style={{ width: '100%', padding: '8px 10px', border: '1px solid #242B3B', borderRadius: '6px', fontSize: '0.82rem', backgroundColor: '#14171F', color: '#F8FAFC' }}
                          />
                        </div>

                        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                          {filteredBrands.map((b) => (
                            <button
                              key={b.id}
                              onClick={() => {
                                setModalSelectedBrand(b);
                                setDrinkSearch('');
                              }}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '9px 12px',
                                borderRadius: '6px',
                                border: '1px solid #242B3B',
                                backgroundColor: '#14171F',
                                cursor: 'pointer',
                                textAlign: 'left'
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{
                                  fontSize: '0.72rem',
                                  fontWeight: 800,
                                  minWidth: '28px',
                                  padding: '2px 5px',
                                  borderRadius: '4px',
                                  backgroundColor: (b.popularityRank <= 25) ? 'rgba(245, 158, 11, 0.15)' : '#1F2433',
                                  color: (b.popularityRank <= 25) ? '#F59E0B' : '#94A3B8',
                                  textAlign: 'center'
                                }}>
                                  #{b.popularityRank || 99}
                                </span>
                                <div>
                                  <div style={{ fontWeight: 700, fontSize: '0.86rem', color: '#F8FAFC' }}>{b.name}</div>
                                  <div style={{ fontSize: '0.7rem', color: '#94A3B8' }}>{b.origin}</div>
                                </div>
                              </div>

                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 600, color: '#38BDF8' }}>
                                <span>Drinks</span>
                                <ArrowRightIcon size={13} />
                              </div>
                            </button>
                          ))}
                        </div>
                      </>
                    ) : (
                      /* 2B: Specific Drinks for the chosen Brand */
                      <>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                          <button
                            onClick={() => setModalSelectedBrand(null)}
                            className="btn-secondary"
                            style={{ padding: '5px 10px', fontSize: '0.75rem' }}
                          >
                            <ArrowLeft size={13} />
                            <span>Back to Brands</span>
                          </button>
                          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#38BDF8' }}>
                            {modalSelectedBrand.name} Drinks
                          </span>
                        </div>

                        <div style={{ marginBottom: '10px' }}>
                          <input
                            type="text"
                            placeholder={`Filter ${modalSelectedBrand.name} drinks...`}
                            value={drinkSearch}
                            onChange={(e) => setDrinkSearch(e.target.value)}
                            style={{ width: '100%', padding: '8px 10px', border: '1px solid #242B3B', borderRadius: '6px', fontSize: '0.82rem', backgroundColor: '#14171F', color: '#F8FAFC' }}
                          />
                        </div>

                        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          {filteredBrandDrinks.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '30px', color: '#94A3B8', fontSize: '0.82rem' }}>
                              No specific flavours recorded yet for {modalSelectedBrand.name}. You can add one anytime from the Catalog!
                            </div>
                          ) : (
                            filteredBrandDrinks.map((p) => {
                              const isFav = favorites.includes(p.id);
                              return (
                                <div
                                  key={p.id}
                                  onClick={() => handleSelectProduct(p)}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '10px 12px',
                                    borderRadius: '6px',
                                    border: '1px solid #242B3B',
                                    backgroundColor: '#14171F',
                                    cursor: 'pointer'
                                  }}
                                >
                                  <div>
                                    <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#F8FAFC' }}>{p.name}</div>
                                    <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>{p.flavor}</div>
                                  </div>

                                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{ textAlign: 'right' }}>
                                      <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#F59E0B' }}>{p.caffeine} mg</span>
                                      <div style={{ fontSize: '0.7rem', color: '#64748B' }}>{p.servingSize} ml</div>
                                    </div>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        onToggleFavorite(p.id);
                                      }}
                                      style={{ color: isFav ? '#F59E0B' : '#475569', padding: '4px' }}
                                      title="Add to My Favs"
                                    >
                                      <Star size={16} fill={isFav ? '#F59E0B' : 'none'} />
                                    </button>
                                  </div>
                                </div>
                              );
                            })
                          )}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            ) : (
              /* STEP 2: CONFIRM SERVING SIZE */
              <div>
                <div style={{
                  padding: '12px 14px',
                  backgroundColor: '#14171F',
                  borderRadius: '8px',
                  border: '1px solid #242B3B',
                  marginBottom: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#38BDF8', textTransform: 'uppercase' }}>
                      {chosenProduct.brand}
                    </span>
                    <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#F8FAFC' }}>
                      {chosenProduct.name}
                    </h4>
                    <span style={{ fontSize: '0.72rem', color: '#94A3B8' }}>
                      Standard: {chosenProduct.caffeine}mg per {chosenProduct.servingSize}ml
                    </span>
                  </div>
                  <button
                    onClick={() => setIsConfirmingDrink(false)}
                    style={{ fontSize: '0.75rem', color: '#38BDF8', fontWeight: 700 }}
                  >
                    Change Drink
                  </button>
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#F8FAFC', display: 'block', marginBottom: '6px' }}>
                    Select Volume Consumed
                  </label>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', marginBottom: '8px' }}>
                    {[
                      { label: 'Full Can', ml: chosenProduct.servingSize },
                      { label: 'Half Can', ml: Math.round(chosenProduct.servingSize / 2) },
                      { label: '250 ml Slim', ml: 250 },
                      { label: '355 ml 12oz', ml: 355 },
                      { label: '473 ml 16oz', ml: 473 },
                      { label: '500 ml Tall', ml: 500 }
                    ].map((btn, i) => {
                      const isSelected = !isCustom && consumedVolume === btn.ml;
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => {
                            setIsCustom(false);
                            setConsumedVolume(btn.ml);
                          }}
                          style={{
                            padding: '7px',
                            borderRadius: '5px',
                            border: isSelected ? '2px solid #38BDF8' : '1px solid #242B3B',
                            backgroundColor: isSelected ? 'rgba(56, 189, 248, 0.15)' : '#14171F',
                            color: isSelected ? '#38BDF8' : '#F8FAFC',
                            fontWeight: isSelected ? 800 : 600,
                            fontSize: '0.75rem'
                          }}
                        >
                          <div>{btn.label}</div>
                          <div style={{ fontSize: '0.68rem', color: '#94A3B8' }}>{btn.ml} ml</div>
                        </button>
                      );
                    })}
                  </div>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontWeight: 500, color: '#94A3B8', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={isCustom}
                      onChange={(e) => setIsCustom(e.target.checked)}
                    />
                    <span>Or enter custom millilitres</span>
                  </label>

                  {isCustom && (
                    <input
                      type="number"
                      placeholder="e.g. 180 ml"
                      min="1"
                      max="2000"
                      autoFocus
                      value={customVolume}
                      onChange={(e) => setCustomVolume(e.target.value)}
                      style={{ width: '100%', marginTop: '6px', padding: '7px 10px', border: '1px solid #38BDF8', borderRadius: '5px', fontSize: '0.82rem', backgroundColor: '#14171F', color: '#F8FAFC' }}
                    />
                  )}
                </div>

                {/* Calculation preview */}
                <div style={{
                  padding: '10px 14px',
                  backgroundColor: 'rgba(245, 158, 11, 0.12)',
                  borderRadius: '6px',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  marginBottom: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ fontSize: '0.8rem', color: '#F59E0B', fontWeight: 600 }}>
                    Caffeine Logged:
                  </span>
                  <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#F59E0B' }}>
                    {calculateCaffeine(chosenProduct, isCustom ? Number(customVolume) || 0 : consumedVolume)} mg
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                  <button type="button" onClick={() => setIsConfirmingDrink(false)} className="btn-secondary">
                    Back
                  </button>
                  <button type="button" onClick={handleConfirmDrink} className="btn-primary">
                    <Check size={15} />
                    <span>Log to Today</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
