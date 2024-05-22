import { Alert, StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import { useColorScheme, View as NormalView, Text, Dimensions } from 'react-native';

import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { useState, useEffect, useRef } from 'react';
import Animated, { useAnimatedRef, useSharedValue, useAnimatedScrollHandler } from 'react-native-reanimated';

import { markers, PointOfInterest } from '@/constants/Markers';
import * as Location from 'expo-location'
import PlaceCard from '@/components/PlaceCard';
import { place } from '@/constants/Markers';

const { width: screenWidth } = Dimensions.get('window');
const cardWidth = screenWidth * 0.85;
const cardMargin = 10; 

const LATITIUDE_DELTA = 0.000000422
const LONGITUDE_DELTA = 0.000000421

const INITIAL_REGION = {
  /* Feut */
  latitude: 14.604326629763175,
  longitude: 120.98867833889382,
  latitudeDelta: LATITIUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA 
}

export default function MapScreen() {
  const [location, setLocation] = useState<Location.LocationObject>()
  const animatedRef = useAnimatedRef<Animated.ScrollView>();
  const scrollX = useSharedValue(0)
  const mapRef = useRef<any>()
  const theme = useColorScheme()
  
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

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });

  const onMarkerPress = (place: PointOfInterest, index: number) => {
    mapRef?.current?.animateCamera(
      {
        center: {
          ...place.coordinate,
          latitudeDelta: LATITIUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        },
      },
      { duration: 1000 }
    );
    const pos =
      index * (cardWidth + cardMargin * 2) -
      (screenWidth - cardWidth) / 2 +
      cardMargin;
    animatedRef.current?.scrollTo({x: pos})
  };
  
  return (
    <View style={styles.container}>
       <MapView 
        style={styles.map}
        initialRegion={INITIAL_REGION}
        region={{
          ...location?.coords!,
          latitudeDelta: 0.00422,
          longitudeDelta: 0.00421
        }}
        ref={mapRef}
        userInterfaceStyle={theme ?? 'light'}
        showsUserLocation
       >
        {markers.map((marker, index) => {
          return (
            <Marker key={index} coordinate={marker.coordinate} onPress={() => onMarkerPress(marker, index)}>
              <Callout>
                <NormalView style={{ padding: 5 }}>
                  <Text>{marker.title}</Text>
                </NormalView>
              </Callout>
            </Marker>
          )
        })}
        </MapView>
        <Animated.ScrollView 
          horizontal
          ref={animatedRef} 
          style={styles.infobox} 
          contentContainerStyle={styles.scrollContent}
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          snapToAlignment='center'
          decelerationRate="fast"
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          contentInset={{ // Ensure the first and last card can be centered
            left: (screenWidth - cardWidth) / 2,
            right: (screenWidth - cardWidth) / 2
          }}
          contentOffset={{ // Start with the first card centered
            x: (screenWidth - cardWidth) / 2 - cardMargin,
            y: 0
          }}
          snapToInterval={cardWidth + cardMargin * 2} 
          directionalLockEnabled
          >
          <PlaceCard place={place} />
          <PlaceCard place={place} />
          <PlaceCard place={place} />

        </Animated.ScrollView> 
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
    height: '100%',
  },
  infobox: {
    bottom: 0,
    width: '100%',
    height: 265,
    position: 'absolute',
    alignSelf: 'center',
    alignContent: 'center',
    marginBottom: 5,
  },
  scrollContent: {
    justifyContent: 'center',
  },
});
