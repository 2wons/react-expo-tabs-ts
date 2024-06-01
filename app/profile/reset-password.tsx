import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { H2, Input, Text, Button, YStack } from "tamagui";
import { resetPassword } from "@/services/authService";
import { ErrorDetail, ErrorResponse } from "@/services/types";
import { Axios, AxiosError } from "axios";
import { Alert } from "react-native";

interface FormErrors {
   [key: string]: ErrorDetail[]
}

const ErrorDefaults = {
   "oldPassword": [],
   "newPassword": []

}

export default function ResetPasswordScreen() {
  const navigation = useNavigation()

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [formErrors, setFormErrors] = useState<FormErrors>({})

  const validate = () => {
      let isValid = true
      let newErrors = {} as FormErrors;
      if (oldPassword === '') {
         isValid = false
         newErrors['oldPassword'] = [{
            message: 'Old Password is required',
            propertyName: 'oldPassword'
         }]
      }
      if (newPassword === '') {
         isValid = false
         newErrors['newPassword'] = [{
            message: 'New Password is required',
            propertyName: 'newPassword'
         }]
      }
      setFormErrors(newErrors)
      return isValid
   }

  const handleSubmit = async () => {
      setFormErrors({})
      if (!validate()) {
         return
      }
      await resetPassword(newPassword, oldPassword)
         .then(() => {
            Alert.alert("Password reset Successfully")
            navigation.goBack()
            setNewPassword('')
            setOldPassword('')
         })
         .catch((e) => {
            let newError = ErrorDefaults as FormErrors
            const response = e as AxiosError<ErrorResponse>
            response.response?.data.details.forEach((detail: ErrorDetail) => {
               if (detail.propertyName.toLowerCase().includes('mismatch')) {
                  newError['oldPassword'].push(detail)
               }
               else {
                  newError['newPassword'].push(detail)
               }
            })
            setFormErrors(newError)   
         });
   }
  
  useEffect(() => {
      navigation.setOptions({
         title: "Reset Password"
      })
  }, [])

  return (
    <YStack padding="$5" gap="$2">
      <H2>Reset Password</H2>
      <Text>Enter your previous and new password to reset.</Text>
      <Input placeholder="Old Password" secureTextEntry marginTop="$5"
         value={oldPassword}
         onChangeText={(t) => setOldPassword(t)} />
      {
          formErrors['oldPassword'] && formErrors['oldPassword'].map((detail: ErrorDetail, index) => {
            return (
              <Text color="$red10" key={index}>• {detail.message}</Text>
            )
          })
      }
      <Input placeholder="New Passsoword" secureTextEntry marginTop="$3"
         value={newPassword}
         onChangeText={(t) => setNewPassword(t)} />
      {
          formErrors['newPassword'] && formErrors['newPassword'].map((detail: ErrorDetail, index) => {
            return (
              <Text color="$red10" key={index}>• {detail.message}</Text>
            )
          })
      }
      <Button onPress={handleSubmit}>Reset Password</Button>
    </YStack>
  );
}
