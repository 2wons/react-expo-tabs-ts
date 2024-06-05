export interface PointOfInterest {
    coordinate : {
        latitude: number,
        longitude: number,
    }
    title: string,
    description: string,
    rating: number,
    reviews: number
    open_now?: boolean | 'uknown'
}

export const place: PointOfInterest ={
    // 14.559506871269207, 121.04593751240905
    coordinate: {
        latitude: 14.559506871269207,
        longitude: 121.04593751240905
    },
    title: 'Cabana Suites Makati',
    description: 'Welcome to your point of Interest',
    rating: 4,
    reviews: 99
}

export const markers: PointOfInterest[] = [
    {
        // 14.559506871269207, 121.04593751240905
        coordinate: {
            latitude: 14.559506871269207,
            longitude: 121.04593751240905
        },
        title: 'Cabana Suites Makati',
        description: 'Welcome to your point of Interest',
        rating: 4,
        reviews: 99
    },
    {
        // 14.559691934783986, 121.04579707767495
        coordinate: {
            latitude: 14.559691934783986,
            longitude: 121.04579707767495
        },
        title: 'Patrina Bakes',
        description: 'Welcome to your point of Interest',
        rating: 4,
        reviews: 99
    },
    {
        // 14.559568621272026, 121.04622086669309
        coordinate: {
            latitude: 14.559568621272026,
            longitude: 121.04622086669309
        },
        title: 'Children Clinic',
        description: 'Welcome to your point of Interest',
        rating: 4,
        reviews: 99
    },
]