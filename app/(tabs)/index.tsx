import { StyleSheet, SafeAreaView } from 'react-native';

import Colors from '@/constants/Colors';
import SafeViewAndroid from '@/components/SafeViewAndroid';
import { useColorScheme } from '@/components/useColorScheme';

import { Text, View, ScrollView } from '@/components/Themed';
import { Feather } from '@expo/vector-icons';
import { Button, XStack, YStack } from 'tamagui'
import ResultCard from '@/components/CustomCard';


export default function TabOneScreen() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView style={{...SafeViewAndroid.AndroidSafeArea, backgroundColor: Colors[colorScheme ?? 'light'].background}}>
      <View style={styles.myHeader}>
        <Text style={styles.h1}>Home</Text>
        <Feather size={48} name='heart' color={Colors[colorScheme ?? 'light'].text} />
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <ScrollView style={styles.container}>
        <XStack $sm={{ flex: 1 }} marginVertical="$4"  space>
          <YStack flex={1} flexBasis={200} flexGrow={1} flexDirection='row' flexWrap='wrap' backgroundColor={'$background025'} rowGap={10} columnGap={10}>
            <ResultCard flexGrow={1} height={250} title={'Sony A7IV'} />
            <ResultCard flexGrow={1} height={250} title={'Sony A7IV'} />
            <ResultCard flexGrow={1} height={250} title={'Sony A7IV'} />
            <ResultCard flexGrow={1} height={250} title={'Sony A7IV'} />
            <ResultCard flexGrow={1} height={250} title={'Sony A7IV'} />
            <ResultCard flexGrow={1} height={250} title={'Sony A7IV'} />
            <ResultCard flexGrow={1} height={250} title={'Sony A7IV'} />
            <ResultCard flexGrow={1} height={250} title={'Sony A7IV'} />

            {/* ^make into flatlist */}
          </YStack>
        </XStack>
      </ScrollView >
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '100%',
  },
  h1: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  myHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    marginBottom: 10,
    marginTop: 30,
  }
});
