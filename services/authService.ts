import axios from 'axios'

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export const loginUser = async (username: string, password: string) => {
    
    try {
        const response = await axios.post(
            `${BASE_URL}/Account/Login`,
            {username: username, password: password}
        );
        console.log(response);
        return response.data;

    } catch (error) {
        console.error('Error', error);
        throw error;
    }
}

export const loginWithUserAndPassword = async (username: string, password: string) => {
    return axios.post(
        `${BASE_URL}/Account/Login`,
        { username: username, password: password }
    )
}

export const register = async (uesrname: string, password: string) => {
    return axios.post(
        `${BASE_URL}/Account/Register`,
        {username: uesrname, password: password}
    );
}
