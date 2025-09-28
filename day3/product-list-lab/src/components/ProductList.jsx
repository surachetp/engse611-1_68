import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';
import './ProductList.css';

function ProductList({ products, categories, onAddToCart, onViewDetails }) {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('');

    // 👉 ใช้ useMemo ให้คำนวณ filter/sort แค่ตอน dependencies เปลี่ยน
    const filteredProducts = useMemo(() => {
        let result = [...products];

        // Filter by category
        if (selectedCategory !== 'all') {
            result = result.filter(p => p.category === selectedCategory);
        }

        // Search filter
        if (searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                p =>
                    p.name.toLowerCase().includes(query) ||
                    p.description.toLowerCase().includes(query)
            );
        }

        // Sorting
        if (sortBy === 'name') {
            result.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === 'price') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'rating') {
            result.sort((a, b) => b.rating - a.rating); // rating สูงไปต่ำ
        }

        return result;
    }, [products, selectedCategory, searchQuery, sortBy]);

    return (
        <div className="product-list-container">
            {/* Header */}
            <div className="header">
                <h1>🛍️ ร้านค้าออนไลน์</h1>
                <p>Lab 3.2 - Search + Sort</p>
            </div>

            {/* Controls */}
            <div className="filters">
                {/* Category Filter */}
                <label>
                    หมวดหมู่:{" "}
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </label>

                {/* Search Box */}
                <input
                    type="text"
                    placeholder="🔍 ค้นหาสินค้า..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                {/* Sort Dropdown */}
                <label>
                    เรียงตาม:{" "}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="">-- เลือก --</option>
                        <option value="name">ชื่อสินค้า (A-Z)</option>
                        <option value="price">ราคา (ต่ำ → สูง)</option>
                        <option value="rating">คะแนนรีวิว (สูง → ต่ำ)</option>
                    </select>
                </label>
            </div>

            {/* Products */}
            <div className="products-grid">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={onAddToCart}
                            onViewDetails={onViewDetails}
                        />
                    ))
                ) : (
                    <p style={{ textAlign: 'center', gridColumn: '1/-1' }}>
                        ❌ ไม่พบสินค้าที่ค้นหา
                    </p>
                )}
            </div>
        </div>
    );
}

ProductList.propTypes = {
    products: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
    onAddToCart: PropTypes.func.isRequired,
    onViewDetails: PropTypes.func.isRequired
};

export default ProductList;
