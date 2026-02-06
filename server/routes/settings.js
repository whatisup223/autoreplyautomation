const express = require('express');
const router = express.Router();

// --- Mock Settings ---
let currentSettings = {
    apiKey: process.env.GEMINI_API_KEY || '',
    defaultLanguage: 'ar',
    notificationEmail: 'admin@example.com'
};

// GET /api/settings
router.get('/', (req, res) => {
    res.json(currentSettings);
});

// POST /api/settings (Update)
router.post('/', (req, res) => {
    const { apiKey, defaultLanguage, notificationEmail } = req.body;

    if (apiKey) currentSettings.apiKey = apiKey;
    if (defaultLanguage) currentSettings.defaultLanguage = defaultLanguage;
    if (notificationEmail) currentSettings.notificationEmail = notificationEmail;

    res.json({ message: 'Settings updated successfully', settings: currentSettings });
});

module.exports = router;
