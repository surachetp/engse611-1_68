const express = require('express');
const path = require('path');
const foodsRouter = require('./routes/foods');
const logger = require('./middleware/logger');

const app = express();

app.use(express.json());
app.use(logger);

// Serve static files จากโฟลเดอร์ public
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api/foods', foodsRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
