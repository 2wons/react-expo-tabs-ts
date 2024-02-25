import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { Feather } from '@expo/vector-icons';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Feather>['name'];
  color: string;
}) {
  return <Feather size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        tabBarStyle: {height: 60},
        tabBarLabelStyle: {paddingBottom: 5}
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Analyze',
          tabBarIcon: ({ color }) => <TabBarIcon name="plus-circle" color={color} />,
          
        }}
      />
      <Tabs.Screen
        name="three"
        options={{
          title: 'Maps',
          tabBarIcon: ({ color }) => <TabBarIcon name="map" color={color} />,
        }}
      />
    </Tabs>
  );
}
