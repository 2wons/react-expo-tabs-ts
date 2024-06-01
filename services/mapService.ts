import axios from 'axios'

const API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;
const BASE_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';

export interface Coords {
    latitude: string | number;
    longitude: string | number;
};

interface PlusCode {
    compound_code: string;
    global_code: string;
  }
  
interface Location {
    lat: number;
    lng: number;
}

interface Viewport {
    northeast: Location;
    southwest: Location;
}
  
interface Geometry {
    location: Location;
    viewport: Viewport;
}

interface OpeningHours {
open_now: boolean;
periods: Array<{
    close: {
    day: number;
    time: string;
    };
    open: {
    day: number;
    time: string;
    };
}>;
weekday_text: string[];
}

// Type for the Photo object
interface Photo {
    height: number;
    html_attributions: string[];
    photo_reference: string;
    width: number;
}

// Type for the Result object
interface Result {
    business_status: string;
    geometry: Geometry;
    icon: string;
    icon_background_color: string;
    icon_mask_base_uri: string;
    name: string;
    opening_hours?: OpeningHours;
    photos?: Photo[];
    place_id: string;
    plus_code?: PlusCode;
    rating: number;
    reference: string;
    scope: string;
    types: string[];
    user_ratings_total: number;
    vicinity: string;
}

// Type for the NearbySearchResponse object
interface NearbySearchResponse {
    html_attributions: string[];
    next_page_token?: string;
    results: Result[];
    status: string;
}


export const getNearbyClinics = async (location: Coords) => {

    const locationStr = location.latitude + ',' + location.longitude;
    const keyword = 'dental'
    const type = 'dentist';
    const radius = '500';

    try {
        const url = `${BASE_URL}keyword=${keyword}&location=${locationStr}&radius=${radius}&type=${type}&key=${API_KEY}`;

        const response = await axios.get(url);
        console.log(response)
        return response.data.results;
        
    } catch (error) {
        throw error;
    }
}