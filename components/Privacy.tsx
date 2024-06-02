import { StyleSheet } from "react-native";
import { H1, Paragraph, SizableText, XStack, Text } from "tamagui";
import { View, ScrollView } from "./Themed";
import { ReactNode } from "react";

type PrivacyProps = {
  children?: ReactNode
}

export const Privacy = ({ children }: PrivacyProps) => {
  return (
    <View style={styles.container}>
      <H1>Data Privacy</H1>
      <ScrollView style={{ }} contentContainerStyle={{ padding : 20 }} >
        <Paragraph>
          The Carident Team values your right to privacy and we are commited to inform you of what data we collect and how we process and protect your information
        </Paragraph>
        <Paragraph marginVertical="$3">
        This Privacy Policy outlines how we collect, use, and protect your data in compliance with the Philippines' Data Privacy Act (Republic Act No. 10173)
        </Paragraph>
        <SizableText size="$6" fontWeight="700" marginVertical='$3'>Data We Collect</SizableText>
        <SizableText size="$4" fontWeight="700">Personal Information</SizableText>
        <XStack gap="$3">
          <Text>•</Text>
          <Paragraph>
            <Text fontWeight={"700"}>Name and Email Address: </Text>
            When you register for an account, we collect your name and email address to create and manage your account.
          </Paragraph>
        </XStack>
        <XStack gap="$3">
          <Text>•</Text>
          <Paragraph>
            <Text fontWeight={"700"}>Analysis Reports: </Text>
            If you choose to share your teeth analysis reports with partner clinics, we will store and process these reports as per your instructions.
          </Paragraph>
        </XStack>
        <SizableText size="$4" fontWeight="700" marginTop="$3">Location Information</SizableText>
        <XStack gap="$3">
          <Text>•</Text>
          <Paragraph>
            <Text fontWeight={"700"}>Current Location: </Text>
            We collect your current location to help you find nearby partner clinics. This information is used only within your device and is not transmitted to our servers.
          </Paragraph>
        </XStack>
        <SizableText size="$6" fontWeight="700" marginVertical='$3'>Who we share your information with</SizableText>
        <XStack gap="$3">
          <Text>•</Text>
          <Paragraph wordWrap="normal">
            <Text fontWeight={"700"}>Partner Clinics: </Text>
            Your analysis reports will only be shared with partner clinics if you choose to do so. We ensure that our partner clinics comply with data privacy regulations.
          </Paragraph>
        </XStack>
        <SizableText size="$6" fontWeight="700" marginVertical="$3">Data Security</SizableText>
        <Paragraph>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include encryption, secure servers, and access controls.</Paragraph>

        <Paragraph marginVertical="$3">
          By using the Carident App, you acknowledge and agree to the terms of this Privacy Policy.
        </Paragraph>
      </ScrollView>
      { children}
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14
  },
});
