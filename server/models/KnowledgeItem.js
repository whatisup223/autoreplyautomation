const mongoose = require('mongoose');

const KnowledgeItemSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    question: { type: String }, // For manual Q&A
    answer: { type: String },   // The answer or content snippet
    source: { type: String },   // "Manual" or filename like "guide.pdf"
    vectors: { type: [Number] }, // For future vector search integration (optional now)
    tags: [String],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('KnowledgeItem', KnowledgeItemSchema);
