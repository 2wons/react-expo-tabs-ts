import { Alert, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "expo-router";

import { ScrollView } from "@/components/Themed";
import { H4, Paragraph, YStack } from "tamagui";

import { useLocalSearchParams } from "expo-router";

import { XStack, SizableText } from "tamagui";
import { Button } from "@/components/Button";
import { ChevronsUp, Info } from "@tamagui/lucide-icons";
import { Loader } from "@/components/Loader";

import DateTimePicker from '@react-native-community/datetimepicker';
import { useAuth } from "@/contexts/AuthyContext";
import { LoginRedirect } from "@/components/LoginRedirect";

import { createAppointment } from "@/services/clinicService";

export default function PartnerBookingScreen() {
  
  const navigation = useNavigation()
  const [loading ,setLoading] = useState<boolean>(false)

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [showDate, setShow] = useState(false);

  const { authState } = useAuth()

  const { id, clinicName, clinicAddress } = useLocalSearchParams<{
    id: string
    clinicName: string
    clinicAddress: string
  }>()

  const today = new Date()
  const two_days_later = new Date(today)
  two_days_later.setDate(today.getDate() + 2)
  
  const showMode = (currentMode: any) => {
    const currentDate = currentMode;
    setShow(true);
    setMode(currentDate);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const startBooking = async () => {
    const confirm_message =
      `Appointment Request Sent`
    const message_body =
    `You will be notified once the clinic confirms your appointment.`
    setLoading(true)

    try {
      await createAppointment({
        date: date.toISOString().split('T')[0],
        scheduledAt: date.toISOString(),
        clinicId: Number(id),
        dentistId: Number(id) >= 3 ? Number(id)-1 : Number(id)
      })
      Alert.alert(confirm_message, message_body)
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again later.")
    }
    setLoading(false)
    navigation.goBack()
  }

  useEffect(() => {
    navigation.setOptions({
      title: "Clinic Appointment"
    })
    setDate(two_days_later)
    //console.log(id)
  }, [])

  return (
    <>
    <ScrollView style={styles.container}>
      <YStack padding="$3" borderWidth="$1" borderColor="$gray3" borderRadius="$4">
        <H4>Clinic Details</H4>
        <SizableText padding="$1" theme="alt2">Clinic Name</SizableText>
        <SizableText padding="$1">{clinicName}</SizableText>
        <SizableText padding="$1" theme="alt2">Clinic Address</SizableText>
        <SizableText padding="$1">{clinicAddress}</SizableText>
      </YStack>
      <YStack paddingVertical="$2">
        <H4 paddingTop="$2">Appointment Information</H4>
        <SizableText theme="alt1" padding="$1">Date</SizableText>
        <SizableText padding="$1">{date.toDateString()}</SizableText>
        <Button onPress={showDatepicker}>Select Date</Button>
        {
          showDate && mode === 'date' && (
            <DateTimePicker
              testID="dateTimePicker"
              minimumDate={two_days_later}
              value={date}
              mode={'date'}
              onChange={(event, date) => {
                setShow(false)
                setDate(date!)
              }}
            />
          )
        }
        <SizableText theme="alt1" padding="$1" paddingTop="$3">Time</SizableText>
        <SizableText padding="$1">{date.toLocaleTimeString()}</SizableText>
        <Button onPress={showTimepicker}>Select Time</Button>
        {
          showDate && mode === 'time' && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={'time'}
              is24Hour={false}
              onChange={(event, date) => {
                setShow(false)
                setDate(date!)
              }}
            />
          )
        }
        
      </YStack>
      <XStack padding="$2" borderColor="$gray4" borderWidth="$1" borderRadius="$3" gap="$2" theme="alt1" alignItems="center">
        <Info size={20}/>
        <Paragraph>
          Double check your appointment details before proceeding
        </Paragraph>
      </XStack>
      <Button
        iconAfter={<ChevronsUp size={20}/>}
        style={styles.shareButton}
        variant="primary"
        onPress={startBooking}
        bold
      >
          Book Appointment
      </Button>
    </ScrollView>
    { loading && <Loader />}
    { !authState?.authenticated && <LoginRedirect />}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18
  },
  shareButton: {
    marginVertical: 20
  },
})