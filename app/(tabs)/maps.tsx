import { Alert, StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import { useColorScheme, View as NormalView, Text, Dimensions } from 'react-native';

import MapView, { Marker, Callout } from 'react-native-maps';
import { useState, useEffect, useRef } from 'react';
import Animated, { useAnimatedRef, useSharedValue, withSpring } from 'react-native-reanimated';

import * as Location from 'expo-location'
import PlaceCard from '@/components/PlaceCard';
import { Loader } from '@/components/Loader';
import { getNearbyClinics, Coords } from '@/services/mapService';

import { YStack, XStack, H4, Button } from 'tamagui';
import { Search, CheckCircle2, ChevronRight } from '@tamagui/lucide-icons';

const { width: screenWidth } = Dimensions.get('window');
const cardWidth = screenWidth * 0.85;
const cardMargin = 10; 

const LATITIUDE_DELTA = 0.000422
const LONGITUDE_DELTA = 0.000421

const INITIAL_REGION = {
  /* Feut */
  latitude: 14.604326629763175,
  longitude: 120.98867833889382,
  latitudeDelta: LATITIUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA 
}

export default function MapScreen() {
  const [location, setLocation] = useState<Location.LocationObject>()
  const [nearbyPlaces, setNearbyPlaces] = useState<any>()
  const [loading, setLoading] = useState(false)

  const animatedRef = useAnimatedRef<Animated.ScrollView>();
  const height = useSharedValue<number>(140)
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

  const onMarkerPress = (place: Coords, index: number) => {
    mapRef?.current?.animateCamera(
      {
        center: {
          ...place,
          latitudeDelta: LATITIUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA, 
        },
      },
      { duration: 2000 }
    );
    const pos =
      index * (cardWidth + cardMargin * 2) -
      (screenWidth - cardWidth) / 2 +
      cardMargin;
    animatedRef.current?.scrollTo({x: pos})
  };

  const getNearby = async () => {
    try {
      setLoading(true)
      // Simulate a delay of 2 seconds for loading
      height.value = withSpring(140);

      const nearby = await getNearbyClinics({...location?.coords!})
      setNearbyPlaces(nearby)

      height.value = withSpring(265);
      setLoading(false)
      setLoading(false)

    } catch (error) {
      setLoading(false)
      height.value = withSpring(140);
      Alert.alert("No nearby clinics")
    }
  }
  
  return (
    <View style={styles.container}>
       <MapView 
        style={styles.map}
        initialRegion={INITIAL_REGION}
        region={{
          ...location?.coords!,
          latitudeDelta: LATITIUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        ref={mapRef}
        userInterfaceStyle={theme ?? 'light'}
        showsUserLocation
       >
        {nearbyPlaces && nearbyPlaces.map((nearby: any, index: number) => {
          return (
            <Marker key={index} 
              coordinate={{
                latitude: nearby.geometry.location.lat,
                longitude: nearby.geometry.location.lng
              }} 
              onPress={() => onMarkerPress({
                latitude: nearby.geometry.location.lat,
                longitude: nearby.geometry.location.lng
              }, index)}>
              <Callout>
                <NormalView style={{ padding: 5 }}>
                  <Text>{nearby.name}</Text>
                </NormalView>
              </Callout>
            </Marker>
          )
        })}
        </MapView>
        <Animated.ScrollView 
          horizontal
          ref={animatedRef} 
          style={{
            ...styles.infobox,
            height,
          }} 
          contentContainerStyle={styles.scrollContent}
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          snapToAlignment='center'
          decelerationRate="fast"
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
          { nearbyPlaces ? nearbyPlaces.map((nearby: any, index: number) => {
              return (<PlaceCard key={index} place={{
                coordinate: {
                  latitude: nearby.geometry.latitude,
                  longitude: nearby.geometry.longitude
                },
                title: nearby.name,
                description: nearby.vicinity,
                rating: nearby.rating,
                reviews: nearby.user_ratings_total
              }} />)
          }): <PromptCard onPress={getNearby} /> }
         { loading && <Loader />}
        </Animated.ScrollView> 
        <View style={styles.toolbox}>
          <Button style={styles.tool} icon={CheckCircle2} theme={'blue'} iconAfter={ChevronRight}>Partnered Clinics</Button>
          <Button style={styles.tool} icon={Search} elevate>Get Nearby</Button>
        </View>
    </View>
  );
}

interface PromptCardProps {
  onPress: () => void
}

function PromptCard({onPress}: PromptCardProps) {
  return (
    <YStack justifyContent={'center'} alignItems='center' flex={1} borderRadius={10} padding={15} width={cardWidth} margin={cardMargin} backgroundColor={"$background"}>
      <H4>Tap on Nearby Clinics to get started</H4>
      <Button width={'75%'} onPress={onPress}>Get Nearby</Button>
    </YStack>
  )
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
    position: 'absolute',
    alignSelf: 'center',
    alignContent: 'center',
    marginBottom: 5,
  },
  scrollContent: {
    justifyContent: 'center',
  },
  toolbox: {
    top: 0,
    alignSelf: 'flex-end',
    backgroundColor: 'transparent',
    position: 'absolute'
  },
  tool: {
    margin: 3
  }
});
