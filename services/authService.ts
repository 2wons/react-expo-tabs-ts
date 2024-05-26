import axios from 'axios'

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const loginWithUserAndPassword = async (email: string, password: string) => {
    return axios.post(
        `${BASE_URL}/Account/Login`,
        { email: email, password: password }
    )
}

export const register = async (email: string, password: string) => {
    return axios.post(
        `${BASE_URL}/Account/Register`,
        {email: email, password: password}
    );
}
