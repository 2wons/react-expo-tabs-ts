import FormData from 'form-data'
import axios, {AxiosError} from 'axios'
import { Platform } from 'react-native';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

/**
 * Calls the api to do analysis on image.
 * @param {string} uri - uri of image file
 */
export const analyzeTeeth = async (token: string, uri: string) => {

    const formData = new FormData();
    console.log(uri);

    const fileName = uri.split('/').pop();

    formData.append('file', {
        uri: Platform.OS === 'android' ? uri : uri!.replace('file://', ""),
        name: fileName,
        type: 'image/jpg',
    });

    const headers = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    };
    
    try {
        const response = await axios.post(`${BASE_URL}/Image/AnalyzeImage`,
            formData,
            headers
        )
        return response.data;
    } catch (error: any) {
        if (error.response) {
            console.log(error.response);
        }
        throw error;
    }
}