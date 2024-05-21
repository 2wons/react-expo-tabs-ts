import { StyleSheet, SafeAreaView, Alert } from 'react-native';
import { useState, useEffect } from 'react';

import Colors from '@/constants/Colors';
import SafeViewAndroid from '@/components/SafeViewAndroid';
import { useColorScheme } from '@/components/useColorScheme';

import { Text, View, ScrollView } from '@/components/Themed';
import { Feather } from '@expo/vector-icons';
import { XStack, YStack, Button } from 'tamagui'
import ResultCard from '@/components/CustomCard';
import { Link } from 'expo-router';
import { useAuth } from '@/contexts/AuthyContext';
import { useData } from '@/contexts/DataContext';
import { router } from 'expo-router';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const { authState } = useAuth();

  const { history, clear } = useData();

  const debug = () => {
    router.push('/modal')
  }

  const clearAll = async () => {
    try {
      await clear!();
      Alert.alert("History cleared");
    } catch (error) {
      Alert.alert("Error Clearing History");
    }
  }

  const reports = Object.keys(history!).map((id) => {
    const i = history![id];
    return (
      <ResultCard
        key={id}
        flexBasis={200}
        flexGrow={1}
        height={250}
        title={id}
        subtitle={i.timestamp}
        id={id}
      />
    );
  });

  return (
    <SafeAreaView style={{...SafeViewAndroid.AndroidSafeArea, backgroundColor: Colors[colorScheme ?? 'light'].background}}>
      <View style={styles.myHeader}>
        <Text style={styles.h1}>Home</Text>
        <Link href={authState?.authenticated ? '/profile' : '/auth'} asChild>
          <Feather size={48} name='heart' color={Colors[colorScheme ?? 'light'].text} />
        </Link>
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Button themeInverse onPress={debug}>Debug</Button>
      <Button onPress={clearAll}>Clear History</Button>
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
