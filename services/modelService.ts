import FormData from 'form-data'
import axios, {AxiosError} from 'axios'
import { Platform } from 'react-native';
import { HEALTHY, INITIAL, MODERATE, EXTENSIVE } from '@/constants/Common';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

/**
 * Calls the api to do analysis on image.
 * @param {string} uri - uri of image file
 */
export const analyzeTeeth = async (uri: string, iou: number = 0.25) => {

    const formData = new FormData();

    const fileName = uri.split('/').pop();

    formData.append('file', {
        uri: Platform.OS === 'android' ? uri : uri!.replace('file://', ""),
        name: fileName,
        type: 'image/jpg',
    });
    
    try {
        const response = await axios.post(`${BASE_URL}/Image/AnalyzeImage`,
            formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                params: {
                    threshold: iou,
                    drawNames: false,
                    drawConfidence: false
                }
            }
        )

        const cariesRank: {[key: string]: number} = {
            [HEALTHY]:   1,
            [INITIAL]:   2,
            [MODERATE]:  3,
            [EXTENSIVE]: 4
        }

        const classCounts = {
            healthy:    0,
            initial:    0,
            moderate:   0,
            extensive:  0,
            
        }
        const classes: string[] = ["none"]
        // count each occurence of className
        response.data.detections.forEach((detection: any) => {
            classes.push(detection.className)
            switch (detection.className) {
                case HEALTHY:
                    classCounts.healthy++;
                    break;
                case INITIAL:
                    classCounts.initial++;
                    break;
                case MODERATE:
                    classCounts.moderate++;
                    break;
                case EXTENSIVE:
                    classCounts.extensive++;
                    break;
                default:
                    
                    break;
            }
        })
        
        const filters = Array.from(new Set(classes))
        const extreme = filters
            .reduce((a: string, b:string) => cariesRank[a] > cariesRank[b] ? a : b);
        console.log(extreme)

        const ResponseWithCount = {...response.data, classCounts, extreme}
        return ResponseWithCount;
    } catch (error: any) {
        if (error.response) {
            console.log(error.response);
        }
        throw error;
    }
}