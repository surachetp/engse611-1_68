import { useState, useEffect } from 'react';
import RestaurantCard from './RestaurantCard';
import SearchBar from './SearchBar';
import FilterPanel from './FilterPanel';
import { getRestaurants } from '../services/api';

function RestaurantList({ onSelectRestaurant }) {
  // ========================================
  // State สำหรับร้านอาหาร, loading, error, filters
  // ========================================
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minRating: '',
    priceRange: ''
  });

  // ========================================
  // useEffect: เรียก fetchRestaurants ทุกครั้งที่ filters เปลี่ยน
  // ========================================
  useEffect(() => {
    fetchRestaurants();
  }, [filters]);

  // ========================================
  // ฟังก์ชันดึงข้อมูลร้านอาหารจาก API
  // ========================================
  const fetchRestaurants = async () => {
    try {
      setLoading(true); // เริ่ม loading
      setError(null);   // รีเซ็ต error

      // 1️⃣ เรียก API พร้อม filters
      const result = await getRestaurants(filters);

      // 2️⃣ ตั้งค่า state restaurants
      setRestaurants(result.data);

    } catch (err) {
      setError('ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่อีกครั้ง');
      console.error('RestaurantList fetch error:', err);
    } finally {
      setLoading(false); // จบ loading
    }
  };

  // ========================================
  // ฟังก์ชัน handleSearch: รับค่า search จาก SearchBar
  // ========================================
  const handleSearch = (searchTerm) => {
    setFilters(prev => ({ ...prev, search: searchTerm }));
  };

  // ========================================
  // ฟังก์ชัน handleFilterChange: รับค่าตัวกรองจาก FilterPanel
  // ========================================
  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="restaurant-list-container">
      {/* Search Bar */}
      <SearchBar onSearch={handleSearch} />

      {/* Filter Panel */}
      <FilterPanel onFilterChange={handleFilterChange} filters={filters} />

      {/* Loading / Error */}
      {loading && <div className="loading">กำลังโหลด...</div>}
      {error && <div className="error">{error}</div>}

      {/* แสดงผลร้านอาหาร */}
      {!loading && !error && (
        <>
          {restaurants.length === 0 ? (
            // กรณีไม่พบร้านอาหาร
            <p className="no-results" style={{ textAlign: 'center', marginTop: '2rem', color: '#666' }}>
              ไม่พบร้านอาหารที่ค้นหา ลองเปลี่ยนคำค้นหาหรือตัวกรองดูนะครับ
            </p>
          ) : (
            // Grid ร้านอาหาร
            <div className="restaurant-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '1.5rem',
              marginTop: '1rem',
              animation: 'fadeIn 0.8s ease'
            }}>
              {restaurants.map(restaurant => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  onClick={onSelectRestaurant}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default RestaurantList;
