import React from 'react';
import PropTypes from 'prop-types';

function ProductCard({ product, onAddToCart, onViewDetails }) {
    return (
        <div className="product-card">
            <div className="product-image">
                <img 
                    src={product.image} 
                    alt={product.name}
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x300/cccccc/666666?text=No+Image';
                    }}
                />
            </div>
            
            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                
                {/* TODO: นักศึกษาจะเพิ่ม rating stars ในส่วน Challenge */}
                
                <div className="product-price">
                    ฿{product.price.toLocaleString()}
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
                        disabled={!product.inStock}
                    >
                        {product.inStock ? 'ใส่ตะกร้า' : 'หมดสินค้า'}
                    </button>
                </div>
            </div>
        </div>
    );
}

// TODO: นักศึกษาจะเพิ่ม PropTypes validation ในส่วน Challenge
ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
    onAddToCart: PropTypes.func.isRequired,
    onViewDetails: PropTypes.func.isRequired
};

export default ProductCard;