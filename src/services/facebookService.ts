import api from '../api';
import { FBPage } from '../types';

// --- Types ---
export interface FBUser {
    id: string;
    name: string;
    accessToken: string;
}

// --- API Calls ---

// 1. Login with Facebook (Simulated for Demo or Real OAuth2 flow)
export const loginFacebook = async (): Promise<FBUser> => {
    // In a real app, use Facebook SDK: FB.login(...)
    // return new Promise((resolve) => {
    //   setTimeout(() => resolve({ id: '123', name: 'Demo User', accessToken: 'EAAG...' }), 1000);
    // });

    // Here we assume backend handles OAuth or returns a mock user
    try {
        // connecting to our backend to get auth url or mock login
        const response = await api.get('/auth/facebook');
        return response.data;
    } catch (error) {
        console.warn('Backend not ready, using mock data');
        return { id: '123456', name: 'Demo User', accessToken: 'MOCK_TOKEN' };
    }
};

// 2. Fetch User Pages
export const fetchUserPages = async (token: string): Promise<FBPage[]> => {
    try {
        // Call our backend which calls FB Graph API
        // const response = await api.get('/facebook/pages', { params: { token } });
        // return response.data;

        // Fallback Mock Data
        await new Promise(r => setTimeout(r, 800));
        return [
            { id: '101', name: 'My Business Page', category: 'Business', access_token: 't1', tasks: [] },
            { id: '102', name: 'Community Hub', category: 'Community', access_token: 't2', tasks: [] },
        ];
    } catch (error) {
        console.error('Error fetching pages', error);
        throw error;
    }
};

// 3. Subscribe Page to Webhook
export const subscribePageToWebhook = async (pageId: string, pageAccessToken: string) => {
    try {
        // Call our backend to subscribe the page
        const response = await api.post('/facebook/subscribe', { pageId, pageAccessToken });
        return response.data;
    } catch (error) {
        console.warn('Backend subscription failed, simulating success for UI');
        return { success: true };
    }
};
