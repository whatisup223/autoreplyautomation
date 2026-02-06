const mongoose = require('mongoose');

const PageSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    pageId: { type: String, required: true, unique: true },
    pageName: { type: String, required: true },
    accessToken: { type: String, required: true }, // Long-lived token
    isConnected: { type: Boolean, default: true },
    webhookActive: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Page', PageSchema);
