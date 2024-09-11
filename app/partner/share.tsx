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
  const [address, setAddress] = useState("")
  const [clinicName, setClinicName] = useState("")

  const { authState } = useAuth()
  const { history, edit } = useData()
  const navigation = useNavigation()

  const { serverId, localId } = useLocalSearchParams<{ serverId: string, localId: string }>()

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

  const getFilters = () => {
    const report = history![localId!]
    const filterIds = report.sharedInfo
      ? report.sharedInfo.map((info) => info.clinicId)
      : []
    // filter out already shared clinics
    return filterIds
  }

  const setReportToShared = async (shareId: number, date: string) => {
    const report = history![localId!];
    const newSharedInfo = {
      id: shareId,
      clinicId: selected!,
      clinicName: clinicName,
      clinicAddress: address,
      createdAt: date
    }
    const sharedInfo = report.sharedInfo 
      ? [...report.sharedInfo, newSharedInfo] 
      : [newSharedInfo]

    let newReport = { 
      ...report, 
      shared: true,
      sharedInfo: sharedInfo
    };
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
        dentistId: Number(selected) >= 3 
          ? Number(selected)-1 
          : Number(selected)
      })

      const response = await createReport({
        clinicId: selected,
        imageIds: [Number(serverId)],
        description: "Shared from mobile app",
        title: "Shared Report"
      })

      const { id, createdAt } = response.data
      setReportToShared(id, createdAt)

      // TODO: use toast instead of alert
      Alert.alert("Share Successful","Report and appointment request sent. You will be notified once the clinic confirms your appointment.")
      navigation.goBack()
    } catch (error) {
      const errors = error as any
      console.log(errors.response.data)
      Alert.alert("Something went wrong")
    }
    setLoading(false)
  }

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
    const _filterIds = getFilters()
    const _location = await getLocation()
    // testsss
    const coordinates = _location?.coords
     ? {
        latitude: _location?.coords.latitude,
        longitude: _location?.coords.longitude,
      }
     : DEFAULT_COORDINATE;
    
    await getClinics()
      .then((res) => {
        const filtered = res.data.filter((place) => {
          const distance = calculateDistance({
            first: coordinates,
            second: { latitude: place.latitude, longitude: place.longitude },
          });
          return distance < 800 && !_filterIds.includes(place.id);
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
    setDate(two_days_later)
  }, [])

  return (
    <>
    <ScrollView style={styles.container}>
      <H4 paddingVertical="$3"l>Select A Nearby Clinic</H4>
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
              setAddress(clinic.address)
              setClinicName(clinic.name)
            }} key={clinic.id}>
            <RadioGroup.Item value={clinic.id.toString()} size="$3">
              <RadioGroup.Indicator backgroundColor="$green10" scale="$1"/>
            </RadioGroup.Item>
            <YStack flex={1} flexShrink={1}>
              <SizableText size="$4" fontWeight={700} numberOfLines={1}>{clinic.name}</SizableText>
              <SizableText size="$3" theme="alt1" numberOfLines={1}>{clinic.address}</SizableText>
            </YStack>
          </XStack>
        )
      })}
      </RadioGroup>

      <YStack paddingVertical="$2">
        <H4 paddingTop="$2">Booking Information</H4>
        <SizableText padding="$1" theme="alt1">Date</SizableText>
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
        <SizableText padding="$1" paddingTop="$3" theme="alt1">Time</SizableText>
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
        <Paragraph flex={1} flexShrink={1}>
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