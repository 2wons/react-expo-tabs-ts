import { StyleSheet } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { View } from "@/components/Themed";
import { Button, H1, Text, YStack, XStack, Avatar, SizableText } from "tamagui";

import { useEffect } from "react";

export default function PartnerDetail() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const description = "Bright Smile Dental Clinic offers comprehensive dental care with a focus on cosmetic dentistry. Our team is dedicated to helping you achieve a brighter, healthier smile in a comfortable and welcoming environment."

  useEffect(() => {
    // call api and set header title to clinic name
    navigation.setOptions({
      title: "Clinic Title",
      headerBackTitleVisible: false,
    });
  });

  return (
    <View style={styles.container}>
      <H1>Smile Dental Clinics</H1>
      <Text>123 Sunshine Blvd, Suite 4A, Happyville, CA 90210</Text>
      <YStack marginVertical='$3' gap={'$2'}>
        <Text theme="alt1">About us</Text>
        <Text>{description}</Text>
      </YStack>
      <Text theme="alt1">Our Dentists</Text>
      <XStack marginVertical='$3'>
        <Avatar circular size="$5" marginRight='$2'>
          <Avatar.Image
            accessibilityLabel="Cam"
            defaultSource={require('@/assets/images/avatardefault.png')}
          />
          <Avatar.Fallback backgroundColor="$grey10" />
        </Avatar>
        <SizableText size='$5'>Dr. Jane Doe</SizableText>
      </XStack>
      <Button>Book Appointment</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24
  },
});
