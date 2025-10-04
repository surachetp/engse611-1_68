// middleware/logger.js
const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(__dirname, '../logs/request.log');

const logger = (req, res, next) => {
    const now = new Date();
    const logMessage = `[${now.toISOString()}] ${req.method} ${req.originalUrl} - IP: ${req.ip}`;
    
    console.log(logMessage);

    fs.appendFile(LOG_FILE, logMessage + '\n', err => {
        if (err) console.error('Error writing to log file:', err);
    });

    next();
};

module.exports = logger;
