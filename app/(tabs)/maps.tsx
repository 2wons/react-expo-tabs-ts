import { Alert, Modal, StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import { useColorScheme, View as NormalView, Text, Dimensions } from 'react-native';

import MapView, { Marker, Callout } from 'react-native-maps';
import { useState, useEffect, useRef } from 'react';
import Animated, { SlideInDown, SlideOutDown, SlideOutLeft } from 'react-native-reanimated';
import * as Location from 'expo-location'
import PlaceCard from '@/components/PlaceCard';
import { Loader } from '@/components/Loader';
import { getNearbyClinics, Coords, findNearbyClinics } from '@/services/mapService';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';

import { YStack, SizableText, Button, H1, XStack, Input } from 'tamagui';
import { Search, ChevronRight, Locate, Cog, XCircle } from '@tamagui/lucide-icons';
import { useNavigation } from 'expo-router';
import { calculateDistance } from '@/services/common';

const { width: screenWidth } = Dimensions.get('window');
const cardMargin = 10; 

const LATITIUDE_DELTA = 0.00422
const LONGITUDE_DELTA = 0.00421

interface MapRegion {
  latitude: number,
  longitude: number,
  latitudeDelta: number,
  longitudeDelta: number
}

const INITIAL_REGION = {
  /* Feut */
  latitude: 14.604326629763175,
  longitude: 120.98867833889382,
  latitudeDelta: LATITIUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA 
}

export default function MapScreen() {
  const [location, setLocation] = useState<Location.LocationObject>()
  const [region, setRegion] = useState<MapRegion>(INITIAL_REGION)
  const [nearbyPlaces, setNearbyPlaces] = useState<any>()
  const [loading, setLoading] = useState(false)
  const [settingsVisible, setSettingsVisible] = useState(false)
  const [radius, setRadius] = useState(500)

  const carouselRef = useRef<ICarouselInstance>(null)
  const mapRef = useRef<any>()
  const theme = useColorScheme()
  const navigation = useNavigation()

  const getCurrentLocation = async () => {
    const location = await Location.getCurrentPositionAsync()
    setLocation(location)
    setRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: LATITIUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    })
    mapRef?.current?.animateCamera(
      {
        center: { ...region },
      },
      { duration: 2000 }
    );
  }
  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync()
    if (status != 'granted') {
      Alert.alert("Permission to access location was denied.")
      return;
    }
  }
  
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Cog marginRight="$3" onPress={() => setSettingsVisible(true)}/>
      )
    })

    requestLocationPermission()
      .catch(() => {})
    getCurrentLocation()

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
    carouselRef.current?.scrollTo({index: index, animated: true})
  };

  const getNearby =  async () => {
    setLoading(true)
    setNearbyPlaces(null)

    await findNearbyClinics({...location?.coords!}, radius)
      .then((response) => {
        const filtered = response.data.filter((place: any) => {
          const distance = calculateDistance({
            first: {
              latitude: location?.coords.latitude!,
              longitude: location?.coords.longitude!
            },
            second: {
              latitude: place.latitude,
              longitude: place.longitude
            }
          })
          return distance < radius 
        })
        setNearbyPlaces(filtered)
      })
      .catch((error) => {
        console.log(error)
        Alert.alert("No nearby clinics")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleSettings = () => {
    setSettingsVisible(!settingsVisible)
  }

  const handleRadius = (text: string) => {
    if (text === '') {
      setRadius(0)
      return
    }
    setRadius(parseInt(text))
    
  }
  
  return (
    <>
    <View style={styles.container}>
      <Modal visible={settingsVisible} presentationStyle='pageSheet' onRequestClose={handleSettings} animationType='slide'>
        <View style={{ flex: 1, padding: 24 }}>
          <H1 marginBottom="$4">Nearby Clinics Settings</H1>
          <XStack justifyContent="space-between" alignItems='center' gap="$2">
            <YStack flex={1}>
              <SizableText>Nearby Radius</SizableText>
              <SizableText theme="alt2">Sets the distance range when searching for nearby clinics</SizableText>
            </YStack>
            <XStack alignItems='center' gap="$2">
              <Input maxLength={3} keyboardType='number-pad' size="$4" value={radius.toString()} onChangeText={handleRadius} />
              <SizableText>meters</SizableText>
            </XStack>
          </XStack>
          <Button icon={XCircle} marginTop="$5" onPress={handleSettings}>Close</Button>
        </View>
      </Modal>
       <MapView
        style={styles.map}
        initialRegion={INITIAL_REGION}
        region={region}
        ref={mapRef}
        userInterfaceStyle={theme ?? 'light'}
        showsUserLocation
       >
        {nearbyPlaces && nearbyPlaces.map((nearby: any, index: number) => {
          return (
            <Marker key={index} 
              coordinate={{
                latitude: nearby.latitude,
                longitude: nearby.longitude
              }} 
              onPress={() => onMarkerPress({
                latitude: nearby.latitude,
                longitude: nearby.longitude
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
        <Animated.View style={styles.absolute}>
          { nearbyPlaces ? 
          <Animated.View entering={SlideOutLeft} exiting={SlideOutDown}>
            <Carousel 
              ref={carouselRef} 
              width={screenWidth} 
              height={245}
              data={nearbyPlaces} 
              renderItem={({ item, index }: any) => {
              return (
                <PlaceCard place={{
                  id: item.id,
                  coordinate: {
                    latitude: item.latitude,
                    longitude: item.longitude
                  },
                  title: item.name,
                  description: item.address,
                  rating: 4,
                  reviews: 5,
                  open_now: true
                }}
                onPress={() => {
                  onMarkerPress({
                    latitude: item.latitude,
                    longitude: item.longitude
                  }, index)
                }}
                />
              )
            }} mode='parallax' />
          </Animated.View>
          :
          <Animated.View entering={SlideInDown}>
            {/*<PromptCard onPress={getNearby}/>*/}
          </Animated.View>
          }
        </Animated.View>
        <YStack position='absolute' flex={1} top={0} right={0} alignItems='flex-end' margin="$2" gap="$2">
            <Button icon={<Search size="$1" />} theme={'blue'} iconAfter={ChevronRight} onPress={getNearby}>
              Get Nearby Clinics
            </Button>
          <Button icon={<Locate size="$1"/>} onPress={getCurrentLocation}>
            Locate Me
          </Button>
          
        </YStack>
        { loading && <Loader />}
    </View>
    </>
  );
}

interface PromptCardProps {
  onPress: () => void
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
  absolute: {
    position: 'absolute',
    bottom: 0,
  },
  scrollContent: {
    justifyContent: 'center',
  },
  toolbox: {
    top: 0,
    alignSelf: 'flex-end',
    justifyContent:'flex-end',
    backgroundColor: 'transparent',
    position: 'absolute'
  },
  tool: {
    flexShrink: 1,
    margin: 3
  }
});
