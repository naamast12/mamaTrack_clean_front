// /components/ui/AuthProvider.js
import React, { createContext, useEffect, useState } from 'react';
import api from '../../src/api/axiosConfig';
import storage from '../../app/utils/storage';

export const AuthContext = createContext({
    user: null,
    isInit: false,
});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isInit, setIsInit] = useState(false);

    useEffect(() => {
        const loadUserFromCache = async () => {
            try {
                const cachedUser = await storage.get('userData');
                if (cachedUser) {
                    setUser(cachedUser); // ✅ בלי JSON.parse
                }

                const { data } = await api.get('/api/user');

                if (data.success && data.user) {
                    setUser(data.user); // ✅ רק את האובייקט של המשתמש
                    await storage.set('userData', data.user);
                } else {
                    await storage.remove('userData');
                    await storage.remove('userToken');
                    setUser(null);
                }
            } catch (err) {
                await storage.remove('userData');
                await storage.remove('userToken');
                setUser(null);
            } finally {
                setIsInit(true);
            }
        };

        loadUserFromCache();
    }, []);


    return (
        <AuthContext.Provider value={{ user, isInit }}>
            {children}
        </AuthContext.Provider>
    );
}