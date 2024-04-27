import { useContext, createContext, ReactNode, useState, useEffect } from 'react';
import { loginWithUserAndPassword, register as registerUser } from '@/services/authService';
import * as SecureStore from 'expo-secure-store'
import axios from 'axios';

/* token key string for accessing token in secure store */
const TOKEN_KEY = 'MY_JWT_TOKEN'

interface AuthState {
    token: string | null;
    expiration: string | null;
    authenticated: boolean;
}

interface AuthProviderProps {
    children: ReactNode;
};

interface AuthContextInterface {
    authState?: AuthState | null;
    onRegister?: (username: string, password: string) => Promise<any>;
    onLogin?: (username: string, password: string) => Promise<any>;
    onLogout?: () => Promise<any>
}

const AuthContext = createContext<AuthContextInterface>({})

export const AuthProvider = ({children}: AuthProviderProps) => {
    
    const [authState, setAuthState] = useState<AuthState>();

    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);
            const expiration = await SecureStore.getItemAsync('expiration');
            
            if (token) {
                // TODO: check for expiration
                setAuthState({ token, expiration, authenticated: true })
                axios.defaults.headers.common.Authorization = `Bearer ${token}`;
            }
        }
        loadToken();
    }, [])

    const register = async (username: string, password: string) => {
        try {
            const response = await registerUser(username, password);
            return response;
        } catch (e) {
            return { error: true }
        }
    }
    
    const login = async (username: string, password: string) => {
        try {
            const response = await loginWithUserAndPassword(username, password);
            const { token, expiration } = response.data;
            setAuthState({
                token: token,
                expiration: expiration,
                authenticated: true
            });

            axios.defaults.headers.common.Authorization = `Bearer ${token}`;
            await SecureStore.setItemAsync(TOKEN_KEY, token);
            await SecureStore.setItemAsync('expiration', expiration);
            return response;
        } catch (error) {
            return { error: true }
        }
    }

    const logout = async () => {
        /* Delete Auth Information from storage */
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        await SecureStore.deleteItemAsync('expiration');
        
        // reset auth state
        setAuthState(undefined);

        // Update HTTP headers
        axios.defaults.headers.common.Authorization = '';
    }

    const value: AuthContextInterface = {
        authState: authState,
        onRegister: register,
        onLogin: login,
        onLogout: logout
    }

    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () : AuthContextInterface => useContext(AuthContext);