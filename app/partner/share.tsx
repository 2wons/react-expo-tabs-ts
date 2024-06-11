import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { getClinics } from "@/services/clinicService";

import { ScrollView } from "@/components/Themed";
import { H4, Paragraph, YStack } from "tamagui";

import { Clinic } from "@/services/types";
import { useLocalSearchParams } from "expo-router";
import { createReport, createAppointment } from "@/services/clinicService";
import { Alert } from "react-native";

import { RadioGroup, XStack, SizableText } from "tamagui";
import { Button } from "@/components/Button";
import { BulletList } from "react-content-loader/native";
import { ChevronsUp, Info } from "@tamagui/lucide-icons";
import { Loader } from "@/components/Loader";
import { useData } from "@/contexts/DataContext";

import DateTimePicker from '@react-native-community/datetimepicker';
import { useAuth } from "@/contexts/AuthyContext";
import { LoginRedirect } from "@/components/LoginRedirect";
import { calculateDistance } from "@/services/common";
import * as Location from 'expo-location';

const DEFAULT_COORDINATE = {
  latitude: 14.604326629763175,
  longitude: 120.98867833889382
}

export default function PartnerShareScreen() {

  const [clinics, setClinics] = useState<Clinic[] | null>(null)
  const [loading ,setLoading] = useState<boolean>(false)
  const [selected, setSelected] = useState<number>()

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [showDate, setShow] = useState(false);
  const { authState } = useAuth()
  
  const { history, edit } = useData()

  const { serverId, localId } = useLocalSearchParams<{ serverId: string, localId: string }>()

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

  const setReportToShared = async () => {
    const report = history![localId!];
    let newReport = { ...report, shared: true };
    await edit!(localId!, newReport)
      .then()
      .catch(error => {
        Alert.alert("Something went wrong")
      })
  }

  const shareReport = async () => {
    if (!selected) {
      return
    }
    setLoading(true)

    try {
      await createAppointment({
        date: date.toISOString().split('T')[0],
        scheduledAt: date.toISOString(),
        clinicId: selected,
        dentistId: selected
      })
      await createReport({
        clinicId: selected,
        imageIds: [Number(serverId)],
        description: "Shared from mobile app",
        title: "Shared Report"
      })
      setReportToShared()
      Alert.alert("Report and appointment request sent. You will be notified once the clinic confirms your appointment.")
      navigation.goBack()
    } catch (error) {
      const errors = error as any
      console.log(errors.response.data)
      Alert.alert("Something went wrong")
    }
    setLoading(false)
  }

  const navigation = useNavigation()

  const getLocation  = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
      return
    }
    let location = await Location.getCurrentPositionAsync({});
    return location
  }

  const fetchClinics = async () => {
    const _location = await getLocation()
    // testss
    const coordinates = _location?.coords
     ? {
        latitude: _location?.coords.latitude,
        longitude: _location?.coords.longitude,
      }
      : DEFAULT_COORDINATE;
    console.log(`Using Default: ${coordinates === DEFAULT_COORDINATE}`)
    await getClinics()
      .then((res) => {
        const filtered = res.data.filter((place) => {
          const distance = calculateDistance({
            first: coordinates,
            second: { latitude: place.latitude, longitude: place.longitude },
          });
          return distance < 800;
        });
        setClinics(filtered);
      })
      .catch((e) => {
        Alert.alert(e);
      });
  };

  useEffect(() => {
    navigation.setOptions({
      title: "Sharing Report"
    })
    fetchClinics()
  }, [])

  return (
    <>
    <ScrollView style={styles.container}>
      <H4 paddingVertical="$3"l>Select Nearby Clinic</H4>
      <RadioGroup value={selected?.toString()}onValueChange={(value) => {
        setSelected(Number(value))
      }}
      rowGap="$2">
      {
        clinics === null && (
          <BulletList />
        )
      }
      {
        clinics && clinics.length === 0 && (
          <SizableText theme="alt1">No nearby clinics</SizableText>
        )
      }
      { clinics && clinics.map((clinic) => {
        return (
          <XStack gap="$3" alignItems="center" backgroundColor="$gray1" padding="$3" borderRadius="$5" borderColor="$gray3" borderWidth="$1"
            onPress={() => {
              setSelected(clinic.id)
            }} key={clinic.id}>
            <RadioGroup.Item value={clinic.id.toString()} size="$3">
              <RadioGroup.Indicator backgroundColor="$green10" scale="$1"/>
            </RadioGroup.Item>
            <YStack>
              <SizableText size="$4" fontWeight={700}>{clinic.name}</SizableText>
              <SizableText size="$3" theme="alt1" numberOfLines={1}>{clinic.address}</SizableText>
            </YStack>
          </XStack>
        )
      })}
      </RadioGroup>

      <YStack paddingVertical="$2">
        <H4 paddingTop="$2">Booking Information</H4>
        <SizableText padding="$1">Date</SizableText>
        <SizableText padding="$1">{date.toDateString()}</SizableText>
        <Button onPress={showDatepicker}>Select Date</Button>
        {
          showDate && mode === 'date' && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={'date'}
              onChange={(event, date) => {
                setShow(false)
                setDate(date!)
              }}
            />
          )
        }
        <SizableText padding="$1" paddingTop="$3">Time</SizableText>
        <SizableText padding="$1">{date.toLocaleTimeString()}</SizableText>
        <Button onPress={showTimepicker}>Select Time</Button>
        {
          showDate && mode === 'time' && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={'time'}
              onChange={(event, date) => {
                setShow(false)
                setDate(date!)
              }}
            />
          )
        }
        
      </YStack>
      <XStack padding="$2" borderColor="$gray4" borderWidth="$1" borderRadius="$3" gap="$2" theme="alt1">
        <Info size={20}/>
        <Paragraph>
          Please note that sharing this report comes with appointment booking with selected clinic
          </Paragraph>
      </XStack>
      <Button
        iconAfter={<ChevronsUp color="white" size={20}/> }
        style={styles.shareButton}
        variant="primary"
        off={!selected} 
        onPress={shareReport}
        bold
      >
          Share Report and Book Now
      </Button>
      
    </ScrollView>
    { loading && <Loader message="Sharing report" />}
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