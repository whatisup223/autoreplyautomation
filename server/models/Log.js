const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Optional if anonymous
    pageId: { type: String },
    pageName: { type: String },
    userName: { type: String }, // End user name
    action: { type: String, required: true }, // e.g., 'auto_reply', 'hide_comment'
    content: { type: String },
    reply: { type: String },
    status: { type: String, enum: ['success', 'failed'], default: 'success' },
    error: { type: String },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Log', LogSchema);
