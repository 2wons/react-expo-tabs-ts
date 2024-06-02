import { useContext, createContext, ReactNode, useState, useEffect } from 'react';
import { getMe, loginWithUserAndPassword, register as registerUser } from '@/services/authService';
import * as SecureStore from 'expo-secure-store'
import axios, { AxiosError } from 'axios';
import { BASE_URL } from '@/constants/Common';
import { ErrorResponse } from '@/services/types';

/* token key string for accessing token in secure store */
const TOKEN_KEY = 'MY_JWT_TOKEN'

interface User {
    name: string,
    email: string,
    avatar: string
}

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
    user?: User | null;
    onRegister?: (username: string, password: string, name: string) => Promise<any>;
    onLogin?: (username: string, password: string) => Promise<any>;
    onLogout?: () => Promise<any>
    onRefresh?: () => Promise<any>
}

const AuthContext = createContext<AuthContextInterface>({})

export const AuthProvider = ({children}: AuthProviderProps) => {
    
    const [authState, setAuthState] = useState<AuthState>();
    const [user, setUser] = useState<User>()

    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);
            const expiration = await SecureStore.getItemAsync('expiration');
            
            if (token) {
                // TODO: check for expiration
                setAuthState({ token, expiration, authenticated: true })
                axios.defaults.headers.common.Authorization = `Bearer ${token}`;
                refresh()
            }
        }
        loadToken();
    }, [])

    const register = async (email: string, password: string, name: string) => {
        try {
            const response = await registerUser(name, email, password);
            return response;
        } catch (e: any) {
            const response = e as AxiosError<ErrorResponse>
            return { error: true, data: response.response?.data }
        }
    }

    const refresh = async () => {
        await getMe()
            .then((r) => {
                const {name, email, imagePath} = r.data
                setUser({name, email, avatar: `${BASE_URL}${imagePath}`})
            })
            .catch((e) => {
                console.error("Failed getting user")
                console.error(e)
            })
    }
    
    const login = async (email: string, password: string) => {
        try {
            const response = await loginWithUserAndPassword(email, password);
            const { token: _token, expiration: _expiration } = response.data;
            setAuthState({
                token: _token,
                expiration: _expiration,
                authenticated: true
            });

            axios.defaults.headers.common.Authorization = `Bearer ${_token}`;
            await SecureStore.setItemAsync(TOKEN_KEY, _token);
            await SecureStore.setItemAsync('expiration', _expiration);

            refresh()
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
        setUser(undefined)

        // Update HTTP headers
        axios.defaults.headers.common.Authorization = '';
    }

    const value: AuthContextInterface = {
        authState: authState,
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        onRefresh: refresh,
        user: user,
    }

    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () : AuthContextInterface => useContext(AuthContext);