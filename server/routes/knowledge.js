const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const pdf = require('pdf-parse');
const KnowledgeItem = require('../models/KnowledgeItem');

// --- Multer Setup ---
const upload = multer({ dest: 'uploads/' });

// --- POST /upload (File Upload) ---
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        const filePath = req.file.path;
        let extractedText = '';

        // Only support PDF for now simplistically
        if (req.file.mimetype === 'application/pdf') {
            const dataBuffer = fs.readFileSync(filePath);
            const data = await pdf(dataBuffer);
            extractedText = data.text;
        } else {
            // For .txt or others
            extractedText = fs.readFileSync(filePath, 'utf8');
        }

        // Save to DB (Chunking logic can be added later)
        // For simplicity, we save the first 1000 chars as a snippet or the whole thing if small
        const newItem = new KnowledgeItem({
            userId: req.body.userId || 'demo_user', // Mock user for now
            source: req.file.originalname,
            answer: extractedText, // In real RAG apps, this would be chunked and vecotrized
            tags: ['uploaded_file']
        });

        await newItem.save();

        // Cleanup
        fs.unlinkSync(filePath);

        res.status(200).json({ message: 'File processed successfully', id: newItem._id });

    } catch (error) {
        console.error('Upload Error:', error);
        res.status(500).send('Error processing file.');
    }
});

// --- GET / (List Knowledge) ---
router.get('/', async (req, res) => {
    try {
        const items = await KnowledgeItem.find().sort({ createdAt: -1 });
        res.json(items);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
