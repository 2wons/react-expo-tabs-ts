import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Alert } from "react-native";
import { useState, useEffect } from "react";

import { View } from "@/components/Themed";
import { Button, Form, Spinner, Input, XStack, H1, Text as TamText } from "tamagui";

import { useAuth as useAuthy } from "@/contexts/AuthyContext";

import { router, Link } from 'expo-router';

export default function RegisterScreen() {
  const [status, setStatus] = useState<"off" | "submitting" | "submitted">(
    "off"
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { onRegister } = useAuthy();

  const handleLogin = async () => {
    setStatus('submitting');
    const response = await onRegister!(email, password);
    if (response.error) {
      Alert.alert('Invalid Username or Password');
    }
    else {
      Alert.alert('Sign up Successful');
      setEmail('');
      setPassword('');
      router.replace('/auth')
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
      <H1>Get Started</H1>
      <TamText theme='alt2'>Create a new account</TamText>

      <Form
        gap="$2"
        onSubmit={handleLogin}
        borderWidth={0}
        borderRadius="$4"
        backgroundColor="$background"
        borderColor="$borderColor"
        marginTop="$6"
      >
        <TamText fontSize={"$3"}>Email</TamText>
        <Input width={'100%'} size="$4" placeholder={'Enter you email'} borderWidth={2}
          marginBottom='$2'
          value={email}
          onChangeText={t => setEmail(t)} />

        <TamText fontSize={"$3"}>Password</TamText>
        <Input width={'100%'} size="$4" placeholder={'Choose a password'} borderWidth={2} 
          value={password}
          onChangeText={t => setPassword(t)}
          secureTextEntry/>

        <XStack gap='$2' marginVertical="$5" width={'100%'}>
          <Form.Trigger asChild disabled={status !== "off"}>
            <Button themeInverse width={'100%'}icon={status === "submitting" ? () => <Spinner /> : undefined}>
              Sign Up
            </Button>
          </Form.Trigger>
        </XStack>
        
      </Form>
      <XStack alignItems="center" gap={'$2'}>
        <TamText>Already have an Account?</TamText>
        <Link replace href='/auth' asChild>
            <Button size={"$2"} variant="outlined">Login</Button>
        </Link>
      </XStack>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
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
