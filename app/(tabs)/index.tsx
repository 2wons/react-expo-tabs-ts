import { StyleSheet, SafeAreaView } from 'react-native';

import Colors from '@/constants/Colors';
import EditScreenInfo from '@/components/EditScreenInfo';
import SafeViewAndroid from '@/components/SafeViewAndroid';
import { useColorScheme } from '@/components/useColorScheme';

import { Text, View } from '@/components/Themed';
import { Feather } from '@expo/vector-icons';
import { Button, XStack } from 'tamagui'
import DemoCard from '@/components/CustomCard';

const listReports = [
  {
    id: 1,
    date: '2024 February 12',
    status: 'Healthy'
  },
  {
    id: 2,
    date: '2023 February 10',
    status: 'Decay'
  },
]



export default function TabOneScreen() {
  const colorScheme = useColorScheme();

  const reports = listReports.map((report) => {
    return (
      <DemoCard
        key={report.id}
        size="$4"
        width={200}
        height={250}
        title={report.date}
        subtitle={report.status}
      />
    )
  })


  return (
    <SafeAreaView style={{...SafeViewAndroid.AndroidSafeArea, backgroundColor: Colors[colorScheme ?? 'light'].background}}>
      <View style={styles.myHeader}>
        <Text style={styles.h1}>Home</Text>
        <Feather size={48} name='heart' color={Colors[colorScheme ?? 'light'].text} />
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.container}>
        <Button>Hello world</Button>
        <XStack $sm={{ flexDirection: 'row' }} marginVertical="$4"space>
          <DemoCard
            size="$4"
            width={200}
            height={250}
            title={'Sony A7IV'}
          />
          <DemoCard title={ '2023 February 12' } size="$5" width={200} height={250} />
        </XStack>
      </View >
      <EditScreenInfo path="app/(tabs)/index.tsx" />
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
