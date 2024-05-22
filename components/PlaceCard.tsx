import { StyleSheet, View, Dimensions } from "react-native";
import { PointOfInterest } from "@/constants/Markers";

import { SizableText, Paragraph, stylePropsView } from "tamagui";
import { XStack, YStack, Button } from "tamagui";
import { useTheme } from "tamagui";
import { PanelLeftInactive } from "@tamagui/lucide-icons";

const LIPSUM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'

const { width: screenWidth } = Dimensions.get('window');
const cardWidth = screenWidth * 0.85;
const cardMargin = 10; 

type PlaceCardProps = {
  place: PointOfInterest;
};

export default function PlaceCard({ place }: PlaceCardProps) {  
  const theme = useTheme()

  return (
    <YStack flex={1} padding={15} borderStyle="solid" borderRadius={10} borderColor={'$white'} width={cardWidth} margin={cardMargin} backgroundColor={"$background"}>
      <XStack>
        <PanelLeftInactive size={24}/>
        <YStack>
          <SizableText size='$6' fontWeight='800'>{place.title}</SizableText>
          <SizableText size='$3' theme='alt2'>{place.description}</SizableText>
        </YStack>
      </XStack>
      <SizableText size='$4' fontWeight='800'>Place Infosrmation</SizableText>
      <Paragraph>{LIPSUM}</Paragraph>
      <XStack gap="$2" paddingTop='$4' flex={1} alignItems="flex-end">
        <Button flex={1} flexGrow={1} variant="outlined">Get Directions</Button>
        <Button flex={1} flexGrow={1} themeInverse>Contsact</Button>
      </XStack>
    </YStack>
  );
}
