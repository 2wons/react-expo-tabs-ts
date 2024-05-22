import axios from 'axios'

const API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;
const BASE_URL = 'https://maps.googleapis.com/maps/api';

interface Coords {
    longitude: string;
    latitude: string;
};

export const getNearbyClinics = async (location: Coords) => {

    const locationStr = location.latitude + '%' + location.longitude;
    const baseQuery = `${BASE_URL}/place/nearbysearch/json?`;
    const keyword = 'dental%clinic'
    const type = 'dentist';
    const radius = '400';

    try {
        const url = `${baseQuery}${locationStr}keyword=${keyword}&radius=${radius}&type${type}&key=${API_KEY}`

        const response = await axios.get(url);

        console.log(response)

        return response.data;
        
    } catch (error) {
        throw error;
    }
}