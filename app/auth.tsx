import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";
import { useState, useEffect } from "react";

import { Text, View } from "@/components/Themed";
import { Button, Form, Spinner, Input, XStack, Text as TamText } from "tamagui";
import { loginUser, register } from "@/services/authService";
import { Alert } from "react-native";

import { useAuth } from "@/contexts/AuthContext";

export default function AuthScreen() {
  const [status, setStatus] = useState<"off" | "submitting" | "submitted">(
    "off"
  );
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { token, isAuthenticated, login } = useAuth();

  const handleLogin = async () => {
    setStatus('submitting');
    try {
      const userData = await loginUser(username, password);

      const user = {
        username: username,
        password: password
      }
      login(user, userData.token, userData.expiration);
      Alert.alert('Auth Successful');

    } catch (error) {
      console.error('Error', error)
      Alert.alert('login failed.');
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
        <TamText fontSize={"$3"}>Username</TamText>
        <Input width={'100%'} size="$4" placeholder={'Username'} borderWidth={2}
          marginBottom='$2' 
          onChangeText={t => setUsername(t)} />

        <TamText fontSize={"$3"}>Password</TamText>
        <Input width={'100%'} size="$4" placeholder={'Password'} borderWidth={2} 
          onChangeText={t => setPassword(t)}
          secureTextEntry/>

        <XStack gap='$2' marginVertical="$5" width={'100%'}>
          <Button width={'50%'}>
            Forgot Password
          </Button>
          <Form.Trigger asChild disabled={status !== "off"}>
            <Button themeInverse width={'50%'}icon={status === "submitting" ? () => <Spinner /> : undefined}>
              Login
            </Button>
          </Form.Trigger>
        </XStack>
        
      </Form>
      {/* Auth Debug */}
      { isAuthenticated ? (
        <>
          <Text style={styles.green}>Authenticated</Text>
          <Text>Bearing Token: { token }</Text>
        </>
      ) : '' }
      <XStack alignItems="center" gap={'$2'}>
        <TamText>New to the Platform?</TamText>
        <Button size={"$2"} variant="outlined">Sign-up</Button>
      </XStack>
      <XStack flex={1} alignItems={"flex-end"} justifyContent="flex-end" >
        <Button size={"$2"} variant="outlined">More</Button>
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
