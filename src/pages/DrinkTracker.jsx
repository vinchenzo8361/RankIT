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
  Check
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
import { calculateCaffeine, COMMON_VOLUMES } from '../utils/caffeine';

export default function DrinkTracker({ products, drinkLogs, onSaveLogs }) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isAddDrinkModalOpen, setIsAddDrinkModalOpen] = useState(false);
  const [activeViewTab, setActiveViewTab] = useState('daily'); // 'daily' | 'weekly'

  // Modal Step State: step 1 = Select Drink, step 2 = Select Volume & Confirm
  const [modalStep, setModalStep] = useState(1);
  const [drinkSearch, setDrinkSearch] = useState('');
  const [selectedBrandFilter, setSelectedBrandFilter] = useState('all');
  const [chosenProduct, setChosenProduct] = useState(null);
  const [consumedVolume, setConsumedVolume] = useState(250);
  const [customVolume, setCustomVolume] = useState('');
  const [isCustom, setIsCustom] = useState(false);

  // Helper map
  const productsMap = {};
  products.forEach((p) => { productsMap[p.id] = p; });

  // Get unique brands list for filtering modal
  const uniqueBrands = Array.from(new Set(products.map((p) => p.brand))).sort();

  // Filtered drinks in modal search
  const filteredModalProducts = products.filter((p) => {
    const matchesSearch = 
      p.name.toLowerCase().includes(drinkSearch.toLowerCase()) ||
      (p.flavor && p.flavor.toLowerCase().includes(drinkSearch.toLowerCase())) ||
      p.brand.toLowerCase().includes(drinkSearch.toLowerCase());
    const matchesBrand = selectedBrandFilter === 'all' || p.brand === selectedBrandFilter;
    return matchesSearch && matchesBrand;
  });

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
    setModalStep(1);
    setDrinkSearch('');
    setSelectedBrandFilter('all');
    setChosenProduct(null);
    setIsCustom(false);
    setCustomVolume('');
    setIsAddDrinkModalOpen(true);
  };

  const handleSelectProduct = (prod) => {
    setChosenProduct(prod);
    setConsumedVolume(prod.servingSize || 250);
    setModalStep(2);
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

  // Weekly calculations
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
    const avgDailyDrinks = (totalWeeklyDrinks / 7).toFixed(1);

    return {
      days: result,
      totalWeeklyCaffeine,
      totalWeeklyDrinks,
      avgDailyCaffeine,
      avgDailyDrinks
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
        <div style={{ display: 'flex', gap: '8px', backgroundColor: '#E2E8F0', padding: '4px', borderRadius: '10px' }}>
          <button
            onClick={() => setActiveViewTab('daily')}
            style={{
              padding: '8px 18px',
              borderRadius: '8px',
              fontSize: '0.875rem',
              fontWeight: 700,
              backgroundColor: activeViewTab === 'daily' ? '#FFFFFF' : 'transparent',
              color: activeViewTab === 'daily' ? '#4F46E5' : '#64748B',
              boxShadow: activeViewTab === 'daily' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            Daily Tracker
          </button>
          <button
            onClick={() => setActiveViewTab('weekly')}
            style={{
              padding: '8px 18px',
              borderRadius: '8px',
              fontSize: '0.875rem',
              fontWeight: 700,
              backgroundColor: activeViewTab === 'weekly' ? '#FFFFFF' : 'transparent',
              color: activeViewTab === 'weekly' ? '#4F46E5' : '#64748B',
              boxShadow: activeViewTab === 'weekly' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            Weekly Statistics
          </button>
        </div>

        {/* Date Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#FFFFFF', padding: '6px 12px', borderRadius: '10px', border: '1px solid #CBD5E1' }}>
          <button onClick={() => shiftDate(-1)} style={{ padding: '4px', color: '#64748B' }} title="Previous Day">
            <ChevronLeft size={18} />
          </button>
          <CalendarIcon size={16} color="#4F46E5" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{ border: 'none', fontWeight: 700, fontSize: '0.875rem', color: '#0F172A', outline: 'none', cursor: 'pointer' }}
          />
          <button onClick={() => shiftDate(1)} style={{ padding: '4px', color: '#64748B' }} title="Next Day">
            <ChevronRight size={18} />
          </button>
          <button
            onClick={() => setSelectedDate(new Date().toISOString().split('T')[0])}
            style={{ fontSize: '0.75rem', color: '#4F46E5', fontWeight: 700, marginLeft: '6px' }}
          >
            Today
          </button>
        </div>
      </div>

      {activeViewTab === 'daily' ? (
        <div>
          {/* Daily Summary Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            <div className="rankit-card" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748B', fontSize: '0.82rem', fontWeight: 700 }}>
                <Coffee size={16} color="#4F46E5" />
                <span>Drinks Consumed</span>
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A', marginTop: '6px' }}>
                {totalDrinksToday}
              </div>
              <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Logged entries for this date</span>
            </div>

            <div className="rankit-card" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748B', fontSize: '0.82rem', fontWeight: 700 }}>
                <Zap size={16} color="#F59E0B" />
                <span>Estimated Caffeine</span>
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: totalCaffeineToday > 400 ? '#EF4444' : '#F59E0B', marginTop: '6px' }}>
                {totalCaffeineToday} <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>mg</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: totalCaffeineToday > 400 ? '#EF4444' : '#10B981', fontWeight: 600 }}>
                {totalCaffeineToday > 400 ? '⚠️ Exceeds 400mg FDA guidance' : '✓ Safe daily intake'}
              </span>
            </div>

            <div className="rankit-card" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748B', fontSize: '0.82rem', fontWeight: 700 }}>
                <Droplets size={16} color="#3B82F6" />
                <span>Liquid Volume</span>
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#3B82F6', marginTop: '6px' }}>
                {totalVolumeToday} <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>ml</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Total liquid intake</span>
            </div>
          </div>

          {/* Action Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>
              Logged Drinks for {selectedDate}
            </h3>
            <button onClick={openLogModal} className="btn-primary">
              <Plus size={18} />
              <span>Log Drink</span>
            </button>
          </div>

          {/* Drink List */}
          {todayLogs.length === 0 ? (
            <div className="rankit-card" style={{ padding: '48px', textAlign: 'center', color: '#64748B' }}>
              <Coffee size={36} color="#CBD5E1" style={{ margin: '0 auto 12px auto' }} />
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A' }}>No drinks logged for this date</h4>
              <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>Click "Log Drink" above to record what you drank and calculate your caffeine.</p>
            </div>
          ) : (
            <div className="rankit-card" style={{ overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontWeight: 700 }}>
                    <th style={{ padding: '14px 20px' }}>Time</th>
                    <th style={{ padding: '14px 20px' }}>Drink</th>
                    <th style={{ padding: '14px 20px' }}>Volume</th>
                    <th style={{ padding: '14px 20px' }}>Caffeine</th>
                    <th style={{ padding: '14px 20px', textAlign: 'center' }}>Servings</th>
                    <th style={{ padding: '14px 20px', textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {todayLogs.map((log, idx) => {
                    const prod = productsMap[log.productId];
                    return (
                      <tr key={log.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                        <td style={{ padding: '14px 20px', color: '#64748B', fontWeight: 600 }}>
                          {log.time || '—'}
                        </td>
                        <td style={{ padding: '14px 20px' }}>
                          <div style={{ fontWeight: 700, color: '#0F172A' }}>
                            {prod?.name || log.productId}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                            {prod?.brand} • {prod?.flavor}
                          </div>
                        </td>
                        <td style={{ padding: '14px 20px', fontWeight: 700, color: '#3B82F6' }}>
                          {log.volumeMl} ml
                        </td>
                        <td style={{ padding: '14px 20px', fontWeight: 800, color: '#F59E0B' }}>
                          {log.caffeineMg} mg
                        </td>
                        <td style={{ padding: '14px 20px', textAlign: 'center' }}>
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1px solid #CBD5E1', borderRadius: '6px', padding: '2px 6px', backgroundColor: '#FFFFFF' }}>
                            <button onClick={() => handleModifyServing(idx, -1)} style={{ padding: '2px 6px', color: '#64748B' }} title="Minus one serving">
                              <Minus size={14} />
                            </button>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0F172A' }}>
                              {(log.volumeMl / (prod?.servingSize || 250)).toFixed(1)} can
                            </span>
                            <button onClick={() => handleModifyServing(idx, 1)} style={{ padding: '2px 6px', color: '#4F46E5' }} title="Plus one serving">
                              <Plus size={14} />
                            </button>
                          </div>
                        </td>
                        <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                          <button onClick={() => handleRemoveLog(idx)} style={{ color: '#EF4444', padding: '4px' }} title="Remove entry">
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  <tr style={{ backgroundColor: '#F8FAFC', fontWeight: 800, color: '#0F172A' }}>
                    <td style={{ padding: '14px 20px' }}>Total</td>
                    <td style={{ padding: '14px 20px' }}>{totalDrinksToday} drink(s)</td>
                    <td style={{ padding: '14px 20px', color: '#3B82F6' }}>{totalVolumeToday} ml</td>
                    <td style={{ padding: '14px 20px', color: '#F59E0B' }}>{totalCaffeineToday} mg</td>
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            <div className="rankit-card" style={{ padding: '20px' }}>
              <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 700 }}>Total Drinks (Week)</span>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A', marginTop: '6px' }}>
                {weeklyStats.totalWeeklyDrinks}
              </div>
            </div>

            <div className="rankit-card" style={{ padding: '20px' }}>
              <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 700 }}>Weekly Caffeine</span>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#F59E0B', marginTop: '6px' }}>
                {weeklyStats.totalWeeklyCaffeine} <span style={{ fontSize: '1rem' }}>mg</span>
              </div>
            </div>

            <div className="rankit-card" style={{ padding: '20px' }}>
              <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 700 }}>Daily Average</span>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#4F46E5', marginTop: '6px' }}>
                {weeklyStats.avgDailyCaffeine} <span style={{ fontSize: '1rem' }}>mg / day</span>
              </div>
            </div>
          </div>

          <div className="rankit-card" style={{ padding: '24px', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', marginBottom: '16px' }}>
              7-Day Caffeine Consumption (mg)
            </h3>
            <div style={{ width: '100%', height: '280px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyStats.days} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="dayName" stroke="#64748B" fontSize={12} />
                  <YAxis stroke="#64748B" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0F172A', borderRadius: '8px', color: '#FFFFFF', border: 'none' }} 
                    formatter={(val) => [`${val} mg`, 'Caffeine']}
                  />
                  <ReferenceLine y={400} stroke="#EF4444" strokeDasharray="3 3" label={{ value: '400mg Limit', fill: '#EF4444', fontSize: 11 }} />
                  <Bar dataKey="caffeine" fill="#4F46E5" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          SIMPLIFIED 2-STEP LOG DRINK MODAL
          Step 1: Clean search & click to choose drink
          Step 2: Simple volume selector & confirm
         ========================================================= */}
      {isAddDrinkModalOpen && (
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
          <div className="rankit-card" style={{ width: '100%', maxWidth: '520px', padding: '24px', maxHeight: '90vh', overflowY: 'auto' }}>
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>
                  {modalStep === 1 ? 'Step 1: Choose What You Drank' : 'Step 2: Confirm Amount'}
                </h2>
                <p style={{ fontSize: '0.78rem', color: '#64748B' }}>
                  {modalStep === 1 ? 'Search or pick an energy drink from the catalog' : 'Adjust the volume consumed to calculate exact caffeine'}
                </p>
              </div>
              <button onClick={() => setIsAddDrinkModalOpen(false)} style={{ color: '#64748B' }}>
                <X size={20} />
              </button>
            </div>

            {/* STEP 1: PICK DRINK */}
            {modalStep === 1 ? (
              <div>
                {/* Search & Brand Filter */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
                  <div style={{ position: 'relative', flex: 1 }}>
                    <Search size={16} color="#94A3B8" style={{ position: 'absolute', left: '10px', top: '11px' }} />
                    <input
                      type="text"
                      autoFocus
                      placeholder="Type drink or flavour name..."
                      value={drinkSearch}
                      onChange={(e) => setDrinkSearch(e.target.value)}
                      style={{ width: '100%', padding: '8px 12px 8px 32px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                    />
                  </div>
                  <select
                    value={selectedBrandFilter}
                    onChange={(e) => setSelectedBrandFilter(e.target.value)}
                    style={{ padding: '8px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.8rem', backgroundColor: '#FFFFFF' }}
                  >
                    <option value="all">All Brands</option>
                    {uniqueBrands.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                {/* Clean Scrollable List of Drinks */}
                <div style={{ maxHeight: '340px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {filteredModalProducts.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '30px', color: '#94A3B8', fontSize: '0.85rem' }}>
                      No matching drinks found. Try a different search term.
                    </div>
                  ) : (
                    filteredModalProducts.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => handleSelectProduct(p)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          border: '1px solid #E2E8F0',
                          backgroundColor: '#FFFFFF',
                          textAlign: 'left',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#EEF2FF';
                          e.currentTarget.style.borderColor = '#4F46E5';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#FFFFFF';
                          e.currentTarget.style.borderColor = '#E2E8F0';
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0F172A' }}>{p.name}</div>
                          <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                            {p.brand} • {p.flavor}
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#F59E0B' }}>{p.caffeine} mg</span>
                          <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>{p.servingSize} ml</div>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            ) : (
              /* STEP 2: CONFIRM VOLUME & LOG */
              <div>
                {/* Selected Product Summary Card */}
                <div style={{
                  padding: '14px',
                  backgroundColor: '#F8FAFC',
                  borderRadius: '10px',
                  border: '1px solid #E2E8F0',
                  marginBottom: '18px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#4F46E5', textTransform: 'uppercase' }}>
                      {chosenProduct.brand}
                    </span>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A' }}>
                      {chosenProduct.name}
                    </h4>
                    <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                      Standard: {chosenProduct.caffeine}mg per {chosenProduct.servingSize}ml
                    </span>
                  </div>
                  <button
                    onClick={() => setModalStep(1)}
                    style={{ fontSize: '0.75rem', color: '#4F46E5', fontWeight: 700 }}
                  >
                    Change Drink
                  </button>
                </div>

                {/* Amount selector */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '8px' }}>
                    Select Serving Size
                  </label>
                  
                  {/* Preset Buttons */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '10px' }}>
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
                            padding: '8px',
                            borderRadius: '6px',
                            border: isSelected ? '2px solid #4F46E5' : '1px solid #CBD5E1',
                            backgroundColor: isSelected ? '#EEF2FF' : '#FFFFFF',
                            color: isSelected ? '#4F46E5' : '#0F172A',
                            fontWeight: isSelected ? 800 : 600,
                            fontSize: '0.78rem'
                          }}
                        >
                          <div>{btn.label}</div>
                          <div style={{ fontSize: '0.7rem', color: '#64748B' }}>{btn.ml} ml</div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom ml toggle */}
                  <div style={{ marginTop: '10px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
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
                        placeholder="e.g. 150 ml"
                        min="1"
                        max="2000"
                        autoFocus
                        value={customVolume}
                        onChange={(e) => setCustomVolume(e.target.value)}
                        style={{ width: '100%', marginTop: '8px', padding: '8px 12px', border: '2px solid #4F46E5', borderRadius: '6px', fontSize: '0.85rem' }}
                      />
                    )}
                  </div>
                </div>

                {/* Calculation Preview */}
                <div style={{
                  padding: '12px 16px',
                  backgroundColor: '#FEF3C7',
                  borderRadius: '8px',
                  border: '1px solid #FDE68A',
                  marginBottom: '20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ fontSize: '0.85rem', color: '#92400E', fontWeight: 600 }}>
                    Caffeine Logged:
                  </span>
                  <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#B45309' }}>
                    {calculateCaffeine(chosenProduct, isCustom ? Number(customVolume) || 0 : consumedVolume)} mg
                  </span>
                </div>

                {/* Modal Buttons */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                  <button type="button" onClick={() => setModalStep(1)} className="btn-secondary">
                    Back
                  </button>
                  <button type="button" onClick={handleConfirmDrink} className="btn-primary">
                    <Check size={16} />
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
