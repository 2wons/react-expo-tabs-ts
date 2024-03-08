import { Image, StyleSheet, Dimensions } from 'react-native';
import { Text, View } from "@/components/Themed";
import { Button, XStack, YStack } from 'tamagui';

const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 9 / 16); //calculate with aspect ratio
const imageWidth = dimensions.width;

export default function ResultScreen() {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Saved Result Screen</Text>
            <YStack backgroundColor={'$background025'} justifyContent='center' alignItems='center' padding='$5'>
                <Image source={{uri: 'https://i.postimg.cc/FFcjKg98/placeholder.png'}} style={styles.image} resizeMode='contain' />
            </YStack>
            <XStack padding='$5'>
                <Button flex={1} marginRight="$3">Share</Button>
                <Button flex={1}>Save</Button>
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
      fontSize: 20,
      fontWeight: 'bold',
      padding: 15
    },
    image: {
        width: '100%',
        height: undefined,
        aspectRatio: 1.5,
        borderRadius: 10,
    },
  });