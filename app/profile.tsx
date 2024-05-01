import { View } from "@/components/Themed";
import { StyleSheet, Alert } from "react-native";

import { ChevronRight, KeyRound, HelpCircle, ArrowUpRight } from "@tamagui/lucide-icons";
import { ListItemProps } from "tamagui";
import { Button, Avatar, XStack, SizableText, Text, YStack, ListItem, YGroup } from "tamagui";

import { useAuth } from "@/contexts/AuthyContext";
import { useRouter } from "expo-router";

interface OptionGroupProps {
  children?: React.ReactNode;
};

const Option = ({ icon, title, subTitle = "" }: ListItemProps) => {
  return (
    <YGroup.Item>
      <ListItem hoverTheme icon={icon} title={title} subTitle={subTitle} iconAfter={ChevronRight} />
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
  const { onLogout } = useAuth();
  const router = useRouter();

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
      <XStack alignItems="center">
        <Avatar circular size="$10">
          <Avatar.Image
            accessibilityLabel="Cam"
            src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
          />
          <Avatar.Fallback backgroundColor="$blue10" />
        </Avatar>
        <YStack paddingHorizontal='$5'>
          <SizableText size='$9' fontWeight='800'>Jennie Kims</SizableText>
          <SizableText size='$5' theme='alt2'>rubyjane@gmail.com</SizableText>
        </YStack>
      </XStack>
      <Button alignSelf="center" width='100%' marginVertical='$3'>
        Edit Profile
      </Button>
      {/* Account */}
      <Text theme='alt2'>Account</Text>
      <OptionsGroup>
        <Option icon={KeyRound} title="Change Password"/>
      </OptionsGroup>
      {/* Legal */}
      <Text theme='alt2'>Legal</Text>
      <OptionsGroup>
        <Option icon={ArrowUpRight} title="Terms of Service"/>
        <Option icon={ArrowUpRight} title="Data Privacy"/>
      </OptionsGroup>
      {/* Help */}
      <Text theme='alt2'>Help</Text>
      <OptionsGroup>
        <Option icon={HelpCircle} title="FAQs"/>
      </OptionsGroup>
      {/* Logout */}
      <XStack flex={1} alignItems={"flex-end"}>
        <Button onPress={ confirmLogout } variant="outlined" width='100%'>Logout</Button>
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
