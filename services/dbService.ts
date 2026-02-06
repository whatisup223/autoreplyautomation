
// Mock Database Service using LocalStorage for persistence
// This simulates a real backend API

export const dbService = {
    // --- Generic CRUD ---
    get: (key: string) => JSON.parse(localStorage.getItem(key) || '[]'),
    getObj: (key: string) => JSON.parse(localStorage.getItem(key) || '{}'),
    set: (key: string, data: any) => localStorage.setItem(key, JSON.stringify(data)),

    // --- Users ---
    getUsers: () => dbService.get('users'),
    saveUser: (user: any) => {
        const users = dbService.getUsers();
        const index = users.findIndex((u: any) => u.id === user.id);
        if (index > -1) users[index] = user;
        else users.push({ ...user, id: Date.now().toString(), dateJoined: new Date().toLocaleDateString() });
        dbService.set('users', users);
    },
    deleteUser: (id: string) => {
        const users = dbService.getUsers().filter((u: any) => u.id !== id);
        dbService.set('users', users);
    },

    // --- Plans ---
    getPlans: () => {
        const defaultPlans = [
            { id: '1', name: 'plan_basic', price: 29, features: ['feature_3_pages', 'feature_500_replies', 'feature_email_support'] },
            { id: '2', name: 'plan_pro', price: 79, features: ['feature_10_pages', 'feature_smart_reply', 'feature_unlimited_auto', 'feature_hide_comments'], popular: true },
            { id: '3', name: 'plan_enterprise', price: 199, features: ['feature_unlimited_pages', 'feature_whitelabel', 'feature_api'] }
        ];
        const plans = dbService.get('plans');
        return plans.length ? plans : defaultPlans;
    },
    savePlan: (plan: any) => {
        const plans = dbService.getPlans();
        const index = plans.findIndex((p: any) => p.id === plan.id);
        if (index > -1) plans[index] = plan;
        else plans.push({ ...plan, id: Date.now().toString() });
        dbService.set('plans', plans);
    },

    // --- Pages ---
    getPages: () => dbService.get('connected_pages'),
    savePages: (pages: any[]) => dbService.set('connected_pages', pages),
    updatePage: (page: any) => {
        const pages = dbService.getPages();
        const index = pages.findIndex((p: any) => p.id === page.id);
        if (index > -1) pages[index] = { ...pages[index], ...page };
        dbService.set('connected_pages', pages);
    },

    // --- Rules ---
    getRules: () => dbService.get('automation_rules'),
    saveRule: (rule: any) => {
        const rules = dbService.getRules();
        const index = rules.findIndex((r: any) => r.id === rule.id);
        if (index > -1) rules[index] = rule;
        else rules.push({ ...rule, id: Date.now().toString(), active: true });
        dbService.set('automation_rules', rules);
    },
    deleteRule: (id: string) => {
        const rules = dbService.getRules().filter((r: any) => r.id !== id);
        dbService.set('automation_rules', rules);
    },

    // --- Knowledge Base ---
    getKB: () => dbService.get('knowledge_base'),
    saveKB: (entry: any) => {
        const kb = dbService.getKB();
        const index = kb.findIndex((k: any) => k.id === entry.id);
        if (index > -1) kb[index] = entry;
        else kb.push({ ...entry, id: Date.now().toString() });
        dbService.set('knowledge_base', kb);
    },
    deleteKB: (id: string) => {
        const kb = dbService.getKB().filter((k: any) => k.id !== id);
        dbService.set('knowledge_base', kb);
    },

    // --- Crisis Settings ---
    getCrisisSettings: () => {
        const settings = dbService.getObj('crisis_settings');
        return Object.keys(settings).length ? settings : {
            enabled: false,
            customMessage: 'نعتذر بشدة عن أي إزعاج! لقد قمت بإيقاف البوت مؤقتاً وسيتدخل أحد موظفينا الآن لحل مشكلتك يدوياً في أسرع وقت.',
            notifyEmail: 'admin@example.com'
        };
    },
    saveCrisisSettings: (settings: any) => dbService.set('crisis_settings', settings),

    // --- Activity Logs ---
    getLogs: () => {
        const logs = dbService.get('activity_logs');
        if (logs.length === 0) {
            // Seed some data with sentiment
            return [
                { id: '1', type: 'auto_reply', page: 'Tech Store', user: 'Ali', content: 'Price please?', sentiment: 'neutral', intent: 'pricing', urgency: 'medium', status: 'success', timestamp: new Date().toISOString() },
                { id: '2', type: 'auto_reply', page: 'Fashion Pro', user: 'Sara', content: 'Great products!', sentiment: 'positive', intent: 'feedback', urgency: 'low', status: 'success', timestamp: new Date().toISOString() },
                { id: '3', type: 'manual_reply', page: 'Support', user: 'Hassan', content: 'I am very angry, order missing!', sentiment: 'negative', intent: 'complaint', urgency: 'high', status: 'success', timestamp: new Date().toISOString() },
            ];
        }
        return logs;
    },
    addLog: (log: any) => {
        const logs = dbService.getLogs();
        logs.unshift({ ...log, id: Date.now().toString(), timestamp: new Date().toISOString() });
        dbService.set('activity_logs', logs.slice(0, 100)); // Keep last 100
    },

    // --- Stats ---
    getStats: () => {
        const logs = dbService.getLogs();
        const pages = dbService.getPages();
        const positive = logs.filter((l: any) => l.sentiment === 'positive').length;
        const negative = logs.filter((l: any) => l.sentiment === 'negative').length;
        const total = logs.length || 1;
        return {
            active_pages: pages.length,
            total_replies: logs.length,
            saved_hours: (logs.length * 0.1).toFixed(1),
            avg_response_time: '0.8',
            sentiment_summary: {
                positive: positive || 0,
                negative: negative || 0,
                neutral: logs.length - (positive + negative) || 0
            }
        };
    }
};
