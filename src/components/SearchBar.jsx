import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange, placeholder = 'Search energy drinks, brands, flavours...', onClear }) {
  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      maxWidth: '480px'
    }}>
      <Search 
        size={18} 
        color="#94A3B8" 
        style={{ position: 'absolute', left: '14px', pointerEvents: 'none' }} 
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '10px 38px 10px 42px',
          backgroundColor: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '10px',
          fontSize: '0.875rem',
          outline: 'none',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          transition: 'all 0.15s ease'
        }}
        onFocus={(e) => {
          e.target.style.borderColor = '#4F46E5';
          e.target.style.boxShadow = '0 0 0 3px rgba(79, 70, 229, 0.12)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = '#E2E8F0';
          e.target.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
        }}
      />
      {value && (
        <button
          onClick={() => {
            onChange('');
            if (onClear) onClear();
          }}
          style={{
            position: 'absolute',
            right: '12px',
            color: '#94A3B8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
