const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DATA_DIR = path.join(__dirname, '../data');
const CONTACT_FILE = 'contacts.json';

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);

// Validation middleware
const validateContact = (req, res, next) => {
    const { name, email, subject, message, phone, company } = req.body;
    const errors = [];

    if (!name || typeof name !== 'string') errors.push('Name is required.');
    if (!email || typeof email !== 'string') errors.push('Email is required.');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) errors.push('Email format is invalid.');
    if (!subject || subject.trim().length < 5) errors.push('Subject at least 5 chars.');
    if (!message || message.trim().length < 10) errors.push('Message at least 10 chars.');

    if (errors.length) return res.status(400).json({ success: false, errors });

    next();
};

// Helper: append data
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

// POST /api/contact
router.post('/contact', validateContact, (req, res) => {
    const saved = appendToJsonFile(CONTACT_FILE, req.body);
    res.status(201).json({ success: true, data: saved });
});

// GET /api/contact
router.get('/contact', (req, res) => {
    const filePath = path.join(DATA_DIR, CONTACT_FILE);
    let contacts = [];
    if (fs.existsSync(filePath)) {
        contacts = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginated = contacts.slice(start, end);

    res.json({ success: true, total: contacts.length, page, limit, data: paginated });
});

module.exports = router;
