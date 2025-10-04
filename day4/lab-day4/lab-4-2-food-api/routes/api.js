const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const FOODS_FILE = path.join(__dirname, '../data/foods.json');

// โหลดข้อมูลอาหาร
const loadFoods = () => {
    try {
        const data = fs.readFileSync(FOODS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error loading foods:', error);
        return [];
    }
};

// GET /api/docs - แสดงเอกสาร API
router.get('/docs', (req, res) => {
    const docs = {
        endpoints: [
            { method: 'GET', path: '/api/foods', description: 'ดึงรายการอาหารทั้งหมด พร้อม filter query parameters' },
            { method: 'GET', path: '/api/foods/random', description: 'ดึงอาหารแบบสุ่ม 1 จาน' },
            { method: 'GET', path: '/api/foods/category/:category', description: 'ดึงอาหารตาม category' },
            { method: 'GET', path: '/api/foods/:id', description: 'ดึงอาหารตาม ID' },
            { method: 'GET', path: '/api/docs', description: 'แสดงเอกสาร API (documentation)' },
            { method: 'GET', path: '/api/stats', description: 'แสดงสถิติอาหาร' }
        ]
    };
    res.json({ success: true, data: docs });
});

// GET /api/stats - สถิติอาหาร
router.get('/stats', (req, res) => {
    const foods = loadFoods();

    const total = foods.length;

    // จัด category count
    const categories = {};
    let vegetarianCount = 0;
    let availableCount = 0;

    foods.forEach(food => {
        // category
        if (food.category) {
            const key = food.category.toLowerCase();
            categories[key] = (categories[key] || 0) + 1;
        }

        // vegetarian
        if (food.vegetarian) vegetarianCount++;

        // available
        if (food.available) availableCount++;
    });

    res.json({
        success: true,
        data: {
            total,
            categories,
            vegetarian: vegetarianCount,
            available: availableCount
        }
    });
});

module.exports = router;
