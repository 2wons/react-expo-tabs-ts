import { View as TamaguiView, SizableText, XStack, YStack, H2, H4, ScrollView, H6, H1 } from "tamagui";
import { getAppointments } from "@/services/clinicService";
import { useEffect, useState } from "react";
import { Appointment } from "@/services/types";
import { View } from "@/components/Themed";
import { Clock, Contact, Home, RefreshCcw } from "@tamagui/lucide-icons";
import { shortDays, shortMonths } from "@/constants/Common";
import { useColorScheme } from "react-native";
import { cancelAppointment } from "@/services/clinicService";
import { AlertButton } from "@/components/Alert";
import { Loader } from "@/components/Loader";
import { Button } from "tamagui";
import { Badge } from "@/components/Badge";

export default function AppointmentScreen() {
  const [appointments, setAppointments] = useState<Appointment[] | undefined>()
  const [loading, setLoading] = useState(false)
  
  const cancel = async (id: number) => {
    await cancelAppointment(id)
      .then(() => {
        fetchAppointments()
      })
  }

  const theme = useColorScheme() ?? "light"

  const fetchAppointments = async () => {
    setLoading(true)
    setAppointments(undefined)
    const response = await getAppointments()
    const _appointments = response.data.filter((appt) => {
      return new Date(appt.scheduledAt).getTime() > new Date().getTime()
    })
    setAppointments(_appointments)
    setLoading(false)
  }

  useEffect(() => {
    fetchAppointments()
  }, [])

  return (
    <View style={{ flex: 1, paddingHorizontal: 24, backgroundColor: theme === 'dark' ? '#121212' : 'white' }}>
      <H1 paddingVertical="$2">Your Appointments</H1>
      <XStack gap="$2" alignItems="center" justifyContent="space-between">
        <SizableText theme="alt2" paddingBottom="$2">Your upcoming appointments.</SizableText>
        <Button alignSelf="flex-end" icon={RefreshCcw} onPress={fetchAppointments}/>
      </XStack>
      <ScrollView showsVerticalScrollIndicator={false}>
      {
        appointments?.filter((appointment) => {
          return new Date(appointment.scheduledAt).getTime() > new Date().getTime()
        }).map((appointment, index) => (
          <AppointmentCard key={index} appointment={appointment} onCancel={() => cancel(appointment.id)} />
        ))
      }
      {
        appointments?.length === 0 &&
        <H2 theme="alt2">No appointments found</H2>
      }
      </ScrollView>
      { loading && <Loader /> }
    </View>
  )
}

type AppointmentCardProps = {
  appointment: Appointment
  onCancel?: () => void
}

const AppointmentCard = (props: AppointmentCardProps) => {
  const { appointment, onCancel } = props
  const date = new Date(appointment.scheduledAt)

  return (
    <XStack borderWidth="$1" borderRadius="$3" borderColor="$gray3" shadowColor="$background" shadowOffset={{ width: 0, height: 2}} elevation="$0.25" shadowOpacity={0.2} shadowRadius={3.84} backgroundColor="$background" marginVertical="$2">
      <YStack backgroundColor="$black2" padding="$2.5" minWidth="$7" borderRadius="$3" borderWidth="$1" borderColor="$white5">
        <H4 color="$white5" alignSelf="flex-end">{date.getDate()}</H4>
        <SizableText color="$white5">{shortMonths[date.getMonth()]}</SizableText>
        <H6 color="$white5">{shortDays[date.getDay()]}</H6>
      </YStack>
      <YStack flex={1} >
        <XStack gap="$2" alignItems="center" borderBottomWidth="$1" borderColor="$gray5" padding="$2.5" justifyContent="space-between">
          <XStack alignItems="center" gap="$2" flex={1} flexShrink={1}>
            <Contact size="$1" />
            <SizableText flex={1} flexShrink={1} size="$5" fontWeight="bold" numberOfLines={2}>{appointment.clinic.name}</SizableText>
          </XStack>
          <TamaguiView alignItems="flex-end"style={{padding: 3 }}>
            <AlertButton 
              label="cancel" 
              title="Cancel Appointment" 
              variant="destructive"
              message="Are you sure you want to cancel this appointment?" 
              size="$1"
              danger
              cancellable
              onConfirm={onCancel} 
            />
          </TamaguiView>
        </XStack>
        <XStack gap="$2" alignItems="center" padding="$2.5">
          <Clock size="$1" />
          <SizableText size="$3">{new Date(appointment.scheduledAt).toTimeString()}</SizableText>
        </XStack>
        <XStack gap="$2" alignItems="center" padding="$2.5">
          <Home size="$1" />
          <SizableText size="$3" flex={1} flexWrap={"wrap"}>{appointment.clinic.address}</SizableText>
        </XStack>
        <XStack justifyContent="space-between" alignItems="center" padding="$2.5">
          <SizableText flex={1} flexShrink={1} theme="alt1">{appointment.clinicMessage}</SizableText>
          <Badge
            label={appointment.status}
            variant={appointment.status === "Confirmed" 
              ? "success" 
              : appointment.status === "Pending"
                ? "warning"
                : "danger"}
          />
        </XStack>
      </YStack>
    </XStack>
  )
}