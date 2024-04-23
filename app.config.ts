import { ExpoConfig, ConfigContext } from 'expo/config';

const GOOGLE_MAPS_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  slug: 'carident-app',
  name: 'Carident',
  userInterfaceStyle: 'automatic',
  ios: {
    config: {
        googleMapsApiKey: GOOGLE_MAPS_API_KEY
    }
  },
  android: {
    config: {
        googleMaps: {
            apiKey: GOOGLE_MAPS_API_KEY
        }
    }
  }
});