import { View } from "@/components/Themed";
import { useData } from "@/contexts/DataContext";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { H1, SizableText, View as TamaguiView, XStack } from "tamagui";
import { Button } from "@/components/Button";
import { ShareInfo } from "@/contexts/DataContext";
import { PlusCircle } from "@tamagui/lucide-icons";

export default function PartnerShareListScreen() {
  const { reportId, serverId } = useLocalSearchParams<{ reportId: string, serverId: string }>()
  const navigation = useNavigation()

  const [shareInfo, setShareInfo] = useState<ShareInfo[]>([])

  const { history } = useData()

  const getReport = async () => {
    const report = history![reportId!]
    const info = report.sharedInfo ?? []
    setShareInfo(info)
  }

  const share = () => {
    router.push({
      pathname: "/partner/share",
      params: { serverId, localId: reportId }
    })
  }

  useEffect(() => {
    navigation.setOptions({
      title: "Shared Clinics"
    })
    getReport()
  }, [history])
  
  return (
    <>
    <View style={{ flex: 1, padding: 16 }}>
      <H1>Shared Clinics</H1>
      <TamaguiView marginVertical="$3" gap="$3">
      {
        shareInfo.map((info, index) => (
          <HistoryCard key={index} {...info} />
        ))
      }
      {
        shareInfo.length === 0 && <SizableText theme="alt1" size="$4">This report is not shared to any clinics.</SizableText>
      }
      </TamaguiView>
      <TamaguiView flex={1} justifyContent="flex-end">
        <Button variant="primary" onPress={share} icon={PlusCircle}>Share to new clinic</Button>
      </TamaguiView>
    </View>
    </>
  )
}

const HistoryCard = (props: ShareInfo) => {
  return (
    <TamaguiView backgroundColor="$gray1" borderColor="$gray3" borderWidth="$1" padding="$3" borderRadius="$2">
      <XStack justifyContent="space-between">
        <SizableText size="$4" theme="alt1">Shared With</SizableText>
        <SizableText size="$3">{props.clinicName}</SizableText>
      </XStack>
      <XStack justifyContent="space-between">
        <SizableText size="$4" theme="alt1">Date Shared</SizableText>
        <SizableText size="$3">{new Date(props.createdAt).toLocaleString()}</SizableText>
      </XStack>
    </TamaguiView>
  )
}