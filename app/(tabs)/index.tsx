import { StyleSheet, SafeAreaView, Alert } from 'react-native';

import Colors from '@/constants/Colors';
import SafeViewAndroid from '@/components/SafeViewAndroid';
import { useColorScheme } from '@/components/useColorScheme';

import { Link } from 'expo-router';
import { router } from 'expo-router';

import { CircleProps, XStack, YStack, Text, Avatar, Circle, H1 } from 'tamagui';
import { CircleUserRound, ArrowRight, Archive } from '@tamagui/lucide-icons';

import { View, ScrollView } from '@/components/Themed';
import ResultCard from '@/components/ResultCard';
import { AlertButton } from '@/components/Alert';

import { useAuth } from '@/contexts/AuthyContext';
import { useData } from '@/contexts/DataContext';
import { Button } from '@/components/Button';
import { Button as TamaguiButton } from 'tamagui';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const { authState, user } = useAuth();

  const { history, clear } = useData();

  const clearAll = async () => {
    try {
      await clear!('archive');
    } catch (error) {
      Alert.alert("Error Clearing History");
    }
  }

  const reports = Object.keys(history!).
    filter((id) => {
      return history![id].archived === false;
    })
    .reverse().map((id) => {
    const i = history![id];
    const dateTaken = new Date(i.timestamp)
    if (i.archived) return null;
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
        shared={i.shared}
        onPress={() => {
          router.push({
            pathname: '/result',
            params: { id: i.id.toString() }
          })
        }}
      />
    );
  });

  return (
    <SafeAreaView style={{...SafeViewAndroid.AndroidSafeArea, backgroundColor: Colors[colorScheme ?? 'light'].background}}>
      <View style={styles.myHeader}>
        <H1>Home</H1>
        <Link href={authState?.authenticated ? '/profile' : '/auth'} asChild>
          { authState?.authenticated 
            ? <CircleAvatar uri={user?.avatar!} />
            : (
              <XStack borderWidth="$1" borderColor="$gray3" borderRadius="$4" alignItems='center' padding="$2" gap="$2">
                <CircleUserRound size={16} /> 
                <Text>Login</Text>
              </XStack>
            )
          }
        </Link>
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <XStack style={styles.container} gap="$2">
        <TamaguiButton icon={Archive} onPress={() => router.push('/archives')}>
          Archives
        </TamaguiButton>
        <AlertButton
          flex={1} 
          label="Clear History" 
          title="Confirm Clear" 
          message='Are you sure you want to clear your whole history? This action will archive your whole history.'
          onConfirm={clearAll} 
          disabled={reports.length === 0}
          backgroundColor={
            reports.length === 0 
              ? '$background075'
              : '$background'
          }
          color={
            reports.length === 0 
              ? "$color05" 
              : "$color12"}
          cancellable
          />
      </XStack>
      
      <ScrollView style={styles.container}>
        {reports.length !== 0 ? <XStack $sm={{ flex: 1 }} marginVertical="$4"  space>
          <YStack flex={1} flexGrow={1} flexDirection='row' flexWrap='wrap' backgroundColor={'$background025'} rowGap={10} columnGap={10}>
            {reports}
          </YStack>
        </XStack>
        : (
          <YStack theme="alt2" alignItems='center' paddingVertical="$5">
            <Text alignSelf='center'>Empty History</Text> 
            <Text alignSelf='center'>{"\(Start by analyzing an image\)"}</Text>
            <Button 
              marginTop="$4" 
              size="$3" variant="primary"
              iconAfter={ArrowRight}
              onPress={() => router.push({ pathname: '/analyze' })}>
              Analyze my teeth
            </Button>
          </YStack>
        )}
      </ScrollView >
    </SafeAreaView>
  );
}

interface CircleAvatarProps extends CircleProps {
  uri: string;
}
const CircleAvatar = ({ uri, ...other }: CircleAvatarProps) => {
  return (
    <Circle size={"$5"} borderColor="$green10" borderWidth="$1" {...other}>
      <Avatar circular size="$3">
          <Avatar.Image
            accessibilityLabel="Cam"
            source={{ uri: uri }}
            defaultSource={require('@/assets/images/avatardefault.png')}
          />
          <Avatar.Fallback backgroundColor="$blue10" />
      </Avatar>
    </Circle>
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
