import { StyleSheet } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { Image } from 'react-native';


import { Text, View } from '@/components/Themed';
import { XStack, YStack, Button } from 'tamagui';

export default function TabTwoScreen() {
  const colorScheme = useColorScheme()
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Image Source</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <XStack justifyContent='space-evenly' gap="$5" paddingHorizontal="$5">
        <YStack flex={1} gap="$5" borderWidth={0} padding={1} borderColor={'$background025'}>
          <Button alignSelf='stretch' size="$6" variant='outlined' borderWidth={1} height={80}>
          <Text style={styles.textEmoji}>📸</Text>
          <Text>Camera</Text>
          </Button>
        </YStack>
        <YStack flex={1} gap="$2" borderWidth={0} padding={1} borderColor={'$background025'}>
          <Button alignSelf='stretch' size="$6" variant='outlined' borderWidth={1} height={80}>
          <Text style={styles.textEmoji}>🖼</Text>
          <Text>Gallery</Text>
          </Button>
        </YStack>
      </XStack>
      <YStack backgroundColor={'$background025'} justifyContent='center' alignItems='center' marginVertical='5%' borderRadius={10}>
          <Image source={{uri: 'https://i.pinimg.com/736x/e4/8d/b6/e48db6ef87ba443b03965789dce98b80.jpg'}} style={styles.image} resizeMode='cover' />
      </YStack>
      <XStack gap='$5' width={'100%'}>
        <Button flex={1}>Cancel</Button>
        <Button flex={1}>Analyze</Button>
      </XStack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
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
