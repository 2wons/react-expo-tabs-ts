import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { getClinics } from "@/services/clinicService";

import { View } from "@/components/Themed";
import { H4, YStack } from "tamagui";

import { Clinic } from "@/services/types";
import { useLocalSearchParams } from "expo-router";
import { createReport } from "@/services/clinicService";
import { Alert } from "react-native";

import { Input, RadioGroup, XStack, SizableText } from "tamagui";
import { Button } from "@/components/Button";
import { BulletList } from "react-content-loader/native";
import { ChevronsUp } from "@tamagui/lucide-icons";
import { Loader } from "@/components/Loader";

export default function PartnerShareScreen() {

  const [clinics, setClinics] = useState<Clinic[] | null>(null)
  const [title, setTitle] = useState<string>()
  const [description, setDescription] = useState<string>()
  const [selected, setSelected] = useState<number>()
  const [loading ,setLoading] = useState<boolean>(false)

  const { serverId } = useLocalSearchParams<{ serverId: string }>()

  const shareReport = async () => {
    if (!selected) {
      return
    }
    setLoading(true)
    await createReport({
      clinicId: selected,
      imageIds: [Number(serverId)],
      description: description ?? "Shared from mobile app",
      title: title ?? "Shared Report"
    })
    .then((r) => {
      Alert.alert("Report shared successfully")
      navigation.goBack()
    })
    .catch((e) => {
      console.log(e)
      Alert.alert("Something went wrong")
    })
    setLoading(false)
  }

  const navigation = useNavigation()

  const fetchClinics = async () => {
    await getClinics()
      .then((res) => {
        setClinics(res.data)
      })
      .catch((e) => {
        Alert.alert(e)
      })
  }

  useEffect(() => {
    navigation.setOptions({
      title: "Sharing Report"
    })

    fetchClinics()
  }, [])

  return (
    <View style={styles.container}>
      <H4 paddingVertical="$3"l>Select Partner Clinic</H4>
      <RadioGroup value={selected?.toString()}onValueChange={(value) => {
        setSelected(Number(value))
      }}
      rowGap="$2">
      {
        clinics === null && (
          <BulletList />
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
        {/* <SizableText size="$4" theme="alt1" padding="$1">Report Information</SizableText> */}
        <H4 paddingTop="$2">Report Information</H4>
        <SizableText padding="$1">Title</SizableText>
        <Input value={title} placeholder="Enter report title (optional)" onChangeText={(t) => {
          setTitle(t)
        }}/>

        <SizableText padding="$1" paddingTop="$3">Description</SizableText>
        <Input value={description} placeholder="Shared from mobile app" onChangeText={(t) => {
          setDescription(t)
        }}/>
      </YStack>
      <Button
        iconAfter={<ChevronsUp size={20}/> }
        style={styles.shareButton}
        backgroundColor="$blue9" 
        disableed={!selected} 
        onPress={shareReport}
      >
          Share Now
        </Button>
        { loading && <Loader />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18
  },
  shareButton: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    margin: 20,
  }
})