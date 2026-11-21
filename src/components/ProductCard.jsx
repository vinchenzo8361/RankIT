import React from 'react';
import { Zap, Droplets, Calendar, Sparkles } from 'lucide-react';

export default function ProductCard({ product, onClick, onSelect, selected = false, showAction = false, actionLabel = 'Select' }) {
  if (!product) return null;

  return (
    <div 
      className="rankit-card"
      onClick={() => onClick && onClick(product)}
      style={{
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        cursor: onClick ? 'pointer' : 'default',
        position: 'relative',
        border: selected ? '2px solid #4F46E5' : '1px solid #E2E8F0',
        backgroundColor: selected ? '#F5F7FF' : '#FFFFFF',
        height: '100%'
      }}
    >
      {/* Product Image and Badges */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '150px',
        backgroundColor: '#F1F5F9',
        borderRadius: '8px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <div style={{ fontSize: '2.5rem' }}>⚡</div>
        )}

        <div style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          alignItems: 'flex-end'
        }}>
          {product.isDiscontinued ? (
            <span className="badge badge-discontinued">Discontinued</span>
          ) : (
            <span className="badge badge-active">Available</span>
          )}
          {product.sugarFree && (
            <span className="badge" style={{ backgroundColor: '#F0FDFA', color: '#0D9488', border: '1px solid #99F6E4' }}>
              Zero Sugar
            </span>
          )}
        </div>
      </div>

      {/* Main Details */}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4F46E5', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          {product.brand}
        </div>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', marginTop: '2px', lineHeight: 1.3 }}>
          {product.name}
        </h3>
        {product.flavor && (
          <p style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '2px' }}>
            {product.flavor}
          </p>
        )}
      </div>

      {/* Stats Footnote (Caffeine & Serving) */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '10px',
        borderTop: '1px solid #F1F5F9',
        fontSize: '0.78rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#0F172A', fontWeight: 600 }}>
          <Zap size={14} color="#F59E0B" />
          <span>{product.caffeine} mg</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#64748B' }}>
          <Droplets size={14} color="#3B82F6" />
          <span>{product.servingSize} ml</span>
        </div>
      </div>

      {showAction && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onSelect) onSelect(product);
          }}
          className={selected ? 'btn-primary' : 'btn-secondary'}
          style={{ width: '100%', justifyContent: 'center', marginTop: '4px', padding: '6px' }}
        >
          {selected ? 'Added ✓' : actionLabel}
        </button>
      )}
    </div>
  );
}
