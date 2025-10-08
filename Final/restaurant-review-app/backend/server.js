const express = require('express');
const cors = require('cors');
require('dotenv').config();

const restaurantRoutes = require('./routes/restaurants');
const reviewRoutes = require('./routes/reviews');
const { readJsonFile } = require('./utils/fileManager');

const app = express();
const PORT = process.env.PORT || 3000;

// ========================================
// 🧩 Middleware
// ========================================
app.use(cors());              // เปิดให้ frontend เข้าถึง API ได้
app.use(express.json());      // ให้ Express อ่านข้อมูล JSON จาก body ได้

// ========================================
// 🏠 Root Route (แสดงรายละเอียด API)
// ========================================
app.get('/', (req, res) => {
  res.json({
    message: '🍜 Restaurant Review API',
    version: '1.0.0',
    endpoints: {
      restaurants: '/api/restaurants',
      reviews: '/api/reviews',
      stats: '/api/stats',
    },
  });
});

// ========================================
// 📦 Routes หลัก
// ========================================
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/reviews', reviewRoutes);

// ========================================
// 📊 GET /api/stats - ดึงสถิติทั้งหมด
// ========================================
app.get('/api/stats', async (req, res) => {
  try {
    // ✅ อ่านข้อมูลร้านอาหารและรีวิวทั้งหมด
    const restaurants = await readJsonFile('restaurants.json');
    const reviews = await readJsonFile('reviews.json');

    // ✅ กำหนดค่าพื้นฐาน
    const totalRestaurants = restaurants.length;
    const totalReviews = reviews.length;

    // ✅ คำนวณค่าเฉลี่ยคะแนนรวม (เฉพาะร้านที่มีรีวิว)
    const ratedRestaurants = restaurants.filter(
      (r) => r.totalReviews && r.totalReviews > 0
    );

    const totalAverage =
      ratedRestaurants.reduce((sum, r) => sum + (r.averageRating || 0), 0) /
      (ratedRestaurants.length || 1);

    const averageRating = Math.round(totalAverage * 10) / 10; // ปัดทศนิยม 1 ตำแหน่ง

    // ✅ หา Top 5 ร้านคะแนนสูงสุด
    const topRatedRestaurants = [...restaurants]
      .filter((r) => r.totalReviews > 0)
      .sort((a, b) => b.averageRating - a.averageRating)
      .slice(0, 5)
      .map((r) => ({
        id: r.id,
        name: r.name,
        averageRating: r.averageRating,
        totalReviews: r.totalReviews,
        category: r.category || 'ไม่ระบุ',
      }));

    // ✅ ส่งข้อมูลกลับ
    res.json({
      success: true,
      data: {
        totalRestaurants,
        totalReviews,
        averageRating,
        topRatedRestaurants,
      },
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการดึงสถิติ',
    });
  }
});

// ========================================
// 🚫 404 Handler - จัดการเมื่อไม่พบเส้นทาง
// ========================================
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found',
  });
});

// ========================================
// 💥 Error Handler - จัดการ Error ภายในระบบ
// ========================================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// ========================================
// 🚀 Start Server
// ========================================
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV}`);
});
