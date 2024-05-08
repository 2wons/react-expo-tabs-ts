import { Image, StyleSheet, Dimensions } from 'react-native';
import { Text, View } from "@/components/Themed";
import { Button, XStack, YStack } from 'tamagui';

export default function ResultScreen() {

    const defaultImage = 'https://i.postimg.cc/FFcjKg98/placeholder.png';

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Saved Result Screen</Text>
            <YStack backgroundColor={'$background025'} justifyContent='center' alignItems='center' padding='$5'>
                <Image 
                    source={{uri: defaultImage }} 
                    style={styles.image} resizeMode='contain' />
            </YStack>
            <XStack padding='$5'>
                <Button flex={1} marginRight="$3">Share</Button>
                <Button flex={1}>Save Image</Button>
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