import { StyleSheet, SafeAreaView, Alert } from 'react-native';

import Colors from '@/constants/Colors';
import SafeViewAndroid from '@/components/SafeViewAndroid';
import { useColorScheme } from '@/components/useColorScheme';

import { Text, View, ScrollView } from '@/components/Themed';
import { XStack, YStack, Button } from 'tamagui'
import ResultCard from '@/components/ResultCard';
import { Link } from 'expo-router';
import { useAuth } from '@/contexts/AuthyContext';
import { useData } from '@/contexts/DataContext';
import { router } from 'expo-router';
import { AlertButton } from '@/components/Alert';

import { CircleUserRound } from '@tamagui/lucide-icons';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const { authState } = useAuth();

  const { history, clear } = useData();

  const debug = () => {
    router.push('/partner')
  }

  const clearAll = async () => {
    try {
      await clear!();
      Alert.alert("History cleared");
    } catch (error) {
      Alert.alert("Error Clearing History");
    }
  }

  const reports = Object.keys(history!).reverse().map((id) => {
    const i = history![id];
    const dateTaken = new Date(i.timestamp)
    return (
      <ResultCard
        key={id}
        flexBasis={200}
        flexGrow={1}
        height={250}
        title={i.title}
        subtitle={dateTaken.toLocaleString()}
        id={id}
        image={i.img}
      />
    );
  });

  return (
    <SafeAreaView style={{...SafeViewAndroid.AndroidSafeArea, backgroundColor: Colors[colorScheme ?? 'light'].background}}>
      <View style={styles.myHeader}>
        <Text style={styles.h1}>Home</Text>
        <Link href={authState?.authenticated ? '/profile' : '/auth'} asChild>
          <CircleUserRound size={48} /> 
        </Link>
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.container}>
        <AlertButton label="Clear History" title="Confirm Clear" message='Are you sure you want to clear your whole history?'
          onConfirm={clearAll} />
      </View>
      
      <ScrollView style={styles.container}>
        {reports ? <XStack $sm={{ flex: 1 }} marginVertical="$4"  space>
          <YStack flex={1} flexGrow={1} flexDirection='row' flexWrap='wrap' backgroundColor={'$background025'} rowGap={10} columnGap={10}>
            {reports}
           
            {/* ^make into flatlist */}
          </YStack>
        </XStack>
        : <Text>Empty History</Text>}
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
