function RestaurantCard({ restaurant, onClick }) {
  // ========================================
  // ฟังก์ชันช่วยแสดงราคาตาม priceRange
  // เช่น 1 => ฿, 2 => ฿฿, 3 => ฿฿฿
  // ========================================
  const getPriceDisplay = (range) => {
    return '฿'.repeat(range);
  };

  return (
    <div
      className="restaurant-card"
      onClick={() => onClick(restaurant.id)}
      // ========================================
      // Glassmorphism + Hover Animation
      // ========================================
      style={{
        backdropFilter: 'blur(10px)',
        background: 'rgba(255,255,255,0.2)',
        borderRadius: '16px',
        boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
        e.currentTarget.style.boxShadow = '0 12px 25px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
      }}
    >
      {/* ========================================
          รูปภาพร้านอาหาร
          ======================================== */}
      <img
        src={restaurant.image}
        alt={restaurant.name}
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover',
          transition: 'transform 0.4s ease'
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      />

      {/* ========================================
          เนื้อหา card
          ======================================== */}
      <div className="card-content" style={{ padding: '1rem' }}>
        <h3 style={{ fontSize: '1.3rem', marginBottom: '0.3rem' }}>{restaurant.name}</h3>
        <p className="category" style={{ fontSize: '0.9rem', color: '#555' }}>
          {restaurant.category}
        </p>
        <p className="description" style={{ fontSize: '0.95rem', margin: '0.5rem 0', color: '#666', height: '40px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {restaurant.description}
        </p>

        {/* ========================================
            Footer card: rating, price, total reviews
            ======================================== */}
        <div className="card-footer" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.85rem', color: '#333' }}>
          <span className="rating">
            ⭐ {restaurant.averageRating > 0
              ? restaurant.averageRating.toFixed(1)
              : 'ยังไม่มีรีวิว'}
          </span>
          <span className="price">{getPriceDisplay(restaurant.priceRange)}</span>
          <span className="reviews">{restaurant.totalReviews} รีวิว</span>
        </div>
      </div>
    </div>
  );
}

export default RestaurantCard;
