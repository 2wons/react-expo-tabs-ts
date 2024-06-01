import axios from 'axios'
import { Platform } from 'react-native';
import FormData from 'form-data';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const loginWithUserAndPassword = async (email: string, password: string) => {
    return axios.post(
        `${BASE_URL}/Account/Login`,
        { email: email, password: password }
    )
}

export const register = async (name: string, email: string, password: string) => {
    return axios.post(
        `${BASE_URL}/Account/Register`,
        {name: name, email: email, password: password}
    );
}

export const getMe = async () => {
    return axios.get(
        `${BASE_URL}/Account/GetSelf`
    )
}

export const resetPassword = async (newpw: string, oldpw: string) => {
    return axios.put(
        `${BASE_URL}/Account/EditPassword`,
        { newPassword: newpw, oldPassword: oldpw}
    )
}

export const editSelf = async (name: string) => {
    return axios.put(
        `${BASE_URL}/Account/EditSelf`,
        { name: name }
    )
}

export const uploadAvatar = async (uri: string) => {
    const formData = new FormData();

    const fileName = uri.split('/').pop();

    formData.append('avatar', {
        uri: Platform.OS === 'android' ? uri : uri!.replace('file://', ""),
        name: fileName,
        type: 'image/jpg',
    });

    return axios.post(
        `${BASE_URL}/Account/UploadAvatar`,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    )
}
