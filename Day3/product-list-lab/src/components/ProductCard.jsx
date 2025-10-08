import React from 'react';
import PropTypes from 'prop-types';
import './ProductCard.css';

function ProductCard({ product, onAddToCart, onViewDetails }) {
  const { name, description, image, price, originalPrice, discount, inStock, rating } = product;

  // ⭐ ฟังก์ชันแสดงดาว
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push("★");
    }
    if (hasHalfStar) {
      stars.push("☆"); // ครึ่งดาว (สัญลักษณ์แทน)
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push("✩");
    }
    return stars.join("");
  };

  // ✅ เลือกสี badge ตามเปอร์เซ็นต์ลด
  const getDiscountColor = (discount) => {
    if (discount >= 30) return 'red';
    if (discount >= 10) return 'orange';
    return 'green';
  };

  return (
    <div className="product-card">
      <div className="product-image" style={{ position: 'relative' }}>
        {typeof discount === 'number' && discount > 0 && (
          <div 
            className="discount-badge"
            style={{ backgroundColor: getDiscountColor(discount) }}
          >
            -{discount}%
          </div>
        )}

        <img 
          src={image} 
          alt={name}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x300/cccccc/666666?text=No+Image';
          }}
        />
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <p className="product-description">{description}</p>

        {/* ⭐ Rating */}
        {rating && (
          <div className="product-rating">
            <span className="stars">{renderStars(rating)}</span>
            <span className="rating-number"> ({rating})</span>
          </div>
        )}

        <div className="product-price">
          {typeof discount === 'number' && discount > 0 && (
            <>
              <span className="original-price">
                ฿{originalPrice.toLocaleString()}
              </span>
              <span className="discount">ลด {discount}%</span>
            </>
          )}
          <div className="final-price">
            ฿{price.toLocaleString()}
          </div>
        </div>
        
        <div className="product-actions">
          <button 
            className="btn btn-secondary"
            onClick={() => onViewDetails(product)}
          >
            ดูรายละเอียด
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => onAddToCart(product)}
            disabled={!inStock}
          >
            {inStock ? 'ใส่ตะกร้า' : 'หมดสินค้า'}
          </button>
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.number.isRequired,
    originalPrice: PropTypes.number.isRequired,
    discount: PropTypes.number,
    inStock: PropTypes.bool.isRequired,
    rating: PropTypes.number,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
  onViewDetails: PropTypes.func.isRequired
};

export default ProductCard;
