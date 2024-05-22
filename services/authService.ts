import axios from 'axios'

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

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
