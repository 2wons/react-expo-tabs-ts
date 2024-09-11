import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Alert } from "react-native";
import { useState, useEffect } from "react";

import { Text, View } from "@/components/Themed";
import { Button, Form, Spinner, Input, XStack, Text as TamText } from "tamagui";

import { useAuth as useAuthy } from "@/contexts/AuthyContext";

import { Link, useRouter } from "expo-router";

export default function AuthScreen() {
  const [status, setStatus] = useState<"off" | "submitting" | "submitted">(
    "off"
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { onLogin } = useAuthy();
  const router = useRouter();

  const handleLogin = async () => {
    setStatus('submitting');
    const response = await onLogin!(email, password);
    if (response.error) {
      Alert.alert('Invalid Username or Password');
    }
    else {
      router.replace('/profile')
    }
    setStatus('submitted');
  }

  useEffect(() => {
    if (status === 'submitting') {
      const timer = setTimeout(() => setStatus('off'), 2000)
      return () => {
        clearTimeout(timer)
      }
    }
  }, [status])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login to Carident</Text>
      <Form
        gap="$2"
        onSubmit={handleLogin}
        borderWidth={0}
        borderRadius="$4"
        backgroundColor="$background"
        borderColor="$borderColor"
      >
        <TamText fontSize={"$3"}>Email</TamText>
        <Input width={'100%'} size="$4" placeholder={'Email'} borderWidth={2}
          marginBottom='$2'
          textContentType="emailAddress" 
          onChangeText={t => setEmail(t)} autoCapitalize="none" />

        <TamText fontSize={"$3"}>Password</TamText>
        <Input width={'100%'} size="$4" placeholder={'Password'} borderWidth={2}
          autoCapitalize="none" 
          onChangeText={t => setPassword(t)}
          secureTextEntry/>

        <XStack gap='$2' marginVertical="$5" width={'100%'}>
          <Form.Trigger asChild disabled={status !== "off"}>
            <Button flex={1} themeInverse icon={status === "submitting" ? () => <Spinner /> : undefined}>
              Login
            </Button>
          </Form.Trigger>
        </XStack>
      </Form>
      
      <XStack alignItems="center" gap={'$2'}>
        <TamText>New to the Platform?</TamText>
        <Link replace href='/register' asChild>
            <Button size={"$2"} variant="outlined">Sign-up</Button>
        </Link>
      </XStack>
      {/* <XStack flex={1} alignItems={"flex-end"} justifyContent="flex-end" >
        <Button size={"$2"} variant="outlined">More</Button>
      </XStack> */}

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: '5%'
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 15,
    marginTop: 20,
  },
  green: {
    color: 'green'
  },
});
