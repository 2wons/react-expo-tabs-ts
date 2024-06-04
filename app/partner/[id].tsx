import { StyleSheet } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { View } from "@/components/Themed";
import { Button, H1, Text, YStack, XStack, Avatar, SizableText } from "tamagui";
import { getClinic } from "@/services/clinicService";
import { Clinic } from "@/services/types";
import { MyLoader } from "@/components/Loader";
import { useEffect, useState } from "react";

export default function PartnerDetail() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const [clinic, setClinic] = useState<Clinic | null>(null);

  const fetchClinic = async () => {
    await getClinic(Number(id))
      .then((res) => {
        setClinic(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    // call api and set header title to clinic name
    navigation.setOptions({
      title: "Partner Clinic",
      headerBackTitleVisible: false,
    });

    fetchClinic()
  });

  return (
    <View style={styles.container}>
      { clinic ? (
        <>
        <H1>{clinic.name}</H1>
        <Text>{clinic.address}</Text>
        <YStack marginVertical='$3' gap={'$2'}>
          <Text theme="alt1">About us</Text>
          <Text>{clinic.description}</Text>
        </YStack>
        <Text theme="alt1">Our Dentists</Text>
        { clinic.dentists.map((dentist, index) => {
          return (
            <XStack key={index} marginVertical='$3' gap='$3'>
              <Avatar circular size="$5" marginRight='$2'>
                <Avatar.Image
                  accessibilityLabel="Cam"
                  defaultSource={require('@/assets/images/avatardefault.png')}
                />
                <Avatar.Fallback backgroundColor="$grey10" />
              </Avatar>
              <YStack>
                <SizableText size='$5' fontWeight={700}>{dentist.name}</SizableText>
                <SizableText size='$3'>{dentist.email}</SizableText>
              </YStack>
            </XStack>
          )
        })}
        <Button>Book Appointment</Button>
        </>)
        : (<MyLoader/>)
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24
  },
});
