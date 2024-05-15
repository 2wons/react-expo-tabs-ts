import { Alert, StyleSheet } from 'react-native';
import { View } from '@/components/Themed';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location'
import { useState, useEffect } from 'react';

const INITIAL_REGION = {
  /* Feut */
  latitude: 14.604326629763175,
  longitude: 120.98867833889382,
  latitudeDelta: 0.00422,
  longitudeDelta: 0.00421 
}

export default function MapScreen() {
  const [location, setLocation] = useState<Location.LocationObject>()
  
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status != 'granted') {
        Alert.alert("Permission to access location was denied.")
        return;
      }

      const location = await Location.getCurrentPositionAsync();
      setLocation(location)
    })()

  }, [])

  return (
    <View style={styles.container}>
       <MapView 
        style={styles.map}
        initialRegion={INITIAL_REGION}
        region={{
          latitude: location?.coords.latitude!,
          longitude: location?.coords.longitude!,
          latitudeDelta: 0.00422,
          longitudeDelta: 0.00421
        }}
        showsUserLocation
        showsMyLocationButton 
       />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%'
  }
});
