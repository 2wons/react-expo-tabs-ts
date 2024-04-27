import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { TamaguiProvider, createTamagui, Theme } from 'tamagui';
import { config } from '@tamagui/config/v3'

import { useColorScheme } from '@/components/useColorScheme';
import { AuthProvider } from '@/contexts/AuthyContext';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

// you usually export this from a tamagui.config.ts file
const tamaguiConfig = createTamagui(config)

// make TypeScript type everything based on your config
type Conf = typeof tamaguiConfig
declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends Conf { }
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (

    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <TamaguiProvider config={tamaguiConfig}>
        <Theme name={colorScheme}>
          <AuthProvider>
            <Stack>
              <Stack.Screen name="(tabs)"  options={{ headerShown: false, title: 'Carident'}} />
              <Stack.Screen name="auth" options={{ presentation: 'modal', headerShown: false }} />
              <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
            </Stack>
          </AuthProvider>
        </Theme>
      </TamaguiProvider>
    </ThemeProvider>
  );
}
