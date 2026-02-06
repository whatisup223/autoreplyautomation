const express = require('express');
const router = express.Router();
const facebookService = require('../services/facebookService');

// --- Webhook Verification ---
// هذا المسار ضروري للتحقق من ملكية الويب هوك عند إعداده في Facebook Developers
router.get('/', (req, res) => {
    const VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN;
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('✅ Webhook Verified');
            res.status(200).send(challenge);
        } else {
            res.status(403).send('Verification Failed');
        }
    } else {
        res.status(400).send('Bad Request');
    }
});

// --- Incoming Events ---
// هنا تصل الأحداث (رسائل، تعليقات) من فيسبوك
router.post('/', async (req, res) => {
    const body = req.body;

    if (body.object === 'page') {
        body.entry.forEach(async (entry) => {
            // 1. استخراج معرف الصفحة والحدث
            const pageId = entry.id;
            const event = entry.changes ? entry.changes[0] : (entry.messaging ? entry.messaging[0] : null);

            if (event && event.value) {
                // حالة: تعليق جديد
                if (event.value.item === 'comment' && event.value.verb === 'add') {
                    await facebookService.handleNewComment(pageId, event.value);
                }
                // حالة: رسالة جديدة (للماسنجر)
                // ... سيتم إضافتها لاحقاً
            }
        });

        res.status(200).send('EVENT_RECEIVED');
    } else {
        res.sendStatus(404);
    }
});

module.exports = router;
