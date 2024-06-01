import { StyleSheet, Alert, Dimensions } from 'react-native';

import { useState } from 'react';

import { Image, Modal, Platform } from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import { SafeAreaView, View, ScrollView } from '@/components/Themed';
import { XStack, YStack, Button } from 'tamagui';
import { Loader } from '@/components/Loader';
import { XCircle } from '@tamagui/lucide-icons';

import { analyzeTeeth } from '@/services/modelService';

import { useAuth as useAuthy } from '@/contexts/AuthyContext';
import { EmojiButton } from '@/components/EmojiButton';
import { ResultView } from '@/components/ResultView';
import { ClassCounts } from '@/components/ResultView';
import { Slider, H1, Text, SizableText, Input } from 'tamagui';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export default function DetectScreen() {

  const [result, setResult] = useState<string | null>('');
  const [image, setImage] = useState<string | null>('');
  const [counts, setCounts] = useState<ClassCounts>({})
  const [visible, setVisible] = useState(false); 
  const [loading, setLoading] = useState(false);
  const [IoU, setIoU] = useState(0.25);
  
  const { authState } = useAuthy();

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
    
    try {
      const response = await analyzeTeeth(image, IoU);
      
      const resultImgPath = `${BASE_URL}/${response.plottedImagePath}`;
    
      setCounts(response.classCounts);
      setResult(resultImgPath);
      setVisible(!visible);

    } catch (error) {
      Alert.alert('Something went wrong');
      console.log('Analyze Error', error);
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
    <View style={styles.container}>

      <Modal animationType='slide' presentationStyle='pageSheet' visible={visible}
        onRequestClose={() => setVisible(!visible)}>
          <View style={styles.modal}>
            <ScrollView>
              <ResultView summary={counts} imgUri={result}>
                <Button icon={XCircle} onPress={dismiss}> Dismiss </Button>
              </ResultView>
            </ScrollView>
          </View>
      </Modal>

      <H1>Select Image Source</H1>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <XStack justifyContent='space-evenly' gap="$5">
        <EmojiButton emoji='📸' label='Camera' onPress={openCamera} />
        <EmojiButton emoji='🖼' label='Gallery' onPress={select} />
      </XStack>

      <YStack backgroundColor={'$background025'} justifyContent='center' alignItems='center' marginVertical="$2" borderRadius={10}>
          <Image source={{uri: image ? image : PLACEHOLDER }} style={styles.image} resizeMode='contain' />
      </YStack>
      <XStack justifyContent='space-between'>
        <Text theme="alt1">IoU Threshold</Text>
        <Input disabled size="$1" value={IoU.toString()} onChangeText={val => handleIoU(parseFloat(val))} />
      </XStack>
      <XStack alignItems='center' gap="$2">
        <Text>0.05</Text>
        <Slider defaultValue={[0.25]} value={[IoU]} max={1} min={0.05} step={0.05} flex={1} marginVertical="$5" onValueChange={(val) => handleIoU(val[0])}>
          <Slider.Track>
            <Slider.TrackActive />
          </Slider.Track>
          <Slider.Thumb index={0} circular size={'$2'}/>
        </Slider>
        <Text>1</Text>
      </XStack>
      <XStack gap='$3'>
        <Button onPress={() => setImage(null) } flex={1}>Reset</Button>
        <Button onPress={analyze} flex={1}>Analyze</Button>
      </XStack>
      { loading ?  <Loader /> : '' }

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  modal: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 10,
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
    borderColor: "white",
    borderStyle: "dashed",
    borderWidth: 1
  },
});
