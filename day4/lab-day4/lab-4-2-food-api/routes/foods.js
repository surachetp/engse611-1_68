const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const FOODS_FILE = path.join(__dirname, '../data/foods.json');

const loadFoods = () => {
    try {
        const data = fs.readFileSync(FOODS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error loading foods:', error);
        return [];
    }
};

// GET /api/foods
router.get('/', (req, res) => {
    let foods = loadFoods();
    const { search, category, maxSpicy, vegetarian, available, maxPrice } = req.query;

    const maxSpicyNum = maxSpicy ? parseInt(maxSpicy) : null;
    const vegetarianBool = vegetarian === 'true' ? true : vegetarian === 'false' ? false : null;
    const availableBool = available === 'true' ? true : available === 'false' ? false : null;
    const maxPriceNum = maxPrice ? parseFloat(maxPrice) : null;

    if (search || category || maxSpicyNum !== null || vegetarianBool !== null || availableBool !== null || maxPriceNum !== null) {
        foods = foods.filter(food => {
            let match = true;

            if (search) {
                const lowerSearch = search.toLowerCase();
                match = match && (
                    (food.name && food.name.toLowerCase().includes(lowerSearch)) ||
                    (food.description && food.description.toLowerCase().includes(lowerSearch))
                );
            }

            if (category) match = match && food.category.toLowerCase() === category.toLowerCase();
            if (maxSpicyNum !== null) match = match && food.spicyLevel <= maxSpicyNum;
            if (vegetarianBool !== null) match = match && food.vegetarian === vegetarianBool;
            if (availableBool !== null) match = match && food.available === availableBool;
            if (maxPriceNum !== null) match = match && food.price <= maxPriceNum;

            return match;
        });
    }

    res.json({
        success: true,
        data: foods,
        total: foods.length,
        filters: { search, category, maxSpicy: maxSpicyNum, vegetarian: vegetarianBool, available: availableBool, maxPrice: maxPriceNum }
    });
});

// GET /api/foods/random
router.get('/random', (req, res) => {
    const foods = loadFoods();
    if (foods.length === 0) return res.status(404).json({ success: false, message: 'ไม่พบรายการอาหาร' });

    const randomIndex = Math.floor(Math.random() * foods.length);
    res.json({ success: true, data: foods[randomIndex] });
});

// GET /api/foods/category/:category
router.get('/category/:category', (req, res) => {
    const foods = loadFoods();
    const category = req.params.category.toLowerCase();
    const filtered = foods.filter(f => f.category.toLowerCase() === category);

    res.json({ success: true, data: filtered, total: filtered.length, category });
});

// GET /api/foods/:id
router.get('/:id', (req, res) => {
    const foods = loadFoods();
    const id = parseInt(req.params.id);
    const food = foods.find(f => f.id === id);

    if (!food) return res.status(404).json({ success: false, message: `ไม่พบอาหารที่มี ID ${id}` });

    res.json({ success: true, data: food });
});

module.exports = router;
