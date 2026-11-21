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
  AlertCircle,
  BarChart3
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
  // Current date tracking
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isAddDrinkModalOpen, setIsAddDrinkModalOpen] = useState(false);
  const [activeViewTab, setActiveViewTab] = useState('daily'); // 'daily' | 'weekly'

  // Modal form state
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || '');
  const [consumedVolume, setConsumedVolume] = useState(250);
  const [customVolume, setCustomVolume] = useState('');
  const [isCustom, setIsCustom] = useState(false);

  // Helper map
  const productsMap = {};
  products.forEach((p) => { productsMap[p.id] = p; });

  const currentProduct = productsMap[selectedProductId];

  // Daily logs for selected date
  const todayLogs = drinkLogs[selectedDate] || [];

  // Calculations for current date
  const totalDrinksToday = todayLogs.length;
  const totalCaffeineToday = todayLogs.reduce((acc, curr) => acc + (curr.caffeineMg || 0), 0);
  const totalVolumeToday = todayLogs.reduce((acc, curr) => acc + (curr.volumeMl || 0), 0);

  // Date shifting
  const shiftDate = (days) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + days);
    setSelectedDate(d.toISOString().split('T')[0]);
  };

  // Add Drink Submission
  const handleAddDrinkSubmit = (e) => {
    e.preventDefault();
    if (!currentProduct) return;

    const volume = isCustom ? Number(customVolume) || currentProduct.servingSize : Number(consumedVolume);
    const caffeineCalculated = calculateCaffeine(currentProduct, volume);

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newEntry = {
      id: `log-${Date.now()}`,
      productId: currentProduct.id,
      volumeMl: volume,
      caffeineMg: caffeineCalculated,
      time: timeStr
    };

    const updatedDateLogs = [...todayLogs, newEntry];
    const newDrinkLogs = {
      ...drinkLogs,
      [selectedDate]: updatedDateLogs
    };

    onSaveLogs(newDrinkLogs);
    setIsAddDrinkModalOpen(false);
    setIsCustom(false);
  };

  // 5.3 Plus / Minus Controls
  const handleModifyServing = (index, delta) => {
    const item = todayLogs[index];
    if (!item) return;

    const prod = productsMap[item.productId];
    if (!prod) return;

    // A serving step equals standard serving size
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

  // ==========================================
  // 5.4 Weekly Statistics Calculation
  // ==========================================
  // Generate 7 days ending at selectedDate
  const getWeeklyData = () => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const result = [];
    const base = new Date(selectedDate);

    // Show current week Mon - Sun
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
        {/* Daily vs Weekly View */}
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

        {/* Date Selector with Next / Prev controls */}
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

      {/* =========================================================
          SECTION 5.1 — DAILY TRACKER VIEW
         ========================================================= */}
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
                <span>Total Estimated Caffeine</span>
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: totalCaffeineToday > 400 ? '#EF4444' : '#F59E0B', marginTop: '6px' }}>
                {totalCaffeineToday} <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>mg</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: totalCaffeineToday > 400 ? '#EF4444' : '#10B981', fontWeight: 600 }}>
                {totalCaffeineToday > 400 ? '⚠️ Exceeds 400mg FDA daily guidance' : '✓ Within typical 400mg daily guidance'}
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
            <button
              onClick={() => setIsAddDrinkModalOpen(true)}
              className="btn-primary"
            >
              <Plus size={18} />
              <span>Add Drink</span>
            </button>
          </div>

          {/* Drink List Table */}
          {todayLogs.length === 0 ? (
            <div className="rankit-card" style={{ padding: '48px', textAlign: 'center', color: '#64748B' }}>
              <Coffee size={36} color="#CBD5E1" style={{ margin: '0 auto 12px auto' }} />
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A' }}>No drinks logged for this date</h4>
              <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>Click "Add Drink" to log an energy drink and calculate your caffeine.</p>
            </div>
          ) : (
            <div className="rankit-card" style={{ overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontWeight: 700 }}>
                    <th style={{ padding: '14px 20px' }}>Time</th>
                    <th style={{ padding: '14px 20px' }}>Drink</th>
                    <th style={{ padding: '14px 20px' }}>Volume</th>
                    <th style={{ padding: '14px 20px' }}>Caffeine Contribution</th>
                    <th style={{ padding: '14px 20px', textAlign: 'center' }}>Serving Controls</th>
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
                            <button
                              onClick={() => handleModifyServing(idx, -1)}
                              style={{ padding: '2px 6px', color: '#64748B' }}
                              title="Minus one serving"
                            >
                              <Minus size={14} />
                            </button>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0F172A' }}>
                              {(log.volumeMl / (prod?.servingSize || 250)).toFixed(1)} can
                            </span>
                            <button
                              onClick={() => handleModifyServing(idx, 1)}
                              style={{ padding: '2px 6px', color: '#4F46E5' }}
                              title="Plus one serving"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </td>
                        <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                          <button
                            onClick={() => handleRemoveLog(idx)}
                            style={{ color: '#EF4444', padding: '4px' }}
                            title="Remove entire entry"
                          >
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
        /* =========================================================
           SECTION 5.4 — WEEKLY STATISTICS & 7-DAY BAR CHART
           ========================================================= */
        <div>
          {/* Weekly Summary Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            <div className="rankit-card" style={{ padding: '20px' }}>
              <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 700 }}>Total Drinks (Week)</span>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A', marginTop: '6px' }}>
                {weeklyStats.totalWeeklyDrinks}
              </div>
              <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Across 7 days</span>
            </div>

            <div className="rankit-card" style={{ padding: '20px' }}>
              <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 700 }}>Total Weekly Caffeine</span>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#F59E0B', marginTop: '6px' }}>
                {weeklyStats.totalWeeklyCaffeine} <span style={{ fontSize: '1rem' }}>mg</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Historical consumption</span>
            </div>

            <div className="rankit-card" style={{ padding: '20px' }}>
              <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 700 }}>Daily Caffeine Average</span>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#4F46E5', marginTop: '6px' }}>
                {weeklyStats.avgDailyCaffeine} <span style={{ fontSize: '1rem' }}>mg / day</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Avg {weeklyStats.avgDailyDrinks} drinks / day</span>
            </div>
          </div>

          {/* 7-Day Bar Chart */}
          <div className="rankit-card" style={{ padding: '24px', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BarChart3 size={18} color="#4F46E5" />
              <span>7-Day Caffeine Consumption (mg)</span>
            </h3>

            <div style={{ width: '100%', height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyStats.days} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="dayName" stroke="#64748B" fontSize={12} />
                  <YAxis stroke="#64748B" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0F172A', borderRadius: '8px', color: '#FFFFFF', border: 'none' }} 
                    formatter={(val) => [`${val} mg`, 'Caffeine']}
                    labelFormatter={(label, payload) => payload?.[0]?.payload?.dateStr || label}
                  />
                  <ReferenceLine y={400} stroke="#EF4444" strokeDasharray="3 3" label={{ value: '400mg Guidance', fill: '#EF4444', fontSize: 11 }} />
                  <Bar dataKey="caffeine" fill="#4F46E5" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 7-Day Breakdown Table as Specified */}
          <div className="rankit-card" style={{ overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontWeight: 700 }}>
                  <th style={{ padding: '14px 20px' }}>Day</th>
                  <th style={{ padding: '14px 20px' }}>Date</th>
                  <th style={{ padding: '14px 20px' }}>Drinks</th>
                  <th style={{ padding: '14px 20px' }}>Caffeine (mg)</th>
                  <th style={{ padding: '14px 20px', textAlign: 'right' }}>Jump to Date</th>
                </tr>
              </thead>
              <tbody>
                {weeklyStats.days.map((d) => (
                  <tr key={d.dateStr} style={{ borderBottom: '1px solid #F1F5F9', backgroundColor: d.isSelected ? '#EEF2FF' : 'transparent' }}>
                    <td style={{ padding: '14px 20px', fontWeight: 700, color: d.isSelected ? '#4F46E5' : '#0F172A' }}>
                      {d.dayName} {d.isToday && '(Today)'}
                    </td>
                    <td style={{ padding: '14px 20px', color: '#64748B' }}>
                      {d.dateStr}
                    </td>
                    <td style={{ padding: '14px 20px', fontWeight: 600 }}>
                      {d.drinks}
                    </td>
                    <td style={{ padding: '14px 20px', fontWeight: 800, color: d.caffeine > 0 ? '#F59E0B' : '#94A3B8' }}>
                      {d.caffeine} mg
                    </td>
                    <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                      <button
                        onClick={() => {
                          setSelectedDate(d.dateStr);
                          setActiveViewTab('daily');
                        }}
                        className="btn-secondary"
                        style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                      >
                        Inspect Log
                      </button>
                    </td>
                  </tr>
                ))}
                <tr style={{ backgroundColor: '#F8FAFC', fontWeight: 800, color: '#0F172A' }}>
                  <td style={{ padding: '14px 20px' }}>Total Weekly</td>
                  <td>—</td>
                  <td style={{ padding: '14px 20px' }}>{weeklyStats.totalWeeklyDrinks} drinks</td>
                  <td style={{ padding: '14px 20px', color: '#F59E0B' }}>{weeklyStats.totalWeeklyCaffeine} mg</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5.2 Add Drink Modal with Volume & Formula Selection */}
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
          <form onSubmit={handleAddDrinkSubmit} className="rankit-card" style={{ width: '100%', maxWidth: '480px', padding: '28px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '16px' }}>
              Log Drink Intake
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '6px' }}>
                  Select Drink from Catalog *
                </label>
                <select
                  value={selectedProductId}
                  onChange={(e) => {
                    setSelectedProductId(e.target.value);
                    const p = productsMap[e.target.value];
                    if (p) setConsumedVolume(p.servingSize);
                  }}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.875rem', backgroundColor: '#FFFFFF' }}
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.brand} — {p.name} ({p.caffeine}mg / {p.servingSize}ml)
                    </option>
                  ))}
                </select>
              </div>

              {/* Volume Selection Options */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '6px' }}>
                  Consumed Volume Selection
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <select
                    disabled={isCustom}
                    value={consumedVolume}
                    onChange={(e) => setConsumedVolume(Number(e.target.value))}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.875rem', backgroundColor: isCustom ? '#F1F5F9' : '#FFFFFF' }}
                  >
                    {COMMON_VOLUMES.map((v) => (
                      <option key={v.value} value={v.value}>{v.label}</option>
                    ))}
                    {currentProduct && !COMMON_VOLUMES.some((x) => x.value === currentProduct.servingSize) && (
                      <option value={currentProduct.servingSize}>
                        Standard Can Size ({currentProduct.servingSize} ml)
                      </option>
                    )}
                  </select>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', fontWeight: 600, color: '#475569' }}>
                    <input
                      type="checkbox"
                      checked={isCustom}
                      onChange={(e) => setIsCustom(e.target.checked)}
                    />
                    <span>Enter custom volume in millilitres</span>
                  </label>

                  {isCustom && (
                    <input
                      type="number"
                      placeholder="e.g. 180"
                      min="1"
                      max="2000"
                      value={customVolume}
                      onChange={(e) => setCustomVolume(e.target.value)}
                      style={{ width: '100%', padding: '8px 12px', border: '1px solid #4F46E5', borderRadius: '8px', fontSize: '0.875rem' }}
                    />
                  )}
                </div>
              </div>

              {/* Dynamic Formula Calculation Preview */}
              {currentProduct && (
                <div style={{ padding: '14px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600, marginBottom: '4px' }}>
                    Calculated Intake Preview:
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.85rem', color: '#0F172A' }}>
                      Volume: <strong>{isCustom ? customVolume || 0 : consumedVolume} ml</strong>
                    </span>
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#F59E0B' }}>
                      ≈ {calculateCaffeine(currentProduct, isCustom ? Number(customVolume) || 0 : consumedVolume)} mg caffeine
                    </span>
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setIsAddDrinkModalOpen(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Log Consumption
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
