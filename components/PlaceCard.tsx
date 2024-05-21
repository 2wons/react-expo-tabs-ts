import { StyleSheet, View } from "react-native";
import { PointOfInterest } from "@/constants/Markers";

import { SizableText, Paragraph } from "tamagui";
import { XStack, YStack, Button } from "tamagui";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "tamagui";

const LIPSUM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis varius tincidunt sapien ut volutpat. Aenean.'

type PlaceCardProps = {
  place: PointOfInterest;
};

export default function PlaceCard({ place }: PlaceCardProps) {
  const theme = useTheme()

  return (
    <View style={styles.placeCard}>
      <XStack>
        <MaterialIcons size={30} color={'white'} name="place"/>
        <YStack>
          <SizableText size='$5' fontWeight='800'>{place.title}</SizableText>
          <SizableText size='$3' theme='alt2'>{place.description}</SizableText>
        </YStack>
      </XStack>
      <SizableText size='$4' fontWeight='800'>Place Information</SizableText>
      <Paragraph>{LIPSUM}</Paragraph>
      <XStack gap="$2" justifyContent="space-evenly">
        <Button width='50%' variant="outlined">Get Directions</Button>
        <Button width='50%' themeInverse>Contact</Button>
      </XStack>
    </View>
  );
}

const styles = StyleSheet.create({
  placeCard: {},
});
