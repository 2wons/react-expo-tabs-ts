import { StyleSheet, SafeAreaView } from 'react-native';

import { useRef} from 'react';

import SafeViewAndroid from '@/components/SafeViewAndroid';

import { Camera, CameraType } from 'expo-camera'

import { XStack, YStack, Button } from 'tamagui';

interface CameraViewProps {
  onCapture: (uri: string) => void;
  onCameraReady: (newState: boolean) => void;
}

export default function CameraView(props: CameraViewProps) {
  let { onCapture, onCameraReady } = props;
  const cameraRef = useRef<Camera>(null);

  const handleCapture = async () => {
    if (!cameraRef.current) {
      console.log('nocamera')
      return; 
    }
    const photo = await cameraRef.current.takePictureAsync();
    onCapture(photo.uri);
    onCameraReady(false);
  }

  // TODO: make better button layouts
  return (
    <Camera style = {styles.camera} ratio='16:9' type = {CameraType.back} ref = {cameraRef}>
        <SafeAreaView style={{...SafeViewAndroid.AndroidSafeArea, ...styles.container}}>
          <Button onPress={() => {handleCapture()}}>Capture</Button>
          <Button onPress={() => {onCameraReady(false)}}>Cancel</Button>
        </SafeAreaView>
      </Camera>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  camera: {
    flex: 1,
    width: '100%',
    height: '100%',
    margin: 0,
    position: 'absolute',
    zIndex: 1,
  },
});
