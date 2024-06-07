import { StyleSheet, Alert, useColorScheme } from 'react-native';

import { useEffect, useState } from 'react';

import { Image, Modal } from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import { View, ScrollView } from '@/components/Themed';
import { XStack, YStack, Button } from 'tamagui';
import { Loader } from '@/components/Loader';
import { XCircle } from '@tamagui/lucide-icons';

import { analyzeTeeth } from '@/services/modelService';

import { useAuth as useAuthy } from '@/contexts/AuthyContext';
import { ResultView } from '@/components/ResultView';
import { ClassCounts } from '@/components/ResultView';
import { Slider, H1, Text, SizableText, Input, Checkbox } from 'tamagui';
import { useNavigation } from 'expo-router';

import { ImagePlus, Camera, Check as CheckIcon, Cog } from '@tamagui/lucide-icons';
import { ImageResponse } from '@/services/types';
import { Disclaimer } from '@/components/Disclaimer';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

interface DetectOptions {
  drawConfidence: boolean 
  drawNames: boolean 
}

export default function DetectScreen() {

  const [result, setResult] = useState<string | null>('');
  const [image, setImage] = useState<string | null>('');
  const [counts, setCounts] = useState<ClassCounts>({})
  const [visible, setVisible] = useState(false); 
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [extreme, setExtreme] = useState('NONE');
  const [response, setImageResponse] = useState<ImageResponse | null>(null)
  const [settingsVisible, setSettingsVisible] = useState(false)
  const [IoU, setIoU] = useState(0.25);

  const [options, setOptions] = useState<DetectOptions>(
    {drawConfidence: false, drawNames: false}
  );

  useEffect(() => {
    
  },[])
  
  const navigation = useNavigation();
  const { authState } = useAuthy();
  const theme = useColorScheme() ?? 'light'

  const openCamera = async () => {
    // camera needs permission
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Camera Permissions Denied")
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1,1],
      quality: 1,
    });
    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  const select = async () => {
    setLoading(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      allowsEditing: true,
      //aspect: [4,3],
      quality: 1,
      //allowsMultipleSelection: true
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
    setLoading(false);
  };

  const analyze = async () => {

    if (!image) {
      Alert.alert('No Image Selected');
      return;
    }
    if (!authState?.token) {
      Alert.alert("Not Authenticated");
      return;
    }

    setLoading(true);
    setMessage('Analyzing Image');
    
    try {
      const response = await analyzeTeeth(image, IoU, options);
      setImageResponse(response);
      
      const resultImgPath = `${BASE_URL}/${response.plottedImagePath}`;
    
      setCounts(response.classCounts);
      setExtreme(response.extreme);
      setResult(resultImgPath);
      setVisible(!visible);

    } catch (error) {
      Alert.alert('Something went wrong');
      console.log('Analyze Error', error);
    } finally {
      setMessage('')
    }
    setLoading(false);
  }
  const dismiss = () => {
    setVisible(!visible);
    setResult('');
  }

  const handleIoU = (value: number) => {
    setIoU(value);
  }

  const PLACEHOLDER = 'https://i.postimg.cc/FFcjKg98/placeholder.png'

  return (
    <>
    <ScrollView style={styles.container}>
      <Modal animationType='slide' presentationStyle='pageSheet' visible={visible}
        onRequestClose={() => setVisible(!visible)}>
          <View style={styles.modal}>
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
              <ResultView summary={counts} imgUri={result} extreme={extreme} imageResponse={response!} handleVisibility={() => setVisible(!visible)}>
                <Button icon={XCircle} onPress={dismiss}> Dismiss </Button>
              </ResultView>
            </ScrollView>
          </View>
      </Modal>
      <H1>Select Image Source</H1>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <XStack justifyContent='space-evenly' gap="$3" paddingVertical="$2">
        <Button variant="outlined"size="$5" flex={1} onPress={openCamera}>
          <Camera size={24} />
          <Text>Camera</Text>
        </Button>
        <Button variant="outlined" size="$5" flex={1} onPress={select}>
          <ImagePlus size={24} />
          <Text>Gallery</Text>
        </Button>
      </XStack>
      <YStack backgroundColor={'$background025'} justifyContent='center' alignItems='center' marginVertical="$2" borderRadius={10}>
          <Image source={image ? { uri: image }: require('@/assets/images/placeholder.png')} style={{...styles.image, borderColor: theme === 'dark' ? 'white' : 'black'}} resizeMode='contain' />
      </YStack>
      {/* Settings */}
      <Modal animationType='slide' presentationStyle='pageSheet' visible={settingsVisible} onRequestClose={() => setSettingsVisible(false)}>
        <View style={styles.modal}>
          <H1>Advance Settings</H1>
          <XStack justifyContent='space-between' paddingTop="$3">
            <Text theme="alt1">IoU Threshold</Text>
            <Input disabled size="$1" value={IoU.toString()} onChangeText={val => handleIoU(parseFloat(val))} />
          </XStack>
          <XStack alignItems='center' gap="$2">
            <Text>0.05</Text>
            <Slider defaultValue={[0.25]} value={[IoU]} max={1} min={0.05} step={0.05} flex={1} marginVertical="$4" onValueChange={(val) => handleIoU(val[0])}>
              <Slider.Track>
                <Slider.TrackActive />
              </Slider.Track>
              <Slider.Thumb index={0} circular size={'$2'}/>
            </Slider>
            <Text>1</Text>
          </XStack>
          <YStack gap="$2" paddingVertical="$3">
            <XStack justifyContent='space-between'>
              <Text>Draw Confidence</Text>
              <Checkbox id='1' checked={options.drawConfidence} onCheckedChange={() => {
                setOptions({...options, drawConfidence: !options.drawConfidence})
              }}>
                <Checkbox.Indicator>
                  <CheckIcon size={16} />
                </Checkbox.Indicator>
              </Checkbox>
            </XStack>
            <XStack justifyContent='space-between'>
              <Text>Draw Labels</Text>
              <Checkbox checked={options.drawNames} onCheckedChange={() => {
                setOptions({...options, drawNames: !options.drawNames})
              }}>
                <Checkbox.Indicator>
                  <CheckIcon size={16} />
                </Checkbox.Indicator>
              </Checkbox>
            </XStack>
          </YStack>
          <Button icon={XCircle} onPress={() => setSettingsVisible(false)}>Close settings</Button>
        </View>
      </Modal>
      {/* Actions */}
      <Button icon={Cog} marginVertical="$2" backgroundColor="$gray1" onPress={() => setSettingsVisible(true)}>Settings</Button>
      <XStack gap='$3'>
        <Button onPress={() => setImage(null) } flex={1}>Reset</Button>
        <Button onPress={analyze} flex={1}>Analyze</Button>
      </XStack>

      <Disclaimer />
    </ScrollView>
    { loading && <Loader message={message} /> }
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  modal: {
    flex: 1,
    height: '100%',
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '100%',
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1.5,
    borderRadius: 10,
    borderStyle: "dashed",
    borderWidth: 1
  },
});
