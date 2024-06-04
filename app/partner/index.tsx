import { StyleSheet, FlatList } from "react-native";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { getClinics } from "@/services/clinicService";

import { Star, ChevronRight } from "@tamagui/lucide-icons";
import { YGroup, ListItem, Separator } from "tamagui";
import { View } from "@/components/Themed";
import { H3 } from "tamagui";

import { Clinic } from "@/services/types";

export default function PartnerScreen() {

  const [clinics, setClinics] = useState<Clinic[]>([])
  const handlePress = (id: number) => {
    router.push(`/partner/${id}`)
  }

  const navigation = useNavigation()

  const fetchClinics = async () => {
    await getClinics()
      .then((res) => {
        setClinics(res.data)
      })
  }

  useEffect(() => {
    navigation.setOptions({
      title: "Partner Clinics"
    })

    fetchClinics()

  }, [])

  return (
    <View style={styles.container}>
      <H3 paddingVertical="$3"l>Connect with our partners</H3>
      <YGroup alignSelf="center" bordered width={'100%'} size="$5" separator={<Separator />}>
        <FlatList
          data={clinics}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ListItem
              hoverTheme
              pressTheme
              title={item.name}
              subTitle={item.address}
              icon={Star}
              iconAfter={ChevronRight}
              backgroundColor="$blue"
              onPress={() => handlePress(item.id)}
            />
          )}
          ItemSeparatorComponent={() => <Separator />}
        />
    </YGroup>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  }
})