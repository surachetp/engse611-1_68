import { useState, useEffect } from 'react';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  // ========================================
  // Debounce effect
  // อธิบาย:
  // - ป้องกันการเรียก API ซ้ำๆ ตอนพิมพ์
  // - รอ 500ms หลังผู้ใช้พิมพ์เสร็จ จึงเรียก onSearch
  // ========================================
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== undefined) {
        onSearch(searchTerm);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, onSearch]);

  // ========================================
  // ส่งคำค้นทันทีเมื่อกดปุ่มค้นหา
  // ========================================
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  // ========================================
  // ล้าง input และเรียก search ใหม่
  // ========================================
  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit} style={{
      display: 'flex',
      gap: '0.5rem',
      alignItems: 'center',
      marginBottom: '1rem',
      background: 'rgba(255,255,255,0.7)',
      backdropFilter: 'blur(6px)',
      borderRadius: '12px',
      padding: '0.5rem 1rem',
      boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
      animation: 'fadeIn 0.6s ease'
    }}>
      {/* ========================================
          Input field + Clear button
      ======================================== */}
      <div style={{ position: 'relative', flex: 1 }}>
        <input
          type="text"
          placeholder="ค้นหาร้านอาหาร..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
          style={{
            width: '100%',
            padding: '0.5rem 2.5rem 0.5rem 0.75rem',
            borderRadius: '8px',
            border: '1px solid #ddd',
            outline: 'none',
            fontSize: '1rem',
            background: 'rgba(255,255,255,0.9)',
            transition: 'all 0.3s ease'
          }}
        />
        {searchTerm && (
          <button 
            type="button" 
            onClick={handleClear}
            className="clear-button"
            aria-label="Clear search"
            style={{
              position: 'absolute',
              right: '0.5rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'transparent',
              border: 'none',
              fontSize: '1rem',
              cursor: 'pointer',
              color: '#888'
            }}
          >
            ✕
          </button>
        )}
      </div>

      {/* ========================================
          Submit button
      ======================================== */}
      <button type="submit" className="search-button" style={{
        padding: '0.5rem 1.25rem',
        borderRadius: '8px',
        border: 'none',
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        color: 'white',
        fontWeight: '600',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(102,126,234,0.3)',
        transition: 'all 0.3s ease'
      }}>
        🔍 ค้นหา
      </button>
    </form>
  );
}

export default SearchBar;
