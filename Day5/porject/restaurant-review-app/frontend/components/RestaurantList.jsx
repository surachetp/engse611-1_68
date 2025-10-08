import { useState, useEffect } from 'react';
import RestaurantCard from './RestaurantCard';
import SearchBar from './SearchBar';
import FilterPanel from './FilterPanel';
import { getRestaurants } from '../services/api';

function RestaurantList({ onSelectRestaurant }) {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minRating: '',
    priceRange: ''
  });

  useEffect(() => {
    // create a cancellable fetch to avoid setting state on unmounted component
    const controller = new AbortController();
    fetchRestaurants({ signal: controller.signal });
    return () => controller.abort();
  }, [filters]); // เรียกใหม่เมื่อ filters เปลี่ยน

  const fetchRestaurants = async (opts = {}) => {
    try {
      setLoading(true);
      setError(null);
      // call the API with current filters
      const result = await getRestaurants(filters, opts);

      // support different response shapes safely
      const data = result && (result.data || result.restaurants || result);
      if (Array.isArray(data)) {
        setRestaurants(data);
      } else if (data && typeof data === 'object') {
        // if API returned an object, try to extract array fields
        setRestaurants(data.items || data.results || []);
      } else {
        setRestaurants([]);
      }
      
    } catch (err) {
      if (err.name === 'AbortError') {
        // request was cancelled - don't set error state
        return;
      }
      setError('ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchTerm) => {
    setFilters({ ...filters, search: searchTerm });
  };

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  if (loading) return <div className="loading">กำลังโหลด...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="restaurant-list-container">
      <SearchBar onSearch={handleSearch} />
      <FilterPanel onFilterChange={handleFilterChange} filters={filters} />
      
      {restaurants.length === 0 ? (
        <p className="no-results">ไม่พบร้านอาหารที่ค้นหา</p>
      ) : (
        <div className="restaurant-grid">
          {restaurants.map(restaurant => (
            <RestaurantCard 
              key={restaurant.id}
              restaurant={restaurant}
              onClick={onSelectRestaurant}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default RestaurantList;