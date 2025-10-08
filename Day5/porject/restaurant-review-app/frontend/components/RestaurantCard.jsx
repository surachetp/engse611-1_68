function RestaurantCard({ restaurant, onClick }) {
  const getPriceDisplay = (range) => {
    return '฿'.repeat(range);
  };

  return (
    <div className="restaurant-card" onClick={() => onClick(restaurant.id)}>
      <img src={restaurant.image} alt={restaurant.name} />
      <div className="card-content">
        <h3>{restaurant.name}</h3>
        <p className="category">{restaurant.category}</p>
        <p className="description">{restaurant.description}</p>
        <div className="card-footer">
          <span className="rating">⭐ {typeof restaurant.averageRating === 'number' ? restaurant.averageRating.toFixed(1) : 'N/A'}</span>
          <span className="price">{getPriceDisplay(restaurant.priceRange || 0)}</span>
          <span className="reviews">{restaurant.totalReviews || 0} รีวิว</span>
        </div>
      </div>
    </div>
  );
}

export default RestaurantCard;