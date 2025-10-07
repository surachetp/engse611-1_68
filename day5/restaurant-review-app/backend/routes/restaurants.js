const express = require('express');
const router = express.Router();
const { readJsonFile } = require('../utils/fileManager');

// ✅ GET /api/restaurants/random - สุ่มร้านอาหาร 1 ร้าน
router.get('/random', async (req, res) => {
  try {
    const restaurants = await readJsonFile('restaurants.json');
    const randomIndex = Math.floor(Math.random() * restaurants.length);
    const randomRestaurant = restaurants[randomIndex];
    res.json({
      success: true,
      data: randomRestaurant
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching random restaurant'
    });
  }
});

// ✅ GET /api/restaurants/category/:category - ดึงร้านตามหมวดหมู่
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const restaurants = await readJsonFile('restaurants.json');
    const filteredRestaurants = restaurants.filter(r => r.category === category);
    res.json({
      success: true,
      data: filteredRestaurants,
      total: filteredRestaurants.length,
      category: category
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching restaurants by category'
    });
  }
});

// ✅ GET /api/restaurants - ดึงรายการร้านทั้งหมด (พร้อม filtering)
router.get('/', async (req, res) => {
  try {
    let restaurants = await readJsonFile('restaurants.json');
    const { search, category, minRating, priceRange } = req.query;
    
    if (search) {
      restaurants = restaurants.filter(r =>
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      restaurants = restaurants.filter(r => r.category === category);
    }

    if (minRating) {
      restaurants = restaurants.filter(r => r.averageRating >= parseFloat(minRating));
    }

    if (priceRange) {
      restaurants = restaurants.filter(r => r.priceRange === parseInt(priceRange));
    }

    res.json({
      success: true,
      data: restaurants,
      total: restaurants.length,
      filters: { search, category, minRating, priceRange }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching restaurants'
    });
  }
});

// ✅ GET /api/restaurants/:id - ดึงข้อมูลร้านตาม ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const restaurants = await readJsonFile('restaurants.json');
    const reviews = await readJsonFile('reviews.json');

    const restaurant = restaurants.find(r => r.id === parseInt(id));
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'ไม่พบร้านอาหารนี้'
      });
    }

    const restaurantReviews = reviews
      .filter(r => r.restaurantId === parseInt(id))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({
      success: true,
      data: { ...restaurant, reviews: restaurantReviews }
    });
  } catch (error) {
    console.error('Error fetching restaurant:', error);
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการดึงข้อมูลร้าน'
    });
  }
});

module.exports = router;
