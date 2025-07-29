// src/api/axiosConfig.js
import axios from 'axios';
import storage from '../../app/utils/storage';
import { Platform } from 'react-native';

// production בפרודקשן ישתמש ב־env, בפיתוח ב־emulator/local
const BASE_URL =
    process.env.EXPO_PUBLIC_API_BASE_URL
    ?? (Platform.OS === 'android'
        ? 'http://10.0.2.2:3030'
        : 'http://localhost:3030');


const api = axios.create({
    baseURL: BASE_URL,

    withCredentials: false,   // אנחנו לא עובדים עם עוגיות, אלא עם ה־Authorization header
});


api.interceptors.request.use(async config => {
    // 1. שולפים את הטוקן
    console.log('BASE_URL =', BASE_URL);

    const token = await storage.get('userToken');

    // 2. מוסיפים כאן את הלוג כדי לראות מה הקונסול שולח
    console.log('sending token:', token);
    console.log('token type:', typeof token);
    console.log('token length:', token ? token.length : 0);

    // 3. אם יש טוקן, דואגים להוסיף אותו ל־Authorization header
    if (token && token !== 'null' && token !== 'undefined') {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('Authorization header set:', config.headers.Authorization);
    } else {
        console.log('No valid token found, request will be sent without authorization');
    }

    return config;
});


export default api;
