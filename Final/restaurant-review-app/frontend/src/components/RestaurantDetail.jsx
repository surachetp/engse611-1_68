import { useState, useEffect } from 'react';
import ReviewList from './ReviewList';
import ReviewForm from './ReviewForm';
import { getRestaurantById } from '../services/api';

function RestaurantDetail({ restaurantId, onBack }) {
  // ========================================
  // State สำหรับข้อมูลร้าน, การโหลด และข้อผิดพลาด
  // ========================================
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ========================================
  // useEffect: เรียก fetch ข้อมูลร้านทุกครั้งที่ restaurantId เปลี่ยน
  // ========================================
  useEffect(() => {
    fetchRestaurantDetail();
  }, [restaurantId]);

  // ========================================
  // ฟังก์ชันดึงข้อมูลร้านและรีวิว
  // ========================================
  const fetchRestaurantDetail = async () => {
    try {
      setLoading(true);   // เริ่ม loading
      setError(null);     // รีเซ็ต error
      
      // 1️⃣ เรียก API getRestaurantById
      const result = await getRestaurantById(restaurantId);

      // 2️⃣ ตรวจสอบผลลัพธ์และตั้งค่า state
      if (result.success) {
        setRestaurant(result.data); // เก็บข้อมูลร้านใน state
      } else {
        setError('ไม่พบร้านอาหารนี้'); // กรณี API return false
      }

    } catch (err) {
      setError('ไม่สามารถโหลดข้อมูลร้านได้'); // กรณี error
      console.error('RestaurantDetail fetch error:', err);
    } finally {
      setLoading(false); // จบ loading
    }
  };

  // ========================================
  // ฟังก์ชัน callback เมื่อเพิ่มรีวิวใหม่
  // จะเรียก fetchRestaurantDetail เพื่อ refresh ข้อมูล
  // ========================================
  const handleReviewAdded = () => {
    fetchRestaurantDetail();
  };

  // ========================================
  // กรณีแสดง loading / error / ร้านไม่พบ
  // ========================================
  if (loading) return <div className="loading">กำลังโหลด...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!restaurant) return <div className="error">ไม่พบร้านอาหาร</div>;

  // ========================================
  // UI ร้านอาหาร (Detail Page)
  // ========================================
  return (
    <div className="restaurant-detail">
      {/* ปุ่มย้อนกลับ */}
      <button className="back-button" onClick={onBack}>
        ← กลับ
      </button>
      
      {/* ส่วน header ร้าน */}
      <div className="detail-header">
        {/* รูปภาพร้าน */}
        <img src={restaurant.image} alt={restaurant.name} />

        {/* ข้อมูลร้าน */}
        <div className="detail-info">
          <h1>{restaurant.name}</h1>
          <p className="category">{restaurant.category}</p>
          <p className="description">{restaurant.description}</p>

          {/* ข้อมูลเพิ่มเติม */}
          <div className="info-row">
            <span>📍 {restaurant.location}</span>
            <span>📞 {restaurant.phone}</span>
            <span>🕐 {restaurant.openHours}</span>
          </div>

          {/* Rating, Price, Total Reviews */}
          <div className="rating-info">
            <span className="rating">
              ⭐ {restaurant.averageRating > 0 
                ? restaurant.averageRating.toFixed(1) 
                : 'ยังไม่มีรีวิว'}
            </span>
            <span className="price">{'฿'.repeat(restaurant.priceRange)}</span>
            <span className="total-reviews">({restaurant.totalReviews} รีวิว)</span>
          </div>
        </div>
      </div>

      {/* ฟอร์มเพิ่มรีวิว */}
      <ReviewForm 
        restaurantId={restaurantId} 
        onReviewAdded={handleReviewAdded} 
      />

      {/* แสดงรายการรีวิว */}
      <ReviewList reviews={restaurant.reviews || []} />
    </div>
  );
}

export default RestaurantDetail;
