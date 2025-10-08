const express = require('express');
const router = express.Router();
const { readJsonFile } = require('../utils/fileManager');

/**
 * ✅ Utility: ฟังก์ชันตรวจสอบค่าที่อาจเป็นอันตราย (XSS)
 * ป้องกันการ inject script จาก query string
 */
const hasDangerousCharacters = (str) => {
  const dangerousPatterns = /<script|<iframe|javascript:|onerror=|onclick=/i;
  return dangerousPatterns.test(str);
};

// ========================================
// GET /api/restaurants - ดึงรายการร้านทั้งหมด (พร้อม filtering)
// ========================================
router.get('/', async (req, res) => {
  try {
    let restaurants = await readJsonFile('restaurants.json');
    const { search, category, minRating, priceRange } = req.query;

    // 🛡️ ตรวจสอบความปลอดภัยของ query
    for (const key of Object.keys(req.query)) {
      if (hasDangerousCharacters(req.query[key])) {
        return res.status(400).json({
          success: false,
          message: `พบอักขระไม่ปลอดภัยในพารามิเตอร์ "${key}"`,
        });
      }
    }

    // ✅ TODO 1: กรองตามชื่อหรือคำอธิบาย (search)
    if (search) {
      const searchLower = search.toLowerCase();
      restaurants = restaurants.filter(
        (r) =>
          r.name.toLowerCase().includes(searchLower) ||
          r.description.toLowerCase().includes(searchLower)
      );
    }

    // ✅ TODO 2: กรองตามหมวดหมู่ (category)
    if (category) {
      const categoryLower = category.toLowerCase();
      restaurants = restaurants.filter(
        (r) => r.category.toLowerCase() === categoryLower
      );
    }

    // ✅ TODO 3: กรองตาม rating ขั้นต่ำ (minRating)
    if (minRating) {
      const min = parseFloat(minRating);
      restaurants = restaurants.filter(
        (r) => parseFloat(r.averageRating || 0) >= min
      );
    }

    // ✅ TODO 4: กรองตามช่วงราคา (priceRange)
    if (priceRange) {
      const price = parseInt(priceRange);
      restaurants = restaurants.filter(
        (r) => parseInt(r.priceRange) === price
      );
    }

    // ✅ กรณีไม่พบข้อมูล
    if (restaurants.length === 0) {
      return res.json({
        success: true,
        message: 'ไม่พบร้านที่ตรงกับเงื่อนไขการค้นหา',
        data: [],
        total: 0,
      });
    }

    // ✅ ส่งผลลัพธ์กลับ
    res.json({
      success: true,
      total: restaurants.length,
      filters: { search, category, minRating, priceRange },
      data: restaurants,
    });
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการดึงข้อมูลร้าน',
    });
  }
});

// ========================================
// GET /api/restaurants/:id - ดึงข้อมูลร้านตาม ID พร้อมรีวิว
// ========================================
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ ตรวจสอบว่า id เป็นตัวเลข
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'รหัสร้านไม่ถูกต้อง',
      });
    }

    // ✅ TODO 5: อ่านข้อมูลร้านและรีวิว
    const restaurants = await readJsonFile('restaurants.json');
    const reviews = await readJsonFile('reviews.json');

    // ✅ หาร้านที่มี id ตรงกัน
    const restaurant = restaurants.find((r) => r.id === parseInt(id));

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'ไม่พบร้านอาหารนี้',
      });
    }

    // ✅ หารีวิวของร้านนี้
    let restaurantReviews = reviews.filter(
      (r) => r.restaurantId === parseInt(id)
    );

    // ✅ เรียงรีวิวจากใหม่สุดไปเก่าสุด
    restaurantReviews.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    // ✅ รวมข้อมูลและส่งกลับ
    res.json({
      success: true,
      data: {
        ...restaurant,
        reviews: restaurantReviews,
      },
    });
  } catch (error) {
    console.error('Error fetching restaurant:', error);
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการดึงข้อมูลร้าน',
    });
  }
});

module.exports = router;
