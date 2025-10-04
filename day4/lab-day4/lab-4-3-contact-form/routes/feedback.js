// routes/feedback.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DATA_DIR = path.join(__dirname, '../data');
const FEEDBACK_FILE = 'feedback.json';

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);

// ------------------ Validation Middleware ------------------
const validateFeedback = (req, res, next) => {
    const { rating, comment, email } = req.body;
    const errors = [];

    // rating
    if (rating === undefined || rating === null) {
        errors.push('Rating is required.');
    } else if (typeof rating !== 'number' || rating < 1 || rating > 5) {
        errors.push('Rating must be a number between 1 and 5.');
    }

    // comment
    if (!comment || typeof comment !== 'string') {
        errors.push('Comment is required.');
    } else if (comment.trim().length < 5) {
        errors.push('Comment must be at least 5 characters.');
    } else if (comment.trim().length > 500) {
        errors.push('Comment must not exceed 500 characters.');
    }

    // email (optional)
    if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            errors.push('Email format is invalid.');
        }
    }

    if (errors.length) {
        return res.status(400).json({ success: false, message: 'Validation failed', errors });
    }

    // sanitize
    req.body.comment = comment.trim();
    if (email) req.body.email = email.trim().toLowerCase();

    next();
};

// ------------------ Helper: append data ------------------
const appendToJsonFile = (fileName, data) => {
    const filePath = path.join(DATA_DIR, fileName);
    let fileData = [];

    if (fs.existsSync(filePath)) {
        try {
            fileData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        } catch (err) {
            console.error(err);
        }
    }

    const newData = { id: uuidv4(), timestamp: new Date().toISOString(), ...data };
    fileData.push(newData);
    fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2), 'utf-8');
    return newData;
};

// ------------------ Routes ------------------

// POST /api/feedback
router.post('/feedback', validateFeedback, (req, res) => {
    const saved = appendToJsonFile(FEEDBACK_FILE, req.body);
    res.status(201).json({ success: true, message: 'Feedback saved successfully', data: saved });
});

// GET /api/feedback/stats
router.get('/feedback/stats', (req, res) => {
    const filePath = path.join(DATA_DIR, FEEDBACK_FILE);
    let feedbacks = [];
    if (fs.existsSync(filePath)) {
        try {
            feedbacks = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        } catch (err) {
            console.error(err);
        }
    }

    const total = feedbacks.length;
    const avgRating = total > 0 ? feedbacks.reduce((sum, f) => sum + f.rating, 0) / total : 0;

    res.json({
        success: true,
        total,
        averageRating: parseFloat(avgRating.toFixed(2)),
        data: feedbacks
    });
});

module.exports = router;
