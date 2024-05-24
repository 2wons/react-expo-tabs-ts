import { Image, StyleSheet, Alert } from 'react-native';
import { Text, View } from "@/components/Themed";
import { Button, XStack, YStack } from 'tamagui';
import { useNavigation, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { History } from '@/contexts/DataContext';

import * as MediaLibrary from "expo-media-library";

export default function ResultScreen() {

    const navigation = useNavigation();
    const params = useLocalSearchParams();
    const { id } = params;
    
    const [image, setImage] = useState<string>()
    const [date, setDate] = useState<string>()

    const getResult = async () => {
        const JSONHistoryList = await AsyncStorage.getItem('history')
        const history: History = JSON.parse(JSONHistoryList!)
        
        const { img, timestamp } = history[id!.toString()]

        setImage(img);
        setDate(timestamp);
    }

    const saveImage = async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Camera roll access is required to save images.");
        return;
      }

      // Save Image to Camera Roll
      await MediaLibrary.saveToLibraryAsync(image!);
      Alert.alert("Image result saved to camera roll")
    };

    useEffect(() => {
        getResult()
    }, [])

    const defaultImage = 'https://i.postimg.cc/FFcjKg98/placeholder.png';

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Result {id}</Text>
            <YStack backgroundColor={'$background025'} justifyContent='center' alignItems='center' padding='$5'>
                <Image 
                    source={{uri: image ? image : defaultImage }} 
                    style={styles.image} resizeMode='contain' />
            </YStack>
            <Text>{date}</Text>
            <XStack padding='$5'>
                <Button flex={1} marginRight="$3">Share</Button>
                <Button onPress={saveImage} flex={1}>Save Image</Button>
            </XStack>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingHorizontal: 30,
      paddingVertical: 20,
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      padding: 15,
      alignSelf: 'flex-start'
    },
    image: {
        width: '100%',
        height: undefined,
        aspectRatio: 1.5,
        borderRadius: 10,
    },
  });