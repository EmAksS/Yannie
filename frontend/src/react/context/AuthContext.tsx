import { createContext, useMemo, useState } from "react";
import { registerRequest } from "../../scripts/backend/authorization";
import { RegisterData } from "../../shared/auth/types";

type AuthContextType = {
    isAuth: boolean;
    register: (data: RegisterData) => Promise<{success: boolean}>;
    login: (token: string) => Promise<{success: boolean}>;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [isAuth, setIsAuth] = useState(
        Boolean(localStorage.getItem("token"))
    );
    
    const register = async (data: RegisterData ) => {
        try {
            const res = await registerRequest(data);
            localStorage.setItem("token", "example");
            setIsAuth(true);
            return { success: true };
        }
        catch (error: any) {
            // 👇 axios ошибка
            if (error.response) {
                console.error("❌ Ошибка ответа от сервера:");
                console.error("Status:", error.response.status);
                console.error("Data:", error.response.data);
            } 
            // 👇 запрос ушёл, но ответа нет
            else if (error.request) {
                console.error("❌ Сервер не отвечает:");
                console.error(error.request);
            } 
            // 👇 ошибка настройки
            else {
                console.error("❌ Ошибка запроса:", error.message);
            }
            return {success: false}
        }
    };

    const login = async (token: string) => {
        try {
            localStorage.setItem("token", token);
            setIsAuth(true);
            return { success: true };
        } catch {
            return { success: false };
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuth(false);
    };

    const value = useMemo(() => {
        return { isAuth, register, login, logout };
    }, [isAuth]);

    return (
        <AuthContext.Provider value={ value }>
            {children}
        </AuthContext.Provider>
    );
}