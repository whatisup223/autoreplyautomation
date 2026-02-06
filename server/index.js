require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Initialize App
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// --- Database Connection ---
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/autoreply';
mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('❌ MongoDB Error:', err));

// --- Routes Import ---
const webhookRoutes = require('./routes/webhook');
const knowledgeRoutes = require('./routes/knowledge');
const settingsRoutes = require('./routes/settings');

// --- Routes Setup ---
app.use('/api/webhook', webhookRoutes);
app.use('/api/knowledge', knowledgeRoutes);
app.use('/api/settings', settingsRoutes);

// --- Health Check ---
app.get('/', (req, res) => {
    res.send('AutoReply Automation Server is Running 🚀');
});

// --- Start Server ---
app.listen(PORT, () => {
    console.log(`
    🚀 Server running on port ${PORT}
    🌐 Local: http://localhost:${PORT}
    📡 Webhook Endpoint: http://localhost:${PORT}/api/webhook
    `);
});
