import { StyleSheet } from "react-native";
import { ScrollView } from "@/components/Themed";
import { YGroup, ListItem, Separator } from "tamagui";
import { Star, ChevronRight, Moon } from "@tamagui/lucide-icons";
import { router } from "expo-router";

import { H3 } from "tamagui";

export default function PartnerScreen() {
  const handlePress = () => {
    router.push("partner/3")
  }
  return (
    <ScrollView style={styles.container}>
      <H3 paddingVertical="$3"l>Connect with our partners</H3>
      <YGroup alignSelf="center" bordered width={'100%'} size="$5" separator={<Separator />}>
      <YGroup.Item>
        <ListItem
          hoverTheme
          pressTheme
          title="Smile Dental Clinic"
          subTitle="123 Main Street, Manila"
          icon={Star}
          iconAfter={ChevronRight}
          backgroundColor="$blue"
        />
      </YGroup.Item>
      <YGroup.Item>
        <ListItem
          hoverTheme
          pressTheme
          title="FEU Clinics"
          subTitle="721 Main Street, Manila"
          icon={Moon}
          iconAfter={ChevronRight}
          backgroundColor="$blue"
        />
      </YGroup.Item>
    </YGroup>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  }
})