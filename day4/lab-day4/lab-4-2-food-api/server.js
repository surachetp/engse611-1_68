const express = require('express');
const app = express();
const logger = require('./middleware/logger');
const foodsRouter = require('./routes/foods');

// ใช้ middleware log ทุก request
app.use(logger);

// ใช้ router
app.use('/api/foods', foodsRouter);

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
