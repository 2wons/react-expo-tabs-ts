import { StyleSheet, Alert, SafeAreaView } from 'react-native';

import { useState } from 'react';

import CameraView from '@/components/Camera';
import { Image } from 'react-native';

import { Camera } from 'expo-camera'

import { Text, View } from '@/components/Themed';
import { XStack, YStack, Button } from 'tamagui';
import { useCamera } from '../contexts/CameraContext';

export default function TabTwoScreen() {

  const [image, setImage] = useState<string | null>('');
  const {cameraReady, setCameraReady} = useCamera();

  const openCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();

    if ( status === 'granted' ) {
      // open cam
      setCameraReady(true);
    }
    else {
      Alert.alert('Camera Access denied.');
    }
  }

  const capture = (uri: string) => {
    console.log(uri);
    setImage(uri);
  }

  const select = () => {
    // select image from gallery
  }

  return (
    
    <View style={{flex: 1, alignItems: 'center', padding: cameraReady ? 0:10 }}>
      <Text style={styles.title}>Select Image Source</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <XStack justifyContent='space-evenly' gap="$5" paddingHorizontal="$5">
        <YStack flex={1} gap="$5" borderWidth={0} padding={1} borderColor={'$background025'}>
          <Button alignSelf='stretch' size="$6" variant='outlined' borderWidth={1} height={80} onPress={openCamera}>
          <Text style={styles.textEmoji}>📸</Text>
          <Text>Camera</Text>
          </Button>
        </YStack>
        <YStack flex={1} gap="$2" borderWidth={0} padding={1} borderColor={'$background025'}>
          <Button alignSelf='stretch' size="$6" variant='outlined' borderWidth={1} height={80} onPress={select}>
          <Text style={styles.textEmoji}>🖼</Text>
          <Text>Gallery</Text>
          </Button>
        </YStack>
      </XStack>
      <YStack backgroundColor={'$background025'} justifyContent='center' alignItems='center' marginVertical='5%' borderRadius={10}>
          <Image source={{uri: image ? image : 'https://i.pinimg.com/736x/e4/8d/b6/e48db6ef87ba443b03965789dce98b80.jpg'}} style={styles.image} resizeMode='cover' />
      </YStack>
      <XStack gap='$5' width={'100%'}>
        <Button onPress={() => setImage(null) }flex={1}>Cancel</Button>
        <Button flex={1}>Analyze</Button>
      </XStack>
      { cameraReady ? (
          <CameraView onCapture={capture} onCameraReady={setCameraReady} />
      ) : null

      }
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '90%',
  },
  textEmoji: {
    fontSize: 20,
  },
  viewDebug: {
    flex: 1,
    width: '100%',
    margin: 30,
    backgroundColor:'#2e2d2c'
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1.5,
    borderRadius: 10
  },
});
