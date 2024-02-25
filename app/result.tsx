import { Image, StyleSheet, Dimensions } from 'react-native';
import { Text, View } from "@/components/Themed";
import { Button, XStack, YStack } from 'tamagui';

const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 9 / 16); //calculate with aspect ratio
const imageWidth = dimensions.width;

export default function ResultScreen() {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Results Screen</Text>
            <YStack backgroundColor={'$background025'} justifyContent='center' alignItems='center'>
                <Image source={{uri: 'https://i.pinimg.com/736x/e4/8d/b6/e48db6ef87ba443b03965789dce98b80.jpg'}} style={styles.image} />
            </YStack>
            <XStack marginVertical="$5">
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
      marginHorizontal: 40,
      marginVertical: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    image: {
        width: '100%',
        height: undefined,
        aspectRatio: 1
    },
  });