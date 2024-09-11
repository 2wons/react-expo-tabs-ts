import React from 'react';
import { Dimensions } from 'react-native';
import { Tabs } from 'expo-router';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { Home, CalendarClock } from '@tamagui/lucide-icons';
import { useAuth } from '@/contexts/AuthyContext';

const height = Dimensions.get('window').height;


// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { authState } = useAuth();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        
        //tabBarLabelStyle: {paddingBottom: 5}
        tabBarVisibilityAnimationConfig: {}
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => <Home color={color} />,
        }}
      />
      <Tabs.Screen
        name="analyze"
        options={{
          title: 'Analyze',
          tabBarIcon: ({ color }) => <TabBarIcon name="plus-circle" color={color} />,
        }}
      />
      <Tabs.Screen
        name="maps"
        options={{
          title: 'Nearby Clinics',
          tabBarIcon: ({ color }) => <TabBarIcon name="map-marker" color={color} />,
        }}
      />
      <Tabs.Screen
        name="appointments"
        options={{
          title: 'Appointments',
          headerTitle: "",
          href: authState?.authenticated ? '/appointments' : null,
          tabBarIcon: ({ color }) => <CalendarClock color={color} />,
        }}
      />

    </Tabs>
  );
}
