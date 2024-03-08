import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";
import { useState, useEffect } from "react";

import { Text, View } from "@/components/Themed";
import { Button, Form, Spinner, Input } from "tamagui";
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
      <Text style={styles.title}>Login</Text>

      <Form
        alignItems="center"
        minWidth={300}
        gap="$2"
        onSubmit={handleLogin}
        borderWidth={1}
        borderRadius="$4"
        backgroundColor="$background"
        borderColor="$borderColor"
        padding="$8"
      >
        
        <Input width={'100%'} size="$4" placeholder={'Username'} borderWidth={2} 
          onChangeText={t => setUsername(t)} />
        <Input width={'100%'} size="$4" placeholder={'Password'} borderWidth={2} 
          onChangeText={t => setPassword(t)}
          secureTextEntry/>

        <Form.Trigger asChild disabled={status !== "off"}>
          <Button
            icon={status === "submitting" ? () => <Spinner /> : undefined}
            alignSelf="flex-end"
          >
            Submit
          </Button>
        </Form.Trigger>
      </Form>
      { isAuthenticated ? (
        <>
          <Text style={styles.green}>Authenticated</Text>
          <Text>Bearing Token: { token }</Text>
        </>
      ) : '' }

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    paddingLeft: 50
  },
  green: {
    color: 'green'
  },
});
