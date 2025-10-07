import { useState, useEffect } from 'react';
import ReviewList from './ReviewList';
import ReviewForm from './ReviewForm';
import { getRestaurantById, getReviewsByRestaurant } from '../services/api';

function RestaurantDetail({ restaurantId, onBack }) {
  const [restaurant, setRestaurant] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    fetchData({ signal: controller.signal });
    return () => controller.abort();
  }, [restaurantId]);

  const fetchData = async (opts = {}) => {
    try {
      setLoading(true);

      const [resRest, resReviews] = await Promise.all([
        getRestaurantById(restaurantId, opts),
        getReviewsByRestaurant(restaurantId, opts)
      ]);

      setRestaurant((resRest && (resRest.data || resRest)) || null);
      setReviews((resReviews && (resReviews.data || resReviews)) || []);
    } catch (error) {
      if (error.name === 'AbortError') return; // ignore aborts
      console.error('Error fetching restaurant:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewAdded = () => {
    // Refresh reviews after adding new one
    fetchData();
  };

  if (loading) return <div className="loading">กำลังโหลด...</div>;
  if (!restaurant) return <div className="error">ไม่พบร้านอาหาร</div>;

  return (
    <div className="restaurant-detail">
      <button className="back-button" onClick={onBack}>← กลับ</button>
      
      <div className="detail-header">
        <img src={restaurant.image} alt={restaurant.name} />
        <div className="detail-info">
          <h1>{restaurant.name}</h1>
          <p className="category">{restaurant.category}</p>
          <p className="description">{restaurant.description}</p>
          <div className="info-row">
            <span>📍 {restaurant.location}</span>
            <span>📞 {restaurant.phone}</span>
            <span>🕐 {restaurant.openHours}</span>
          </div>
          <div className="rating-info">
            <span className="rating">⭐ {typeof restaurant.averageRating === 'number' ? restaurant.averageRating.toFixed(1) : 'N/A'}</span>
            <span className="price">{restaurant.priceRange ? '฿'.repeat(restaurant.priceRange) : '-'}</span>
            <span className="total-reviews">({restaurant.totalReviews || 0} รีวิว)</span>
          </div>
        </div>
      </div>

      <ReviewForm 
        restaurantId={restaurantId} 
        onReviewAdded={handleReviewAdded}
      />
      
      <ReviewList reviews={reviews} />
    </div>
  );
}

export default RestaurantDetail;