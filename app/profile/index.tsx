import { View } from "@/components/Themed";
import { StyleSheet, Alert } from "react-native";

import { ChevronRight, KeyRound, HelpCircle, ArrowUpRight } from "@tamagui/lucide-icons";
import { ListItemProps } from "tamagui";
import { Button, Avatar, XStack, SizableText, Text, YStack, ListItem, YGroup } from "tamagui";

import { useAuth } from "@/contexts/AuthyContext";
import { useNavigation, useRouter } from "expo-router";
import { useEffect } from "react";

import { PencilLine } from "@tamagui/lucide-icons";
import { ExternalLink } from "@/components/ExternalLink";

interface OptionGroupProps {
  children?: React.ReactNode;
};

const Option = ({ icon, title, subTitle = "", onPress }: ListItemProps) => {
  return (
    <YGroup.Item>
      <ListItem hoverTheme icon={icon} title={title} subTitle={subTitle} iconAfter={ChevronRight} onPress={onPress} />
    </YGroup.Item>
  )
}

const OptionsGroup = ({ children }: OptionGroupProps) => {
  return (
    <YGroup bordered width='100%' size="$4" marginVertical='$3'>
      { children }
    </YGroup>
  )
}

export default function MeScreen() {
  const { onLogout, authState, user } = useAuth();
  const router = useRouter();

  const isValidSession = () => {
    const storedTokenExpiration = new Date(authState?.expiration!)
    const currentDate = new Date()
    return storedTokenExpiration > currentDate
  }

  const MANUAL_LINK = 'https://files.catbox.moe/f0m6kz.pdf'

  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({
      title: "Profile"
    })
  } ,[user])

  const confirmLogout = () => {
    Alert.alert("Confirm Logout", "Are you sure you want to logout?", [
      {
        text: 'Cancel',
        style: 'cancel'
      },
      {
        text: 'Logout',
        onPress: () => { 
          onLogout!();
          router.replace('/(tabs)/');
         }
      },
    ])
  }
  return (
    <View style={styles.container}>
      { !isValidSession() && <Text color={"$red8"}>Session has expired</Text> }
      <XStack alignItems="center">
        <Avatar circular size="$10">
          <Avatar.Image
            accessibilityLabel="Cam"
            source={user?.avatar ? {uri: user.avatar} : undefined}
            defaultSource={require('@/assets/images/avatardefault.png')}
          />
          <Avatar.Fallback backgroundColor="$blue10" />
        </Avatar>
        <YStack paddingHorizontal='$5' flex={1}>
          <SizableText size='$9' fontWeight='800' numberOfLines={2}>{user?.name}</SizableText>
          <SizableText size='$5' theme='alt2'>{user?.email}</SizableText>
        </YStack>
      </XStack>
      <Button icon={PencilLine} alignSelf="center" width='100%' marginVertical='$3' onPress={() => { router.push("/profile/edit")} }>
        Edit Profile
      </Button>
      {/* Account */}
      <Text theme='alt2'>Account</Text>
      <OptionsGroup>
        <Option icon={KeyRound} title="Change Password" onPress={() => router.push("/profile/reset-password")}/>
      </OptionsGroup>
      {/* Legal */}
      <Text theme='alt2'>Legal</Text>
      <OptionsGroup>
        <Option icon={ArrowUpRight} title="Data Privacy" onPress={() => router.push("/privacy")}/>
        <Option icon={ArrowUpRight} title="Disclaimer" onPress={() => router.push("/disclaimer")}/>
      </OptionsGroup>
      {/* Help */}
      <Text theme='alt2'>Help</Text>
      <OptionsGroup>
        <ExternalLink href={MANUAL_LINK} asChild>
          <Option icon={HelpCircle} title="Help Manual" />
        </ExternalLink>
        <Option icon={HelpCircle} title="Feedback" onPress={() => router.push("/feedback")}/>
      </OptionsGroup>
      {/* Logout */}
      <XStack flex={1} alignItems={"flex-end"}>
        <Button themeInverse onPress={ confirmLogout } width='100%'>Logout</Button>
      </XStack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: "4%",
    width: "100%",
    height: "100%",
  },
});
