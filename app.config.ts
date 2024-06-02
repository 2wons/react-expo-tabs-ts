import { ExpoConfig, ConfigContext } from 'expo/config';

const GOOGLE_MAPS_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  slug: 'carident',
  name: 'Carident',
  userInterfaceStyle: 'automatic',
  ios: {
    config: {
        googleMapsApiKey: GOOGLE_MAPS_API_KEY
    },
    supportsTablet: true,
    bundleIdentifier: "com.codegeass.carident"
  },
  android: {
    config: {
        googleMaps: {
            apiKey: GOOGLE_MAPS_API_KEY
        }
    },
    package: "com.codegeass.carident",
    versionCode: 1
  },
  extra: {
    eas:{
      projectId:  "1e21b330-da3b-472e-b880-6bd54a89b3f4"
    }
  }
});