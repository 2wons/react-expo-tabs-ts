import { useContext, createContext, ReactNode, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
    username: string;
    password: string;
}

interface AuthProviderProps {
    children: ReactNode;
};

interface AuthContextInterface {
    user: User | null;
    token: string | null;
    expiration: string | null,
    isAuthenticated: boolean;
    login: (user: User, token: string, expiration: string) => void;
    logout: () => void;
};

const AuthContextDefault: AuthContextInterface = {
    user: null,
    token: null,
    expiration: null,
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
};

const AuthContext = createContext<AuthContextInterface>(AuthContextDefault);

export const AuthProvider = ({children}: AuthProviderProps) => {

    const [isAuthenticated, setAuthenticated] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null)
    const [expiration, setExpiration] = useState<string | null>(null);

    useEffect(() => {
        const loadToken = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('token');
                const storedExpiration = await AsyncStorage.getItem('expiration');

                setToken(storedToken);
                setExpiration(storedExpiration);
                setAuthenticated(true);

            } catch (error) {
                console.error('Error loading from AsyncStorage', error);
            }
        };

        loadToken();
    }, []);

    const login = async (user: User, token: string, expiration: string) => {
        setUser(user);
        setToken(token);
        setExpiration(expiration)

        // save token to storage with asyncstorage
        try {
            await AsyncStorage.setItem('token', token);
            await AsyncStorage.setItem('expiration', expiration);
        } catch (error) {
            console.error('Error saving token to AsyncStorage:', error)
        }

        setAuthenticated(true);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        // remove stored token from AsyncStorage
        setAuthenticated(false);
    };

    const value = {user, token, expiration, isAuthenticated, login, logout};

    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextInterface => useContext(AuthContext);