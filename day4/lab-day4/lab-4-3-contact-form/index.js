const express = require('express');
const app = express();
const contactRoutes = require('./routes/contact');
const feedbackRoutes = require('./routes/feedback');

app.use(express.json());
app.use('/api', contactRoutes);
app.use('/api', feedbackRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
