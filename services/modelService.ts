import FormData from 'form-data'
import axios, {AxiosError} from 'axios'
import { Platform } from 'react-native';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

/**
 * Calls the api to do analysis on image.
 * @param {string} uri - uri of image file
 */
export const analyzeTeeth = async (uri: string) => {

    const formData = new FormData();

    const fileName = uri.split('/').pop();

    formData.append('file', {
        uri: Platform.OS === 'android' ? uri : uri!.replace('file://', ""),
        name: fileName,
        type: 'image/jpg',
    });

    const headers = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };
    
    try {
        const response = await axios.post(`${BASE_URL}/Image/AnalyzeImage`,
            formData,
            headers
        )
        const classCounts : { [key:string]: number} = {}
        // count each occurence of className
        response.data.detections.forEach((detection: any) => {
            const className: string = detection.className
            if (classCounts.hasOwnProperty(className)) {
                classCounts[className]++
            } else {
                classCounts[className] = 1
            }
        })
        const ResponseWithCount = {...response.data, classCounts}
        console.log(ResponseWithCount)
        return ResponseWithCount;
    } catch (error: any) {
        if (error.response) {
            console.log(error.response);
        }
        throw error;
    }
}