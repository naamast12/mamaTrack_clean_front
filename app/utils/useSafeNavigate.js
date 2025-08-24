// utils/useSafeNavigate.js
import { usePathname, useRouter } from 'expo-router';
import { useCallback } from 'react';

export function useSafeNavigate() {
    const pathname = usePathname();
    const router = useRouter();
    return useCallback((to: string) => {
        if (pathname === to) return; // כבר שם? לא עושים כלום
        router.navigate(to);
    }, [pathname, router]);
}