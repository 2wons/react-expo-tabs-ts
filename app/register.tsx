import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Alert } from "react-native";
import { useState, useEffect } from "react";

import { View } from "@/components/Themed";
import { Button, Form, Spinner, Input, XStack, H1, Text, YStack } from "tamagui";

import { useAuth as useAuthy } from "@/contexts/AuthyContext";

import { router, Link, useNavigation } from 'expo-router';
import { ErrorDetail } from "@/services/types";

import { Modal } from "react-native";
import { Privacy } from "@/components/Privacy";
import { XCircle } from "@tamagui/lucide-icons";

interface RegisterErrors {
  [key: string]: ErrorDetail[]
}

export default function RegisterScreen() {
  const [status, setStatus] = useState<"off" | "submitting" | "submitted">(
    "off"
  );

  const navigation = useNavigation();

  const [name , setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [privacyVisible, setPrivacyVisible] = useState(false)
  const [formErrors, setFormErrors] = useState<RegisterErrors>({})

  const { onRegister } = useAuthy();

  const validate = () => {
    let isValid = true
    let newErrors = {} as RegisterErrors;
    if (email === '') {
      isValid = false
      newErrors['email'] = [{
        message: 'Email is required',
        propertyName: 'email'
      }]
    }
    // validate email with regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (email !== '' && !emailRegex.test(email)) {
      isValid = false
      newErrors['email'] = [{
        message: 'Invalid email address',
        propertyName: 'email'
      }]
    }
    if (name === '') {
      isValid = false
      newErrors['name'] = [{
        message: 'Name is required',
        propertyName: 'name'
      }]
    }
    if (password === '') {
      isValid = false
      newErrors['password'] = [{
        message: 'Password is required',
        propertyName: 'password'
      }]
    }
    setFormErrors(newErrors)
    return isValid
  }

  const toPrivacyPolicy = () => {
    setStatus('submitting')
    if (!validate()) {
      setStatus('submitted')
      return
    }
    setPrivacyVisible(true)
  }

  const handleSubmit = async () => {
    setPrivacyVisible(false)
    const response = await onRegister!(email, password, name);
    if (response.error) {
      let newErrors = {
        "email": [],
        "name": [],
        "password": []
      } as RegisterErrors
      response.data.details.forEach((detail: ErrorDetail) => {
        if (detail.propertyName.toLowerCase().includes('password')) {
          newErrors["password"].push(detail);
        }
        if (detail.propertyName.toLowerCase().includes('email')) {
          newErrors["email"].push(detail);
        }
        if (detail.propertyName.toLowerCase().includes('name')) {
          newErrors["name"].push(detail);
        }
      })
      setFormErrors(newErrors)
    }
    else {
      Alert.alert('Sign up Successful');
      setEmail('');
      setPassword('');
      setFormErrors({});
      router.replace('/auth')
    }
    setStatus('submitted')
  }

  useEffect(() => {
    navigation.setOptions({
      title: "Sign Up",
    });
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
      <Text theme='alt2'>Create a new account</Text>

      <Form
        gap="$2"
        onSubmit={toPrivacyPolicy}
        marginTop="$6"
      >
        <Text fontSize={"$3"}>Full Name</Text>
        <Input width={'100%'} size="$4" placeholder={'Enter you full name'} borderWidth={2}
          marginBottom='$2'
          value={name}
          onChangeText={t => setName(t)} />
        {
          formErrors['name'] && formErrors['name'].map((detail: ErrorDetail, index) => {
            return (
              <Text color="$red10" key={index}>• {detail.message}</Text>
            )
          })
        }

        <Text fontSize={"$3"}>Email</Text>
        <Input width={'100%'} size="$4" placeholder={'Enter you email'} borderWidth={2}
          marginBottom='$2'
          value={email}
          autoCapitalize="none"
          onChangeText={t => setEmail(t)}  />
        {
          formErrors['email'] && formErrors['email'].map((detail: ErrorDetail, index) => {
            return (
              <Text color="$red10" key={index}>• {detail.message}</Text>
            )
          })
        }

        <Text fontSize={"$3"}>Password</Text>
        <Input width={'100%'} size="$4" placeholder={'Choose a password'} borderWidth={2} 
          value={password}
          onChangeText={t => setPassword(t)}
          secureTextEntry/>
        {
          formErrors['password'] && formErrors['password'].map((detail: ErrorDetail, index) => {
            return (
              <Text color="$red10" key={index}>• {detail.message}</Text>
            )
          })
        }

        <XStack gap='$2' marginVertical="$5" width={'100%'}>
          <Form.Trigger asChild disabled={status !== "off"}>
            <Button themeInverse width={'100%'}icon={status === "submitting" ? () => <Spinner /> : undefined}>
              Sign Up
            </Button>
          </Form.Trigger>
        </XStack>
        
      </Form>
      <XStack alignItems="center" gap={'$2'}>
        <Text>Already have an Account?</Text>
        <Link replace href='/auth' asChild>
            <Button size={"$2"} variant="outlined">Login</Button>
        </Link>
      </XStack>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />

      <Modal animationType="slide" presentationStyle="pageSheet" visible={privacyVisible}>
        <View style={styles.closeButton}>
          <XCircle onPress={() => {
            setPrivacyVisible(false)
            setStatus('submitted')
          }} />
        </View>
        <Privacy>
          <Button marginBottom="$2" onPress={handleSubmit}>Agree and Sign up</Button>
        </Privacy>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: '5%'
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 100
  }
});
